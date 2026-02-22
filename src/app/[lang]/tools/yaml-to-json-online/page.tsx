'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML to JSON Online Converter',
    description: 'Convert YAML to JSON instantly in your browser. Free, private, no server required. Supports nested mappings, sequences, anchors, and all YAML data types.',
    inputLabel: 'YAML Input',
    outputLabel: 'JSON Output',
    yamlPlaceholder: 'name: example\nversion: "1.0"\nitems:\n  - one\n  - two',
    convert: 'Convert to JSON',
    clear: 'Clear',
    loadSample: 'Load Sample',
    copyLabel: 'Copy JSON',
    indentLabel: 'Indent:',
    introTitle: 'Free Online YAML to JSON Converter',
    introText: 'Paste your YAML data into the input panel and click Convert to get clean, formatted JSON output instantly. The converter runs entirely in your browser — no data is ever sent to a server. Supports YAML mappings, sequences, multi-line strings, and complex nested structures.',
    howTitle: 'How to Convert YAML to JSON',
    step1: 'Paste or type your YAML data in the left input panel',
    step2: 'Choose your preferred JSON indentation level',
    step3: 'Click the Convert to JSON button or load a sample to try it',
    step4: 'Click Copy JSON to use the result in your project',
    featuresTitle: 'Converter Features',
    feature1: 'Parses YAML mappings into JSON objects with correct key types',
    feature2: 'Sequences (lists) are converted to JSON arrays preserving order',
    feature3: 'Multi-line strings (block scalars) are handled properly',
    feature4: 'Boolean values (true/false/yes/no) are mapped to JSON booleans',
    feature5: 'Null values (null/~) are converted to JSON null',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What YAML features are supported?',
    faq1a: 'The converter supports YAML mappings, sequences, scalars (strings, numbers, booleans, null), multi-line block scalars (literal | and folded >), flow syntax, and comments. YAML anchors and aliases are resolved during parsing.',
    faq2q: 'How are YAML boolean values handled?',
    faq2a: 'YAML recognizes many boolean forms: true/false, yes/no, on/off, y/n. All of these are correctly converted to JSON true or false values.',
    faq3q: 'Can I convert JSON back to YAML?',
    faq3a: 'Yes! Use our JSON to YAML converter tool to convert JSON data back to YAML format. Both tools run in your browser with no server processing.',
    faq4q: 'Is my YAML data sent to a server?',
    faq4a: 'No. All processing happens entirely in your browser using JavaScript. Your data never leaves your device, making this tool safe for sensitive configuration files.',
    faq5q: 'What happens with YAML comments?',
    faq5a: 'YAML comments (lines starting with #) are silently ignored during conversion since JSON does not support comments. The data content is preserved accurately.',
    relatedTitle: 'Related Tools',
    errorEmpty: 'Please paste YAML content before converting.',
    errorInvalid: 'Invalid YAML',
  },
  zh: {
    title: 'YAML 转 JSON 在线转换器',
    description: '在浏览器中即时将 YAML 转换为 JSON。免费、私密、无需服务器。',
    inputLabel: 'YAML 输入',
    outputLabel: 'JSON 输出',
    yamlPlaceholder: 'name: 示例\nversion: "1.0"\nitems:\n  - 一\n  - 二',
    convert: '转换为 JSON',
    clear: '清除',
    loadSample: '加载示例',
    copyLabel: '复制 JSON',
    indentLabel: '缩进：',
    introTitle: '免费在线 YAML 转 JSON 转换器',
    introText: '将 YAML 数据粘贴到输入面板，点击转换即可获得格式化的 JSON 输出。转换完全在浏览器中运行，数据不会发送到服务器。',
    howTitle: '如何将 YAML 转换为 JSON',
    step1: '在左侧输入框中粘贴或输入 YAML 数据',
    step2: '选择首选 JSON 缩进级别',
    step3: '点击"转换为 JSON"按钮，或加载示例试用',
    step4: '点击"复制 JSON"在项目中使用结果',
    featuresTitle: '转换器特性',
    feature1: '将 YAML 映射解析为具有正确键类型的 JSON 对象',
    feature2: '序列（列表）转换为保持顺序的 JSON 数组',
    feature3: '多行字符串（块标量）得到正确处理',
    feature4: '布尔值（true/false/yes/no）映射到 JSON 布尔值',
    feature5: 'null 值（null/~）转换为 JSON null',
    faqTitle: '常见问题',
    faq1q: '支持哪些 YAML 功能？',
    faq1a: '支持 YAML 映射、序列、标量、多行块标量、流语法和注释。',
    faq2q: 'YAML 布尔值如何处理？',
    faq2a: 'YAML 识别多种布尔形式：true/false、yes/no、on/off，都会正确转换为 JSON true 或 false。',
    faq3q: '可以将 JSON 转换回 YAML 吗？',
    faq3a: '可以！使用我们的 JSON 转 YAML 转换器。',
    faq4q: '数据会发送到服务器吗？',
    faq4a: '不会。所有处理完全在浏览器中进行。',
    faq5q: 'YAML 注释如何处理？',
    faq5a: 'YAML 注释在转换时被忽略，因为 JSON 不支持注释。',
    relatedTitle: '相关工具',
    errorEmpty: '请在转换前粘贴 YAML 内容。',
    errorInvalid: 'YAML 无效',
  },
  ja: {
    title: 'YAML to JSON オンライン変換ツール',
    description: 'ブラウザでYAMLを即座にJSONに変換。無料・プライベート・サーバー不要。',
    inputLabel: 'YAML 入力',
    outputLabel: 'JSON 出力',
    yamlPlaceholder: 'name: 例\nversion: "1.0"\nitems:\n  - 一\n  - 二',
    convert: 'JSON に変換',
    clear: 'クリア',
    loadSample: 'サンプル読み込み',
    copyLabel: 'JSON をコピー',
    indentLabel: 'インデント：',
    introTitle: '無料オンライン YAML to JSON 変換ツール',
    introText: 'YAMLデータを入力パネルに貼り付け、変換をクリックするだけでJSON出力が得られます。',
    howTitle: 'YAMLをJSONに変換する方法',
    step1: '左の入力パネルにYAMLデータを貼り付け',
    step2: 'JSONインデントレベルを選択',
    step3: '「JSONに変換」をクリック',
    step4: '「JSONをコピー」で利用',
    featuresTitle: '変換器の特徴',
    feature1: 'YAMLマッピングをJSONオブジェクトに変換',
    feature2: 'シーケンスをJSON配列に変換',
    feature3: 'マルチラインスカラーを適切に処理',
    feature4: 'ブール値をJSONブール値にマッピング',
    feature5: 'null値をJSON nullに変換',
    faqTitle: 'よくある質問',
    faq1q: 'どのYAML機能がサポートされていますか？',
    faq1a: 'マッピング、シーケンス、スカラー、マルチラインスカラー、フロー構文、コメントに対応。',
    faq2q: 'YAMLブール値はどう処理されますか？',
    faq2a: 'true/false、yes/no、on/offなどの形式をJSON true/falseに変換します。',
    faq3q: 'JSONをYAMLに戻せますか？',
    faq3a: 'はい！JSON to YAML変換ツールをご利用ください。',
    faq4q: 'データはサーバーに送信されますか？',
    faq4a: 'いいえ。すべてブラウザ内で処理されます。',
    faq5q: 'YAMLコメントはどうなりますか？',
    faq5a: 'JSONはコメントをサポートしないため、変換時に無視されます。',
    relatedTitle: '関連ツール',
    errorEmpty: '変換前にYAMLを貼り付けてください。',
    errorInvalid: 'YAMLが無効です',
  },
  ko: {
    title: 'YAML to JSON 온라인 변환기',
    description: '브라우저에서 YAML을 즉시 JSON으로 변환합니다. 무료, 개인 정보 보호, 서버 불필요.',
    inputLabel: 'YAML 입력', outputLabel: 'JSON 출력',
    yamlPlaceholder: 'name: 예제\nversion: "1.0"\nitems:\n  - 하나\n  - 둘',
    convert: 'JSON으로 변환', clear: '지우기', loadSample: '샘플 로드', copyLabel: 'JSON 복사', indentLabel: '들여쓰기:',
    introTitle: '무료 온라인 YAML to JSON 변환기',
    introText: 'YAML 데이터를 붙여넣고 변환을 클릭하면 즉시 JSON 출력을 얻을 수 있습니다.',
    howTitle: 'YAML을 JSON으로 변환하는 방법', step1: 'YAML 데이터를 왼쪽 패널에 붙여넣기', step2: 'JSON 들여쓰기 수준 선택', step3: 'JSON으로 변환 클릭', step4: 'JSON 복사로 사용',
    featuresTitle: '변환기 기능', feature1: 'YAML 매핑을 JSON 객체로 변환', feature2: '시퀀스를 JSON 배열로 변환', feature3: '멀티라인 스칼라 처리', feature4: '불리언 값을 JSON 불리언으로 매핑', feature5: 'null 값을 JSON null로 변환',
    faqTitle: '자주 묻는 질문', faq1q: '어떤 YAML 기능이 지원되나요?', faq1a: '매핑, 시퀀스, 스칼라, 멀티라인 스칼라, 흐름 구문, 주석을 지원합니다.', faq2q: 'YAML 불리언 값은 어떻게 처리되나요?', faq2a: 'true/false, yes/no, on/off를 JSON true/false로 변환합니다.', faq3q: 'JSON을 YAML로 다시 변환할 수 있나요?', faq3a: '네! JSON to YAML 변환 도구를 사용하세요.', faq4q: '데이터가 서버로 전송되나요?', faq4a: '아니요. 브라우저 내에서 처리됩니다.', faq5q: 'YAML 주석은 어떻게 되나요?', faq5a: 'JSON은 주석을 지원하지 않으므로 변환 시 무시됩니다.',
    relatedTitle: '관련 도구', errorEmpty: 'YAML 콘텐츠를 붙여넣어 주세요.', errorInvalid: '유효하지 않은 YAML',
  },
  fr: {
    title: 'Convertisseur YAML vers JSON en Ligne', description: 'Convertissez YAML en JSON instantanement. Gratuit, prive, sans serveur.',
    inputLabel: 'Entree YAML', outputLabel: 'Sortie JSON', yamlPlaceholder: 'name: exemple\nversion: "1.0"\nitems:\n  - un\n  - deux',
    convert: 'Convertir en JSON', clear: 'Effacer', loadSample: 'Charger un exemple', copyLabel: 'Copier JSON', indentLabel: 'Indentation :',
    introTitle: 'Convertisseur YAML vers JSON gratuit en ligne', introText: 'Collez vos donnees YAML et cliquez sur Convertir pour obtenir du JSON formate instantanement.',
    howTitle: 'Comment convertir YAML en JSON', step1: 'Collez vos donnees YAML dans le panneau gauche', step2: "Choisissez le niveau d'indentation JSON", step3: 'Cliquez sur Convertir en JSON', step4: 'Cliquez sur Copier JSON',
    featuresTitle: 'Fonctionnalites', feature1: 'Analyse les mappages YAML en objets JSON', feature2: 'Les sequences sont converties en tableaux JSON', feature3: 'Les chaines multi-lignes sont gerees correctement', feature4: 'Les booleens YAML sont mappes en booleens JSON', feature5: 'Les valeurs null sont converties en null JSON',
    faqTitle: 'Questions frequentes', faq1q: 'Quelles fonctionnalites YAML sont supportees ?', faq1a: 'Mappages, sequences, scalaires, scalaires bloc, syntaxe flux et commentaires.', faq2q: 'Comment les booleens YAML sont-ils geres ?', faq2a: 'true/false, yes/no, on/off sont convertis en true/false JSON.', faq3q: 'Peut-on convertir JSON en YAML ?', faq3a: 'Oui ! Utilisez notre outil JSON vers YAML.', faq4q: 'Mes donnees sont-elles envoyees a un serveur ?', faq4a: 'Non. Tout se passe dans votre navigateur.', faq5q: 'Que deviennent les commentaires YAML ?', faq5a: 'Ils sont ignores car JSON ne supporte pas les commentaires.',
    relatedTitle: 'Outils connexes', errorEmpty: 'Veuillez coller du contenu YAML.', errorInvalid: 'YAML invalide',
  },
  de: {
    title: 'YAML zu JSON Konverter Online', description: 'Konvertieren Sie YAML sofort in JSON im Browser. Kostenlos, privat, kein Server.',
    inputLabel: 'YAML Eingabe', outputLabel: 'JSON Ausgabe', yamlPlaceholder: 'name: Beispiel\nversion: "1.0"\nitems:\n  - eins\n  - zwei',
    convert: 'In JSON konvertieren', clear: 'Leeren', loadSample: 'Beispiel laden', copyLabel: 'JSON kopieren', indentLabel: 'Einzug:',
    introTitle: 'Kostenloser Online YAML zu JSON Konverter', introText: 'Fuegen Sie Ihre YAML-Daten ein und klicken Sie auf Konvertieren.',
    howTitle: 'So konvertieren Sie YAML in JSON', step1: 'YAML-Daten im linken Feld einfuegen', step2: 'JSON-Einrueckungsebene waehlen', step3: 'Auf "In JSON konvertieren" klicken', step4: '"JSON kopieren" klicken',
    featuresTitle: 'Funktionen', feature1: 'YAML-Mappings werden in JSON-Objekte umgewandelt', feature2: 'Sequenzen werden in JSON-Arrays konvertiert', feature3: 'Mehrzeilige Strings werden korrekt behandelt', feature4: 'YAML-Booleans werden auf JSON-Booleans abgebildet', feature5: 'Null-Werte werden in JSON null konvertiert',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Welche YAML-Funktionen werden unterstuetzt?', faq1a: 'Mappings, Sequenzen, Skalare, Block-Skalare, Flow-Syntax und Kommentare.', faq2q: 'Wie werden YAML-Booleans behandelt?', faq2a: 'true/false, yes/no, on/off werden in JSON true/false konvertiert.', faq3q: 'Kann man JSON in YAML konvertieren?', faq3a: 'Ja! Nutzen Sie unser JSON zu YAML Tool.', faq4q: 'Werden Daten an einen Server gesendet?', faq4a: 'Nein. Alles im Browser.', faq5q: 'Was passiert mit YAML-Kommentaren?', faq5a: 'Sie werden ignoriert, da JSON keine Kommentare unterstuetzt.',
    relatedTitle: 'Verwandte Tools', errorEmpty: 'Bitte YAML einfuegen.', errorInvalid: 'Ungueltiges YAML',
  },
  es: {
    title: 'Convertidor YAML a JSON en Linea', description: 'Convierte YAML a JSON instantaneamente. Gratis, privado, sin servidor.',
    inputLabel: 'Entrada YAML', outputLabel: 'Salida JSON', yamlPlaceholder: 'name: ejemplo\nversion: "1.0"\nitems:\n  - uno\n  - dos',
    convert: 'Convertir a JSON', clear: 'Limpiar', loadSample: 'Cargar ejemplo', copyLabel: 'Copiar JSON', indentLabel: 'Sangria:',
    introTitle: 'Convertidor YAML a JSON gratuito en linea', introText: 'Pega tus datos YAML y haz clic en Convertir para obtener JSON formateado.',
    howTitle: 'Como convertir YAML a JSON', step1: 'Pega datos YAML en el panel izquierdo', step2: 'Elige la sangria JSON', step3: 'Haz clic en Convertir a JSON', step4: 'Haz clic en Copiar JSON',
    featuresTitle: 'Caracteristicas', feature1: 'Analiza mapeos YAML en objetos JSON', feature2: 'Las secuencias se convierten en arrays JSON', feature3: 'Las cadenas multi-linea se manejan correctamente', feature4: 'Los booleanos YAML se mapean a booleanos JSON', feature5: 'Los valores null se convierten en null JSON',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Que caracteristicas YAML se soportan?', faq1a: 'Mapeos, secuencias, escalares, escalares bloque, sintaxis flujo y comentarios.', faq2q: 'Como se manejan los booleanos YAML?', faq2a: 'true/false, yes/no, on/off se convierten en true/false JSON.', faq3q: 'Se puede convertir JSON a YAML?', faq3a: 'Si! Usa nuestra herramienta JSON a YAML.', faq4q: 'Se envian datos a un servidor?', faq4a: 'No. Todo en tu navegador.', faq5q: 'Que pasa con los comentarios YAML?', faq5a: 'Se ignoran porque JSON no soporta comentarios.',
    relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Pega contenido YAML.', errorInvalid: 'YAML invalido',
  },
  pt: {
    title: 'Conversor YAML para JSON Online', description: 'Converta YAML para JSON instantaneamente. Gratis, privado, sem servidor.',
    inputLabel: 'Entrada YAML', outputLabel: 'Saida JSON', yamlPlaceholder: 'name: exemplo\nversion: "1.0"\nitems:\n  - um\n  - dois',
    convert: 'Converter para JSON', clear: 'Limpar', loadSample: 'Carregar exemplo', copyLabel: 'Copiar JSON', indentLabel: 'Recuo:',
    introTitle: 'Conversor YAML para JSON Online Gratuito', introText: 'Cole seus dados YAML e clique em Converter para obter JSON formatado.',
    howTitle: 'Como converter YAML para JSON', step1: 'Cole dados YAML no painel esquerdo', step2: 'Escolha o recuo JSON', step3: 'Clique em Converter para JSON', step4: 'Clique em Copiar JSON',
    featuresTitle: 'Recursos', feature1: 'Analisa mapeamentos YAML em objetos JSON', feature2: 'Sequencias sao convertidas em arrays JSON', feature3: 'Strings multi-linha sao tratadas corretamente', feature4: 'Booleanos YAML sao mapeados para booleanos JSON', feature5: 'Valores null sao convertidos em null JSON',
    faqTitle: 'Perguntas frequentes', faq1q: 'Quais recursos YAML sao suportados?', faq1a: 'Mapeamentos, sequencias, escalares, escalares bloco, sintaxe fluxo e comentarios.', faq2q: 'Como booleanos YAML sao tratados?', faq2a: 'true/false, yes/no, on/off sao convertidos em true/false JSON.', faq3q: 'Posso converter JSON para YAML?', faq3a: 'Sim! Use nossa ferramenta JSON para YAML.', faq4q: 'Dados sao enviados ao servidor?', faq4a: 'Nao. Tudo no navegador.', faq5q: 'O que acontece com comentarios YAML?', faq5a: 'Sao ignorados pois JSON nao suporta comentarios.',
    relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Cole conteudo YAML.', errorInvalid: 'YAML invalido',
  },
  it: {
    title: 'Convertitore YAML in JSON Online', description: 'Converti YAML in JSON istantaneamente. Gratuito, privato, senza server.',
    inputLabel: 'Input YAML', outputLabel: 'Output JSON', yamlPlaceholder: 'name: esempio\nversion: "1.0"\nitems:\n  - uno\n  - due',
    convert: 'Converti in JSON', clear: 'Cancella', loadSample: 'Carica esempio', copyLabel: 'Copia JSON', indentLabel: 'Rientro:',
    introTitle: 'Convertitore YAML in JSON Online Gratuito', introText: 'Incolla i tuoi dati YAML e clicca Converti per ottenere JSON formattato.',
    howTitle: 'Come convertire YAML in JSON', step1: 'Incolla dati YAML nel pannello sinistro', step2: 'Scegli il rientro JSON', step3: 'Clicca Converti in JSON', step4: 'Clicca Copia JSON',
    featuresTitle: 'Funzionalita', feature1: 'Analizza mappature YAML in oggetti JSON', feature2: 'Le sequenze vengono convertite in array JSON', feature3: 'Le stringhe multi-riga vengono gestite correttamente', feature4: 'I booleani YAML vengono mappati a booleani JSON', feature5: 'I valori null vengono convertiti in null JSON',
    faqTitle: 'Domande frequenti', faq1q: 'Quali funzionalita YAML sono supportate?', faq1a: 'Mappature, sequenze, scalari, scalari blocco, sintassi flusso e commenti.', faq2q: 'Come vengono gestiti i booleani YAML?', faq2a: 'true/false, yes/no, on/off vengono convertiti in true/false JSON.', faq3q: 'Si puo convertire JSON in YAML?', faq3a: 'Si! Usa il nostro strumento JSON in YAML.', faq4q: 'I dati vengono inviati a un server?', faq4a: 'No. Tutto nel browser.', faq5q: 'Cosa succede ai commenti YAML?', faq5a: 'Vengono ignorati perche JSON non supporta commenti.',
    relatedTitle: 'Strumenti correlati', errorEmpty: 'Incolla contenuto YAML.', errorInvalid: 'YAML non valido',
  },
  nl: {
    title: 'YAML naar JSON Converter Online', description: 'Converteer YAML naar JSON direct in uw browser. Gratis, privaat, geen server.',
    inputLabel: 'YAML Invoer', outputLabel: 'JSON Uitvoer', yamlPlaceholder: 'name: voorbeeld\nversion: "1.0"\nitems:\n  - een\n  - twee',
    convert: 'Naar JSON converteren', clear: 'Wissen', loadSample: 'Voorbeeld laden', copyLabel: 'JSON kopieren', indentLabel: 'Inspringing:',
    introTitle: 'Gratis Online YAML naar JSON Converter', introText: 'Plak uw YAML-gegevens en klik op Converteren voor geformatteerde JSON.',
    howTitle: 'Hoe YAML naar JSON te converteren', step1: 'Plak YAML-gegevens in het linker paneel', step2: 'Kies JSON-inspringing', step3: 'Klik op Converteren', step4: 'Klik op JSON kopieren',
    featuresTitle: 'Functies', feature1: 'Parseert YAML-mappings naar JSON-objecten', feature2: 'Sequenties worden omgezet naar JSON-arrays', feature3: 'Multi-line strings worden correct behandeld', feature4: 'YAML-booleans worden gemappt naar JSON-booleans', feature5: 'Null-waarden worden omgezet naar JSON null',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Welke YAML-functies worden ondersteund?', faq1a: 'Mappings, sequenties, scalars, block scalars, flow-syntaxis en commentaren.', faq2q: 'Hoe worden YAML-booleans behandeld?', faq2a: 'true/false, yes/no, on/off worden omgezet naar JSON true/false.', faq3q: 'Kan ik JSON naar YAML converteren?', faq3a: 'Ja! Gebruik onze JSON naar YAML tool.', faq4q: 'Worden gegevens naar een server gestuurd?', faq4a: 'Nee. Alles in uw browser.', faq5q: 'Wat gebeurt met YAML-commentaren?', faq5a: 'Ze worden genegeerd omdat JSON geen commentaren ondersteunt.',
    relatedTitle: 'Gerelateerde tools', errorEmpty: 'Plak YAML-inhoud.', errorInvalid: 'Ongeldig YAML',
  },
  pl: {
    title: 'Konwerter YAML na JSON Online', description: 'Konwertuj YAML do JSON natychmiast w przegladarce. Darmowy, prywatny, bez serwera.',
    inputLabel: 'Wejscie YAML', outputLabel: 'Wyjscie JSON', yamlPlaceholder: 'name: przyklad\nversion: "1.0"\nitems:\n  - jeden\n  - dwa',
    convert: 'Konwertuj do JSON', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', copyLabel: 'Kopiuj JSON', indentLabel: 'Wciecie:',
    introTitle: 'Darmowy Konwerter YAML na JSON Online', introText: 'Wklej dane YAML i kliknij Konwertuj, aby uzyskac sformatowany JSON.',
    howTitle: 'Jak konwertowac YAML na JSON', step1: 'Wklej dane YAML w lewym panelu', step2: 'Wybierz wciecie JSON', step3: 'Kliknij Konwertuj do JSON', step4: 'Kliknij Kopiuj JSON',
    featuresTitle: 'Funkcje', feature1: 'Parsuje mapowania YAML na obiekty JSON', feature2: 'Sekwencje konwertowane na tablice JSON', feature3: 'Wieloliniowe ciagi obslugiwane poprawnie', feature4: 'Logiczne wartosci YAML mapowane na logiczne JSON', feature5: 'Wartosci null konwertowane na JSON null',
    faqTitle: 'FAQ', faq1q: 'Jakie funkcje YAML sa obslugiwane?', faq1a: 'Mapowania, sekwencje, skalary, blokowe skalary, skladnia przeplywowa i komentarze.', faq2q: 'Jak obslugiwane sa wartosci logiczne YAML?', faq2a: 'true/false, yes/no, on/off konwertowane na JSON true/false.', faq3q: 'Czy mozna konwertowac JSON na YAML?', faq3a: 'Tak! Uzyj naszego narzedzia JSON na YAML.', faq4q: 'Czy dane sa wysylane na serwer?', faq4a: 'Nie. Wszystko w przegladarce.', faq5q: 'Co z komentarzami YAML?', faq5a: 'Sa ignorowane, poniewaz JSON nie obsluguje komentarzy.',
    relatedTitle: 'Powiazane narzedzia', errorEmpty: 'Wklej zawartosc YAML.', errorInvalid: 'Nieprawidlowy YAML',
  },
  sv: {
    title: 'YAML till JSON Konverterare Online', description: 'Konvertera YAML till JSON direkt i webblaasaren. Gratis, privat, ingen server.',
    inputLabel: 'YAML Indata', outputLabel: 'JSON Utdata', yamlPlaceholder: 'name: exempel\nversion: "1.0"\nitems:\n  - ett\n  - tva',
    convert: 'Konvertera till JSON', clear: 'Rensa', loadSample: 'Ladda exempel', copyLabel: 'Kopiera JSON', indentLabel: 'Indrag:',
    introTitle: 'Gratis YAML till JSON Konverterare Online', introText: 'Klistra in dina YAML-data och klicka Konvertera for formaterad JSON.',
    howTitle: 'Hur man konverterar YAML till JSON', step1: 'Klistra in YAML i vaenster panel', step2: 'Vaelj JSON-indrag', step3: 'Klicka Konvertera till JSON', step4: 'Klicka Kopiera JSON',
    featuresTitle: 'Funktioner', feature1: 'Parsar YAML-mappningar till JSON-objekt', feature2: 'Sekvenser konverteras till JSON-arrayer', feature3: 'Flerrads-straengar hanteras korrekt', feature4: 'YAML-booleska vaerden mappas till JSON-booleaner', feature5: 'Null-vaerden konverteras till JSON null',
    faqTitle: 'Vanliga fragor', faq1q: 'Vilka YAML-funktioner stoeds?', faq1a: 'Mappningar, sekvenser, skalarer, blockskalarer, flodsyntax och kommentarer.', faq2q: 'Hur hanteras YAML-booleaner?', faq2a: 'true/false, yes/no, on/off konverteras till JSON true/false.', faq3q: 'Kan man konvertera JSON till YAML?', faq3a: 'Ja! Anvaend vart JSON till YAML-verktyg.', faq4q: 'Skickas data till en server?', faq4a: 'Nej. Allt i webblaasaren.', faq5q: 'Vad haender med YAML-kommentarer?', faq5a: 'De ignoreras daa JSON inte stoeder kommentarer.',
    relatedTitle: 'Relaterade verktyg', errorEmpty: 'Klistra in YAML.', errorInvalid: 'Ogiltig YAML',
  },
  no: {
    title: 'YAML til JSON Konverterer Online', description: 'Konverter YAML til JSON umiddelbart i nettleseren. Gratis, privat, ingen server.',
    inputLabel: 'YAML Inndata', outputLabel: 'JSON Utdata', yamlPlaceholder: 'name: eksempel\nversion: "1.0"\nitems:\n  - en\n  - to',
    convert: 'Konverter til JSON', clear: 'Toom', loadSample: 'Last eksempel', copyLabel: 'Kopier JSON', indentLabel: 'Innrykk:',
    introTitle: 'Gratis YAML til JSON Konverterer Online', introText: 'Lim inn YAML-dataene dine og klikk Konverter for formatert JSON.',
    howTitle: 'Slik konverterer du YAML til JSON', step1: 'Lim inn YAML i venstre panel', step2: 'Velg JSON-innrykk', step3: 'Klikk Konverter til JSON', step4: 'Klikk Kopier JSON',
    featuresTitle: 'Funksjoner', feature1: 'Parser YAML-mappinger til JSON-objekter', feature2: 'Sekvenser konverteres til JSON-arrayer', feature3: 'Flerlinjestrenger handteres korrekt', feature4: 'YAML-boolske verdier mappes til JSON-boolske', feature5: 'Null-verdier konverteres til JSON null',
    faqTitle: 'FAQ', faq1q: 'Hvilke YAML-funksjoner stoettes?', faq1a: 'Mappinger, sekvenser, skalarer, blokkskalarer, flyt-syntaks og kommentarer.', faq2q: 'Hvordan handteres YAML-boolske verdier?', faq2a: 'true/false, yes/no, on/off konverteres til JSON true/false.', faq3q: 'Kan man konvertere JSON til YAML?', faq3a: 'Ja! Bruk vart JSON til YAML-verktoy.', faq4q: 'Sendes data til en server?', faq4a: 'Nei. Alt i nettleseren.', faq5q: 'Hva skjer med YAML-kommentarer?', faq5a: 'De ignoreres fordi JSON ikke stoetter kommentarer.',
    relatedTitle: 'Relaterte verktoy', errorEmpty: 'Lim inn YAML.', errorInvalid: 'Ugyldig YAML',
  },
  id: {
    title: 'Konverter YAML ke JSON Online', description: 'Konversi YAML ke JSON secara instan di browser. Gratis, privat, tanpa server.',
    inputLabel: 'Input YAML', outputLabel: 'Output JSON', yamlPlaceholder: 'name: contoh\nversion: "1.0"\nitems:\n  - satu\n  - dua',
    convert: 'Konversi ke JSON', clear: 'Hapus', loadSample: 'Muat contoh', copyLabel: 'Salin JSON', indentLabel: 'Indentasi:',
    introTitle: 'Konverter YAML ke JSON Online Gratis', introText: 'Tempel data YAML dan klik Konversi untuk mendapatkan JSON terformat.',
    howTitle: 'Cara mengonversi YAML ke JSON', step1: 'Tempel data YAML di panel kiri', step2: 'Pilih indentasi JSON', step3: 'Klik Konversi ke JSON', step4: 'Klik Salin JSON',
    featuresTitle: 'Fitur', feature1: 'Mem-parse pemetaan YAML ke objek JSON', feature2: 'Sekuens dikonversi ke array JSON', feature3: 'String multi-baris ditangani dengan benar', feature4: 'Boolean YAML dipetakan ke boolean JSON', feature5: 'Nilai null dikonversi ke null JSON',
    faqTitle: 'FAQ', faq1q: 'Fitur YAML apa yang didukung?', faq1a: 'Pemetaan, sekuens, skalar, skalar blok, sintaks aliran, dan komentar.', faq2q: 'Bagaimana boolean YAML ditangani?', faq2a: 'true/false, yes/no, on/off dikonversi ke JSON true/false.', faq3q: 'Bisakah mengonversi JSON ke YAML?', faq3a: 'Ya! Gunakan alat JSON ke YAML kami.', faq4q: 'Apakah data dikirim ke server?', faq4a: 'Tidak. Semua di browser.', faq5q: 'Apa yang terjadi pada komentar YAML?', faq5a: 'Diabaikan karena JSON tidak mendukung komentar.',
    relatedTitle: 'Alat terkait', errorEmpty: 'Tempel konten YAML.', errorInvalid: 'YAML tidak valid',
  },
  th: {
    title: 'ตัวแปลง YAML เป็น JSON ออนไลน์', description: 'แปลง YAML เป็น JSON ทันทีในเบราว์เซอร์ ฟรี เป็นส่วนตัว ไม่ต้องใช้เซิร์ฟเวอร์',
    inputLabel: 'อินพุต YAML', outputLabel: 'เอาต์พุต JSON', yamlPlaceholder: 'name: ตัวอย่าง\nversion: "1.0"\nitems:\n  - หนึ่ง\n  - สอง',
    convert: 'แปลงเป็น JSON', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', copyLabel: 'คัดลอก JSON', indentLabel: 'การเยื้อง:',
    introTitle: 'ตัวแปลง YAML เป็น JSON ออนไลน์ฟรี', introText: 'วางข้อมูล YAML และคลิกแปลงเพื่อรับ JSON ที่จัดรูปแบบทันที',
    howTitle: 'วิธีแปลง YAML เป็น JSON', step1: 'วาง YAML ในแผงด้านซ้าย', step2: 'เลือกการเยื้อง JSON', step3: 'คลิกแปลงเป็น JSON', step4: 'คลิกคัดลอก JSON',
    featuresTitle: 'คุณสมบัติ', feature1: 'แยกวิเคราะห์การแมป YAML เป็นอ็อบเจกต์ JSON', feature2: 'ลำดับแปลงเป็นอาร์เรย์ JSON', feature3: 'สตริงหลายบรรทัดจัดการได้อย่างถูกต้อง', feature4: 'บูลีน YAML แมปเป็นบูลีน JSON', feature5: 'ค่า null แปลงเป็น JSON null',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'รองรับฟีเจอร์ YAML อะไรบ้าง?', faq1a: 'การแมป ลำดับ สเกลาร์ บล็อกสเกลาร์ รูปแบบโฟลว์ และคอมเมนต์', faq2q: 'บูลีน YAML จัดการอย่างไร?', faq2a: 'true/false, yes/no, on/off แปลงเป็น JSON true/false', faq3q: 'แปลง JSON เป็น YAML ได้ไหม?', faq3a: 'ได้! ใช้เครื่องมือ JSON เป็น YAML ของเรา', faq4q: 'ข้อมูลถูกส่งไปยังเซิร์ฟเวอร์หรือไม่?', faq4a: 'ไม่ ทุกอย่างในเบราว์เซอร์', faq5q: 'คอมเมนต์ YAML เป็นอย่างไร?', faq5a: 'ถูกละเว้นเพราะ JSON ไม่รองรับคอมเมนต์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาวาง YAML ก่อนแปลง', errorInvalid: 'YAML ไม่ถูกต้อง',
  },
};

