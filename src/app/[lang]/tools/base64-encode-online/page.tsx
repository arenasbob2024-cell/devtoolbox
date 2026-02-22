'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Base64 Encode Online',
    description: 'Encode text and files to Base64 online. Supports UTF-8, URL-safe encoding, and file uploads.',
    inputLabel: 'Text Input',
    inputPlaceholder: 'Type or paste text to encode to Base64...',
    outputLabel: 'Base64 Output',
    encodeBtn: 'Encode',
    clear: 'Clear',
    loadSample: 'Load Sample',
    urlSafe: 'URL-safe',
    lineBreaks: 'Line breaks every 76 chars',
    fileUpload: 'Or upload a file:',
    chooseFile: 'Choose File',
    charCount: 'Characters',
    outputSize: 'Output Size',
    introTitle: 'Free Online Base64 Encoder',
    introText: 'Convert any text or file into a Base64-encoded string instantly. Base64 encoding is widely used in web development for embedding images in HTML/CSS (data URIs), encoding email attachments (MIME), transmitting binary data in JSON APIs, and storing credentials in configuration files. This tool supports standard and URL-safe Base64 variants, optional line wrapping for MIME compliance, and direct file-to-Base64 conversion.',
    cheatTitle: 'Common Base64 Use Cases',
    ruleCol: 'Use Case', descCol: 'Description', exampleCol: 'Example',
    rule1: 'Data URIs', rule1Desc: 'Embed images directly in HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API Auth', rule2Desc: 'HTTP Basic Authentication header', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'Email (MIME)', rule3Desc: 'Encode email attachments', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT Tokens', rule4Desc: 'JSON Web Token payload encoding', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Config Files', rule5Desc: 'Encode secrets in .env or YAML', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Base64 encoding?',
    faq1a: 'Base64 is a binary-to-text encoding scheme that represents binary data as an ASCII string. It uses 64 characters (A-Z, a-z, 0-9, +, /) plus = for padding. Every 3 bytes of input become 4 characters of output, making the encoded string about 33% larger than the original data.',
    faq2q: 'What is URL-safe Base64?',
    faq2a: 'URL-safe Base64 replaces + with - and / with _ to avoid conflicts with URL special characters. This variant is used in JWT tokens, URL parameters, and filename-safe encoding. The padding character = may also be omitted in URL-safe mode.',
    faq3q: 'Is Base64 encoding the same as encryption?',
    faq3a: 'No, Base64 encoding is not encryption. It is a reversible encoding that anyone can decode. Never use Base64 alone to protect sensitive data. For security, use proper encryption algorithms like AES or RSA before optionally Base64-encoding the result for text transport.',
    faq4q: 'Why does Base64 increase the data size?',
    faq4a: 'Base64 maps every 3 bytes to 4 ASCII characters, resulting in approximately 33% size increase. This overhead is the trade-off for being able to safely represent binary data in text-only contexts like JSON, XML, HTML, and email protocols.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Base64 在线编码',
    description: '在线将文本和文件编码为 Base64。支持 UTF-8、URL 安全编码和文件上传。',
    inputLabel: '文本输入', inputPlaceholder: '输入或粘贴要编码为 Base64 的文本...',
    outputLabel: 'Base64 输出', encodeBtn: '编码', clear: '清除', loadSample: '加载示例',
    urlSafe: 'URL 安全', lineBreaks: '每 76 字符换行',
    fileUpload: '或上传文件：', chooseFile: '选择文件',
    charCount: '字符数', outputSize: '输出大小',
    introTitle: '免费在线 Base64 编码器',
    introText: '将任何文本或文件即时转换为 Base64 编码字符串。Base64 编码广泛用于 Web 开发中的数据 URI、API 认证、电子邮件附件和 JWT 令牌。',
    cheatTitle: '常见 Base64 用例', ruleCol: '用例', descCol: '描述', exampleCol: '示例',
    rule1: '数据 URI', rule1Desc: '在 HTML/CSS 中嵌入图片', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API 认证', rule2Desc: 'HTTP Basic 认证头', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: '邮件 (MIME)', rule3Desc: '编码邮件附件', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT 令牌', rule4Desc: 'JSON Web Token 载荷编码', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: '配置文件', rule5Desc: '在 .env 或 YAML 中编码密钥', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: '常见问题',
    faq1q: '什么是 Base64 编码？', faq1a: 'Base64 是一种将二进制数据表示为 ASCII 字符串的编码方案。它使用 64 个字符，编码后数据约增大 33%。',
    faq2q: '什么是 URL 安全 Base64？', faq2a: 'URL 安全 Base64 用 - 替换 +，用 _ 替换 /，避免与 URL 特殊字符冲突。常用于 JWT 令牌和 URL 参数。',
    faq3q: 'Base64 编码等于加密吗？', faq3a: '不是，Base64 不是加密，任何人都可以解码。不要单独使用 Base64 保护敏感数据。',
    faq4q: '为什么 Base64 会增加数据大小？', faq4a: 'Base64 将每 3 字节映射为 4 个字符，导致大约 33% 的大小增加。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Encodeur Base64 en Ligne',
    description: 'Encodez du texte et des fichiers en Base64 en ligne. Supporte UTF-8 et encodage URL-safe.',
    inputLabel: 'Texte d\'entree', inputPlaceholder: 'Tapez ou collez du texte a encoder en Base64...',
    outputLabel: 'Sortie Base64', encodeBtn: 'Encoder', clear: 'Effacer', loadSample: 'Charger un exemple',
    urlSafe: 'URL-safe', lineBreaks: 'Retours a la ligne tous les 76 car.',
    fileUpload: 'Ou telecharger un fichier :', chooseFile: 'Choisir un fichier',
    charCount: 'Caracteres', outputSize: 'Taille sortie',
    introTitle: 'Encodeur Base64 en Ligne Gratuit', introText: 'Convertissez du texte ou des fichiers en Base64 instantanement. Utilise pour les data URIs, authentification API, pieces jointes email et JWT.',
    cheatTitle: 'Cas d\'utilisation Base64', ruleCol: 'Cas', descCol: 'Description', exampleCol: 'Exemple',
    rule1: 'Data URIs', rule1Desc: 'Integrer des images dans HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'Auth API', rule2Desc: 'En-tete HTTP Basic Auth', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'Email (MIME)', rule3Desc: 'Encoder les pieces jointes', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'Jetons JWT', rule4Desc: 'Encodage du payload JWT', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Fichiers config', rule5Desc: 'Encoder les secrets dans .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que l\'encodage Base64 ?', faq1a: 'Base64 est un schema d\'encodage binaire-texte utilisant 64 caracteres ASCII. La taille augmente d\'environ 33%.',
    faq2q: 'Qu\'est-ce que Base64 URL-safe ?', faq2a: 'Base64 URL-safe remplace + par - et / par _ pour eviter les conflits URL.',
    faq3q: 'Base64 est-il du chiffrement ?', faq3a: 'Non, Base64 n\'est pas du chiffrement. Tout le monde peut le decoder.',
    faq4q: 'Pourquoi Base64 augmente la taille ?', faq4a: 'Base64 mappe 3 octets en 4 caracteres, soit environ 33% d\'augmentation.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Base64 Online Encoder',
    description: 'Text und Dateien online in Base64 kodieren. Unterstuetzt UTF-8 und URL-sichere Kodierung.',
    inputLabel: 'Texteingabe', inputPlaceholder: 'Text zum Kodieren in Base64 eingeben...',
    outputLabel: 'Base64-Ausgabe', encodeBtn: 'Kodieren', clear: 'Loeschen', loadSample: 'Beispiel laden',
    urlSafe: 'URL-sicher', lineBreaks: 'Zeilenumbruch alle 76 Zeichen',
    fileUpload: 'Oder Datei hochladen:', chooseFile: 'Datei waehlen',
    charCount: 'Zeichen', outputSize: 'Ausgabegroesse',
    introTitle: 'Kostenloser Base64 Online Encoder', introText: 'Text oder Dateien sofort in Base64 konvertieren. Verwendet fuer Data URIs, API-Authentifizierung, E-Mail und JWT.',
    cheatTitle: 'Base64 Anwendungsfaelle', ruleCol: 'Anwendung', descCol: 'Beschreibung', exampleCol: 'Beispiel',
    rule1: 'Data URIs', rule1Desc: 'Bilder in HTML/CSS einbetten', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API Auth', rule2Desc: 'HTTP Basic Auth Header', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'E-Mail (MIME)', rule3Desc: 'Anhaenge kodieren', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT Tokens', rule4Desc: 'JWT Payload-Kodierung', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Konfigdateien', rule5Desc: 'Geheimnisse in .env kodieren', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Base64-Kodierung?', faq1a: 'Base64 ist ein Binaer-zu-Text-Kodierungsschema mit 64 ASCII-Zeichen. Die Groesse steigt um etwa 33%.',
    faq2q: 'Was ist URL-sicheres Base64?', faq2a: 'URL-sicheres Base64 ersetzt + durch - und / durch _ um URL-Konflikte zu vermeiden.',
    faq3q: 'Ist Base64 Verschluesselung?', faq3a: 'Nein, Base64 ist keine Verschluesselung. Jeder kann es dekodieren.',
    faq4q: 'Warum vergroessert Base64 die Daten?', faq4a: 'Base64 bildet 3 Bytes auf 4 Zeichen ab, etwa 33% Zunahme.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Codificador Base64 en Linea',
    description: 'Codifique texto y archivos a Base64 en linea. Soporta UTF-8 y codificacion segura para URL.',
    inputLabel: 'Texto de entrada', inputPlaceholder: 'Escriba o pegue texto para codificar en Base64...',
    outputLabel: 'Salida Base64', encodeBtn: 'Codificar', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    urlSafe: 'URL-safe', lineBreaks: 'Saltos de linea cada 76 caracteres',
    fileUpload: 'O subir un archivo:', chooseFile: 'Elegir archivo',
    charCount: 'Caracteres', outputSize: 'Tamano salida',
    introTitle: 'Codificador Base64 en Linea Gratuito', introText: 'Convierta texto o archivos a Base64 al instante. Usado para data URIs, autenticacion API, email y JWT.',
    cheatTitle: 'Casos de uso Base64', ruleCol: 'Caso', descCol: 'Descripcion', exampleCol: 'Ejemplo',
    rule1: 'Data URIs', rule1Desc: 'Incrustar imagenes en HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'Auth API', rule2Desc: 'Cabecera HTTP Basic Auth', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'Email (MIME)', rule3Desc: 'Codificar adjuntos', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'Tokens JWT', rule4Desc: 'Codificacion payload JWT', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Archivos config', rule5Desc: 'Codificar secretos en .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la codificacion Base64?', faq1a: 'Base64 es un esquema de codificacion binario a texto usando 64 caracteres ASCII. El tamano aumenta aproximadamente 33%.',
    faq2q: 'Que es Base64 URL-safe?', faq2a: 'Base64 URL-safe reemplaza + por - y / por _ para evitar conflictos con URLs.',
    faq3q: 'Es Base64 lo mismo que cifrado?', faq3a: 'No, Base64 no es cifrado. Cualquiera puede decodificarlo.',
    faq4q: 'Por que Base64 aumenta el tamano?', faq4a: 'Base64 mapea 3 bytes a 4 caracteres, aproximadamente 33% mas grande.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Codificador Base64 Online',
    description: 'Codifique texto e arquivos para Base64 online. Suporta UTF-8 e codificacao segura para URL.',
    inputLabel: 'Texto de entrada', inputPlaceholder: 'Digite ou cole texto para codificar em Base64...',
    outputLabel: 'Saida Base64', encodeBtn: 'Codificar', clear: 'Limpar', loadSample: 'Carregar exemplo',
    urlSafe: 'URL-safe', lineBreaks: 'Quebras de linha a cada 76 caracteres',
    fileUpload: 'Ou envie um arquivo:', chooseFile: 'Escolher arquivo',
    charCount: 'Caracteres', outputSize: 'Tamanho saida',
    introTitle: 'Codificador Base64 Online Gratis', introText: 'Converta texto ou arquivos para Base64 instantaneamente. Usado para data URIs, autenticacao API, email e JWT.',
    cheatTitle: 'Casos de uso Base64', ruleCol: 'Caso', descCol: 'Descricao', exampleCol: 'Exemplo',
    rule1: 'Data URIs', rule1Desc: 'Embutir imagens em HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'Auth API', rule2Desc: 'Cabecalho HTTP Basic Auth', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'Email (MIME)', rule3Desc: 'Codificar anexos', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'Tokens JWT', rule4Desc: 'Codificacao payload JWT', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Arquivos config', rule5Desc: 'Codificar segredos em .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e codificacao Base64?', faq1a: 'Base64 e um esquema de codificacao binario para texto usando 64 caracteres ASCII. O tamanho aumenta cerca de 33%.',
    faq2q: 'O que e Base64 URL-safe?', faq2a: 'Base64 URL-safe substitui + por - e / por _ para evitar conflitos com URLs.',
    faq3q: 'Base64 e o mesmo que criptografia?', faq3a: 'Nao, Base64 nao e criptografia. Qualquer pessoa pode decodificar.',
    faq4q: 'Por que Base64 aumenta o tamanho?', faq4a: 'Base64 mapeia 3 bytes para 4 caracteres, aproximadamente 33% maior.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Base64 Online Encoder',
    description: 'Codeer tekst en bestanden naar Base64 online. Ondersteunt UTF-8 en URL-veilige codering.',
    inputLabel: 'Tekstinvoer', inputPlaceholder: 'Typ of plak tekst om naar Base64 te coderen...',
    outputLabel: 'Base64 Uitvoer', encodeBtn: 'Coderen', clear: 'Wissen', loadSample: 'Voorbeeld laden',
    urlSafe: 'URL-veilig', lineBreaks: 'Regelafbreking elke 76 tekens',
    fileUpload: 'Of upload een bestand:', chooseFile: 'Bestand kiezen',
    charCount: 'Tekens', outputSize: 'Uitvoergrootte',
    introTitle: 'Gratis Base64 Online Encoder', introText: 'Converteer tekst of bestanden direct naar Base64. Gebruikt voor data URIs, API-authenticatie, e-mail en JWT.',
    cheatTitle: 'Base64 Gebruiksscenario\'s', ruleCol: 'Scenario', descCol: 'Beschrijving', exampleCol: 'Voorbeeld',
    rule1: 'Data URIs', rule1Desc: 'Afbeeldingen in HTML/CSS insluiten', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API Auth', rule2Desc: 'HTTP Basic Auth header', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'E-mail (MIME)', rule3Desc: 'Bijlagen coderen', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT Tokens', rule4Desc: 'JWT payload codering', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Configuratie', rule5Desc: 'Geheimen coderen in .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is Base64-codering?', faq1a: 'Base64 is een binair-naar-tekst coderingsschema met 64 ASCII-tekens. De grootte neemt toe met ongeveer 33%.',
    faq2q: 'Wat is URL-veilig Base64?', faq2a: 'URL-veilig Base64 vervangt + door - en / door _ om URL-conflicten te voorkomen.',
    faq3q: 'Is Base64 hetzelfde als versleuteling?', faq3a: 'Nee, Base64 is geen versleuteling. Iedereen kan het decoderen.',
    faq4q: 'Waarom vergroot Base64 de gegevens?', faq4a: 'Base64 mapt 3 bytes naar 4 tekens, ongeveer 33% groter.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Koder Base64 Online',
    description: 'Koduj tekst i pliki do Base64 online. Obsluguje UTF-8 i kodowanie bezpieczne dla URL.',
    inputLabel: 'Tekst wejsciowy', inputPlaceholder: 'Wpisz lub wklej tekst do zakodowania w Base64...',
    outputLabel: 'Wyjscie Base64', encodeBtn: 'Koduj', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad',
    urlSafe: 'URL-safe', lineBreaks: 'Lamania linii co 76 znakow',
    fileUpload: 'Lub przeslij plik:', chooseFile: 'Wybierz plik',
    charCount: 'Znaki', outputSize: 'Rozmiar wyjscia',
    introTitle: 'Darmowy koder Base64 online', introText: 'Konwertuj tekst lub pliki na Base64 natychmiast. Uzywany do data URI, uwierzytelniania API, email i JWT.',
    cheatTitle: 'Przypadki uzycia Base64', ruleCol: 'Przypadek', descCol: 'Opis', exampleCol: 'Przyklad',
    rule1: 'Data URI', rule1Desc: 'Osadzanie obrazow w HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'Auth API', rule2Desc: 'Naglowek HTTP Basic Auth', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'Email (MIME)', rule3Desc: 'Kodowanie zalacznikow', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'Tokeny JWT', rule4Desc: 'Kodowanie payload JWT', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Pliki konfiguracyjne', rule5Desc: 'Kodowanie sekretow w .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest kodowanie Base64?', faq1a: 'Base64 to schemat kodowania binarnego na tekst uzywajacy 64 znakow ASCII. Rozmiar wzrasta o ok. 33%.',
    faq2q: 'Czym jest Base64 URL-safe?', faq2a: 'Base64 URL-safe zastepuje + przez - i / przez _ aby uniknac konfliktow z URL.',
    faq3q: 'Czy Base64 to szyfrowanie?', faq3a: 'Nie, Base64 to nie szyfrowanie. Kazdy moze to zdekodowac.',
    faq4q: 'Dlaczego Base64 zwieksza rozmiar?', faq4a: 'Base64 mapuje 3 bajty na 4 znaki, okolo 33% wiecej.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Base64 Online Kodare',
    description: 'Koda text och filer till Base64 online. Stoeder UTF-8 och URL-saeker kodning.',
    inputLabel: 'Textinmatning', inputPlaceholder: 'Skriv eller klistra in text att koda till Base64...',
    outputLabel: 'Base64 Utdata', encodeBtn: 'Koda', clear: 'Rensa', loadSample: 'Ladda exempel',
    urlSafe: 'URL-saeker', lineBreaks: 'Radbrytning var 76:e tecken',
    fileUpload: 'Eller ladda upp en fil:', chooseFile: 'Vaelj fil',
    charCount: 'Tecken', outputSize: 'Utdatastorlek',
    introTitle: 'Gratis Base64 Online Kodare', introText: 'Konvertera text eller filer till Base64 direkt. Anvaends foer data URIs, API-autentisering, e-post och JWT.',
    cheatTitle: 'Base64 Anvaendningsfall', ruleCol: 'Fall', descCol: 'Beskrivning', exampleCol: 'Exempel',
    rule1: 'Data URIs', rule1Desc: 'Baedda in bilder i HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API Auth', rule2Desc: 'HTTP Basic Auth header', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'E-post (MIME)', rule3Desc: 'Koda bilagor', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT Tokens', rule4Desc: 'JWT payload-kodning', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Konfigfiler', rule5Desc: 'Koda hemligheter i .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer Base64-kodning?', faq1a: 'Base64 aer ett binaer-till-text kodningsschema med 64 ASCII-tecken. Storleken oekar med cirka 33%.',
    faq2q: 'Vad aer URL-saeker Base64?', faq2a: 'URL-saeker Base64 ersaetter + med - och / med _ foer att undvika URL-konflikter.',
    faq3q: 'Aer Base64 kryptering?', faq3a: 'Nej, Base64 aer inte kryptering. Vem som helst kan avkoda det.',
    faq4q: 'Varfoer oekar Base64 storleken?', faq4a: 'Base64 mappar 3 bytes till 4 tecken, cirka 33% stoerre.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Base64 Online Koder',
    description: 'Kod tekst og filer til Base64 online. Stoetter UTF-8 og URL-sikker koding.',
    inputLabel: 'Tekstinndata', inputPlaceholder: 'Skriv eller lim inn tekst for aa kode til Base64...',
    outputLabel: 'Base64 Utdata', encodeBtn: 'Kod', clear: 'Toemme', loadSample: 'Last eksempel',
    urlSafe: 'URL-sikker', lineBreaks: 'Linjeskift hvert 76. tegn',
    fileUpload: 'Eller last opp en fil:', chooseFile: 'Velg fil',
    charCount: 'Tegn', outputSize: 'Utdatastoerrelse',
    introTitle: 'Gratis Base64 Online Koder', introText: 'Konverter tekst eller filer til Base64 umiddelbart. Brukes til data URIs, API-autentisering, e-post og JWT.',
    cheatTitle: 'Base64 Bruksomraader', ruleCol: 'Bruk', descCol: 'Beskrivelse', exampleCol: 'Eksempel',
    rule1: 'Data URIs', rule1Desc: 'Bygge inn bilder i HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API Auth', rule2Desc: 'HTTP Basic Auth header', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'E-post (MIME)', rule3Desc: 'Kode vedlegg', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT Tokens', rule4Desc: 'JWT payload-koding', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'Konfig-filer', rule5Desc: 'Kode hemmeligheter i .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Hva er Base64-koding?', faq1a: 'Base64 er et binaer-til-tekst kodingsskjema med 64 ASCII-tegn. Stoerrelsen oeker med ca. 33%.',
    faq2q: 'Hva er URL-sikker Base64?', faq2a: 'URL-sikker Base64 erstatter + med - og / med _ for aa unngaa URL-konflikter.',
    faq3q: 'Er Base64 kryptering?', faq3a: 'Nei, Base64 er ikke kryptering. Alle kan dekode det.',
    faq4q: 'Hvorfor oeker Base64 stoerrelsen?', faq4a: 'Base64 mapper 3 bytes til 4 tegn, ca. 33% stoerre.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'Base64 オンラインエンコーダー',
    description: 'テキストやファイルをオンラインで Base64 にエンコード。UTF-8、URL セーフ対応。',
    inputLabel: 'テキスト入力', inputPlaceholder: 'Base64 にエンコードするテキストを入力...',
    outputLabel: 'Base64 出力', encodeBtn: 'エンコード', clear: 'クリア', loadSample: 'サンプル読込',
    urlSafe: 'URL セーフ', lineBreaks: '76 文字ごとに改行',
    fileUpload: 'またはファイルをアップロード：', chooseFile: 'ファイル選択',
    charCount: '文字数', outputSize: '出力サイズ',
    introTitle: '無料 Base64 オンラインエンコーダー', introText: 'テキストやファイルを即座に Base64 に変換。Data URI、API 認証、メール、JWT に使用。',
    cheatTitle: 'Base64 の用途', ruleCol: '用途', descCol: '説明', exampleCol: '例',
    rule1: 'Data URI', rule1Desc: 'HTML/CSS に画像を埋め込む', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API 認証', rule2Desc: 'HTTP Basic Auth ヘッダー', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'メール (MIME)', rule3Desc: '添付ファイルのエンコード', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT トークン', rule4Desc: 'JWT ペイロードのエンコード', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: '設定ファイル', rule5Desc: '.env にシークレットをエンコード', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'よくある質問',
    faq1q: 'Base64 エンコードとは？', faq1a: 'Base64 は 64 の ASCII 文字を使用するバイナリからテキストへのエンコード方式です。サイズは約 33% 増加します。',
    faq2q: 'URL セーフ Base64 とは？', faq2a: 'URL セーフ Base64 は + を - に、/ を _ に置換して URL の衝突を回避します。',
    faq3q: 'Base64 は暗号化ですか？', faq3a: 'いいえ、Base64 は暗号化ではありません。誰でもデコードできます。',
    faq4q: 'なぜ Base64 はサイズが増えるのですか？', faq4a: 'Base64 は 3 バイトを 4 文字にマッピングし、約 33% 増加します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Base64 온라인 인코더',
    description: '텍스트와 파일을 온라인에서 Base64로 인코딩. UTF-8, URL 안전 지원.',
    inputLabel: '텍스트 입력', inputPlaceholder: 'Base64로 인코딩할 텍스트를 입력...',
    outputLabel: 'Base64 출력', encodeBtn: '인코딩', clear: '지우기', loadSample: '샘플 로드',
    urlSafe: 'URL 안전', lineBreaks: '76자마다 줄바꿈',
    fileUpload: '또는 파일 업로드:', chooseFile: '파일 선택',
    charCount: '문자 수', outputSize: '출력 크기',
    introTitle: '무료 Base64 온라인 인코더', introText: '텍스트나 파일을 즉시 Base64로 변환. Data URI, API 인증, 이메일, JWT에 사용.',
    cheatTitle: 'Base64 사용 사례', ruleCol: '사례', descCol: '설명', exampleCol: '예시',
    rule1: 'Data URI', rule1Desc: 'HTML/CSS에 이미지 삽입', rule1Ex: 'data:image/png;base64,...',
    rule2: 'API 인증', rule2Desc: 'HTTP Basic Auth 헤더', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: '이메일 (MIME)', rule3Desc: '첨부파일 인코딩', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT 토큰', rule4Desc: 'JWT 페이로드 인코딩', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: '설정 파일', rule5Desc: '.env에 시크릿 인코딩', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Base64 인코딩이란?', faq1a: 'Base64는 64개의 ASCII 문자를 사용하는 바이너리-텍스트 인코딩 방식입니다. 크기가 약 33% 증가합니다.',
    faq2q: 'URL 안전 Base64란?', faq2a: 'URL 안전 Base64는 +를 -로, /를 _로 대체하여 URL 충돌을 방지합니다.',
    faq3q: 'Base64는 암호화인가요?', faq3a: '아니요, Base64는 암호화가 아닙니다. 누구나 디코딩할 수 있습니다.',
    faq4q: '왜 Base64가 크기를 늘리나요?', faq4a: 'Base64는 3바이트를 4문자로 매핑하여 약 33% 증가합니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Encoder Base64 Online',
    description: 'Encode teks dan file ke Base64 online. Mendukung UTF-8 dan encoding URL-safe.',
    inputLabel: 'Input Teks', inputPlaceholder: 'Ketik atau tempel teks untuk di-encode ke Base64...',
    outputLabel: 'Output Base64', encodeBtn: 'Encode', clear: 'Hapus', loadSample: 'Muat Contoh',
    urlSafe: 'URL-safe', lineBreaks: 'Baris baru setiap 76 karakter',
    fileUpload: 'Atau unggah file:', chooseFile: 'Pilih File',
    charCount: 'Karakter', outputSize: 'Ukuran output',
    introTitle: 'Encoder Base64 Online Gratis', introText: 'Konversi teks atau file ke Base64 secara instan. Digunakan untuk data URI, autentikasi API, email, dan JWT.',
    cheatTitle: 'Kasus Penggunaan Base64', ruleCol: 'Kasus', descCol: 'Deskripsi', exampleCol: 'Contoh',
    rule1: 'Data URI', rule1Desc: 'Sisipkan gambar di HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'Auth API', rule2Desc: 'Header HTTP Basic Auth', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'Email (MIME)', rule3Desc: 'Encode lampiran', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'Token JWT', rule4Desc: 'Encoding payload JWT', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'File Konfigurasi', rule5Desc: 'Encode rahasia di .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Apa itu encoding Base64?', faq1a: 'Base64 adalah skema encoding biner-ke-teks menggunakan 64 karakter ASCII. Ukuran meningkat sekitar 33%.',
    faq2q: 'Apa itu Base64 URL-safe?', faq2a: 'Base64 URL-safe mengganti + dengan - dan / dengan _ untuk menghindari konflik URL.',
    faq3q: 'Apakah Base64 sama dengan enkripsi?', faq3a: 'Tidak, Base64 bukan enkripsi. Siapa pun dapat mendekodenya.',
    faq4q: 'Mengapa Base64 meningkatkan ukuran?', faq4a: 'Base64 memetakan 3 byte ke 4 karakter, sekitar 33% lebih besar.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เข้ารหัส Base64 ออนไลน์',
    description: 'เข้ารหัสข้อความและไฟล์เป็น Base64 ออนไลน์ รองรับ UTF-8 และ URL-safe',
    inputLabel: 'ข้อความนำเข้า', inputPlaceholder: 'พิมพ์หรือวางข้อความเพื่อเข้ารหัสเป็น Base64...',
    outputLabel: 'ผลลัพธ์ Base64', encodeBtn: 'เข้ารหัส', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง',
    urlSafe: 'URL-safe', lineBreaks: 'ขึ้นบรรทัดใหม่ทุก 76 ตัวอักษร',
    fileUpload: 'หรืออัปโหลดไฟล์:', chooseFile: 'เลือกไฟล์',
    charCount: 'ตัวอักษร', outputSize: 'ขนาดผลลัพธ์',
    introTitle: 'เข้ารหัส Base64 ออนไลน์ฟรี', introText: 'แปลงข้อความหรือไฟล์เป็น Base64 ทันที ใช้สำหรับ data URI, การยืนยันตัวตน API, อีเมล และ JWT',
    cheatTitle: 'กรณีใช้งาน Base64', ruleCol: 'กรณี', descCol: 'คำอธิบาย', exampleCol: 'ตัวอย่าง',
    rule1: 'Data URI', rule1Desc: 'ฝังรูปภาพใน HTML/CSS', rule1Ex: 'data:image/png;base64,...',
    rule2: 'Auth API', rule2Desc: 'HTTP Basic Auth header', rule2Ex: 'Authorization: Basic dXNlcjpwYXNz',
    rule3: 'อีเมล (MIME)', rule3Desc: 'เข้ารหัสไฟล์แนบ', rule3Ex: 'Content-Transfer-Encoding: base64',
    rule4: 'JWT Tokens', rule4Desc: 'เข้ารหัส JWT payload', rule4Ex: 'eyJhbGciOiJIUzI1NiJ9...',
    rule5: 'ไฟล์ตั้งค่า', rule5Desc: 'เข้ารหัสความลับใน .env', rule5Ex: 'password: cGFzc3dvcmQ=',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การเข้ารหัส Base64 คืออะไร?', faq1a: 'Base64 คือรูปแบบการเข้ารหัสไบนารีเป็นข้อความโดยใช้ 64 ตัวอักษร ASCII ขนาดเพิ่มขึ้นประมาณ 33%',
    faq2q: 'Base64 URL-safe คืออะไร?', faq2a: 'Base64 URL-safe แทนที่ + ด้วย - และ / ด้วย _ เพื่อหลีกเลี่ยงปัญหา URL',
    faq3q: 'Base64 เป็นการเข้ารหัสลับหรือไม่?', faq3a: 'ไม่ Base64 ไม่ใช่การเข้ารหัสลับ ใครก็สามารถถอดรหัสได้',
    faq4q: 'ทำไม Base64 ถึงเพิ่มขนาด?', faq4a: 'Base64 แมป 3 ไบต์เป็น 4 ตัวอักษร เพิ่มขึ้นประมาณ 33%',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const SAMPLE_TEXT = 'Hello, World! This is a Base64 encoding example. 你好世界！';

