'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function md5(input: string): string {
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
  function md51(s: string) {
    const n = s.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    const tail = Array(16).fill(0);
    for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) { md5cycle(state, tail); tail.fill(0); }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }
  function md5blk(s: string) {
    const md5blks = Array(16);
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  function rhex(n: number) {
    const hexChr = '0123456789abcdef';
    let s = '';
    for (let j = 0; j < 4; j++) s += hexChr.charAt((n >> (j * 8 + 4)) & 0x0f) + hexChr.charAt((n >> (j * 8)) & 0x0f);
    return s;
  }
  function add32(a: number, b: number) { return (a + b) & 0xffffffff; }
  const x = md51(input);
  return rhex(x[0]) + rhex(x[1]) + rhex(x[2]) + rhex(x[3]);
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Online Hash Generator (MD5, SHA-256, SHA-512)',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes online. Fast, free, and secure client-side hash calculator.',
    inputLabel: 'Text Input',
    inputPlaceholder: 'Enter text to generate hashes...',
    generateBtn: 'Generate Hashes',
    clear: 'Clear',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    algorithm: 'Algorithm',
    hashValue: 'Hash Value',
    allAlgorithms: 'All Algorithms',
    selectAlgo: 'Select algorithm or generate all',
    bits: 'bits',
    introTitle: 'Free Online Hash Generator',
    introText: 'Generate cryptographic hashes instantly using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. All computations run entirely in your browser -- no data is sent to any server. Use hash functions for data integrity verification, password storage concepts, digital signatures, and checksums.',
    cheatTitle: 'Hash Algorithm Comparison',
    algoCol: 'Algorithm',
    lengthCol: 'Output Length',
    securityCol: 'Security Level',
    useCol: 'Common Use',
    md5Len: '128 bits (32 hex)', md5Sec: 'Low (broken)', md5Use: 'Checksums, non-security',
    sha1Len: '160 bits (40 hex)', sha1Sec: 'Low (deprecated)', sha1Use: 'Legacy systems, git',
    sha256Len: '256 bits (64 hex)', sha256Sec: 'High', sha256Use: 'TLS, blockchain, JWT',
    sha384Len: '384 bits (96 hex)', sha384Sec: 'High', sha384Use: 'TLS certificates',
    sha512Len: '512 bits (128 hex)', sha512Sec: 'Very High', sha512Use: 'High-security hashing',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a hash function?',
    faq1a: 'A hash function takes an input (message) and produces a fixed-size string of bytes called a hash or digest. It is deterministic (same input always gives the same output), fast to compute, and practically impossible to reverse. Even a tiny change in input produces a completely different hash.',
    faq2q: 'Is MD5 still safe to use?',
    faq2a: 'MD5 is considered cryptographically broken since 2004 due to collision vulnerabilities. It should NOT be used for security purposes like password hashing or digital signatures. However, MD5 is still acceptable for non-security tasks such as checksums and data deduplication.',
    faq3q: 'What is the difference between SHA-256 and SHA-512?',
    faq3a: 'SHA-256 produces a 256-bit (32-byte) hash while SHA-512 produces a 512-bit (64-byte) hash. SHA-512 provides a larger output and higher security margin. On 64-bit processors, SHA-512 can actually be faster than SHA-256 due to its internal word size matching the processor architecture.',
    faq4q: 'Is my data safe? Does it leave my browser?',
    faq4a: 'Yes, your data is completely safe. All hash computations are performed locally in your browser using the Web Crypto API and JavaScript. No data is ever transmitted to any server. You can verify this by disconnecting from the internet and using the tool offline.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '\u5728\u7ebf\u54c8\u5e0c\u751f\u6210\u5668 (MD5, SHA-256, SHA-512)',
    description: '\u5728\u7ebf\u751f\u6210 MD5, SHA-1, SHA-256, SHA-384, SHA-512 \u54c8\u5e0c\u503c\u3002\u5feb\u901f\u3001\u514d\u8d39\u3001\u5b89\u5168\u7684\u5ba2\u6237\u7aef\u54c8\u5e0c\u8ba1\u7b97\u5668\u3002',
    inputLabel: '\u6587\u672c\u8f93\u5165',
    inputPlaceholder: '\u8f93\u5165\u8981\u751f\u6210\u54c8\u5e0c\u7684\u6587\u672c...',
    generateBtn: '\u751f\u6210\u54c8\u5e0c',
    clear: '\u6e05\u9664',
    uppercase: '\u5927\u5199',
    lowercase: '\u5c0f\u5199',
    algorithm: '\u7b97\u6cd5',
    hashValue: '\u54c8\u5e0c\u503c',
    allAlgorithms: '\u6240\u6709\u7b97\u6cd5',
    selectAlgo: '\u9009\u62e9\u7b97\u6cd5\u6216\u751f\u6210\u5168\u90e8',
    bits: '\u4f4d',
    introTitle: '\u514d\u8d39\u5728\u7ebf\u54c8\u5e0c\u751f\u6210\u5668',
    introText: '\u4f7f\u7528 MD5, SHA-1, SHA-256, SHA-384 \u548c SHA-512 \u7b97\u6cd5\u5373\u65f6\u751f\u6210\u52a0\u5bc6\u54c8\u5e0c\u3002\u6240\u6709\u8ba1\u7b97\u5b8c\u5168\u5728\u6d4f\u89c8\u5668\u4e2d\u8fd0\u884c\uff0c\u4e0d\u4f1a\u5411\u4efb\u4f55\u670d\u52a1\u5668\u53d1\u9001\u6570\u636e\u3002',
    cheatTitle: '\u54c8\u5e0c\u7b97\u6cd5\u5bf9\u6bd4',
    algoCol: '\u7b97\u6cd5', lengthCol: '\u8f93\u51fa\u957f\u5ea6', securityCol: '\u5b89\u5168\u7ea7\u522b', useCol: '\u5e38\u89c1\u7528\u9014',
    md5Len: '128 \u4f4d (32 \u5341\u516d\u8fdb\u5236)', md5Sec: '\u4f4e (\u5df2\u7834\u89e3)', md5Use: '\u6821\u9a8c\u548c\u3001\u975e\u5b89\u5168\u7528\u9014',
    sha1Len: '160 \u4f4d (40 \u5341\u516d\u8fdb\u5236)', sha1Sec: '\u4f4e (\u5df2\u5f03\u7528)', sha1Use: '\u65e7\u7cfb\u7edf\u3001Git',
    sha256Len: '256 \u4f4d (64 \u5341\u516d\u8fdb\u5236)', sha256Sec: '\u9ad8', sha256Use: 'TLS\u3001\u533a\u5757\u94fe\u3001JWT',
    sha384Len: '384 \u4f4d (96 \u5341\u516d\u8fdb\u5236)', sha384Sec: '\u9ad8', sha384Use: 'TLS \u8bc1\u4e66',
    sha512Len: '512 \u4f4d (128 \u5341\u516d\u8fdb\u5236)', sha512Sec: '\u975e\u5e38\u9ad8', sha512Use: '\u9ad8\u5b89\u5168\u54c8\u5e0c',
    faqTitle: '\u5e38\u89c1\u95ee\u9898',
    faq1q: '\u4ec0\u4e48\u662f\u54c8\u5e0c\u51fd\u6570\uff1f',
    faq1a: '\u54c8\u5e0c\u51fd\u6570\u63a5\u53d7\u8f93\u5165\u5e76\u751f\u6210\u56fa\u5b9a\u5927\u5c0f\u7684\u5b57\u8282\u4e32\uff0c\u79f0\u4e3a\u54c8\u5e0c\u6216\u6458\u8981\u3002\u5b83\u662f\u786e\u5b9a\u6027\u7684\uff0c\u8ba1\u7b97\u5feb\u901f\uff0c\u4e14\u51e0\u4e4e\u4e0d\u53ef\u80fd\u9006\u5411\u3002',
    faq2q: 'MD5 \u8fd8\u5b89\u5168\u5417\uff1f',
    faq2a: 'MD5 \u81ea 2004 \u5e74\u8d77\u88ab\u8ba4\u4e3a\u5bc6\u7801\u5b66\u4e0a\u5df2\u7ecf\u88ab\u7834\u89e3\uff0c\u4e0d\u5e94\u7528\u4e8e\u5b89\u5168\u76ee\u7684\u3002\u4f46\u5bf9\u4e8e\u6821\u9a8c\u548c\u7b49\u975e\u5b89\u5168\u4efb\u52a1\u4ecd\u53ef\u63a5\u53d7\u3002',
    faq3q: 'SHA-256 \u548c SHA-512 \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq3a: 'SHA-256 \u751f\u6210 256 \u4f4d\u54c8\u5e0c\uff0cSHA-512 \u751f\u6210 512 \u4f4d\u54c8\u5e0c\u3002\u5728 64 \u4f4d\u5904\u7406\u5668\u4e0a\uff0cSHA-512 \u53ef\u80fd\u6bd4 SHA-256 \u66f4\u5feb\u3002',
    faq4q: '\u6211\u7684\u6570\u636e\u5b89\u5168\u5417\uff1f',
    faq4a: '\u5b8c\u5168\u5b89\u5168\u3002\u6240\u6709\u8ba1\u7b97\u901a\u8fc7 Web Crypto API \u548c JavaScript \u5728\u6d4f\u89c8\u5668\u672c\u5730\u6267\u884c\uff0c\u4e0d\u4f1a\u53d1\u9001\u4efb\u4f55\u6570\u636e\u3002',
    relatedTitle: '\u76f8\u5173\u5de5\u5177',
  },
  fr: {
    title: 'Generateur de Hash en Ligne (MD5, SHA-256, SHA-512)',
    description: 'Generez des hachages MD5, SHA-1, SHA-256, SHA-384 et SHA-512 en ligne. Rapide, gratuit et securise.',
    inputLabel: 'Texte', inputPlaceholder: 'Entrez le texte...', generateBtn: 'Generer les hachages', clear: 'Effacer',
    uppercase: 'Majuscules', lowercase: 'Minuscules', algorithm: 'Algorithme', hashValue: 'Valeur de hachage',
    allAlgorithms: 'Tous les algorithmes', selectAlgo: 'Selectionnez un algorithme', bits: 'bits',
    introTitle: 'Generateur de hachage gratuit', introText: 'Generez des hachages cryptographiques avec MD5, SHA-1, SHA-256, SHA-384 et SHA-512. Tous les calculs sont effectues dans votre navigateur.',
    cheatTitle: 'Comparaison des algorithmes', algoCol: 'Algorithme', lengthCol: 'Longueur', securityCol: 'Securite', useCol: 'Utilisation',
    md5Len: '128 bits', md5Sec: 'Faible', md5Use: 'Sommes de controle',
    sha1Len: '160 bits', sha1Sec: 'Faible', sha1Use: 'Systemes anciens',
    sha256Len: '256 bits', sha256Sec: 'Elevee', sha256Use: 'TLS, blockchain',
    sha384Len: '384 bits', sha384Sec: 'Elevee', sha384Use: 'Certificats TLS',
    sha512Len: '512 bits', sha512Sec: 'Tres elevee', sha512Use: 'Hachage haute securite',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'une fonction de hachage ?', faq1a: 'Une fonction de hachage prend une entree et produit une chaine de taille fixe appelee hachage ou empreinte.',
    faq2q: 'MD5 est-il encore sur ?', faq2a: 'MD5 est considere comme cryptographiquement casse depuis 2004. Il ne doit pas etre utilise pour la securite.',
    faq3q: 'Difference entre SHA-256 et SHA-512 ?', faq3a: 'SHA-256 produit un hachage de 256 bits, SHA-512 de 512 bits avec une marge de securite plus elevee.',
    faq4q: 'Mes donnees sont-elles en securite ?', faq4a: 'Oui, tous les calculs sont effectues localement dans votre navigateur. Aucune donnee n\'est envoyee a un serveur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Online Hash Generator (MD5, SHA-256, SHA-512)',
    description: 'Generieren Sie MD5, SHA-1, SHA-256, SHA-384 und SHA-512 Hashes online. Schnell, kostenlos und sicher.',
    inputLabel: 'Texteingabe', inputPlaceholder: 'Text eingeben...', generateBtn: 'Hashes generieren', clear: 'Loeschen',
    uppercase: 'Grossbuchstaben', lowercase: 'Kleinbuchstaben', algorithm: 'Algorithmus', hashValue: 'Hash-Wert',
    allAlgorithms: 'Alle Algorithmen', selectAlgo: 'Algorithmus waehlen', bits: 'Bits',
    introTitle: 'Kostenloser Online Hash Generator', introText: 'Generieren Sie kryptografische Hashes mit MD5, SHA-1, SHA-256, SHA-384 und SHA-512. Alle Berechnungen erfolgen lokal in Ihrem Browser.',
    cheatTitle: 'Algorithmenvergleich', algoCol: 'Algorithmus', lengthCol: 'Laenge', securityCol: 'Sicherheit', useCol: 'Verwendung',
    md5Len: '128 Bits', md5Sec: 'Niedrig', md5Use: 'Pruefsummen',
    sha1Len: '160 Bits', sha1Sec: 'Niedrig', sha1Use: 'Altsysteme',
    sha256Len: '256 Bits', sha256Sec: 'Hoch', sha256Use: 'TLS, Blockchain',
    sha384Len: '384 Bits', sha384Sec: 'Hoch', sha384Use: 'TLS-Zertifikate',
    sha512Len: '512 Bits', sha512Sec: 'Sehr hoch', sha512Use: 'Hochsicherheits-Hashing',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist eine Hash-Funktion?', faq1a: 'Eine Hash-Funktion nimmt eine Eingabe und erzeugt eine Zeichenkette fester Groesse, den sogenannten Hash.',
    faq2q: 'Ist MD5 noch sicher?', faq2a: 'MD5 gilt seit 2004 als kryptografisch gebrochen und sollte nicht fuer Sicherheitszwecke verwendet werden.',
    faq3q: 'Unterschied zwischen SHA-256 und SHA-512?', faq3a: 'SHA-256 erzeugt einen 256-Bit-Hash, SHA-512 einen 512-Bit-Hash mit hoeherem Sicherheitsniveau.',
    faq4q: 'Sind meine Daten sicher?', faq4a: 'Ja, alle Berechnungen erfolgen lokal in Ihrem Browser. Es werden keine Daten an einen Server gesendet.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Hash en Linea (MD5, SHA-256, SHA-512)',
    description: 'Genere hashes MD5, SHA-1, SHA-256, SHA-384 y SHA-512 en linea. Rapido, gratuito y seguro.',
    inputLabel: 'Texto', inputPlaceholder: 'Ingrese texto...', generateBtn: 'Generar hashes', clear: 'Limpiar',
    uppercase: 'Mayusculas', lowercase: 'Minusculas', algorithm: 'Algoritmo', hashValue: 'Valor hash',
    allAlgorithms: 'Todos los algoritmos', selectAlgo: 'Seleccionar algoritmo', bits: 'bits',
    introTitle: 'Generador de hash gratuito', introText: 'Genere hashes criptograficos con MD5, SHA-1, SHA-256, SHA-384 y SHA-512. Todos los calculos se realizan en su navegador.',
    cheatTitle: 'Comparacion de algoritmos', algoCol: 'Algoritmo', lengthCol: 'Longitud', securityCol: 'Seguridad', useCol: 'Uso',
    md5Len: '128 bits', md5Sec: 'Bajo', md5Use: 'Sumas de verificacion',
    sha1Len: '160 bits', sha1Sec: 'Bajo', sha1Use: 'Sistemas antiguos',
    sha256Len: '256 bits', sha256Sec: 'Alto', sha256Use: 'TLS, blockchain',
    sha384Len: '384 bits', sha384Sec: 'Alto', sha384Use: 'Certificados TLS',
    sha512Len: '512 bits', sha512Sec: 'Muy alto', sha512Use: 'Hashing de alta seguridad',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una funcion hash?', faq1a: 'Una funcion hash toma una entrada y produce una cadena de tamano fijo llamada hash o resumen.',
    faq2q: 'MD5 sigue siendo seguro?', faq2a: 'MD5 se considera criptograficamente roto desde 2004. No debe usarse para seguridad.',
    faq3q: 'Diferencia entre SHA-256 y SHA-512?', faq3a: 'SHA-256 produce un hash de 256 bits, SHA-512 de 512 bits con mayor margen de seguridad.',
    faq4q: 'Mis datos estan seguros?', faq4a: 'Si, todos los calculos se realizan localmente en su navegador. No se envia ningun dato a un servidor.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: '\u30aa\u30f3\u30e9\u30a4\u30f3\u30cf\u30c3\u30b7\u30e5\u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc (MD5, SHA-256, SHA-512)',
    description: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512 \u30cf\u30c3\u30b7\u30e5\u3092\u30aa\u30f3\u30e9\u30a4\u30f3\u3067\u751f\u6210\u3002\u9ad8\u901f\u30fb\u7121\u6599\u30fb\u5b89\u5168\u3002',
    inputLabel: '\u30c6\u30ad\u30b9\u30c8\u5165\u529b', inputPlaceholder: '\u30c6\u30ad\u30b9\u30c8\u3092\u5165\u529b...', generateBtn: '\u30cf\u30c3\u30b7\u30e5\u751f\u6210', clear: '\u30af\u30ea\u30a2',
    uppercase: '\u5927\u6587\u5b57', lowercase: '\u5c0f\u6587\u5b57', algorithm: '\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0', hashValue: '\u30cf\u30c3\u30b7\u30e5\u5024',
    allAlgorithms: '\u5168\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0', selectAlgo: '\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u3092\u9078\u629e', bits: '\u30d3\u30c3\u30c8',
    introTitle: '\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3\u30cf\u30c3\u30b7\u30e5\u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc', introText: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512 \u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u3067\u6697\u53f7\u30cf\u30c3\u30b7\u30e5\u3092\u5373\u5ea7\u306b\u751f\u6210\u3002\u3059\u3079\u3066\u306e\u8a08\u7b97\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u5b9f\u884c\u3055\u308c\u307e\u3059\u3002',
    cheatTitle: '\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0\u6bd4\u8f03', algoCol: '\u30a2\u30eb\u30b4\u30ea\u30ba\u30e0', lengthCol: '\u51fa\u529b\u9577', securityCol: '\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3', useCol: '\u7528\u9014',
    md5Len: '128 \u30d3\u30c3\u30c8', md5Sec: '\u4f4e (\u7834\u7dbb\u6e08\u307f)', md5Use: '\u30c1\u30a7\u30c3\u30af\u30b5\u30e0',
    sha1Len: '160 \u30d3\u30c3\u30c8', sha1Sec: '\u4f4e (\u975e\u63a8\u5968)', sha1Use: '\u30ec\u30ac\u30b7\u30fc, Git',
    sha256Len: '256 \u30d3\u30c3\u30c8', sha256Sec: '\u9ad8', sha256Use: 'TLS, \u30d6\u30ed\u30c3\u30af\u30c1\u30a7\u30fc\u30f3, JWT',
    sha384Len: '384 \u30d3\u30c3\u30c8', sha384Sec: '\u9ad8', sha384Use: 'TLS \u8a3c\u660e\u66f8',
    sha512Len: '512 \u30d3\u30c3\u30c8', sha512Sec: '\u975e\u5e38\u306b\u9ad8\u3044', sha512Use: '\u9ad8\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u30cf\u30c3\u30b7\u30e5',
    faqTitle: '\u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1q: '\u30cf\u30c3\u30b7\u30e5\u95a2\u6570\u3068\u306f\uff1f', faq1a: '\u30cf\u30c3\u30b7\u30e5\u95a2\u6570\u306f\u5165\u529b\u3092\u53d7\u3051\u53d6\u308a\u3001\u56fa\u5b9a\u30b5\u30a4\u30ba\u306e\u30d0\u30a4\u30c8\u5217\uff08\u30cf\u30c3\u30b7\u30e5\u307e\u305f\u306f\u30c0\u30a4\u30b8\u30a7\u30b9\u30c8\uff09\u3092\u751f\u6210\u3057\u307e\u3059\u3002',
    faq2q: 'MD5 \u306f\u307e\u3060\u5b89\u5168\u3067\u3059\u304b\uff1f', faq2a: 'MD5 \u306f 2004 \u5e74\u4ee5\u964d\u6697\u53f7\u5b66\u7684\u306b\u7834\u7dbb\u3055\u308c\u3066\u304a\u308a\u3001\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u76ee\u7684\u306b\u306f\u4f7f\u7528\u3059\u3079\u304d\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002',
    faq3q: 'SHA-256 \u3068 SHA-512 \u306e\u9055\u3044\u306f\uff1f', faq3a: 'SHA-256 \u306f 256 \u30d3\u30c3\u30c8\u3001SHA-512 \u306f 512 \u30d3\u30c3\u30c8\u306e\u30cf\u30c3\u30b7\u30e5\u3092\u751f\u6210\u300264 \u30d3\u30c3\u30c8\u30d7\u30ed\u30bb\u30c3\u30b5\u3067\u306f SHA-512 \u306e\u65b9\u304c\u9ad8\u901f\u3067\u3059\u3002',
    faq4q: '\u30c7\u30fc\u30bf\u306f\u5b89\u5168\u3067\u3059\u304b\uff1f', faq4a: '\u5b8c\u5168\u306b\u5b89\u5168\u3067\u3059\u3002Web Crypto API \u3092\u4f7f\u7528\u3057\u3066\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u30ed\u30fc\u30ab\u30eb\u306b\u8a08\u7b97\u3055\u308c\u307e\u3059\u3002',
    relatedTitle: '\u95a2\u9023\u30c4\u30fc\u30eb',
  },
  ko: {
    title: '\uc628\ub77c\uc778 \ud574\uc2dc \uc0dd\uc131\uae30 (MD5, SHA-256, SHA-512)',
    description: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512 \ud574\uc2dc\ub97c \uc628\ub77c\uc778\uc73c\ub85c \uc0dd\uc131\u3002\ube60\ub974\uace0 \uc548\uc804\ud55c \ud074\ub77c\uc774\uc5b8\ud2b8 \uc0ac\uc774\ub4dc \ud574\uc2dc \uacc4\uc0b0\uae30\u3002',
    inputLabel: '\ud14d\uc2a4\ud2b8 \uc785\ub825', inputPlaceholder: '\ud14d\uc2a4\ud2b8\ub97c \uc785\ub825\ud558\uc138\uc694...', generateBtn: '\ud574\uc2dc \uc0dd\uc131', clear: '\uc9c0\uc6b0\uae30',
    uppercase: '\ub300\ubb38\uc790', lowercase: '\uc18c\ubb38\uc790', algorithm: '\uc54c\uace0\ub9ac\uc998', hashValue: '\ud574\uc2dc \uac12',
    allAlgorithms: '\ubaa8\ub4e0 \uc54c\uace0\ub9ac\uc998', selectAlgo: '\uc54c\uace0\ub9ac\uc998 \uc120\ud0dd', bits: '\ube44\ud2b8',
    introTitle: '\ubb34\ub8cc \uc628\ub77c\uc778 \ud574\uc2dc \uc0dd\uc131\uae30', introText: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512 \uc54c\uace0\ub9ac\uc998\uc73c\ub85c \uc554\ud638\ud654 \ud574\uc2dc\ub97c \uc989\uc2dc \uc0dd\uc131\ud569\ub2c8\ub2e4\u3002\ubaa8\ub4e0 \uacc4\uc0b0\uc740 \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589\ub429\ub2c8\ub2e4\u3002',
    cheatTitle: '\uc54c\uace0\ub9ac\uc998 \ube44\uad50', algoCol: '\uc54c\uace0\ub9ac\uc998', lengthCol: '\ucd9c\ub825 \uae38\uc774', securityCol: '\ubcf4\uc548 \uc218\uc900', useCol: '\uc6a9\ub3c4',
    md5Len: '128 \ube44\ud2b8', md5Sec: '\ub0ae\uc74c (\uae68\uc9d0)', md5Use: '\uccb4\ud06c\uc12c',
    sha1Len: '160 \ube44\ud2b8', sha1Sec: '\ub0ae\uc74c (\ube44\uad8c\uc7a5)', sha1Use: '\ub808\uac70\uc2dc \uc2dc\uc2a4\ud15c, Git',
    sha256Len: '256 \ube44\ud2b8', sha256Sec: '\ub192\uc74c', sha256Use: 'TLS, \ube14\ub85d\uccb4\uc778, JWT',
    sha384Len: '384 \ube44\ud2b8', sha384Sec: '\ub192\uc74c', sha384Use: 'TLS \uc778\uc99d\uc11c',
    sha512Len: '512 \ube44\ud2b8', sha512Sec: '\ub9e4\uc6b0 \ub192\uc74c', sha512Use: '\uace0\ubcf4\uc548 \ud574\uc2f1',
    faqTitle: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1q: '\ud574\uc2dc \ud568\uc218\ub780 \ubb34\uc5c7\uc778\uac00\uc694?', faq1a: '\ud574\uc2dc \ud568\uc218\ub294 \uc785\ub825\uc744 \ubc1b\uc544 \uace0\uc815 \ud06c\uae30\uc758 \ubc14\uc774\ud2b8 \ubb38\uc790\uc5f4(\ud574\uc2dc \ub610\ub294 \ub2e4\uc774\uc81c\uc2a4\ud2b8)\uc744 \uc0dd\uc131\ud569\ub2c8\ub2e4\u3002',
    faq2q: 'MD5\ub294 \uc544\uc9c1 \uc548\uc804\ud55c\uac00\uc694?', faq2a: 'MD5\ub294 2004\ub144\ubd80\ud130 \uc554\ud638\ud559\uc801\uc73c\ub85c \uae68\uc9c4 \uac83\uc73c\ub85c \uac04\uc8fc\ub418\uba70 \ubcf4\uc548 \ubaa9\uc801\uc73c\ub85c\ub294 \uc0ac\uc6a9\ud558\uba74 \uc548 \ub429\ub2c8\ub2e4\u3002',
    faq3q: 'SHA-256\uacfc SHA-512\uc758 \ucc28\uc774\uc810\uc740?', faq3a: 'SHA-256\uc740 256\ube44\ud2b8, SHA-512\ub294 512\ube44\ud2b8 \ud574\uc2dc\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4\u3002 64\ube44\ud2b8 \ud504\ub85c\uc138\uc11c\uc5d0\uc11c\ub294 SHA-512\uac00 \ub354 \ube60\ub97c \uc218 \uc788\uc2b5\ub2c8\ub2e4\u3002',
    faq4q: '\ub370\uc774\ud130\ub294 \uc548\uc804\ud55c\uac00\uc694?', faq4a: '\uc644\uc804\ud788 \uc548\uc804\ud569\ub2c8\ub2e4\u3002 Web Crypto API\ub85c \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \ub85c\uceec\ub85c \uacc4\uc0b0\ub429\ub2c8\ub2e4\u3002',
    relatedTitle: '\uad00\ub828 \ub3c4\uad6c',
  },
};

