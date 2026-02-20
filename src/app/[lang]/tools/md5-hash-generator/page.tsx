'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── Pure JS MD5 implementation (RFC 1321) ──────────────────────── */
function md5(input: string): string {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function binlMD5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const olda = a, oldb = b, oldc = c, oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda); b = safeAdd(b, oldb); c = safeAdd(c, oldc); d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  function rstrMD5(s: string): string {
    const bin: number[] = [];
    const mask = 0xff;
    for (let i = 0; i < s.length * 8; i += 8) {
      bin[i >> 5] |= (s.charCodeAt(i / 8) & mask) << i % 32;
    }
    const md5arr = binlMD5(bin, s.length * 8);
    let result = '';
    for (let i = 0; i < md5arr.length * 32; i += 8) {
      result += String.fromCharCode((md5arr[i >> 5] >>> i % 32) & mask);
    }
    return result;
  }
  function rstr2hex(input: string): string {
    const hexTab = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < input.length; i++) {
      const x = input.charCodeAt(i);
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  }
  function str2rstrUTF8(input: string): string {
    let output = '';
    for (let i = 0; i < input.length; i++) {
      const c = input.charCodeAt(i);
      if (c < 128) { output += String.fromCharCode(c); }
      else if (c < 2048) {
        output += String.fromCharCode(192 | (c >>> 6));
        output += String.fromCharCode(128 | (c & 63));
      } else {
        output += String.fromCharCode(224 | (c >>> 12));
        output += String.fromCharCode(128 | ((c >>> 6) & 63));
        output += String.fromCharCode(128 | (c & 63));
      }
    }
    return output;
  }
  return rstr2hex(rstrMD5(str2rstrUTF8(input)));
}

