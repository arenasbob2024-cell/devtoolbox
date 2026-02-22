'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'XML to JSON Converter Online',
    description: 'Convert XML to JSON instantly in your browser. Handles attributes, nested elements, arrays, CDATA, and text content. Free, private, no server required.',
    inputLabel: 'XML Input',
    outputLabel: 'JSON Output',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Value</item>\n</root>',
    convert: 'Convert to JSON',
    clear: 'Clear',
    loadSample: 'Load Sample',
    copyLabel: 'Copy JSON',
    introTitle: 'Free Online XML to JSON Converter',
    introText: 'Paste your XML data into the input panel and click Convert to get clean, formatted JSON output instantly. The converter runs entirely in your browser — no data is ever sent to a server. Supports XML attributes (mapped to @attr keys), nested elements, arrays, CDATA sections, and mixed text content.',
    howTitle: 'How to Convert XML to JSON',
    step1: 'Paste or type your XML data in the left input panel',
    step2: 'Click the Convert to JSON button or load a sample to try it',
    step3: 'Review the formatted JSON output on the right',
    step4: 'Click Copy JSON to use the result in your project',
    featuresTitle: 'Converter Features',
    feature1: 'Attributes are preserved as @attribute keys in the JSON output',
    feature2: 'Repeated sibling elements are automatically converted to JSON arrays',
    feature3: 'CDATA sections are extracted and included as plain text values',
    feature4: 'Mixed content (text + child elements) is handled using a #text key',
    feature5: 'XML declarations and comments are safely ignored',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How are XML attributes handled in the JSON output?',
    faq1a: 'XML attributes are mapped to keys prefixed with "@" in the JSON object. For example, <item id="1"> becomes { "@id": "1" } alongside any child element or text content keys.',
    faq2q: 'How are repeated XML elements converted to JSON?',
    faq2a: 'When multiple sibling elements share the same tag name, the converter groups them into a JSON array automatically. For example, three <book> elements under <library> become "book": [ ... ].',
    faq3q: 'What happens to CDATA sections?',
    faq3a: 'CDATA sections are treated as raw text content. The converter extracts the content inside <![CDATA[ ... ]]> and includes it as a string value in the JSON output, just like regular text nodes.',
    faq4q: 'Is my XML data sent to a server?',
    faq4a: 'No. All processing happens entirely in your browser using the built-in DOMParser API. Your data never leaves your device, making this tool safe for sensitive or confidential XML documents.',
    faq5q: 'What XML features are supported?',
    faq5a: 'The converter supports standard XML elements, attributes, nested structures, text content, CDATA sections, self-closing tags, and XML namespaces. XML declarations (<?xml ?>) and comments (<!-- -->) are silently ignored.',
    relatedTitle: 'Related Tools',
    errorEmpty: 'Please paste XML content before converting.',
    errorInvalid: 'Invalid XML',
  },
  zh: {
    title: 'XML 转 JSON 在线转换器',
    description: '在浏览器中即时将 XML 转换为 JSON。支持属性、嵌套元素、数组、CDATA 和文本内容。免费、私密、无需服务器。',
    inputLabel: 'XML 输入',
    outputLabel: 'JSON 输出',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">值</item>\n</root>',
    convert: '转换为 JSON',
    clear: '清除',
    loadSample: '加载示例',
    copyLabel: '复制 JSON',
    introTitle: '免费在线 XML 转 JSON 转换器',
    introText: '将 XML 数据粘贴到输入面板，点击转换即可获得格式化的 JSON 输出。转换完全在浏览器中运行，数据不会发送到服务器。支持 XML 属性、嵌套元素、数组、CDATA 节和混合文本内容。',
    howTitle: '如何将 XML 转换为 JSON',
    step1: '在左侧输入框中粘贴或输入 XML 数据',
    step2: '点击"转换为 JSON"按钮，或加载示例试用',
    step3: '查看右侧格式化的 JSON 输出',
    step4: '点击"复制 JSON"在项目中使用结果',
    featuresTitle: '转换器特性',
    feature1: '属性在 JSON 输出中保留为 @attribute 键',
    feature2: '重复的兄弟元素自动转换为 JSON 数组',
    feature3: 'CDATA 节被提取并作为纯文本值包含在内',
    feature4: '混合内容（文本 + 子元素）使用 #text 键处理',
    feature5: 'XML 声明和注释被安全忽略',
    faqTitle: '常见问题',
    faq1q: 'XML 属性在 JSON 输出中如何处理？',
    faq1a: 'XML 属性映射为 JSON 对象中带"@"前缀的键。例如 <item id="1"> 变为 { "@id": "1" }，与子元素或文本内容键并列。',
    faq2q: '重复的 XML 元素如何转换为 JSON？',
    faq2a: '当多个兄弟元素具有相同标签名时，转换器自动将它们分组为 JSON 数组。例如 <library> 下的三个 <book> 元素变为 "book": [ ... ]。',
    faq3q: 'CDATA 节如何处理？',
    faq3a: 'CDATA 节被视为原始文本内容。转换器提取 <![CDATA[ ... ]]> 内的内容，并将其作为字符串值包含在 JSON 输出中。',
    faq4q: '我的 XML 数据会发送到服务器吗？',
    faq4a: '不会。所有处理完全在浏览器中使用内置 DOMParser API 进行。数据不会离开您的设备。',
    faq5q: '支持哪些 XML 特性？',
    faq5a: '支持标准 XML 元素、属性、嵌套结构、文本内容、CDATA 节、自闭合标签和 XML 命名空间。XML 声明和注释会被静默忽略。',
    relatedTitle: '相关工具',
    errorEmpty: '请在转换前粘贴 XML 内容。',
    errorInvalid: 'XML 无效',
  },
  ja: {
    title: 'XML to JSON オンライン変換ツール',
    description: 'ブラウザでXMLを即座にJSONに変換。属性、ネスト要素、配列、CDATA、テキスト対応。無料・プライベート・サーバー不要。',
    inputLabel: 'XML 入力',
    outputLabel: 'JSON 出力',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">値</item>\n</root>',
    convert: 'JSON に変換',
    clear: 'クリア',
    loadSample: 'サンプル読み込み',
    copyLabel: 'JSON をコピー',
    introTitle: '無料オンライン XML to JSON 変換ツール',
    introText: 'XMLデータを入力パネルに貼り付け、変換をクリックするだけで整形済みJSONが得られます。ブラウザ内で完結し、データはサーバーに送信されません。属性、ネスト要素、CDATA、混在コンテンツに対応。',
    howTitle: 'XMLをJSONに変換する方法',
    step1: '左の入力パネルにXMLデータを貼り付けまたは入力',
    step2: '「JSONに変換」ボタンをクリックするか、サンプルを読み込む',
    step3: '右側に整形済みJSONが表示される',
    step4: '「JSONをコピー」でプロジェクトに利用',
    featuresTitle: '変換器の特徴',
    feature1: '属性はJSONで @attribute キーとして保持',
    feature2: '同名の兄弟要素は自動的にJSON配列に変換',
    feature3: 'CDATAセクションはテキスト値として抽出',
    feature4: '混在コンテンツは #text キーで処理',
    feature5: 'XML宣言とコメントは安全に無視',
    faqTitle: 'よくある質問',
    faq1q: 'XML属性はJSONでどう扱われますか？',
    faq1a: 'XML属性は"@"プレフィックスのついたキーにマッピングされます。例: <item id="1"> → { "@id": "1" }',
    faq2q: '同名XML要素はどうなりますか？',
    faq2a: '同名の兄弟要素は自動的にJSON配列にグループ化されます。例: 3つの<book>要素 → "book": [ ... ]',
    faq3q: 'CDATAセクションはどう処理されますか？',
    faq3a: '<![CDATA[ ... ]]>の内容はテキスト文字列としてJSON出力に含まれます。',
    faq4q: 'データはサーバーに送信されますか？',
    faq4a: 'いいえ。すべての処理はブラウザ内のDOMParser APIで行われます。データはデバイスから出ません。',
    faq5q: 'どのXML機能がサポートされていますか？',
    faq5a: '標準XML要素、属性、ネスト構造、テキスト、CDATA、自己閉じタグ、名前空間に対応。XML宣言とコメントは無視されます。',
    relatedTitle: '関連ツール',
    errorEmpty: '変換前にXMLコンテンツを貼り付けてください。',
    errorInvalid: 'XMLが無効です',
  },
  ko: {
    title: 'XML to JSON 온라인 변환기',
    description: '브라우저에서 XML을 즉시 JSON으로 변환합니다. 속성, 중첩 요소, 배열, CDATA, 텍스트 지원. 무료, 개인 정보 보호, 서버 불필요.',
    inputLabel: 'XML 입력',
    outputLabel: 'JSON 출력',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">값</item>\n</root>',
    convert: 'JSON으로 변환',
    clear: '지우기',
    loadSample: '샘플 로드',
    copyLabel: 'JSON 복사',
    introTitle: '무료 온라인 XML to JSON 변환기',
    introText: 'XML 데이터를 입력 패널에 붙여넣고 변환을 클릭하면 즉시 정형화된 JSON 출력을 얻을 수 있습니다. 변환은 브라우저에서 완전히 실행되며 데이터는 서버로 전송되지 않습니다.',
    howTitle: 'XML을 JSON으로 변환하는 방법',
    step1: '왼쪽 입력 패널에 XML 데이터를 붙여넣기 또는 입력',
    step2: 'JSON으로 변환 버튼을 클릭하거나 샘플을 로드',
    step3: '오른쪽에 정형화된 JSON 출력 확인',
    step4: 'JSON 복사를 클릭하여 프로젝트에 사용',
    featuresTitle: '변환기 기능',
    feature1: '속성은 JSON 출력에서 @attribute 키로 보존됨',
    feature2: '반복되는 형제 요소는 자동으로 JSON 배열로 변환',
    feature3: 'CDATA 섹션은 일반 텍스트 값으로 추출됨',
    feature4: '혼합 콘텐츠는 #text 키를 사용하여 처리',
    feature5: 'XML 선언과 주석은 안전하게 무시됨',
    faqTitle: '자주 묻는 질문',
    faq1q: 'XML 속성은 JSON 출력에서 어떻게 처리되나요?',
    faq1a: 'XML 속성은 "@" 접두사가 붙은 키로 매핑됩니다. 예: <item id="1"> → { "@id": "1" }',
    faq2q: '반복되는 XML 요소는 어떻게 변환되나요?',
    faq2a: '동일한 태그 이름을 가진 형제 요소들은 자동으로 JSON 배열로 그룹화됩니다.',
    faq3q: 'CDATA 섹션은 어떻게 처리되나요?',
    faq3a: '<![CDATA[ ... ]]> 안의 내용은 문자열 값으로 JSON 출력에 포함됩니다.',
    faq4q: '데이터가 서버로 전송되나요?',
    faq4a: '아니요. 모든 처리는 브라우저 내 DOMParser API를 사용하여 수행됩니다.',
    faq5q: '어떤 XML 기능이 지원되나요?',
    faq5a: '표준 XML 요소, 속성, 중첩 구조, 텍스트, CDATA, 자기 닫힘 태그, 네임스페이스를 지원합니다.',
    relatedTitle: '관련 도구',
    errorEmpty: '변환하기 전에 XML 콘텐츠를 붙여넣어 주세요.',
    errorInvalid: '유효하지 않은 XML',
  },
  fr: {
    title: 'Convertisseur XML vers JSON en Ligne',
    description: 'Convertissez XML en JSON instantanement dans votre navigateur. Attributs, elements imbriques, tableaux, CDATA. Gratuit et prive.',
    inputLabel: 'Entree XML',
    outputLabel: 'Sortie JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Valeur</item>\n</root>',
    convert: 'Convertir en JSON',
    clear: 'Effacer',
    loadSample: 'Charger un exemple',
    copyLabel: 'Copier JSON',
    introTitle: 'Convertisseur XML vers JSON gratuit en ligne',
    introText: "Collez vos donnees XML dans le panneau d'entree et cliquez sur Convertir pour obtenir un JSON formate instantanement. Tout se passe dans votre navigateur, sans envoi de donnees a un serveur.",
    howTitle: 'Comment convertir XML en JSON',
    step1: "Collez ou saisissez vos donnees XML dans le panneau d'entree gauche",
    step2: 'Cliquez sur Convertir en JSON ou chargez un exemple',
    step3: 'Consultez le JSON formate a droite',
    step4: 'Cliquez sur Copier JSON pour utiliser le resultat',
    featuresTitle: 'Fonctionnalites du convertisseur',
    feature1: 'Les attributs sont preserves en tant que cles @attribut dans le JSON',
    feature2: 'Les elements freres repetes sont automatiquement convertis en tableaux',
    feature3: 'Les sections CDATA sont extraites en valeurs texte',
    feature4: 'Le contenu mixte est gere avec une cle #text',
    feature5: 'Les declarations XML et commentaires sont ignores',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment les attributs XML sont-ils traites dans le JSON ?',
    faq1a: 'Les attributs XML sont mappes vers des cles prefixees par "@". Ex: <item id="1"> → { "@id": "1" }',
    faq2q: 'Comment les elements XML repetes sont-ils convertis ?',
    faq2a: 'Plusieurs elements freres portant le meme nom sont automatiquement regroupes en tableau JSON.',
    faq3q: 'Que se passe-t-il avec les sections CDATA ?',
    faq3a: 'Le contenu de <![CDATA[ ... ]]> est extrait et inclus comme valeur texte dans la sortie JSON.',
    faq4q: 'Mes donnees sont-elles envoyees a un serveur ?',
    faq4a: 'Non. Tout le traitement se fait dans votre navigateur avec DOMParser. Vos donnees ne quittent jamais votre appareil.',
    faq5q: 'Quelles fonctionnalites XML sont supportees ?',
    faq5a: 'Elements, attributs, structures imbriquees, texte, CDATA, balises auto-fermantes et espaces de noms. Declarations et commentaires ignores.',
    relatedTitle: 'Outils connexes',
    errorEmpty: "Veuillez coller du contenu XML avant de convertir.",
    errorInvalid: 'XML invalide',
  },
  de: {
    title: 'XML zu JSON Konverter Online',
    description: 'Konvertieren Sie XML sofort in JSON im Browser. Attribute, verschachtelte Elemente, Arrays, CDATA. Kostenlos und privat.',
    inputLabel: 'XML Eingabe',
    outputLabel: 'JSON Ausgabe',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Wert</item>\n</root>',
    convert: 'In JSON konvertieren',
    clear: 'Leeren',
    loadSample: 'Beispiel laden',
    copyLabel: 'JSON kopieren',
    introTitle: 'Kostenloser Online XML zu JSON Konverter',
    introText: 'Fuegen Sie Ihre XML-Daten in das Eingabefeld ein und klicken Sie auf Konvertieren, um sofort formatierten JSON-Output zu erhalten. Alles laeuft im Browser, ohne Datenversand an einen Server.',
    howTitle: 'So konvertieren Sie XML in JSON',
    step1: 'Fuegen Sie XML-Daten im linken Eingabefeld ein oder tippen Sie sie ein',
    step2: 'Klicken Sie auf "In JSON konvertieren" oder laden Sie ein Beispiel',
    step3: 'Ueberpruefen Sie die formatierten JSON-Ausgabe rechts',
    step4: 'Klicken Sie auf "JSON kopieren" um das Ergebnis zu verwenden',
    featuresTitle: 'Konverter-Funktionen',
    feature1: 'Attribute werden als @attribut-Schluessel im JSON beibehalten',
    feature2: 'Wiederholte Geschwisterelemente werden automatisch in Arrays umgewandelt',
    feature3: 'CDATA-Abschnitte werden als Textwerte extrahiert',
    feature4: 'Gemischter Inhalt wird mit einem #text-Schluessel behandelt',
    feature5: 'XML-Deklarationen und Kommentare werden ignoriert',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie werden XML-Attribute im JSON behandelt?',
    faq1a: 'XML-Attribute werden auf Schluessel mit "@"-Praefix gemappt. Beispiel: <item id="1"> → { "@id": "1" }',
    faq2q: 'Wie werden wiederholte XML-Elemente konvertiert?',
    faq2a: 'Mehrere Geschwisterelemente mit demselben Namen werden automatisch in ein JSON-Array gruppiert.',
    faq3q: 'Was passiert mit CDATA-Abschnitten?',
    faq3a: 'Der Inhalt von <![CDATA[ ... ]]> wird extrahiert und als Textwert in die JSON-Ausgabe einbezogen.',
    faq4q: 'Werden meine Daten an einen Server gesendet?',
    faq4a: 'Nein. Alles wird im Browser mit der DOMParser-API verarbeitet. Ihre Daten verlassen Ihr Geraet nicht.',
    faq5q: 'Welche XML-Funktionen werden unterstuetzt?',
    faq5a: 'Elemente, Attribute, verschachtelte Strukturen, Text, CDATA, selbstschliessende Tags und Namensraeume. Deklarationen und Kommentare werden ignoriert.',
    relatedTitle: 'Verwandte Tools',
    errorEmpty: 'Bitte XML-Inhalt einfuegen, bevor Sie konvertieren.',
    errorInvalid: 'Ungueltiges XML',
  },
  es: {
    title: 'Convertidor XML a JSON en Linea',
    description: 'Convierte XML a JSON instantaneamente en tu navegador. Atributos, elementos anidados, arrays, CDATA. Gratis y privado.',
    inputLabel: 'Entrada XML',
    outputLabel: 'Salida JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Valor</item>\n</root>',
    convert: 'Convertir a JSON',
    clear: 'Limpiar',
    loadSample: 'Cargar ejemplo',
    copyLabel: 'Copiar JSON',
    introTitle: 'Convertidor XML a JSON gratuito en linea',
    introText: 'Pega tus datos XML en el panel de entrada y haz clic en Convertir para obtener JSON formateado al instante. Todo se procesa en tu navegador, sin envio de datos a un servidor.',
    howTitle: 'Como convertir XML a JSON',
    step1: 'Pega o escribe tus datos XML en el panel de entrada izquierdo',
    step2: 'Haz clic en "Convertir a JSON" o carga un ejemplo',
    step3: 'Revisa la salida JSON formateada a la derecha',
    step4: 'Haz clic en "Copiar JSON" para usar el resultado',
    featuresTitle: 'Caracteristicas del convertidor',
    feature1: 'Los atributos se conservan como claves @atributo en el JSON',
    feature2: 'Los elementos hermanos repetidos se convierten automaticamente en arrays',
    feature3: 'Las secciones CDATA se extraen como valores de texto',
    feature4: 'El contenido mixto se maneja con una clave #text',
    feature5: 'Las declaraciones XML y los comentarios se ignoran',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como se manejan los atributos XML en el JSON?',
    faq1a: 'Los atributos XML se mapean a claves con prefijo "@". Ej: <item id="1"> → { "@id": "1" }',
    faq2q: 'Como se convierten los elementos XML repetidos?',
    faq2a: 'Varios elementos hermanos con el mismo nombre se agrupan automaticamente en un array JSON.',
    faq3q: 'Que pasa con las secciones CDATA?',
    faq3a: 'El contenido de <![CDATA[ ... ]]> se extrae e incluye como valor de texto en la salida JSON.',
    faq4q: 'Se envian mis datos a un servidor?',
    faq4a: 'No. Todo el procesamiento ocurre en tu navegador con DOMParser. Tus datos nunca salen de tu dispositivo.',
    faq5q: 'Que caracteristicas XML son compatibles?',
    faq5a: 'Elementos, atributos, estructuras anidadas, texto, CDATA, etiquetas autocerradas y espacios de nombres. Las declaraciones y comentarios se ignoran.',
    relatedTitle: 'Herramientas relacionadas',
    errorEmpty: 'Por favor pega contenido XML antes de convertir.',
    errorInvalid: 'XML invalido',
  },
  pt: {
    title: 'Conversor XML para JSON Online',
    description: 'Converta XML para JSON instantaneamente no navegador. Atributos, elementos aninhados, arrays, CDATA. Gratis e privado.',
    inputLabel: 'Entrada XML',
    outputLabel: 'Saida JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Valor</item>\n</root>',
    convert: 'Converter para JSON',
    clear: 'Limpar',
    loadSample: 'Carregar exemplo',
    copyLabel: 'Copiar JSON',
    introTitle: 'Conversor XML para JSON Online Gratuito',
    introText: 'Cole seus dados XML no painel de entrada e clique em Converter para obter JSON formatado instantaneamente. Tudo e processado no seu navegador, sem envio de dados a um servidor.',
    howTitle: 'Como converter XML para JSON',
    step1: 'Cole ou digite seus dados XML no painel de entrada esquerdo',
    step2: 'Clique em "Converter para JSON" ou carregue um exemplo',
    step3: 'Revise a saida JSON formatada a direita',
    step4: 'Clique em "Copiar JSON" para usar o resultado',
    featuresTitle: 'Recursos do conversor',
    feature1: 'Atributos sao preservados como chaves @atributo no JSON',
    feature2: 'Elementos irmaos repetidos sao convertidos automaticamente em arrays',
    feature3: 'Secoes CDATA sao extraidas como valores de texto',
    feature4: 'Conteudo misto e tratado com uma chave #text',
    feature5: 'Declaracoes XML e comentarios sao ignorados',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Como os atributos XML sao tratados no JSON?',
    faq1a: 'Atributos XML sao mapeados para chaves com prefixo "@". Ex: <item id="1"> → { "@id": "1" }',
    faq2q: 'Como elementos XML repetidos sao convertidos?',
    faq2a: 'Varios elementos irmaos com o mesmo nome sao agrupados automaticamente em um array JSON.',
    faq3q: 'O que acontece com as secoes CDATA?',
    faq3a: 'O conteudo de <![CDATA[ ... ]]> e extraido e incluido como valor de texto na saida JSON.',
    faq4q: 'Meus dados sao enviados a um servidor?',
    faq4a: 'Nao. Todo o processamento ocorre no seu navegador com DOMParser. Seus dados nunca saem do seu dispositivo.',
    faq5q: 'Quais recursos XML sao suportados?',
    faq5a: 'Elementos, atributos, estruturas aninhadas, texto, CDATA, tags auto-fechadas e namespaces. Declaracoes e comentarios sao ignorados.',
    relatedTitle: 'Ferramentas relacionadas',
    errorEmpty: 'Por favor cole conteudo XML antes de converter.',
    errorInvalid: 'XML invalido',
  },
  it: {
    title: 'Convertitore XML in JSON Online',
    description: 'Converti XML in JSON istantaneamente nel browser. Attributi, elementi annidati, array, CDATA. Gratuito e privato.',
    inputLabel: 'Input XML',
    outputLabel: 'Output JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Valore</item>\n</root>',
    convert: 'Converti in JSON',
    clear: 'Cancella',
    loadSample: 'Carica esempio',
    copyLabel: 'Copia JSON',
    introTitle: 'Convertitore XML in JSON Online Gratuito',
    introText: 'Incolla i tuoi dati XML nel pannello di input e clicca Converti per ottenere JSON formattato istantaneamente. Tutto avviene nel browser, senza invio di dati a un server.',
    howTitle: 'Come convertire XML in JSON',
    step1: "Incolla o digita i dati XML nel pannello di input sinistro",
    step2: 'Clicca su "Converti in JSON" o carica un esempio',
    step3: "Controlla l'output JSON formattato a destra",
    step4: 'Clicca su "Copia JSON" per usare il risultato',
    featuresTitle: 'Funzionalita del convertitore',
    feature1: 'Gli attributi sono preservati come chiavi @attributo nel JSON',
    feature2: 'Gli elementi fratelli ripetuti vengono automaticamente convertiti in array',
    feature3: 'Le sezioni CDATA vengono estratte come valori di testo',
    feature4: 'Il contenuto misto e gestito con una chiave #text',
    feature5: 'Le dichiarazioni XML e i commenti vengono ignorati',
    faqTitle: 'Domande frequenti',
    faq1q: 'Come vengono gestiti gli attributi XML nel JSON?',
    faq1a: 'Gli attributi XML vengono mappati a chiavi con prefisso "@". Es: <item id="1"> → { "@id": "1" }',
    faq2q: 'Come vengono convertiti gli elementi XML ripetuti?',
    faq2a: 'Piu elementi fratelli con lo stesso nome vengono raggruppati automaticamente in un array JSON.',
    faq3q: 'Cosa succede con le sezioni CDATA?',
    faq3a: 'Il contenuto di <![CDATA[ ... ]]> viene estratto e incluso come valore di testo nell\'output JSON.',
    faq4q: 'I miei dati vengono inviati a un server?',
    faq4a: 'No. Tutto il processing avviene nel browser con DOMParser. I dati non lasciano mai il dispositivo.',
    faq5q: 'Quali funzionalita XML sono supportate?',
    faq5a: 'Elementi, attributi, strutture annidate, testo, CDATA, tag auto-chiudenti e namespace. Dichiarazioni e commenti vengono ignorati.',
    relatedTitle: 'Strumenti correlati',
    errorEmpty: 'Incolla contenuto XML prima di convertire.',
    errorInvalid: 'XML non valido',
  },
  nl: {
    title: 'XML naar JSON Converter Online',
    description: 'Converteer XML naar JSON direct in uw browser. Attributen, geneste elementen, arrays, CDATA. Gratis en privaat.',
    inputLabel: 'XML Invoer',
    outputLabel: 'JSON Uitvoer',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Waarde</item>\n</root>',
    convert: 'Naar JSON converteren',
    clear: 'Wissen',
    loadSample: 'Voorbeeld laden',
    copyLabel: 'JSON kopieren',
    introTitle: 'Gratis Online XML naar JSON Converter',
    introText: 'Plak uw XML-gegevens in het invoerpaneel en klik op Converteren voor direct geformatteerde JSON-uitvoer. Alles verloopt in uw browser, zonder gegevensverzending naar een server.',
    howTitle: 'Hoe XML naar JSON te converteren',
    step1: 'Plak of typ XML-gegevens in het linker invoerpaneel',
    step2: 'Klik op "Naar JSON converteren" of laad een voorbeeld',
    step3: 'Bekijk de geformatteerde JSON-uitvoer rechts',
    step4: 'Klik op "JSON kopieren" om het resultaat te gebruiken',
    featuresTitle: 'Converter-functies',
    feature1: 'Attributen worden behouden als @attribuut-sleutels in JSON',
    feature2: 'Herhaalde broer/zus-elementen worden automatisch omgezet in arrays',
    feature3: 'CDATA-secties worden als tekstwaarden geextraheerd',
    feature4: 'Gemengde inhoud wordt afgehandeld met een #text-sleutel',
    feature5: 'XML-declaraties en opmerkingen worden genegeerd',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Hoe worden XML-attributen behandeld in de JSON-uitvoer?',
    faq1a: 'XML-attributen worden gemappt naar sleutels met "@"-prefix. Bv: <item id="1"> → { "@id": "1" }',
    faq2q: 'Hoe worden herhaalde XML-elementen geconverteerd?',
    faq2a: 'Meerdere broer/zus-elementen met dezelfde naam worden automatisch gegroepeerd in een JSON-array.',
    faq3q: 'Wat gebeurt er met CDATA-secties?',
    faq3a: 'De inhoud van <![CDATA[ ... ]]> wordt geextraheerd en opgenomen als tekstwaarde in de JSON-uitvoer.',
    faq4q: 'Worden mijn gegevens naar een server gestuurd?',
    faq4a: 'Nee. Alle verwerking vindt plaats in uw browser met DOMParser. Uw gegevens verlaten uw apparaat nooit.',
    faq5q: 'Welke XML-functies worden ondersteund?',
    faq5a: 'Elementen, attributen, geneste structuren, tekst, CDATA, zelf-sluitende tags en namespaces. Declaraties en opmerkingen worden genegeerd.',
    relatedTitle: 'Gerelateerde tools',
    errorEmpty: 'Plak XML-inhoud voor het converteren.',
    errorInvalid: 'Ongeldig XML',
  },
  pl: {
    title: 'Konwerter XML na JSON Online',
    description: 'Konwertuj XML do JSON natychmiast w przegladarce. Atrybuty, zagniezdzenia, tablice, CDATA. Darmowy i prywatny.',
    inputLabel: 'Wejscie XML',
    outputLabel: 'Wyjscie JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Wartosc</item>\n</root>',
    convert: 'Konwertuj do JSON',
    clear: 'Wyczysc',
    loadSample: 'Zaladuj przyklad',
    copyLabel: 'Kopiuj JSON',
    introTitle: 'Darmowy Konwerter XML na JSON Online',
    introText: 'Wklej dane XML do panelu wejsciowego i kliknij Konwertuj, aby natychmiast uzyskac sformatowany JSON. Wszystko odbywa sie w przegladarce, bez wyslania danych na serwer.',
    howTitle: 'Jak konwertowac XML na JSON',
    step1: 'Wklej lub wpisz dane XML w lewym panelu wejsciowym',
    step2: 'Kliknij "Konwertuj do JSON" lub zaladuj przyklad',
    step3: 'Przejrzyj sformatowane wyjscie JSON po prawej stronie',
    step4: 'Kliknij "Kopiuj JSON" aby uzyc wyniku',
    featuresTitle: 'Funkcje konwertera',
    feature1: 'Atrybuty sa zachowane jako klucze @atrybut w JSON',
    feature2: 'Powtarzajace sie elementy rodzenstwa sa automatycznie konwertowane na tablice',
    feature3: 'Sekcje CDATA sa wyodrebniane jako wartosci tekstowe',
    feature4: 'Mieszana zawartosc jest obslugiwana za pomoca klucza #text',
    feature5: 'Deklaracje XML i komentarze sa ignorowane',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jak atrybuty XML sa obslugiwane w wyjsciu JSON?',
    faq1a: 'Atrybuty XML sa mapowane na klucze z prefiksem "@". Np: <item id="1"> → { "@id": "1" }',
    faq2q: 'Jak powtarzajace sie elementy XML sa konwertowane?',
    faq2a: 'Wiele elementow rodzenstwa o tej samej nazwie jest automatycznie grupowanych w tablice JSON.',
    faq3q: 'Co sie dzieje z sekcjami CDATA?',
    faq3a: 'Zawartosc <![CDATA[ ... ]]> jest wyodrebniana i wlaczana jako wartosc tekstowa w wyjsciu JSON.',
    faq4q: 'Czy moje dane sa wysylane na serwer?',
    faq4a: 'Nie. Cale przetwarzanie odbywa sie w przegladarce za pomoca DOMParser. Dane nigdy nie opuszczaja urzadzenia.',
    faq5q: 'Jakie funkcje XML sa obslugiwane?',
    faq5a: 'Elementy, atrybuty, zagniezdzenia, tekst, CDATA, tagi samozamykajace i przestrzenie nazw. Deklaracje i komentarze sa ignorowane.',
    relatedTitle: 'Powiazane narzedzia',
    errorEmpty: 'Wklej zawartosc XML przed konwersja.',
    errorInvalid: 'Nieprawidlowy XML',
  },
  sv: {
    title: 'XML till JSON Konverterare Online',
    description: 'Konvertera XML till JSON direkt i webblaasaren. Attribut, nast element, arrayer, CDATA. Gratis och privat.',
    inputLabel: 'XML Indata',
    outputLabel: 'JSON Utdata',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Varde</item>\n</root>',
    convert: 'Konvertera till JSON',
    clear: 'Rensa',
    loadSample: 'Ladda exempel',
    copyLabel: 'Kopiera JSON',
    introTitle: 'Gratis XML till JSON Konverterare Online',
    introText: 'Klistra in dina XML-data i indatapanelen och klicka pa Konvertera for att fa formaterad JSON direkt. Allt sker i din webblaasare, utan dataoverfoering till en server.',
    howTitle: 'Hur man konverterar XML till JSON',
    step1: 'Klistra in eller skriv XML-data i vaenster indatapanel',
    step2: 'Klicka pa "Konvertera till JSON" eller ladda ett exempel',
    step3: 'Granska den formaterade JSON-utdata till hoeger',
    step4: 'Klicka pa "Kopiera JSON" for att anvanda resultatet',
    featuresTitle: 'Konverterar-funktioner',
    feature1: 'Attribut bevaras som @attribut-nycklar i JSON',
    feature2: 'Upprepade syskon-element konverteras automatiskt till arrayer',
    feature3: 'CDATA-avsnitt extraheras som textvarden',
    feature4: 'Blandat innehall hanteras med en #text-nyckel',
    feature5: 'XML-deklarationer och kommentarer ignoreras',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Hur hanteras XML-attribut i JSON-utdata?',
    faq1a: 'XML-attribut mappas till nycklar med "@"-prefix. Ex: <item id="1"> → { "@id": "1" }',
    faq2q: 'Hur konverteras upprepade XML-element?',
    faq2a: 'Flera syskon-element med samma namn grupperas automatiskt i en JSON-array.',
    faq3q: 'Vad haender med CDATA-avsnitt?',
    faq3a: 'Innehallet i <![CDATA[ ... ]]> extraheras och inkluderas som textvaerde i JSON-utdata.',
    faq4q: 'Skickas mina data till en server?',
    faq4a: 'Nej. All behandling sker i din webblaasare med DOMParser. Dina data laemnar aldrig din enhet.',
    faq5q: 'Vilka XML-funktioner stoeds?',
    faq5a: 'Element, attribut, nastade strukturer, text, CDATA, sjalvstaengande taggar och namnomraden. Deklarationer och kommentarer ignoreras.',
    relatedTitle: 'Relaterade verktyg',
    errorEmpty: 'Klistra in XML-innehall innan konvertering.',
    errorInvalid: 'Ogiltigt XML',
  },
  no: {
    title: 'XML til JSON Konverterer Online',
    description: 'Konverter XML til JSON umiddelbart i nettleseren. Attributter, nestede elementer, arrayer, CDATA. Gratis og privat.',
    inputLabel: 'XML Inndata',
    outputLabel: 'JSON Utdata',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Verdi</item>\n</root>',
    convert: 'Konverter til JSON',
    clear: 'Toom',
    loadSample: 'Last eksempel',
    copyLabel: 'Kopier JSON',
    introTitle: 'Gratis XML til JSON Konverterer Online',
    introText: 'Lim inn XML-dataene dine i inndatapanelet og klikk Konverter for a fa formatert JSON umiddelbart. Alt skjer i nettleseren din, uten datasending til en server.',
    howTitle: 'Slik konverterer du XML til JSON',
    step1: 'Lim inn eller skriv XML-data i det venstre inndatapanelet',
    step2: 'Klikk "Konverter til JSON" eller last et eksempel',
    step3: 'Se gjennom formatert JSON-utdata til hoyre',
    step4: 'Klikk "Kopier JSON" for a bruke resultatet',
    featuresTitle: 'Konverterer-funksjoner',
    feature1: 'Attributter bevares som @attributt-nokler i JSON',
    feature2: 'Gjentatte soesken-elementer konverteres automatisk til arrayer',
    feature3: 'CDATA-seksjoner ekstraheres som tekstverdier',
    feature4: 'Blandet innhold haandteres med en #text-nokkel',
    feature5: 'XML-deklarasjoner og kommentarer ignoreres',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hvordan haandteres XML-attributter i JSON-utdata?',
    faq1a: 'XML-attributter mappes til nokler med "@"-prefiks. Eks: <item id="1"> → { "@id": "1" }',
    faq2q: 'Hvordan konverteres gjentatte XML-elementer?',
    faq2a: 'Flere soesken-elementer med samme navn grupperes automatisk i en JSON-array.',
    faq3q: 'Hva skjer med CDATA-seksjoner?',
    faq3a: 'Innholdet i <![CDATA[ ... ]]> ekstraheres og inkluderes som tekstverdi i JSON-utdata.',
    faq4q: 'Sendes dataene mine til en server?',
    faq4a: 'Nei. All behandling skjer i nettleseren din med DOMParser. Dataene dine forlater aldri enheten din.',
    faq5q: 'Hvilke XML-funksjoner stoettes?',
    faq5a: 'Elementer, attributter, nestede strukturer, tekst, CDATA, selvlukkende tagger og navnerom. Deklarasjoner og kommentarer ignoreres.',
    relatedTitle: 'Relaterte verktoy',
    errorEmpty: 'Lim inn XML-innhold for konvertering.',
    errorInvalid: 'Ugyldig XML',
  },
  id: {
    title: 'Konverter XML ke JSON Online',
    description: 'Konversi XML ke JSON secara instan di browser Anda. Atribut, elemen bersarang, array, CDATA. Gratis dan privat.',
    inputLabel: 'Input XML',
    outputLabel: 'Output JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">Nilai</item>\n</root>',
    convert: 'Konversi ke JSON',
    clear: 'Hapus',
    loadSample: 'Muat contoh',
    copyLabel: 'Salin JSON',
    introTitle: 'Konverter XML ke JSON Online Gratis',
    introText: 'Tempel data XML Anda ke panel input dan klik Konversi untuk mendapatkan output JSON yang terformat secara instan. Semua diproses di browser Anda, tanpa pengiriman data ke server.',
    howTitle: 'Cara mengonversi XML ke JSON',
    step1: 'Tempel atau ketik data XML di panel input kiri',
    step2: 'Klik "Konversi ke JSON" atau muat contoh',
    step3: 'Tinjau output JSON yang terformat di sebelah kanan',
    step4: 'Klik "Salin JSON" untuk menggunakan hasilnya',
    featuresTitle: 'Fitur konverter',
    feature1: 'Atribut disimpan sebagai kunci @atribut di JSON',
    feature2: 'Elemen saudara yang berulang otomatis dikonversi ke array',
    feature3: 'Bagian CDATA diekstrak sebagai nilai teks',
    feature4: 'Konten campuran ditangani dengan kunci #text',
    feature5: 'Deklarasi XML dan komentar diabaikan',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Bagaimana atribut XML ditangani dalam output JSON?',
    faq1a: 'Atribut XML dipetakan ke kunci dengan awalan "@". Mis: <item id="1"> → { "@id": "1" }',
    faq2q: 'Bagaimana elemen XML yang berulang dikonversi?',
    faq2a: 'Beberapa elemen saudara dengan nama yang sama secara otomatis dikelompokkan ke dalam array JSON.',
    faq3q: 'Apa yang terjadi dengan bagian CDATA?',
    faq3a: 'Konten dari <![CDATA[ ... ]]> diekstrak dan disertakan sebagai nilai teks dalam output JSON.',
    faq4q: 'Apakah data saya dikirim ke server?',
    faq4a: 'Tidak. Semua pemrosesan terjadi di browser Anda menggunakan DOMParser. Data Anda tidak pernah meninggalkan perangkat Anda.',
    faq5q: 'Fitur XML apa yang didukung?',
    faq5a: 'Elemen, atribut, struktur bersarang, teks, CDATA, tag yang menutup sendiri, dan namespace. Deklarasi dan komentar diabaikan.',
    relatedTitle: 'Alat terkait',
    errorEmpty: 'Tempel konten XML sebelum mengonversi.',
    errorInvalid: 'XML tidak valid',
  },
  th: {
    title: 'ตัวแปลง XML เป็น JSON ออนไลน์',
    description: 'แปลง XML เป็น JSON ทันทีในเบราว์เซอร์ของคุณ รองรับแอตทริบิวต์ องค์ประกอบซ้อน อาร์เรย์ CDATA ฟรีและเป็นส่วนตัว',
    inputLabel: 'อินพุต XML',
    outputLabel: 'เอาต์พุต JSON',
    xmlPlaceholder: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <item id="1">ค่า</item>\n</root>',
    convert: 'แปลงเป็น JSON',
    clear: 'ล้าง',
    loadSample: 'โหลดตัวอย่าง',
    copyLabel: 'คัดลอก JSON',
    introTitle: 'ตัวแปลง XML เป็น JSON ออนไลน์ฟรี',
    introText: 'วางข้อมูล XML ของคุณในแผงอินพุตและคลิกแปลงเพื่อรับ JSON ที่จัดรูปแบบทันที ทุกอย่างทำงานในเบราว์เซอร์ของคุณโดยไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์',
    howTitle: 'วิธีแปลง XML เป็น JSON',
    step1: 'วางหรือพิมพ์ข้อมูล XML ในแผงอินพุตด้านซ้าย',
    step2: 'คลิก "แปลงเป็น JSON" หรือโหลดตัวอย่าง',
    step3: 'ตรวจสอบเอาต์พุต JSON ที่จัดรูปแบบทางด้านขวา',
    step4: 'คลิก "คัดลอก JSON" เพื่อใช้ผลลัพธ์',
    featuresTitle: 'คุณสมบัติของตัวแปลง',
    feature1: 'แอตทริบิวต์ถูกเก็บรักษาเป็นคีย์ @แอตทริบิวต์ใน JSON',
    feature2: 'องค์ประกอบพี่น้องที่ซ้ำกันจะถูกแปลงเป็นอาร์เรย์ JSON โดยอัตโนมัติ',
    feature3: 'ส่วน CDATA ถูกแยกออกเป็นค่าข้อความ',
    feature4: 'เนื้อหาผสมจะถูกจัดการด้วยคีย์ #text',
    feature5: 'การประกาศ XML และความคิดเห็นจะถูกละเว้น',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'แอตทริบิวต์ XML ถูกจัดการอย่างไรในเอาต์พุต JSON?',
    faq1a: 'แอตทริบิวต์ XML ถูกแมปไปยังคีย์ที่มีคำนำหน้า "@" ตัวอย่าง: <item id="1"> → { "@id": "1" }',
    faq2q: 'องค์ประกอบ XML ที่ซ้ำกันถูกแปลงอย่างไร?',
    faq2a: 'องค์ประกอบพี่น้องหลายองค์ประกอบที่มีชื่อแท็กเดียวกันจะถูกจัดกลุ่มเป็นอาร์เรย์ JSON โดยอัตโนมัติ',
    faq3q: 'เกิดอะไรขึ้นกับส่วน CDATA?',
    faq3a: 'เนื้อหาใน <![CDATA[ ... ]]> ถูกแยกออกและรวมเป็นค่าสตริงในเอาต์พุต JSON',
    faq4q: 'ข้อมูลของฉันถูกส่งไปยังเซิร์ฟเวอร์หรือไม่?',
    faq4a: 'ไม่ การประมวลผลทั้งหมดเกิดขึ้นในเบราว์เซอร์ของคุณโดยใช้ DOMParser ข้อมูลของคุณไม่เคยออกจากอุปกรณ์ของคุณ',
    faq5q: 'รองรับคุณสมบัติ XML อะไรบ้าง?',
    faq5a: 'องค์ประกอบ แอตทริบิวต์ โครงสร้างซ้อน ข้อความ CDATA แท็กปิดตัวเอง และเนมสเปซ การประกาศและความคิดเห็นจะถูกละเว้น',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
    errorEmpty: 'กรุณาวาง XML ก่อนแปลง',
    errorInvalid: 'XML ไม่ถูกต้อง',
  },
};

