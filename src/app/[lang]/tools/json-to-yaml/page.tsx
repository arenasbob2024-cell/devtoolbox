'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to YAML Converter',
    description: 'Convert JSON to YAML instantly in your browser. Free, private, no server required. Supports nested objects, arrays, and all JSON data types.',
    inputLabel: 'JSON Input',
    outputLabel: 'YAML Output',
    jsonPlaceholder: '{\n  "name": "example",\n  "version": "1.0"\n}',
    convert: 'Convert to YAML',
    clear: 'Clear',
    loadSample: 'Load Sample',
    copyLabel: 'Copy YAML',
    indentLabel: 'Indent:',
    introTitle: 'Free Online JSON to YAML Converter',
    introText: 'Paste your JSON data into the input panel and click Convert to get clean, formatted YAML output instantly. The converter runs entirely in your browser — no data is ever sent to a server. Supports nested objects, arrays, numbers, booleans, null values, and multi-line strings.',
    howTitle: 'How to Convert JSON to YAML',
    step1: 'Paste or type your JSON data in the left input panel',
    step2: 'Choose your preferred indentation level (2 or 4 spaces)',
    step3: 'Click the Convert to YAML button or load a sample to try it',
    step4: 'Click Copy YAML to use the result in your project',
    featuresTitle: 'Converter Features',
    feature1: 'Handles nested objects and deeply structured JSON data',
    feature2: 'Arrays are converted to proper YAML list syntax with dash notation',
    feature3: 'Strings with special characters are automatically quoted',
    feature4: 'Null and boolean values are converted to YAML equivalents',
    feature5: 'Configurable indentation (2 or 4 spaces) for readability',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between JSON and YAML?',
    faq1a: 'JSON uses braces and brackets with strict syntax, while YAML uses indentation-based formatting that is more human-readable. YAML supports comments and is commonly used for configuration files like Docker Compose, Kubernetes manifests, and CI/CD pipelines.',
    faq2q: 'How are JSON arrays converted to YAML?',
    faq2a: 'JSON arrays are converted to YAML sequences using the dash (-) notation. Each array element appears on its own line preceded by a dash and a space. Nested arrays are indented accordingly.',
    faq3q: 'Does the converter handle special characters in strings?',
    faq3a: 'Yes. Strings containing special YAML characters (colons, hashes, brackets, etc.) are automatically wrapped in quotes to ensure valid YAML output. Multi-line strings are handled using YAML block scalar syntax when appropriate.',
    faq4q: 'Is my JSON data sent to a server?',
    faq4a: 'No. All processing happens entirely in your browser using JavaScript. Your data never leaves your device, making this tool safe for sensitive or confidential JSON documents.',
    faq5q: 'Can I convert YAML back to JSON?',
    faq5a: 'Yes! Use our YAML to JSON converter tool to convert YAML data back to JSON format. Both tools run in your browser with no server processing.',
    relatedTitle: 'Related Tools',
    errorEmpty: 'Please paste JSON content before converting.',
    errorInvalid: 'Invalid JSON',
  },
  zh: {
    title: 'JSON 转 YAML 转换器',
    description: '在浏览器中即时将 JSON 转换为 YAML。免费、私密、无需服务器。支持嵌套对象、数组和所有 JSON 数据类型。',
    inputLabel: 'JSON 输入',
    outputLabel: 'YAML 输出',
    jsonPlaceholder: '{\n  "name": "示例",\n  "version": "1.0"\n}',
    convert: '转换为 YAML',
    clear: '清除',
    loadSample: '加载示例',
    copyLabel: '复制 YAML',
    indentLabel: '缩进：',
    introTitle: '免费在线 JSON 转 YAML 转换器',
    introText: '将 JSON 数据粘贴到输入面板，点击转换即可获得格式化的 YAML 输出。转换完全在浏览器中运行，数据不会发送到服务器。支持嵌套对象、数组、布尔值和多行字符串。',
    howTitle: '如何将 JSON 转换为 YAML',
    step1: '在左侧输入框中粘贴或输入 JSON 数据',
    step2: '选择首选缩进级别（2 或 4 个空格）',
    step3: '点击"转换为 YAML"按钮，或加载示例试用',
    step4: '点击"复制 YAML"在项目中使用结果',
    featuresTitle: '转换器特性',
    feature1: '处理嵌套对象和深层结构的 JSON 数据',
    feature2: '数组使用破折号表示法转换为正确的 YAML 列表语法',
    feature3: '包含特殊字符的字符串会自动加引号',
    feature4: 'null 和布尔值转换为 YAML 等效值',
    feature5: '可配置缩进（2 或 4 个空格）以提高可读性',
    faqTitle: '常见问题',
    faq1q: 'JSON 和 YAML 有什么区别？',
    faq1a: 'JSON 使用花括号和方括号的严格语法，而 YAML 使用基于缩进的格式，更易于人类阅读。YAML 支持注释，常用于 Docker Compose、Kubernetes 清单和 CI/CD 管道等配置文件。',
    faq2q: 'JSON 数组如何转换为 YAML？',
    faq2a: 'JSON 数组使用破折号 (-) 表示法转换为 YAML 序列。每个数组元素出现在自己的行上，前面有破折号和空格。',
    faq3q: '转换器是否处理字符串中的特殊字符？',
    faq3a: '是的。包含特殊 YAML 字符（冒号、井号、括号等）的字符串会自动用引号包裹，以确保有效的 YAML 输出。',
    faq4q: '我的 JSON 数据会发送到服务器吗？',
    faq4a: '不会。所有处理完全在浏览器中使用 JavaScript 进行。数据不会离开您的设备。',
    faq5q: '可以将 YAML 转换回 JSON 吗？',
    faq5a: '可以！使用我们的 YAML 转 JSON 转换器工具将 YAML 数据转换回 JSON 格式。',
    relatedTitle: '相关工具',
    errorEmpty: '请在转换前粘贴 JSON 内容。',
    errorInvalid: 'JSON 无效',
  },
  ja: {
    title: 'JSON to YAML 変換ツール',
    description: 'ブラウザでJSONを即座にYAMLに変換。無料・プライベート・サーバー不要。ネストされたオブジェクト、配列、すべてのJSONデータ型をサポート。',
    inputLabel: 'JSON 入力',
    outputLabel: 'YAML 出力',
    jsonPlaceholder: '{\n  "name": "例",\n  "version": "1.0"\n}',
    convert: 'YAML に変換',
    clear: 'クリア',
    loadSample: 'サンプル読み込み',
    copyLabel: 'YAML をコピー',
    indentLabel: 'インデント：',
    introTitle: '無料オンライン JSON to YAML 変換ツール',
    introText: 'JSONデータを入力パネルに貼り付け、変換をクリックするだけでYAML出力が得られます。ブラウザ内で完結し、データはサーバーに送信されません。',
    howTitle: 'JSONをYAMLに変換する方法',
    step1: '左の入力パネルにJSONデータを貼り付けまたは入力',
    step2: 'インデントレベル（2または4スペース）を選択',
    step3: '「YAMLに変換」ボタンをクリックするか、サンプルを読み込む',
    step4: '「YAMLをコピー」でプロジェクトに利用',
    featuresTitle: '変換器の特徴',
    feature1: 'ネストされたオブジェクトと深い構造のJSONデータを処理',
    feature2: '配列はダッシュ表記でYAMLリスト構文に変換',
    feature3: '特殊文字を含む文字列は自動的に引用符で囲まれる',
    feature4: 'nullとブール値はYAML相当値に変換',
    feature5: 'インデント設定可能（2または4スペース）',
    faqTitle: 'よくある質問',
    faq1q: 'JSONとYAMLの違いは何ですか？',
    faq1a: 'JSONは中括弧と角括弧を使う厳格な構文ですが、YAMLはインデントベースのフォーマットで人間が読みやすいです。YAMLはコメントをサポートし、設定ファイルによく使われます。',
    faq2q: 'JSON配列はYAMLでどう変換されますか？',
    faq2a: 'JSON配列はダッシュ(-)表記でYAMLシーケンスに変換されます。各要素はダッシュとスペースの後に独立した行に表示されます。',
    faq3q: '文字列の特殊文字は処理されますか？',
    faq3a: 'はい。YAML特殊文字を含む文字列は自動的に引用符で囲まれます。',
    faq4q: 'データはサーバーに送信されますか？',
    faq4a: 'いいえ。すべてJavaScriptでブラウザ内処理されます。',
    faq5q: 'YAMLをJSONに戻せますか？',
    faq5a: 'はい！YAML to JSON変換ツールをご利用ください。',
    relatedTitle: '関連ツール',
    errorEmpty: '変換前にJSONコンテンツを貼り付けてください。',
    errorInvalid: 'JSONが無効です',
  },
  ko: {
    title: 'JSON to YAML 변환기',
    description: '브라우저에서 JSON을 즉시 YAML로 변환합니다. 무료, 개인 정보 보호, 서버 불필요.',
    inputLabel: 'JSON 입력',
    outputLabel: 'YAML 출력',
    jsonPlaceholder: '{\n  "name": "예제",\n  "version": "1.0"\n}',
    convert: 'YAML로 변환',
    clear: '지우기',
    loadSample: '샘플 로드',
    copyLabel: 'YAML 복사',
    indentLabel: '들여쓰기:',
    introTitle: '무료 온라인 JSON to YAML 변환기',
    introText: 'JSON 데이터를 입력 패널에 붙여넣고 변환을 클릭하면 즉시 YAML 출력을 얻을 수 있습니다. 브라우저에서 완전히 실행되며 데이터는 서버로 전송되지 않습니다.',
    howTitle: 'JSON을 YAML로 변환하는 방법',
    step1: '왼쪽 입력 패널에 JSON 데이터를 붙여넣기 또는 입력',
    step2: '선호하는 들여쓰기 수준 선택 (2 또는 4 스페이스)',
    step3: 'YAML로 변환 버튼을 클릭하거나 샘플을 로드',
    step4: 'YAML 복사를 클릭하여 프로젝트에 사용',
    featuresTitle: '변환기 기능',
    feature1: '중첩된 객체와 깊은 구조의 JSON 데이터 처리',
    feature2: '배열은 대시 표기법으로 YAML 목록 구문으로 변환',
    feature3: '특수 문자가 포함된 문자열은 자동으로 따옴표로 감싸짐',
    feature4: 'null과 불리언 값은 YAML 동등값으로 변환',
    feature5: '들여쓰기 설정 가능 (2 또는 4 스페이스)',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON과 YAML의 차이점은 무엇인가요?',
    faq1a: 'JSON은 중괄호와 대괄호를 사용하는 엄격한 구문이고, YAML은 들여쓰기 기반 형식으로 사람이 읽기 쉽습니다.',
    faq2q: 'JSON 배열은 YAML에서 어떻게 변환되나요?',
    faq2a: 'JSON 배열은 대시(-) 표기법을 사용하여 YAML 시퀀스로 변환됩니다.',
    faq3q: '문자열의 특수 문자가 처리되나요?',
    faq3a: '네. YAML 특수 문자를 포함하는 문자열은 자동으로 따옴표로 감싸집니다.',
    faq4q: '데이터가 서버로 전송되나요?',
    faq4a: '아니요. 모든 처리는 브라우저 내 JavaScript로 수행됩니다.',
    faq5q: 'YAML을 JSON으로 다시 변환할 수 있나요?',
    faq5a: '네! YAML to JSON 변환 도구를 사용하세요.',
    relatedTitle: '관련 도구',
    errorEmpty: '변환하기 전에 JSON 콘텐츠를 붙여넣어 주세요.',
    errorInvalid: '유효하지 않은 JSON',
  },
  fr: {
    title: 'Convertisseur JSON vers YAML',
    description: 'Convertissez JSON en YAML instantanement dans votre navigateur. Gratuit, prive, sans serveur.',
    inputLabel: 'Entree JSON',
    outputLabel: 'Sortie YAML',
    jsonPlaceholder: '{\n  "name": "exemple",\n  "version": "1.0"\n}',
    convert: 'Convertir en YAML',
    clear: 'Effacer',
    loadSample: 'Charger un exemple',
    copyLabel: 'Copier YAML',
    indentLabel: 'Indentation :',
    introTitle: 'Convertisseur JSON vers YAML gratuit en ligne',
    introText: 'Collez vos donnees JSON et cliquez sur Convertir pour obtenir du YAML formate instantanement. Tout se passe dans votre navigateur.',
    howTitle: 'Comment convertir JSON en YAML',
    step1: 'Collez ou saisissez vos donnees JSON dans le panneau gauche',
    step2: "Choisissez le niveau d'indentation (2 ou 4 espaces)",
    step3: 'Cliquez sur Convertir en YAML ou chargez un exemple',
    step4: 'Cliquez sur Copier YAML pour utiliser le resultat',
    featuresTitle: 'Fonctionnalites',
    feature1: 'Gere les objets imbriques et les structures JSON profondes',
    feature2: 'Les tableaux sont convertis en syntaxe de liste YAML avec tirets',
    feature3: 'Les chaines avec caracteres speciaux sont automatiquement entre guillemets',
    feature4: 'Les valeurs null et booleennes sont converties en equivalents YAML',
    feature5: 'Indentation configurable (2 ou 4 espaces)',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quelle est la difference entre JSON et YAML ?',
    faq1a: 'JSON utilise des accolades avec une syntaxe stricte, tandis que YAML utilise un formatage base sur l\'indentation plus lisible.',
    faq2q: 'Comment les tableaux JSON sont-ils convertis en YAML ?',
    faq2a: 'Les tableaux JSON sont convertis en sequences YAML avec la notation tiret (-).',
    faq3q: 'Les caracteres speciaux sont-ils geres ?',
    faq3a: 'Oui. Les chaines contenant des caracteres speciaux YAML sont automatiquement entre guillemets.',
    faq4q: 'Mes donnees sont-elles envoyees a un serveur ?',
    faq4a: 'Non. Tout le traitement se fait dans votre navigateur en JavaScript.',
    faq5q: 'Peut-on convertir YAML en JSON ?',
    faq5a: 'Oui ! Utilisez notre outil YAML vers JSON.',
    relatedTitle: 'Outils connexes',
    errorEmpty: 'Veuillez coller du contenu JSON avant de convertir.',
    errorInvalid: 'JSON invalide',
  },
  de: {
    title: 'JSON zu YAML Konverter',
    description: 'Konvertieren Sie JSON sofort in YAML im Browser. Kostenlos, privat, kein Server erforderlich.',
    inputLabel: 'JSON Eingabe',
    outputLabel: 'YAML Ausgabe',
    jsonPlaceholder: '{\n  "name": "Beispiel",\n  "version": "1.0"\n}',
    convert: 'In YAML konvertieren',
    clear: 'Leeren',
    loadSample: 'Beispiel laden',
    copyLabel: 'YAML kopieren',
    indentLabel: 'Einzug:',
    introTitle: 'Kostenloser Online JSON zu YAML Konverter',
    introText: 'Fuegen Sie Ihre JSON-Daten ein und klicken Sie auf Konvertieren fuer formatiertes YAML. Alles laeuft im Browser.',
    howTitle: 'So konvertieren Sie JSON in YAML',
    step1: 'Fuegen Sie JSON-Daten im linken Eingabefeld ein',
    step2: 'Waehlen Sie die Einrueckungsebene (2 oder 4 Leerzeichen)',
    step3: 'Klicken Sie auf "In YAML konvertieren" oder laden Sie ein Beispiel',
    step4: 'Klicken Sie auf "YAML kopieren" um das Ergebnis zu verwenden',
    featuresTitle: 'Funktionen',
    feature1: 'Verarbeitet verschachtelte Objekte und tiefe JSON-Strukturen',
    feature2: 'Arrays werden mit Strich-Notation in YAML-Listen konvertiert',
    feature3: 'Strings mit Sonderzeichen werden automatisch in Anfuehrungszeichen gesetzt',
    feature4: 'Null- und Boolean-Werte werden in YAML-Aequivalente konvertiert',
    feature5: 'Konfigurierbare Einrueckung (2 oder 4 Leerzeichen)',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist der Unterschied zwischen JSON und YAML?',
    faq1a: 'JSON verwendet geschweifte Klammern mit strikter Syntax, waehrend YAML einrueckungsbasierte Formatierung nutzt.',
    faq2q: 'Wie werden JSON-Arrays in YAML konvertiert?',
    faq2a: 'JSON-Arrays werden mit der Strich-Notation (-) in YAML-Sequenzen konvertiert.',
    faq3q: 'Werden Sonderzeichen in Strings behandelt?',
    faq3a: 'Ja. Strings mit YAML-Sonderzeichen werden automatisch in Anfuehrungszeichen gesetzt.',
    faq4q: 'Werden meine Daten an einen Server gesendet?',
    faq4a: 'Nein. Alles wird im Browser mit JavaScript verarbeitet.',
    faq5q: 'Kann man YAML zurueck in JSON konvertieren?',
    faq5a: 'Ja! Nutzen Sie unser YAML zu JSON Tool.',
    relatedTitle: 'Verwandte Tools',
    errorEmpty: 'Bitte JSON-Inhalt einfuegen.',
    errorInvalid: 'Ungueltiges JSON',
  },
  es: {
    title: 'Convertidor JSON a YAML',
    description: 'Convierte JSON a YAML instantaneamente en tu navegador. Gratis, privado, sin servidor.',
    inputLabel: 'Entrada JSON',
    outputLabel: 'Salida YAML',
    jsonPlaceholder: '{\n  "name": "ejemplo",\n  "version": "1.0"\n}',
    convert: 'Convertir a YAML',
    clear: 'Limpiar',
    loadSample: 'Cargar ejemplo',
    copyLabel: 'Copiar YAML',
    indentLabel: 'Sangria:',
    introTitle: 'Convertidor JSON a YAML gratuito en linea',
    introText: 'Pega tus datos JSON y haz clic en Convertir para obtener YAML formateado al instante. Todo se procesa en tu navegador.',
    howTitle: 'Como convertir JSON a YAML',
    step1: 'Pega o escribe tus datos JSON en el panel izquierdo',
    step2: 'Elige el nivel de sangria (2 o 4 espacios)',
    step3: 'Haz clic en "Convertir a YAML" o carga un ejemplo',
    step4: 'Haz clic en "Copiar YAML" para usar el resultado',
    featuresTitle: 'Caracteristicas',
    feature1: 'Maneja objetos anidados y estructuras JSON profundas',
    feature2: 'Los arrays se convierten en sintaxis de lista YAML con guiones',
    feature3: 'Las cadenas con caracteres especiales se entrecomillan automaticamente',
    feature4: 'Los valores null y booleanos se convierten en equivalentes YAML',
    feature5: 'Sangria configurable (2 o 4 espacios)',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Cual es la diferencia entre JSON y YAML?',
    faq1a: 'JSON usa llaves con sintaxis estricta, mientras que YAML usa formato basado en sangria mas legible.',
    faq2q: 'Como se convierten los arrays JSON a YAML?',
    faq2a: 'Los arrays JSON se convierten en secuencias YAML con la notacion de guion (-).',
    faq3q: 'Se manejan los caracteres especiales?',
    faq3a: 'Si. Las cadenas con caracteres especiales YAML se entrecomillan automaticamente.',
    faq4q: 'Se envian mis datos a un servidor?',
    faq4a: 'No. Todo el procesamiento ocurre en tu navegador con JavaScript.',
    faq5q: 'Se puede convertir YAML a JSON?',
    faq5a: 'Si! Usa nuestra herramienta YAML a JSON.',
    relatedTitle: 'Herramientas relacionadas',
    errorEmpty: 'Por favor pega contenido JSON antes de convertir.',
    errorInvalid: 'JSON invalido',
  },
  pt: {
    title: 'Conversor JSON para YAML',
    description: 'Converta JSON para YAML instantaneamente no navegador. Gratis, privado, sem servidor.',
    inputLabel: 'Entrada JSON',
    outputLabel: 'Saida YAML',
    jsonPlaceholder: '{\n  "name": "exemplo",\n  "version": "1.0"\n}',
    convert: 'Converter para YAML',
    clear: 'Limpar',
    loadSample: 'Carregar exemplo',
    copyLabel: 'Copiar YAML',
    indentLabel: 'Recuo:',
    introTitle: 'Conversor JSON para YAML Online Gratuito',
    introText: 'Cole seus dados JSON e clique em Converter para obter YAML formatado instantaneamente. Tudo e processado no seu navegador.',
    howTitle: 'Como converter JSON para YAML',
    step1: 'Cole ou digite seus dados JSON no painel esquerdo',
    step2: 'Escolha o nivel de recuo (2 ou 4 espacos)',
    step3: 'Clique em "Converter para YAML" ou carregue um exemplo',
    step4: 'Clique em "Copiar YAML" para usar o resultado',
    featuresTitle: 'Recursos',
    feature1: 'Lida com objetos aninhados e estruturas JSON profundas',
    feature2: 'Arrays sao convertidos em sintaxe de lista YAML com travessoes',
    feature3: 'Strings com caracteres especiais sao automaticamente entre aspas',
    feature4: 'Valores null e booleanos sao convertidos em equivalentes YAML',
    feature5: 'Recuo configuravel (2 ou 4 espacos)',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Qual a diferenca entre JSON e YAML?',
    faq1a: 'JSON usa chaves com sintaxe estrita, enquanto YAML usa formatacao baseada em recuo mais legivel.',
    faq2q: 'Como arrays JSON sao convertidos para YAML?',
    faq2a: 'Arrays JSON sao convertidos em sequencias YAML com a notacao de travessao (-).',
    faq3q: 'Caracteres especiais sao tratados?',
    faq3a: 'Sim. Strings com caracteres especiais YAML sao automaticamente entre aspas.',
    faq4q: 'Meus dados sao enviados a um servidor?',
    faq4a: 'Nao. Todo o processamento ocorre no navegador com JavaScript.',
    faq5q: 'Posso converter YAML para JSON?',
    faq5a: 'Sim! Use nossa ferramenta YAML para JSON.',
    relatedTitle: 'Ferramentas relacionadas',
    errorEmpty: 'Por favor cole conteudo JSON antes de converter.',
    errorInvalid: 'JSON invalido',
  },
  it: {
    title: 'Convertitore JSON in YAML',
    description: 'Converti JSON in YAML istantaneamente nel browser. Gratuito, privato, senza server.',
    inputLabel: 'Input JSON',
    outputLabel: 'Output YAML',
    jsonPlaceholder: '{\n  "name": "esempio",\n  "version": "1.0"\n}',
    convert: 'Converti in YAML',
    clear: 'Cancella',
    loadSample: 'Carica esempio',
    copyLabel: 'Copia YAML',
    indentLabel: 'Rientro:',
    introTitle: 'Convertitore JSON in YAML Online Gratuito',
    introText: 'Incolla i tuoi dati JSON e clicca Converti per ottenere YAML formattato istantaneamente. Tutto avviene nel browser.',
    howTitle: 'Come convertire JSON in YAML',
    step1: 'Incolla o digita i dati JSON nel pannello sinistro',
    step2: 'Scegli il livello di rientro (2 o 4 spazi)',
    step3: 'Clicca su "Converti in YAML" o carica un esempio',
    step4: 'Clicca su "Copia YAML" per usare il risultato',
    featuresTitle: 'Funzionalita',
    feature1: 'Gestisce oggetti annidati e strutture JSON profonde',
    feature2: 'Gli array vengono convertiti in sintassi lista YAML con trattini',
    feature3: 'Le stringhe con caratteri speciali vengono automaticamente tra virgolette',
    feature4: 'I valori null e booleani vengono convertiti in equivalenti YAML',
    feature5: 'Rientro configurabile (2 o 4 spazi)',
    faqTitle: 'Domande frequenti',
    faq1q: 'Qual e la differenza tra JSON e YAML?',
    faq1a: 'JSON usa parentesi graffe con sintassi rigorosa, mentre YAML usa formattazione basata su rientro piu leggibile.',
    faq2q: 'Come vengono convertiti gli array JSON in YAML?',
    faq2a: 'Gli array JSON vengono convertiti in sequenze YAML con la notazione trattino (-).',
    faq3q: 'I caratteri speciali vengono gestiti?',
    faq3a: 'Si. Le stringhe con caratteri speciali YAML vengono automaticamente tra virgolette.',
    faq4q: 'I miei dati vengono inviati a un server?',
    faq4a: 'No. Tutto il processing avviene nel browser con JavaScript.',
    faq5q: 'Si puo convertire YAML in JSON?',
    faq5a: 'Si! Usa il nostro strumento YAML in JSON.',
    relatedTitle: 'Strumenti correlati',
    errorEmpty: 'Incolla contenuto JSON prima di convertire.',
    errorInvalid: 'JSON non valido',
  },
  nl: {
    title: 'JSON naar YAML Converter',
    description: 'Converteer JSON naar YAML direct in uw browser. Gratis, privaat, geen server nodig.',
    inputLabel: 'JSON Invoer',
    outputLabel: 'YAML Uitvoer',
    jsonPlaceholder: '{\n  "name": "voorbeeld",\n  "version": "1.0"\n}',
    convert: 'Naar YAML converteren',
    clear: 'Wissen',
    loadSample: 'Voorbeeld laden',
    copyLabel: 'YAML kopieren',
    indentLabel: 'Inspringing:',
    introTitle: 'Gratis Online JSON naar YAML Converter',
    introText: 'Plak uw JSON-gegevens en klik op Converteren voor direct geformatteerde YAML-uitvoer. Alles verloopt in uw browser.',
    howTitle: 'Hoe JSON naar YAML te converteren',
    step1: 'Plak of typ JSON-gegevens in het linker invoerpaneel',
    step2: 'Kies het inspringingsniveau (2 of 4 spaties)',
    step3: 'Klik op "Naar YAML converteren" of laad een voorbeeld',
    step4: 'Klik op "YAML kopieren" om het resultaat te gebruiken',
    featuresTitle: 'Functies',
    feature1: 'Verwerkt geneste objecten en diepe JSON-structuren',
    feature2: 'Arrays worden geconverteerd naar YAML-lijstsyntax met streepjes',
    feature3: 'Strings met speciale tekens worden automatisch aangehaald',
    feature4: 'Null- en booleaanse waarden worden geconverteerd naar YAML-equivalenten',
    feature5: 'Configureerbare inspringing (2 of 4 spaties)',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is het verschil tussen JSON en YAML?',
    faq1a: 'JSON gebruikt accolades met strikte syntaxis, terwijl YAML op inspringing gebaseerde opmaak gebruikt.',
    faq2q: 'Hoe worden JSON-arrays geconverteerd naar YAML?',
    faq2a: 'JSON-arrays worden geconverteerd naar YAML-sequenties met de streepjesnotatie (-).',
    faq3q: 'Worden speciale tekens behandeld?',
    faq3a: 'Ja. Strings met YAML-speciale tekens worden automatisch aangehaald.',
    faq4q: 'Worden mijn gegevens naar een server gestuurd?',
    faq4a: 'Nee. Alle verwerking vindt plaats in uw browser met JavaScript.',
    faq5q: 'Kan ik YAML terug naar JSON converteren?',
    faq5a: 'Ja! Gebruik onze YAML naar JSON tool.',
    relatedTitle: 'Gerelateerde tools',
    errorEmpty: 'Plak JSON-inhoud voor het converteren.',
    errorInvalid: 'Ongeldig JSON',
  },
  pl: {
    title: 'Konwerter JSON na YAML',
    description: 'Konwertuj JSON do YAML natychmiast w przegladarce. Darmowy, prywatny, bez serwera.',
    inputLabel: 'Wejscie JSON',
    outputLabel: 'Wyjscie YAML',
    jsonPlaceholder: '{\n  "name": "przyklad",\n  "version": "1.0"\n}',
    convert: 'Konwertuj do YAML',
    clear: 'Wyczysc',
    loadSample: 'Zaladuj przyklad',
    copyLabel: 'Kopiuj YAML',
    indentLabel: 'Wciecie:',
    introTitle: 'Darmowy Konwerter JSON na YAML Online',
    introText: 'Wklej dane JSON i kliknij Konwertuj, aby natychmiast uzyskac sformatowany YAML. Wszystko odbywa sie w przegladarce.',
    howTitle: 'Jak konwertowac JSON na YAML',
    step1: 'Wklej lub wpisz dane JSON w lewym panelu',
    step2: 'Wybierz poziom wciecia (2 lub 4 spacje)',
    step3: 'Kliknij "Konwertuj do YAML" lub zaladuj przyklad',
    step4: 'Kliknij "Kopiuj YAML" aby uzyc wyniku',
    featuresTitle: 'Funkcje',
    feature1: 'Obsluguje zagniezdzene obiekty i gleboke struktury JSON',
    feature2: 'Tablice sa konwertowane na skladnie list YAML z myslnikami',
    feature3: 'Ciagi ze znakami specjalnymi sa automatycznie umieszczane w cudzyslowach',
    feature4: 'Wartosci null i logiczne sa konwertowane na odpowiedniki YAML',
    feature5: 'Konfigurowalny poziom wciecia (2 lub 4 spacje)',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jaka jest roznica miedzy JSON a YAML?',
    faq1a: 'JSON uzywa nawiasow klamrowych ze scisla skladnia, podczas gdy YAML uzywa formatowania opartego na wcieciach.',
    faq2q: 'Jak tablice JSON sa konwertowane na YAML?',
    faq2a: 'Tablice JSON sa konwertowane na sekwencje YAML z notacja myslnikowa (-).',
    faq3q: 'Czy znaki specjalne sa obslugiwane?',
    faq3a: 'Tak. Ciagi ze znakami specjalnymi YAML sa automatycznie umieszczane w cudzyslowach.',
    faq4q: 'Czy moje dane sa wysylane na serwer?',
    faq4a: 'Nie. Cale przetwarzanie odbywa sie w przegladarce za pomoca JavaScript.',
    faq5q: 'Czy mozna konwertowac YAML na JSON?',
    faq5a: 'Tak! Uzyj naszego narzedzia YAML na JSON.',
    relatedTitle: 'Powiazane narzedzia',
    errorEmpty: 'Wklej zawartosc JSON przed konwersja.',
    errorInvalid: 'Nieprawidlowy JSON',
  },
  sv: {
    title: 'JSON till YAML Konverterare',
    description: 'Konvertera JSON till YAML direkt i webblaasaren. Gratis, privat, ingen server behövs.',
    inputLabel: 'JSON Indata',
    outputLabel: 'YAML Utdata',
    jsonPlaceholder: '{\n  "name": "exempel",\n  "version": "1.0"\n}',
    convert: 'Konvertera till YAML',
    clear: 'Rensa',
    loadSample: 'Ladda exempel',
    copyLabel: 'Kopiera YAML',
    indentLabel: 'Indrag:',
    introTitle: 'Gratis JSON till YAML Konverterare Online',
    introText: 'Klistra in dina JSON-data och klicka pa Konvertera for att fa formaterad YAML direkt. Allt sker i din webblaasare.',
    howTitle: 'Hur man konverterar JSON till YAML',
    step1: 'Klistra in eller skriv JSON-data i vaenster panel',
    step2: 'Vaelj indragsniva (2 eller 4 mellanslag)',
    step3: 'Klicka pa "Konvertera till YAML" eller ladda ett exempel',
    step4: 'Klicka pa "Kopiera YAML" for att anvaenda resultatet',
    featuresTitle: 'Funktioner',
    feature1: 'Hanterar naestade objekt och djupa JSON-strukturer',
    feature2: 'Arrayer konverteras till YAML-listsyntax med streck',
    feature3: 'Straengar med specialtecken citeras automatiskt',
    feature4: 'Null- och booleska vaerden konverteras till YAML-motsvarigheter',
    feature5: 'Konfigurerbart indrag (2 eller 4 mellanslag)',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer skillnaden mellan JSON och YAML?',
    faq1a: 'JSON anvaender klamrar med strikt syntax, medan YAML anvaender indragsbaserad formatering.',
    faq2q: 'Hur konverteras JSON-arrayer till YAML?',
    faq2a: 'JSON-arrayer konverteras till YAML-sekvenser med streck-notation (-).',
    faq3q: 'Hanteras specialtecken?',
    faq3a: 'Ja. Straengar med YAML-specialtecken citeras automatiskt.',
    faq4q: 'Skickas mina data till en server?',
    faq4a: 'Nej. All behandling sker i din webblaasare med JavaScript.',
    faq5q: 'Kan man konvertera YAML tillbaka till JSON?',
    faq5a: 'Ja! Anvaend vart YAML till JSON-verktyg.',
    relatedTitle: 'Relaterade verktyg',
    errorEmpty: 'Klistra in JSON-innehall innan konvertering.',
    errorInvalid: 'Ogiltigt JSON',
  },
  no: {
    title: 'JSON til YAML Konverterer',
    description: 'Konverter JSON til YAML umiddelbart i nettleseren. Gratis, privat, ingen server nodvendig.',
    inputLabel: 'JSON Inndata',
    outputLabel: 'YAML Utdata',
    jsonPlaceholder: '{\n  "name": "eksempel",\n  "version": "1.0"\n}',
    convert: 'Konverter til YAML',
    clear: 'Toom',
    loadSample: 'Last eksempel',
    copyLabel: 'Kopier YAML',
    indentLabel: 'Innrykk:',
    introTitle: 'Gratis JSON til YAML Konverterer Online',
    introText: 'Lim inn JSON-dataene dine og klikk Konverter for a fa formatert YAML umiddelbart. Alt skjer i nettleseren din.',
    howTitle: 'Slik konverterer du JSON til YAML',
    step1: 'Lim inn eller skriv JSON-data i det venstre panelet',
    step2: 'Velg innrykksniva (2 eller 4 mellomrom)',
    step3: 'Klikk "Konverter til YAML" eller last et eksempel',
    step4: 'Klikk "Kopier YAML" for a bruke resultatet',
    featuresTitle: 'Funksjoner',
    feature1: 'Handterer nestede objekter og dype JSON-strukturer',
    feature2: 'Arrayer konverteres til YAML-listesyntaks med bindestrek',
    feature3: 'Strenger med spesialtegn siteres automatisk',
    feature4: 'Null- og boolske verdier konverteres til YAML-ekvivalenter',
    feature5: 'Konfigurerbart innrykk (2 eller 4 mellomrom)',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er forskjellen mellom JSON og YAML?',
    faq1a: 'JSON bruker klammeparenteser med streng syntaks, mens YAML bruker innrykksbasert formatering.',
    faq2q: 'Hvordan konverteres JSON-arrayer til YAML?',
    faq2a: 'JSON-arrayer konverteres til YAML-sekvenser med bindestrek-notasjon (-).',
    faq3q: 'Handteres spesialtegn?',
    faq3a: 'Ja. Strenger med YAML-spesialtegn siteres automatisk.',
    faq4q: 'Sendes dataene mine til en server?',
    faq4a: 'Nei. All behandling skjer i nettleseren din med JavaScript.',
    faq5q: 'Kan man konvertere YAML tilbake til JSON?',
    faq5a: 'Ja! Bruk vart YAML til JSON-verktoy.',
    relatedTitle: 'Relaterte verktoy',
    errorEmpty: 'Lim inn JSON-innhold for konvertering.',
    errorInvalid: 'Ugyldig JSON',
  },
  id: {
    title: 'Konverter JSON ke YAML',
    description: 'Konversi JSON ke YAML secara instan di browser Anda. Gratis, privat, tanpa server.',
    inputLabel: 'Input JSON',
    outputLabel: 'Output YAML',
    jsonPlaceholder: '{\n  "name": "contoh",\n  "version": "1.0"\n}',
    convert: 'Konversi ke YAML',
    clear: 'Hapus',
    loadSample: 'Muat contoh',
    copyLabel: 'Salin YAML',
    indentLabel: 'Indentasi:',
    introTitle: 'Konverter JSON ke YAML Online Gratis',
    introText: 'Tempel data JSON Anda dan klik Konversi untuk mendapatkan YAML terformat secara instan. Semua diproses di browser Anda.',
    howTitle: 'Cara mengonversi JSON ke YAML',
    step1: 'Tempel atau ketik data JSON di panel kiri',
    step2: 'Pilih level indentasi (2 atau 4 spasi)',
    step3: 'Klik "Konversi ke YAML" atau muat contoh',
    step4: 'Klik "Salin YAML" untuk menggunakan hasilnya',
    featuresTitle: 'Fitur',
    feature1: 'Menangani objek bersarang dan struktur JSON mendalam',
    feature2: 'Array dikonversi ke sintaks daftar YAML dengan tanda hubung',
    feature3: 'String dengan karakter khusus secara otomatis dikutip',
    feature4: 'Nilai null dan boolean dikonversi ke padanan YAML',
    feature5: 'Indentasi yang dapat dikonfigurasi (2 atau 4 spasi)',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa perbedaan antara JSON dan YAML?',
    faq1a: 'JSON menggunakan kurung kurawal dengan sintaks ketat, sementara YAML menggunakan pemformatan berbasis indentasi yang lebih mudah dibaca.',
    faq2q: 'Bagaimana array JSON dikonversi ke YAML?',
    faq2a: 'Array JSON dikonversi ke sekuens YAML dengan notasi tanda hubung (-).',
    faq3q: 'Apakah karakter khusus ditangani?',
    faq3a: 'Ya. String dengan karakter khusus YAML secara otomatis dikutip.',
    faq4q: 'Apakah data saya dikirim ke server?',
    faq4a: 'Tidak. Semua pemrosesan terjadi di browser Anda menggunakan JavaScript.',
    faq5q: 'Bisakah mengonversi YAML ke JSON?',
    faq5a: 'Ya! Gunakan alat YAML ke JSON kami.',
    relatedTitle: 'Alat terkait',
    errorEmpty: 'Tempel konten JSON sebelum mengonversi.',
    errorInvalid: 'JSON tidak valid',
  },
  th: {
    title: 'ตัวแปลง JSON เป็น YAML',
    description: 'แปลง JSON เป็น YAML ทันทีในเบราว์เซอร์ของคุณ ฟรี เป็นส่วนตัว ไม่ต้องใช้เซิร์ฟเวอร์',
    inputLabel: 'อินพุต JSON',
    outputLabel: 'เอาต์พุต YAML',
    jsonPlaceholder: '{\n  "name": "ตัวอย่าง",\n  "version": "1.0"\n}',
    convert: 'แปลงเป็น YAML',
    clear: 'ล้าง',
    loadSample: 'โหลดตัวอย่าง',
    copyLabel: 'คัดลอก YAML',
    indentLabel: 'การเยื้อง:',
    introTitle: 'ตัวแปลง JSON เป็น YAML ออนไลน์ฟรี',
    introText: 'วางข้อมูล JSON ของคุณและคลิกแปลงเพื่อรับ YAML ที่จัดรูปแบบทันที ทุกอย่างทำงานในเบราว์เซอร์ของคุณ',
    howTitle: 'วิธีแปลง JSON เป็น YAML',
    step1: 'วางหรือพิมพ์ข้อมูล JSON ในแผงด้านซ้าย',
    step2: 'เลือกระดับการเยื้อง (2 หรือ 4 ช่องว่าง)',
    step3: 'คลิก "แปลงเป็น YAML" หรือโหลดตัวอย่าง',
    step4: 'คลิก "คัดลอก YAML" เพื่อใช้ผลลัพธ์',
    featuresTitle: 'คุณสมบัติ',
    feature1: 'จัดการอ็อบเจกต์ซ้อนและโครงสร้าง JSON ลึก',
    feature2: 'อาร์เรย์แปลงเป็นรูปแบบรายการ YAML ด้วยเครื่องหมายขีดกลาง',
    feature3: 'สตริงที่มีอักขระพิเศษจะถูกใส่เครื่องหมายคำพูดอัตโนมัติ',
    feature4: 'ค่า null และบูลีนแปลงเป็นค่าเทียบเท่า YAML',
    feature5: 'การเยื้องที่กำหนดค่าได้ (2 หรือ 4 ช่องว่าง)',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'JSON กับ YAML ต่างกันอย่างไร?',
    faq1a: 'JSON ใช้วงเล็บปีกกาด้วยรูปแบบที่เข้มงวด ส่วน YAML ใช้การจัดรูปแบบตามการเยื้องที่อ่านง่ายกว่า',
    faq2q: 'อาร์เรย์ JSON แปลงเป็น YAML อย่างไร?',
    faq2a: 'อาร์เรย์ JSON แปลงเป็นลำดับ YAML ด้วยเครื่องหมายขีดกลาง (-)',
    faq3q: 'อักขระพิเศษถูกจัดการหรือไม่?',
    faq3a: 'ใช่ สตริงที่มีอักขระพิเศษ YAML จะถูกใส่เครื่องหมายคำพูดอัตโนมัติ',
    faq4q: 'ข้อมูลของฉันถูกส่งไปยังเซิร์ฟเวอร์หรือไม่?',
    faq4a: 'ไม่ การประมวลผลทั้งหมดเกิดขึ้นในเบราว์เซอร์ของคุณด้วย JavaScript',
    faq5q: 'แปลง YAML กลับเป็น JSON ได้ไหม?',
    faq5a: 'ได้! ใช้เครื่องมือแปลง YAML เป็น JSON ของเรา',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
    errorEmpty: 'กรุณาวาง JSON ก่อนแปลง',
    errorInvalid: 'JSON ไม่ถูกต้อง',
  },
};

