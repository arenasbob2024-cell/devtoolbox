'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 to Hex Converter',
    description: 'Convert between Base64 and hexadecimal formats instantly. Bidirectional conversion with byte-level accuracy.',
    modeB64: 'Base64 to Hex',
    modeHex: 'Hex to Base64',
    inputLabelB64: 'Base64 Input',
    outputLabelHex: 'Hexadecimal Output',
    inputLabelHex: 'Hexadecimal Input',
    outputLabelB64: 'Base64 Output',
    inputPlaceholderB64: 'Paste Base64 string...',
    inputPlaceholderHex: 'Paste hex string (e.g., 48656c6c6f)...',
    convert: 'Convert',
    clear: 'Clear',
    uppercase: 'Uppercase hex',
    separator: 'Space separator',
    intro: 'Convert between Base64 and hexadecimal (hex) encoding formats. This free online base64 to hex converter decodes Base64 to raw bytes and displays them as hex values. You can also convert hex strings back to Base64. Useful for cryptography, debugging binary protocols, and analyzing encoded data.',
    cheatTitle: 'Hex vs Base64 Comparison',
    cheatDesc: 'Both hex and Base64 are ways to represent binary data as text, but they differ in size efficiency and use cases.',
    colFormat: 'Format',
    colCharset: 'Character Set',
    colRatio: 'Size Ratio',
    colUseCase: 'Common Use Cases',
    hexCharset: '0-9, a-f (16 chars)',
    b64Charset: 'A-Z, a-z, 0-9, +, / (64 chars)',
    hexRatio: '2 chars per byte (200%)',
    b64Ratio: '4 chars per 3 bytes (~133%)',
    hexUse: 'Colors, memory dumps, crypto hashes',
    b64Use: 'Data URIs, email, API payloads',
    faq1q: 'How do I convert Base64 to hexadecimal?',
    faq1a: 'Base64 to hex conversion works in two steps: first, the Base64 string is decoded to raw bytes. Then, each byte is converted to its two-digit hexadecimal representation. For example, the Base64 string "SGVsbG8=" decodes to "Hello", which in hex is "48656c6c6f".',
    faq2q: 'Why convert between Base64 and hex?',
    faq2a: 'Base64 and hex serve different purposes. Hex is more readable for developers debugging binary data, viewing memory dumps, or working with cryptographic hashes. Base64 is more space-efficient and commonly used in data URIs, email encoding, and API payloads. Converting between them helps when working across different systems.',
    faq3q: 'What is the size difference between Base64 and hex?',
    faq3a: 'Hex encoding uses 2 characters per byte (200% of original size), while Base64 uses 4 characters per 3 bytes (~133% of original size). So Base64 is about 33% smaller than hex for the same data. For example, 10 bytes of data becomes 20 hex characters but only ~14 Base64 characters.',
    crossLinks: 'Related Base64 Tools',
    errorMsg: 'Conversion error. Please check your input.',
    byteCount: 'bytes',
  },
  zh: {
    title: 'Base64 转 Hex 转换器',
    description: '即时在 Base64 和十六进制格式之间转换。双向转换，字节级精度。',
    modeB64: 'Base64 转 Hex',
    modeHex: 'Hex 转 Base64',
    inputLabelB64: 'Base64 输入',
    outputLabelHex: '十六进制输出',
    inputLabelHex: '十六进制输入',
    outputLabelB64: 'Base64 输出',
    inputPlaceholderB64: '粘贴 Base64 字符串...',
    inputPlaceholderHex: '粘贴十六进制字符串 (如 48656c6c6f)...',
    convert: '转换',
    clear: '清除',
    uppercase: '大写十六进制',
    separator: '空格分隔',
    intro: '在 Base64 和十六进制 (hex) 编码格式之间转换。此免费在线 base64 转 hex 转换器将 Base64 解码为原始字节并显示为十六进制值。也可以将十六进制字符串转换回 Base64。',
    cheatTitle: 'Hex 与 Base64 对比',
    cheatDesc: 'Hex 和 Base64 都是将二进制数据表示为文本的方式，但在大小效率和用途上有所不同。',
    colFormat: '格式', colCharset: '字符集', colRatio: '大小比率', colUseCase: '常见用途',
    hexCharset: '0-9, a-f (16 个字符)', b64Charset: 'A-Z, a-z, 0-9, +, / (64 个字符)',
    hexRatio: '每字节 2 个字符 (200%)', b64Ratio: '每 3 字节 4 个字符 (~133%)',
    hexUse: '颜色、内存转储、加密哈希', b64Use: '数据 URI、邮件、API 负载',
    faq1q: '如何将 Base64 转换为十六进制？',
    faq1a: 'Base64 转 hex 分两步：首先将 Base64 字符串解码为原始字节，然后将每个字节转换为两位十六进制表示。',
    faq2q: '为什么要在 Base64 和 hex 之间转换？',
    faq2a: 'Hex 更便于开发者调试二进制数据，而 Base64 更节省空间，常用于数据 URI 和 API 负载。在不同系统间工作时需要互转。',
    faq3q: 'Base64 和 hex 的大小差异是多少？',
    faq3a: 'Hex 每字节使用 2 个字符 (200%)，而 Base64 每 3 字节使用 4 个字符 (~133%)。Base64 比 hex 约小 33%。',
    crossLinks: '相关 Base64 工具',
    errorMsg: '转换错误，请检查输入。',
    byteCount: '字节',
  },
  fr: { title: 'Convertisseur Base64 en Hex', description: 'Convertissez entre Base64 et hexadecimal.', modeB64: 'Base64 vers Hex', modeHex: 'Hex vers Base64', inputLabelB64: 'Entree Base64', outputLabelHex: 'Sortie hexadecimale', inputLabelHex: 'Entree hexadecimale', outputLabelB64: 'Sortie Base64', inputPlaceholderB64: 'Collez la chaine Base64...', inputPlaceholderHex: 'Collez la chaine hex...', convert: 'Convertir', clear: 'Effacer', uppercase: 'Hex majuscule', separator: 'Separateur espace', intro: 'Convertissez entre les formats Base64 et hexadecimal. Ce convertisseur gratuit decode Base64 en octets bruts et les affiche en valeurs hex.', cheatTitle: 'Comparaison Hex vs Base64', cheatDesc: 'Hex et Base64 representent tous deux des donnees binaires en texte.', colFormat: 'Format', colCharset: 'Jeu de caracteres', colRatio: 'Ratio taille', colUseCase: 'Utilisations', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 car/octet (200%)', b64Ratio: '4 car/3 octets (~133%)', hexUse: 'Couleurs, dumps memoire, hashes', b64Use: 'Data URI, email, API', faq1q: 'Comment convertir Base64 en hex ?', faq1a: 'La conversion decode d\'abord le Base64 en octets, puis convertit chaque octet en representation hexadecimale.', faq2q: 'Pourquoi convertir entre Base64 et hex ?', faq2a: 'Hex est plus lisible pour le debogage, Base64 est plus compact pour le transport de donnees.', faq3q: 'Quelle est la difference de taille ?', faq3a: 'Hex utilise 2 caracteres par octet (200%), Base64 utilise 4 caracteres pour 3 octets (~133%).', crossLinks: 'Outils Base64 associes', errorMsg: 'Erreur de conversion.', byteCount: 'octets' },
  de: { title: 'Base64 zu Hex Konverter', description: 'Zwischen Base64 und Hexadezimal konvertieren.', modeB64: 'Base64 zu Hex', modeHex: 'Hex zu Base64', inputLabelB64: 'Base64 Eingabe', outputLabelHex: 'Hexadezimal Ausgabe', inputLabelHex: 'Hexadezimal Eingabe', outputLabelB64: 'Base64 Ausgabe', inputPlaceholderB64: 'Base64-String einfugen...', inputPlaceholderHex: 'Hex-String einfugen...', convert: 'Konvertieren', clear: 'Loschen', uppercase: 'Hex grossgeschrieben', separator: 'Leerzeichen-Trenner', intro: 'Konvertieren Sie zwischen Base64 und Hexadezimalformaten mit diesem kostenlosen Online-Konverter.', cheatTitle: 'Hex vs Base64 Vergleich', cheatDesc: 'Beide sind Methoden zur Darstellung binarer Daten als Text.', colFormat: 'Format', colCharset: 'Zeichensatz', colRatio: 'Grossenverhaltnis', colUseCase: 'Verwendung', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 Zeichen/Byte (200%)', b64Ratio: '4 Zeichen/3 Bytes (~133%)', hexUse: 'Farben, Memory-Dumps, Hashes', b64Use: 'Data-URIs, E-Mail, API', faq1q: 'Wie konvertiere ich Base64 zu Hex?', faq1a: 'Zuerst wird Base64 in Bytes dekodiert, dann wird jedes Byte in Hexadezimaldarstellung umgewandelt.', faq2q: 'Warum zwischen Base64 und Hex konvertieren?', faq2a: 'Hex ist lesbarer fur Debugging, Base64 ist kompakter fur Datentransport.', faq3q: 'Was ist der Grossenunterschied?', faq3a: 'Hex nutzt 2 Zeichen pro Byte (200%), Base64 nutzt 4 Zeichen fur 3 Bytes (~133%).', crossLinks: 'Verwandte Base64 Tools', errorMsg: 'Konvertierungsfehler.', byteCount: 'Bytes' },
  es: { title: 'Convertidor Base64 a Hex', description: 'Convierte entre Base64 y hexadecimal.', modeB64: 'Base64 a Hex', modeHex: 'Hex a Base64', inputLabelB64: 'Entrada Base64', outputLabelHex: 'Salida hexadecimal', inputLabelHex: 'Entrada hexadecimal', outputLabelB64: 'Salida Base64', inputPlaceholderB64: 'Pega la cadena Base64...', inputPlaceholderHex: 'Pega la cadena hex...', convert: 'Convertir', clear: 'Limpiar', uppercase: 'Hex mayusculas', separator: 'Separador espacio', intro: 'Convierte entre formatos Base64 y hexadecimal con este convertidor gratuito en linea.', cheatTitle: 'Comparacion Hex vs Base64', cheatDesc: 'Ambos representan datos binarios como texto.', colFormat: 'Formato', colCharset: 'Conjunto de caracteres', colRatio: 'Ratio de tamano', colUseCase: 'Usos comunes', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 car/byte (200%)', b64Ratio: '4 car/3 bytes (~133%)', hexUse: 'Colores, volcados de memoria, hashes', b64Use: 'Data URI, email, API', faq1q: 'Como convertir Base64 a hex?', faq1a: 'Primero se decodifica Base64 a bytes, luego cada byte se convierte a representacion hexadecimal.', faq2q: 'Por que convertir entre Base64 y hex?', faq2a: 'Hex es mas legible para depuracion, Base64 es mas compacto para transporte de datos.', faq3q: 'Cual es la diferencia de tamano?', faq3a: 'Hex usa 2 caracteres por byte (200%), Base64 usa 4 caracteres por 3 bytes (~133%).', crossLinks: 'Herramientas Base64 relacionadas', errorMsg: 'Error de conversion.', byteCount: 'bytes' },
  ja: { title: 'Base64 Hex 変換', description: 'Base64と16進数を即座に変換。', modeB64: 'Base64 → Hex', modeHex: 'Hex → Base64', inputLabelB64: 'Base64 入力', outputLabelHex: '16進数出力', inputLabelHex: '16進数入力', outputLabelB64: 'Base64 出力', inputPlaceholderB64: 'Base64文字列を貼り付け...', inputPlaceholderHex: '16進文字列を貼り付け...', convert: '変換', clear: 'クリア', uppercase: '大文字Hex', separator: 'スペース区切り', intro: 'Base64と16進数エンコーディング形式間で変換する無料オンラインツールです。', cheatTitle: 'Hex vs Base64 比較', cheatDesc: '両方ともバイナリデータをテキストとして表現する方法です。', colFormat: '形式', colCharset: '文字セット', colRatio: 'サイズ比率', colUseCase: '用途', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '1バイト2文字 (200%)', b64Ratio: '3バイト4文字 (~133%)', hexUse: '色、メモリダンプ、ハッシュ', b64Use: 'データURI、メール、API', faq1q: 'Base64をHexに変換するには？', faq1a: 'まずBase64をバイトにデコードし、各バイトを16進表現に変換します。', faq2q: 'なぜBase64とHex間で変換する？', faq2a: 'Hexはデバッグに読みやすく、Base64はデータ転送にコンパクトです。', faq3q: 'サイズの違いは？', faq3a: 'Hexは1バイト2文字(200%)、Base64は3バイト4文字(~133%)です。', crossLinks: '関連Base64ツール', errorMsg: '変換エラー。', byteCount: 'バイト' },
  ko: { title: 'Base64 Hex 변환기', description: 'Base64와 16진수를 즉시 변환합니다.', modeB64: 'Base64 → Hex', modeHex: 'Hex → Base64', inputLabelB64: 'Base64 입력', outputLabelHex: '16진수 출력', inputLabelHex: '16진수 입력', outputLabelB64: 'Base64 출력', inputPlaceholderB64: 'Base64 문자열 붙여넣기...', inputPlaceholderHex: '16진수 문자열 붙여넣기...', convert: '변환', clear: '지우기', uppercase: '대문자 Hex', separator: '공백 구분', intro: 'Base64와 16진수 인코딩 형식 간의 무료 온라인 변환 도구입니다.', cheatTitle: 'Hex vs Base64 비교', cheatDesc: '둘 다 바이너리 데이터를 텍스트로 표현하는 방법입니다.', colFormat: '형식', colCharset: '문자 집합', colRatio: '크기 비율', colUseCase: '용도', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '바이트당 2문자 (200%)', b64Ratio: '3바이트당 4문자 (~133%)', hexUse: '색상, 메모리 덤프, 해시', b64Use: '데이터 URI, 이메일, API', faq1q: 'Base64를 Hex로 변환하려면?', faq1a: '먼저 Base64를 바이트로 디코딩한 다음 각 바이트를 16진수 표현으로 변환합니다.', faq2q: 'Base64와 Hex 사이 변환이 필요한 이유?', faq2a: 'Hex는 디버깅에 읽기 쉽고, Base64는 데이터 전송에 더 컴팩트합니다.', faq3q: '크기 차이는?', faq3a: 'Hex는 바이트당 2문자(200%), Base64는 3바이트당 4문자(~133%)입니다.', crossLinks: '관련 Base64 도구', errorMsg: '변환 오류.', byteCount: '바이트' },
  it: { title: 'Convertitore Base64 Hex', description: 'Converti tra Base64 e esadecimale.', modeB64: 'Base64 a Hex', modeHex: 'Hex a Base64', inputLabelB64: 'Input Base64', outputLabelHex: 'Output esadecimale', inputLabelHex: 'Input esadecimale', outputLabelB64: 'Output Base64', inputPlaceholderB64: 'Incolla stringa Base64...', inputPlaceholderHex: 'Incolla stringa hex...', convert: 'Converti', clear: 'Cancella', uppercase: 'Hex maiuscolo', separator: 'Separatore spazio', intro: 'Converti tra formati Base64 e esadecimale con questo convertitore gratuito online.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Entrambi rappresentano dati binari come testo.', colFormat: 'Formato', colCharset: 'Set caratteri', colRatio: 'Rapporto dimensioni', colUseCase: 'Usi comuni', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 car/byte (200%)', b64Ratio: '4 car/3 byte (~133%)', hexUse: 'Colori, dump memoria, hash', b64Use: 'Data URI, email, API', faq1q: 'Come convertire Base64 in hex?', faq1a: 'Prima si decodifica Base64 in byte, poi ogni byte viene convertito in rappresentazione esadecimale.', faq2q: 'Perche convertire tra Base64 e hex?', faq2a: 'Hex e piu leggibile per il debug, Base64 e piu compatto per il trasporto dati.', faq3q: 'Qual e la differenza di dimensione?', faq3a: 'Hex usa 2 caratteri per byte (200%), Base64 usa 4 caratteri per 3 byte (~133%).', crossLinks: 'Strumenti Base64 correlati', errorMsg: 'Errore di conversione.', byteCount: 'byte' },
  pt: { title: 'Conversor Base64 Hex', description: 'Converta entre Base64 e hexadecimal.', modeB64: 'Base64 para Hex', modeHex: 'Hex para Base64', inputLabelB64: 'Entrada Base64', outputLabelHex: 'Saida hexadecimal', inputLabelHex: 'Entrada hexadecimal', outputLabelB64: 'Saida Base64', inputPlaceholderB64: 'Cole a string Base64...', inputPlaceholderHex: 'Cole a string hex...', convert: 'Converter', clear: 'Limpar', uppercase: 'Hex maiusculo', separator: 'Separador espaco', intro: 'Converta entre formatos Base64 e hexadecimal com este conversor gratuito online.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Ambos representam dados binarios como texto.', colFormat: 'Formato', colCharset: 'Conjunto de caracteres', colRatio: 'Proporcao', colUseCase: 'Usos comuns', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 car/byte (200%)', b64Ratio: '4 car/3 bytes (~133%)', hexUse: 'Cores, dumps de memoria, hashes', b64Use: 'Data URI, email, API', faq1q: 'Como converter Base64 para hex?', faq1a: 'Primeiro decodifica-se Base64 em bytes, depois cada byte e convertido em representacao hexadecimal.', faq2q: 'Por que converter entre Base64 e hex?', faq2a: 'Hex e mais legivel para debug, Base64 e mais compacto para transporte de dados.', faq3q: 'Qual a diferenca de tamanho?', faq3a: 'Hex usa 2 caracteres por byte (200%), Base64 usa 4 caracteres por 3 bytes (~133%).', crossLinks: 'Ferramentas Base64 relacionadas', errorMsg: 'Erro de conversao.', byteCount: 'bytes' },
  nl: { title: 'Base64 Hex Converter', description: 'Converteer tussen Base64 en hexadecimaal.', modeB64: 'Base64 naar Hex', modeHex: 'Hex naar Base64', inputLabelB64: 'Base64 Invoer', outputLabelHex: 'Hexadecimale Uitvoer', inputLabelHex: 'Hexadecimale Invoer', outputLabelB64: 'Base64 Uitvoer', inputPlaceholderB64: 'Plak Base64-string...', inputPlaceholderHex: 'Plak hex-string...', convert: 'Converteer', clear: 'Wissen', uppercase: 'Hex hoofdletters', separator: 'Spatie-scheidingsteken', intro: 'Converteer tussen Base64 en hexadecimale formaten met deze gratis converter.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Beide zijn manieren om binaire gegevens als tekst weer te geven.', colFormat: 'Formaat', colCharset: 'Tekenset', colRatio: 'Grootteverhouding', colUseCase: 'Gebruik', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 tek/byte (200%)', b64Ratio: '4 tek/3 bytes (~133%)', hexUse: 'Kleuren, memory dumps, hashes', b64Use: 'Data URI, email, API', faq1q: 'Hoe converteer ik Base64 naar hex?', faq1a: 'Eerst wordt Base64 gedecodeerd naar bytes, dan wordt elke byte omgezet in hexadecimale representatie.', faq2q: 'Waarom converteren tussen Base64 en hex?', faq2a: 'Hex is leesbaarder voor debugging, Base64 is compacter voor datatransport.', faq3q: 'Wat is het grootteverschil?', faq3a: 'Hex gebruikt 2 tekens per byte (200%), Base64 gebruikt 4 tekens per 3 bytes (~133%).', crossLinks: 'Gerelateerde Base64 tools', errorMsg: 'Conversiefout.', byteCount: 'bytes' },
  pl: { title: 'Konwerter Base64 Hex', description: 'Konwertuj miedzy Base64 a szesnastkowym.', modeB64: 'Base64 na Hex', modeHex: 'Hex na Base64', inputLabelB64: 'Wejscie Base64', outputLabelHex: 'Wyjscie szesnastkowe', inputLabelHex: 'Wejscie szesnastkowe', outputLabelB64: 'Wyjscie Base64', inputPlaceholderB64: 'Wklej ciag Base64...', inputPlaceholderHex: 'Wklej ciag hex...', convert: 'Konwertuj', clear: 'Wyczysc', uppercase: 'Hex wielkie litery', separator: 'Separator spacji', intro: 'Konwertuj miedzy formatami Base64 i szesnastkowym za pomoca tego darmowego konwertera.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Oba reprezentuja dane binarne jako tekst.', colFormat: 'Format', colCharset: 'Zestaw znakow', colRatio: 'Proporcja rozmiaru', colUseCase: 'Zastosowania', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 zn/bajt (200%)', b64Ratio: '4 zn/3 bajty (~133%)', hexUse: 'Kolory, zrzuty pamieci, hasze', b64Use: 'Data URI, email, API', faq1q: 'Jak konwertowac Base64 na hex?', faq1a: 'Najpierw dekoduje sie Base64 do bajtow, a kazdy bajt konwertuje na reprezentacje szesnastkowa.', faq2q: 'Dlaczego konwertowac miedzy Base64 a hex?', faq2a: 'Hex jest czytelniejszy do debugowania, Base64 jest bardziej kompaktowy do transportu danych.', faq3q: 'Jaka jest roznica w rozmiarze?', faq3a: 'Hex uzywa 2 znakow na bajt (200%), Base64 uzywa 4 znakow na 3 bajty (~133%).', crossLinks: 'Powiazane narzedzia Base64', errorMsg: 'Blad konwersji.', byteCount: 'bajtow' },
  sv: { title: 'Base64 Hex Konverterare', description: 'Konvertera mellan Base64 och hexadecimal.', modeB64: 'Base64 till Hex', modeHex: 'Hex till Base64', inputLabelB64: 'Base64 Indata', outputLabelHex: 'Hexadecimal Utdata', inputLabelHex: 'Hexadecimal Indata', outputLabelB64: 'Base64 Utdata', inputPlaceholderB64: 'Klistra in Base64...', inputPlaceholderHex: 'Klistra in hex...', convert: 'Konvertera', clear: 'Rensa', uppercase: 'Versaler hex', separator: 'Blanksteg', intro: 'Konvertera mellan Base64 och hexadecimala format med denna gratis konverterare.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Bada representerar binara data som text.', colFormat: 'Format', colCharset: 'Teckenuppsattning', colRatio: 'Storleksforhallande', colUseCase: 'Anvandning', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 tecken/byte (200%)', b64Ratio: '4 tecken/3 bytes (~133%)', hexUse: 'Farger, minnesdumpar, hashar', b64Use: 'Data URI, e-post, API', faq1q: 'Hur konverterar jag Base64 till hex?', faq1a: 'Forst avkodas Base64 till bytes, sedan konverteras varje byte till hexadecimal.', faq2q: 'Varfor konvertera mellan Base64 och hex?', faq2a: 'Hex ar mer lasbart for felskning, Base64 ar mer kompakt for datatransport.', faq3q: 'Vad ar storleksskillnaden?', faq3a: 'Hex anvander 2 tecken per byte (200%), Base64 anvander 4 tecken per 3 bytes (~133%).', crossLinks: 'Relaterade Base64-verktyg', errorMsg: 'Konverteringsfel.', byteCount: 'bytes' },
  no: { title: 'Base64 Hex Konverter', description: 'Konverter mellom Base64 og heksadesimal.', modeB64: 'Base64 til Hex', modeHex: 'Hex til Base64', inputLabelB64: 'Base64 Inndata', outputLabelHex: 'Heksadesimal Utdata', inputLabelHex: 'Heksadesimal Inndata', outputLabelB64: 'Base64 Utdata', inputPlaceholderB64: 'Lim inn Base64...', inputPlaceholderHex: 'Lim inn hex...', convert: 'Konverter', clear: 'Slett', uppercase: 'Store bokstaver hex', separator: 'Mellomrom', intro: 'Konverter mellom Base64 og heksadesimale formater med denne gratis konverteren.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Begge representerer binare data som tekst.', colFormat: 'Format', colCharset: 'Tegnsett', colRatio: 'Storrelsesforhold', colUseCase: 'Bruk', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 tegn/byte (200%)', b64Ratio: '4 tegn/3 bytes (~133%)', hexUse: 'Farger, minnedumper, hasher', b64Use: 'Data URI, e-post, API', faq1q: 'Hvordan konvertere Base64 til hex?', faq1a: 'Forst dekodes Base64 til bytes, deretter konverteres hver byte til heksadesimal.', faq2q: 'Hvorfor konvertere mellom Base64 og hex?', faq2a: 'Hex er mer lesbart for feilsoking, Base64 er mer kompakt for datatransport.', faq3q: 'Hva er storrelsesforskjellen?', faq3a: 'Hex bruker 2 tegn per byte (200%), Base64 bruker 4 tegn per 3 bytes (~133%).', crossLinks: 'Relaterte Base64-verktoy', errorMsg: 'Konverteringsfeil.', byteCount: 'bytes' },
  id: { title: 'Konverter Base64 Hex', description: 'Konversi antara Base64 dan heksadesimal.', modeB64: 'Base64 ke Hex', modeHex: 'Hex ke Base64', inputLabelB64: 'Input Base64', outputLabelHex: 'Output heksadesimal', inputLabelHex: 'Input heksadesimal', outputLabelB64: 'Output Base64', inputPlaceholderB64: 'Tempel string Base64...', inputPlaceholderHex: 'Tempel string hex...', convert: 'Konversi', clear: 'Hapus', uppercase: 'Hex huruf besar', separator: 'Pemisah spasi', intro: 'Konversi antara format Base64 dan heksadesimal dengan konverter gratis ini.', cheatTitle: 'Hex vs Base64', cheatDesc: 'Keduanya merepresentasikan data biner sebagai teks.', colFormat: 'Format', colCharset: 'Set karakter', colRatio: 'Rasio ukuran', colUseCase: 'Penggunaan', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 kar/byte (200%)', b64Ratio: '4 kar/3 byte (~133%)', hexUse: 'Warna, dump memori, hash', b64Use: 'Data URI, email, API', faq1q: 'Bagaimana mengubah Base64 ke hex?', faq1a: 'Pertama decode Base64 ke byte, lalu konversi setiap byte ke representasi heksadesimal.', faq2q: 'Mengapa konversi antara Base64 dan hex?', faq2a: 'Hex lebih mudah dibaca untuk debugging, Base64 lebih kompak untuk transport data.', faq3q: 'Apa perbedaan ukurannya?', faq3a: 'Hex menggunakan 2 karakter per byte (200%), Base64 menggunakan 4 karakter per 3 byte (~133%).', crossLinks: 'Alat Base64 terkait', errorMsg: 'Error konversi.', byteCount: 'byte' },
  th: { title: 'ตัวแปลง Base64 Hex', description: 'แปลงระหว่าง Base64 และเลขฐานสิบหก', modeB64: 'Base64 เป็น Hex', modeHex: 'Hex เป็น Base64', inputLabelB64: 'อินพุต Base64', outputLabelHex: 'เอาต์พุตเลขฐานสิบหก', inputLabelHex: 'อินพุตเลขฐานสิบหก', outputLabelB64: 'เอาต์พุต Base64', inputPlaceholderB64: 'วาง Base64...', inputPlaceholderHex: 'วาง hex...', convert: 'แปลง', clear: 'ล้าง', uppercase: 'Hex ตัวพิมพ์ใหญ่', separator: 'ตัวคั่นช่องว่าง', intro: 'แปลงระหว่างรูปแบบ Base64 และเลขฐานสิบหกด้วยเครื่องมือฟรีนี้', cheatTitle: 'เปรียบเทียบ Hex vs Base64', cheatDesc: 'ทั้งสองแสดงข้อมูลไบนารีเป็นข้อความ', colFormat: 'รูปแบบ', colCharset: 'ชุดอักขระ', colRatio: 'อัตราส่วนขนาด', colUseCase: 'การใช้งาน', hexCharset: '0-9, a-f', b64Charset: 'A-Z, a-z, 0-9, +, /', hexRatio: '2 อักขระ/ไบต์ (200%)', b64Ratio: '4 อักขระ/3 ไบต์ (~133%)', hexUse: 'สี, memory dump, แฮช', b64Use: 'Data URI, อีเมล, API', faq1q: 'แปลง Base64 เป็น hex อย่างไร?', faq1a: 'ก่อนอื่นถอดรหัส Base64 เป็นไบต์ แล้วแปลงแต่ละไบต์เป็นเลขฐานสิบหก', faq2q: 'ทำไมต้องแปลงระหว่าง Base64 และ hex?', faq2a: 'Hex อ่านง่ายกว่าสำหรับการดีบัก Base64 กะทัดรัดกว่าสำหรับการขนส่งข้อมูล', faq3q: 'ขนาดต่างกันเท่าไร?', faq3a: 'Hex ใช้ 2 อักขระต่อไบต์ (200%) Base64 ใช้ 4 อักขระต่อ 3 ไบต์ (~133%)', crossLinks: 'เครื่องมือ Base64 ที่เกี่ยวข้อง', errorMsg: 'ข้อผิดพลาดในการแปลง', byteCount: 'ไบต์' },
};

export default function Base64ToHexPage() {
  const { lang } = useLang();
  const ui = t[lang] || t.en;
  const [mode, setMode] = useState<'b64tohex' | 'hextob64'>('b64tohex');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [uppercase, setUppercase] = useState(false);
  const [separator, setSeparator] = useState(false);
  const [byteCount, setByteCount] = useState(0);

  const handleConvert = () => {
    try {
      setError('');
      if (!input.trim()) { setOutput(''); setByteCount(0); return; }

      if (mode === 'b64tohex') {
        const raw = atob(input.trim());
        setByteCount(raw.length);
        let hex = Array.from(raw).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(separator ? ' ' : '');
        if (uppercase) hex = hex.toUpperCase();
        setOutput(hex);
      } else {
        const clean = input.trim().replace(/\s+/g, '').replace(/^0x/i, '');
        if (!/^[0-9a-fA-F]*$/.test(clean) || clean.length % 2 !== 0) {
          throw new Error('Invalid hex');
        }
        const bytes = clean.match(/.{1,2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join('') || '';
        setByteCount(bytes.length);
        setOutput(btoa(bytes));
      }
    } catch {
      setError(ui.errorMsg);
      setOutput('');
      setByteCount(0);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setByteCount(0);
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

  return (
    <ToolLayout title={ui.title} description={ui.description} toolId="base64-to-hex">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        {ui.intro}
      </p>

      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-input)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['b64tohex', 'hextob64'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(''); setOutput(''); setError(''); setByteCount(0); }}
            style={{
              padding: '6px 18px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === m ? 'var(--accent-blue)' : 'transparent',
              color: mode === m ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {m === 'b64tohex' ? ui.modeB64 : ui.modeHex}
          </button>
        ))}
      </div>

      {/* Options */}
      {mode === 'b64tohex' && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
            {ui.uppercase}
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={separator} onChange={e => setSeparator(e.target.checked)} />
            {ui.separator}
          </label>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleConvert} className="btn btn-primary">{ui.convert}</button>
        <button onClick={handleClear} className="btn btn-secondary">{ui.clear}</button>
        {byteCount > 0 && <span style={{ fontSize: 12, color: 'var(--text-secondary)', alignSelf: 'center' }}>{byteCount} {ui.byteCount}</span>}
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'b64tohex' ? ui.inputLabelB64 : ui.inputLabelHex}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleConvert(); }}
            placeholder={mode === 'b64tohex' ? ui.inputPlaceholderB64 : ui.inputPlaceholderHex}
            style={{ minHeight: 220 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'b64tohex' ? ui.outputLabelHex : ui.outputLabelB64}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 220, opacity: output ? 1 : 0.5, fontFamily: 'monospace' }}
          />
        </div>
      </div>

      {/* Cheat Sheet */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{ui.cheatTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{ui.cheatDesc}</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colFormat}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colCharset}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colRatio}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>{ui.colUseCase}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--accent-blue)' }}>Hexadecimal</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{ui.hexCharset}</td>
                <td style={{ padding: '8px 12px' }}>{ui.hexRatio}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{ui.hexUse}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--accent-blue)' }}>Base64</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{ui.b64Charset}</td>
                <td style={{ padding: '8px 12px' }}>{ui.b64Ratio}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{ui.b64Use}</td>
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
            { href: `/${lang}/tools/string-to-base64`, label: 'String to Base64' },
            { href: `/${lang}/tools/hex-to-decimal`, label: 'Hex to Decimal' },
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
