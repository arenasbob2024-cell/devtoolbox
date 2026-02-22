'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTML Entity Encoder / Decoder',
    description: 'Encode special characters to HTML entities or decode HTML entities back to readable text.',
    inputLabel: 'Input',
    outputLabel: 'Output',
    inputPlaceholder: 'Enter text or HTML entities...',
    encodeBtn: 'Encode',
    decodeBtn: 'Decode',
    encodeAllBtn: 'Encode All Characters',
    clear: 'Clear',
    swap: 'Swap',
    loadSample: 'Load Sample',
    mode: 'Mode',
    named: 'Named Entities',
    numeric: 'Numeric Entities',
    hex: 'Hex Entities',
    refTitle: 'Common HTML Entities Reference',
    charCol: 'Character',
    namedCol: 'Named',
    numericCol: 'Numeric',
    descCol: 'Description',
    introTitle: 'Free Online HTML Entity Encoder & Decoder',
    introText: 'Convert special characters like <, >, &, and quotes to their HTML entity equivalents, or decode HTML entities back to plain text. This tool supports named entities (like &amp;), numeric decimal entities (like &#38;), and hexadecimal entities (like &#x26;). Essential for web development, preventing XSS vulnerabilities, embedding code snippets in HTML, and working with special characters in web content.',
    tipTitle: 'HTML Entity Tips',
    tip1: 'Always encode <, >, &, and quotes when displaying user input in HTML',
    tip2: 'Named entities are more readable; numeric entities cover all Unicode characters',
    tip3: 'HTML entity encoding prevents Cross-Site Scripting (XSS) attacks',
    tip4: 'Use hex entities for consistency with CSS and JavaScript escape sequences',
    tip5: 'Decode entities when extracting text from HTML for processing',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are HTML entities?',
    faq1a: 'HTML entities are special codes used to represent characters that have special meaning in HTML (like < and >) or characters that cannot be easily typed on a keyboard. They start with & and end with ;. For example, &lt; represents < and &amp; represents &. This prevents the browser from interpreting these characters as HTML markup.',
    faq2q: 'When should I encode HTML entities?',
    faq2a: 'You should encode HTML entities whenever you display user-generated content in a web page to prevent XSS attacks, when you want to show HTML code as text (like in tutorials), when using special characters like copyright symbols or em dashes, and when working with internationalization where characters may not be in the page encoding.',
    faq3q: 'What is the difference between named, numeric, and hex entities?',
    faq3a: 'Named entities use descriptive names (e.g., &amp; for &, &lt; for <). Numeric entities use decimal Unicode code points (e.g., &#38; for &). Hex entities use hexadecimal code points (e.g., &#x26; for &). Named entities are the most readable but only available for common characters. Numeric and hex entities can represent any Unicode character.',
    faq4q: 'Does encoding prevent XSS attacks?',
    faq4a: 'HTML entity encoding is one important defense against XSS (Cross-Site Scripting) attacks. By encoding characters like <, >, ", and \', you prevent malicious scripts from being interpreted as HTML or JavaScript. However, comprehensive XSS prevention requires encoding in the right context and using Content Security Policy headers.',
    faq5q: 'Can this tool handle Unicode characters?',
    faq5a: 'Yes, this tool fully supports Unicode characters. You can encode any Unicode character to its numeric (decimal) or hexadecimal entity representation, and decode any valid HTML entity back to its original character. This includes emoji, CJK characters, mathematical symbols, and all other Unicode characters.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HTML 实体编码 / 解码器',
    description: '将特殊字符编码为 HTML 实体，或将 HTML 实体解码回可读文本。',
    inputLabel: '输入', outputLabel: '输出', inputPlaceholder: '输入文本或 HTML 实体...',
    encodeBtn: '编码', decodeBtn: '解码', encodeAllBtn: '编码全部字符',
    clear: '清除', swap: '交换', loadSample: '加载示例',
    mode: '模式', named: '命名实体', numeric: '数字实体', hex: '十六进制实体',
    refTitle: '常用 HTML 实体参考', charCol: '字符', namedCol: '命名', numericCol: '数字', descCol: '描述',
    introTitle: '免费在线 HTML 实体编码解码器',
    introText: '将特殊字符（如 <、>、& 和引号）转换为 HTML 实体，或将 HTML 实体解码回纯文本。支持命名实体、十进制数字实体和十六进制实体。',
    tipTitle: 'HTML 实体技巧',
    tip1: '在 HTML 中显示用户输入时始终编码 <、>、& 和引号', tip2: '命名实体更易读；数字实体覆盖所有 Unicode 字符',
    tip3: 'HTML 实体编码可防止 XSS 攻击', tip4: '使用十六进制实体与 CSS 和 JavaScript 转义序列保持一致',
    tip5: '从 HTML 提取文本进行处理时解码实体',
    faqTitle: '常见问题',
    faq1q: '什么是 HTML 实体？', faq1a: 'HTML 实体是用于表示在 HTML 中有特殊含义的字符的特殊代码。它们以 & 开头，以 ; 结尾。',
    faq2q: '何时应该编码 HTML 实体？', faq2a: '在网页中显示用户生成的内容以防止 XSS 攻击、展示 HTML 代码、使用特殊字符时应进行编码。',
    faq3q: '命名、数字和十六进制实体有什么区别？', faq3a: '命名实体使用描述性名称，数字实体使用十进制代码，十六进制实体使用十六进制代码。',
    faq4q: '编码能防止 XSS 攻击吗？', faq4a: 'HTML 实体编码是防止 XSS 攻击的重要手段之一。',
    faq5q: '支持 Unicode 字符吗？', faq5a: '是的，完全支持 Unicode 字符，包括表情符号、中日韩字符、数学符号等。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Encodeur / Decodeur d\'Entites HTML',
    description: 'Encodez les caracteres speciaux en entites HTML ou decodez les entites en texte lisible.',
    inputLabel: 'Entree', outputLabel: 'Sortie', inputPlaceholder: 'Entrez du texte ou des entites HTML...',
    encodeBtn: 'Encoder', decodeBtn: 'Decoder', encodeAllBtn: 'Encoder tous les caracteres',
    clear: 'Effacer', swap: 'Echanger', loadSample: 'Charger un exemple',
    mode: 'Mode', named: 'Entites nommees', numeric: 'Entites numeriques', hex: 'Entites hexadecimales',
    refTitle: 'Reference des entites HTML', charCol: 'Caractere', namedCol: 'Nommee', numericCol: 'Numerique', descCol: 'Description',
    introTitle: 'Encodeur/decodeur d\'entites HTML gratuit', introText: 'Convertissez les caracteres speciaux en entites HTML ou decodez-les en texte brut.',
    tipTitle: 'Conseils entites HTML', tip1: 'Encodez toujours <, >, & et les guillemets', tip2: 'Les entites nommees sont plus lisibles',
    tip3: 'L\'encodage previent les attaques XSS', tip4: 'Utilisez les entites hex pour la coherence', tip5: 'Decodez les entites lors de l\'extraction de texte',
    faqTitle: 'Questions frequentes',
    faq1q: 'Que sont les entites HTML?', faq1a: 'Les entites HTML sont des codes speciaux pour representer des caracteres speciaux en HTML.',
    faq2q: 'Quand encoder?', faq2a: 'Lors de l\'affichage de contenu utilisateur ou de code HTML comme texte.',
    faq3q: 'Difference entre nommees, numeriques et hex?', faq3a: 'Nommees utilisent des noms, numeriques des codes decimaux, hex des codes hexadecimaux.',
    faq4q: 'L\'encodage previent le XSS?', faq4a: 'L\'encodage des entites HTML est une defense importante contre les attaques XSS.',
    faq5q: 'Supporte Unicode?', faq5a: 'Oui, tous les caracteres Unicode sont supportes.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'HTML Entity Encoder / Decoder',
    description: 'Sonderzeichen in HTML-Entities kodieren oder Entities in lesbaren Text dekodieren.',
    inputLabel: 'Eingabe', outputLabel: 'Ausgabe', inputPlaceholder: 'Text oder HTML-Entities eingeben...',
    encodeBtn: 'Kodieren', decodeBtn: 'Dekodieren', encodeAllBtn: 'Alle Zeichen kodieren',
    clear: 'Loeschen', swap: 'Tauschen', loadSample: 'Beispiel laden',
    mode: 'Modus', named: 'Benannte Entities', numeric: 'Numerische Entities', hex: 'Hex-Entities',
    refTitle: 'HTML-Entities Referenz', charCol: 'Zeichen', namedCol: 'Benannt', numericCol: 'Numerisch', descCol: 'Beschreibung',
    introTitle: 'Kostenloser HTML Entity Encoder/Decoder', introText: 'Konvertieren Sie Sonderzeichen in HTML-Entities oder dekodieren Sie diese.',
    tipTitle: 'HTML Entity Tipps', tip1: 'Kodieren Sie immer <, >, & und Anfuehrungszeichen', tip2: 'Benannte Entities sind besser lesbar',
    tip3: 'Entity-Kodierung verhindert XSS', tip4: 'Hex-Entities fuer Konsistenz', tip5: 'Dekodieren beim Extrahieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was sind HTML-Entities?', faq1a: 'Spezielle Codes zur Darstellung von Zeichen mit besonderer Bedeutung in HTML.',
    faq2q: 'Wann kodieren?', faq2a: 'Bei Benutzereingaben, HTML-Code als Text oder Sonderzeichen.',
    faq3q: 'Unterschied benannt, numerisch und hex?', faq3a: 'Benannte verwenden Namen, numerische Dezimalcodes, hex Hexadezimalcodes.',
    faq4q: 'Verhindert Kodierung XSS?', faq4a: 'HTML-Entity-Kodierung ist eine wichtige Verteidigung gegen XSS.',
    faq5q: 'Unterstuetzt Unicode?', faq5a: 'Ja, alle Unicode-Zeichen werden unterstuetzt.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Codificador / Decodificador de Entidades HTML',
    description: 'Codifique caracteres especiales a entidades HTML o decodifique entidades a texto legible.',
    inputLabel: 'Entrada', outputLabel: 'Salida', inputPlaceholder: 'Ingrese texto o entidades HTML...',
    encodeBtn: 'Codificar', decodeBtn: 'Decodificar', encodeAllBtn: 'Codificar todos',
    clear: 'Limpiar', swap: 'Intercambiar', loadSample: 'Cargar ejemplo',
    mode: 'Modo', named: 'Entidades nombradas', numeric: 'Entidades numericas', hex: 'Entidades hex',
    refTitle: 'Referencia de entidades HTML', charCol: 'Caracter', namedCol: 'Nombrada', numericCol: 'Numerica', descCol: 'Descripcion',
    introTitle: 'Codificador/decodificador de entidades HTML gratuito', introText: 'Convierta caracteres especiales a entidades HTML o decodifique entidades a texto plano.',
    tipTitle: 'Consejos', tip1: 'Codifique siempre <, >, & y comillas', tip2: 'Las entidades nombradas son mas legibles',
    tip3: 'La codificacion previene XSS', tip4: 'Use entidades hex para consistencia', tip5: 'Decodifique al extraer texto',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que son las entidades HTML?', faq1a: 'Codigos especiales para caracteres con significado especial en HTML.',
    faq2q: 'Cuando codificar?', faq2a: 'Al mostrar contenido de usuario o codigo HTML como texto.',
    faq3q: 'Diferencia nombradas, numericas y hex?', faq3a: 'Nombradas usan nombres, numericas codigos decimales, hex codigos hexadecimales.',
    faq4q: 'La codificacion previene XSS?', faq4a: 'Es una defensa importante contra ataques XSS.',
    faq5q: 'Soporta Unicode?', faq5a: 'Si, todos los caracteres Unicode son soportados.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'HTML エンティティ エンコーダー / デコーダー',
    description: '特殊文字を HTML エンティティにエンコード、またはエンティティを読み取り可能なテキストにデコード。',
    inputLabel: '入力', outputLabel: '出力', inputPlaceholder: 'テキストまたは HTML エンティティを入力...',
    encodeBtn: 'エンコード', decodeBtn: 'デコード', encodeAllBtn: '全文字エンコード',
    clear: 'クリア', swap: '入れ替え', loadSample: 'サンプル読込',
    mode: 'モード', named: '名前付き', numeric: '数値', hex: '16進',
    refTitle: 'HTML エンティティ参照', charCol: '文字', namedCol: '名前付き', numericCol: '数値', descCol: '説明',
    introTitle: '無料 HTML エンティティエンコーダー/デコーダー', introText: '特殊文字を HTML エンティティに変換、またはエンティティをテキストにデコード。',
    tipTitle: 'コツ', tip1: '<、>、& を常にエンコード', tip2: '名前付きエンティティは読みやすい',
    tip3: 'XSS 攻撃を防止', tip4: '16進エンティティで一貫性', tip5: 'テキスト抽出時にデコード',
    faqTitle: 'よくある質問',
    faq1q: 'HTML エンティティとは？', faq1a: 'HTML で特殊な意味を持つ文字を表現するための特別なコードです。',
    faq2q: 'いつエンコードすべき？', faq2a: 'ユーザー生成コンテンツの表示時やHTML コードの表示時です。',
    faq3q: '名前付き、数値、16進の違いは？', faq3a: '名前付きは名前、数値は10進コード、16進は16進コードを使用。',
    faq4q: 'XSS を防げますか？', faq4a: 'HTML エンティティエンコードは XSS に対する重要な防御手段です。',
    faq5q: 'Unicode サポート？', faq5a: 'はい、すべての Unicode 文字をサポートします。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HTML 엔티티 인코더 / 디코더',
    description: '특수 문자를 HTML 엔티티로 인코딩하거나 엔티티를 텍스트로 디코딩합니다.',
    inputLabel: '입력', outputLabel: '출력', inputPlaceholder: '텍스트 또는 HTML 엔티티 입력...',
    encodeBtn: '인코딩', decodeBtn: '디코딩', encodeAllBtn: '모든 문자 인코딩',
    clear: '지우기', swap: '교환', loadSample: '샘플 로드',
    mode: '모드', named: '명명된', numeric: '숫자', hex: '16진',
    refTitle: 'HTML 엔티티 참조', charCol: '문자', namedCol: '명명', numericCol: '숫자', descCol: '설명',
    introTitle: '무료 HTML 엔티티 인코더/디코더', introText: '특수 문자를 HTML 엔티티로 변환하거나 엔티티를 텍스트로 디코딩합니다.',
    tipTitle: '팁', tip1: '<, >, &를 항상 인코딩', tip2: '명명된 엔티티가 더 읽기 쉬움',
    tip3: 'XSS 공격 방지', tip4: '16진 엔티티로 일관성 유지', tip5: '텍스트 추출 시 디코딩',
    faqTitle: '자주 묻는 질문',
    faq1q: 'HTML 엔티티란?', faq1a: 'HTML에서 특별한 의미를 가진 문자를 표현하기 위한 코드입니다.',
    faq2q: '언제 인코딩?', faq2a: '사용자 생성 콘텐츠 표시 시나 HTML 코드 표시 시입니다.',
    faq3q: '명명, 숫자, 16진 차이?', faq3a: '명명은 이름, 숫자는 10진 코드, 16진은 16진 코드 사용.',
    faq4q: 'XSS 방지 가능?', faq4a: 'HTML 엔티티 인코딩은 XSS에 대한 중요한 방어입니다.',
    faq5q: 'Unicode 지원?', faq5a: '네, 모든 Unicode 문자를 지원합니다.',
    relatedTitle: '관련 도구',
  },
  pt: {
    title: 'Codificador / Decodificador de Entidades HTML',
    description: 'Codifique caracteres especiais em entidades HTML ou decodifique entidades em texto legivel.',
    inputLabel: 'Entrada', outputLabel: 'Saida', inputPlaceholder: 'Insira texto ou entidades HTML...',
    encodeBtn: 'Codificar', decodeBtn: 'Decodificar', encodeAllBtn: 'Codificar todos',
    clear: 'Limpar', swap: 'Trocar', loadSample: 'Carregar exemplo',
    mode: 'Modo', named: 'Entidades nomeadas', numeric: 'Entidades numericas', hex: 'Entidades hex',
    refTitle: 'Referencia de entidades HTML', charCol: 'Caractere', namedCol: 'Nomeada', numericCol: 'Numerica', descCol: 'Descricao',
    introTitle: 'Codificador/decodificador de entidades HTML gratis', introText: 'Converta caracteres especiais em entidades HTML ou decodifique entidades em texto simples.',
    tipTitle: 'Dicas', tip1: 'Sempre codifique <, >, & e aspas', tip2: 'Entidades nomeadas sao mais legiveis',
    tip3: 'A codificacao previne XSS', tip4: 'Use entidades hex para consistencia', tip5: 'Decodifique ao extrair texto',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que sao entidades HTML?', faq1a: 'Codigos especiais para caracteres com significado especial em HTML.',
    faq2q: 'Quando codificar?', faq2a: 'Ao exibir conteudo de usuario ou codigo HTML como texto.',
    faq3q: 'Diferenca nomeadas, numericas e hex?', faq3a: 'Nomeadas usam nomes, numericas codigos decimais, hex codigos hexadecimais.',
    faq4q: 'A codificacao previne XSS?', faq4a: 'E uma defesa importante contra ataques XSS.',
    faq5q: 'Suporta Unicode?', faq5a: 'Sim, todos os caracteres Unicode sao suportados.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Codificatore / Decodificatore Entita HTML',
    description: 'Codifica caratteri speciali in entita HTML o decodifica entita in testo leggibile.',
    inputLabel: 'Input', outputLabel: 'Output', inputPlaceholder: 'Inserisci testo o entita HTML...',
    encodeBtn: 'Codifica', decodeBtn: 'Decodifica', encodeAllBtn: 'Codifica tutti',
    clear: 'Cancella', swap: 'Scambia', loadSample: 'Carica esempio',
    mode: 'Modalita', named: 'Entita nominate', numeric: 'Entita numeriche', hex: 'Entita hex',
    refTitle: 'Riferimento entita HTML', charCol: 'Carattere', namedCol: 'Nominata', numericCol: 'Numerica', descCol: 'Descrizione',
    introTitle: 'Codificatore/decodificatore entita HTML gratuito', introText: 'Converti caratteri speciali in entita HTML o decodifica entita in testo semplice.',
    tipTitle: 'Consigli', tip1: 'Codifica sempre <, >, & e virgolette', tip2: 'Le entita nominate sono piu leggibili',
    tip3: 'La codifica previene XSS', tip4: 'Usa entita hex per coerenza', tip5: 'Decodifica quando estrai testo',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cosa sono le entita HTML?', faq1a: 'Codici speciali per caratteri con significato speciale in HTML.',
    faq2q: 'Quando codificare?', faq2a: 'Quando si visualizzano contenuti utente o codice HTML come testo.',
    faq3q: 'Differenza nominate, numeriche e hex?', faq3a: 'Nominate usano nomi, numeriche codici decimali, hex codici esadecimali.',
    faq4q: 'La codifica previene XSS?', faq4a: 'E una difesa importante contro gli attacchi XSS.',
    faq5q: 'Supporta Unicode?', faq5a: 'Si, tutti i caratteri Unicode sono supportati.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'HTML Entity Encoder / Decoder', description: 'Codeer speciale tekens naar HTML-entities of decodeer entities naar leesbare tekst.',
    inputLabel: 'Invoer', outputLabel: 'Uitvoer', inputPlaceholder: 'Voer tekst of HTML-entities in...',
    encodeBtn: 'Coderen', decodeBtn: 'Decoderen', encodeAllBtn: 'Alle tekens coderen',
    clear: 'Wissen', swap: 'Wisselen', loadSample: 'Voorbeeld laden',
    mode: 'Modus', named: 'Benoemd', numeric: 'Numeriek', hex: 'Hex',
    refTitle: 'HTML-entities referentie', charCol: 'Teken', namedCol: 'Benoemd', numericCol: 'Numeriek', descCol: 'Beschrijving',
    introTitle: 'Gratis HTML Entity Encoder/Decoder', introText: 'Converteer speciale tekens naar HTML-entities of decodeer entities naar tekst.',
    tipTitle: 'Tips', tip1: 'Codeer altijd <, >, &', tip2: 'Benoemde entities zijn leesbaarder', tip3: 'Voorkomt XSS', tip4: 'Hex voor consistentie', tip5: 'Decodeer bij extractie',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat zijn HTML-entities?', faq1a: 'Speciale codes voor tekens met een speciale betekenis in HTML.',
    faq2q: 'Wanneer coderen?', faq2a: 'Bij gebruikersinhoud of HTML-code als tekst.', faq3q: 'Verschil benoemd, numeriek en hex?', faq3a: 'Benoemd gebruikt namen, numeriek decimale codes, hex hexadecimale codes.',
    faq4q: 'Voorkomt codering XSS?', faq4a: 'Belangrijke verdediging tegen XSS.', faq5q: 'Ondersteunt Unicode?', faq5a: 'Ja, alle Unicode-tekens worden ondersteund.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Koder / Dekoder Encji HTML', description: 'Koduj znaki specjalne do encji HTML lub dekoduj encje do tekstu.',
    inputLabel: 'Wejscie', outputLabel: 'Wyjscie', inputPlaceholder: 'Wpisz tekst lub encje HTML...',
    encodeBtn: 'Koduj', decodeBtn: 'Dekoduj', encodeAllBtn: 'Koduj wszystkie',
    clear: 'Wyczysc', swap: 'Zamien', loadSample: 'Zaladuj przyklad',
    mode: 'Tryb', named: 'Nazwane', numeric: 'Numeryczne', hex: 'Szesnastkowe',
    refTitle: 'Referencja encji HTML', charCol: 'Znak', namedCol: 'Nazwana', numericCol: 'Numeryczna', descCol: 'Opis',
    introTitle: 'Darmowy koder/dekoder encji HTML', introText: 'Konwertuj znaki specjalne na encje HTML lub dekoduj encje na tekst.',
    tipTitle: 'Wskazowki', tip1: 'Koduj zawsze <, >, &', tip2: 'Encje nazwane sa bardziej czytelne', tip3: 'Zapobiega XSS', tip4: 'Hex dla spojnosci', tip5: 'Dekoduj przy ekstrakcji',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym sa encje HTML?', faq1a: 'Specjalne kody do reprezentowania znakow specjalnych w HTML.',
    faq2q: 'Kiedy kodowac?', faq2a: 'Przy tresci uzytkownika lub kodzie HTML jako tekst.', faq3q: 'Roznica nazwane, numeryczne i hex?', faq3a: 'Nazwane uzywaja nazw, numeryczne kodow dziesietnych, hex szesnastkowych.',
    faq4q: 'Kodowanie zapobiega XSS?', faq4a: 'Wazna obrona przed atakami XSS.', faq5q: 'Obsluguje Unicode?', faq5a: 'Tak, wszystkie znaki Unicode.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'HTML Entity Encoder / Decoder', description: 'Koda specialtecken till HTML-entiteter eller avkoda entiteter till text.',
    inputLabel: 'Indata', outputLabel: 'Utdata', inputPlaceholder: 'Ange text eller HTML-entiteter...',
    encodeBtn: 'Koda', decodeBtn: 'Avkoda', encodeAllBtn: 'Koda alla',
    clear: 'Rensa', swap: 'Byt', loadSample: 'Ladda exempel',
    mode: 'Laege', named: 'Namngivna', numeric: 'Numeriska', hex: 'Hex',
    refTitle: 'HTML-entiteter referens', charCol: 'Tecken', namedCol: 'Namngiven', numericCol: 'Numerisk', descCol: 'Beskrivning',
    introTitle: 'Gratis HTML Entity Encoder/Decoder', introText: 'Konvertera specialtecken till HTML-entiteter eller avkoda entiteter till text.',
    tipTitle: 'Tips', tip1: 'Koda alltid <, >, &', tip2: 'Namngivna entiteter aer mer laesabara', tip3: 'Foerhindrar XSS', tip4: 'Hex foer konsistens', tip5: 'Avkoda vid extraktion',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer HTML-entiteter?', faq1a: 'Speciella koder foer tecken med speciell betydelse i HTML.',
    faq2q: 'Naer koda?', faq2a: 'Vid anvaendarinnehall eller HTML-kod som text.', faq3q: 'Skillnad namngivna, numeriska och hex?', faq3a: 'Namngivna anvaender namn, numeriska decimalkodar, hex hexadecimalkodar.',
    faq4q: 'Foerhindrar kodning XSS?', faq4a: 'Viktigt foersvar mot XSS.', faq5q: 'Stoeder Unicode?', faq5a: 'Ja, alla Unicode-tecken stoeds.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'HTML Entity Encoder / Decoder', description: 'Kod spesialtegn til HTML-entiteter eller dekod entiteter til tekst.',
    inputLabel: 'Inndata', outputLabel: 'Utdata', inputPlaceholder: 'Skriv inn tekst eller HTML-entiteter...',
    encodeBtn: 'Kod', decodeBtn: 'Dekod', encodeAllBtn: 'Kod alle',
    clear: 'Toemme', swap: 'Bytt', loadSample: 'Last eksempel',
    mode: 'Modus', named: 'Navngitte', numeric: 'Numeriske', hex: 'Hex',
    refTitle: 'HTML-entiteter referanse', charCol: 'Tegn', namedCol: 'Navngitt', numericCol: 'Numerisk', descCol: 'Beskrivelse',
    introTitle: 'Gratis HTML Entity Encoder/Decoder', introText: 'Konverter spesialtegn til HTML-entiteter eller dekod entiteter til tekst.',
    tipTitle: 'Tips', tip1: 'Kod alltid <, >, &', tip2: 'Navngitte entiteter er mer lesbare', tip3: 'Forhindrer XSS', tip4: 'Hex for konsistens', tip5: 'Dekod ved ekstraksjon',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Hva er HTML-entiteter?', faq1a: 'Spesielle koder for tegn med spesiell betydning i HTML.',
    faq2q: 'Naar kode?', faq2a: 'Ved brukerinnhold eller HTML-kode som tekst.', faq3q: 'Forskjell navngitte, numeriske og hex?', faq3a: 'Navngitte bruker navn, numeriske desimalkoder, hex heksadesimalkoder.',
    faq4q: 'Forhindrer koding XSS?', faq4a: 'Viktig forsvar mot XSS.', faq5q: 'Stoetter Unicode?', faq5a: 'Ja, alle Unicode-tegn stoettes.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Encoder / Decoder Entitas HTML', description: 'Encode karakter khusus ke entitas HTML atau decode entitas ke teks.',
    inputLabel: 'Input', outputLabel: 'Output', inputPlaceholder: 'Masukkan teks atau entitas HTML...',
    encodeBtn: 'Encode', decodeBtn: 'Decode', encodeAllBtn: 'Encode semua',
    clear: 'Hapus', swap: 'Tukar', loadSample: 'Muat Contoh',
    mode: 'Mode', named: 'Bernama', numeric: 'Numerik', hex: 'Hex',
    refTitle: 'Referensi entitas HTML', charCol: 'Karakter', namedCol: 'Bernama', numericCol: 'Numerik', descCol: 'Deskripsi',
    introTitle: 'Encoder/decoder entitas HTML gratis', introText: 'Konversi karakter khusus ke entitas HTML atau decode entitas ke teks biasa.',
    tipTitle: 'Tips', tip1: 'Selalu encode <, >, &', tip2: 'Entitas bernama lebih mudah dibaca', tip3: 'Mencegah XSS', tip4: 'Hex untuk konsistensi', tip5: 'Decode saat ekstraksi',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apa itu entitas HTML?', faq1a: 'Kode khusus untuk karakter dengan makna khusus di HTML.',
    faq2q: 'Kapan encode?', faq2a: 'Saat menampilkan konten pengguna atau kode HTML sebagai teks.', faq3q: 'Perbedaan bernama, numerik, dan hex?', faq3a: 'Bernama menggunakan nama, numerik kode desimal, hex kode heksadesimal.',
    faq4q: 'Encoding mencegah XSS?', faq4a: 'Pertahanan penting terhadap serangan XSS.', faq5q: 'Mendukung Unicode?', faq5a: 'Ya, semua karakter Unicode didukung.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวเข้ารหัส / ถอดรหัส HTML Entity', description: 'เข้ารหัสอักขระพิเศษเป็น HTML entity หรือถอดรหัส entity เป็นข้อความ',
    inputLabel: 'นำเข้า', outputLabel: 'ผลลัพธ์', inputPlaceholder: 'ใส่ข้อความหรือ HTML entity...',
    encodeBtn: 'เข้ารหัส', decodeBtn: 'ถอดรหัส', encodeAllBtn: 'เข้ารหัสทั้งหมด',
    clear: 'ล้าง', swap: 'สลับ', loadSample: 'โหลดตัวอย่าง',
    mode: 'โหมด', named: 'ที่มีชื่อ', numeric: 'ตัวเลข', hex: 'ฐานสิบหก',
    refTitle: 'อ้างอิง HTML Entity', charCol: 'อักขระ', namedCol: 'ที่มีชื่อ', numericCol: 'ตัวเลข', descCol: 'คำอธิบาย',
    introTitle: 'ตัวเข้ารหัส/ถอดรหัส HTML Entity ฟรี', introText: 'แปลงอักขระพิเศษเป็น HTML entity หรือถอดรหัส entity เป็นข้อความ',
    tipTitle: 'เคล็ดลับ', tip1: 'เข้ารหัส <, >, & เสมอ', tip2: 'Entity ที่มีชื่ออ่านง่ายกว่า', tip3: 'ป้องกัน XSS', tip4: 'Hex เพื่อความสอดคล้อง', tip5: 'ถอดรหัสเมื่อดึงข้อความ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'HTML Entity คืออะไร?', faq1a: 'รหัสพิเศษสำหรับอักขระที่มีความหมายพิเศษใน HTML',
    faq2q: 'เมื่อใดควรเข้ารหัส?', faq2a: 'เมื่อแสดงเนื้อหาจากผู้ใช้หรือโค้ด HTML เป็นข้อความ', faq3q: 'ความแตกต่างระหว่าง named, numeric และ hex?', faq3a: 'Named ใช้ชื่อ numeric ใช้รหัสทศนิยม hex ใช้รหัสฐานสิบหก',
    faq4q: 'ป้องกัน XSS ได้หรือไม่?', faq4a: 'การป้องกันที่สำคัญต่อการโจมตี XSS', faq5q: 'รองรับ Unicode หรือไม่?', faq5a: 'ใช่ รองรับอักขระ Unicode ทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const NAMED_ENTITIES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  '\u00a0': '&nbsp;', '\u00a9': '&copy;', '\u00ae': '&reg;', '\u2122': '&trade;',
  '\u2014': '&mdash;', '\u2013': '&ndash;', '\u2026': '&hellip;', '\u00d7': '&times;',
  '\u00f7': '&divide;', '\u2190': '&larr;', '\u2192': '&rarr;', '\u2191': '&uarr;', '\u2193': '&darr;',
};