export default function Base64EncodeOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [lineBreaks, setLineBreaks] = useState(false);

  const encode = useCallback(() => {
    if (!input.trim()) { setOutput(''); return; }
    try {
      // Encode to UTF-8 then Base64
      const encoder = new TextEncoder();
      const bytes = encoder.encode(input);
      let binary = '';
      bytes.forEach(b => { binary += String.fromCharCode(b); });
      let result = btoa(binary);

      if (urlSafe) {
        result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }

      if (lineBreaks) {
        result = result.replace(/(.{76})/g, '$1\n');
      }

      setOutput(result);
    } catch {
      setOutput('Error: Unable to encode input');
    }
  }, [input, urlSafe, lineBreaks]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // dataURL is "data:mime;base64,AAAA"
      const base64Part = result.split(',')[1] || '';
      let encoded = base64Part;
      if (urlSafe) {
        encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }
      if (lineBreaks) {
        encoded = encoded.replace(/(.{76})/g, '$1\n');
      }
      setOutput(encoded);
      setInput(`[File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]`);
    };
    reader.readAsDataURL(file);
  };

  const outputSize = output.length > 0 ? `${(output.length / 1024).toFixed(1)} KB` : '0 KB';

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
    <ToolLayout title={t.title} description={t.description} toolId="base64-encode-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Options */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={urlSafe} onChange={e => setUrlSafe(e.target.checked)} />
          {t.urlSafe}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={lineBreaks} onChange={e => setLineBreaks(e.target.checked)} />
          {t.lineBreaks}
        </label>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={encode} className="btn btn-primary">{t.encodeBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={() => { setInput(SAMPLE_TEXT); setOutput(''); }} className="btn btn-secondary">{t.loadSample}</button>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 120 }} />
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
          {t.charCount}: {input.length}
        </div>
      </div>

      {/* File upload */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.fileUpload}</label>
        <input type="file" onChange={handleFileUpload} style={{ fontSize: 13 }} />
      </div>

      {/* Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea value={output} readOnly style={{ minHeight: 120, fontFamily: 'monospace', fontSize: 13 }} />
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
          {t.outputSize}: {outputSize}
        </div>
      </div>

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
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{d}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{e}</td>
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
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/base64-decoder-online`, label: 'Base64 Decoder Online' },
            { href: `/${lang}/tools/base64-to-image`, label: 'Base64 to Image' },
            { href: `/${lang}/tools/image-to-base64`, label: 'Image to Base64' },
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
