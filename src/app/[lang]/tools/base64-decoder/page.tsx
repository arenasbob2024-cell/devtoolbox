'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Decoder',
    description: 'Decode Base64 strings back to plain text instantly. Handles standard Base64, data URIs, JWT tokens, and MIME-encoded content.',
    inputLabel: 'Base64 Input',
    outputLabel: 'Decoded Text',
    inputPlaceholder: 'Paste Base64 string to decode...',
    decode: 'Decode',
    clear: 'Clear',
    cheatTitle: 'Common Base64 Patterns',
    cheatDesc: 'Recognize common Base64-encoded formats to quickly identify what you are decoding.',
    intro: 'Use this free online base64 decoder to decode any base64-encoded string back to its original text. This base64 to text converter handles standard Base64, data URIs, JWT tokens, and email MIME encoding. Decoding happens entirely in your browser for complete privacy.',
    faq1q: 'How do I decode a Base64 string?',
    faq1a: 'Paste your Base64-encoded string into the input field and click Decode. The tool will convert it back to readable text. It handles standard Base64 encoding as well as URL-safe variants. All decoding happens in your browser, ensuring data privacy.',
    faq2q: 'What if my Base64 string is invalid?',
    faq2a: 'Invalid Base64 strings will show an error message. Common issues include: incorrect padding (Base64 strings should have length divisible by 4), invalid characters (only A-Z, a-z, 0-9, +, /, and = are allowed), or truncated strings. Try trimming whitespace or fixing padding with = characters.',
    faq3q: 'How is Base64 used in URLs?',
    faq3a: 'Standard Base64 uses + and / characters which are not URL-safe. URL-safe Base64 replaces + with -, / with _, and removes = padding. This is commonly used in JWT tokens, URL parameters, and file names. This decoder handles both standard and URL-safe Base64.',
    crossLinks: 'Related Base64 Tools',
    errorMsg: 'Invalid Base64 string. Please check your input.',
    patternUri: 'Data URI',
    patternUriDesc: 'Starts with data:...',
    patternJwt: 'JWT Token',
    patternJwtDesc: 'Three dot-separated parts: header.payload.signature',
    patternMime: 'MIME / Email',
    patternMimeDesc: 'Content-Transfer-Encoding: base64',
    patternPlain: 'Plain Base64',
    patternPlainDesc: 'A-Z, a-z, 0-9, +, / with optional = padding',
    troubleTitle: 'Troubleshooting Invalid Base64',
    troublePad: 'Check padding: string length should be divisible by 4',
    troubleChars: 'Only A-Z, a-z, 0-9, +, /, = are valid characters',
    troubleWhitespace: 'Remove extra whitespace and newlines',
    troubleUrlSafe: 'For URL-safe Base64, replace - with + and _ with /',
    charCount: 'characters',
  },
  zh: {
    title: 'Base64 解码器',
    description: '即时将 Base64 字符串解码为纯文本。支持标准 Base64、数据 URI、JWT 令牌和 MIME 编码内容。',
    inputLabel: 'Base64 输入',
    outputLabel: '解码文本',
    inputPlaceholder: '粘贴 Base64 字符串进行解码...',
    decode: '解码',
    clear: '清除',
    cheatTitle: '常见 Base64 模式',
    cheatDesc: '识别常见的 Base64 编码格式，快速判断解码内容。',
    intro: '使用此免费在线 base64 解码器将任何 base64 编码字符串解码回原始文本。此 base64 转文本转换器支持标准 Base64、数据 URI、JWT 令牌和电子邮件 MIME 编码。',
    faq1q: '如何解码 Base64 字符串？',
    faq1a: '将 Base64 编码字符串粘贴到输入框中，点击解码按钮即可将其转换回可读文本。所有解码过程在浏览器中完成，确保数据隐私。',
    faq2q: 'Base64 字符串无效怎么办？',
    faq2a: '无效的 Base64 字符串会显示错误消息。常见问题包括：不正确的填充、无效字符或截断的字符串。尝试去除空白或用 = 字符修复填充。',
    faq3q: 'Base64 如何在 URL 中使用？',
    faq3a: '标准 Base64 使用 + 和 / 字符，这些在 URL 中不安全。URL 安全的 Base64 将 + 替换为 -，/ 替换为 _，并去除 = 填充。',
    crossLinks: '相关 Base64 工具',
    errorMsg: '无效的 Base64 字符串，请检查输入。',
    patternUri: '数据 URI', patternUriDesc: '以 data:... 开头',
    patternJwt: 'JWT 令牌', patternJwtDesc: '三个点分隔部分：header.payload.signature',
    patternMime: 'MIME / 邮件', patternMimeDesc: 'Content-Transfer-Encoding: base64',
    patternPlain: '纯 Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / 加可选 = 填充',
    troubleTitle: 'Base64 错误排查',
    troublePad: '检查填充：字符串长度应能被 4 整除',
    troubleChars: '仅 A-Z、a-z、0-9、+、/、= 为有效字符',
    troubleWhitespace: '去除多余的空白和换行符',
    troubleUrlSafe: 'URL 安全 Base64 需将 - 替换为 +，_ 替换为 /',
    charCount: '字符',
  },
  fr: { title: 'Decodeur Base64', description: 'Decodez les chaines Base64 en texte brut.', inputLabel: 'Entree Base64', outputLabel: 'Texte decode', inputPlaceholder: 'Collez la chaine Base64...', decode: 'Decoder', clear: 'Effacer', cheatTitle: 'Modeles Base64 courants', cheatDesc: 'Reconnaissez les formats Base64 courants.', intro: 'Utilisez ce decodeur base64 gratuit pour decoder les chaines base64 en texte original.', faq1q: 'Comment decoder une chaine Base64 ?', faq1a: 'Collez votre chaine Base64 et cliquez sur Decoder. L\'outil la convertit en texte lisible.', faq2q: 'Que faire si mon Base64 est invalide ?', faq2a: 'Les chaines invalides affichent un message d\'erreur. Verifiez le remplissage, les caracteres et les espaces.', faq3q: 'Comment Base64 est-il utilise dans les URL ?', faq3a: 'Le Base64 standard utilise + et / qui ne sont pas surs pour les URL. Le Base64 URL-safe remplace + par - et / par _.', crossLinks: 'Outils Base64 associes', errorMsg: 'Chaine Base64 invalide.', patternUri: 'Data URI', patternUriDesc: 'Commence par data:...', patternJwt: 'Token JWT', patternJwtDesc: 'Trois parties separees par des points', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Base64 pur', patternPlainDesc: 'A-Z, a-z, 0-9, +, / avec = optionnel', troubleTitle: 'Depannage Base64', troublePad: 'La longueur doit etre divisible par 4', troubleChars: 'Seuls A-Z, a-z, 0-9, +, /, = sont valides', troubleWhitespace: 'Supprimez les espaces et sauts de ligne', troubleUrlSafe: 'Pour URL-safe, remplacez - par + et _ par /', charCount: 'caracteres' },
  de: { title: 'Base64 Decoder', description: 'Base64-Strings sofort in Klartext dekodieren.', inputLabel: 'Base64 Eingabe', outputLabel: 'Dekodierter Text', inputPlaceholder: 'Base64-String einfugen...', decode: 'Dekodieren', clear: 'Loschen', cheatTitle: 'Haufige Base64 Muster', cheatDesc: 'Erkennen Sie gangige Base64-kodierte Formate.', intro: 'Verwenden Sie diesen kostenlosen Base64-Decoder um Base64-Strings in Klartext zu dekodieren.', faq1q: 'Wie dekodiere ich einen Base64-String?', faq1a: 'Fugen Sie den Base64-String ein und klicken Sie auf Dekodieren.', faq2q: 'Was wenn mein Base64-String ungultig ist?', faq2a: 'Ungultige Strings zeigen eine Fehlermeldung. Prufen Sie Padding, Zeichen und Leerzeichen.', faq3q: 'Wie wird Base64 in URLs verwendet?', faq3a: 'Standard-Base64 nutzt + und / die in URLs unsicher sind. URL-sicheres Base64 ersetzt + durch - und / durch _.', crossLinks: 'Verwandte Base64 Tools', errorMsg: 'Ungultiger Base64-String.', patternUri: 'Data URI', patternUriDesc: 'Beginnt mit data:...', patternJwt: 'JWT Token', patternJwtDesc: 'Drei punktgetrennte Teile', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Reines Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / mit optionalem =', troubleTitle: 'Base64 Fehlerbehebung', troublePad: 'Lange muss durch 4 teilbar sein', troubleChars: 'Nur A-Z, a-z, 0-9, +, /, = sind gultig', troubleWhitespace: 'Entfernen Sie Leerzeichen und Zeilenumbruche', troubleUrlSafe: 'Fur URL-safe - durch + und _ durch / ersetzen', charCount: 'Zeichen' },
  es: { title: 'Decodificador Base64', description: 'Decodifica cadenas Base64 a texto plano.', inputLabel: 'Entrada Base64', outputLabel: 'Texto decodificado', inputPlaceholder: 'Pega la cadena Base64...', decode: 'Decodificar', clear: 'Limpiar', cheatTitle: 'Patrones Base64 comunes', cheatDesc: 'Reconoce formatos Base64 comunes.', intro: 'Usa este decodificador base64 gratuito para decodificar cadenas base64 a texto original.', faq1q: 'Como decodifico una cadena Base64?', faq1a: 'Pega tu cadena Base64 y haz clic en Decodificar.', faq2q: 'Que pasa si mi Base64 es invalido?', faq2a: 'Las cadenas invalidas muestran un mensaje de error. Verifica el relleno, caracteres y espacios.', faq3q: 'Como se usa Base64 en URLs?', faq3a: 'Base64 estandar usa + y / que no son seguros para URLs. Base64 URL-safe reemplaza + con - y / con _.', crossLinks: 'Herramientas Base64 relacionadas', errorMsg: 'Cadena Base64 invalida.', patternUri: 'Data URI', patternUriDesc: 'Comienza con data:...', patternJwt: 'Token JWT', patternJwtDesc: 'Tres partes separadas por puntos', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Base64 puro', patternPlainDesc: 'A-Z, a-z, 0-9, +, / con = opcional', troubleTitle: 'Solucion de problemas Base64', troublePad: 'La longitud debe ser divisible por 4', troubleChars: 'Solo A-Z, a-z, 0-9, +, /, = son validos', troubleWhitespace: 'Elimina espacios y saltos de linea', troubleUrlSafe: 'Para URL-safe, reemplaza - con + y _ con /', charCount: 'caracteres' },
  ja: { title: 'Base64 デコーダー', description: 'Base64文字列を即座にプレーンテキストにデコード。', inputLabel: 'Base64 入力', outputLabel: 'デコードされたテキスト', inputPlaceholder: 'Base64文字列を貼り付け...', decode: 'デコード', clear: 'クリア', cheatTitle: '一般的なBase64パターン', cheatDesc: '一般的なBase64エンコード形式を認識します。', intro: 'この無料オンラインbase64デコーダーでbase64文字列を元のテキストにデコードできます。', faq1q: 'Base64文字列をデコードするには？', faq1a: 'Base64文字列を入力欄に貼り付けてデコードをクリックします。', faq2q: 'Base64が無効な場合は？', faq2a: '無効な文字列はエラーメッセージを表示します。パディング、文字、空白を確認してください。', faq3q: 'URLでのBase64の使い方は？', faq3a: '標準Base64は+と/を使用しURLで安全ではありません。URLセーフBase64は+を-に、/を_に置き換えます。', crossLinks: '関連Base64ツール', errorMsg: '無効なBase64文字列です。', patternUri: 'データURI', patternUriDesc: 'data:...で始まる', patternJwt: 'JWTトークン', patternJwtDesc: 'ドットで区切られた3つの部分', patternMime: 'MIME / メール', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'プレーンBase64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / と=パディング', troubleTitle: 'Base64エラーのトラブルシューティング', troublePad: '文字列長は4の倍数であること', troubleChars: 'A-Z, a-z, 0-9, +, /, = のみ有効', troubleWhitespace: '余分な空白と改行を削除', troubleUrlSafe: 'URLセーフの場合 - を + に、_ を / に置換', charCount: '文字' },
  ko: { title: 'Base64 디코더', description: 'Base64 문자열을 즉시 일반 텍스트로 디코딩합니다.', inputLabel: 'Base64 입력', outputLabel: '디코딩된 텍스트', inputPlaceholder: 'Base64 문자열 붙여넣기...', decode: '디코딩', clear: '지우기', cheatTitle: '일반적인 Base64 패턴', cheatDesc: '일반적인 Base64 인코딩 형식을 식별합니다.', intro: '이 무료 온라인 base64 디코더로 base64 문자열을 원본 텍스트로 디코딩하세요.', faq1q: 'Base64 문자열을 어떻게 디코딩하나요?', faq1a: 'Base64 문자열을 입력 필드에 붙여넣고 디코딩을 클릭하세요.', faq2q: 'Base64가 유효하지 않으면?', faq2a: '유효하지 않은 문자열은 오류 메시지를 표시합니다. 패딩, 문자, 공백을 확인하세요.', faq3q: 'URL에서 Base64는 어떻게 사용되나요?', faq3a: '표준 Base64는 URL에 안전하지 않은 +와 /를 사용합니다. URL 안전 Base64는 +를 -로, /를 _로 대체합니다.', crossLinks: '관련 Base64 도구', errorMsg: '유효하지 않은 Base64 문자열입니다.', patternUri: '데이터 URI', patternUriDesc: 'data:...로 시작', patternJwt: 'JWT 토큰', patternJwtDesc: '점으로 구분된 세 부분', patternMime: 'MIME / 이메일', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: '순수 Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / 와 = 패딩', troubleTitle: 'Base64 오류 해결', troublePad: '문자열 길이는 4의 배수여야 합니다', troubleChars: 'A-Z, a-z, 0-9, +, /, = 만 유효합니다', troubleWhitespace: '공백과 줄바꿈을 제거하세요', troubleUrlSafe: 'URL 안전의 경우 -를 +로, _를 /로 교체', charCount: '문자' },
  it: { title: 'Decoder Base64', description: 'Decodifica stringhe Base64 in testo semplice.', inputLabel: 'Input Base64', outputLabel: 'Testo decodificato', inputPlaceholder: 'Incolla la stringa Base64...', decode: 'Decodifica', clear: 'Cancella', cheatTitle: 'Pattern Base64 comuni', cheatDesc: 'Riconosci i formati Base64 piu comuni.', intro: 'Usa questo decoder base64 gratuito per decodificare stringhe base64 in testo originale.', faq1q: 'Come decodifico una stringa Base64?', faq1a: 'Incolla la stringa Base64 e clicca Decodifica.', faq2q: 'Se il mio Base64 non e valido?', faq2a: 'Le stringhe non valide mostrano un messaggio di errore.', faq3q: 'Come si usa Base64 negli URL?', faq3a: 'Il Base64 standard usa + e / che non sono sicuri per URL. Il Base64 URL-safe sostituisce + con - e / con _.', crossLinks: 'Strumenti Base64 correlati', errorMsg: 'Stringa Base64 non valida.', patternUri: 'Data URI', patternUriDesc: 'Inizia con data:...', patternJwt: 'Token JWT', patternJwtDesc: 'Tre parti separate da punti', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Base64 puro', patternPlainDesc: 'A-Z, a-z, 0-9, +, / con = opzionale', troubleTitle: 'Risoluzione problemi Base64', troublePad: 'La lunghezza deve essere divisibile per 4', troubleChars: 'Solo A-Z, a-z, 0-9, +, /, = sono validi', troubleWhitespace: 'Rimuovi spazi e ritorni a capo', troubleUrlSafe: 'Per URL-safe, sostituisci - con + e _ con /', charCount: 'caratteri' },
  pt: { title: 'Decodificador Base64', description: 'Decodifique strings Base64 para texto simples.', inputLabel: 'Entrada Base64', outputLabel: 'Texto decodificado', inputPlaceholder: 'Cole a string Base64...', decode: 'Decodificar', clear: 'Limpar', cheatTitle: 'Padroes Base64 comuns', cheatDesc: 'Reconheca formatos Base64 comuns.', intro: 'Use este decodificador base64 gratuito para decodificar strings base64 para texto original.', faq1q: 'Como decodifico uma string Base64?', faq1a: 'Cole a string Base64 e clique em Decodificar.', faq2q: 'E se meu Base64 for invalido?', faq2a: 'Strings invalidas mostram uma mensagem de erro.', faq3q: 'Como o Base64 e usado em URLs?', faq3a: 'Base64 padrao usa + e / que nao sao seguros para URL. Base64 URL-safe substitui + por - e / por _.', crossLinks: 'Ferramentas Base64 relacionadas', errorMsg: 'String Base64 invalida.', patternUri: 'Data URI', patternUriDesc: 'Comeca com data:...', patternJwt: 'Token JWT', patternJwtDesc: 'Tres partes separadas por pontos', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Base64 puro', patternPlainDesc: 'A-Z, a-z, 0-9, +, / com = opcional', troubleTitle: 'Solucao de problemas Base64', troublePad: 'O comprimento deve ser divisivel por 4', troubleChars: 'Apenas A-Z, a-z, 0-9, +, /, = sao validos', troubleWhitespace: 'Remova espacos e quebras de linha', troubleUrlSafe: 'Para URL-safe, substitua - por + e _ por /', charCount: 'caracteres' },
  nl: { title: 'Base64 Decoder', description: 'Decodeer Base64-strings naar platte tekst.', inputLabel: 'Base64 Invoer', outputLabel: 'Gedecodeerde tekst', inputPlaceholder: 'Plak Base64-string...', decode: 'Decoderen', clear: 'Wissen', cheatTitle: 'Veelvoorkomende Base64 patronen', cheatDesc: 'Herken veelvoorkomende Base64 formaten.', intro: 'Gebruik deze gratis base64-decoder om base64-strings te decoderen naar originele tekst.', faq1q: 'Hoe decodeer ik een Base64-string?', faq1a: 'Plak de Base64-string en klik op Decoderen.', faq2q: 'Wat als mijn Base64 ongeldig is?', faq2a: 'Ongeldige strings tonen een foutmelding.', faq3q: 'Hoe wordt Base64 in URLs gebruikt?', faq3a: 'Standaard Base64 gebruikt + en / die niet veilig zijn voor URLs.', crossLinks: 'Gerelateerde Base64 tools', errorMsg: 'Ongeldige Base64-string.', patternUri: 'Data URI', patternUriDesc: 'Begint met data:...', patternJwt: 'JWT Token', patternJwtDesc: 'Drie door punten gescheiden delen', patternMime: 'MIME / E-mail', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Gewone Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / met optioneel =', troubleTitle: 'Base64 probleemoplossing', troublePad: 'Lengte moet deelbaar zijn door 4', troubleChars: 'Alleen A-Z, a-z, 0-9, +, /, = zijn geldig', troubleWhitespace: 'Verwijder extra spaties en regelovergangen', troubleUrlSafe: 'Voor URL-safe, vervang - door + en _ door /', charCount: 'tekens' },
  pl: { title: 'Dekoder Base64', description: 'Dekoduj ciagi Base64 do tekstu.', inputLabel: 'Wejscie Base64', outputLabel: 'Dekodowany tekst', inputPlaceholder: 'Wklej ciag Base64...', decode: 'Dekoduj', clear: 'Wyczysc', cheatTitle: 'Popularne wzorce Base64', cheatDesc: 'Rozpoznaj popularne formaty Base64.', intro: 'Uzyj tego darmowego dekodera base64 do dekodowania ciagow base64 do tekstu.', faq1q: 'Jak dekodowac ciag Base64?', faq1a: 'Wklej ciag Base64 i kliknij Dekoduj.', faq2q: 'Co jesli moj Base64 jest nieprawidlowy?', faq2a: 'Nieprawidlowe ciagi wyswietla komunikat o bledzie.', faq3q: 'Jak Base64 jest uzywany w URL?', faq3a: 'Standardowy Base64 uzywa + i / ktore nie sa bezpieczne w URL.', crossLinks: 'Powiazane narzedzia Base64', errorMsg: 'Nieprawidlowy ciag Base64.', patternUri: 'Data URI', patternUriDesc: 'Zaczyna sie od data:...', patternJwt: 'Token JWT', patternJwtDesc: 'Trzy czesci oddzielone kropkami', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Czysty Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / z opcjonalnym =', troubleTitle: 'Rozwiazywanie problemow Base64', troublePad: 'Dlugosc musi byc podzielna przez 4', troubleChars: 'Tylko A-Z, a-z, 0-9, +, /, = sa prawidlowe', troubleWhitespace: 'Usun nadmiarowe spacje i znaki nowej linii', troubleUrlSafe: 'Dla URL-safe zamien - na + i _ na /', charCount: 'znakow' },
  sv: { title: 'Base64 Decoder', description: 'Avkoda Base64-strangar till text.', inputLabel: 'Base64 Indata', outputLabel: 'Avkodad text', inputPlaceholder: 'Klistra in Base64-strang...', decode: 'Avkoda', clear: 'Rensa', cheatTitle: 'Vanliga Base64 monster', cheatDesc: 'Kanna igen vanliga Base64-format.', intro: 'Anvand denna gratis base64-avkodare for att avkoda base64-strangar till text.', faq1q: 'Hur avkodar jag en Base64-strang?', faq1a: 'Klistra in Base64-strangen och klicka Avkoda.', faq2q: 'Vad om min Base64 ar ogiltig?', faq2a: 'Ogiltiga strangar visar ett felmeddelande.', faq3q: 'Hur anvands Base64 i URL:er?', faq3a: 'Standard Base64 anvander + och / som inte ar sakra for URL:er.', crossLinks: 'Relaterade Base64-verktyg', errorMsg: 'Ogiltig Base64-strang.', patternUri: 'Data URI', patternUriDesc: 'Borjar med data:...', patternJwt: 'JWT Token', patternJwtDesc: 'Tre punktseparerade delar', patternMime: 'MIME / E-post', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Ren Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / med valfritt =', troubleTitle: 'Base64 felsokning', troublePad: 'Langden maste vara delbar med 4', troubleChars: 'Bara A-Z, a-z, 0-9, +, /, = ar giltiga', troubleWhitespace: 'Ta bort mellanslag och radbrytningar', troubleUrlSafe: 'For URL-saker, ersatt - med + och _ med /', charCount: 'tecken' },
  no: { title: 'Base64 Decoder', description: 'Dekod Base64-strenger til tekst.', inputLabel: 'Base64 Inndata', outputLabel: 'Dekodet tekst', inputPlaceholder: 'Lim inn Base64-streng...', decode: 'Dekod', clear: 'Slett', cheatTitle: 'Vanlige Base64 monstre', cheatDesc: 'Gjenkjenn vanlige Base64-formater.', intro: 'Bruk denne gratis base64-dekoderen for a dekode base64-strenger til tekst.', faq1q: 'Hvordan dekoder jeg en Base64-streng?', faq1a: 'Lim inn Base64-strengen og klikk Dekod.', faq2q: 'Hva om min Base64 er ugyldig?', faq2a: 'Ugyldige strenger viser en feilmelding.', faq3q: 'Hvordan brukes Base64 i URL-er?', faq3a: 'Standard Base64 bruker + og / som ikke er sikre for URL-er.', crossLinks: 'Relaterte Base64-verktoy', errorMsg: 'Ugyldig Base64-streng.', patternUri: 'Data URI', patternUriDesc: 'Begynner med data:...', patternJwt: 'JWT Token', patternJwtDesc: 'Tre punktseparerte deler', patternMime: 'MIME / E-post', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Ren Base64', patternPlainDesc: 'A-Z, a-z, 0-9, +, / med valgfri =', troubleTitle: 'Base64 feilsoking', troublePad: 'Lengden ma vaere delelig med 4', troubleChars: 'Bare A-Z, a-z, 0-9, +, /, = er gyldige', troubleWhitespace: 'Fjern mellomrom og linjeskift', troubleUrlSafe: 'For URL-sikker, erstatt - med + og _ med /', charCount: 'tegn' },
  id: { title: 'Base64 Decoder', description: 'Decode string Base64 ke teks biasa.', inputLabel: 'Input Base64', outputLabel: 'Teks terdekode', inputPlaceholder: 'Tempel string Base64...', decode: 'Decode', clear: 'Hapus', cheatTitle: 'Pola Base64 umum', cheatDesc: 'Kenali format Base64 yang umum.', intro: 'Gunakan decoder base64 gratis ini untuk mendekode string base64 ke teks asli.', faq1q: 'Bagaimana cara decode string Base64?', faq1a: 'Tempel string Base64 dan klik Decode.', faq2q: 'Bagaimana jika Base64 tidak valid?', faq2a: 'String tidak valid akan menampilkan pesan error.', faq3q: 'Bagaimana Base64 digunakan di URL?', faq3a: 'Base64 standar menggunakan + dan / yang tidak aman untuk URL.', crossLinks: 'Alat Base64 terkait', errorMsg: 'String Base64 tidak valid.', patternUri: 'Data URI', patternUriDesc: 'Dimulai dengan data:...', patternJwt: 'Token JWT', patternJwtDesc: 'Tiga bagian dipisahkan titik', patternMime: 'MIME / Email', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Base64 murni', patternPlainDesc: 'A-Z, a-z, 0-9, +, / dengan = opsional', troubleTitle: 'Pemecahan masalah Base64', troublePad: 'Panjang harus habis dibagi 4', troubleChars: 'Hanya A-Z, a-z, 0-9, +, /, = yang valid', troubleWhitespace: 'Hapus spasi dan baris baru', troubleUrlSafe: 'Untuk URL-safe, ganti - dengan + dan _ dengan /', charCount: 'karakter' },
  th: { title: 'Base64 Decoder', description: 'ถอดรหัสสตริง Base64 เป็นข้อความธรรมดา', inputLabel: 'อินพุต Base64', outputLabel: 'ข้อความที่ถอดรหัส', inputPlaceholder: 'วางสตริง Base64...', decode: 'ถอดรหัส', clear: 'ล้าง', cheatTitle: 'รูปแบบ Base64 ทั่วไป', cheatDesc: 'จดจำรูปแบบ Base64 ที่พบบ่อย', intro: 'ใช้เครื่องถอดรหัส base64 ฟรีนี้เพื่อถอดรหัสสตริง base64 เป็นข้อความต้นฉบับ', faq1q: 'ถอดรหัสสตริง Base64 อย่างไร?', faq1a: 'วางสตริง Base64 แล้วคลิกถอดรหัส', faq2q: 'ถ้า Base64 ไม่ถูกต้องล่ะ?', faq2a: 'สตริงที่ไม่ถูกต้องจะแสดงข้อความผิดพลาด', faq3q: 'Base64 ใช้ใน URL อย่างไร?', faq3a: 'Base64 มาตรฐานใช้ + และ / ซึ่งไม่ปลอดภัยสำหรับ URL', crossLinks: 'เครื่องมือ Base64 ที่เกี่ยวข้อง', errorMsg: 'สตริง Base64 ไม่ถูกต้อง', patternUri: 'Data URI', patternUriDesc: 'เริ่มต้นด้วย data:...', patternJwt: 'JWT Token', patternJwtDesc: 'สามส่วนคั่นด้วยจุด', patternMime: 'MIME / อีเมล', patternMimeDesc: 'Content-Transfer-Encoding: base64', patternPlain: 'Base64 ธรรมดา', patternPlainDesc: 'A-Z, a-z, 0-9, +, / กับ = เสริม', troubleTitle: 'แก้ปัญหา Base64', troublePad: 'ความยาวต้องหารด้วย 4 ลงตัว', troubleChars: 'เฉพาะ A-Z, a-z, 0-9, +, /, = เท่านั้นที่ถูกต้อง', troubleWhitespace: 'ลบช่องว่างและการขึ้นบรรทัดใหม่', troubleUrlSafe: 'สำหรับ URL-safe แทนที่ - ด้วย + และ _ ด้วย /', charCount: 'อักขระ' },
};

export default function Base64DecoderPage() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); return; }
      // Auto-handle URL-safe Base64
      let b64 = input.trim();
      b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
      // Add padding if needed
      while (b64.length % 4 !== 0) b64 += '=';
      setOutput(decodeURIComponent(escape(atob(b64))));
    } catch {
      setError(ui.errorMsg);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ui.faq1q, acceptedAnswer: { '@type': 'Answer', text: ui.faq1a } },
      { '@type': 'Question', name: ui.faq2q, acceptedAnswer: { '@type': 'Answer', text: ui.faq2a } },
      { '@type': 'Question', name: ui.faq3q, acceptedAnswer: { '@type': 'Answer', text: ui.faq3a } },
    ],
  };

  const patterns = [
    { label: ui.patternUri, desc: ui.patternUriDesc, example: 'data:text/plain;base64,SGVsbG8=' },
    { label: ui.patternJwt, desc: ui.patternJwtDesc, example: 'eyJhbGci...eyJzdWIi...SflKxwRJ...' },
    { label: ui.patternMime, desc: ui.patternMimeDesc, example: 'Q29udGVudC1UeXBl...' },
    { label: ui.patternPlain, desc: ui.patternPlainDesc, example: 'SGVsbG8gV29ybGQh' },
  ];

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="base64-decoder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Tool UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleDecode} className="btn btn-primary">&larr; {ui.decode}</button>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{input.length} {ui.charCount}</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleDecode(); }}
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 250 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 250, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* Cheat Sheet: Common Base64 Patterns */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{ui.cheatDesc}</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Pattern</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Example</th>
              </tr>
            </thead>
            <tbody>
              {patterns.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--accent-blue)' }}>{row.label}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{row.desc}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 11, color: 'var(--text-secondary)' }}>{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Troubleshooting */}
        <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{ui.troubleTitle}</h3>
          <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>{ui.troublePad}</li>
            <li>{ui.troubleChars}</li>
            <li>{ui.troubleWhitespace}</li>
            <li>{ui.troubleUrlSafe}</li>
          </ul>
        </div>
      </div>

      {/* Cross Links */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{ui.crossLinks}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/base64-to-hex`, label: 'Base64 to Hex' },
            { href: `/${lang}/tools/string-to-base64`, label: 'String to Base64' },
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