// ---------------------------------------------------------------------------
// XML → JSON conversion using DOMParser (browser-native, handles CDATA etc.)
// ---------------------------------------------------------------------------

function domNodeToJson(node: Element): unknown {
  const result: Record<string, unknown> = {};

  // Collect attributes as @attr keys
  if (node.attributes && node.attributes.length > 0) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      result[`@${attr.name}`] = attr.value;
    }
  }

  const children = Array.from(node.childNodes);

  // Separate element children from text/CDATA nodes
  const elementChildren: Element[] = [];
  const textParts: string[] = [];

  for (const child of children) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      elementChildren.push(child as Element);
    } else if (
      child.nodeType === Node.TEXT_NODE ||
      child.nodeType === Node.CDATA_SECTION_NODE
    ) {
      const text = child.textContent || '';
      if (text.trim()) {
        textParts.push(text);
      }
    }
  }

  if (elementChildren.length === 0) {
    // Leaf node: return text (or object with attrs + #text)
    const text = textParts.join('').trim() || (node.textContent || '').trim();
    if (Object.keys(result).length === 0) {
      return text;
    }
    if (text) {
      result['#text'] = text;
    }
    return result;
  }

  // Has element children — group by tag name for array detection
  const grouped: Record<string, Element[]> = {};
  for (const child of elementChildren) {
    const tag = child.tagName;
    if (!grouped[tag]) grouped[tag] = [];
    grouped[tag].push(child);
  }

  for (const [tag, elements] of Object.entries(grouped)) {
    if (elements.length === 1) {
      result[tag] = domNodeToJson(elements[0]);
    } else {
      result[tag] = elements.map((el) => domNodeToJson(el));
    }
  }

  // If there is mixed text alongside element children, capture it
  if (textParts.length > 0) {
    const joined = textParts.join('').trim();
    if (joined) {
      result['#text'] = joined;
    }
  }

  if (Object.keys(result).length === 0) {
    return '';
  }

  return result;
}

