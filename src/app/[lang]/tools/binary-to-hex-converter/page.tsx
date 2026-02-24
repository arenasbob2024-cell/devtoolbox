'use client';

import React, { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Binary to Hex Converter',
    description: 'Convert binary numbers to hexadecimal and hex to binary online. Supports binary text, byte grouping, and uppercase/lowercase output.',
    inputLabel: 'Binary Input',
    inputPlaceholder: 'Enter binary number, e.g. 1010 1111 0011 0101',
    hexInputLabel: 'Hex Input',
    hexInputPlaceholder: 'Enter hex number, e.g. AF35 or 0xAF35',
    outputHex: 'Hexadecimal Output',
    outputBin: 'Binary Output',
    toHex: 'Binary to Hex',
    toBin: 'Hex to Binary',
    clear: 'Clear',
    loadSample: 'Load Sample',
    uppercase: 'Uppercase',
    groupBits: 'Group bits (nibbles)',
    prefix: 'Add 0x prefix',
    introTitle: 'Free Online Binary to Hex Converter',
    introText: 'Convert binary numbers to hexadecimal and hexadecimal back to binary instantly in your browser. Supports grouping binary digits into nibbles (4-bit groups), uppercase or lowercase hex output, and optional 0x prefix. Binary and hexadecimal are both essential numbering systems used in programming, computer science, networking, and digital electronics.',
    cheatTitle: 'Quick Reference Table',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do you convert binary to hexadecimal?',
    faq1a: 'Group binary digits into 4-bit nibbles from right to left, then convert each nibble to its hexadecimal equivalent. For example, 1010 1111 becomes AF in hex (1010 = A, 1111 = F). Each hexadecimal digit represents exactly 4 binary bits.',
    faq2q: 'How do you convert hexadecimal to binary?',
    faq2a: 'Replace each hexadecimal digit with its 4-bit binary equivalent. For example, AF in hex becomes 1010 1111 in binary (A = 1010, F = 1111). This is the reverse of binary-to-hex conversion.',
    faq3q: 'Why are hexadecimal numbers used in programming?',
    faq3a: 'Hexadecimal provides a compact representation of binary data. One hex digit equals exactly 4 binary bits, and two hex digits represent one byte. This makes hex numbers much shorter and easier to read than binary for memory addresses, color codes (#FF5733), machine instructions, and cryptographic hashes.',
    faq4q: 'What is the difference between binary and hexadecimal?',
    faq4a: 'Binary (base 2) uses only digits 0 and 1. Hexadecimal (base 16) uses digits 0-9 and letters A-F. A 32-bit binary number requires 32 digits but only 8 hex digits. Both systems are directly interchangeable, making hex a convenient shorthand for binary.',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Convertisseur Binaire vers Hex',
    description: 'Convertissez des nombres binaires en hexadecimal et inversement en ligne. Supporte le groupement en nibbles et la sortie majuscule/minuscule.',
    inputLabel: 'Entree Binaire', inputPlaceholder: 'Ex: 1010 1111 0011 0101',
    hexInputLabel: 'Entree Hex', hexInputPlaceholder: 'Ex: AF35 ou 0xAF35',
    outputHex: 'Sortie Hexadecimale', outputBin: 'Sortie Binaire',
    toHex: 'Binaire vers Hex', toBin: 'Hex vers Binaire',
    clear: 'Effacer', loadSample: 'Exemple', uppercase: 'Majuscules',
    groupBits: 'Grouper en nibbles', prefix: 'Ajouter prefixe 0x',
    introTitle: 'Convertisseur Binaire/Hex Gratuit', introText: 'Convertissez des nombres binaires en hexadecimal et inversement. Utile pour la programmation et l\'electronique.',
    cheatTitle: 'Table de Reference Rapide', faqTitle: 'Questions Frequentes',
    faq1q: 'Comment convertir binaire en hex?', faq1a: 'Regroupez les bits en nibbles de 4 bits, puis convertissez chaque nibble en son equivalent hexadecimal. Ex: 1010 1111 = AF.',
    faq2q: 'Comment convertir hex en binaire?', faq2a: 'Remplacez chaque chiffre hexadecimal par ses 4 bits binaires. Ex: AF = 1010 1111.',
    faq3q: 'Pourquoi utiliser l\'hexadecimal en programmation?', faq3a: 'L\'hex offre une representation compacte des donnees binaires. Deux chiffres hex = un octet.',
    faq4q: 'Difference entre binaire et hexadecimal?', faq4a: 'Binaire (base 2): chiffres 0 et 1. Hexadecimal (base 16): chiffres 0-9 et lettres A-F.',
    relatedTitle: 'Outils Connexes',
  },
  de: {
    title: 'Binaer zu Hex Konverter',
    description: 'Konvertieren Sie binaere Zahlen in Hexadezimal und zurueck. Unterstuetzt Nibble-Gruppierung und Gross-/Kleinschreibung.',
    inputLabel: 'Binaere Eingabe', inputPlaceholder: 'z.B. 1010 1111 0011 0101',
    hexInputLabel: 'Hex-Eingabe', hexInputPlaceholder: 'z.B. AF35 oder 0xAF35',
    outputHex: 'Hexadezimale Ausgabe', outputBin: 'Binaere Ausgabe',
    toHex: 'Binaer zu Hex', toBin: 'Hex zu Binaer',
    clear: 'Loeschen', loadSample: 'Beispiel laden', uppercase: 'Grossbuchstaben',
    groupBits: 'Bits gruppieren (Nibbles)', prefix: '0x Praefix hinzufuegen',
    introTitle: 'Kostenloser Online Binaer/Hex Konverter', introText: 'Konvertieren Sie binaere Zahlen in Hexadezimal und umgekehrt. Nett fuer Programmierung und digitale Elektronik.',
    cheatTitle: 'Schnellreferenztabelle', faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie konvertiert man Binaer in Hex?', faq1a: 'Gruppieren Sie Binaerziffern in 4-Bit-Nibbles von rechts nach links, dann konvertieren Sie jedes Nibble. Bsp: 1010 1111 = AF.',
    faq2q: 'Wie konvertiert man Hex in Binaer?', faq2a: 'Ersetzen Sie jede Hex-Ziffer durch ihr 4-Bit-Binaer-Aequivalent. Bsp: AF = 1010 1111.',
    faq3q: 'Warum wird Hexadezimal in der Programmierung verwendet?', faq3a: 'Hex bietet eine kompakte Darstellung von Binaerdaten. Zwei Hex-Ziffern = ein Byte.',
    faq4q: 'Unterschied zwischen Binaer und Hexadezimal?', faq4a: 'Binaer (Basis 2): Ziffern 0 und 1. Hexadezimal (Basis 16): Ziffern 0-9 und Buchstaben A-F.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor Binario a Hex',
    description: 'Convierta numeros binarios a hexadecimal y al reves en linea. Soporta agrupacion en nibbles y salida en mayus/minus.',
    inputLabel: 'Entrada Binaria', inputPlaceholder: 'Ej: 1010 1111 0011 0101',
    hexInputLabel: 'Entrada Hex', hexInputPlaceholder: 'Ej: AF35 o 0xAF35',
    outputHex: 'Salida Hexadecimal', outputBin: 'Salida Binaria',
    toHex: 'Binario a Hex', toBin: 'Hex a Binario',
    clear: 'Limpiar', loadSample: 'Cargar ejemplo', uppercase: 'Mayusculas',
    groupBits: 'Agrupar bits (nibbles)', prefix: 'Agregar prefijo 0x',
    introTitle: 'Convertidor Binario/Hex Gratuito', introText: 'Convierta numeros binarios a hexadecimal y al reves. Util para programacion y electronica digital.',
    cheatTitle: 'Tabla de Referencia Rapida', faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Como convertir binario a hex?', faq1a: 'Agrupe los bits en nibbles de 4 bits y convierta cada nibble. Ej: 1010 1111 = AF.',
    faq2q: 'Como convertir hex a binario?', faq2a: 'Reemplace cada digito hex por sus 4 bits binarios. Ej: AF = 1010 1111.',
    faq3q: 'Por que usar hexadecimal en programacion?', faq3a: 'Hex ofrece representacion compacta de datos binarios. Dos digitos hex = un byte.',
    faq4q: 'Diferencia entre binario y hexadecimal?', faq4a: 'Binario (base 2): digitos 0 y 1. Hexadecimal (base 16): digitos 0-9 y letras A-F.',
    relatedTitle: 'Herramientas Relacionadas',
  },
  it: {
    title: 'Convertitore Binario a Hex',
    description: 'Converti numeri binari in esadecimale e viceversa online. Supporta raggruppamento in nibble e output maiuscolo/minuscolo.',
    inputLabel: 'Input Binario', inputPlaceholder: 'Es: 1010 1111 0011 0101',
    hexInputLabel: 'Input Hex', hexInputPlaceholder: 'Es: AF35 o 0xAF35',
    outputHex: 'Output Esadecimale', outputBin: 'Output Binario',
    toHex: 'Binario a Hex', toBin: 'Hex a Binario',
    clear: 'Cancella', loadSample: 'Carica esempio', uppercase: 'Maiuscolo',
    groupBits: 'Raggruppa in nibble', prefix: 'Aggiungi prefisso 0x',
    introTitle: 'Convertitore Binario/Hex Gratuito', introText: 'Converti numeri binari in esadecimale e viceversa. Utile per programmazione ed elettronica digitale.',
    cheatTitle: 'Tabella di Riferimento Rapido', faqTitle: 'Domande Frequenti',
    faq1q: 'Come convertire binario in hex?', faq1a: 'Raggruppa le cifre binarie in nibble di 4 bit e converti ogni nibble. Es: 1010 1111 = AF.',
    faq2q: 'Come convertire hex in binario?', faq2a: 'Sostituisci ogni cifra hex con il suo equivalente binario a 4 bit. Es: AF = 1010 1111.',
    faq3q: 'Perche usare esadecimale in programmazione?', faq3a: 'Hex offre una rappresentazione compatta dei dati binari. Due cifre hex = un byte.',
    faq4q: 'Differenza tra binario ed esadecimale?', faq4a: 'Binario (base 2): cifre 0 e 1. Esadecimale (base 16): cifre 0-9 e lettere A-F.',
    relatedTitle: 'Strumenti Correlati',
  },
  pt: {
    title: 'Conversor Binario para Hex',
    description: 'Converta numeros binarios para hexadecimal e vice-versa online. Suporta agrupamento em nibbles e saida maiuscula/minuscula.',
    inputLabel: 'Entrada Binaria', inputPlaceholder: 'Ex: 1010 1111 0011 0101',
    hexInputLabel: 'Entrada Hex', hexInputPlaceholder: 'Ex: AF35 ou 0xAF35',
    outputHex: 'Saida Hexadecimal', outputBin: 'Saida Binaria',
    toHex: 'Binario para Hex', toBin: 'Hex para Binario',
    clear: 'Limpar', loadSample: 'Carregar exemplo', uppercase: 'Maiusculas',
    groupBits: 'Agrupar em nibbles', prefix: 'Adicionar prefixo 0x',
    introTitle: 'Conversor Binario/Hex Gratuito', introText: 'Converta numeros binarios para hexadecimal e vice-versa. Util para programacao e eletronica digital.',
    cheatTitle: 'Tabela de Referencia Rapida', faqTitle: 'Perguntas Frequentes',
    faq1q: 'Como converter binario para hex?', faq1a: 'Agrupe os bits em nibbles de 4 bits e converta cada nibble. Ex: 1010 1111 = AF.',
    faq2q: 'Como converter hex para binario?', faq2a: 'Substitua cada digito hex pelo seu equivalente binario de 4 bits. Ex: AF = 1010 1111.',
    faq3q: 'Por que usar hexadecimal na programacao?', faq3a: 'Hex oferece representacao compacta de dados binarios. Dois digitos hex = um byte.',
    faq4q: 'Diferenca entre binario e hexadecimal?', faq4a: 'Binario (base 2): digitos 0 e 1. Hexadecimal (base 16): digitos 0-9 e letras A-F.',
    relatedTitle: 'Ferramentas Relacionadas',
  },
  nl: {
    title: 'Binaer naar Hex Converter',
    description: 'Converteer binaere getallen naar hexadecimaal en terug online. Ondersteunt nibble-groepering en hoofd-/kleine letters.',
    inputLabel: 'Binaere Invoer', inputPlaceholder: 'bijv. 1010 1111 0011 0101',
    hexInputLabel: 'Hex-invoer', hexInputPlaceholder: 'bijv. AF35 of 0xAF35',
    outputHex: 'Hexadecimale Uitvoer', outputBin: 'Binaere Uitvoer',
    toHex: 'Binaer naar Hex', toBin: 'Hex naar Binaer',
    clear: 'Wissen', loadSample: 'Voorbeeld laden', uppercase: 'Hoofdletters',
    groupBits: 'Bits groeperen (nibbles)', prefix: '0x prefix toevoegen',
    introTitle: 'Gratis Online Binaer/Hex Converter', introText: 'Converteer binaere getallen naar hexadecimaal en omgekeerd. Handig voor programmeren en digitale elektronica.',
    cheatTitle: 'Snelle Referentietabel', faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Hoe converteer je binaer naar hex?', faq1a: 'Groepeer bits in nibbles van 4 bits en converteer elk nibble. Bijv: 1010 1111 = AF.',
    faq2q: 'Hoe converteer je hex naar binaer?', faq2a: 'Vervang elk hex-cijfer door zijn 4-bit binaer equivalent. Bijv: AF = 1010 1111.',
    faq3q: 'Waarom hexadecimaal in programmeren?', faq3a: 'Hex biedt een compacte weergave van binaere gegevens. Twee hex-cijfers = een byte.',
    faq4q: 'Verschil tussen binaer en hexadecimaal?', faq4a: 'Binaer (basis 2): cijfers 0 en 1. Hexadecimaal (basis 16): cijfers 0-9 en letters A-F.',
    relatedTitle: 'Gerelateerde Tools',
  },
  pl: {
    title: 'Konwerter Binarny na Hex',
    description: 'Konwertuj liczby binarne na szesnastkowe i odwrotnie online. Obsluguje grupowanie w nibble i wyjscie wielkich/malych liter.',
    inputLabel: 'Wejscie Binarne', inputPlaceholder: 'np. 1010 1111 0011 0101',
    hexInputLabel: 'Wejscie Hex', hexInputPlaceholder: 'np. AF35 lub 0xAF35',
    outputHex: 'Wyjscie Szesnastkowe', outputBin: 'Wyjscie Binarne',
    toHex: 'Binarny na Hex', toBin: 'Hex na Binarny',
    clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', uppercase: 'Wielkie litery',
    groupBits: 'Grupuj bity (nibble)', prefix: 'Dodaj prefiks 0x',
    introTitle: 'Darmowy Konwerter Binarny/Hex', introText: 'Konwertuj liczby binarne na szesnastkowe i odwrotnie. Przydatny do programowania i elektroniki cyfrowej.',
    cheatTitle: 'Tabela Szybkiej Referencji', faqTitle: 'Czesto Zadawane Pytania',
    faq1q: 'Jak skonwertowac binarny na hex?', faq1a: 'Grupuj bity w nibble po 4 bity i konwertuj kazdy nibble. Np: 1010 1111 = AF.',
    faq2q: 'Jak skonwertowac hex na binarny?', faq2a: 'Zastap kazda cyfre hex jej 4-bitowym odpowiednikiem binarnym. Np: AF = 1010 1111.',
    faq3q: 'Dlaczego hex w programowaniu?', faq3a: 'Hex zapewnia zwiezla reprezentacje danych binarnych. Dwie cyfry hex = jeden bajt.',
    faq4q: 'Roznica miedzy binarnym a szesnastkowym?', faq4a: 'Binarny (baza 2): cyfry 0 i 1. Szesnastkowy (baza 16): cyfry 0-9 i litery A-F.',
    relatedTitle: 'Powiazane Narzedzia',
  },
  sv: {
    title: 'Binaer till Hex Konverterare',
    description: 'Konvertera binaera tal till hexadecimala och tillbaka online. Stoeder nibble-gruppering och stor-/smabokstaver.',
    inputLabel: 'Binaer Inmatning', inputPlaceholder: 't.ex. 1010 1111 0011 0101',
    hexInputLabel: 'Hex-inmatning', hexInputPlaceholder: 't.ex. AF35 eller 0xAF35',
    outputHex: 'Hexadecimal Utdata', outputBin: 'Binaer Utdata',
    toHex: 'Binaer till Hex', toBin: 'Hex till Binaer',
    clear: 'Rensa', loadSample: 'Ladda exempel', uppercase: 'Versaler',
    groupBits: 'Gruppera bitar (nibbles)', prefix: 'Lagg till 0x prefix',
    introTitle: 'Gratis Online Binaer/Hex Konverterare', introText: 'Konvertera binaera tal till hexadecimala och omvant. Anvandbar for programmering och digital elektronik.',
    cheatTitle: 'Snabb Referenstabell', faqTitle: 'Vanliga Fragor',
    faq1q: 'Hur konverterar man binaert till hex?', faq1a: 'Gruppera bitar i nibbles om 4 bitar och konvertera varje nibble. T.ex: 1010 1111 = AF.',
    faq2q: 'Hur konverterar man hex till binaert?', faq2a: 'Byt ut varje hex-siffra mot dess 4-bitars binaera ekvivalent. T.ex: AF = 1010 1111.',
    faq3q: 'Varfor anvaends hex i programmering?', faq3a: 'Hex ger en kompakt representation av binaerdata. Tva hex-siffror = en byte.',
    faq4q: 'Skillnad mellan binaert och hexadecimalt?', faq4a: 'Binaert (bas 2): siffrorna 0 och 1. Hexadecimalt (bas 16): siffrorna 0-9 och bokstaverna A-F.',
    relatedTitle: 'Relaterade Verktyg',
  },
  no: {
    title: 'Binaer til Hex Konverter',
    description: 'Konverter binaere tall til heksadesimal og tilbake online. Stoetter nibble-gruppering og stor-/smaabokstaver.',
    inputLabel: 'Binaer Inndata', inputPlaceholder: 'f.eks. 1010 1111 0011 0101',
    hexInputLabel: 'Hex-inndata', hexInputPlaceholder: 'f.eks. AF35 eller 0xAF35',
    outputHex: 'Heksadesimal Utdata', outputBin: 'Binaer Utdata',
    toHex: 'Binaer til Hex', toBin: 'Hex til Binaer',
    clear: 'Toemme', loadSample: 'Last eksempel', uppercase: 'Store bokstaver',
    groupBits: 'Grupper bits (nibbles)', prefix: 'Legg til 0x prefiks',
    introTitle: 'Gratis Online Binaer/Hex Konverter', introText: 'Konverter binaere tall til heksadesimal og omvendt. Nyttig for programmering og digital elektronikk.',
    cheatTitle: 'Rask Referansetabell', faqTitle: 'Vanlige Spoersmaal',
    faq1q: 'Hvordan konvertere binaert til hex?', faq1a: 'Grupper bits i nibbles paa 4 bits og konverter hver nibble. F.eks: 1010 1111 = AF.',
    faq2q: 'Hvordan konvertere hex til binaert?', faq2a: 'Bytt ut hvert hex-siffer med sin 4-bits binaere ekvivalent. F.eks: AF = 1010 1111.',
    faq3q: 'Hvorfor bruke hex i programmering?', faq3a: 'Hex gir en kompakt representasjon av binaerdata. To hex-sifre = en byte.',
    faq4q: 'Forskjell mellom binaert og heksadesimalt?', faq4a: 'Binaert (base 2): sifrene 0 og 1. Heksadesimalt (base 16): sifrene 0-9 og bokstavene A-F.',
    relatedTitle: 'Relaterte Verktoy',
  },
  zh: {
    title: '二进制转十六进制',
    description: '在线将二进制数转换为十六进制，或十六进制转二进制。支持按位分组、大小写输出和 0x 前缀。',
    inputLabel: '二进制输入', inputPlaceholder: '例如：1010 1111 0011 0101',
    hexInputLabel: '十六进制输入', hexInputPlaceholder: '例如：AF35 或 0xAF35',
    outputHex: '十六进制输出', outputBin: '二进制输出',
    toHex: '二进制转十六进制', toBin: '十六进制转二进制',
    clear: '清除', loadSample: '加载示例', uppercase: '大写',
    groupBits: '分组显示（4位一组）', prefix: '添加 0x 前缀',
    introTitle: '免费在线二进制/十六进制转换器', introText: '在浏览器中即时将二进制数转换为十六进制，或将十六进制转换为二进制。适用于编程、计算机科学和数字电子学。',
    cheatTitle: '快速参考表', faqTitle: '常见问题',
    faq1q: '如何将二进制转换为十六进制？', faq1a: '将二进制位从右到左每4位分为一组（nibble），然后将每组转换为对应的十六进制数字。例如：1010 1111 = AF。',
    faq2q: '如何将十六进制转换为二进制？', faq2a: '将每个十六进制数字替换为其4位二进制等价物。例如：AF = 1010 1111。',
    faq3q: '为什么编程中使用十六进制？', faq3a: '十六进制提供了二进制数据的紧凑表示。两个十六进制数字 = 一个字节，常用于内存地址、颜色代码和哈希值。',
    faq4q: '二进制和十六进制的区别？', faq4a: '二进制（基数2）只使用0和1。十六进制（基数16）使用0-9和A-F。十六进制是二进制的简便表示形式。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: '2進数から16進数へ変換',
    description: '2進数を16進数に、または16進数を2進数にオンラインで変換。ニブルグループ化、大文字/小文字出力をサポート。',
    inputLabel: '2進数入力', inputPlaceholder: '例: 1010 1111 0011 0101',
    hexInputLabel: '16進数入力', hexInputPlaceholder: '例: AF35 または 0xAF35',
    outputHex: '16進数出力', outputBin: '2進数出力',
    toHex: '2進数 → 16進数', toBin: '16進数 → 2進数',
    clear: 'クリア', loadSample: 'サンプル読込', uppercase: '大文字',
    groupBits: 'ニブル単位でグループ化', prefix: '0x プレフィックスを追加',
    introTitle: '無料オンライン 2進数/16進数 変換ツール', introText: '2進数を16進数に、またはその逆に即座に変換します。プログラミング、コンピュータサイエンス、デジタル電子工学に役立ちます。',
    cheatTitle: 'クイックリファレンス表', faqTitle: 'よくある質問',
    faq1q: '2進数から16進数へはどう変換する？', faq1a: '2進数を右から4ビットごとのニブルにグループ化し、各ニブルを16進数に変換します。例: 1010 1111 = AF。',
    faq2q: '16進数から2進数へはどう変換する？', faq2a: '各16進数の桁を4ビットの2進数に置き換えます。例: AF = 1010 1111。',
    faq3q: 'なぜプログラミングで16進数を使うのか？', faq3a: '16進数は2進数データをコンパクトに表現できます。16進数2桁 = 1バイトです。',
    faq4q: '2進数と16進数の違いは？', faq4a: '2進数（基数2）は0と1のみ使用。16進数（基数16）は0-9とA-Fを使用。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '2진수 16진수 변환기',
    description: '온라인에서 2진수를 16진수로, 16진수를 2진수로 변환. 니블 그룹화, 대/소문자 출력 지원.',
    inputLabel: '2진수 입력', inputPlaceholder: '예: 1010 1111 0011 0101',
    hexInputLabel: '16진수 입력', hexInputPlaceholder: '예: AF35 또는 0xAF35',
    outputHex: '16진수 출력', outputBin: '2진수 출력',
    toHex: '2진수 → 16진수', toBin: '16진수 → 2진수',
    clear: '지우기', loadSample: '샘플 로드', uppercase: '대문자',
    groupBits: '니블 단위로 그룹화', prefix: '0x 접두사 추가',
    introTitle: '무료 온라인 2진수/16진수 변환기', introText: '2진수를 16진수로, 또는 그 반대로 즉시 변환합니다. 프로그래밍, 컴퓨터 과학, 디지털 전자공학에 유용합니다.',
    cheatTitle: '빠른 참조 표', faqTitle: '자주 묻는 질문',
    faq1q: '2진수를 16진수로 변환하는 방법은?', faq1a: '2진수를 오른쪽부터 4비트 니블로 그룹화하고 각 니블을 16진수로 변환합니다. 예: 1010 1111 = AF.',
    faq2q: '16진수를 2진수로 변환하는 방법은?', faq2a: '각 16진수 자리를 4비트 2진수로 대체합니다. 예: AF = 1010 1111.',
    faq3q: '왜 프로그래밍에서 16진수를 사용하나요?', faq3a: '16진수는 2진수 데이터를 컴팩트하게 표현합니다. 16진수 2자리 = 1바이트.',
    faq4q: '2진수와 16진수의 차이점은?', faq4a: '2진수(기수 2): 0과 1만 사용. 16진수(기수 16): 0-9와 A-F 사용.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Konverter Biner ke Hex',
    description: 'Konversi angka biner ke heksadesimal dan sebaliknya online. Mendukung pengelompokan nibble dan output huruf besar/kecil.',
    inputLabel: 'Input Biner', inputPlaceholder: 'Contoh: 1010 1111 0011 0101',
    hexInputLabel: 'Input Hex', hexInputPlaceholder: 'Contoh: AF35 atau 0xAF35',
    outputHex: 'Output Heksadesimal', outputBin: 'Output Biner',
    toHex: 'Biner ke Hex', toBin: 'Hex ke Biner',
    clear: 'Hapus', loadSample: 'Muat Contoh', uppercase: 'Huruf Besar',
    groupBits: 'Kelompokkan bit (nibble)', prefix: 'Tambah prefiks 0x',
    introTitle: 'Konverter Biner/Hex Gratis', introText: 'Konversi angka biner ke heksadesimal dan sebaliknya secara instan. Berguna untuk pemrograman dan elektronika digital.',
    cheatTitle: 'Tabel Referensi Cepat', faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Bagaimana mengonversi biner ke hex?', faq1a: 'Kelompokkan bit dalam nibble 4 bit dan konversi setiap nibble. Contoh: 1010 1111 = AF.',
    faq2q: 'Bagaimana mengonversi hex ke biner?', faq2a: 'Ganti setiap digit hex dengan ekuivalen 4-bit binernya. Contoh: AF = 1010 1111.',
    faq3q: 'Mengapa menggunakan hex dalam pemrograman?', faq3a: 'Hex memberikan representasi kompak data biner. Dua digit hex = satu byte.',
    faq4q: 'Perbedaan antara biner dan heksadesimal?', faq4a: 'Biner (basis 2): angka 0 dan 1. Heksadesimal (basis 16): angka 0-9 dan huruf A-F.',
    relatedTitle: 'Alat Terkait',
  },
  th: {
    title: 'แปลงไบนารีเป็นเลขฐานสิบหก',
    description: 'แปลงเลขไบนารีเป็นเลขฐานสิบหกและย้อนกลับออนไลน์ รองรับการจัดกลุ่มนิบเบิลและตัวพิมพ์ใหญ่/เล็ก',
    inputLabel: 'ป้อนเลขไบนารี', inputPlaceholder: 'เช่น 1010 1111 0011 0101',
    hexInputLabel: 'ป้อนเลขฐานสิบหก', hexInputPlaceholder: 'เช่น AF35 หรือ 0xAF35',
    outputHex: 'ผลลัพธ์เลขฐานสิบหก', outputBin: 'ผลลัพธ์เลขไบนารี',
    toHex: 'ไบนารี → ฐานสิบหก', toBin: 'ฐานสิบหก → ไบนารี',
    clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', uppercase: 'ตัวพิมพ์ใหญ่',
    groupBits: 'จัดกลุ่มเป็นนิบเบิล', prefix: 'เพิ่มคำนำหน้า 0x',
    introTitle: 'ตัวแปลงไบนารี/ฐานสิบหกฟรีออนไลน์', introText: 'แปลงเลขไบนารีเป็นเลขฐานสิบหกและกลับกันทันที มีประโยชน์สำหรับการเขียนโปรแกรมและอิเล็กทรอนิกส์ดิจิทัล',
    cheatTitle: 'ตารางอ้างอิงด่วน', faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'วิธีแปลงไบนารีเป็นเลขฐานสิบหก?', faq1a: 'จัดกลุ่มบิตเป็นนิบเบิล 4 บิตแล้วแปลงแต่ละนิบเบิล เช่น: 1010 1111 = AF',
    faq2q: 'วิธีแปลงเลขฐานสิบหกเป็นไบนารี?', faq2a: 'แทนที่แต่ละหลักเลขฐานสิบหกด้วยไบนารี 4 บิต เช่น: AF = 1010 1111',
    faq3q: 'ทำไมถึงใช้เลขฐานสิบหกในการเขียนโปรแกรม?', faq3a: 'เลขฐานสิบหกแสดงข้อมูลไบนารีได้กระชับกว่า สองหลักฐานสิบหก = หนึ่งไบต์',
    faq4q: 'ความแตกต่างระหว่างไบนารีและฐานสิบหก?', faq4a: 'ไบนารี (ฐาน 2): ใช้ 0 และ 1 เท่านั้น เลขฐานสิบหก (ฐาน 16): ใช้ 0-9 และ A-F',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const HEX_TABLE: Record<string, string> = {
  '0000': '0', '0001': '1', '0010': '2', '0011': '3',
  '0100': '4', '0101': '5', '0110': '6', '0111': '7',
  '1000': '8', '1001': '9', '1010': 'A', '1011': 'B',
  '1100': 'C', '1101': 'D', '1110': 'E', '1111': 'F',
};
const BIN_TABLE: Record<string, string> = Object.fromEntries(
  Object.entries(HEX_TABLE).map(([k, v]) => [v, k])
);

function binToHex(bin: string, uppercase: boolean): string {
  const cleaned = bin.replace(/[^01]/g, '');
  if (!cleaned) return '';
  const padded = cleaned.padStart(Math.ceil(cleaned.length / 4) * 4, '0');
  const hex = padded.match(/.{4}/g)?.map(n => HEX_TABLE[n] || '?').join('') || '';
  return uppercase ? hex.toUpperCase() : hex.toLowerCase();
}

function hexToBin(hex: string, groupBits: boolean): string {
  const cleaned = hex.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '').toUpperCase();
  if (!cleaned) return '';
  const bin = cleaned.split('').map(h => BIN_TABLE[h] || '????').join(groupBits ? ' ' : '');
  return bin;
}

