'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Beautifier & Pretty Print Online',
    description: 'Beautify and pretty-print JSON data online. Transform minified JSON into readable, well-indented format with syntax highlighting.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your minified or messy JSON here...',
    outputLabel: 'Beautified JSON',
    outputPlaceholder: 'Pretty-printed JSON will appear here...',
    beautifyBtn: 'Beautify JSON',
    minifyBtn: 'Minify',
    clear: 'Clear',
    loadSample: 'Load Sample',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    sortKeys: 'Sort Keys',
    valid: 'Valid JSON',
    invalid: 'Invalid JSON',
    lines: 'lines',
    chars: 'chars',
    introTitle: 'Free Online JSON Beautifier & Pretty Printer',
    introText: 'Transform compact, minified, or messy JSON into clean, readable, and well-indented format. This JSON beautifier parses your JSON data and reformats it with proper indentation, line breaks, and spacing. Ideal for debugging API responses, reading configuration files, and preparing JSON for documentation. Supports 2-space, 4-space, and tab indentation with optional key sorting.',
    cheatTitle: 'JSON Formatting Tips',
    ruleCol: 'Feature',
    descCol: 'Description',
    exampleCol: 'Example',
    rule1: 'Indentation', rule1Desc: 'Choose 2, 4 spaces or tabs for readability', rule1Ex: '2 or 4 spaces recommended',
    rule2: 'Sort keys', rule2Desc: 'Alphabetically sort object keys', rule2Ex: '{"a":1,"b":2,"c":3}',
    rule3: 'Minify', rule3Desc: 'Remove all whitespace for production', rule3Ex: '{"a":1,"b":2}',
    rule4: 'Nested objects', rule4Desc: 'Each level gets additional indentation', rule4Ex: 'Nested = deeper indent',
    rule5: 'Arrays', rule5Desc: 'Array items on separate lines', rule5Ex: '[\n  1,\n  2,\n  3\n]',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is JSON beautification?',
    faq1a: 'JSON beautification (also called pretty-printing) is the process of formatting compact or minified JSON data into a human-readable format with proper indentation, line breaks, and spacing. It makes JSON easier to read, debug, and understand without changing the data content.',
    faq2q: 'What is the difference between JSON beautify and JSON format?',
    faq2a: 'JSON beautify and JSON format are essentially the same operation. Both take raw or minified JSON and add indentation and line breaks. "Beautify" typically emphasizes making the output visually appealing, while "format" is a more general term. The result is identical: clean, readable JSON.',
    faq3q: 'Should I sort JSON keys?',
    faq3a: 'Sorting JSON keys alphabetically is useful for comparing JSON objects, maintaining consistent output, and making it easier to find specific keys in large objects. However, key order does not affect JSON validity or behavior -- the JSON specification treats objects as unordered collections of key-value pairs.',
    faq4q: 'When should I minify JSON?',
    faq4a: 'Minify JSON when sending data over networks (API responses, configuration transfers) to reduce bandwidth. Minified JSON removes all unnecessary whitespace and line breaks, making the payload smaller. For storage and debugging, use beautified JSON instead.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON \u7f8e\u5316\u5668 - \u5728\u7ebf\u683c\u5f0f\u5316\u6253\u5370',
    description: '\u5728\u7ebf\u7f8e\u5316\u548c\u683c\u5f0f\u5316\u6253\u5370 JSON \u6570\u636e\u3002\u5c06\u538b\u7f29\u7684 JSON \u8f6c\u6362\u4e3a\u53ef\u8bfb\u7684\u3001\u7f29\u8fdb\u826f\u597d\u7684\u683c\u5f0f\u3002',
    inputLabel: 'JSON \u8f93\u5165',
    inputPlaceholder: '\u5728\u6b64\u7c98\u8d34\u538b\u7f29\u6216\u6742\u4e71\u7684 JSON...',
    outputLabel: '\u7f8e\u5316\u540e\u7684 JSON',
    outputPlaceholder: '\u7f8e\u5316\u540e\u7684 JSON \u5c06\u663e\u793a\u5728\u6b64...',
    beautifyBtn: '\u7f8e\u5316 JSON',
    minifyBtn: '\u538b\u7f29',
    clear: '\u6e05\u9664',
    loadSample: '\u52a0\u8f7d\u793a\u4f8b',
    indent: '\u7f29\u8fdb',
    spaces: '\u7a7a\u683c',
    tab: '\u5236\u8868\u7b26',
    sortKeys: '\u6392\u5e8f\u952e',
    valid: 'JSON \u6709\u6548',
    invalid: 'JSON \u65e0\u6548',
    lines: '\u884c',
    chars: '\u5b57\u7b26',
    introTitle: '\u514d\u8d39\u5728\u7ebf JSON \u7f8e\u5316\u5668',
    introText: '\u5c06\u7d27\u51d1\u3001\u538b\u7f29\u6216\u6742\u4e71\u7684 JSON \u8f6c\u6362\u4e3a\u5e72\u51c0\u3001\u53ef\u8bfb\u3001\u7f29\u8fdb\u826f\u597d\u7684\u683c\u5f0f\u3002\u652f\u6301 2 \u7a7a\u683c\u30014 \u7a7a\u683c\u548c\u5236\u8868\u7b26\u7f29\u8fdb\uff0c\u53ef\u9009\u952e\u6392\u5e8f\u3002',
    cheatTitle: 'JSON \u683c\u5f0f\u5316\u6280\u5de7',
    ruleCol: '\u529f\u80fd', descCol: '\u8bf4\u660e', exampleCol: '\u793a\u4f8b',
    rule1: '\u7f29\u8fdb', rule1Desc: '\u9009\u62e9 2\u30014 \u7a7a\u683c\u6216\u5236\u8868\u7b26', rule1Ex: '\u63a8\u8350 2 \u6216 4 \u7a7a\u683c',
    rule2: '\u952e\u6392\u5e8f', rule2Desc: '\u6309\u5b57\u6bcd\u987a\u5e8f\u6392\u5217\u5bf9\u8c61\u952e', rule2Ex: '{"a":1,"b":2,"c":3}',
    rule3: '\u538b\u7f29', rule3Desc: '\u79fb\u9664\u6240\u6709\u7a7a\u767d\u7528\u4e8e\u751f\u4ea7\u73af\u5883', rule3Ex: '{"a":1,"b":2}',
    rule4: '\u5d4c\u5957\u5bf9\u8c61', rule4Desc: '\u6bcf\u4e00\u5c42\u589e\u52a0\u989d\u5916\u7f29\u8fdb', rule4Ex: '\u5d4c\u5957 = \u66f4\u6df1\u7f29\u8fdb',
    rule5: '\u6570\u7ec4', rule5Desc: '\u6570\u7ec4\u9879\u5206\u884c\u663e\u793a', rule5Ex: '[\n  1,\n  2\n]',
    faqTitle: '\u5e38\u89c1\u95ee\u9898',
    faq1q: '\u4ec0\u4e48\u662f JSON \u7f8e\u5316\uff1f',
    faq1a: 'JSON \u7f8e\u5316\uff08\u4e5f\u53eb\u683c\u5f0f\u5316\u6253\u5370\uff09\u662f\u5c06\u7d27\u51d1\u6216\u538b\u7f29\u7684 JSON \u6570\u636e\u683c\u5f0f\u5316\u4e3a\u4eba\u7c7b\u53ef\u8bfb\u7684\u683c\u5f0f\uff0c\u5305\u62ec\u9002\u5f53\u7684\u7f29\u8fdb\u3001\u6362\u884c\u548c\u95f4\u8ddd\u3002',
    faq2q: 'JSON \u7f8e\u5316\u548c JSON \u683c\u5f0f\u5316\u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq2a: '\u57fa\u672c\u76f8\u540c\u3002\u4e24\u8005\u90fd\u5c06\u539f\u59cb\u6216\u538b\u7f29\u7684 JSON \u6dfb\u52a0\u7f29\u8fdb\u548c\u6362\u884c\uff0c\u7ed3\u679c\u662f\u4e00\u6837\u7684\uff1a\u5e72\u51c0\u53ef\u8bfb\u7684 JSON\u3002',
    faq3q: '\u5e94\u8be5\u5bf9 JSON \u952e\u8fdb\u884c\u6392\u5e8f\u5417\uff1f',
    faq3a: '\u6309\u5b57\u6bcd\u987a\u5e8f\u6392\u5e8f\u5bf9\u4e8e\u6bd4\u8f83 JSON \u5bf9\u8c61\u548c\u67e5\u627e\u7279\u5b9a\u952e\u5f88\u6709\u7528\u3002\u4f46\u952e\u987a\u5e8f\u4e0d\u5f71\u54cd JSON \u6709\u6548\u6027\u3002',
    faq4q: '\u4ec0\u4e48\u65f6\u5019\u5e94\u8be5\u538b\u7f29 JSON\uff1f',
    faq4a: '\u5728\u7f51\u7edc\u4f20\u8f93\u6570\u636e\u65f6\u538b\u7f29 JSON \u4ee5\u51cf\u5c11\u5e26\u5bbd\u3002\u5b58\u50a8\u548c\u8c03\u8bd5\u65f6\u4f7f\u7528\u7f8e\u5316\u7684 JSON\u3002',
    relatedTitle: '\u76f8\u5173\u5de5\u5177',
  },
  fr: {
    title: 'Embellisseur JSON & Pretty Print en Ligne',
    description: 'Embellissez et imprimez joliment les donnees JSON en ligne. Transformez le JSON minifie en format lisible et indente.',
    inputLabel: 'Entree JSON', inputPlaceholder: 'Collez votre JSON minifie ici...',
    outputLabel: 'JSON embelli', outputPlaceholder: 'Le JSON embelli apparaitra ici...',
    beautifyBtn: 'Embellir JSON', minifyBtn: 'Minifier', clear: 'Effacer', loadSample: 'Charger un exemple',
    indent: 'Indentation', spaces: 'espaces', tab: 'Tab', sortKeys: 'Trier les cles',
    valid: 'JSON valide', invalid: 'JSON invalide', lines: 'lignes', chars: 'caracteres',
    introTitle: 'Embellisseur JSON gratuit en ligne', introText: 'Transformez le JSON compact ou minifie en format lisible et bien indente. Prend en charge l\'indentation par espaces et tabulations.',
    cheatTitle: 'Conseils de formatage JSON', ruleCol: 'Fonctionnalite', descCol: 'Description', exampleCol: 'Exemple',
    rule1: 'Indentation', rule1Desc: 'Choisir 2, 4 espaces ou tabulations', rule1Ex: '2 ou 4 espaces recommandes',
    rule2: 'Trier les cles', rule2Desc: 'Trier les cles alphabetiquement', rule2Ex: '{"a":1,"b":2}',
    rule3: 'Minifier', rule3Desc: 'Supprimer tous les espaces pour la production', rule3Ex: '{"a":1,"b":2}',
    rule4: 'Objets imbriques', rule4Desc: 'Indentation supplementaire par niveau', rule4Ex: 'Imbrique = indent plus profond',
    rule5: 'Tableaux', rule5Desc: 'Elements de tableau sur des lignes separees', rule5Ex: '[\n  1,\n  2\n]',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que l\'embellissement JSON ?', faq1a: 'L\'embellissement JSON consiste a formater le JSON compact en format lisible avec indentation et sauts de ligne.',
    faq2q: 'Difference entre embellir et formater ?', faq2a: 'Les deux operations sont identiques. Le resultat est le meme : un JSON propre et lisible.',
    faq3q: 'Faut-il trier les cles JSON ?', faq3a: 'Le tri est utile pour comparer des objets JSON. L\'ordre des cles n\'affecte pas la validite du JSON.',
    faq4q: 'Quand minifier le JSON ?', faq4a: 'Minifiez lors de l\'envoi de donnees sur le reseau pour reduire la bande passante.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON Verschoenerer & Pretty Print Online',
    description: 'JSON-Daten online verschoenern und huebsch drucken. Minifiziertes JSON in lesbares, eingeruecktes Format umwandeln.',
    inputLabel: 'JSON-Eingabe', inputPlaceholder: 'Minifiziertes JSON hier einfuegen...',
    outputLabel: 'Verschoenertes JSON', outputPlaceholder: 'Verschoenertes JSON erscheint hier...',
    beautifyBtn: 'JSON verschoenern', minifyBtn: 'Minifizieren', clear: 'Loeschen', loadSample: 'Beispiel laden',
    indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab', sortKeys: 'Schluessel sortieren',
    valid: 'Gueltiges JSON', invalid: 'Ungueltiges JSON', lines: 'Zeilen', chars: 'Zeichen',
    introTitle: 'Kostenloser JSON Verschoenerer', introText: 'Kompaktes oder minifiziertes JSON in sauberes, lesbares Format umwandeln. Unterstuetzt Leerzeichen- und Tab-Einrueckung.',
    cheatTitle: 'JSON-Formatierungstipps', ruleCol: 'Funktion', descCol: 'Beschreibung', exampleCol: 'Beispiel',
    rule1: 'Einrueckung', rule1Desc: '2, 4 Leerzeichen oder Tabs waehlen', rule1Ex: '2 oder 4 Leerzeichen empfohlen',
    rule2: 'Schluessel sortieren', rule2Desc: 'Schluessel alphabetisch sortieren', rule2Ex: '{"a":1,"b":2}',
    rule3: 'Minifizieren', rule3Desc: 'Alle Leerzeichen entfernen', rule3Ex: '{"a":1,"b":2}',
    rule4: 'Verschachtelte Objekte', rule4Desc: 'Zusaetzliche Einrueckung pro Ebene', rule4Ex: 'Verschachtelt = tiefere Einrueckung',
    rule5: 'Arrays', rule5Desc: 'Array-Elemente auf separaten Zeilen', rule5Ex: '[\n  1,\n  2\n]',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist JSON-Verschoenerung?', faq1a: 'JSON-Verschoenerung formatiert kompaktes JSON in lesbares Format mit Einrueckung und Zeilenumbruechen.',
    faq2q: 'Unterschied zwischen Verschoenern und Formatieren?', faq2a: 'Beide Operationen sind identisch. Das Ergebnis ist sauberes, lesbares JSON.',
    faq3q: 'Sollte man JSON-Schluessel sortieren?', faq3a: 'Sortierung ist nuetzlich zum Vergleichen von JSON-Objekten. Die Schluesselreihenfolge beeinflusst nicht die Gueltigkeit.',
    faq4q: 'Wann JSON minifizieren?', faq4a: 'Minifizieren Sie beim Senden von Daten ueber Netzwerke zur Bandbreitenreduzierung.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Embellecedor JSON & Pretty Print en Linea',
    description: 'Embellezca e imprima bonito datos JSON en linea. Transforme JSON minificado en formato legible e indentado.',
    inputLabel: 'Entrada JSON', inputPlaceholder: 'Pegue su JSON minificado aqui...',
    outputLabel: 'JSON embellecido', outputPlaceholder: 'El JSON embellecido aparecera aqui...',
    beautifyBtn: 'Embellecer JSON', minifyBtn: 'Minificar', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    indent: 'Indentacion', spaces: 'espacios', tab: 'Tab', sortKeys: 'Ordenar claves',
    valid: 'JSON valido', invalid: 'JSON invalido', lines: 'lineas', chars: 'caracteres',
    introTitle: 'Embellecedor JSON gratuito', introText: 'Transforme JSON compacto o minificado en formato limpio y legible. Soporta indentacion por espacios y tabulaciones.',
    cheatTitle: 'Consejos de formateo JSON', ruleCol: 'Caracteristica', descCol: 'Descripcion', exampleCol: 'Ejemplo',
    rule1: 'Indentacion', rule1Desc: 'Elegir 2, 4 espacios o tabulaciones', rule1Ex: '2 o 4 espacios recomendados',
    rule2: 'Ordenar claves', rule2Desc: 'Ordenar claves alfabeticamente', rule2Ex: '{"a":1,"b":2}',
    rule3: 'Minificar', rule3Desc: 'Eliminar todos los espacios', rule3Ex: '{"a":1,"b":2}',
    rule4: 'Objetos anidados', rule4Desc: 'Indentacion adicional por nivel', rule4Ex: 'Anidado = indent mas profundo',
    rule5: 'Arrays', rule5Desc: 'Elementos en lineas separadas', rule5Ex: '[\n  1,\n  2\n]',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es el embellecimiento JSON?', faq1a: 'El embellecimiento JSON formatea JSON compacto en formato legible con indentacion y saltos de linea.',
    faq2q: 'Diferencia entre embellecer y formatear?', faq2a: 'Ambas operaciones son identicas. El resultado es JSON limpio y legible.',
    faq3q: 'Se deben ordenar las claves JSON?', faq3a: 'Ordenar es util para comparar objetos JSON. El orden de claves no afecta la validez.',
    faq4q: 'Cuando minificar JSON?', faq4a: 'Minifique al enviar datos por la red para reducir el ancho de banda.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JSON \u30d3\u30e5\u30fc\u30c6\u30a3\u30d5\u30a1\u30a4\u30a2\u30fc & Pretty Print \u30aa\u30f3\u30e9\u30a4\u30f3',
    description: 'JSON \u30c7\u30fc\u30bf\u3092\u30aa\u30f3\u30e9\u30a4\u30f3\u3067\u7f8e\u5316\u30fb\u6574\u5f62\u5370\u5237\u3002\u5727\u7e2e\u3055\u308c\u305f JSON \u3092\u8aad\u307f\u3084\u3059\u3044\u30a4\u30f3\u30c7\u30f3\u30c8\u5f62\u5f0f\u306b\u5909\u63db\u3002',
    inputLabel: 'JSON \u5165\u529b', inputPlaceholder: '\u5727\u7e2e\u3055\u308c\u305f JSON \u3092\u8cbc\u308a\u4ed8\u3051...',
    outputLabel: '\u7f8e\u5316\u3055\u308c\u305f JSON', outputPlaceholder: '\u7f8e\u5316\u3055\u308c\u305f JSON \u304c\u3053\u3053\u306b\u8868\u793a...',
    beautifyBtn: 'JSON \u3092\u7f8e\u5316', minifyBtn: '\u5727\u7e2e', clear: '\u30af\u30ea\u30a2', loadSample: '\u30b5\u30f3\u30d7\u30eb\u8aad\u8fbc',
    indent: '\u30a4\u30f3\u30c7\u30f3\u30c8', spaces: '\u30b9\u30da\u30fc\u30b9', tab: '\u30bf\u30d6', sortKeys: '\u30ad\u30fc\u3092\u30bd\u30fc\u30c8',
    valid: '\u6709\u52b9\u306a JSON', invalid: '\u7121\u52b9\u306a JSON', lines: '\u884c', chars: '\u6587\u5b57',
    introTitle: '\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3 JSON \u30d3\u30e5\u30fc\u30c6\u30a3\u30d5\u30a1\u30a4\u30a2\u30fc',
    introText: '\u30b3\u30f3\u30d1\u30af\u30c8\u307e\u305f\u306f\u5727\u7e2e\u3055\u308c\u305f JSON \u3092\u304d\u308c\u3044\u3067\u8aad\u307f\u3084\u3059\u3044\u5f62\u5f0f\u306b\u5909\u63db\u3057\u307e\u3059\u3002\u30b9\u30da\u30fc\u30b9\u3068\u30bf\u30d6\u306e\u30a4\u30f3\u30c7\u30f3\u30c8\u3092\u30b5\u30dd\u30fc\u30c8\u3002',
    cheatTitle: 'JSON \u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u30b3\u30c4', ruleCol: '\u6a5f\u80fd', descCol: '\u8aac\u660e', exampleCol: '\u4f8b',
    rule1: '\u30a4\u30f3\u30c7\u30f3\u30c8', rule1Desc: '2, 4 \u30b9\u30da\u30fc\u30b9\u307e\u305f\u306f\u30bf\u30d6\u3092\u9078\u629e', rule1Ex: '2 \u307e\u305f\u306f 4 \u30b9\u30da\u30fc\u30b9\u63a8\u5968',
    rule2: '\u30ad\u30fc\u30bd\u30fc\u30c8', rule2Desc: '\u30ad\u30fc\u3092\u30a2\u30eb\u30d5\u30a1\u30d9\u30c3\u30c8\u9806\u306b\u30bd\u30fc\u30c8', rule2Ex: '{"a":1,"b":2}',
    rule3: '\u5727\u7e2e', rule3Desc: '\u3059\u3079\u3066\u306e\u7a7a\u767d\u3092\u524a\u9664', rule3Ex: '{"a":1,"b":2}',
    rule4: '\u30cd\u30b9\u30c8\u3055\u308c\u305f\u30aa\u30d6\u30b8\u30a7\u30af\u30c8', rule4Desc: '\u5404\u30ec\u30d9\u30eb\u3067\u8ffd\u52a0\u30a4\u30f3\u30c7\u30f3\u30c8', rule4Ex: '\u30cd\u30b9\u30c8 = \u6df1\u3044\u30a4\u30f3\u30c7\u30f3\u30c8',
    rule5: '\u914d\u5217', rule5Desc: '\u914d\u5217\u8981\u7d20\u3092\u5225\u884c\u306b', rule5Ex: '[\n  1,\n  2\n]',
    faqTitle: '\u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1q: 'JSON \u7f8e\u5316\u3068\u306f\uff1f', faq1a: 'JSON \u7f8e\u5316\u306f\u30b3\u30f3\u30d1\u30af\u30c8\u306a JSON \u3092\u30a4\u30f3\u30c7\u30f3\u30c8\u3068\u6539\u884c\u3092\u52a0\u3048\u3066\u8aad\u307f\u3084\u3059\u3044\u5f62\u5f0f\u306b\u3059\u308b\u3053\u3068\u3067\u3059\u3002',
    faq2q: '\u7f8e\u5316\u3068\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u9055\u3044\u306f\uff1f', faq2a: '\u4e21\u65b9\u3068\u3082\u540c\u3058\u64cd\u4f5c\u3067\u3059\u3002\u7d50\u679c\u306f\u304d\u308c\u3044\u3067\u8aad\u307f\u3084\u3059\u3044 JSON \u3067\u3059\u3002',
    faq3q: 'JSON \u30ad\u30fc\u3092\u30bd\u30fc\u30c8\u3059\u3079\u304d\uff1f', faq3a: '\u30bd\u30fc\u30c8\u306f JSON \u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306e\u6bd4\u8f03\u306b\u4fbf\u5229\u3067\u3059\u3002\u30ad\u30fc\u306e\u9806\u5e8f\u306f JSON \u306e\u6709\u52b9\u6027\u306b\u5f71\u97ff\u3057\u307e\u305b\u3093\u3002',
    faq4q: 'JSON \u3092\u5727\u7e2e\u3059\u3079\u304d\u6642\u306f\uff1f', faq4a: '\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u7d4c\u7531\u3067\u30c7\u30fc\u30bf\u3092\u9001\u4fe1\u3059\u308b\u969b\u306b\u538b\u7e2e\u3057\u3066\u5e2f\u57df\u5e45\u3092\u524a\u6e1b\u3057\u307e\u3059\u3002',
    relatedTitle: '\u95a2\u9023\u30c4\u30fc\u30eb',
  },
  ko: {
    title: 'JSON \ubbf8\ud654 \ub3c4\uad6c & Pretty Print \uc628\ub77c\uc778',
    description: 'JSON \ub370\uc774\ud130\ub97c \uc628\ub77c\uc778\uc73c\ub85c \ubbf8\ud654 \ubc0f \uc815\ub82c \uc778\uc1c4\ud569\ub2c8\ub2e4. \uc555\ucd95\ub41c JSON\uc744 \uc77d\uae30 \uc26c\uc6b4 \ub4e4\uc5ec\uc4f0\uae30 \ud615\uc2dd\uc73c\ub85c \ubcc0\ud658.',
    inputLabel: 'JSON \uc785\ub825', inputPlaceholder: '\uc555\ucd95\ub41c JSON\uc744 \uc5ec\uae30\uc5d0 \ubd99\uc5ec\ub123\uae30...',
    outputLabel: '\ubbf8\ud654\ub41c JSON', outputPlaceholder: '\ubbf8\ud654\ub41c JSON\uc774 \uc5ec\uae30\uc5d0 \ud45c\uc2dc...',
    beautifyBtn: 'JSON \ubbf8\ud654', minifyBtn: '\uc555\ucd95', clear: '\uc9c0\uc6b0\uae30', loadSample: '\uc0d8\ud50c \ub85c\ub4dc',
    indent: '\ub4e4\uc5ec\uc4f0\uae30', spaces: '\uc2a4\ud398\uc774\uc2a4', tab: '\ud0ed', sortKeys: '\ud0a4 \uc815\ub82c',
    valid: '\uc720\ud6a8\ud55c JSON', invalid: '\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 JSON', lines: '\uc904', chars: '\ubb38\uc790',
    introTitle: '\ubb34\ub8cc \uc628\ub77c\uc778 JSON \ubbf8\ud654 \ub3c4\uad6c',
    introText: '\ucf64\ud329\ud2b8 \ub610\ub294 \uc555\ucd95\ub41c JSON\uc744 \uae54\ub054\ud558\uace0 \uc77d\uae30 \uc26c\uc6b4 \ud615\uc2dd\uc73c\ub85c \ubcc0\ud658\ud569\ub2c8\ub2e4. \uc2a4\ud398\uc774\uc2a4\uc640 \ud0ed \ub4e4\uc5ec\uc4f0\uae30\ub97c \uc9c0\uc6d0\ud569\ub2c8\ub2e4.',
    cheatTitle: 'JSON \ud3ec\ub9f7 \ud301', ruleCol: '\uae30\ub2a5', descCol: '\uc124\uba85', exampleCol: '\uc608\uc2dc',
    rule1: '\ub4e4\uc5ec\uc4f0\uae30', rule1Desc: '2, 4 \uc2a4\ud398\uc774\uc2a4 \ub610\ub294 \ud0ed \uc120\ud0dd', rule1Ex: '2 \ub610\ub294 4 \uc2a4\ud398\uc774\uc2a4 \uad8c\uc7a5',
    rule2: '\ud0a4 \uc815\ub82c', rule2Desc: '\ud0a4\ub97c \uc54c\ud30c\ubcb3 \uc21c\uc73c\ub85c \uc815\ub82c', rule2Ex: '{"a":1,"b":2}',
    rule3: '\uc555\ucd95', rule3Desc: '\ubaa8\ub4e0 \uacf5\ubc31 \uc81c\uac70', rule3Ex: '{"a":1,"b":2}',
    rule4: '\uc911\ucca9 \uac1d\uccb4', rule4Desc: '\uac01 \ub808\ubca8\ub9c8\ub2e4 \ucd94\uac00 \ub4e4\uc5ec\uc4f0\uae30', rule4Ex: '\uc911\ucca9 = \ub354 \uae4a\uc740 \ub4e4\uc5ec\uc4f0\uae30',
    rule5: '\ubc30\uc5f4', rule5Desc: '\ubc30\uc5f4 \uc694\uc18c\ub97c \ubcc4\ub3c4 \uc904\uc5d0', rule5Ex: '[\n  1,\n  2\n]',
    faqTitle: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1q: 'JSON \ubbf8\ud654\ub780 \ubb34\uc5c7\uc778\uac00\uc694?', faq1a: 'JSON \ubbf8\ud654\ub294 \ucf64\ud329\ud2b8\ud55c JSON\uc744 \ub4e4\uc5ec\uc4f0\uae30\uc640 \uc904\ubc14\uafbc\uc744 \ucd94\uac00\ud558\uc5ec \uc77d\uae30 \uc26c\uc6b4 \ud615\uc2dd\uc73c\ub85c \ub9cc\ub4dc\ub294 \uac83\uc785\ub2c8\ub2e4.',
    faq2q: '\ubbf8\ud654\uc640 \ud3ec\ub9f7\uc758 \ucc28\uc774\uc810\uc740?', faq2a: '\ub458 \ub2e4 \uac19\uc740 \uc791\uc5c5\uc785\ub2c8\ub2e4. \uacb0\uacfc\ub294 \uae54\ub054\ud558\uace0 \uc77d\uae30 \uc26c\uc6b4 JSON\uc785\ub2c8\ub2e4.',
    faq3q: 'JSON \ud0a4\ub97c \uc815\ub82c\ud574\uc57c \ud558\ub098\uc694?', faq3a: '\uc815\ub82c\uc740 JSON \uac1d\uccb4 \ube44\uad50\uc5d0 \uc720\uc6a9\ud569\ub2c8\ub2e4. \ud0a4 \uc21c\uc11c\ub294 JSON \uc720\ud6a8\uc131\uc5d0 \uc601\ud5a5\uc744 \uc8fc\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.',
    faq4q: '\uc5b8\uc81c JSON\uc744 \uc555\ucd95\ud574\uc57c \ud558\ub098\uc694?', faq4a: '\ub124\ud2b8\uc6cc\ud06c\ub85c \ub370\uc774\ud130\ub97c \ubcf4\ub0bc \ub54c \uc555\ucd95\ud558\uc5ec \ub300\uc5ed\ud3ed\uc744 \uc904\uc785\ub2c8\ub2e4.',
    relatedTitle: '\uad00\ub828 \ub3c4\uad6c',
  },
};