const REVERSE_NAMED: Record<string, string> = Object.fromEntries(
  Object.entries(NAMED_ENTITIES).map(([char, entity]) => [entity, char])
);

const ENTITY_REF = [
  { char: '&', named: '&amp;', numeric: '&#38;', desc: { en: 'Ampersand', zh: '和号', fr: 'Esperluette', de: 'Kaufmannsund', es: 'Ampersand', ja: 'アンパサンド', ko: '앰퍼샌드' } },
  { char: '<', named: '&lt;', numeric: '&#60;', desc: { en: 'Less than', zh: '小于号', fr: 'Inferieur a', de: 'Kleiner als', es: 'Menor que', ja: '小なり', ko: '미만' } },
  { char: '>', named: '&gt;', numeric: '&#62;', desc: { en: 'Greater than', zh: '大于号', fr: 'Superieur a', de: 'Groesser als', es: 'Mayor que', ja: '大なり', ko: '초과' } },
  { char: '"', named: '&quot;', numeric: '&#34;', desc: { en: 'Double quote', zh: '双引号', fr: 'Guillemet double', de: 'Anfuehrungszeichen', es: 'Comilla doble', ja: '二重引用符', ko: '큰따옴표' } },
  { char: "'", named: '&#39;', numeric: '&#39;', desc: { en: 'Single quote', zh: '单引号', fr: 'Apostrophe', de: 'Apostroph', es: 'Comilla simple', ja: '一重引用符', ko: '작은따옴표' } },
  { char: '\u00a9', named: '&copy;', numeric: '&#169;', desc: { en: 'Copyright', zh: '版权', fr: 'Copyright', de: 'Copyright', es: 'Copyright', ja: '著作権', ko: '저작권' } },
  { char: '\u00ae', named: '&reg;', numeric: '&#174;', desc: { en: 'Registered', zh: '注册商标', fr: 'Marque deposee', de: 'Registriert', es: 'Registrado', ja: '登録商標', ko: '등록상표' } },
  { char: '\u2014', named: '&mdash;', numeric: '&#8212;', desc: { en: 'Em dash', zh: '破折号', fr: 'Tiret cadratin', de: 'Geviertstrich', es: 'Guion largo', ja: 'ダッシュ', ko: '전각 대시' } },
];