// ---------------------------------------------------------------------------
// Minimal YAML parser (handles common YAML subset used in configs)
// ---------------------------------------------------------------------------

function parseYaml(yamlStr: string): unknown {
  const lines = yamlStr.split('\n');
  let pos = 0;

  function skipEmpty() {
    while (pos < lines.length) {
      const line = lines[pos];
      const stripped = line.replace(/#.*$/, '').trim();
      if (stripped === '' || stripped.startsWith('#')) { pos++; continue; }
      break;
    }
  }

  function getIndent(line: string): number {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  function parseScalar(val: string): unknown {
    const trimmed = val.trim();
    if (trimmed === '' || trimmed === 'null' || trimmed === '~') return null;
    if (trimmed === 'true' || trimmed === 'yes' || trimmed === 'on' || trimmed === 'True' || trimmed === 'Yes' || trimmed === 'TRUE' || trimmed === 'YES' || trimmed === 'ON') return true;
    if (trimmed === 'false' || trimmed === 'no' || trimmed === 'off' || trimmed === 'False' || trimmed === 'No' || trimmed === 'FALSE' || trimmed === 'NO' || trimmed === 'OFF') return false;
    if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    if (/^-?\d+\.\d+$/.test(trimmed) || /^-?\d+[eE][+-]?\d+$/.test(trimmed)) return parseFloat(trimmed);
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) return trimmed.slice(1, -1);
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try { return JSON.parse(trimmed); } catch { return trimmed; }
    }
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try { return JSON.parse(trimmed); } catch { return trimmed; }
    }
    return trimmed;
  }

  function parseValue(minIndent: number): unknown {
    skipEmpty();
    if (pos >= lines.length) return null;

    const line = lines[pos];
    const stripped = line.replace(/#.*$/, '').trim();
    const indent = getIndent(line);

    // Check if current line is a sequence item
    if (stripped.startsWith('- ') || stripped === '-') {
      return parseSequence(indent);
    }

    // Check if it's a mapping
    const colonMatch = stripped.match(/^([^:]+):\s*(.*)/);
    if (colonMatch) {
      return parseMapping(indent);
    }

    // It's a scalar
    pos++;
    return parseScalar(stripped);
  }

  function parseSequence(baseIndent: number): unknown[] {
    const result: unknown[] = [];
    while (pos < lines.length) {
      skipEmpty();
      if (pos >= lines.length) break;
      const line = lines[pos];
      const indent = getIndent(line);
      if (indent < baseIndent) break;
      if (indent > baseIndent) break;
      const stripped = line.replace(/#.*$/, '').trim();
      if (!stripped.startsWith('-')) break;

      const afterDash = stripped.slice(1).trim();
      pos++;

      if (afterDash === '') {
        // Next lines are nested value
        skipEmpty();
        if (pos < lines.length && getIndent(lines[pos]) > baseIndent) {
          result.push(parseValue(baseIndent + 1));
        } else {
          result.push(null);
        }
      } else {
        // Check if afterDash is a key: value
        const kvMatch = afterDash.match(/^([^:]+):\s*(.*)/);
        if (kvMatch) {
          const obj: Record<string, unknown> = {};
          const key = kvMatch[1].trim();
          const val = kvMatch[2].replace(/#.*$/, '').trim();
          if (val === '') {
            skipEmpty();
            if (pos < lines.length && getIndent(lines[pos]) > baseIndent) {
              obj[key] = parseValue(baseIndent + 1);
            } else {
              obj[key] = null;
            }
          } else {
            obj[key] = parseScalar(val);
          }
          // Continue reading same-indent keys under this list item
          while (pos < lines.length) {
            skipEmpty();
            if (pos >= lines.length) break;
            const nextLine = lines[pos];
            const nextIndent = getIndent(nextLine);
            if (nextIndent <= baseIndent) break;
            const nextStripped = nextLine.replace(/#.*$/, '').trim();
            if (nextStripped.startsWith('-')) break;
            const nextKv = nextStripped.match(/^([^:]+):\s*(.*)/);
            if (nextKv) {
              const nk = nextKv[1].trim();
              const nv = nextKv[2].replace(/#.*$/, '').trim();
              pos++;
              if (nv === '') {
                skipEmpty();
                if (pos < lines.length && getIndent(lines[pos]) > nextIndent) {
                  obj[nk] = parseValue(nextIndent + 1);
                } else {
                  obj[nk] = null;
                }
              } else {
                obj[nk] = parseScalar(nv);
              }
            } else {
              break;
            }
          }
          result.push(obj);
        } else {
          result.push(parseScalar(afterDash));
        }
      }
    }
    return result;
  }

  function parseMapping(baseIndent: number): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    while (pos < lines.length) {
      skipEmpty();
      if (pos >= lines.length) break;
      const line = lines[pos];
      const indent = getIndent(line);
      if (indent < baseIndent) break;
      if (indent > baseIndent) break;
      const stripped = line.replace(/#.*$/, '').trim();
      if (stripped.startsWith('-')) break;

      const colonMatch = stripped.match(/^([^:]+):\s*(.*)/);
      if (!colonMatch) break;

      const key = colonMatch[1].trim().replace(/^['"]|['"]$/g, '');
      const val = colonMatch[2].replace(/#.*$/, '').trim();
      pos++;

      if (val === '' || val === '|' || val === '>') {
        if (val === '|' || val === '>') {
          // Block scalar
          const blockLines: string[] = [];
          skipEmpty();
          const blockIndent = pos < lines.length ? getIndent(lines[pos]) : baseIndent + 2;
          while (pos < lines.length) {
            const bLine = lines[pos];
            if (bLine.trim() === '') { blockLines.push(''); pos++; continue; }
            if (getIndent(bLine) < blockIndent) break;
            blockLines.push(bLine.slice(blockIndent));
            pos++;
          }
          result[key] = val === '|' ? blockLines.join('\n') : blockLines.join(' ').replace(/\s+/g, ' ').trim();
        } else {
          skipEmpty();
          if (pos < lines.length && getIndent(lines[pos]) > baseIndent) {
            result[key] = parseValue(baseIndent + 1);
          } else {
            result[key] = null;
          }
        }
      } else {
        result[key] = parseScalar(val);
      }
    }
    return result;
  }

  skipEmpty();
  if (pos >= lines.length) return null;

  // Check for document start marker
  if (lines[pos].trim() === '---') pos++;

  return parseValue(0);
}

// ---------------------------------------------------------------------------
// Sample YAML
// ---------------------------------------------------------------------------

const SAMPLE_YAML = `# Docker Compose configuration
version: "3.8"

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      NGINX_HOST: example.com
      NGINX_PORT: 80
    restart: always

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
    environment:
      NODE_ENV: production
      DB_HOST: db
      REDIS_URL: "redis://redis:6379"

  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
    driver: local`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function YamlToJsonOnlineConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try {
      const parsed = parseYaml(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`${t.errorInvalid}: ${msg}`);
      setOutput('');
    }
  }, [input, indent, t]);

  const handleLoadSample = useCallback(() => { setInput(SAMPLE_YAML); setOutput(''); setError(''); }, []);
  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="yaml-to-json-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleLoadSample} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 8 }}>{t.indentLabel}</span>
        <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>

      {error && (<div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose, #f43f5e)' }}>{'\u2715'} {error}</div>)}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>YAML</span>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.yamlPlaceholder} spellCheck={false} style={{ flex: 1, minHeight: 360, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} label={t.copyLabel} />
          </div>
          <textarea value={output} readOnly placeholder="{ }" spellCheck={false} style={{ flex: 1, minHeight: 360, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/json-to-yaml`, label: 'JSON to YAML' }, { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' }, { href: `/${lang}/tools/json-prettifier`, label: 'JSON Prettifier' }, { href: `/${lang}/tools/xml-to-json-converter`, label: 'XML to JSON' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