export default function JsonBeautifierOnline() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState<string>('2');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [sortKeys, setSortKeys] = useState(false);

  const sortObject = (obj: unknown): unknown => {
    if (Array.isArray(obj)) return obj.map(sortObject);
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj as Record<string, unknown>).sort().reduce((sorted: Record<string, unknown>, key) => {
        sorted[key] = sortObject((obj as Record<string, unknown>)[key]);
        return sorted;
      }, {});
    }
    return obj;
  };

  const beautify = () => {
    if (!input.trim()) return;
    try {
      let parsed = JSON.parse(input);
      if (sortKeys) parsed = sortObject(parsed);
      const indentVal = indent === 'tab' ? '\t' : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentVal));
      setError('');
      setIsValid(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
      setIsValid(false);
    }
  };

  const minify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
      setIsValid(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
      setIsValid(false);
    }
  };

  const loadSample = () => {
    setInput('{"name":"DevToolBox","version":"2.0","features":["JSON Beautifier","Pretty Print","Minify"],"config":{"theme":"dark","indent":2,"sortKeys":false},"stats":{"users":15000,"tools":139},"active":true}');
    setOutput(''); setError(''); setIsValid(null);
  };

  const outputLines = output ? output.split('\n').length : 0;
  const outputChars = output.length;

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
    <ToolLayout title={t.title} description={t.description} toolId="json-beautifier-online">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={beautify} className="btn btn-primary">{t.beautifyBtn}</button>
        <button onClick={minify} className="btn btn-secondary">{t.minifyBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setIsValid(null); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={sortKeys} onChange={e => setSortKeys(e.target.checked)} />
            {t.sortKeys}
          </label>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select value={indent} onChange={e => setIndent(e.target.value)} style={{ width: 100, padding: '4px 8px', fontSize: 12 }}>
            <option value="2">2 {t.spaces}</option>
            <option value="4">4 {t.spaces}</option>
            <option value="tab">{t.tab}</option>
          </select>
        </div>
      </div>

      {/* Validation status */}
      {isValid !== null && (
        <div style={{
          background: isValid ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
          border: `1px solid ${isValid ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.3)'}`,
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13,
          color: isValid ? '#22c55e' : 'var(--accent-rose)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>{isValid ? t.valid : `${t.invalid}: ${error}`}</span>
          {isValid && <span style={{ fontSize: 12, opacity: 0.7 }}>{outputLines} {t.lines} / {outputChars.toLocaleString()} {t.chars}</span>}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={t.outputPlaceholder} style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
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
              {[
                [t.rule1, t.rule1Desc, t.rule1Ex],
                [t.rule2, t.rule2Desc, t.rule2Ex],
                [t.rule3, t.rule3Desc, t.rule3Ex],
                [t.rule4, t.rule4Desc, t.rule4Ex],
                [t.rule5, t.rule5Desc, t.rule5Ex],
              ].map(([rule, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{rule}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{ex}</td>
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
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-beautifier`, label: 'JSON Beautifier' },
            { href: `/${lang}/tools/json-minifier`, label: 'JSON Minifier' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
            { href: `/${lang}/tools/json-formatter-validator`, label: 'JSON Formatter & Validator' },
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
