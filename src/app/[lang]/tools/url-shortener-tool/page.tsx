'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'URL Encoder & Decoder',
    description: 'Encode and decode URLs online. Convert special characters to percent-encoded format and decode URL-encoded strings.',
    inputLabel: 'Input',
    inputPlaceholder: 'Enter a URL or text to encode/decode...',
    outputLabel: 'Output',
    encodeBtn: 'Encode URL',
    decodeBtn: 'Decode URL',
    encodeComponentBtn: 'Encode Component',
    decodeComponentBtn: 'Decode Component',
    clear: 'Clear',
    swap: 'Swap',
    loadSample: 'Load Sample',
    mode: 'Mode',
    fullUrl: 'Full URL (encodeURI)',
    component: 'Component (encodeURIComponent)',
    parseBtn: 'Parse URL',
    parsedUrl: 'Parsed URL Components',
    protocol: 'Protocol',
    host: 'Host',
    pathname: 'Path',
    search: 'Query',
    hash: 'Hash',
    params: 'Parameters',
    introTitle: 'Free Online URL Encoder & Decoder',
    introText: 'Encode special characters in URLs using percent-encoding (also called URL encoding) or decode percent-encoded strings back to readable text. This tool supports both encodeURI (for full URLs, preserving :, /, ?, #, &, =) and encodeURIComponent (for individual query parameters, encoding all special characters). Essential for web development, API debugging, form data handling, and constructing valid query strings with UTF-8 characters.',
    cheatTitle: 'Common URL Encoding Reference',
    ruleCol: 'Character', descCol: 'Encoded', exampleCol: 'Usage',
    rule1: 'Space', rule1Desc: '%20 or +', rule1Ex: 'Query strings, form data',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Separate query parameters',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Key-value pairs',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Fragment identifiers',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Path separators',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is URL encoding (percent-encoding)?',
    faq1a: 'URL encoding replaces unsafe or reserved characters in a URL with a percent sign (%) followed by two hexadecimal digits. For example, a space becomes %20 and an ampersand becomes %26. This ensures URLs are valid and can be safely transmitted across the internet, as URLs can only contain a limited set of ASCII characters.',
    faq2q: 'What is the difference between encodeURI and encodeURIComponent?',
    faq2a: 'encodeURI encodes a complete URL while preserving characters that have special meaning in URLs like :, /, ?, #, &, and =. encodeURIComponent encodes all special characters including those URL-significant ones, making it suitable for encoding individual query parameter values. Use encodeURI for full URLs and encodeURIComponent for parameter values.',
    faq3q: 'When should I URL-encode data?',
    faq3a: 'You should URL-encode data when including user input in query strings, sending form data via GET requests, passing values with special characters in API calls, constructing dynamic URLs, and working with non-ASCII characters like Chinese, Arabic, or emoji in URLs.',
    faq4q: 'Does this tool handle UTF-8 characters?',
    faq4a: 'Yes, this tool fully supports UTF-8 encoding. Non-ASCII characters like Chinese, Japanese, Korean, emoji, and other Unicode characters are properly encoded to their UTF-8 percent-encoded equivalents and can be decoded back correctly.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'URL 编码和解码器',
    description: '在线编码和解码 URL。将特殊字符转换为百分号编码格式。',
    inputLabel: '输入', inputPlaceholder: '输入 URL 或文本进行编码/解码...',
    outputLabel: '输出', encodeBtn: 'URL 编码', decodeBtn: 'URL 解码',
    encodeComponentBtn: '组件编码', decodeComponentBtn: '组件解码',
    clear: '清除', swap: '交换', loadSample: '加载示例',
    mode: '模式', fullUrl: '完整 URL (encodeURI)', component: '组件 (encodeURIComponent)',
    parseBtn: '解析 URL', parsedUrl: '解析的 URL 组件',
    protocol: '协议', host: '主机', pathname: '路径', search: '查询', hash: '哈希', params: '参数',
    introTitle: '免费在线 URL 编码解码器',
    introText: '使用百分号编码对 URL 中的特殊字符进行编码，或将编码后的字符串解码为可读文本。支持 encodeURI 和 encodeURIComponent 两种模式。',
    cheatTitle: '常见 URL 编码参考', ruleCol: '字符', descCol: '编码后', exampleCol: '用途',
    rule1: '空格', rule1Desc: '%20 或 +', rule1Ex: '查询字符串、表单数据',
    rule2: '&', rule2Desc: '%26', rule2Ex: '分隔查询参数',
    rule3: '=', rule3Desc: '%3D', rule3Ex: '键值对',
    rule4: '#', rule4Desc: '%23', rule4Ex: '片段标识符',
    rule5: '/', rule5Desc: '%2F', rule5Ex: '路径分隔符',
    faqTitle: '常见问题',
    faq1q: '什么是 URL 编码（百分号编码）？', faq1a: 'URL 编码用百分号加两个十六进制数字替换 URL 中不安全或保留的字符。例如空格变为 %20。',
    faq2q: 'encodeURI 和 encodeURIComponent 有什么区别？', faq2a: 'encodeURI 编码完整 URL 但保留 URL 特殊字符。encodeURIComponent 编码所有特殊字符，适合编码查询参数值。',
    faq3q: '什么时候需要 URL 编码？', faq3a: '在查询字符串中包含用户输入、发送 GET 请求表单数据、API 调用中传递特殊字符值时需要编码。',
    faq4q: '支持 UTF-8 字符吗？', faq4a: '是的，完全支持 UTF-8 编码，包括中文、日文、韩文和表情符号等。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Encodeur & Decodeur URL',
    description: 'Encodez et decodez les URLs en ligne. Convertissez les caracteres speciaux en format encode par pourcentage.',
    inputLabel: 'Entree', inputPlaceholder: 'Entrez une URL ou du texte a encoder/decoder...',
    outputLabel: 'Sortie', encodeBtn: 'Encoder URL', decodeBtn: 'Decoder URL',
    encodeComponentBtn: 'Encoder composant', decodeComponentBtn: 'Decoder composant',
    clear: 'Effacer', swap: 'Echanger', loadSample: 'Charger un exemple',
    mode: 'Mode', fullUrl: 'URL complete (encodeURI)', component: 'Composant (encodeURIComponent)',
    parseBtn: 'Analyser URL', parsedUrl: 'Composants URL analyses',
    protocol: 'Protocole', host: 'Hote', pathname: 'Chemin', search: 'Requete', hash: 'Hash', params: 'Parametres',
    introTitle: 'Encodeur & Decodeur URL gratuit', introText: 'Encodez les caracteres speciaux dans les URLs ou decodez les chaines encodees en pourcentage.',
    cheatTitle: 'Reference d\'encodage URL', ruleCol: 'Caractere', descCol: 'Encode', exampleCol: 'Usage',
    rule1: 'Espace', rule1Desc: '%20 ou +', rule1Ex: 'Requetes, formulaires',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Separateur parametres',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Paires cle-valeur',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Identifiants fragment',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Separateurs de chemin',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que l\'encodage URL ?', faq1a: 'L\'encodage URL remplace les caracteres non surs par un signe % suivi de deux chiffres hexadecimaux.',
    faq2q: 'Difference entre encodeURI et encodeURIComponent ?', faq2a: 'encodeURI preserve les caracteres speciaux d\'URL, encodeURIComponent encode tout.',
    faq3q: 'Quand encoder les donnees ?', faq3a: 'Pour les requetes, formulaires GET, appels API avec caracteres speciaux.',
    faq4q: 'Supporte UTF-8 ?', faq4a: 'Oui, tous les caracteres Unicode sont supportes.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'URL Encoder & Decoder',
    description: 'URLs online kodieren und dekodieren. Sonderzeichen in prozent-kodiertes Format konvertieren.',
    inputLabel: 'Eingabe', inputPlaceholder: 'URL oder Text zum Kodieren/Dekodieren eingeben...',
    outputLabel: 'Ausgabe', encodeBtn: 'URL kodieren', decodeBtn: 'URL dekodieren',
    encodeComponentBtn: 'Komponente kodieren', decodeComponentBtn: 'Komponente dekodieren',
    clear: 'Loeschen', swap: 'Tauschen', loadSample: 'Beispiel laden',
    mode: 'Modus', fullUrl: 'Volle URL (encodeURI)', component: 'Komponente (encodeURIComponent)',
    parseBtn: 'URL analysieren', parsedUrl: 'Analysierte URL-Komponenten',
    protocol: 'Protokoll', host: 'Host', pathname: 'Pfad', search: 'Abfrage', hash: 'Hash', params: 'Parameter',
    introTitle: 'Kostenloser URL Encoder & Decoder', introText: 'Sonderzeichen in URLs kodieren oder prozentkodierte Zeichenketten zurueckkonvertieren.',
    cheatTitle: 'URL-Kodierung Referenz', ruleCol: 'Zeichen', descCol: 'Kodiert', exampleCol: 'Verwendung',
    rule1: 'Leerzeichen', rule1Desc: '%20 oder +', rule1Ex: 'Abfragestrings, Formulardaten',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Parameter-Trennzeichen',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Schluessel-Wert-Paare',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Fragment-IDs',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Pfad-Trennzeichen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist URL-Kodierung?', faq1a: 'URL-Kodierung ersetzt unsichere Zeichen durch % gefolgt von zwei Hexadezimalziffern.',
    faq2q: 'Unterschied encodeURI vs encodeURIComponent?', faq2a: 'encodeURI bewahrt URL-Sonderzeichen, encodeURIComponent kodiert alles.',
    faq3q: 'Wann URL-kodieren?', faq3a: 'Bei Abfragestrings, GET-Formularen, API-Aufrufen mit Sonderzeichen.',
    faq4q: 'UTF-8 unterstuetzt?', faq4a: 'Ja, alle Unicode-Zeichen werden unterstuetzt.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Codificador y Decodificador URL',
    description: 'Codifique y decodifique URLs en linea. Convierta caracteres especiales a formato codificado por porcentaje.',
    inputLabel: 'Entrada', inputPlaceholder: 'Ingrese una URL o texto para codificar/decodificar...',
    outputLabel: 'Salida', encodeBtn: 'Codificar URL', decodeBtn: 'Decodificar URL',
    encodeComponentBtn: 'Codificar componente', decodeComponentBtn: 'Decodificar componente',
    clear: 'Limpiar', swap: 'Intercambiar', loadSample: 'Cargar ejemplo',
    mode: 'Modo', fullUrl: 'URL completa (encodeURI)', component: 'Componente (encodeURIComponent)',
    parseBtn: 'Analizar URL', parsedUrl: 'Componentes URL analizados',
    protocol: 'Protocolo', host: 'Host', pathname: 'Ruta', search: 'Consulta', hash: 'Hash', params: 'Parametros',
    introTitle: 'Codificador y Decodificador URL gratuito', introText: 'Codifique caracteres especiales en URLs o decodifique cadenas codificadas por porcentaje.',
    cheatTitle: 'Referencia codificacion URL', ruleCol: 'Caracter', descCol: 'Codificado', exampleCol: 'Uso',
    rule1: 'Espacio', rule1Desc: '%20 o +', rule1Ex: 'Cadenas de consulta',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Separador parametros',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Pares clave-valor',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Identificadores fragmento',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Separadores de ruta',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la codificacion URL?', faq1a: 'La codificacion URL reemplaza caracteres inseguros con % seguido de dos digitos hexadecimales.',
    faq2q: 'Diferencia entre encodeURI y encodeURIComponent?', faq2a: 'encodeURI preserva caracteres especiales de URL, encodeURIComponent codifica todo.',
    faq3q: 'Cuando codificar datos?', faq3a: 'Para consultas, formularios GET, llamadas API con caracteres especiales.',
    faq4q: 'Soporta UTF-8?', faq4a: 'Si, todos los caracteres Unicode son soportados.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'URL エンコーダー & デコーダー',
    description: 'URL をオンラインでエンコード・デコード。特殊文字をパーセントエンコード形式に変換。',
    inputLabel: '入力', inputPlaceholder: 'エンコード/デコードする URL またはテキストを入力...',
    outputLabel: '出力', encodeBtn: 'URL エンコード', decodeBtn: 'URL デコード',
    encodeComponentBtn: 'コンポーネントエンコード', decodeComponentBtn: 'コンポーネントデコード',
    clear: 'クリア', swap: '入れ替え', loadSample: 'サンプル読込',
    mode: 'モード', fullUrl: '完全 URL (encodeURI)', component: 'コンポーネント (encodeURIComponent)',
    parseBtn: 'URL 解析', parsedUrl: '解析された URL コンポーネント',
    protocol: 'プロトコル', host: 'ホスト', pathname: 'パス', search: 'クエリ', hash: 'ハッシュ', params: 'パラメータ',
    introTitle: '無料 URL エンコーダー & デコーダー', introText: 'URL の特殊文字をパーセントエンコードまたはデコード。encodeURI と encodeURIComponent の両方をサポート。',
    cheatTitle: 'URL エンコード参照', ruleCol: '文字', descCol: 'エンコード後', exampleCol: '用途',
    rule1: 'スペース', rule1Desc: '%20 または +', rule1Ex: 'クエリ文字列、フォームデータ',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'パラメータ区切り',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'キー値ペア',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'フラグメント識別子',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'パス区切り',
    faqTitle: 'よくある質問',
    faq1q: 'URL エンコードとは？', faq1a: 'URL エンコードは安全でない文字を % と2桁の16進数に置換します。',
    faq2q: 'encodeURI と encodeURIComponent の違いは？', faq2a: 'encodeURI は URL 特殊文字を保持し、encodeURIComponent はすべてをエンコードします。',
    faq3q: 'いつ URL エンコードが必要？', faq3a: 'クエリ文字列、GET フォーム、特殊文字を含む API 呼び出しの場合。',
    faq4q: 'UTF-8 をサポート？', faq4a: 'はい、すべての Unicode 文字をサポートしています。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'URL 인코더 & 디코더',
    description: 'URL을 온라인에서 인코딩 및 디코딩. 특수 문자를 퍼센트 인코딩 형식으로 변환.',
    inputLabel: '입력', inputPlaceholder: '인코딩/디코딩할 URL 또는 텍스트 입력...',
    outputLabel: '출력', encodeBtn: 'URL 인코딩', decodeBtn: 'URL 디코딩',
    encodeComponentBtn: '컴포넌트 인코딩', decodeComponentBtn: '컴포넌트 디코딩',
    clear: '지우기', swap: '교환', loadSample: '샘플 로드',
    mode: '모드', fullUrl: '전체 URL (encodeURI)', component: '컴포넌트 (encodeURIComponent)',
    parseBtn: 'URL 분석', parsedUrl: '분석된 URL 구성 요소',
    protocol: '프로토콜', host: '호스트', pathname: '경로', search: '쿼리', hash: '해시', params: '매개변수',
    introTitle: '무료 URL 인코더 & 디코더', introText: 'URL의 특수 문자를 퍼센트 인코딩하거나 디코딩합니다. encodeURI와 encodeURIComponent 모두 지원.',
    cheatTitle: 'URL 인코딩 참조', ruleCol: '문자', descCol: '인코딩됨', exampleCol: '용도',
    rule1: '공백', rule1Desc: '%20 또는 +', rule1Ex: '쿼리 문자열, 폼 데이터',
    rule2: '&', rule2Desc: '%26', rule2Ex: '매개변수 구분자',
    rule3: '=', rule3Desc: '%3D', rule3Ex: '키-값 쌍',
    rule4: '#', rule4Desc: '%23', rule4Ex: '프래그먼트 식별자',
    rule5: '/', rule5Desc: '%2F', rule5Ex: '경로 구분자',
    faqTitle: '자주 묻는 질문',
    faq1q: 'URL 인코딩이란?', faq1a: 'URL 인코딩은 안전하지 않은 문자를 %와 두 자리 16진수로 대체합니다.',
    faq2q: 'encodeURI와 encodeURIComponent의 차이점은?', faq2a: 'encodeURI는 URL 특수 문자를 보존하고, encodeURIComponent는 모든 것을 인코딩합니다.',
    faq3q: '언제 URL 인코딩이 필요한가요?', faq3a: '쿼리 문자열, GET 폼, 특수 문자가 포함된 API 호출 시 필요합니다.',
    faq4q: 'UTF-8을 지원하나요?', faq4a: '네, 모든 유니코드 문자를 지원합니다.',
    relatedTitle: '관련 도구',
  },
  pt: {
    title: 'Codificador e Decodificador URL',
    description: 'Codifique e decodifique URLs online. Converta caracteres especiais para formato codificado por porcentagem.',
    inputLabel: 'Entrada', inputPlaceholder: 'Insira uma URL ou texto para codificar/decodificar...',
    outputLabel: 'Saida', encodeBtn: 'Codificar URL', decodeBtn: 'Decodificar URL',
    encodeComponentBtn: 'Codificar componente', decodeComponentBtn: 'Decodificar componente',
    clear: 'Limpar', swap: 'Trocar', loadSample: 'Carregar exemplo',
    mode: 'Modo', fullUrl: 'URL completa (encodeURI)', component: 'Componente (encodeURIComponent)',
    parseBtn: 'Analisar URL', parsedUrl: 'Componentes URL analisados',
    protocol: 'Protocolo', host: 'Host', pathname: 'Caminho', search: 'Consulta', hash: 'Hash', params: 'Parametros',
    introTitle: 'Codificador e Decodificador URL gratis', introText: 'Codifique caracteres especiais em URLs ou decodifique strings codificadas por porcentagem.',
    cheatTitle: 'Referencia de codificacao URL', ruleCol: 'Caractere', descCol: 'Codificado', exampleCol: 'Uso',
    rule1: 'Espaco', rule1Desc: '%20 ou +', rule1Ex: 'Strings de consulta',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Separador parametros',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Pares chave-valor',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Identificadores fragmento',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Separadores de caminho',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e codificacao URL?', faq1a: 'A codificacao URL substitui caracteres inseguros por % seguido de dois digitos hexadecimais.',
    faq2q: 'Diferenca entre encodeURI e encodeURIComponent?', faq2a: 'encodeURI preserva caracteres especiais de URL, encodeURIComponent codifica tudo.',
    faq3q: 'Quando codificar dados?', faq3a: 'Para consultas, formularios GET, chamadas API com caracteres especiais.',
    faq4q: 'Suporta UTF-8?', faq4a: 'Sim, todos os caracteres Unicode sao suportados.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'URL Encoder & Decoder',
    description: 'URLs online coderen en decoderen. Speciale tekens converteren naar procent-gecodeerd formaat.',
    inputLabel: 'Invoer', inputPlaceholder: 'Voer een URL of tekst in om te coderen/decoderen...',
    outputLabel: 'Uitvoer', encodeBtn: 'URL coderen', decodeBtn: 'URL decoderen',
    encodeComponentBtn: 'Component coderen', decodeComponentBtn: 'Component decoderen',
    clear: 'Wissen', swap: 'Wisselen', loadSample: 'Voorbeeld laden',
    mode: 'Modus', fullUrl: 'Volledige URL (encodeURI)', component: 'Component (encodeURIComponent)',
    parseBtn: 'URL analyseren', parsedUrl: 'Geanalyseerde URL-componenten',
    protocol: 'Protocol', host: 'Host', pathname: 'Pad', search: 'Query', hash: 'Hash', params: 'Parameters',
    introTitle: 'Gratis URL Encoder & Decoder', introText: 'Codeer speciale tekens in URLs of decodeer procentgecodeerde strings.',
    cheatTitle: 'URL-codering referentie', ruleCol: 'Teken', descCol: 'Gecodeerd', exampleCol: 'Gebruik',
    rule1: 'Spatie', rule1Desc: '%20 of +', rule1Ex: 'Querystrings, formulierdata',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Parameter-scheiding',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Sleutel-waardeparen',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Fragment-ID\'s',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Pad-scheiding',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is URL-codering?', faq1a: 'URL-codering vervangt onveilige tekens door % gevolgd door twee hexadecimale cijfers.',
    faq2q: 'Verschil encodeURI vs encodeURIComponent?', faq2a: 'encodeURI behoudt URL-speciale tekens, encodeURIComponent codeert alles.',
    faq3q: 'Wanneer URL-coderen?', faq3a: 'Bij querystrings, GET-formulieren, API-aanroepen met speciale tekens.',
    faq4q: 'Ondersteunt UTF-8?', faq4a: 'Ja, alle Unicode-tekens worden ondersteund.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Koder i Dekoder URL',
    description: 'Koduj i dekoduj adresy URL online. Konwertuj znaki specjalne na format kodowany procentowo.',
    inputLabel: 'Wejscie', inputPlaceholder: 'Wpisz URL lub tekst do zakodowania/zdekodowania...',
    outputLabel: 'Wyjscie', encodeBtn: 'Koduj URL', decodeBtn: 'Dekoduj URL',
    encodeComponentBtn: 'Koduj komponent', decodeComponentBtn: 'Dekoduj komponent',
    clear: 'Wyczysc', swap: 'Zamien', loadSample: 'Zaladuj przyklad',
    mode: 'Tryb', fullUrl: 'Pelny URL (encodeURI)', component: 'Komponent (encodeURIComponent)',
    parseBtn: 'Analizuj URL', parsedUrl: 'Przeanalizowane komponenty URL',
    protocol: 'Protokol', host: 'Host', pathname: 'Sciezka', search: 'Zapytanie', hash: 'Hash', params: 'Parametry',
    introTitle: 'Darmowy koder i dekoder URL', introText: 'Koduj znaki specjalne w URL-ach lub dekoduj ciagi zakodowane procentowo.',
    cheatTitle: 'Referencja kodowania URL', ruleCol: 'Znak', descCol: 'Zakodowany', exampleCol: 'Uzycie',
    rule1: 'Spacja', rule1Desc: '%20 lub +', rule1Ex: 'Ciagi zapytan, dane formularza',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Separator parametrow',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Pary klucz-wartosc',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Identyfikatory fragmentow',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Separatory sciezki',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest kodowanie URL?', faq1a: 'Kodowanie URL zastepuje niebezpieczne znaki symbolem % i dwoma cyframi szesnastkowymi.',
    faq2q: 'Roznica encodeURI vs encodeURIComponent?', faq2a: 'encodeURI zachowuje specjalne znaki URL, encodeURIComponent koduje wszystko.',
    faq3q: 'Kiedy kodowac URL?', faq3a: 'Przy ciagach zapytan, formularzach GET, wywolaniach API ze znakami specjalnymi.',
    faq4q: 'Obsluguje UTF-8?', faq4a: 'Tak, obslugiwane sa wszystkie znaki Unicode.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'URL Encoder & Decoder',
    description: 'Koda och avkoda URL:er online. Konvertera specialtecken till procentkodat format.',
    inputLabel: 'Indata', inputPlaceholder: 'Ange en URL eller text att koda/avkoda...',
    outputLabel: 'Utdata', encodeBtn: 'Koda URL', decodeBtn: 'Avkoda URL',
    encodeComponentBtn: 'Koda komponent', decodeComponentBtn: 'Avkoda komponent',
    clear: 'Rensa', swap: 'Byt', loadSample: 'Ladda exempel',
    mode: 'Laege', fullUrl: 'Hel URL (encodeURI)', component: 'Komponent (encodeURIComponent)',
    parseBtn: 'Analysera URL', parsedUrl: 'Analyserade URL-komponenter',
    protocol: 'Protokoll', host: 'Vaerd', pathname: 'Soekvaeg', search: 'Foerfraagan', hash: 'Hash', params: 'Parametrar',
    introTitle: 'Gratis URL Encoder & Decoder', introText: 'Koda specialtecken i URL:er eller avkoda procentkodade straengar.',
    cheatTitle: 'URL-kodning referens', ruleCol: 'Tecken', descCol: 'Kodat', exampleCol: 'Anvaendning',
    rule1: 'Mellanslag', rule1Desc: '%20 eller +', rule1Ex: 'Querystrings, formulaerdata',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Parameteravgraensare',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Nyckel-vaerdepar',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Fragment-ID',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Soekvaegavgraensare',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer URL-kodning?', faq1a: 'URL-kodning ersaetter osaekra tecken med % foeljt av tvaa hexadecimala siffror.',
    faq2q: 'Skillnad encodeURI vs encodeURIComponent?', faq2a: 'encodeURI bevarar URL-specialtecken, encodeURIComponent kodar allt.',
    faq3q: 'Naer URL-koda?', faq3a: 'Vid querystrings, GET-formulaer, API-anrop med specialtecken.',
    faq4q: 'Stoeder UTF-8?', faq4a: 'Ja, alla Unicode-tecken stoeds.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'URL Encoder & Decoder',
    description: 'Kod og dekod URL-er online. Konverter spesialtegn til prosentkodert format.',
    inputLabel: 'Inndata', inputPlaceholder: 'Skriv inn en URL eller tekst for aa kode/dekode...',
    outputLabel: 'Utdata', encodeBtn: 'Kod URL', decodeBtn: 'Dekod URL',
    encodeComponentBtn: 'Kod komponent', decodeComponentBtn: 'Dekod komponent',
    clear: 'Toemme', swap: 'Bytt', loadSample: 'Last eksempel',
    mode: 'Modus', fullUrl: 'Full URL (encodeURI)', component: 'Komponent (encodeURIComponent)',
    parseBtn: 'Analyser URL', parsedUrl: 'Analyserte URL-komponenter',
    protocol: 'Protokoll', host: 'Vert', pathname: 'Sti', search: 'Spoerring', hash: 'Hash', params: 'Parametere',
    introTitle: 'Gratis URL Encoder & Decoder', introText: 'Kod spesialtegn i URL-er eller dekod prosentkodede strenger.',
    cheatTitle: 'URL-koding referanse', ruleCol: 'Tegn', descCol: 'Kodet', exampleCol: 'Bruk',
    rule1: 'Mellomrom', rule1Desc: '%20 eller +', rule1Ex: 'Querystrings, skjemadata',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Parameterskille',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Noekkel-verdipar',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Fragment-ID',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Stiskille',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Hva er URL-koding?', faq1a: 'URL-koding erstatter usikre tegn med % etterfulgt av to heksadesimale sifre.',
    faq2q: 'Forskjell encodeURI vs encodeURIComponent?', faq2a: 'encodeURI bevarer URL-spesialtegn, encodeURIComponent koder alt.',
    faq3q: 'Naar URL-kode?', faq3a: 'Ved querystrings, GET-skjemaer, API-kall med spesialtegn.',
    faq4q: 'Stoetter UTF-8?', faq4a: 'Ja, alle Unicode-tegn stoettes.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Encoder & Decoder URL',
    description: 'Encode dan decode URL online. Konversi karakter khusus ke format persen-encoded.',
    inputLabel: 'Input', inputPlaceholder: 'Masukkan URL atau teks untuk di-encode/decode...',
    outputLabel: 'Output', encodeBtn: 'Encode URL', decodeBtn: 'Decode URL',
    encodeComponentBtn: 'Encode Komponen', decodeComponentBtn: 'Decode Komponen',
    clear: 'Hapus', swap: 'Tukar', loadSample: 'Muat Contoh',
    mode: 'Mode', fullUrl: 'URL Lengkap (encodeURI)', component: 'Komponen (encodeURIComponent)',
    parseBtn: 'Parse URL', parsedUrl: 'Komponen URL yang Diparsing',
    protocol: 'Protokol', host: 'Host', pathname: 'Path', search: 'Query', hash: 'Hash', params: 'Parameter',
    introTitle: 'Encoder & Decoder URL Gratis', introText: 'Encode karakter khusus dalam URL atau decode string yang di-encode persen.',
    cheatTitle: 'Referensi Encoding URL', ruleCol: 'Karakter', descCol: 'Di-encode', exampleCol: 'Penggunaan',
    rule1: 'Spasi', rule1Desc: '%20 atau +', rule1Ex: 'Query string, data form',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Pemisah parameter',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Pasangan kunci-nilai',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Identifier fragmen',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Pemisah path',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apa itu encoding URL?', faq1a: 'Encoding URL mengganti karakter tidak aman dengan % diikuti dua digit heksadesimal.',
    faq2q: 'Perbedaan encodeURI vs encodeURIComponent?', faq2a: 'encodeURI mempertahankan karakter khusus URL, encodeURIComponent meng-encode semuanya.',
    faq3q: 'Kapan perlu encoding URL?', faq3a: 'Untuk query string, form GET, panggilan API dengan karakter khusus.',
    faq4q: 'Mendukung UTF-8?', faq4a: 'Ya, semua karakter Unicode didukung.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เข้ารหัสและถอดรหัส URL',
    description: 'เข้ารหัสและถอดรหัส URL ออนไลน์ แปลงอักขระพิเศษเป็นรูปแบบเปอร์เซ็นต์เข้ารหัส',
    inputLabel: 'นำเข้า', inputPlaceholder: 'ใส่ URL หรือข้อความเพื่อเข้ารหัส/ถอดรหัส...',
    outputLabel: 'ผลลัพธ์', encodeBtn: 'เข้ารหัส URL', decodeBtn: 'ถอดรหัส URL',
    encodeComponentBtn: 'เข้ารหัสคอมโพเนนต์', decodeComponentBtn: 'ถอดรหัสคอมโพเนนต์',
    clear: 'ล้าง', swap: 'สลับ', loadSample: 'โหลดตัวอย่าง',
    mode: 'โหมด', fullUrl: 'URL เต็ม (encodeURI)', component: 'คอมโพเนนต์ (encodeURIComponent)',
    parseBtn: 'วิเคราะห์ URL', parsedUrl: 'คอมโพเนนต์ URL ที่วิเคราะห์แล้ว',
    protocol: 'โปรโตคอล', host: 'โฮสต์', pathname: 'เส้นทาง', search: 'คิวรี', hash: 'แฮช', params: 'พารามิเตอร์',
    introTitle: 'เข้ารหัสและถอดรหัส URL ฟรี', introText: 'เข้ารหัสอักขระพิเศษใน URL หรือถอดรหัสสตริงที่เข้ารหัสเปอร์เซ็นต์',
    cheatTitle: 'อ้างอิงการเข้ารหัส URL', ruleCol: 'อักขระ', descCol: 'เข้ารหัสแล้ว', exampleCol: 'การใช้งาน',
    rule1: 'ช่องว่าง', rule1Desc: '%20 หรือ +', rule1Ex: 'คิวรีสตริง, ข้อมูลฟอร์ม',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'ตัวแยกพารามิเตอร์',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'คู่คีย์-ค่า',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'ตัวระบุแฟรกเมนต์',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'ตัวแยกเส้นทาง',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การเข้ารหัส URL คืออะไร?', faq1a: 'การเข้ารหัส URL แทนที่อักขระที่ไม่ปลอดภัยด้วย % ตามด้วยเลขฐานสิบหกสองหลัก',
    faq2q: 'ความแตกต่างระหว่าง encodeURI กับ encodeURIComponent?', faq2a: 'encodeURI เก็บอักขระพิเศษของ URL, encodeURIComponent เข้ารหัสทั้งหมด',
    faq3q: 'เมื่อใดควรเข้ารหัส URL?', faq3a: 'สำหรับคิวรีสตริง, ฟอร์ม GET, API call ที่มีอักขระพิเศษ',
    faq4q: 'รองรับ UTF-8 หรือไม่?', faq4a: 'ใช่ รองรับอักขระ Unicode ทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
  it: {
    title: 'Codificatore e Decodificatore URL',
    description: 'Codifica e decodifica URL online. Converti caratteri speciali in formato codificato percentuale.',
    inputLabel: 'Input', inputPlaceholder: 'Inserisci un URL o testo da codificare/decodificare...',
    outputLabel: 'Output', encodeBtn: 'Codifica URL', decodeBtn: 'Decodifica URL',
    encodeComponentBtn: 'Codifica componente', decodeComponentBtn: 'Decodifica componente',
    clear: 'Cancella', swap: 'Scambia', loadSample: 'Carica esempio',
    mode: 'Modalita', fullUrl: 'URL completo (encodeURI)', component: 'Componente (encodeURIComponent)',
    parseBtn: 'Analizza URL', parsedUrl: 'Componenti URL analizzati',
    protocol: 'Protocollo', host: 'Host', pathname: 'Percorso', search: 'Query', hash: 'Hash', params: 'Parametri',
    introTitle: 'Codificatore e Decodificatore URL gratuito', introText: 'Codifica caratteri speciali negli URL o decodifica stringhe codificate percentualmente.',
    cheatTitle: 'Riferimento codifica URL', ruleCol: 'Carattere', descCol: 'Codificato', exampleCol: 'Uso',
    rule1: 'Spazio', rule1Desc: '%20 o +', rule1Ex: 'Query string, dati form',
    rule2: '&', rule2Desc: '%26', rule2Ex: 'Separatore parametri',
    rule3: '=', rule3Desc: '%3D', rule3Ex: 'Coppie chiave-valore',
    rule4: '#', rule4Desc: '%23', rule4Ex: 'Identificatori frammento',
    rule5: '/', rule5Desc: '%2F', rule5Ex: 'Separatori percorso',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e la codifica URL?', faq1a: 'La codifica URL sostituisce i caratteri non sicuri con % seguito da due cifre esadecimali.',
    faq2q: 'Differenza encodeURI vs encodeURIComponent?', faq2a: 'encodeURI preserva i caratteri speciali URL, encodeURIComponent codifica tutto.',
    faq3q: 'Quando codificare?', faq3a: 'Per query string, form GET, chiamate API con caratteri speciali.',
    faq4q: 'Supporta UTF-8?', faq4a: 'Si, tutti i caratteri Unicode sono supportati.',
    relatedTitle: 'Strumenti correlati',
  },
};