export default function OnlineHashGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [uppercase, setUppercase] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState('all');

  const algorithms = [
    { name: 'MD5', webCrypto: false },
    { name: 'SHA-1', webCrypto: true, algo: 'SHA-1' },
    { name: 'SHA-256', webCrypto: true, algo: 'SHA-256' },
    { name: 'SHA-384', webCrypto: true, algo: 'SHA-384' },
    { name: 'SHA-512', webCrypto: true, algo: 'SHA-512' },
  ];

  const generate = async () => {
    if (!input.trim()) return;
    const results: Record<string, string> = {};
    const algosToRun = selectedAlgo === 'all' ? algorithms : algorithms.filter(a => a.name === selectedAlgo);
    for (const algo of algosToRun) {
      if (algo.name === 'MD5') {
        results['MD5'] = md5(input);
      } else if (algo.webCrypto && algo.algo) {
        results[algo.name] = await hashText(input, algo.algo);
      }
    }
    setHashes(results);
  };

  const formatHash = (hash: string) => uppercase ? hash.toUpperCase() : hash;

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
    <ToolLayout title={t.title} description={t.description} toolId="online-hash-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={() => { setInput(''); setHashes({}); }} className="btn btn-secondary">{t.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={selectedAlgo} onChange={e => setSelectedAlgo(e.target.value)} style={{ padding: '4px 8px', fontSize: 12 }}>
            <option value="all">{t.allAlgorithms}</option>
            {algorithms.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
          <button onClick={() => setUppercase(!uppercase)} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }}>
            {uppercase ? t.uppercase : t.lowercase}
          </button>
        </div>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 120 }} />
      </div>

      {/* Results */}
      {Object.keys(hashes).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 14, background: 'var(--bg-input)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>{algo}</span>
                <CopyButton text={formatHash(hash)} />
              </div>
              <code style={{ fontSize: 12, wordBreak: 'break-all', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {formatHash(hash)}
              </code>
            </div>
          ))}
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
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.algoCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.lengthCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.securityCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.useCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['MD5', t.md5Len, t.md5Sec, t.md5Use],
                ['SHA-1', t.sha1Len, t.sha1Sec, t.sha1Use],
                ['SHA-256', t.sha256Len, t.sha256Sec, t.sha256Use],
                ['SHA-384', t.sha384Len, t.sha384Sec, t.sha384Use],
                ['SHA-512', t.sha512Len, t.sha512Sec, t.sha512Use],
              ].map(([algo, len, sec, use], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, fontFamily: 'monospace' }}>{algo}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{len}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{sec}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{use}</td>
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
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
            { href: `/${lang}/tools/md5-hash-generator`, label: 'MD5 Generator' },
            { href: `/${lang}/tools/sha256-hash-generator`, label: 'SHA-256 Generator' },
            { href: `/${lang}/tools/hmac-generator`, label: 'HMAC Generator' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder' },
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
