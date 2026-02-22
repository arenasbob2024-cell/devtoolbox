'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to XML Converter',
    description: 'Convert JSON to XML and XML to JSON instantly. Format and validate with customizable indentation and root element options.',
    jsonToXml: 'JSON to XML',
    xmlToJson: 'XML to JSON',
    inputLabel: 'Input',
    outputLabel: 'Output',
    jsonPlaceholder: '{\n  "name": "John",\n  "age": 30,\n  "address": {\n    "city": "New York",\n    "zip": "10001"\n  },\n  "hobbies": ["reading", "coding"]\n}',
    xmlPlaceholder: '<root>\n  <name>John</name>\n  <age>30</age>\n  <address>\n    <city>New York</city>\n    <zip>10001</zip>\n  </address>\n</root>',
    convert: 'Convert',
    clear: 'Clear',
    swap: 'Swap',
    indent: 'Indent',
    rootElement: 'Root element',
    loadSample: 'Load Sample',
    introTitle: 'Free Online JSON to XML Converter',
    introText: 'This tool converts JSON data to XML format and vice versa. Paste your JSON or XML, click convert, and get the formatted output instantly. Customize the root element name and indentation level for clean, readable output.',
    howTitle: 'How to Convert JSON to XML',
    step1: 'Paste or type your JSON data in the input panel',
    step2: 'Set the root element name and indentation level',
    step3: 'Click Convert to generate the XML output',
    step4: 'Copy the result or switch to XML to JSON mode for reverse conversion',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is JSON to XML conversion?',
    faq1a: 'JSON to XML conversion transforms JavaScript Object Notation data into Extensible Markup Language format. JSON uses key-value pairs and arrays, while XML uses tags and attributes. The converter maps JSON keys to XML element names and handles nested objects and arrays.',
    faq2q: 'How are JSON arrays converted to XML?',
    faq2a: 'JSON arrays are converted by wrapping each item in an element tag. For example, a "colors" array becomes multiple <colors> child elements. Nested arrays and objects are recursively converted to maintain the data structure.',
    faq3q: 'Can I convert XML back to JSON?',
    faq3a: 'Yes, switch to the "XML to JSON" tab to paste XML and convert it to JSON format. The converter handles elements, attributes, and text content, mapping them to appropriate JSON structures.',
    faq4q: 'Is my data processed on a server?',
    faq4a: 'No, all conversion happens entirely in your browser using JavaScript. Your data is never sent to any server, ensuring complete privacy and security.',
    faq5q: 'Does the converter handle special characters?',
    faq5a: 'Yes, the converter properly escapes XML special characters like <, >, &, quotes, and apostrophes. In reverse, XML entities are decoded back to their original characters when converting to JSON.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 转 XML 转换器',
    description: '即时将 JSON 转换为 XML 或将 XML 转换为 JSON。支持自定义缩进和根元素选项。',
    jsonToXml: 'JSON 转 XML',
    xmlToJson: 'XML 转 JSON',
    inputLabel: '输入',
    outputLabel: '输出',
    jsonPlaceholder: '{\n  "name": "张三",\n  "age": 30,\n  "address": {\n    "city": "北京",\n    "zip": "100000"\n  },\n  "hobbies": ["阅读", "编程"]\n}',
    xmlPlaceholder: '<root>\n  <name>张三</name>\n  <age>30</age>\n  <address>\n    <city>北京</city>\n    <zip>100000</zip>\n  </address>\n</root>',
    convert: '转换',
    clear: '清除',
    swap: '交换',
    indent: '缩进',
    rootElement: '根元素',
    loadSample: '加载示例',
    introTitle: '免费在线 JSON 转 XML 转换器',
    introText: '此工具可以将 JSON 数据转换为 XML 格式，反之亦然。粘贴 JSON 或 XML，点击转换即可获取格式化输出。支持自定义根元素名称和缩进级别。',
    howTitle: '如何将 JSON 转换为 XML',
    step1: '在输入面板中粘贴或输入 JSON 数据',
    step2: '设置根元素名称和缩进级别',
    step3: '点击转换生成 XML 输出',
    step4: '复制结果或切换到 XML 转 JSON 模式进行反向转换',
    faqTitle: '常见问题',
    faq1q: '什么是 JSON 到 XML 的转换？',
    faq1a: 'JSON 到 XML 的转换将 JavaScript 对象表示法数据转换为可扩展标记语言格式。JSON 使用键值对和数组，XML 使用标签和属性。转换器将 JSON 键映射为 XML 元素名。',
    faq2q: 'JSON 数组如何转换为 XML？',
    faq2a: 'JSON 数组通过将每个项目包装在元素标签中来转换。例如，"colors"数组变为多个 <colors> 子元素。嵌套数组和对象递归转换以维护数据结构。',
    faq3q: '可以将 XML 转换回 JSON 吗？',
    faq3a: '可以，切换到"XML 转 JSON"标签页粘贴 XML 即可转换为 JSON 格式。',
    faq4q: '数据是否在服务器上处理？',
    faq4a: '不会，所有转换完全在浏览器中使用 JavaScript 进行。数据永远不会发送到服务器。',
    faq5q: '转换器能处理特殊字符吗？',
    faq5a: '是的，转换器会正确转义 XML 特殊字符如 <、>、& 等。反向转换时，XML 实体会被解码回原始字符。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'JSON to XML 変換ツール',
    description: 'JSONをXMLに、XMLをJSONに即座に変換。カスタムインデントとルート要素オプション付き。',
    jsonToXml: 'JSON → XML',
    xmlToJson: 'XML → JSON',
    inputLabel: '入力',
    outputLabel: '出力',
    jsonPlaceholder: '{\n  "name": "太郎",\n  "age": 30,\n  "address": {\n    "city": "東京",\n    "zip": "100-0001"\n  }\n}',
    xmlPlaceholder: '<root>\n  <name>太郎</name>\n  <age>30</age>\n  <address>\n    <city>東京</city>\n    <zip>100-0001</zip>\n  </address>\n</root>',
    convert: '変換',
    clear: 'クリア',
    swap: '入れ替え',
    indent: 'インデント',
    rootElement: 'ルート要素',
    loadSample: 'サンプル読み込み',
    introTitle: '無料オンラインJSON to XML変換ツール',
    introText: 'このツールはJSONデータをXML形式に変換（逆も可）します。JSONまたはXMLを貼り付けて変換をクリックするだけ。',
    howTitle: 'JSONをXMLに変換する方法',
    step1: '入力パネルにJSONデータを貼り付けまたは入力',
    step2: 'ルート要素名とインデントレベルを設定',
    step3: '変換をクリックしてXML出力を生成',
    step4: '結果をコピー、またはXML→JSONモードに切り替え',
    faqTitle: 'よくある質問',
    faq1q: 'JSON to XML変換とは？',
    faq1a: 'JSONデータをXML形式に変換することです。JSONはキーと値のペアと配列を使用し、XMLはタグと属性を使用します。',
    faq2q: 'JSON配列はどのようにXMLに変換されますか？',
    faq2a: '配列の各アイテムが要素タグで囲まれます。ネストされた配列とオブジェクトは再帰的に変換されます。',
    faq3q: 'XMLをJSONに戻せますか？',
    faq3a: 'はい、「XML→JSON」タブに切り替えてXMLを貼り付けるとJSON形式に変換できます。',
    faq4q: 'データはサーバーで処理されますか？',
    faq4a: 'いいえ、すべての変換はブラウザ内のJavaScriptで行われます。データはサーバーに送信されません。',
    faq5q: '特殊文字は処理できますか？',
    faq5a: 'はい、XML特殊文字（<、>、&など）を適切にエスケープします。逆変換では実体がデコードされます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON to XML 변환기',
    description: 'JSON을 XML로, XML을 JSON으로 즉시 변환합니다. 사용자 정의 들여쓰기 및 루트 요소 옵션을 제공합니다.',
    jsonToXml: 'JSON → XML',
    xmlToJson: 'XML → JSON',
    inputLabel: '입력',
    outputLabel: '출력',
    jsonPlaceholder: '{\n  "name": "홍길동",\n  "age": 30,\n  "address": {\n    "city": "서울",\n    "zip": "06000"\n  }\n}',
    xmlPlaceholder: '<root>\n  <name>홍길동</name>\n  <age>30</age>\n  <address>\n    <city>서울</city>\n    <zip>06000</zip>\n  </address>\n</root>',
    convert: '변환',
    clear: '지우기',
    swap: '교환',
    indent: '들여쓰기',
    rootElement: '루트 요소',
    loadSample: '샘플 로드',
    introTitle: '무료 온라인 JSON to XML 변환기',
    introText: '이 도구는 JSON 데이터를 XML 형식으로 변환하며 그 반대도 가능합니다. JSON 또는 XML을 붙여넣고 변환을 클릭하면 됩니다.',
    howTitle: 'JSON을 XML로 변환하는 방법',
    step1: '입력 패널에 JSON 데이터를 붙여넣기 또는 입력',
    step2: '루트 요소 이름과 들여쓰기 수준 설정',
    step3: '변환을 클릭하여 XML 출력 생성',
    step4: '결과를 복사하거나 XML→JSON 모드로 전환',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON to XML 변환이란?',
    faq1a: 'JSON 데이터를 XML 형식으로 변환하는 것입니다. JSON은 키-값 쌍과 배열을, XML은 태그와 속성을 사용합니다.',
    faq2q: 'JSON 배열은 XML로 어떻게 변환되나요?',
    faq2a: '배열의 각 항목이 요소 태그로 감싸집니다. 중첩된 배열과 객체는 재귀적으로 변환됩니다.',
    faq3q: 'XML을 JSON으로 다시 변환할 수 있나요?',
    faq3a: '네, "XML→JSON" 탭으로 전환하여 XML을 붙여넣으면 JSON 형식으로 변환할 수 있습니다.',
    faq4q: '데이터가 서버에서 처리되나요?',
    faq4a: '아니요, 모든 변환은 브라우저 내 JavaScript로 수행됩니다. 데이터는 서버로 전송되지 않습니다.',
    faq5q: '특수 문자를 처리할 수 있나요?',
    faq5a: '네, XML 특수 문자(<, >, & 등)를 적절히 이스케이프합니다. 역변환 시 엔티티가 디코딩됩니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Convertisseur JSON vers XML',
    description: 'Convertissez JSON en XML et XML en JSON instantanement. Formatez avec indentation personnalisable et options d\'element racine.',
    jsonToXml: 'JSON vers XML', xmlToJson: 'XML vers JSON', inputLabel: 'Entree', outputLabel: 'Sortie',
    jsonPlaceholder: '{\n  "name": "Jean",\n  "age": 30\n}', xmlPlaceholder: '<root>\n  <name>Jean</name>\n  <age>30</age>\n</root>',
    convert: 'Convertir', clear: 'Effacer', swap: 'Echanger', indent: 'Indentation', rootElement: 'Element racine', loadSample: 'Charger un exemple',
    introTitle: 'Convertisseur JSON vers XML gratuit en ligne',
    introText: 'Cet outil convertit les donnees JSON en format XML et vice versa. Collez votre JSON ou XML, cliquez sur convertir et obtenez le resultat formate instantanement.',
    howTitle: 'Comment convertir JSON en XML',
    step1: 'Collez ou tapez vos donnees JSON dans le panneau d\'entree',
    step2: "Definissez le nom de l'element racine et le niveau d'indentation",
    step3: 'Cliquez sur Convertir pour generer la sortie XML',
    step4: 'Copiez le resultat ou passez en mode XML vers JSON',
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce que la conversion JSON vers XML ?",
    faq1a: 'La conversion JSON vers XML transforme les donnees JSON en format XML. JSON utilise des paires cle-valeur, XML utilise des balises et attributs.',
    faq2q: 'Comment les tableaux JSON sont-ils convertis en XML ?',
    faq2a: 'Chaque element du tableau est encapsule dans une balise element. Les tableaux et objets imbriques sont convertis recursivement.',
    faq3q: 'Puis-je convertir XML en JSON ?',
    faq3a: 'Oui, passez a l\'onglet "XML vers JSON" pour coller du XML et le convertir en JSON.',
    faq4q: 'Mes donnees sont-elles traitees sur un serveur ?',
    faq4a: 'Non, toute la conversion se fait dans votre navigateur avec JavaScript. Aucune donnee n\'est envoyee a un serveur.',
    faq5q: 'Le convertisseur gere-t-il les caracteres speciaux ?',
    faq5a: 'Oui, le convertisseur echappe correctement les caracteres speciaux XML comme <, >, & et les guillemets.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON zu XML Konverter',
    description: 'Konvertieren Sie JSON in XML und XML in JSON sofort. Formatierung mit anpassbarer Einrueckung und Wurzelelement-Optionen.',
    jsonToXml: 'JSON zu XML', xmlToJson: 'XML zu JSON', inputLabel: 'Eingabe', outputLabel: 'Ausgabe',
    jsonPlaceholder: '{\n  "name": "Hans",\n  "age": 30\n}', xmlPlaceholder: '<root>\n  <name>Hans</name>\n  <age>30</age>\n</root>',
    convert: 'Konvertieren', clear: 'Loeschen', swap: 'Tauschen', indent: 'Einrueckung', rootElement: 'Wurzelelement', loadSample: 'Beispiel laden',
    introTitle: 'Kostenloser Online JSON zu XML Konverter',
    introText: 'Dieses Tool konvertiert JSON-Daten in XML-Format und umgekehrt. Fuegen Sie Ihr JSON oder XML ein, klicken Sie auf Konvertieren.',
    howTitle: 'So konvertieren Sie JSON in XML',
    step1: 'Fuegen Sie JSON-Daten im Eingabebereich ein', step2: 'Setzen Sie Wurzelelementname und Einrueckungsebene',
    step3: 'Klicken Sie auf Konvertieren', step4: 'Kopieren Sie das Ergebnis oder wechseln Sie zu XML zu JSON',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist JSON-zu-XML-Konvertierung?', faq1a: 'Die Konvertierung wandelt JSON-Daten in XML-Format um. JSON verwendet Schluessel-Wert-Paare, XML verwendet Tags und Attribute.',
    faq2q: 'Wie werden JSON-Arrays in XML konvertiert?', faq2a: 'Jedes Array-Element wird in ein Element-Tag eingeschlossen. Verschachtelte Arrays und Objekte werden rekursiv konvertiert.',
    faq3q: 'Kann ich XML zurueck in JSON konvertieren?', faq3a: 'Ja, wechseln Sie zum Tab "XML zu JSON" um XML einzufuegen und in JSON zu konvertieren.',
    faq4q: 'Werden meine Daten auf einem Server verarbeitet?', faq4a: 'Nein, alle Konvertierung erfolgt in Ihrem Browser mit JavaScript.',
    faq5q: 'Behandelt der Konverter Sonderzeichen?', faq5a: 'Ja, der Konverter escaped XML-Sonderzeichen wie <, >, & und Anfuehrungszeichen korrekt.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor JSON a XML',
    description: 'Convierte JSON a XML y XML a JSON al instante. Formatea con indentacion personalizable y opciones de elemento raiz.',
    jsonToXml: 'JSON a XML', xmlToJson: 'XML a JSON', inputLabel: 'Entrada', outputLabel: 'Salida',
    jsonPlaceholder: '{\n  "nombre": "Juan",\n  "edad": 30\n}', xmlPlaceholder: '<root>\n  <nombre>Juan</nombre>\n  <edad>30</edad>\n</root>',
    convert: 'Convertir', clear: 'Limpiar', swap: 'Intercambiar', indent: 'Indentacion', rootElement: 'Elemento raiz', loadSample: 'Cargar ejemplo',
    introTitle: 'Convertidor JSON a XML gratuito en linea',
    introText: 'Esta herramienta convierte datos JSON a formato XML y viceversa. Pega tu JSON o XML, haz clic en convertir y obtiene el resultado formateado al instante.',
    howTitle: 'Como convertir JSON a XML',
    step1: 'Pega o escribe tus datos JSON en el panel de entrada', step2: 'Configura el nombre del elemento raiz y nivel de indentacion',
    step3: 'Haz clic en Convertir para generar la salida XML', step4: 'Copia el resultado o cambia al modo XML a JSON',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la conversion JSON a XML?', faq1a: 'La conversion transforma datos JSON en formato XML. JSON usa pares clave-valor, XML usa etiquetas y atributos.',
    faq2q: 'Como se convierten los arrays JSON a XML?', faq2a: 'Cada elemento del array se envuelve en una etiqueta. Arrays y objetos anidados se convierten recursivamente.',
    faq3q: 'Puedo convertir XML a JSON?', faq3a: 'Si, cambia a la pestana "XML a JSON" para pegar XML y convertirlo a JSON.',
    faq4q: 'Se procesan mis datos en un servidor?', faq4a: 'No, toda la conversion se realiza en tu navegador con JavaScript.',
    faq5q: 'El convertidor maneja caracteres especiales?', faq5a: 'Si, el convertidor escapa correctamente los caracteres especiales XML como <, >, & y comillas.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Conversor JSON para XML',
    description: 'Converta JSON para XML e XML para JSON instantaneamente. Formate com indentacao personalizavel e opcoes de elemento raiz.',
    jsonToXml: 'JSON para XML', xmlToJson: 'XML para JSON', inputLabel: 'Entrada', outputLabel: 'Saida',
    jsonPlaceholder: '{\n  "nome": "Joao",\n  "idade": 30\n}', xmlPlaceholder: '<root>\n  <nome>Joao</nome>\n  <idade>30</idade>\n</root>',
    convert: 'Converter', clear: 'Limpar', swap: 'Trocar', indent: 'Indentacao', rootElement: 'Elemento raiz', loadSample: 'Carregar exemplo',
    introTitle: 'Conversor JSON para XML Online Gratuito',
    introText: 'Esta ferramenta converte dados JSON em formato XML e vice-versa. Cole seu JSON ou XML, clique em converter e obtenha o resultado formatado instantaneamente.',
    howTitle: 'Como converter JSON para XML',
    step1: 'Cole ou digite seus dados JSON no painel de entrada', step2: 'Defina o nome do elemento raiz e nivel de indentacao',
    step3: 'Clique em Converter para gerar a saida XML', step4: 'Copie o resultado ou mude para o modo XML para JSON',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e conversao JSON para XML?', faq1a: 'A conversao transforma dados JSON em formato XML. JSON usa pares chave-valor, XML usa tags e atributos.',
    faq2q: 'Como arrays JSON sao convertidos para XML?', faq2a: 'Cada item do array e envolvido em uma tag. Arrays e objetos aninhados sao convertidos recursivamente.',
    faq3q: 'Posso converter XML para JSON?', faq3a: 'Sim, mude para a aba "XML para JSON" para colar XML e converter para JSON.',
    faq4q: 'Meus dados sao processados em um servidor?', faq4a: 'Nao, toda a conversao acontece no seu navegador com JavaScript.',
    faq5q: 'O conversor lida com caracteres especiais?', faq5a: 'Sim, o conversor escapa corretamente caracteres especiais XML como <, >, & e aspas.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Convertitore JSON in XML',
    description: 'Converti JSON in XML e XML in JSON istantaneamente. Formatta con indentazione personalizzabile e opzioni elemento radice.',
    jsonToXml: 'JSON in XML', xmlToJson: 'XML in JSON', inputLabel: 'Input', outputLabel: 'Output',
    jsonPlaceholder: '{\n  "nome": "Marco",\n  "eta": 30\n}', xmlPlaceholder: '<root>\n  <nome>Marco</nome>\n  <eta>30</eta>\n</root>',
    convert: 'Converti', clear: 'Cancella', swap: 'Scambia', indent: 'Indentazione', rootElement: 'Elemento radice', loadSample: 'Carica esempio',
    introTitle: 'Convertitore JSON in XML Online Gratuito',
    introText: 'Questo strumento converte dati JSON in formato XML e viceversa. Incolla il tuo JSON o XML, clicca converti e ottieni il risultato formattato istantaneamente.',
    howTitle: 'Come convertire JSON in XML',
    step1: "Incolla o digita i dati JSON nel pannello di input", step2: "Imposta il nome dell'elemento radice e il livello di indentazione",
    step3: 'Clicca Converti per generare l\'output XML', step4: 'Copia il risultato o passa alla modalita XML in JSON',
    faqTitle: 'Domande frequenti',
    faq1q: "Cos'e la conversione JSON in XML?", faq1a: 'La conversione trasforma dati JSON in formato XML. JSON usa coppie chiave-valore, XML usa tag e attributi.',
    faq2q: 'Come vengono convertiti gli array JSON in XML?', faq2a: 'Ogni elemento dell\'array viene racchiuso in un tag. Array e oggetti nidificati vengono convertiti ricorsivamente.',
    faq3q: 'Posso convertire XML in JSON?', faq3a: 'Si, passa alla scheda "XML in JSON" per incollare XML e convertirlo in JSON.',
    faq4q: 'I miei dati vengono elaborati su un server?', faq4a: 'No, tutta la conversione avviene nel browser con JavaScript.',
    faq5q: 'Il convertitore gestisce i caratteri speciali?', faq5a: 'Si, il convertitore fa l\'escape corretto dei caratteri speciali XML come <, >, & e virgolette.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'JSON naar XML Converter',
    description: 'Converteer JSON naar XML en XML naar JSON direct. Formatteer met aanpasbare inspringing en root-element opties.',
    jsonToXml: 'JSON naar XML', xmlToJson: 'XML naar JSON', inputLabel: 'Invoer', outputLabel: 'Uitvoer',
    jsonPlaceholder: '{\n  "naam": "Jan",\n  "leeftijd": 30\n}', xmlPlaceholder: '<root>\n  <naam>Jan</naam>\n  <leeftijd>30</leeftijd>\n</root>',
    convert: 'Converteren', clear: 'Wissen', swap: 'Wisselen', indent: 'Inspringing', rootElement: 'Root-element', loadSample: 'Voorbeeld laden',
    introTitle: 'Gratis Online JSON naar XML Converter',
    introText: 'Deze tool converteert JSON-gegevens naar XML-formaat en omgekeerd. Plak uw JSON of XML, klik op converteren en krijg de geformateerde uitvoer direct.',
    howTitle: 'Hoe JSON naar XML te converteren',
    step1: 'Plak of typ JSON-gegevens in het invoerpaneel', step2: 'Stel de root-elementnaam en inspringniveau in',
    step3: 'Klik op Converteren om de XML-uitvoer te genereren', step4: 'Kopieer het resultaat of schakel naar XML naar JSON modus',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is JSON naar XML conversie?', faq1a: 'JSON naar XML conversie transformeert JSON-gegevens naar XML-formaat. JSON gebruikt sleutel-waardeparen, XML gebruikt tags en attributen.',
    faq2q: 'Hoe worden JSON-arrays geconverteerd naar XML?', faq2a: 'Elk array-element wordt in een element-tag gewikkeld. Geneste arrays en objecten worden recursief geconverteerd.',
    faq3q: 'Kan ik XML terug naar JSON converteren?', faq3a: 'Ja, schakel naar het tabblad "XML naar JSON" om XML te plakken en naar JSON te converteren.',
    faq4q: 'Worden mijn gegevens op een server verwerkt?', faq4a: 'Nee, alle conversie vindt plaats in uw browser met JavaScript.',
    faq5q: 'Behandelt de converter speciale tekens?', faq5a: 'Ja, de converter escapet XML-speciale tekens zoals <, >, & en aanhalingstekens correct.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Konwerter JSON na XML',
    description: 'Konwertuj JSON na XML i XML na JSON natychmiast. Formatuj z dostosowywalnym wciecziem i opcjami elementu glownego.',
    jsonToXml: 'JSON na XML', xmlToJson: 'XML na JSON', inputLabel: 'Wejscie', outputLabel: 'Wyjscie',
    jsonPlaceholder: '{\n  "imie": "Jan",\n  "wiek": 30\n}', xmlPlaceholder: '<root>\n  <imie>Jan</imie>\n  <wiek>30</wiek>\n</root>',
    convert: 'Konwertuj', clear: 'Wyczysc', swap: 'Zamien', indent: 'Wciecie', rootElement: 'Element glowny', loadSample: 'Zaladuj przyklad',
    introTitle: 'Darmowy Konwerter JSON na XML Online',
    introText: 'To narzedzie konwertuje dane JSON na format XML i odwrotnie. Wklej JSON lub XML, kliknij konwertuj i otrzymaj sformatowany wynik.',
    howTitle: 'Jak konwertowac JSON na XML',
    step1: 'Wklej lub wpisz dane JSON w panelu wejsciowym', step2: 'Ustaw nazwe elementu glownego i poziom wciecia',
    step3: 'Kliknij Konwertuj aby wygenerowac wyjscie XML', step4: 'Skopiuj wynik lub przelacz na tryb XML na JSON',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Co to jest konwersja JSON na XML?', faq1a: 'Konwersja przeksztalca dane JSON na format XML. JSON uzywa par klucz-wartosc, XML uzywa znacznikow i atrybutow.',
    faq2q: 'Jak tablice JSON sa konwertowane na XML?', faq2a: 'Kazdy element tablicy jest opakowany w znacznik elementu. Zagniezdzone tablice i obiekty sa konwertowane rekurencyjnie.',
    faq3q: 'Czy moge konwertowac XML z powrotem na JSON?', faq3a: 'Tak, przelacz na zakladke "XML na JSON" aby wkleic XML i konwertowac na JSON.',
    faq4q: 'Czy moje dane sa przetwarzane na serwerze?', faq4a: 'Nie, cala konwersja odbywa sie w przegladarce za pomoca JavaScript.',
    faq5q: 'Czy konwerter obsluguje znaki specjalne?', faq5a: 'Tak, konwerter poprawnie escapuje znaki specjalne XML jak <, >, & i cudzyslowy.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JSON till XML Konverterare',
    description: 'Konvertera JSON till XML och XML till JSON direkt. Formatera med anpassningsbar indragning och rotelement-alternativ.',
    jsonToXml: 'JSON till XML', xmlToJson: 'XML till JSON', inputLabel: 'Indata', outputLabel: 'Utdata',
    jsonPlaceholder: '{\n  "namn": "Erik",\n  "alder": 30\n}', xmlPlaceholder: '<root>\n  <namn>Erik</namn>\n  <alder>30</alder>\n</root>',
    convert: 'Konvertera', clear: 'Rensa', swap: 'Byt', indent: 'Indragning', rootElement: 'Rotelement', loadSample: 'Ladda exempel',
    introTitle: 'Gratis JSON till XML Konverterare Online',
    introText: 'Detta verktyg konverterar JSON-data till XML-format och vice versa. Klistra in din JSON eller XML, klicka pa konvertera.',
    howTitle: 'Hur man konverterar JSON till XML',
    step1: 'Klistra in eller skriv JSON-data i indatapanelen', step2: 'Stall in rotelementnamn och indragningsniva',
    step3: 'Klicka pa Konvertera for att generera XML-utdata', step4: 'Kopiera resultatet eller byt till XML till JSON-lage',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar JSON till XML-konvertering?', faq1a: 'Konverteringen omvandlar JSON-data till XML-format. JSON anvander nyckel-vardepar, XML anvander taggar och attribut.',
    faq2q: 'Hur konverteras JSON-arrayer till XML?', faq2a: 'Varje array-element lindas i en elementtagg. Nastade arrayer och objekt konverteras rekursivt.',
    faq3q: 'Kan jag konvertera XML tillbaka till JSON?', faq3a: 'Ja, byt till fliken "XML till JSON" for att klistra in XML och konvertera till JSON.',
    faq4q: 'Bearbetas mina data pa en server?', faq4a: 'Nej, all konvertering sker i din webblasare med JavaScript.',
    faq5q: 'Hanterar konverteraren specialtecken?', faq5a: 'Ja, konverteraren escapar XML-specialtecken som <, >, & och citattecken korrekt.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JSON til XML Konverterer',
    description: 'Konverter JSON til XML og XML til JSON umiddelbart. Formater med tilpassbar innrykk og rotelement-alternativer.',
    jsonToXml: 'JSON til XML', xmlToJson: 'XML til JSON', inputLabel: 'Inndata', outputLabel: 'Utdata',
    jsonPlaceholder: '{\n  "navn": "Erik",\n  "alder": 30\n}', xmlPlaceholder: '<root>\n  <navn>Erik</navn>\n  <alder>30</alder>\n</root>',
    convert: 'Konverter', clear: 'Toom', swap: 'Bytt', indent: 'Innrykk', rootElement: 'Rotelement', loadSample: 'Last eksempel',
    introTitle: 'Gratis JSON til XML Konverterer Online',
    introText: 'Dette verktooyet konverterer JSON-data til XML-format og omvendt. Lim inn din JSON eller XML, klikk pa konverter.',
    howTitle: 'Slik konverterer du JSON til XML',
    step1: 'Lim inn eller skriv JSON-data i inndatapanelet', step2: 'Sett rotelementnavn og innrykkniva',
    step3: 'Klikk pa Konverter for a generere XML-utdata', step4: 'Kopier resultatet eller bytt til XML til JSON-modus',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er JSON til XML-konvertering?', faq1a: 'Konverteringen transformerer JSON-data til XML-format. JSON bruker nokkel-verdipar, XML bruker tagger og attributter.',
    faq2q: 'Hvordan konverteres JSON-arrays til XML?', faq2a: 'Hvert array-element pakkes inn i en elementtag. Nestede arrays og objekter konverteres rekursivt.',
    faq3q: 'Kan jeg konvertere XML tilbake til JSON?', faq3a: 'Ja, bytt til fanen "XML til JSON" for a lime inn XML og konvertere til JSON.',
    faq4q: 'Behandles dataene mine pa en server?', faq4a: 'Nei, all konvertering skjer i nettleseren din med JavaScript.',
    faq5q: 'Handterer konvertereren spesialtegn?', faq5a: 'Ja, konvertereren escaper XML-spesialtegn som <, >, & og anfoorselstegn korrekt.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Konverter JSON ke XML',
    description: 'Konversi JSON ke XML dan XML ke JSON secara instan. Format dengan indentasi yang dapat disesuaikan dan opsi elemen root.',
    jsonToXml: 'JSON ke XML', xmlToJson: 'XML ke JSON', inputLabel: 'Input', outputLabel: 'Output',
    jsonPlaceholder: '{\n  "nama": "Budi",\n  "umur": 30\n}', xmlPlaceholder: '<root>\n  <nama>Budi</nama>\n  <umur>30</umur>\n</root>',
    convert: 'Konversi', clear: 'Hapus', swap: 'Tukar', indent: 'Indentasi', rootElement: 'Elemen root', loadSample: 'Muat contoh',
    introTitle: 'Konverter JSON ke XML Online Gratis',
    introText: 'Alat ini mengonversi data JSON ke format XML dan sebaliknya. Tempel JSON atau XML Anda, klik konversi dan dapatkan output terformat secara instan.',
    howTitle: 'Cara mengonversi JSON ke XML',
    step1: 'Tempel atau ketik data JSON di panel input', step2: 'Atur nama elemen root dan level indentasi',
    step3: 'Klik Konversi untuk menghasilkan output XML', step4: 'Salin hasil atau beralih ke mode XML ke JSON',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu konversi JSON ke XML?', faq1a: 'Konversi mengubah data JSON ke format XML. JSON menggunakan pasangan kunci-nilai, XML menggunakan tag dan atribut.',
    faq2q: 'Bagaimana array JSON dikonversi ke XML?', faq2a: 'Setiap item array dibungkus dalam tag elemen. Array dan objek bersarang dikonversi secara rekursif.',
    faq3q: 'Bisakah saya mengonversi XML kembali ke JSON?', faq3a: 'Ya, beralih ke tab "XML ke JSON" untuk menempel XML dan mengonversinya ke JSON.',
    faq4q: 'Apakah data saya diproses di server?', faq4a: 'Tidak, semua konversi terjadi di browser Anda dengan JavaScript.',
    faq5q: 'Apakah konverter menangani karakter khusus?', faq5a: 'Ya, konverter melakukan escape karakter khusus XML seperti <, >, & dan tanda kutip dengan benar.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวแปลง JSON เป็น XML',
    description: 'แปลง JSON เป็น XML และ XML เป็น JSON ทันที จัดรูปแบบด้วยการเยื้องที่ปรับแต่งได้และตัวเลือกอิลิเมนต์รูท',
    jsonToXml: 'JSON เป็น XML', xmlToJson: 'XML เป็น JSON', inputLabel: 'อินพุต', outputLabel: 'เอาต์พุต',
    jsonPlaceholder: '{\n  "name": "สมชาย",\n  "age": 30\n}', xmlPlaceholder: '<root>\n  <name>สมชาย</name>\n  <age>30</age>\n</root>',
    convert: 'แปลง', clear: 'ล้าง', swap: 'สลับ', indent: 'การเยื้อง', rootElement: 'อิลิเมนต์รูท', loadSample: 'โหลดตัวอย่าง',
    introTitle: 'ตัวแปลง JSON เป็น XML ออนไลน์ฟรี',
    introText: 'เครื่องมือนี้แปลงข้อมูล JSON เป็นรูปแบบ XML และในทางกลับกัน วางJSON หรือ XML ของคุณ คลิกแปลง แล้วรับผลลัพธ์ที่จัดรูปแบบทันที',
    howTitle: 'วิธีแปลง JSON เป็น XML',
    step1: 'วางหรือพิมพ์ข้อมูล JSON ในแผงอินพุต', step2: 'ตั้งชื่ออิลิเมนต์รูทและระดับการเยื้อง',
    step3: 'คลิกแปลงเพื่อสร้างเอาต์พุต XML', step4: 'คัดลอกผลลัพธ์หรือสลับไปโหมด XML เป็น JSON',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การแปลง JSON เป็น XML คืออะไร?', faq1a: 'การแปลงจะเปลี่ยนข้อมูล JSON เป็นรูปแบบ XML JSON ใช้คู่คีย์-ค่า XML ใช้แท็กและแอตทริบิวต์',
    faq2q: 'อาร์เรย์ JSON ถูกแปลงเป็น XML อย่างไร?', faq2a: 'แต่ละรายการของอาร์เรย์จะถูกห่อในแท็กอิลิเมนต์ อาร์เรย์และอ็อบเจกต์ที่ซ้อนกันจะถูกแปลงแบบเรียกซ้ำ',
    faq3q: 'สามารถแปลง XML กลับเป็น JSON ได้ไหม?', faq3a: 'ได้ สลับไปที่แท็บ "XML เป็น JSON" เพื่อวาง XML แล้วแปลงเป็น JSON',
    faq4q: 'ข้อมูลของฉันถูกประมวลผลบนเซิร์ฟเวอร์หรือไม่?', faq4a: 'ไม่ การแปลงทั้งหมดเกิดขึ้นในเบราว์เซอร์ด้วย JavaScript',
    faq5q: 'ตัวแปลงจัดการอักขระพิเศษได้ไหม?', faq5a: 'ได้ ตัวแปลง escape อักขระพิเศษ XML เช่น <, >, & และเครื่องหมายคำพูดอย่างถูกต้อง',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function jsonToXml(obj: unknown, indent: number, rootName: string): string {
  const pad = (level: number) => ' '.repeat(indent * level);

  function convert(value: unknown, key: string, level: number): string {
    if (value === null || value === undefined) {
      return `${pad(level)}<${key}/>\n`;
    }
    if (Array.isArray(value)) {
      return value.map(item => convert(item, key, level)).join('');
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      const inner = entries.map(([k, v]) => convert(v, k, level + 1)).join('');
      return `${pad(level)}<${key}>\n${inner}${pad(level)}</${key}>\n`;
    }
    return `${pad(level)}<${key}>${escapeXml(String(value))}</${key}>\n`;
  }

  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const entries = Object.entries(obj as Record<string, unknown>);
    const inner = entries.map(([k, v]) => convert(v, k, 1)).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${inner}</${rootName}>`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>${escapeXml(String(obj))}</${rootName}>`;
}