// ---------------------------------------------------------------------------
// JSON → YAML conversion (pure JS, no dependencies)
// ---------------------------------------------------------------------------

function jsonToYaml(value: unknown, indent: number, level: number = 0): string {
  const prefix = ' '.repeat(indent * level);
  const childPrefix = ' '.repeat(indent * (level + 1));

  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);

  if (typeof value === 'string') {
    if (
      value === '' ||
      value === 'true' || value === 'false' ||
      value === 'null' || value === 'yes' || value === 'no' ||
      value === 'on' || value === 'off' ||
      /^[\d.eE+-]+$/.test(value) ||
      /[:{}\[\],&*?|>!%#@`'"]/.test(value) ||
      value.includes('\n')
    ) {
      if (value.includes('\n')) {
        const lines = value.split('\n');
        return '|\n' + lines.map(l => childPrefix + l).join('\n');
      }
      return JSON.stringify(value);
    }
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const lines: string[] = [];
    for (const item of value) {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const entries = Object.entries(item as Record<string, unknown>);
        if (entries.length > 0) {
          const [firstKey, firstVal] = entries[0];
          const firstValStr = jsonToYaml(firstVal, indent, level + 2);
          const isSimple = typeof firstVal !== 'object' || firstVal === null;
          lines.push(prefix + '- ' + firstKey + ': ' + (isSimple ? firstValStr : '\n' + ' '.repeat(indent * (level + 2)) + firstValStr.trimStart()));
          for (let i = 1; i < entries.length; i++) {
            const [k, v] = entries[i];
            const vStr = jsonToYaml(v, indent, level + 2);
            const vSimple = typeof v !== 'object' || v === null;
            lines.push(childPrefix + k + ': ' + (vSimple ? vStr : '\n' + ' '.repeat(indent * (level + 2)) + vStr.trimStart()));
          }
        } else {
          lines.push(prefix + '- {}');
        }
      } else {
        lines.push(prefix + '- ' + jsonToYaml(item, indent, level + 1));
      }
    }
    return lines.join('\n');
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const lines: string[] = [];
    for (const key of keys) {
      const val = obj[key];
      const safeKey = /[:{}\[\],&*?|>!%#@`'"\\]/.test(key) || key === '' ? JSON.stringify(key) : key;
      if (val !== null && typeof val === 'object') {
        const child = jsonToYaml(val, indent, level + 1);
        if (Array.isArray(val) && val.length === 0) {
          lines.push(prefix + safeKey + ': []');
        } else if (!Array.isArray(val) && Object.keys(val as Record<string, unknown>).length === 0) {
          lines.push(prefix + safeKey + ': {}');
        } else {
          lines.push(prefix + safeKey + ':\n' + child);
        }
      } else {
        lines.push(prefix + safeKey + ': ' + jsonToYaml(val, indent, level + 1));
      }
    }
    return lines.join('\n');
  }

  return String(value);
}