const SAMPLE_URL = 'https://example.com/search?q=hello world&lang=en&tag=café&emoji=😀#results';

export default function UrlShortenerTool() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [parsedUrl, setParsedUrl] = useState<{ protocol: string; host: string; pathname: string; search: string; hash: string; params: [string, string][] } | null>(null);

  const handleEncode = useCallback(() => {
    if (!input.trim()) return;
    try { setOutput(encodeURI(input)); } catch { setOutput('Error: Invalid input for encodeURI'); }
  }, [input]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) return;
    try { setOutput(decodeURI(input)); } catch { setOutput('Error: Invalid encoded URI'); }
  }, [input]);

  const handleEncodeComponent = useCallback(() => {
    if (!input.trim()) return;
    try { setOutput(encodeURIComponent(input)); } catch { setOutput('Error: Invalid input'); }
  }, [input]);

  const handleDecodeComponent = useCallback(() => {
    if (!input.trim()) return;
    try { setOutput(decodeURIComponent(input)); } catch { setOutput('Error: Invalid encoded string'); }
  }, [input]);

  const handleParse = useCallback(() => {
    if (!input.trim()) return;
    try {
      const url = new URL(input);
      const params: [string, string][] = [];
      url.searchParams.forEach((value, key) => params.push([key, value]));
      setParsedUrl({
        protocol: url.protocol,
        host: url.host,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        params,
      });
    } catch {
      setParsedUrl(null);
    }
  }, [input]);

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="url-shortener-tool">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleEncode} className="btn btn-primary">{t.encodeBtn}</button>
        <button onClick={handleDecode} className="btn btn-primary">{t.decodeBtn}</button>
        <button onClick={handleEncodeComponent} className="btn btn-secondary">{t.encodeComponentBtn}</button>
        <button onClick={handleDecodeComponent} className="btn btn-secondary">{t.decodeComponentBtn}</button>
        <button onClick={handleParse} className="btn btn-secondary">{t.parseBtn}</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleSwap} className="btn btn-secondary">{t.swap}</button>
        <button onClick={() => { setInput(''); setOutput(''); setParsedUrl(null); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={() => { setInput(SAMPLE_URL); setOutput(''); setParsedUrl(null); }} className="btn btn-secondary">{t.loadSample}</button>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea value={output} readOnly style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* Parsed URL */}
      {parsedUrl && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.parsedUrl}</h3>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 13 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px 12px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t.protocol}:</span>
              <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{parsedUrl.protocol}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t.host}:</span>
              <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{parsedUrl.host}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t.pathname}:</span>
              <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{parsedUrl.pathname}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t.search}:</span>
              <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{parsedUrl.search || '(none)'}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t.hash}:</span>
              <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{parsedUrl.hash || '(none)'}</span>
            </div>
            {parsedUrl.params.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{t.params}:</div>
                {parsedUrl.params.map(([key, value], i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', fontFamily: 'monospace', fontSize: 12 }}>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{key}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>=</span>
                    <span style={{ wordBreak: 'break-all' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.ruleCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.exampleCol}</th>
              </tr>
            </thead>
            <tbody>
              {[[t.rule1, t.rule1Desc, t.rule1Ex], [t.rule2, t.rule2Desc, t.rule2Ex], [t.rule3, t.rule3Desc, t.rule3Ex], [t.rule4, t.rule4Desc, t.rule4Ex], [t.rule5, t.rule5Desc, t.rule5Ex]].map(([r, d, e], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{r}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{d}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/url-encoder-decoder`, label: 'URL Encoder/Decoder' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/escape-unescape`, label: 'Escape/Unescape' },
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
