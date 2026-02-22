'use client';

import { useState, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'String Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text input. Instant results using Web Crypto API.',
    inputLabel: 'Input Text',
    inputPlaceholder: 'Type or paste text to hash...',
    hashBtn: 'Generate Hashes',
    clearBtn: 'Clear',
    copyAll: 'Copy All',
    autoHash: 'Auto-hash',
    encoding: 'Encoding',
    hex: 'Hexadecimal',
    base64: 'Base64',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    compareMode: 'Compare Mode',
    compareLabel: 'Compare Hash',
    comparePlaceholder: 'Paste hash to compare...',
    match: 'Match',
    noMatch: 'No Match',
    charCount: 'characters',
    md5Note: 'Note: MD5 is not available in the Web Crypto API. A pure-JS fallback is used for MD5.',
    noInput: 'Enter some text above to generate hashes.',
    introTitle: 'Free Online Cryptographic Hash Generator',
    introText: 'Generate secure cryptographic hashes from any string instantly. Supports MD5 (via JS fallback), SHA-1, SHA-256, and SHA-512 algorithms. All computation happens locally in your browser using the Web Crypto API — your data is never sent to any server. Ideal for verifying file integrity, storing passwords, generating checksums, and learning about hash functions.',
    useCaseTitle: 'Common Use Cases',
    useCase1: 'Verify file integrity by comparing checksums',
    useCase2: 'Create database password hashes (use SHA-256 or bcrypt in production)',
    useCase3: 'Generate cache keys or unique identifiers',
    useCase4: 'Validate API signatures and tokens',
    useCase5: 'Learn and compare different hash algorithms',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cryptographic hash function?',
    faq1a: 'A cryptographic hash function is a mathematical algorithm that transforms input data of any size into a fixed-length output called a "hash" or "digest". The same input always produces the same hash, small changes in input produce completely different hashes (avalanche effect), and it is computationally infeasible to reverse the process to recover the original input from the hash.',
    faq2q: 'What is the difference between MD5, SHA-1, SHA-256, and SHA-512?',
    faq2a: 'MD5 produces a 128-bit (32-character hex) hash and is considered cryptographically broken for security use but still useful for checksums. SHA-1 produces 160 bits (40 hex chars) and is deprecated for security. SHA-256 (part of SHA-2 family) produces 256 bits (64 hex chars) and is currently secure. SHA-512 produces 512 bits (128 hex chars) and offers the highest security level of these four.',
    faq3q: 'Are hashes reversible?',
    faq3a: 'No. Hash functions are one-way: given a hash, you cannot mathematically recover the original input. However, dictionary attacks and rainbow tables can crack weak or common passwords. Always use salted hashing (like bcrypt or Argon2) for storing passwords in production systems.',
    faq4q: 'Is my data safe to hash here?',
    faq4a: 'Yes. All hashing is performed entirely in your browser using the built-in Web Crypto API. No data is transmitted to any server. You can verify this by disconnecting from the internet and the tool will still work perfectly.',
    faq5q: 'Why does my MD5 result differ from other tools?',
    faq5a: 'MD5 is not available in the Web Crypto API, so this tool uses a pure JavaScript implementation. Results may occasionally differ from other tools if they use different text encoding. This tool uses UTF-8 encoding by default, which is the most common standard.',
    relatedTitle: 'Related Security Tools',
  },
  zh: {
    title: '字符串哈希生成器',
    description: '从任何文本输入生成 MD5、SHA-1、SHA-256 和 SHA-512 加密哈希值。使用 Web Crypto API 即时输出结果。',
    inputLabel: '输入文本',
    inputPlaceholder: '输入或粘贴要哈希的文本...',
    hashBtn: '生成哈希',
    clearBtn: '清除',
    copyAll: '复制全部',
    autoHash: '自动哈希',
    encoding: '编码',
    hex: '十六进制',
    base64: 'Base64',
    uppercase: '大写',
    lowercase: '小写',
    compareMode: '比较模式',
    compareLabel: '比较哈希',
    comparePlaceholder: '粘贴要比较的哈希...',
    match: '匹配',
    noMatch: '不匹配',
    charCount: '个字符',
    md5Note: '注：Web Crypto API 不支持 MD5，使用纯 JS 实现。',
    noInput: '请在上方输入文本以生成哈希值。',
    introTitle: '免费在线加密哈希生成器',
    introText: '即时从任何字符串生成安全的加密哈希值。支持 MD5（JS 实现）、SHA-1、SHA-256 和 SHA-512 算法。所有计算在浏览器本地使用 Web Crypto API 完成，您的数据不会发送到任何服务器。',
    useCaseTitle: '常见使用场景',
    useCase1: '通过比较校验和验证文件完整性',
    useCase2: '创建数据库密码哈希（生产环境请使用 bcrypt）',
    useCase3: '生成缓存键或唯一标识符',
    useCase4: '验证 API 签名和令牌',
    useCase5: '学习和比较不同的哈希算法',
    faqTitle: '常见问题',
    faq1q: '什么是加密哈希函数？', faq1a: '加密哈希函数是将任意大小的输入数据转换为固定长度输出（哈希值）的数学算法。相同输入始终产生相同哈希，输入微小改变会产生完全不同的哈希，且从哈希值反推原始输入在计算上不可行。',
    faq2q: 'MD5、SHA-1、SHA-256 和 SHA-512 有什么区别？', faq2a: 'MD5 生成 128 位哈希，已被认为不安全，但仍用于校验和。SHA-1 生成 160 位，已弃用。SHA-256（SHA-2 家族）生成 256 位，目前安全。SHA-512 生成 512 位，安全级别最高。',
    faq3q: '哈希值可以逆向还原吗？', faq3a: '不能。哈希函数是单向的。但字典攻击和彩虹表可以破解弱密码。生产环境存储密码请使用加盐哈希（如 bcrypt 或 Argon2）。',
    faq4q: '在这里哈希我的数据安全吗？', faq4a: '安全。所有哈希计算完全在浏览器中使用内置 Web Crypto API 完成，不会向任何服务器传输数据。',
    faq5q: '为什么 MD5 结果与其他工具不同？', faq5a: 'MD5 在 Web Crypto API 中不可用，本工具使用纯 JavaScript 实现。本工具默认使用 UTF-8 编码。',
    relatedTitle: '相关安全工具',
  },
  fr: {
    title: 'Generateur de Hash de Chaine',
    description: 'Generez des hachages MD5, SHA-1, SHA-256 et SHA-512 a partir de n\'importe quelle entree textuelle.',
    inputLabel: 'Texte d\'entree', inputPlaceholder: 'Tapez ou collez le texte a hacher...',
    hashBtn: 'Generer les hachages', clearBtn: 'Effacer', copyAll: 'Tout copier',
    autoHash: 'Auto-hachage', encoding: 'Encodage', hex: 'Hexadecimal', base64: 'Base64',
    uppercase: 'Majuscules', lowercase: 'Minuscules', compareMode: 'Mode comparaison',
    compareLabel: 'Comparer le hachage', comparePlaceholder: 'Collez le hachage a comparer...',
    match: 'Correspondance', noMatch: 'Pas de correspondance', charCount: 'caracteres',
    md5Note: 'Note : MD5 n\'est pas disponible dans l\'API Web Crypto. Un fallback JS est utilise.',
    noInput: 'Entrez du texte ci-dessus pour generer des hachages.',
    introTitle: 'Generateur de hash cryptographique gratuit en ligne',
    introText: 'Generez des hachages cryptographiques securises a partir de n\'importe quelle chaine instantanement. Tout le calcul se fait localement dans votre navigateur.',
    useCaseTitle: 'Cas d\'utilisation courants', useCase1: 'Verifier l\'integrite des fichiers', useCase2: 'Creer des hachages de mots de passe', useCase3: 'Generer des cles de cache', useCase4: 'Valider les signatures API', useCase5: 'Apprendre les algorithmes de hachage',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'une fonction de hachage cryptographique?', faq1a: 'Une fonction de hachage cryptographique est un algorithme qui transforme des donnees d\'entree en une sortie de longueur fixe appelee "hachage".',
    faq2q: 'Quelle est la difference entre MD5, SHA-1, SHA-256 et SHA-512?', faq2a: 'MD5 produit 128 bits, SHA-1 160 bits, SHA-256 256 bits et SHA-512 512 bits. MD5 et SHA-1 sont deconseilles pour la securite.',
    faq3q: 'Les hachages sont-ils reversibles?', faq3a: 'Non. Les fonctions de hachage sont unidirectionnelles.',
    faq4q: 'Mes donnees sont-elles en securite ici?', faq4a: 'Oui. Tout le hachage est effectue localement dans votre navigateur.',
    faq5q: 'Pourquoi mon resultat MD5 differe-t-il?', faq5a: 'MD5 n\'est pas disponible dans l\'API Web Crypto, un fallback JavaScript est utilise.',
    relatedTitle: 'Outils de securite connexes',
  },
  de: {
    title: 'String-Hash-Generator',
    description: 'MD5-, SHA-1-, SHA-256- und SHA-512-Hashes aus beliebigem Text erzeugen. Sofortige Ergebnisse mit der Web Crypto API.',
    inputLabel: 'Eingabetext', inputPlaceholder: 'Text zum Hashen eingeben oder einfuegen...',
    hashBtn: 'Hashes erzeugen', clearBtn: 'Loeschen', copyAll: 'Alles kopieren',
    autoHash: 'Auto-Hash', encoding: 'Kodierung', hex: 'Hexadezimal', base64: 'Base64',
    uppercase: 'Grossbuchstaben', lowercase: 'Kleinbuchstaben', compareMode: 'Vergleichsmodus',
    compareLabel: 'Hash vergleichen', comparePlaceholder: 'Hash zum Vergleichen einfuegen...',
    match: 'Uebereinstimmung', noMatch: 'Keine Uebereinstimmung', charCount: 'Zeichen',
    md5Note: 'Hinweis: MD5 ist in der Web Crypto API nicht verfuegbar. Ein JS-Fallback wird verwendet.',
    noInput: 'Geben Sie oben Text ein, um Hashes zu erzeugen.',
    introTitle: 'Kostenloser Online-Kryptografischer Hash-Generator',
    introText: 'Erzeugen Sie sichere kryptografische Hashes aus beliebigen Strings sofort. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    useCaseTitle: 'Haeufige Anwendungsfaelle', useCase1: 'Dateiintegritaet durch Checksummenvergleich pruefen', useCase2: 'Datenbank-Passworte hashen', useCase3: 'Cache-Schlussel generieren', useCase4: 'API-Signaturen validieren', useCase5: 'Verschiedene Hash-Algorithmen vergleichen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist eine kryptografische Hash-Funktion?', faq1a: 'Eine kryptografische Hash-Funktion ist ein Algorithmus, der Eingabedaten beliebiger Groesse in eine Ausgabe fester Laenge umwandelt.',
    faq2q: 'Was ist der Unterschied zwischen MD5, SHA-1, SHA-256 und SHA-512?', faq2a: 'MD5 erzeugt 128 Bit, SHA-1 160 Bit, SHA-256 256 Bit und SHA-512 512 Bit. MD5 und SHA-1 sind fuer Sicherheitszwecke veraltet.',
    faq3q: 'Sind Hashes umkehrbar?', faq3a: 'Nein. Hash-Funktionen sind Einwegfunktionen.',
    faq4q: 'Sind meine Daten hier sicher?', faq4a: 'Ja. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    faq5q: 'Warum weicht mein MD5-Ergebnis ab?', faq5a: 'MD5 ist in der Web Crypto API nicht verfuegbar, daher wird ein JavaScript-Fallback verwendet.',
    relatedTitle: 'Verwandte Sicherheitstools',
  },
  it: {
    title: 'Generatore di Hash di Stringa',
    description: 'Genera hash MD5, SHA-1, SHA-256 e SHA-512 da qualsiasi input di testo.',
    inputLabel: 'Testo di input', inputPlaceholder: 'Scrivi o incolla testo da hashare...',
    hashBtn: 'Genera hash', clearBtn: 'Cancella', copyAll: 'Copia tutto',
    autoHash: 'Auto-hash', encoding: 'Codifica', hex: 'Esadecimale', base64: 'Base64',
    uppercase: 'Maiuscolo', lowercase: 'Minuscolo', compareMode: 'Modalita confronto',
    compareLabel: 'Confronta hash', comparePlaceholder: 'Incolla hash da confrontare...',
    match: 'Corrispondenza', noMatch: 'Nessuna corrispondenza', charCount: 'caratteri',
    md5Note: 'Nota: MD5 non e disponibile nell\'API Web Crypto. Viene usato un fallback JS.',
    noInput: 'Inserisci del testo sopra per generare hash.',
    introTitle: 'Generatore di hash crittografico gratuito online',
    introText: 'Genera hash crittografici sicuri da qualsiasi stringa istantaneamente. Tutti i calcoli vengono eseguiti localmente nel browser.',
    useCaseTitle: 'Casi d\'uso comuni', useCase1: 'Verificare l\'integrita dei file', useCase2: 'Creare hash di password', useCase3: 'Generare chiavi di cache', useCase4: 'Validare le firme API', useCase5: 'Confrontare diversi algoritmi',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e una funzione hash crittografica?', faq1a: 'Una funzione hash crittografica e un algoritmo che trasforma dati di input in un output a lunghezza fissa chiamato "hash".',
    faq2q: 'Qual e la differenza tra MD5, SHA-1, SHA-256 e SHA-512?', faq2a: 'MD5 produce 128 bit, SHA-1 160 bit, SHA-256 256 bit e SHA-512 512 bit. MD5 e SHA-1 sono sconsigliati per la sicurezza.',
    faq3q: 'Gli hash sono reversibili?', faq3a: 'No. Le funzioni hash sono unidirezionali.',
    faq4q: 'I miei dati sono al sicuro qui?', faq4a: 'Si. Tutto l\'hashing viene eseguito localmente nel browser.',
    faq5q: 'Perche il mio risultato MD5 e diverso?', faq5a: 'MD5 non e disponibile nell\'API Web Crypto, quindi viene utilizzato un fallback JavaScript.',
    relatedTitle: 'Strumenti di sicurezza correlati',
  },
  es: {
    title: 'Generador de Hash de Cadena',
    description: 'Genere hashes MD5, SHA-1, SHA-256 y SHA-512 desde cualquier entrada de texto.',
    inputLabel: 'Texto de entrada', inputPlaceholder: 'Escriba o pegue texto para hacer hash...',
    hashBtn: 'Generar hashes', clearBtn: 'Limpiar', copyAll: 'Copiar todo',
    autoHash: 'Auto-hash', encoding: 'Codificacion', hex: 'Hexadecimal', base64: 'Base64',
    uppercase: 'Mayusculas', lowercase: 'Minusculas', compareMode: 'Modo comparacion',
    compareLabel: 'Comparar hash', comparePlaceholder: 'Pegue hash para comparar...',
    match: 'Coincide', noMatch: 'No coincide', charCount: 'caracteres',
    md5Note: 'Nota: MD5 no esta disponible en la API Web Crypto. Se usa un fallback de JS.',
    noInput: 'Ingrese texto arriba para generar hashes.',
    introTitle: 'Generador de hash criptografico gratuito en linea',
    introText: 'Genere hashes criptograficos seguros de cualquier cadena al instante. Todo el calculo ocurre localmente en su navegador.',
    useCaseTitle: 'Casos de uso comunes', useCase1: 'Verificar integridad de archivos', useCase2: 'Crear hashes de contrasenas', useCase3: 'Generar claves de cache', useCase4: 'Validar firmas de API', useCase5: 'Comparar diferentes algoritmos',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una funcion hash criptografica?', faq1a: 'Una funcion hash criptografica es un algoritmo que transforma datos de entrada en una salida de longitud fija llamada "hash".',
    faq2q: 'Cual es la diferencia entre MD5, SHA-1, SHA-256 y SHA-512?', faq2a: 'MD5 produce 128 bits, SHA-1 160 bits, SHA-256 256 bits y SHA-512 512 bits. MD5 y SHA-1 estan desaconsejados para seguridad.',
    faq3q: 'Son reversibles los hashes?', faq3a: 'No. Las funciones hash son unidireccionales.',
    faq4q: 'Estan seguros mis datos aqui?', faq4a: 'Si. Todo el hash se realiza localmente en su navegador.',
    faq5q: 'Por que difiere mi resultado MD5?', faq5a: 'MD5 no esta disponible en la API Web Crypto, se usa un fallback de JavaScript.',
    relatedTitle: 'Herramientas de seguridad relacionadas',
  },
  pt: {
    title: 'Gerador de Hash de String',
    description: 'Gere hashes MD5, SHA-1, SHA-256 e SHA-512 a partir de qualquer entrada de texto.',
    inputLabel: 'Texto de entrada', inputPlaceholder: 'Digite ou cole texto para fazer hash...',
    hashBtn: 'Gerar hashes', clearBtn: 'Limpar', copyAll: 'Copiar tudo',
    autoHash: 'Auto-hash', encoding: 'Codificacao', hex: 'Hexadecimal', base64: 'Base64',
    uppercase: 'Maiusculas', lowercase: 'Minusculas', compareMode: 'Modo comparacao',
    compareLabel: 'Comparar hash', comparePlaceholder: 'Cole hash para comparar...',
    match: 'Corresponde', noMatch: 'Nao corresponde', charCount: 'caracteres',
    md5Note: 'Nota: MD5 nao esta disponivel na Web Crypto API. Um fallback JS e usado.',
    noInput: 'Insira texto acima para gerar hashes.',
    introTitle: 'Gerador de hash criptografico gratuito online',
    introText: 'Gere hashes criptograficos seguros de qualquer string instantaneamente. Todo o calculo ocorre localmente no seu navegador.',
    useCaseTitle: 'Casos de uso comuns', useCase1: 'Verificar integridade de arquivos', useCase2: 'Criar hashes de senhas', useCase3: 'Gerar chaves de cache', useCase4: 'Validar assinaturas de API', useCase5: 'Comparar diferentes algoritmos',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e uma funcao hash criptografica?', faq1a: 'Uma funcao hash criptografica e um algoritmo que transforma dados de entrada em uma saida de comprimento fixo chamada "hash".',
    faq2q: 'Qual a diferenca entre MD5, SHA-1, SHA-256 e SHA-512?', faq2a: 'MD5 produz 128 bits, SHA-1 160 bits, SHA-256 256 bits e SHA-512 512 bits. MD5 e SHA-1 sao desaconselhados para seguranca.',
    faq3q: 'Os hashes sao reversiveis?', faq3a: 'Nao. As funcoes hash sao unidirecionais.',
    faq4q: 'Meus dados estao seguros aqui?', faq4a: 'Sim. Todo o hash e feito localmente no seu navegador.',
    faq5q: 'Por que meu resultado MD5 difere?', faq5a: 'MD5 nao esta disponivel na Web Crypto API, entao um fallback JavaScript e usado.',
    relatedTitle: 'Ferramentas de seguranca relacionadas',
  },
  nl: {
    title: 'String Hash Generator',
    description: 'Genereer MD5-, SHA-1-, SHA-256- en SHA-512-hashes van elke tekstinvoer.',
    inputLabel: 'Invoertekst', inputPlaceholder: 'Typ of plak tekst om te hashen...',
    hashBtn: 'Genereer hashes', clearBtn: 'Wissen', copyAll: 'Alles kopieren',
    autoHash: 'Auto-hash', encoding: 'Codering', hex: 'Hexadecimaal', base64: 'Base64',
    uppercase: 'Hoofdletters', lowercase: 'Kleine letters', compareMode: 'Vergelijkingsmodus',
    compareLabel: 'Hash vergelijken', comparePlaceholder: 'Plak hash om te vergelijken...',
    match: 'Overeenkomst', noMatch: 'Geen overeenkomst', charCount: 'tekens',
    md5Note: 'Opmerking: MD5 is niet beschikbaar in de Web Crypto API. Een JS-fallback wordt gebruikt.',
    noInput: 'Voer hierboven tekst in om hashes te genereren.',
    introTitle: 'Gratis online cryptografische hashgenerator',
    introText: 'Genereer veilige cryptografische hashes van elke string direct. Alle berekeningen worden lokaal in uw browser uitgevoerd.',
    useCaseTitle: 'Veelvoorkomende gebruikscases', useCase1: 'Bestandsintegriteit verifiëren', useCase2: 'Wachtwoordhashes maken', useCase3: 'Cachesleutels genereren', useCase4: 'API-handtekeningen valideren', useCase5: 'Verschillende hashalgoritmen vergelijken',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is een cryptografische hashfunctie?', faq1a: 'Een cryptografische hashfunctie is een algoritme dat invoergegevens omzet in een uitvoer van vaste lengte.',
    faq2q: 'Wat is het verschil tussen MD5, SHA-1, SHA-256 en SHA-512?', faq2a: 'MD5 produceert 128 bits, SHA-1 160 bits, SHA-256 256 bits en SHA-512 512 bits.',
    faq3q: 'Zijn hashes omkeerbaar?', faq3a: 'Nee. Hashfuncties zijn eenrichtingsfuncties.',
    faq4q: 'Zijn mijn gegevens hier veilig?', faq4a: 'Ja. Alle hashing wordt lokaal in uw browser uitgevoerd.',
    faq5q: 'Waarom wijkt mijn MD5-resultaat af?', faq5a: 'MD5 is niet beschikbaar in de Web Crypto API, dus een JavaScript-fallback wordt gebruikt.',
    relatedTitle: 'Gerelateerde beveiligingstools',
  },
  pl: {
    title: 'Generator Hashu Ciagu Znakow',
    description: 'Generuj hasze MD5, SHA-1, SHA-256 i SHA-512 z dowolnego tekstu wejsciowego.',
    inputLabel: 'Tekst wejsciowy', inputPlaceholder: 'Wpisz lub wklej tekst do zahaszowania...',
    hashBtn: 'Generuj hasze', clearBtn: 'Wyczysc', copyAll: 'Kopiuj wszystko',
    autoHash: 'Auto-hash', encoding: 'Kodowanie', hex: 'Szesnastkowy', base64: 'Base64',
    uppercase: 'Wielkie litery', lowercase: 'Male litery', compareMode: 'Tryb porownania',
    compareLabel: 'Porownaj hash', comparePlaceholder: 'Wklej hash do porownania...',
    match: 'Zgodnosc', noMatch: 'Brak zgodnosci', charCount: 'znakow',
    md5Note: 'Uwaga: MD5 nie jest dostepny w Web Crypto API. Uzywany jest fallback JS.',
    noInput: 'Wpisz tekst powyzej, aby wygenerowac hasze.',
    introTitle: 'Darmowy generator kryptograficznych haszy online',
    introText: 'Generuj bezpieczne hasze kryptograficzne z dowolnego ciagu znakow. Wszystkie obliczenia odbywaja sie lokalnie w przegladarce.',
    useCaseTitle: 'Czeste przypadki uzycia', useCase1: 'Weryfikacja integralnosci plikow', useCase2: 'Tworzenie haszy hasel', useCase3: 'Generowanie kluczy cache', useCase4: 'Walidacja sygnatur API', useCase5: 'Porownanie roznych algorytmow',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest kryptograficzna funkcja skrotu?', faq1a: 'Kryptograficzna funkcja skrotu to algorytm przeksztalcajacy dane wejsciowe w wynik o stalej dlugosci zwany "hashem".',
    faq2q: 'Jaka jest roznica miedzy MD5, SHA-1, SHA-256 i SHA-512?', faq2a: 'MD5 generuje 128 bitow, SHA-1 160 bitow, SHA-256 256 bitow, a SHA-512 512 bitow.',
    faq3q: 'Czy hasze sa odwracalne?', faq3a: 'Nie. Funkcje skrotu sa jednokierunkowe.',
    faq4q: 'Czy moje dane sa tutaj bezpieczne?', faq4a: 'Tak. Wszystkie obliczenia odbywaja sie lokalnie w przegladarce.',
    faq5q: 'Dlaczego wynik MD5 sie rozni?', faq5a: 'MD5 nie jest dostepny w Web Crypto API, wiec uzywany jest fallback JavaScript.',
    relatedTitle: 'Powiazane narzedzia bezpieczenstwa',
  },
  sv: {
    title: 'String Hash Generator',
    description: 'Generera MD5-, SHA-1-, SHA-256- och SHA-512-hashar fran valfri textinmatning.',
    inputLabel: 'Inmatningstext', inputPlaceholder: 'Skriv eller klistra in text att hasha...',
    hashBtn: 'Generera hashar', clearBtn: 'Rensa', copyAll: 'Kopiera allt',
    autoHash: 'Auto-hash', encoding: 'Kodning', hex: 'Hexadecimal', base64: 'Base64',
    uppercase: 'Versaler', lowercase: 'Gemener', compareMode: 'Jamforelseslage',
    compareLabel: 'Jamfor hash', comparePlaceholder: 'Klistra in hash for jamforelse...',
    match: 'Matchar', noMatch: 'Matchar inte', charCount: 'tecken',
    md5Note: 'OBS: MD5 ar inte tillganglig i Web Crypto API. En JS-fallback anvands.',
    noInput: 'Ange text ovan for att generera hashar.',
    introTitle: 'Gratis online kryptografisk hashgenerator',
    introText: 'Generera sakra kryptografiska hashar fran valfri strang direkt. Alla berakningar sker lokalt i din webblasare.',
    useCaseTitle: 'Vanliga anvandningsfall', useCase1: 'Verifiera filintegritet', useCase2: 'Skapa losenordshashar', useCase3: 'Generera cachenycklar', useCase4: 'Validera API-signaturer', useCase5: 'Jamfora olika hashalgoritmer',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad ar en kryptografisk hashfunktion?', faq1a: 'En kryptografisk hashfunktion ar en algoritm som omvandlar indata till ett utdata med fast langd kallat "hash".',
    faq2q: 'Vad ar skillnaden mellan MD5, SHA-1, SHA-256 och SHA-512?', faq2a: 'MD5 producerar 128 bitar, SHA-1 160 bitar, SHA-256 256 bitar och SHA-512 512 bitar.',
    faq3q: 'Ar hashar reversibla?', faq3a: 'Nej. Hashfunktioner ar envagsfunktioner.',
    faq4q: 'Ar mina uppgifter sakra har?', faq4a: 'Ja. All hashning utfors lokalt i din webblasare.',
    faq5q: 'Varfor skiljer sig mitt MD5-resultat?', faq5a: 'MD5 ar inte tillganglig i Web Crypto API, darfor anvands en JavaScript-fallback.',
    relatedTitle: 'Relaterade sakerhetsverktyg',
  },
  no: {
    title: 'String Hash Generator',
    description: 'Generer MD5-, SHA-1-, SHA-256- og SHA-512-hasher fra enhver tekstinndata.',
    inputLabel: 'Inndatatekst', inputPlaceholder: 'Skriv eller lim inn tekst som skal hashes...',
    hashBtn: 'Generer hasher', clearBtn: 'Toem', copyAll: 'Kopier alt',
    autoHash: 'Auto-hash', encoding: 'Koding', hex: 'Heksadesimal', base64: 'Base64',
    uppercase: 'Store bokstaver', lowercase: 'Sma bokstaver', compareMode: 'Sammenligningsmode',
    compareLabel: 'Sammenlign hash', comparePlaceholder: 'Lim inn hash for sammenligning...',
    match: 'Samsvar', noMatch: 'Ikke samsvar', charCount: 'tegn',
    md5Note: 'Merk: MD5 er ikke tilgjengelig i Web Crypto API. En JS-fallback brukes.',
    noInput: 'Skriv inn tekst ovenfor for a generere hasher.',
    introTitle: 'Gratis online kryptografisk hashgenerator',
    introText: 'Generer sikre kryptografiske hasher fra enhver streng umiddelbart. Alle beregninger skjer lokalt i nettleseren din.',
    useCaseTitle: 'Vanlige brukstilfeller', useCase1: 'Verifiser filintegritet', useCase2: 'Lag passordhasher', useCase3: 'Generer cache-nokler', useCase4: 'Valider API-signaturer', useCase5: 'Sammenlign ulike hashalgoritmer',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er en kryptografisk hashfunksjon?', faq1a: 'En kryptografisk hashfunksjon er en algoritme som transformerer inndata til en utdata med fast lengde kalt "hash".',
    faq2q: 'Hva er forskjellen mellom MD5, SHA-1, SHA-256 og SHA-512?', faq2a: 'MD5 produserer 128 biter, SHA-1 160 biter, SHA-256 256 biter og SHA-512 512 biter.',
    faq3q: 'Er hasher reversible?', faq3a: 'Nei. Hashfunksjoner er enveisverdifunksjoner.',
    faq4q: 'Er dataene mine trygge her?', faq4a: 'Ja. All hashing utfores lokalt i nettleseren din.',
    faq5q: 'Hvorfor avviker MD5-resultatet mitt?', faq5a: 'MD5 er ikke tilgjengelig i Web Crypto API, sa en JavaScript-fallback brukes.',
    relatedTitle: 'Relaterte sikkerhetsverktoy',
  },
  ja: {
    title: '文字列ハッシュ生成器',
    description: '任意のテキスト入力から MD5、SHA-1、SHA-256、SHA-512 ハッシュを生成します。',
    inputLabel: '入力テキスト', inputPlaceholder: 'ハッシュ化するテキストを入力または貼り付け...',
    hashBtn: 'ハッシュを生成', clearBtn: 'クリア', copyAll: 'すべてコピー',
    autoHash: '自動ハッシュ', encoding: 'エンコーディング', hex: '16進数', base64: 'Base64',
    uppercase: '大文字', lowercase: '小文字', compareMode: '比較モード',
    compareLabel: 'ハッシュを比較', comparePlaceholder: '比較するハッシュを貼り付け...',
    match: '一致', noMatch: '不一致', charCount: '文字',
    md5Note: '注: MD5 は Web Crypto API では利用できません。純粋な JS 実装が使用されます。',
    noInput: 'ハッシュを生成するには上にテキストを入力してください。',
    introTitle: '無料オンライン暗号ハッシュジェネレーター',
    introText: '任意の文字列から安全な暗号ハッシュを即座に生成します。すべての計算はブラウザで Web Crypto API を使ってローカルで行われます。',
    useCaseTitle: '一般的なユースケース', useCase1: 'チェックサムによるファイル整合性の検証', useCase2: 'データベースパスワードハッシュの作成', useCase3: 'キャッシュキーの生成', useCase4: 'API署名の検証', useCase5: '異なるハッシュアルゴリズムの学習と比較',
    faqTitle: 'よくある質問',
    faq1q: '暗号ハッシュ関数とは何ですか？', faq1a: '暗号ハッシュ関数は、任意のサイズの入力データを固定長の「ハッシュ」と呼ばれる出力に変換する数学的アルゴリズムです。',
    faq2q: 'MD5、SHA-1、SHA-256、SHA-512 の違いは？', faq2a: 'MD5 は 128 ビット、SHA-1 は 160 ビット、SHA-256 は 256 ビット、SHA-512 は 512 ビットを生成します。',
    faq3q: 'ハッシュは逆算できますか？', faq3a: 'いいえ。ハッシュ関数は一方向性です。',
    faq4q: 'ここでデータをハッシュするのは安全ですか？', faq4a: 'はい。すべてのハッシュ計算はブラウザ内でローカルに実行されます。',
    faq5q: 'MD5 の結果が異なるのはなぜですか？', faq5a: 'MD5 は Web Crypto API では利用できないため、JavaScript フォールバックが使用されます。',
    relatedTitle: '関連セキュリティツール',
  },
  ko: {
    title: '문자열 해시 생성기',
    description: '임의의 텍스트 입력에서 MD5, SHA-1, SHA-256, SHA-512 해시를 생성합니다.',
    inputLabel: '입력 텍스트', inputPlaceholder: '해시할 텍스트를 입력하거나 붙여넣기...',
    hashBtn: '해시 생성', clearBtn: '지우기', copyAll: '모두 복사',
    autoHash: '자동 해시', encoding: '인코딩', hex: '16진수', base64: 'Base64',
    uppercase: '대문자', lowercase: '소문자', compareMode: '비교 모드',
    compareLabel: '해시 비교', comparePlaceholder: '비교할 해시 붙여넣기...',
    match: '일치', noMatch: '불일치', charCount: '문자',
    md5Note: '참고: MD5는 Web Crypto API에서 사용할 수 없습니다. 순수 JS 구현이 사용됩니다.',
    noInput: '해시를 생성하려면 위에 텍스트를 입력하세요.',
    introTitle: '무료 온라인 암호화 해시 생성기',
    introText: '임의의 문자열에서 안전한 암호화 해시를 즉시 생성합니다. 모든 계산은 Web Crypto API를 사용하여 브라우저에서 로컬로 수행됩니다.',
    useCaseTitle: '일반적인 사용 사례', useCase1: '체크섬으로 파일 무결성 확인', useCase2: '데이터베이스 비밀번호 해시 생성', useCase3: '캐시 키 생성', useCase4: 'API 서명 검증', useCase5: '다양한 해시 알고리즘 비교',
    faqTitle: '자주 묻는 질문',
    faq1q: '암호화 해시 함수란 무엇인가요?', faq1a: '암호화 해시 함수는 임의 크기의 입력 데이터를 "해시"라는 고정 길이 출력으로 변환하는 수학적 알고리즘입니다.',
    faq2q: 'MD5, SHA-1, SHA-256, SHA-512의 차이점은?', faq2a: 'MD5는 128비트, SHA-1은 160비트, SHA-256은 256비트, SHA-512는 512비트를 생성합니다.',
    faq3q: '해시는 역산할 수 있나요?', faq3a: '아니요. 해시 함수는 단방향입니다.',
    faq4q: '여기서 데이터를 해시하는 것이 안전한가요?', faq4a: '네. 모든 해시 계산은 브라우저에서 로컬로 수행됩니다.',
    faq5q: 'MD5 결과가 다른 이유는?', faq5a: 'MD5는 Web Crypto API에서 사용할 수 없어 JavaScript 폴백이 사용됩니다.',
    relatedTitle: '관련 보안 도구',
  },
  id: {
    title: 'Generator Hash String',
    description: 'Buat hash MD5, SHA-1, SHA-256, dan SHA-512 dari input teks apa pun.',
    inputLabel: 'Teks masukan', inputPlaceholder: 'Ketik atau tempel teks untuk di-hash...',
    hashBtn: 'Buat hash', clearBtn: 'Hapus', copyAll: 'Salin semua',
    autoHash: 'Auto-hash', encoding: 'Encoding', hex: 'Heksadesimal', base64: 'Base64',
    uppercase: 'Huruf besar', lowercase: 'Huruf kecil', compareMode: 'Mode perbandingan',
    compareLabel: 'Bandingkan hash', comparePlaceholder: 'Tempel hash untuk dibandingkan...',
    match: 'Cocok', noMatch: 'Tidak cocok', charCount: 'karakter',
    md5Note: 'Catatan: MD5 tidak tersedia di Web Crypto API. Fallback JS digunakan.',
    noInput: 'Masukkan teks di atas untuk menghasilkan hash.',
    introTitle: 'Generator hash kriptografi gratis online',
    introText: 'Buat hash kriptografi aman dari string apa pun secara instan. Semua perhitungan dilakukan secara lokal di browser Anda.',
    useCaseTitle: 'Kasus penggunaan umum', useCase1: 'Verifikasi integritas file', useCase2: 'Buat hash kata sandi', useCase3: 'Hasilkan kunci cache', useCase4: 'Validasi tanda tangan API', useCase5: 'Bandingkan algoritma hash',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu fungsi hash kriptografi?', faq1a: 'Fungsi hash kriptografi adalah algoritma yang mengubah data masukan menjadi keluaran panjang tetap yang disebut "hash".',
    faq2q: 'Apa perbedaan antara MD5, SHA-1, SHA-256, dan SHA-512?', faq2a: 'MD5 menghasilkan 128 bit, SHA-1 160 bit, SHA-256 256 bit, dan SHA-512 512 bit.',
    faq3q: 'Apakah hash bisa dibalik?', faq3a: 'Tidak. Fungsi hash bersifat satu arah.',
    faq4q: 'Apakah data saya aman di sini?', faq4a: 'Ya. Semua hashing dilakukan secara lokal di browser Anda.',
    faq5q: 'Mengapa hasil MD5 saya berbeda?', faq5a: 'MD5 tidak tersedia di Web Crypto API, jadi fallback JavaScript digunakan.',
    relatedTitle: 'Alat keamanan terkait',
  },
  th: {
    title: 'เครื่องมือสร้าง Hash จากข้อความ',
    description: 'สร้าง hash MD5, SHA-1, SHA-256 และ SHA-512 จากข้อความใดก็ได้',
    inputLabel: 'ข้อความนำเข้า', inputPlaceholder: 'พิมพ์หรือวางข้อความที่ต้องการ hash...',
    hashBtn: 'สร้าง Hash', clearBtn: 'ล้าง', copyAll: 'คัดลอกทั้งหมด',
    autoHash: 'Auto-hash', encoding: 'การเข้ารหัส', hex: 'เลขฐานสิบหก', base64: 'Base64',
    uppercase: 'ตัวพิมพ์ใหญ่', lowercase: 'ตัวพิมพ์เล็ก', compareMode: 'โหมดเปรียบเทียบ',
    compareLabel: 'เปรียบเทียบ Hash', comparePlaceholder: 'วาง hash เพื่อเปรียบเทียบ...',
    match: 'ตรงกัน', noMatch: 'ไม่ตรงกัน', charCount: 'ตัวอักษร',
    md5Note: 'หมายเหตุ: MD5 ไม่พร้อมใช้งานใน Web Crypto API จะใช้การใช้งาน JS แทน',
    noInput: 'ป้อนข้อความด้านบนเพื่อสร้าง hash',
    introTitle: 'เครื่องมือสร้าง hash แบบเข้ารหัสฟรีออนไลน์',
    introText: 'สร้าง hash แบบเข้ารหัสที่ปลอดภัยจากข้อความใดก็ได้ทันที การคำนวณทั้งหมดเกิดขึ้นในเบราว์เซอร์ของคุณโดยใช้ Web Crypto API',
    useCaseTitle: 'กรณีใช้งานทั่วไป', useCase1: 'ตรวจสอบความสมบูรณ์ของไฟล์', useCase2: 'สร้าง hash รหัสผ่าน', useCase3: 'สร้าง cache key', useCase4: 'ตรวจสอบลายเซ็น API', useCase5: 'เปรียบเทียบอัลกอริทึม hash ต่างๆ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ฟังก์ชัน hash แบบเข้ารหัสคืออะไร?', faq1a: 'ฟังก์ชัน hash แบบเข้ารหัสเป็นอัลกอริทึมทางคณิตศาสตร์ที่แปลงข้อมูลนำเข้าเป็นผลลัพธ์ความยาวคงที่',
    faq2q: 'MD5, SHA-1, SHA-256 และ SHA-512 ต่างกันอย่างไร?', faq2a: 'MD5 ให้ 128 บิต, SHA-1 ให้ 160 บิต, SHA-256 ให้ 256 บิต และ SHA-512 ให้ 512 บิต',
    faq3q: 'hash ย้อนกลับได้ไหม?', faq3a: 'ไม่ได้ ฟังก์ชัน hash เป็นแบบทางเดียว',
    faq4q: 'ข้อมูลของฉันปลอดภัยที่นี่ไหม?', faq4a: 'ใช่ การ hash ทั้งหมดทำในเบราว์เซอร์ของคุณโดยตรง',
    faq5q: 'ทำไมผล MD5 ของฉันถึงแตกต่าง?', faq5a: 'MD5 ไม่พร้อมใช้งานใน Web Crypto API จึงใช้ JavaScript fallback แทน',
    relatedTitle: 'เครื่องมือความปลอดภัยที่เกี่ยวข้อง',
  },
};