function convertXmlToJson(xmlString: string): string {
  const trimmed = xmlString.trim();
  if (!trimmed) throw new Error('empty');

  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, 'text/xml');

  // DOMParser signals parse errors via a <parsererror> element
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    const msg = parseError.textContent?.split('\n')[0]?.trim() || 'Parse error';
    throw new Error(msg);
  }

  const root = doc.documentElement;
  const output: Record<string, unknown> = {};
  output[root.tagName] = domNodeToJson(root);

  return JSON.stringify(output, null, 2);
}

// ---------------------------------------------------------------------------
// Sample XML data for the Load Sample button
// ---------------------------------------------------------------------------

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<library name="City Library">
  <books>
    <book id="1" isbn="978-0-13-468599-1">
      <title>The Rust Programming Language</title>
      <author>Steve Klabnik</author>
      <year>2019</year>
      <price currency="USD">39.99</price>
      <tags>
        <tag>systems</tag>
        <tag>programming</tag>
        <tag>memory-safety</tag>
      </tags>
    </book>
    <book id="2" isbn="978-1-491-95028-0">
      <title>Programming TypeScript</title>
      <author>Boris Cherny</author>
      <year>2019</year>
      <price currency="USD">49.99</price>
      <tags>
        <tag>typescript</tag>
        <tag>javascript</tag>
      </tags>
    </book>
  </books>
  <members>
    <member id="101" active="true">
      <name>Alice Johnson</name>
      <email>alice@example.com</email>
    </member>
  </members>
  <metadata>
    <![CDATA[This is <raw> content & special characters "quoted"]]>
  </metadata>
