'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'String to Base64 Converter',
    description: 'Convert any string to Base64 encoding with full UTF-8 support. Get both standard Base64 and URL-safe Base64 output simultaneously.',
    inputLabel: 'Input String',
    outputStandard: 'Standard Base64',
    outputUrlSafe: 'URL-Safe Base64',
    inputPlaceholder: 'Enter any string (supports UTF-8, emojis, CJK characters)...',
    encode: 'Encode',
    clear: 'Clear',
    intro: 'Convert any string to base64 encoding with full UTF-8 support. This string to base64 converter handles multi-byte characters including CJK (Chinese, Japanese, Korean), emojis, accented characters, and all Unicode text. Get both standard and URL-safe base64 output. URL-safe Base64 replaces + with -, / with _, and removes = padding for safe use in URLs and file names.',
    cheatTitle: 'UTF-8 Encoding in Base64',
    cheatDesc: 'When converting strings to Base64, the text is first encoded as UTF-8 bytes, then those bytes are encoded to Base64. Multi-byte characters produce longer Base64 output.',
    colChar: 'Character',
    colUtf8Bytes: 'UTF-8 Bytes',
    colBase64: 'Base64',
    colLength: 'B64 Length',
    standardLabel: 'Standard',
    urlSafeLabel: 'URL-Safe',
    diffTitle: 'Standard vs URL-Safe Base64',
    diffStdChars: 'Uses + / =',
    diffUrlChars: 'Uses - _ (no padding)',
    diffStdUse: 'MIME, email, general encoding',
    diffUrlUse: 'URLs, file names, JWT tokens',
    faq1q: 'How does UTF-8 affect Base64 encoding?',
    faq1a: 'UTF-8 is a variable-length encoding: ASCII characters use 1 byte, accented characters use 2 bytes, CJK characters use 3 bytes, and emojis use 4 bytes. This means the same number of characters can produce very different Base64 output lengths. For example, "Hello" (5 ASCII chars = 5 bytes) encodes to 8 Base64 characters, while 5 Chinese characters (15 bytes) encode to 20 Base64 characters.',
    faq2q: 'What is URL-safe Base64?',
    faq2a: 'URL-safe Base64 (also called base64url) modifies the standard Base64 alphabet to be safe for use in URLs and filenames. It replaces + with - (hyphen), / with _ (underscore), and removes the = padding characters. This variant is defined in RFC 4648 Section 5 and is commonly used in JWT (JSON Web Tokens), OAuth, and URL parameters.',
    faq3q: 'How do different programming languages encode strings to Base64?',
    faq3a: 'In JavaScript, use btoa(unescape(encodeURIComponent(str))) for UTF-8 support. In Python, use base64.b64encode(str.encode("utf-8")). In Java, use Base64.getEncoder().encodeToString(str.getBytes(StandardCharsets.UTF_8)). In Go, use base64.StdEncoding.EncodeToString([]byte(str)). All these methods first convert the string to UTF-8 bytes, then encode those bytes to Base64.',
    crossLinks: 'Related Base64 Tools',
    errorMsg: 'Encoding error. Please check your input.',
    charCount: 'characters',
    byteCount: 'bytes',
    b64Chars: 'B64 chars',
  },
  zh: {
    title: '字符串转 Base64 转换器',
    description: '将任何字符串转换为 Base64 编码，完整支持 UTF-8。同时输出标准和 URL 安全的 Base64。',
    inputLabel: '输入字符串',
    outputStandard: '标准 Base64',
    outputUrlSafe: 'URL 安全 Base64',
    inputPlaceholder: '输入任何字符串（支持 UTF-8、表情符号、中日韩字符）...',
    encode: '编码',
    clear: '清除',
    intro: '将任何字符串转换为 base64 编码，完整支持 UTF-8。此字符串转 base64 转换器处理多字节字符，包括中日韩文字、表情符号和所有 Unicode 文本。同时获取标准和 URL 安全的 base64 输出。',
    cheatTitle: 'Base64 中的 UTF-8 编码',
    cheatDesc: '将字符串转换为 Base64 时，文本首先编码为 UTF-8 字节，然后将这些字节编码为 Base64。多字节字符会产生更长的 Base64 输出。',
    colChar: '字符', colUtf8Bytes: 'UTF-8 字节', colBase64: 'Base64', colLength: 'B64 长度',
    standardLabel: '标准', urlSafeLabel: 'URL 安全',
    diffTitle: '标准 vs URL 安全 Base64',
    diffStdChars: '使用 + / =', diffUrlChars: '使用 - _（无填充）',
    diffStdUse: 'MIME、邮件、通用编码', diffUrlUse: 'URL、文件名、JWT 令牌',
    faq1q: 'UTF-8 如何影响 Base64 编码？',
    faq1a: 'UTF-8 是可变长度编码：ASCII 字符使用 1 字节，重音字符使用 2 字节，中日韩字符使用 3 字节，表情符号使用 4 字节。因此相同数量的字符可能产生截然不同的 Base64 输出长度。',
    faq2q: '什么是 URL 安全 Base64？',
    faq2a: 'URL 安全 Base64（也称 base64url）修改了标准 Base64 字母表，将 + 替换为 -，/ 替换为 _，并去除 = 填充。常用于 JWT、OAuth 和 URL 参数中。',
    faq3q: '不同编程语言如何编码字符串为 Base64？',
    faq3a: 'JavaScript 使用 btoa(unescape(encodeURIComponent(str)))，Python 使用 base64.b64encode(str.encode("utf-8"))，Java 使用 Base64.getEncoder().encodeToString()。所有方法都先将字符串转为 UTF-8 字节再编码。',
    crossLinks: '相关 Base64 工具',
    errorMsg: '编码错误，请检查输入。',
    charCount: '字符', byteCount: '字节', b64Chars: 'B64 字符',
  },
  fr: { title: 'Convertisseur String en Base64', description: 'Convertissez des chaines en Base64 avec support UTF-8.', inputLabel: 'Chaine d\'entree', outputStandard: 'Base64 standard', outputUrlSafe: 'Base64 URL-safe', inputPlaceholder: 'Entrez une chaine...', encode: 'Encoder', clear: 'Effacer', intro: 'Convertissez n\'importe quelle chaine en encodage base64 avec support UTF-8 complet. Obtenez les sorties Base64 standard et URL-safe.', cheatTitle: 'Encodage UTF-8 en Base64', cheatDesc: 'Le texte est d\'abord encode en UTF-8, puis ces octets sont encodes en Base64.', colChar: 'Caractere', colUtf8Bytes: 'Octets UTF-8', colBase64: 'Base64', colLength: 'Longueur B64', standardLabel: 'Standard', urlSafeLabel: 'URL-safe', diffTitle: 'Standard vs URL-safe Base64', diffStdChars: 'Utilise + / =', diffUrlChars: 'Utilise - _ (sans remplissage)', diffStdUse: 'MIME, email, encodage general', diffUrlUse: 'URL, noms de fichiers, JWT', faq1q: 'Comment UTF-8 affecte-t-il l\'encodage Base64 ?', faq1a: 'UTF-8 est un encodage de longueur variable. Les caracteres multi-octets produisent des sorties Base64 plus longues.', faq2q: 'Qu\'est-ce que le Base64 URL-safe ?', faq2a: 'Le Base64 URL-safe remplace + par -, / par _ et supprime le remplissage =. Utilise dans JWT et URL.', faq3q: 'Comment encoder des chaines en Base64 dans differents langages ?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Outils Base64 associes', errorMsg: 'Erreur d\'encodage.', charCount: 'caracteres', byteCount: 'octets', b64Chars: 'caracteres B64' },
  de: { title: 'String zu Base64 Konverter', description: 'Strings mit UTF-8-Unterstutzung in Base64 konvertieren.', inputLabel: 'Eingabe-String', outputStandard: 'Standard Base64', outputUrlSafe: 'URL-sicheres Base64', inputPlaceholder: 'String eingeben...', encode: 'Kodieren', clear: 'Loschen', intro: 'Konvertieren Sie beliebige Strings mit UTF-8-Unterstutzung in Base64. Standard und URL-sicheres Base64.', cheatTitle: 'UTF-8 Kodierung in Base64', cheatDesc: 'Text wird zuerst als UTF-8 kodiert, dann werden die Bytes in Base64 kodiert.', colChar: 'Zeichen', colUtf8Bytes: 'UTF-8 Bytes', colBase64: 'Base64', colLength: 'B64 Lange', standardLabel: 'Standard', urlSafeLabel: 'URL-sicher', diffTitle: 'Standard vs URL-sicheres Base64', diffStdChars: 'Nutzt + / =', diffUrlChars: 'Nutzt - _ (ohne Padding)', diffStdUse: 'MIME, E-Mail, allgemeine Kodierung', diffUrlUse: 'URLs, Dateinamen, JWT', faq1q: 'Wie beeinflusst UTF-8 die Base64-Kodierung?', faq1a: 'UTF-8 ist eine Kodierung mit variabler Lange. Multi-Byte-Zeichen erzeugen langere Base64-Ausgaben.', faq2q: 'Was ist URL-sicheres Base64?', faq2a: 'URL-sicheres Base64 ersetzt + durch -, / durch _ und entfernt = Padding.', faq3q: 'Wie kodieren verschiedene Programmiersprachen Strings zu Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Verwandte Base64 Tools', errorMsg: 'Kodierungsfehler.', charCount: 'Zeichen', byteCount: 'Bytes', b64Chars: 'B64 Zeichen' },
  es: { title: 'Convertidor String a Base64', description: 'Convierte cadenas a Base64 con soporte UTF-8.', inputLabel: 'Cadena de entrada', outputStandard: 'Base64 estandar', outputUrlSafe: 'Base64 URL-safe', inputPlaceholder: 'Ingresa una cadena...', encode: 'Codificar', clear: 'Limpiar', intro: 'Convierte cualquier cadena a codificacion base64 con soporte UTF-8 completo. Salida Base64 estandar y URL-safe.', cheatTitle: 'Codificacion UTF-8 en Base64', cheatDesc: 'El texto se codifica primero como UTF-8, luego esos bytes se codifican a Base64.', colChar: 'Caracter', colUtf8Bytes: 'Bytes UTF-8', colBase64: 'Base64', colLength: 'Longitud B64', standardLabel: 'Estandar', urlSafeLabel: 'URL-safe', diffTitle: 'Base64 Estandar vs URL-safe', diffStdChars: 'Usa + / =', diffUrlChars: 'Usa - _ (sin relleno)', diffStdUse: 'MIME, email, codificacion general', diffUrlUse: 'URLs, nombres de archivo, JWT', faq1q: 'Como afecta UTF-8 la codificacion Base64?', faq1a: 'UTF-8 es de longitud variable. Los caracteres multi-byte producen salidas Base64 mas largas.', faq2q: 'Que es Base64 URL-safe?', faq2a: 'Base64 URL-safe reemplaza + con -, / con _ y elimina el relleno =.', faq3q: 'Como codifican diferentes lenguajes cadenas a Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Herramientas Base64 relacionadas', errorMsg: 'Error de codificacion.', charCount: 'caracteres', byteCount: 'bytes', b64Chars: 'caracteres B64' },
  ja: { title: '文字列 Base64 変換', description: 'UTF-8対応で文字列をBase64に変換。', inputLabel: '入力文字列', outputStandard: '標準 Base64', outputUrlSafe: 'URLセーフ Base64', inputPlaceholder: '文字列を入力（UTF-8、絵文字、CJK対応）...', encode: 'エンコード', clear: 'クリア', intro: 'UTF-8完全対応で任意の文字列をbase64エンコーディングに変換。標準とURLセーフのbase64出力を同時に取得。', cheatTitle: 'Base64のUTF-8エンコーディング', cheatDesc: 'テキストはまずUTF-8バイトにエンコードされ、そのバイトがBase64にエンコードされます。', colChar: '文字', colUtf8Bytes: 'UTF-8バイト', colBase64: 'Base64', colLength: 'B64長さ', standardLabel: '標準', urlSafeLabel: 'URLセーフ', diffTitle: '標準 vs URLセーフ Base64', diffStdChars: '+ / = を使用', diffUrlChars: '- _ を使用（パディングなし）', diffStdUse: 'MIME、メール、一般的なエンコーディング', diffUrlUse: 'URL、ファイル名、JWTトークン', faq1q: 'UTF-8はBase64エンコーディングにどう影響する？', faq1a: 'UTF-8は可変長エンコーディングです。マルチバイト文字はより長いBase64出力を生成します。', faq2q: 'URLセーフBase64とは？', faq2a: 'URLセーフBase64は+を-に、/を_に置き換え、=パディングを削除します。', faq3q: '異なるプログラミング言語でBase64にエンコードするには？', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str)))。Python: base64.b64encode(str.encode("utf-8"))。', crossLinks: '関連Base64ツール', errorMsg: 'エンコードエラー。', charCount: '文字', byteCount: 'バイト', b64Chars: 'B64文字' },
  ko: { title: '문자열 Base64 변환기', description: 'UTF-8 지원으로 문자열을 Base64로 변환합니다.', inputLabel: '입력 문자열', outputStandard: '표준 Base64', outputUrlSafe: 'URL 안전 Base64', inputPlaceholder: '문자열 입력 (UTF-8, 이모지, CJK 지원)...', encode: '인코딩', clear: '지우기', intro: 'UTF-8을 완전 지원하여 모든 문자열을 base64 인코딩으로 변환하세요. 표준 및 URL 안전 base64 출력을 동시에 제공합니다.', cheatTitle: 'Base64의 UTF-8 인코딩', cheatDesc: '텍스트는 먼저 UTF-8 바이트로 인코딩된 후 Base64로 인코딩됩니다.', colChar: '문자', colUtf8Bytes: 'UTF-8 바이트', colBase64: 'Base64', colLength: 'B64 길이', standardLabel: '표준', urlSafeLabel: 'URL 안전', diffTitle: '표준 vs URL 안전 Base64', diffStdChars: '+ / = 사용', diffUrlChars: '- _ 사용 (패딩 없음)', diffStdUse: 'MIME, 이메일, 일반 인코딩', diffUrlUse: 'URL, 파일명, JWT 토큰', faq1q: 'UTF-8이 Base64 인코딩에 어떤 영향을 미치나요?', faq1a: 'UTF-8은 가변 길이 인코딩입니다. 멀티바이트 문자는 더 긴 Base64 출력을 생성합니다.', faq2q: 'URL 안전 Base64란?', faq2a: 'URL 안전 Base64는 +를 -로, /를 _로 대체하고 = 패딩을 제거합니다.', faq3q: '다른 프로그래밍 언어에서 Base64로 인코딩하는 방법은?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: '관련 Base64 도구', errorMsg: '인코딩 오류.', charCount: '문자', byteCount: '바이트', b64Chars: 'B64 문자' },
  it: { title: 'Convertitore Stringa Base64', description: 'Converti stringhe in Base64 con supporto UTF-8.', inputLabel: 'Stringa di input', outputStandard: 'Base64 standard', outputUrlSafe: 'Base64 URL-safe', inputPlaceholder: 'Inserisci una stringa...', encode: 'Codifica', clear: 'Cancella', intro: 'Converti qualsiasi stringa in codifica base64 con supporto UTF-8 completo. Output Base64 standard e URL-safe.', cheatTitle: 'Codifica UTF-8 in Base64', cheatDesc: 'Il testo viene prima codificato in UTF-8, poi quei byte vengono codificati in Base64.', colChar: 'Carattere', colUtf8Bytes: 'Byte UTF-8', colBase64: 'Base64', colLength: 'Lunghezza B64', standardLabel: 'Standard', urlSafeLabel: 'URL-safe', diffTitle: 'Standard vs URL-safe Base64', diffStdChars: 'Usa + / =', diffUrlChars: 'Usa - _ (senza padding)', diffStdUse: 'MIME, email, codifica generale', diffUrlUse: 'URL, nomi file, JWT', faq1q: 'Come influisce UTF-8 sulla codifica Base64?', faq1a: 'UTF-8 e a lunghezza variabile. I caratteri multi-byte producono output Base64 piu lunghi.', faq2q: 'Cos\'e il Base64 URL-safe?', faq2a: 'Base64 URL-safe sostituisce + con -, / con _ e rimuove il padding =.', faq3q: 'Come codificano le stringhe in Base64 i diversi linguaggi?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Strumenti Base64 correlati', errorMsg: 'Errore di codifica.', charCount: 'caratteri', byteCount: 'byte', b64Chars: 'caratteri B64' },
  pt: { title: 'Conversor String para Base64', description: 'Converta strings para Base64 com suporte UTF-8.', inputLabel: 'String de entrada', outputStandard: 'Base64 padrao', outputUrlSafe: 'Base64 URL-safe', inputPlaceholder: 'Digite uma string...', encode: 'Codificar', clear: 'Limpar', intro: 'Converta qualquer string para codificacao base64 com suporte UTF-8 completo. Saida Base64 padrao e URL-safe.', cheatTitle: 'Codificacao UTF-8 em Base64', cheatDesc: 'O texto e primeiro codificado em UTF-8, depois esses bytes sao codificados em Base64.', colChar: 'Caractere', colUtf8Bytes: 'Bytes UTF-8', colBase64: 'Base64', colLength: 'Comprimento B64', standardLabel: 'Padrao', urlSafeLabel: 'URL-safe', diffTitle: 'Base64 Padrao vs URL-safe', diffStdChars: 'Usa + / =', diffUrlChars: 'Usa - _ (sem padding)', diffStdUse: 'MIME, email, codificacao geral', diffUrlUse: 'URLs, nomes de arquivo, JWT', faq1q: 'Como o UTF-8 afeta a codificacao Base64?', faq1a: 'UTF-8 e de comprimento variavel. Caracteres multi-byte produzem saidas Base64 mais longas.', faq2q: 'O que e Base64 URL-safe?', faq2a: 'Base64 URL-safe substitui + por -, / por _ e remove o padding =.', faq3q: 'Como diferentes linguagens codificam strings em Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Ferramentas Base64 relacionadas', errorMsg: 'Erro de codificacao.', charCount: 'caracteres', byteCount: 'bytes', b64Chars: 'caracteres B64' },
  nl: { title: 'String naar Base64 Converter', description: 'Converteer strings naar Base64 met UTF-8-ondersteuning.', inputLabel: 'Invoerstring', outputStandard: 'Standaard Base64', outputUrlSafe: 'URL-veilig Base64', inputPlaceholder: 'Voer een string in...', encode: 'Coderen', clear: 'Wissen', intro: 'Converteer strings naar base64-codering met volledige UTF-8-ondersteuning.', cheatTitle: 'UTF-8 codering in Base64', cheatDesc: 'Tekst wordt eerst als UTF-8 gecodeerd, daarna worden die bytes naar Base64 gecodeerd.', colChar: 'Teken', colUtf8Bytes: 'UTF-8 bytes', colBase64: 'Base64', colLength: 'B64 lengte', standardLabel: 'Standaard', urlSafeLabel: 'URL-veilig', diffTitle: 'Standaard vs URL-veilig Base64', diffStdChars: 'Gebruikt + / =', diffUrlChars: 'Gebruikt - _ (geen padding)', diffStdUse: 'MIME, e-mail, algemene codering', diffUrlUse: 'URLs, bestandsnamen, JWT', faq1q: 'Hoe beinvloedt UTF-8 Base64-codering?', faq1a: 'UTF-8 is variabele lengte. Multi-byte tekens produceren langere Base64-uitvoer.', faq2q: 'Wat is URL-veilig Base64?', faq2a: 'URL-veilig Base64 vervangt + door -, / door _ en verwijdert = padding.', faq3q: 'Hoe coderen verschillende talen strings naar Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Gerelateerde Base64 tools', errorMsg: 'Coderingsfout.', charCount: 'tekens', byteCount: 'bytes', b64Chars: 'B64 tekens' },
  pl: { title: 'Konwerter String na Base64', description: 'Konwertuj ciagi na Base64 z obsluga UTF-8.', inputLabel: 'Ciag wejsciowy', outputStandard: 'Standardowy Base64', outputUrlSafe: 'URL-safe Base64', inputPlaceholder: 'Wprowadz ciag znakow...', encode: 'Koduj', clear: 'Wyczysc', intro: 'Konwertuj dowolny ciag na kodowanie base64 z pelna obsluga UTF-8.', cheatTitle: 'Kodowanie UTF-8 w Base64', cheatDesc: 'Tekst jest najpierw kodowany jako UTF-8, a te bajty sa kodowane do Base64.', colChar: 'Znak', colUtf8Bytes: 'Bajty UTF-8', colBase64: 'Base64', colLength: 'Dlugosc B64', standardLabel: 'Standardowy', urlSafeLabel: 'URL-safe', diffTitle: 'Standardowy vs URL-safe Base64', diffStdChars: 'Uzywa + / =', diffUrlChars: 'Uzywa - _ (bez paddingu)', diffStdUse: 'MIME, email, kodowanie ogolne', diffUrlUse: 'URL, nazwy plikow, JWT', faq1q: 'Jak UTF-8 wplywa na kodowanie Base64?', faq1a: 'UTF-8 ma zmienna dlugosc. Znaki wielobajtowe tworza dluzsze wyjscia Base64.', faq2q: 'Czym jest URL-safe Base64?', faq2a: 'URL-safe Base64 zastepuje + przez -, / przez _ i usuwa padding =.', faq3q: 'Jak rozne jezyki programowania koduja ciagi do Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Powiazane narzedzia Base64', errorMsg: 'Blad kodowania.', charCount: 'znakow', byteCount: 'bajtow', b64Chars: 'znakow B64' },
  sv: { title: 'String till Base64 Konverterare', description: 'Konvertera strangar till Base64 med UTF-8-stod.', inputLabel: 'Inmatningsstrang', outputStandard: 'Standard Base64', outputUrlSafe: 'URL-saker Base64', inputPlaceholder: 'Ange en strang...', encode: 'Koda', clear: 'Rensa', intro: 'Konvertera strangar till base64 med fullt UTF-8-stod.', cheatTitle: 'UTF-8 kodning i Base64', cheatDesc: 'Text kodas forst som UTF-8, sedan kodas dessa bytes till Base64.', colChar: 'Tecken', colUtf8Bytes: 'UTF-8 bytes', colBase64: 'Base64', colLength: 'B64 langd', standardLabel: 'Standard', urlSafeLabel: 'URL-saker', diffTitle: 'Standard vs URL-saker Base64', diffStdChars: 'Anvander + / =', diffUrlChars: 'Anvander - _ (ingen padding)', diffStdUse: 'MIME, e-post, allman kodning', diffUrlUse: 'URL, filnamn, JWT', faq1q: 'Hur paverkar UTF-8 Base64-kodning?', faq1a: 'UTF-8 ar variabel langd. Multi-byte-tecken producerar langre Base64-utdata.', faq2q: 'Vad ar URL-saker Base64?', faq2a: 'URL-saker Base64 ersatter + med -, / med _ och tar bort = padding.', faq3q: 'Hur kodar olika programmeringssprak strangar till Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Relaterade Base64-verktyg', errorMsg: 'Kodningsfel.', charCount: 'tecken', byteCount: 'bytes', b64Chars: 'B64 tecken' },
  no: { title: 'String til Base64 Konverter', description: 'Konverter strenger til Base64 med UTF-8-stotte.', inputLabel: 'Inngangsstreng', outputStandard: 'Standard Base64', outputUrlSafe: 'URL-sikker Base64', inputPlaceholder: 'Skriv inn en streng...', encode: 'Kod', clear: 'Slett', intro: 'Konverter strenger til base64 med full UTF-8-stotte.', cheatTitle: 'UTF-8 koding i Base64', cheatDesc: 'Tekst kodes forst som UTF-8, deretter kodes disse bytene til Base64.', colChar: 'Tegn', colUtf8Bytes: 'UTF-8 bytes', colBase64: 'Base64', colLength: 'B64 lengde', standardLabel: 'Standard', urlSafeLabel: 'URL-sikker', diffTitle: 'Standard vs URL-sikker Base64', diffStdChars: 'Bruker + / =', diffUrlChars: 'Bruker - _ (uten padding)', diffStdUse: 'MIME, e-post, generell koding', diffUrlUse: 'URL, filnavn, JWT', faq1q: 'Hvordan pavirker UTF-8 Base64-koding?', faq1a: 'UTF-8 har variabel lengde. Multi-byte-tegn produserer lengre Base64-utdata.', faq2q: 'Hva er URL-sikker Base64?', faq2a: 'URL-sikker Base64 erstatter + med -, / med _ og fjerner = padding.', faq3q: 'Hvordan koder forskjellige programmeringssprak strenger til Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Relaterte Base64-verktoy', errorMsg: 'Kodingsfeil.', charCount: 'tegn', byteCount: 'bytes', b64Chars: 'B64 tegn' },
  id: { title: 'Konverter String ke Base64', description: 'Konversi string ke Base64 dengan dukungan UTF-8.', inputLabel: 'String input', outputStandard: 'Base64 standar', outputUrlSafe: 'Base64 URL-safe', inputPlaceholder: 'Masukkan string...', encode: 'Encode', clear: 'Hapus', intro: 'Konversi string ke encoding base64 dengan dukungan UTF-8 penuh.', cheatTitle: 'Encoding UTF-8 di Base64', cheatDesc: 'Teks pertama di-encode sebagai UTF-8, lalu byte tersebut di-encode ke Base64.', colChar: 'Karakter', colUtf8Bytes: 'Byte UTF-8', colBase64: 'Base64', colLength: 'Panjang B64', standardLabel: 'Standar', urlSafeLabel: 'URL-safe', diffTitle: 'Base64 Standar vs URL-safe', diffStdChars: 'Menggunakan + / =', diffUrlChars: 'Menggunakan - _ (tanpa padding)', diffStdUse: 'MIME, email, encoding umum', diffUrlUse: 'URL, nama file, JWT', faq1q: 'Bagaimana UTF-8 mempengaruhi encoding Base64?', faq1a: 'UTF-8 memiliki panjang variabel. Karakter multi-byte menghasilkan output Base64 lebih panjang.', faq2q: 'Apa itu Base64 URL-safe?', faq2a: 'Base64 URL-safe mengganti + dengan -, / dengan _ dan menghapus padding =.', faq3q: 'Bagaimana bahasa pemrograman berbeda meng-encode string ke Base64?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))). Python: base64.b64encode(str.encode("utf-8")).', crossLinks: 'Alat Base64 terkait', errorMsg: 'Error encoding.', charCount: 'karakter', byteCount: 'byte', b64Chars: 'karakter B64' },
  th: { title: 'ตัวแปลง String เป็น Base64', description: 'แปลงสตริงเป็น Base64 พร้อมรองรับ UTF-8', inputLabel: 'สตริงอินพุต', outputStandard: 'Base64 มาตรฐาน', outputUrlSafe: 'Base64 URL-safe', inputPlaceholder: 'ป้อนสตริง...', encode: 'เข้ารหัส', clear: 'ล้าง', intro: 'แปลงสตริงใดก็ได้เป็นการเข้ารหัส base64 พร้อมรองรับ UTF-8 เต็มรูปแบบ', cheatTitle: 'การเข้ารหัส UTF-8 ใน Base64', cheatDesc: 'ข้อความจะถูกเข้ารหัสเป็น UTF-8 ก่อน จากนั้นไบต์เหล่านั้นจะถูกเข้ารหัสเป็น Base64', colChar: 'อักขระ', colUtf8Bytes: 'ไบต์ UTF-8', colBase64: 'Base64', colLength: 'ความยาว B64', standardLabel: 'มาตรฐาน', urlSafeLabel: 'URL-safe', diffTitle: 'Base64 มาตรฐาน vs URL-safe', diffStdChars: 'ใช้ + / =', diffUrlChars: 'ใช้ - _ (ไม่มี padding)', diffStdUse: 'MIME, อีเมล, การเข้ารหัสทั่วไป', diffUrlUse: 'URL, ชื่อไฟล์, JWT', faq1q: 'UTF-8 มีผลต่อการเข้ารหัส Base64 อย่างไร?', faq1a: 'UTF-8 มีความยาวแปรผัน อักขระหลายไบต์สร้างเอาต์พุต Base64 ที่ยาวกว่า', faq2q: 'Base64 URL-safe คืออะไร?', faq2a: 'Base64 URL-safe แทนที่ + ด้วย - และ / ด้วย _ และลบ padding =', faq3q: 'ภาษาโปรแกรมต่างๆ เข้ารหัสสตริงเป็น Base64 อย่างไร?', faq3a: 'JavaScript: btoa(unescape(encodeURIComponent(str))) Python: base64.b64encode(str.encode("utf-8"))', crossLinks: 'เครื่องมือ Base64 ที่เกี่ยวข้อง', errorMsg: 'ข้อผิดพลาดในการเข้ารหัส', charCount: 'อักขระ', byteCount: 'ไบต์', b64Chars: 'อักขระ B64' },
};