const SAMPLE_BIN = '1010 1111 0011 0101';
const SAMPLE_HEX = 'AF35';

const QUICK_REF = [
  ['0000', '0'], ['0001', '1'], ['0010', '2'], ['0011', '3'],
  ['0100', '4'], ['0101', '5'], ['0110', '6'], ['0111', '7'],
  ['1000', '8'], ['1001', '9'], ['1010', 'A'], ['1011', 'B'],
  ['1100', 'C'], ['1101', 'D'], ['1110', 'E'], ['1111', 'F'],
];

export default function BinaryToHexConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [mode, setMode] = useState<'toHex' | 'toBin'>('toHex');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [groupBits, setGroupBits] = useState(true);
  const [addPrefix, setAddPrefix] = useState(false);
  const [error, setError] = useState('');

  const convert = useCallback((val: string, m: 'toHex' | 'toBin', uc: boolean, gb: boolean, prefix: boolean) => {
    setError('');
    if (!val.trim()) { setOutput(''); return; }
    try {
      if (m === 'toHex') {
        const cleaned = val.replace(/[^01\s]/g, '');
        if (!cleaned.replace(/\s/g, '')) { setError('Invalid binary: only 0 and 1 allowed'); setOutput(''); return; }
        let result = binToHex(cleaned, uc);
        if (prefix) result = '0x' + result;
        setOutput(result);
      } else {
        const result = hexToBin(val, gb);
        setOutput(result);
      }
    } catch {
      setError('Conversion error. Please check your input.');
      setOutput('');
    }
  }, []);

  const handleInput = (val: string) => {
    setInput(val);
    convert(val, mode, uppercase, groupBits, addPrefix);
  };

  const handleModeChange = (m: 'toHex' | 'toBin') => {
    setMode(m);
    setInput('');
    setOutput('');
    setError('');
  };

  const handleUppercase = (v: boolean) => {
    setUppercase(v);
    if (mode === 'toHex') convert(input, mode, v, groupBits, addPrefix);
  };

  const handleGroupBits = (v: boolean) => {
    setGroupBits(v);
    if (mode === 'toBin') convert(input, mode, uppercase, v, addPrefix);
  };

  const handlePrefix = (v: boolean) => {
    setAddPrefix(v);
    if (mode === 'toHex') convert(input, mode, uppercase, groupBits, v);
  };

  const loadSample = () => {
    const s = mode === 'toHex' ? SAMPLE_BIN : SAMPLE_HEX;
    setInput(s);
    convert(s, mode, uppercase, groupBits, addPrefix);
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="binary-to-hex-converter">
      {/* Mode selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['toHex', 'toBin'] as const).map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`btn ${mode === m ? 'btn-primary' : 'btn-secondary'}`}
          >
            {t[m]}
          </button>
        ))}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center', fontSize: 13 }}>
        {mode === 'toHex' && (
          <>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={uppercase} onChange={e => handleUppercase(e.target.checked)} />
              {t.uppercase}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={addPrefix} onChange={e => handlePrefix(e.target.checked)} />
              {t.prefix}
            </label>
          </>
        )}
        {mode === 'toBin' && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={groupBits} onChange={e => handleGroupBits(e.target.checked)} />
            {t.groupBits}
          </label>
        )}
        <button onClick={loadSample} className="btn btn-secondary" style={{ marginLeft: 'auto' }}>{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
          {mode === 'toHex' ? t.inputLabel : t.hexInputLabel}
        </label>
        <textarea
          value={input}
          onChange={e => handleInput(e.target.value)}
          placeholder={mode === 'toHex' ? t.inputPlaceholder : t.hexInputPlaceholder}
          style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 14 }}
        />
        {error && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{error}</div>}
      </div>

      {/* Output */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>
            {mode === 'toHex' ? t.outputHex : t.outputBin}
          </label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea
          value={output}
          readOnly
          style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 14, background: 'var(--bg-input)' }}
        />
      </div>

      {/* Quick reference table */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.cheatTitle}</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ borderCollapse: 'collapse', fontSize: 13, width: '100%', maxWidth: 480 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 16px', textAlign: 'left' }}>Binary</th>
                <th style={{ padding: '8px 16px', textAlign: 'left' }}>Decimal</th>
                <th style={{ padding: '8px 16px', textAlign: 'left' }}>Hex</th>
              </tr>
            </thead>
            <tbody>
              {QUICK_REF.map(([bin, hex], i) => (
                <tr key={bin} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-input)' }}>
                  <td style={{ padding: '6px 16px', fontFamily: 'monospace' }}>{bin}</td>
                  <td style={{ padding: '6px 16px' }}>{parseInt(bin, 2)}</td>
                  <td style={{ padding: '6px 16px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{hex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.relatedTitle}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder/Decoder' },
            { href: `/${lang}/tools/binary-text`, label: 'Binary Text Converter' },
            { href: `/${lang}/tools/number-base-converter`, label: 'Number Base Converter' },
            { href: `/${lang}/tools/ascii-table-generator`, label: 'ASCII Table' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