/* ── i18n strings ──────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'MD5 Hash Generator',
    description: 'Generate MD5 hashes from any text. All processing happens in your browser — no data leaves your device.',
    inputLabel: 'Text to Hash',
    inputPlaceholder: 'Enter text to generate MD5 hash...',
    generateBtn: 'Generate MD5 Hash',
    resultLabel: 'MD5 Hash (32 hex characters)',
    clear: 'Clear',
    uppercase: 'Uppercase',
    cheatTitle: 'MD5 Hash Quick Reference',
    aboutTitle: 'What is MD5?',
    aboutText: 'MD5 (Message Digest Algorithm 5) is a widely-used cryptographic hash function that produces a 128-bit (16-byte) hash value, typically rendered as a 32-character hexadecimal string. Designed by Ronald Rivest in 1991 as an improvement over MD4, it was originally intended for cryptographic security. However, serious vulnerabilities were discovered over time, and MD5 is now considered cryptographically broken for collision resistance. Despite this, MD5 remains popular for non-security uses such as file integrity verification, checksums, and data deduplication.',
    propertiesTitle: 'Key Properties',
    propOutputLen: 'Output Length',
    propOutputLenVal: '128 bits (32 hex chars)',
    propBlockSize: 'Block Size',
    propBlockSizeVal: '512 bits (64 bytes)',
    propSecurity: 'Security Status',
    propSecurityVal: 'Broken — collisions found (2004)',
    propSpeed: 'Speed',
    propSpeedVal: 'Very fast (~600 MB/s on modern CPUs)',
    propRounds: 'Rounds',
    propRoundsVal: '4 rounds of 16 operations each (64 total)',
    useCasesTitle: 'Common Use Cases',
    useCase1: 'File integrity verification and checksums',
    useCase2: 'Database record deduplication',
    useCase3: 'Cache key generation',
    useCase4: 'Content fingerprinting and ETags',
    useCase5: 'Non-cryptographic hash lookups',
    comparisonTitle: 'MD5 vs Other Hash Algorithms',
    codeTitle: 'Code Examples',
    relatedTitle: 'Related Hash Tools',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is MD5 secure for password hashing?',
    faq1a: 'No. MD5 is considered cryptographically broken and unsuitable for password hashing. Collision attacks have been demonstrated since 2004. For password hashing, use bcrypt, scrypt, or Argon2 instead. These algorithms are specifically designed to be slow and resistant to brute-force attacks.',
    faq2q: 'What is the length of an MD5 hash?',
    faq2a: 'An MD5 hash is always 128 bits (16 bytes), represented as 32 hexadecimal characters. No matter the size of the input — from empty string to a multi-gigabyte file — the output is always exactly 32 hex characters long.',
    faq3q: 'Can two different inputs produce the same MD5 hash?',
    faq3a: 'Yes, this is called a collision. MD5 collisions have been practically demonstrated since 2004 by researchers Xiaoyun Wang and Hongbo Yu. In 2012, the Flame malware exploited an MD5 collision in Microsoft certificates. This is why MD5 should not be used for any security-critical purpose.',
  },
  zh: {
    title: 'MD5哈希生成器',
    description: '从任何文本生成MD5哈希值。所有处理在浏览器本地完成，数据不会离开您的设备。',
    inputLabel: '输入文本',
    inputPlaceholder: '输入文本以生成MD5哈希...',
    generateBtn: '生成MD5哈希',
    resultLabel: 'MD5哈希值（32个十六进制字符）',
    clear: '清除',
    uppercase: '大写',
    cheatTitle: 'MD5哈希速查表',
    aboutTitle: '什么是MD5？',
    aboutText: 'MD5（消息摘要算法5）是一种广泛使用的加密哈希函数，产生128位（16字节）哈希值，通常呈现为32个字符的十六进制字符串。由Ronald Rivest于1991年设计，最初用于加密安全。然而随着时间推移发现了严重漏洞，MD5现在被认为在碰撞抵抗方面已被破解。尽管如此，MD5仍广泛用于文件完整性验证、校验和以及数据去重等非安全用途。',
    propertiesTitle: '关键属性',
    propOutputLen: '输出长度',
    propOutputLenVal: '128位（32个十六进制字符）',
    propBlockSize: '块大小',
    propBlockSizeVal: '512位（64字节）',
    propSecurity: '安全状态',
    propSecurityVal: '已破解 — 2004年发现碰撞',
    propSpeed: '速度',
    propSpeedVal: '非常快（现代CPU约600 MB/s）',
    propRounds: '轮次',
    propRoundsVal: '4轮，每轮16次操作（共64次）',
    useCasesTitle: '常见用例',
    useCase1: '文件完整性验证和校验和',
    useCase2: '数据库记录去重',
    useCase3: '缓存键生成',
    useCase4: '内容指纹和ETag',
    useCase5: '非加密哈希查找',
    comparisonTitle: 'MD5与其他哈希算法比较',
    codeTitle: '代码示例',
    relatedTitle: '相关哈希工具',
    faqTitle: '常见问题',
    faq1q: 'MD5适合密码哈希吗？',
    faq1a: '不适合。MD5被认为已被加密破解，不适合密码哈希。自2004年以来已演示了碰撞攻击。请改用bcrypt、scrypt或Argon2。',
    faq2q: 'MD5哈希值有多长？',
    faq2a: 'MD5哈希值始终为128位（16字节），表示为32个十六进制字符。无论输入大小如何，输出都是32个十六进制字符。',
    faq3q: '不同输入能产生相同的MD5哈希吗？',
    faq3a: '可以，这称为碰撞。自2004年以来，研究人员已经实际演示了MD5碰撞。这就是MD5不应用于任何安全关键目的的原因。',
  },
  fr: {
    title: 'Generateur de Hash MD5',
    description: 'Generez des hashes MD5 a partir de texte. Tout le traitement se fait dans votre navigateur.',
    inputLabel: 'Texte a hacher',
    inputPlaceholder: 'Entrez le texte pour generer le hash MD5...',
    generateBtn: 'Generer le Hash MD5',
    resultLabel: 'Hash MD5 (32 caracteres hexadecimaux)',
    clear: 'Effacer',
    uppercase: 'Majuscules',
    cheatTitle: 'Reference rapide MD5',
    aboutTitle: "Qu'est-ce que MD5 ?",
    aboutText: "MD5 (Message Digest Algorithm 5) est une fonction de hachage cryptographique produisant une valeur de 128 bits (32 caracteres hexadecimaux). Bien qu'il ne soit plus considere comme cryptographiquement sur, MD5 reste largement utilise pour la verification d'integrite de fichiers et les checksums.",
    propertiesTitle: 'Proprietes cles',
    propOutputLen: 'Longueur de sortie', propOutputLenVal: '128 bits (32 car. hex)',
    propBlockSize: 'Taille de bloc', propBlockSizeVal: '512 bits (64 octets)',
    propSecurity: 'Statut securite', propSecurityVal: 'Casse — collisions trouvees (2004)',
    propSpeed: 'Vitesse', propSpeedVal: 'Tres rapide (~600 Mo/s)',
    propRounds: 'Tours', propRoundsVal: '4 tours de 16 operations (64 total)',
    useCasesTitle: "Cas d'utilisation courants",
    useCase1: "Verification d'integrite de fichiers", useCase2: 'Deduplication de base de donnees', useCase3: 'Generation de cles de cache', useCase4: "Empreinte de contenu et ETags", useCase5: 'Recherche de hash non cryptographique',
    comparisonTitle: 'MD5 vs autres algorithmes', codeTitle: 'Exemples de code', relatedTitle: 'Outils de hash connexes', faqTitle: 'Questions frequentes',
    faq1q: 'MD5 est-il sur pour le hachage de mots de passe ?', faq1a: 'Non. MD5 est considere comme cryptographiquement casse. Utilisez bcrypt, scrypt ou Argon2.',
    faq2q: "Quelle est la longueur d'un hash MD5 ?", faq2a: 'Un hash MD5 fait toujours 128 bits, represente par 32 caracteres hexadecimaux.',
    faq3q: 'Deux entrees differentes peuvent-elles produire le meme hash MD5 ?', faq3a: 'Oui, cela s\'appelle une collision. Des collisions MD5 ont ete demontrees depuis 2004.',
  },
  de: {
    title: 'MD5 Hash Generator',
    description: 'MD5-Hashes aus Text generieren. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    inputLabel: 'Text zum Hashen',
    inputPlaceholder: 'Text eingeben um MD5 Hash zu generieren...',
    generateBtn: 'MD5 Hash generieren',
    resultLabel: 'MD5 Hash (32 Hex-Zeichen)',
    clear: 'Loeschen',
    uppercase: 'Grossbuchstaben',
    cheatTitle: 'MD5 Hash Kurzreferenz',
    aboutTitle: 'Was ist MD5?',
    aboutText: 'MD5 (Message Digest Algorithm 5) ist eine weit verbreitete kryptographische Hash-Funktion, die einen 128-Bit Hash-Wert erzeugt. Obwohl nicht mehr als kryptographisch sicher angesehen, wird MD5 weiterhin fuer Dateiintegritaetspruefungen und Checksummen verwendet.',
    propertiesTitle: 'Kerneigenschaften',
    propOutputLen: 'Ausgabelaenge', propOutputLenVal: '128 Bit (32 Hex-Zeichen)',
    propBlockSize: 'Blockgroesse', propBlockSizeVal: '512 Bit (64 Bytes)',
    propSecurity: 'Sicherheitsstatus', propSecurityVal: 'Gebrochen — Kollisionen seit 2004',
    propSpeed: 'Geschwindigkeit', propSpeedVal: 'Sehr schnell (~600 MB/s)',
    propRounds: 'Runden', propRoundsVal: '4 Runden mit je 16 Operationen (64 gesamt)',
    useCasesTitle: 'Haeufige Anwendungsfaelle',
    useCase1: 'Dateiintegritaetspruefung', useCase2: 'Datenbank-Deduplizierung', useCase3: 'Cache-Key-Generierung', useCase4: 'Content-Fingerprinting und ETags', useCase5: 'Nicht-kryptographische Hash-Suche',
    comparisonTitle: 'MD5 vs andere Hash-Algorithmen', codeTitle: 'Codebeispiele', relatedTitle: 'Verwandte Hash-Tools', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Ist MD5 sicher fuer Passwort-Hashing?', faq1a: 'Nein. MD5 gilt als kryptographisch gebrochen. Verwenden Sie bcrypt, scrypt oder Argon2.',
    faq2q: 'Wie lang ist ein MD5 Hash?', faq2a: 'Ein MD5 Hash ist immer 128 Bit lang, dargestellt als 32 Hexadezimalzeichen.',
    faq3q: 'Koennen zwei verschiedene Eingaben den gleichen MD5 Hash erzeugen?', faq3a: 'Ja, das nennt man eine Kollision. MD5-Kollisionen wurden seit 2004 nachgewiesen.',
  },
  es: {
    title: 'Generador de Hash MD5',
    description: 'Genera hashes MD5 de cualquier texto. Todo el procesamiento se realiza en tu navegador.',
    inputLabel: 'Texto a hashear',
    inputPlaceholder: 'Introduce texto para generar el hash MD5...',
    generateBtn: 'Generar Hash MD5',
    resultLabel: 'Hash MD5 (32 caracteres hexadecimales)',
    clear: 'Limpiar',
    uppercase: 'Mayusculas',
    cheatTitle: 'Referencia rapida de MD5',
    aboutTitle: 'Que es MD5?',
    aboutText: 'MD5 (Message Digest Algorithm 5) es una funcion hash criptografica ampliamente utilizada que produce un valor hash de 128 bits (32 caracteres hexadecimales). Aunque ya no se considera criptograficamente seguro, MD5 sigue siendo popular para verificacion de integridad de archivos y checksums.',
    propertiesTitle: 'Propiedades clave',
    propOutputLen: 'Longitud de salida', propOutputLenVal: '128 bits (32 car. hex)',
    propBlockSize: 'Tamano de bloque', propBlockSizeVal: '512 bits (64 bytes)',
    propSecurity: 'Estado de seguridad', propSecurityVal: 'Roto — colisiones encontradas (2004)',
    propSpeed: 'Velocidad', propSpeedVal: 'Muy rapido (~600 MB/s)',
    propRounds: 'Rondas', propRoundsVal: '4 rondas de 16 operaciones (64 total)',
    useCasesTitle: 'Casos de uso comunes',
    useCase1: 'Verificacion de integridad de archivos', useCase2: 'Deduplicacion de bases de datos', useCase3: 'Generacion de claves de cache', useCase4: 'Huellas de contenido y ETags', useCase5: 'Busqueda de hash no criptografica',
    comparisonTitle: 'MD5 vs otros algoritmos hash', codeTitle: 'Ejemplos de codigo', relatedTitle: 'Herramientas de hash relacionadas', faqTitle: 'Preguntas frecuentes',
    faq1q: 'Es MD5 seguro para el hashing de contrasenas?', faq1a: 'No. MD5 se considera criptograficamente roto. Use bcrypt, scrypt o Argon2.',
    faq2q: 'Cual es la longitud de un hash MD5?', faq2a: 'Un hash MD5 siempre tiene 128 bits, representado como 32 caracteres hexadecimales.',
    faq3q: 'Pueden dos entradas diferentes producir el mismo hash MD5?', faq3a: 'Si, esto se llama colision. Las colisiones MD5 se han demostrado desde 2004.',
  },
  ja: {
    title: 'MD5ハッシュジェネレーター',
    description: 'テキストからMD5ハッシュを即座に生成。すべての処理はブラウザ内で完結します。',
    inputLabel: 'ハッシュするテキスト',
    inputPlaceholder: 'MD5ハッシュを生成するテキストを入力...',
    generateBtn: 'MD5ハッシュを生成',
    resultLabel: 'MD5ハッシュ（32文字の16進数）',
    clear: 'クリア',
    uppercase: '大文字',
    cheatTitle: 'MD5ハッシュクイックリファレンス',
    aboutTitle: 'MD5とは？',
    aboutText: 'MD5（Message Digest Algorithm 5）は、128ビット（16バイト）のハッシュ値を生成する広く使用されている暗号学的ハッシュ関数です。暗号的に安全とは見なされなくなりましたが、ファイル整合性の検証やチェックサムに広く使用されています。',
    propertiesTitle: '主要プロパティ',
    propOutputLen: '出力長', propOutputLenVal: '128ビット（16進数32文字）',
    propBlockSize: 'ブロックサイズ', propBlockSizeVal: '512ビット（64バイト）',
    propSecurity: 'セキュリティ状態', propSecurityVal: '破られた — 衝突発見（2004年）',
    propSpeed: '速度', propSpeedVal: '非常に高速（約600 MB/s）',
    propRounds: 'ラウンド', propRoundsVal: '各16操作の4ラウンド（合計64）',
    useCasesTitle: '一般的な用途',
    useCase1: 'ファイル整合性の検証', useCase2: 'データベースの重複排除', useCase3: 'キャッシュキーの生成', useCase4: 'コンテンツフィンガープリント', useCase5: '非暗号学的ハッシュ検索',
    comparisonTitle: 'MD5と他のハッシュアルゴリズムの比較', codeTitle: 'コード例', relatedTitle: '関連ハッシュツール', faqTitle: 'よくある質問',
    faq1q: 'MD5はパスワードハッシュに安全ですか？', faq1a: 'いいえ。MD5は暗号学的に破られており、パスワードハッシュには不適切です。bcrypt、scrypt、またはArgon2を使用してください。',
    faq2q: 'MD5ハッシュの長さは？', faq2a: 'MD5ハッシュは常に128ビット（16進数32文字）です。',
    faq3q: '異なる入力が同じMD5ハッシュを生成することはありますか？', faq3a: 'はい、これは衝突と呼ばれます。MD5衝突は2004年以降実証されています。',
  },
  ko: {
    title: 'MD5 해시 생성기',
    description: '텍스트에서 MD5 해시를 즉시 생성하세요. 모든 처리는 브라우저에서 이루어집니다.',
    inputLabel: '해시할 텍스트',
    inputPlaceholder: 'MD5 해시를 생성할 텍스트를 입력하세요...',
    generateBtn: 'MD5 해시 생성',
    resultLabel: 'MD5 해시 (16진수 32자)',
    clear: '지우기',
    uppercase: '대문자',
    cheatTitle: 'MD5 해시 빠른 참조',
    aboutTitle: 'MD5란?',
    aboutText: 'MD5(Message Digest Algorithm 5)는 128비트(16바이트) 해시 값을 생성하는 널리 사용되는 암호화 해시 함수입니다. 더 이상 암호학적으로 안전하다고 간주되지 않지만, 파일 무결성 검증과 체크섬에 널리 사용됩니다.',
    propertiesTitle: '주요 속성',
    propOutputLen: '출력 길이', propOutputLenVal: '128비트 (16진수 32자)',
    propBlockSize: '블록 크기', propBlockSizeVal: '512비트 (64바이트)',
    propSecurity: '보안 상태', propSecurityVal: '깨짐 — 충돌 발견 (2004년)',
    propSpeed: '속도', propSpeedVal: '매우 빠름 (~600 MB/s)',
    propRounds: '라운드', propRoundsVal: '각 16개 연산의 4라운드 (총 64회)',
    useCasesTitle: '일반적인 사용 사례',
    useCase1: '파일 무결성 검증', useCase2: '데이터베이스 중복 제거', useCase3: '캐시 키 생성', useCase4: '콘텐츠 지문 및 ETag', useCase5: '비암호화 해시 검색',
    comparisonTitle: 'MD5 vs 다른 해시 알고리즘', codeTitle: '코드 예제', relatedTitle: '관련 해시 도구', faqTitle: '자주 묻는 질문',
    faq1q: 'MD5는 비밀번호 해싱에 안전한가요?', faq1a: '아닙니다. MD5는 암호학적으로 깨진 것으로 간주됩니다. bcrypt, scrypt 또는 Argon2를 사용하세요.',
    faq2q: 'MD5 해시의 길이는 얼마인가요?', faq2a: 'MD5 해시는 항상 128비트(16진수 32자)입니다.',
    faq3q: '서로 다른 입력이 동일한 MD5 해시를 생성할 수 있나요?', faq3a: '네, 이를 충돌이라고 합니다. MD5 충돌은 2004년부터 실증되었습니다.',
  },
};

export default function MD5HashGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [isUppercase, setIsUppercase] = useState(false);

  const generate = () => {
    if (!input) return;
    setHash(md5(input));
  };

  const formatHash = (h: string) => (isUppercase ? h.toUpperCase() : h);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="md5-hash-generator">
      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Tool UI ────────────────────────────────────────── */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 120 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={() => { setInput(''); setHash(''); }} className="btn btn-secondary">{t.clear}</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginLeft: 'auto', cursor: 'pointer' }}>
          <input type="checkbox" checked={isUppercase} onChange={(e) => setIsUppercase(e.target.checked)} />
          {t.uppercase}
        </label>
      </div>

      {hash && (
        <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{t.resultLabel}</span>
            <CopyButton text={formatHash(hash)} />
          </div>
          <code style={{ fontSize: 14, wordBreak: 'break-all', color: 'var(--text-primary)', fontFamily: 'monospace', lineHeight: 1.6 }}>
            {formatHash(hash)}
          </code>
        </div>
      )}

      {/* ── Cheat Sheet ─────────────────────────────────────── */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{t.cheatTitle}</h2>

        {/* About */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.aboutTitle}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.aboutText}</p>

        {/* Properties Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.propertiesTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {[
                [t.propOutputLen, t.propOutputLenVal],
                [t.propBlockSize, t.propBlockSizeVal],
                [t.propSecurity, t.propSecurityVal],
                [t.propSpeed, t.propSpeedVal],
                [t.propRounds, t.propRoundsVal],
              ].map(([key, val], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{key}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Use Cases */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.useCasesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 20 }}>
          <li>{t.useCase1}</li>
          <li>{t.useCase2}</li>
          <li>{t.useCase3}</li>
          <li>{t.useCase4}</li>
          <li>{t.useCase5}</li>
        </ul>

        {/* Comparison Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.comparisonTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Algorithm</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Output</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Security</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>Speed</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['MD5', '128 bits', 'Broken', 'Very Fast'],
                ['SHA-1', '160 bits', 'Weak', 'Fast'],
                ['SHA-256', '256 bits', 'Strong', 'Moderate'],
                ['SHA-512', '512 bits', 'Strong', 'Moderate'],
              ].map(([algo, output, security, speed], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: i === 0 ? 'var(--bg-input)' : 'transparent' }}>
                  <td style={{ padding: '8px 12px', fontWeight: i === 0 ? 700 : 400 }}>{algo}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{output}</td>
                  <td style={{ padding: '8px 12px', color: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e' }}>{security}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Code Examples */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.codeTitle}</h3>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>JavaScript (Node.js)</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`const crypto = require('crypto');
const hash = crypto.createHash('md5')
  .update('Hello, World!')
  .digest('hex');
console.log(hash); // 65a8e27d8879283831b664bd8b7f0ad4`}</code>
          </pre>
        </div>
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)' }}>Python</span>
          <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, fontSize: 13, overflowX: 'auto', border: '1px solid var(--border-color)', marginTop: 4 }}>
            <code>{`import hashlib
hash = hashlib.md5('Hello, World!'.encode()).hexdigest()
print(hash)  # 65a8e27d8879283831b664bd8b7f0ad4`}</code>
          </pre>
        </div>

        {/* FAQ */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator (All)' },
            { href: `/${lang}/tools/sha1-hash-generator`, label: 'SHA-1 Hash Generator' },
            { href: `/${lang}/tools/sha256-hash-generator`, label: 'SHA-256 Hash Generator' },
            { href: `/${lang}/tools/sha512-hash-generator`, label: 'SHA-512 Hash Generator' },
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