const SAMPLE_TEXT = '<div class="greeting">Hello & welcome to "DevToolBox"! It\'s free & open-source.</div>';

export default function HtmlEntityEncoder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'named' | 'numeric' | 'hex'>('named');

  const encodeHtml = useCallback((encodeAll: boolean = false) => {
    if (!input) return;
    let result = '';
    for (const char of input) {
      if (!encodeAll && NAMED_ENTITIES[char] && mode === 'named') {
        result += NAMED_ENTITIES[char];
      } else if (!encodeAll && ['&', '<', '>', '"', "'"].includes(char)) {
        if (mode === 'named') result += NAMED_ENTITIES[char] || char;
        else if (mode === 'numeric') result += `&#${char.charCodeAt(0)};`;
        else result += `&#x${char.charCodeAt(0).toString(16).toUpperCase()};`;
      } else if (encodeAll || char.charCodeAt(0) > 127) {
        if (mode === 'numeric') result += `&#${char.codePointAt(0)};`;
        else if (mode === 'hex') result += `&#x${(char.codePointAt(0) || 0).toString(16).toUpperCase()};`;
        else {
          const named = NAMED_ENTITIES[char];
          result += named || `&#${char.codePointAt(0)};`;
        }
      } else if (!encodeAll) {
        result += char;
      } else {
        if (mode === 'numeric') result += `&#${char.charCodeAt(0)};`;
        else if (mode === 'hex') result += `&#x${char.charCodeAt(0).toString(16).toUpperCase()};`;
        else result += `&#${char.charCodeAt(0)};`;
      }
    }
    setOutput(result);
  }, [input, mode]);

  const decodeHtml = useCallback(() => {
    if (!input) return;
    let result = input;
    for (const [entity, char] of Object.entries(REVERSE_NAMED)) {
      result = result.split(entity).join(char);
    }
    result = result.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)));
    result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)));
    setOutput(result);
  }, [input]);

  const handleSwap = () => { setInput(output); setOutput(''); };

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
    <ToolLayout title={t.title} description={t.description} toolId="html-entity-encoder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{t.mode}:</label>
        {(['named', 'numeric', 'hex'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={mode === m ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ fontSize: 12, padding: '5px 12px' }}>
            {t[m]}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => encodeHtml(false)} className="btn btn-primary">{t.encodeBtn}</button>
        <button onClick={() => decodeHtml()} className="btn btn-primary">{t.decodeBtn}</button>
        <button onClick={() => encodeHtml(true)} className="btn btn-secondary">{t.encodeAllBtn}</button>
        <button onClick={handleSwap} className="btn btn-secondary">{t.swap}</button>
        <button onClick={() => { setInput(SAMPLE_TEXT); setOutput(''); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.refTitle}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.charCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.namedCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.numericCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
              </tr>
            </thead>
            <tbody>
              {ENTITY_REF.map((ref, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700, fontSize: 16 }}>{ref.char}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{ref.named}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{ref.numeric}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{(ref.desc as Record<string, string>)[lang] || ref.desc.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/escape-unescape`, label: 'Escape/Unescape' },
            { href: `/${lang}/tools/html-beautifier`, label: 'HTML Beautifier' },
            { href: `/${lang}/tools/html-to-markdown-converter`, label: 'HTML to Markdown' },
            { href: `/${lang}/tools/url-encoder-decoder`, label: 'URL Encoder/Decoder' },
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