// Pure JS MD5 implementation (since Web Crypto API does not support MD5)
function md5(input: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number { return md5cmn((b & c) | (~b & d), a, b, x, s, t); }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number { return md5cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number { return md5cmn(b ^ c ^ d, a, b, x, s, t); }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number { return md5cmn(c ^ (b | ~d), a, b, x, s, t); }

  function str2binl(str: string): number[] {
    const bin: number[] = Array(Math.ceil(str.length / 4)).fill(0);
    for (let i = 0; i < str.length; i++) { bin[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8); }
    return bin;
  }
  function binl2hex(binarray: number[]): string {
    const hexcase = '0123456789abcdef';
    let str = '';
    for (let i = 0; i < binarray.length * 4; i++) {
      str += hexcase.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) + hexcase.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }
  function utf8Encode(str: string): string {
    return unescape(encodeURIComponent(str));
  }
  function coreMd5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const olda = a, oldb = b, oldc = c, oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936); d = md5ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5ff(c, d, a, b, x[i + 10], 17, -42063); b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558); d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5hh(d, a, b, c, x[i], 11, -358537222); c = md5hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844); d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda); b = safeAdd(b, oldb); c = safeAdd(c, oldc); d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  const encoded = utf8Encode(input);
  return binl2hex(coreMd5(str2binl(encoded), encoded.length * 8));
}