</library>`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function XmlToJsonConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) {
      setError(t.errorEmpty);
      setOutput('');
      return;
    }
    try {
      const result = convertXmlToJson(input);
      setOutput(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg === 'empty' ? t.errorEmpty : `${t.errorInvalid}: ${msg}`);
      setOutput('');
    }
  }, [input, t]);

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_XML);
    setOutput('');
    setError('');
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

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
    <ToolLayout title={t.title} description={t.description} toolId="xml-to-json-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>
          {t.convert}
        </button>
        <button onClick={handleLoadSample} className="btn btn-secondary" style={{ fontSize: 13 }}>
          {t.loadSample}
        </button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>
          {t.clear}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose, #f43f5e)',
        }}>
          {'\u2715'} {error}
        </div>
      )}

      {/* Input / Output panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* XML Input */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>XML</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.xmlPlaceholder}
            spellCheck={false}
            style={{
              flex: 1,
              minHeight: 360,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontSize: 12,
              lineHeight: 1.6,
              resize: 'vertical',
            }}
          />
        </div>

        {/* JSON Output */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} label={t.copyLabel} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="{ }"
            spellCheck={false}
            style={{
              flex: 1,
              minHeight: 360,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontSize: 12,
              lineHeight: 1.6,
              background: 'var(--bg-card)',
              opacity: output ? 1 : 0.5,
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      {/* SEO content section */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        {/* Introduction */}
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>

        {/* How to use */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        {/* Features */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.feature1}</li>
          <li>{t.feature2}</li>
          <li>{t.feature3}</li>
          <li>{t.feature4}</li>
          <li>{t.feature5}</li>
        </ul>

        {/* FAQ accordion */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details
              key={idx}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                overflow: 'hidden',
                background: 'var(--bg-input)',
              }}
            >
              <summary style={{
                padding: '14px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)',
                userSelect: 'none',
              }}>
                {faq.q}
              </summary>
              <div style={{
                padding: '0 16px 14px',
                fontSize: 13,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
              }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* Related tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-to-xml-converter`, label: 'JSON to XML Converter' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/xml-formatter`, label: 'XML Formatter' },
            { href: `/${lang}/tools/json-to-yaml-converter`, label: 'JSON to YAML' },
            { href: `/${lang}/tools/csv-to-json-converter`, label: 'CSV to JSON' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                fontSize: 13,
                color: 'var(--accent-blue)',
                textDecoration: 'none',
                background: 'var(--bg-input)',
                transition: 'border-color 0.2s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