function xmlToJson(xml: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) throw new Error(errorNode.textContent || 'Invalid XML');

  function nodeToObj(node: Element): unknown {
    const obj: Record<string, unknown> = {};
    const children = Array.from(node.children);

    if (children.length === 0) {
      return node.textContent || '';
    }

    const grouped: Record<string, Element[]> = {};
    for (const child of children) {
      const tag = child.tagName;
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(child);
    }

    for (const [tag, elements] of Object.entries(grouped)) {
      if (elements.length > 1) {
        obj[tag] = elements.map(el => nodeToObj(el));
      } else {
        obj[tag] = nodeToObj(elements[0]);
      }
    }
    return obj;
  }

  const root = doc.documentElement;
  const result: Record<string, unknown> = {};
  result[root.tagName] = nodeToObj(root);
  return JSON.stringify(result, null, 2);
}

export default function JsonToXmlConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [mode, setMode] = useState<'jsonToXml' | 'xmlToJson'>('jsonToXml');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [rootName, setRootName] = useState('root');

  const handleConvert = useCallback(() => {
    setError('');
    try {
      if (mode === 'jsonToXml') {
        const parsed = JSON.parse(input);
        setOutput(jsonToXml(parsed, indentSize, rootName));
      } else {
        setOutput(xmlToJson(input));
      }
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, mode, indentSize, rootName]);

  const handleSwap = useCallback(() => {
    setMode(prev => prev === 'jsonToXml' ? 'xmlToJson' : 'jsonToXml');
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  const handleLoadSample = useCallback(() => {
    setInput(mode === 'jsonToXml' ? t.jsonPlaceholder : t.xmlPlaceholder);
    setOutput('');
    setError('');
  }, [mode, t]);

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
    <ToolLayout title={t.title} description={t.description} toolId="json-to-xml-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-input)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['jsonToXml', 'xmlToJson'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(''); setOutput(''); setError(''); }}
            style={{
              padding: '6px 18px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === m ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
              color: mode === m ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
            }}
          >
            {m === 'jsonToXml' ? t.jsonToXml : t.xmlToJson}
          </button>
        ))}
      </div>

      {/* Options */}
      {mode === 'jsonToXml' && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.rootElement}:</label>
            <input
              type="text"
              value={rootName}
              onChange={e => setRootName(e.target.value || 'root')}
              style={{ width: 80, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12, fontFamily: 'monospace' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
            <select
              value={indentSize}
              onChange={e => setIndentSize(Number(e.target.value))}
              style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12 }}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={0}>0 (minified)</option>
            </select>
          </div>
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12, minHeight: 300 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.inputLabel} ({mode === 'jsonToXml' ? 'JSON' : 'XML'})</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'jsonToXml' ? t.jsonPlaceholder : t.xmlPlaceholder}
            style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', fontSize: 12, lineHeight: 1.5 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel} ({mode === 'jsonToXml' ? 'XML' : 'JSON'})</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            style={{ flex: 1, minHeight: 300, fontFamily: 'monospace', fontSize: 12, lineHeight: 1.5, background: 'var(--bg-card)' }}
          />
        </div>
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleSwap} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.swap}</button>
        <button onClick={handleLoadSample} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>

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
            { href: `/${lang}/tools/xml-formatter`, label: 'XML Formatter' },
            { href: `/${lang}/tools/csv-json`, label: 'CSV to JSON' },
            { href: `/${lang}/tools/json-diff-tool`, label: 'JSON Diff Tool' },
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