async function sha(algorithm: string, input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function bufferToBase64(hexStr: string): string {
  const bytes = new Uint8Array(hexStr.match(/.{2}/g)!.map(b => parseInt(b, 16)));
  return btoa(String.fromCharCode(...bytes));
}

const ALGORITHMS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'] as const;
type Algorithm = typeof ALGORITHMS[number];

const ALGO_BITS: Record<Algorithm, number> = {
  'MD5': 128, 'SHA-1': 160, 'SHA-256': 256, 'SHA-512': 512,
};

const ALGO_COLORS: Record<Algorithm, string> = {
  'MD5': '#f59e0b', 'SHA-1': '#ef4444', 'SHA-256': '#22c55e', 'SHA-512': '#3b82f6',
};

export default function StringHashGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<Algorithm, string>>({} as Record<Algorithm, string>);
  const [loading, setLoading] = useState(false);
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');
  const [caseFormat, setCaseFormat] = useState<'lower' | 'upper'>('lower');
  const [autoHash, setAutoHash] = useState(true);
  const [compareInput, setCompareInput] = useState('');
  const [showCompare, setShowCompare] = useState(false);
  const [selectedAlgos, setSelectedAlgos] = useState<Set<Algorithm>>(new Set(ALGORITHMS));

  const generateHashes = useCallback(async (text: string) => {
    if (!text) { setHashes({} as Record<Algorithm, string>); return; }
    setLoading(true);
    try {
      const results: Partial<Record<Algorithm, string>> = {};
      if (selectedAlgos.has('MD5')) results['MD5'] = md5(text);
      if (selectedAlgos.has('SHA-1')) results['SHA-1'] = await sha('SHA-1', text);
      if (selectedAlgos.has('SHA-256')) results['SHA-256'] = await sha('SHA-256', text);
      if (selectedAlgos.has('SHA-512')) results['SHA-512'] = await sha('SHA-512', text);
      setHashes(results as Record<Algorithm, string>);
    } finally {
      setLoading(false);
    }
  }, [selectedAlgos]);

  useEffect(() => {
    if (autoHash) { generateHashes(input); }
  }, [input, autoHash, generateHashes]);

  const formatHash = (hex: string): string => {
    if (!hex) return '';
    let result = outputFormat === 'base64' ? bufferToBase64(hex) : hex;
    if (outputFormat === 'hex') { result = caseFormat === 'upper' ? result.toUpperCase() : result.toLowerCase(); }
    return result;
  };

  const allResultsText = ALGORITHMS
    .filter(a => selectedAlgos.has(a) && hashes[a])
    .map(a => `${a}: ${formatHash(hashes[a])}`)
    .join('\n');

  const getCompareMatch = (algo: Algorithm): boolean | null => {
    if (!compareInput.trim() || !hashes[algo]) return null;
    return formatHash(hashes[algo]).toLowerCase() === compareInput.trim().toLowerCase();
  };

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

  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 };
  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', fontSize: 14, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' as const };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="string-hash-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        {/* Auto-hash toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={autoHash} onChange={e => setAutoHash(e.target.checked)} />
          {t.autoHash}
        </label>

        {/* Output format */}
        <div style={{ display: 'flex', gap: 4 }}>
          {(['hex', 'base64'] as const).map(fmt => (
            <button key={fmt} onClick={() => setOutputFormat(fmt)}
              className={outputFormat === fmt ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 11, padding: '4px 10px' }}>
              {fmt === 'hex' ? t.hex : t.base64}
            </button>
          ))}
        </div>

        {/* Case format (only for hex) */}
        {outputFormat === 'hex' && (
          <div style={{ display: 'flex', gap: 4 }}>
            {(['lower', 'upper'] as const).map(c => (
              <button key={c} onClick={() => setCaseFormat(c)}
                className={caseFormat === c ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: 11, padding: '4px 10px' }}>
                {c === 'lower' ? t.lowercase : t.uppercase}
              </button>
            ))}
          </div>
        )}

        {/* Compare toggle */}
        <button onClick={() => setShowCompare(v => !v)}
          className={showCompare ? 'btn btn-primary' : 'btn btn-secondary'}
          style={{ fontSize: 11, padding: '4px 10px' }}>
          {t.compareMode}
        </button>
      </div>

      {/* Algorithm selection */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {ALGORITHMS.map(algo => (
          <label key={algo} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, cursor: 'pointer', padding: '4px 10px', borderRadius: 6, border: `1px solid ${selectedAlgos.has(algo) ? ALGO_COLORS[algo] : 'var(--border-color)'}`, background: selectedAlgos.has(algo) ? `${ALGO_COLORS[algo]}18` : 'var(--bg-input)' }}>
            <input type="checkbox" checked={selectedAlgos.has(algo)} onChange={e => {
              const next = new Set(selectedAlgos);
              if (e.target.checked) next.add(algo); else next.delete(algo);
              setSelectedAlgos(next);
            }} />
            <span style={{ fontWeight: 600 }}>{algo}</span>
            <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{ALGO_BITS[algo]}b</span>
          </label>
        ))}
      </div>

      {/* Text input */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={labelStyle}>{t.inputLabel}</label>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{input.length} {t.charCount}</span>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', lineHeight: 1.5 }}
        />
      </div>

      {/* Generate button (when auto-hash off) */}
      {!autoHash && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={() => generateHashes(input)} className="btn btn-primary" disabled={loading || !input}>
            {loading ? '...' : t.hashBtn}
          </button>
          <button onClick={() => { setInput(''); setHashes({} as Record<Algorithm, string>); }} className="btn btn-secondary">{t.clearBtn}</button>
        </div>
      )}
      {autoHash && input && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button onClick={() => { setInput(''); setHashes({} as Record<Algorithm, string>); }} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.clearBtn}</button>
        </div>
      )}

      {/* Compare input */}
      {showCompare && (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>{t.compareLabel}</label>
          <input type="text" value={compareInput} onChange={e => setCompareInput(e.target.value)} placeholder={t.comparePlaceholder} style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
      )}

      {/* Hash results */}
      {Object.keys(hashes).length > 0 ? (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Results</span>
            {allResultsText && <CopyButton text={allResultsText} label={t.copyAll} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ALGORITHMS.filter(a => selectedAlgos.has(a) && hashes[a]).map(algo => {
              const hashVal = formatHash(hashes[algo]);
              const compareMatch = getCompareMatch(algo);
              return (
                <div key={algo} style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 14px', border: `1px solid ${ALGO_COLORS[algo]}40` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: ALGO_COLORS[algo], letterSpacing: 0.5 }}>{algo}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{ALGO_BITS[algo]} bits / {hashVal.length} chars</span>
                      {compareMatch !== null && (
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: compareMatch ? '#22c55e20' : '#ef444420', color: compareMatch ? '#22c55e' : '#ef4444' }}>
                          {compareMatch ? t.match : t.noMatch}
                        </span>
                      )}
                    </div>
                    <CopyButton text={hashVal} />
                  </div>
                  <code style={{ fontSize: 12, fontFamily: 'monospace', wordBreak: 'break-all', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                    {hashVal}
                  </code>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        !loading && input === '' && (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)', fontSize: 13, background: 'var(--bg-input)', borderRadius: 8, border: '1px dashed var(--border-color)' }}>
            {t.noInput}
          </div>
        )
      )}

      {/* MD5 note */}
      <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 24, fontStyle: 'italic' }}>{t.md5Note}</p>

      {/* SEO Content */}
      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.useCaseTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          {[t.useCase1, t.useCase2, t.useCase3, t.useCase4, t.useCase5].map((uc, i) => <li key={i}>{uc}</li>)}
        </ul>

        {/* Algorithm comparison table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Algorithm Comparison</h3>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                {['Algorithm', 'Output Bits', 'Hex Length', 'Security'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { algo: 'MD5', bits: 128, hex: 32, security: 'Broken (checksums only)' },
                { algo: 'SHA-1', bits: 160, hex: 40, security: 'Deprecated' },
                { algo: 'SHA-256', bits: 256, hex: 64, security: 'Secure' },
                { algo: 'SHA-512', bits: 512, hex: 128, security: 'Very Secure' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: ALGO_COLORS[row.algo as Algorithm], fontFamily: 'monospace' }}>{row.algo}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>{row.bits}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>{row.hex}</td>
                  <td style={{ padding: '10px 14px' }}>{row.security}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/hmac-generator`, label: 'HMAC Generator' },
            { href: `/${lang}/tools/bcrypt-generator`, label: 'Bcrypt Generator' },
            { href: `/${lang}/tools/base64-encoder`, label: 'Base64 Encoder' },
            { href: `/${lang}/tools/password-generator-online`, label: 'Password Generator' },
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