function convertJsonToYaml(jsonString: string, indent: number): string {
  const trimmed = jsonString.trim();
  if (!trimmed) throw new Error('empty');
  const parsed = JSON.parse(trimmed);
  return jsonToYaml(parsed, indent);
}

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const SAMPLE_JSON = `{
  "project": {
    "name": "my-app",
    "version": "2.1.0",
    "description": "A sample project for JSON to YAML conversion"
  },
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "typescript": "^5.3.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "authors": [
    {
      "name": "Alice",
      "email": "alice@example.com",
      "role": "lead"
    },
    {
      "name": "Bob",
      "email": "bob@example.com",
      "role": "contributor"
    }
  ],
  "config": {
    "port": 3000,
    "debug": false,
    "features": ["ssr", "api-routes", "middleware"],
    "database": null
  }
}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function JsonToYamlConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) {
      setError(t.errorEmpty);
      setOutput('');
      return;
    }
    try {
      const result = convertJsonToYaml(input, indent);
      setOutput(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg === 'empty' ? t.errorEmpty : `${t.errorInvalid}: ${msg}`);
      setOutput('');
    }
  }, [input, indent, t]);

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
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
    <ToolLayout title={t.title} description={t.description} toolId="json-to-yaml">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 8 }}>{t.indentLabel}</span>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }}
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>JSON</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.jsonPlaceholder}
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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} label={t.copyLabel} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="---"
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

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.feature1}</li>
          <li>{t.feature2}</li>
          <li>{t.feature3}</li>
          <li>{t.feature4}</li>
          <li>{t.feature5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>
                {faq.q}
              </summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/yaml-to-json-online`, label: 'YAML to JSON' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-prettifier`, label: 'JSON Prettifier' },
            { href: `/${lang}/tools/json-to-xml-converter`, label: 'JSON to XML' },
            { href: `/${lang}/tools/csv-to-json-online`, label: 'CSV to JSON' },
          ].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)', transition: 'border-color 0.2s' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