const utf8Examples = [
  { char: 'A', utf8: '1 byte (0x41)', base64: 'QQ==', len: 4 },
  { char: 'e', utf8: '2 bytes (0xC3 0xA9)', base64: 'w6k=', len: 4 },
  { char: '\u4e16', utf8: '3 bytes (0xE4 0xB8 0x96)', base64: '5LiW', len: 4 },
  { char: '\uD83D\uDE00', utf8: '4 bytes (0xF0 0x9F 0x98 0x80)', base64: '8J+YgA==', len: 8 },
];

export default function StringToBase64Page() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [standardOutput, setStandardOutput] = useState('');
  const [urlSafeOutput, setUrlSafeOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setError('');
      if (!input) { setStandardOutput(''); setUrlSafeOutput(''); return; }
      const standard = btoa(unescape(encodeURIComponent(input)));
      setStandardOutput(standard);
      // URL-safe: replace + with -, / with _, remove = padding
      const urlSafe = standard.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      setUrlSafeOutput(urlSafe);
    } catch {
      setError(ui.errorMsg);
      setStandardOutput('');
      setUrlSafeOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setStandardOutput('');
    setUrlSafeOutput('');
    setError('');
  };

  const inputBytes = new TextEncoder().encode(input).length;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
      { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
      { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
    ],
  };

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="string-to-base64">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Tool UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleEncode} className="btn btn-primary">{ui.encode} &rarr;</button>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.inputLabel}</label>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            {input.length} {ui.charCount} / {inputBytes} {ui.byteCount}
          </span>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleEncode(); }}
          placeholder={ui.inputPlaceholder}
          style={{ minHeight: 150 }}
        />
      </div>

      {/* Standard Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {ui.outputStandard}
              <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 8 }}>
                {standardOutput.length} {ui.b64Chars}
              </span>
            </label>
            <CopyButton text={standardOutput} />
          </div>
          <textarea
            value={standardOutput}
            readOnly
            style={{ minHeight: 120, opacity: standardOutput ? 1 : 0.5, fontFamily: 'monospace' }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {ui.outputUrlSafe}
              <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 8 }}>
                {urlSafeOutput.length} {ui.b64Chars}
              </span>
            </label>
            <CopyButton text={urlSafeOutput} />
          </div>
          <textarea
            value={urlSafeOutput}
            readOnly
            style={{ minHeight: 120, opacity: urlSafeOutput ? 1 : 0.5, fontFamily: 'monospace' }}
          />
        </div>
      </div>

      {/* Cheat Sheet */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{ui.cheatDesc}</p>

        {/* UTF-8 examples table */}
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colChar}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colUtf8Bytes}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colBase64}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colLength}</th>
              </tr>
            </thead>
            <tbody>
              {utf8Examples.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontSize: 18, textAlign: 'center' }}>{row.char}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{row.utf8}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)', fontWeight: 600 }}>{row.base64}</td>
                  <td style={{ padding: '8px 12px' }}>{row.len}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Standard vs URL-safe comparison */}
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{ui.diffTitle}</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '6px 10px', textAlign: 'left' }}></th>
                <th style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--text-secondary)' }}>{ui.standardLabel}</th>
                <th style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--text-secondary)' }}>{ui.urlSafeLabel}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>Characters</td>
                <td style={{ padding: '6px 10px', fontFamily: 'monospace' }}>{ui.diffStdChars}</td>
                <td style={{ padding: '6px 10px', fontFamily: 'monospace' }}>{ui.diffUrlChars}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 10px', fontWeight: 600 }}>Use Cases</td>
                <td style={{ padding: '6px 10px', color: 'var(--text-secondary)' }}>{ui.diffStdUse}</td>
                <td style={{ padding: '6px 10px', color: 'var(--text-secondary)' }}>{ui.diffUrlUse}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross Links */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{ui.crossLinks}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/base64-decoder`, label: 'Base64 Decoder' },
            { href: `/${lang}/tools/base64-to-hex`, label: 'Base64 to Hex' },
            { href: `/${lang}/tools/image-base64`, label: 'Image Base64' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { q: ui.faq1q, a: ui.faq1a },
            { q: ui.faq2q, a: ui.faq2a },
            { q: ui.faq3q, a: ui.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                {faq.q}
              </summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
