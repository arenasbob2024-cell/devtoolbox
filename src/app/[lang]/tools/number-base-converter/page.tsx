'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Number Base Converter',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal with live conversion and bit representation.',
    decLabel: 'Decimal (Base 10)', binLabel: 'Binary (Base 2)', octLabel: 'Octal (Base 8)', hexLabel: 'Hexadecimal (Base 16)',
    bitRepTitle: 'Bit Representation', clear: 'Clear', loadSample: 'Load Sample',
    errorInvalid: 'Invalid number for selected base.',
    introTitle: 'Free Online Number Base Converter',
    introText: 'Convert integers between the four most common number bases: binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Type in any field and all others update instantly. A visual bit representation shows the binary layout for 8, 16, 32, and 64-bit widths. Useful for programming, embedded systems, network configuration, and computer science students.',
    tipTitle: 'Number Base Tips',
    tip1: 'Binary uses only 0 and 1 — the native language of computers',
    tip2: 'Hexadecimal is commonly used in color codes (#FF5733) and memory addresses',
    tip3: 'Octal is used in Unix/Linux file permissions (e.g., chmod 755)',
    tip4: 'One hex digit equals exactly 4 binary bits (a nibble)',
    tip5: 'Prefix 0b for binary, 0o for octal, 0x for hex in most programming languages',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do I convert decimal to binary?',
    faq1a: 'Repeatedly divide the decimal number by 2 and record the remainders from bottom to top. For example, 13 in decimal is 1101 in binary (13=8+4+1). This tool does it instantly for you.',
    faq2q: 'What is hexadecimal used for?',
    faq2a: 'Hexadecimal (base 16) is widely used in programming for memory addresses, color codes in CSS/HTML (#RRGGBB), IPv6 addresses, MAC addresses, and byte-level data representation. It is more compact than binary while still mapping cleanly to binary nibbles.',
    faq3q: 'What is the maximum number this converter supports?',
    faq3a: 'The converter supports safe JavaScript integers up to 2^53-1 (9007199254740991 in decimal). For most practical purposes including 32-bit and 64-bit integers this range is sufficient. The bit display shows up to 32 bits.',
    faq4q: 'How are negative numbers represented?',
    faq4a: 'This converter works with non-negative (unsigned) integers. Negative numbers in computing use two\'s complement representation, which is not shown here. For signed integer conversion, enter the value as a positive number and interpret the binary as two\'s complement manually.',
    faq5q: 'What does the bit representation show?',
    faq5a: 'The bit representation visually shows the binary digits grouped into bytes (8 bits). Each bit is highlighted to show whether it is 0 or 1. This is useful for understanding binary layouts, bit masking, and low-level programming concepts.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '数制转换器', description: '在二进制、八进制、十进制、十六进制之间转换数字，实时转换并显示位表示。',
    decLabel: '十进制 (基数 10)', binLabel: '二进制 (基数 2)', octLabel: '八进制 (基数 8)', hexLabel: '十六进制 (基数 16)',
    bitRepTitle: '位表示', clear: '清除', loadSample: '加载示例', errorInvalid: '所选进制的数字无效。',
    introTitle: '免费在线数制转换器', introText: '在四种最常用的进制之间转换整数：二进制、八进制、十进制和十六进制。',
    tipTitle: '进制转换技巧', tip1: '二进制只使用 0 和 1，是计算机的本地语言', tip2: '十六进制常用于颜色代码和内存地址',
    tip3: '八进制用于 Unix/Linux 文件权限', tip4: '一个十六进制数字等于 4 个二进制位', tip5: '大多数编程语言中 0b 表示二进制，0o 表示八进制，0x 表示十六进制',
    faqTitle: '常见问题', faq1q: '如何将十进制转换为二进制？', faq1a: '反复将十进制数除以 2，从下到上记录余数。',
    faq2q: '十六进制用于什么？', faq2a: '十六进制广泛用于内存地址、CSS/HTML 颜色代码、IPv6 地址和 MAC 地址。',
    faq3q: '转换器支持的最大数是多少？', faq3a: '支持 JavaScript 安全整数，最大为 2^53-1。',
    faq4q: '负数如何表示？', faq4a: '此转换器处理非负整数。负数使用补码表示法。',
    faq5q: '位表示显示什么？', faq5a: '位表示以可视化方式显示按字节分组的二进制数字。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur de Base Numerique', description: 'Convertissez des nombres entre binaire, octal, decimal et hexadecimal avec conversion en direct.',
    decLabel: 'Decimal (Base 10)', binLabel: 'Binaire (Base 2)', octLabel: 'Octal (Base 8)', hexLabel: 'Hexadecimal (Base 16)',
    bitRepTitle: 'Representation en Bits', clear: 'Effacer', loadSample: 'Charger un exemple', errorInvalid: 'Nombre invalide pour la base selectionnee.',
    introTitle: 'Convertisseur de base numerique gratuit', introText: 'Convertissez des entiers entre les quatre bases les plus courantes.',
    tipTitle: 'Conseils sur les bases numeriques', tip1: 'Le binaire n\'utilise que 0 et 1', tip2: 'L\'hexadecimal est utilise pour les codes couleur',
    tip3: 'L\'octal est utilise dans les permissions Unix', tip4: 'Un chiffre hex equivaut a 4 bits binaires', tip5: 'Prefixe 0b binaire, 0o octal, 0x hex',
    faqTitle: 'Questions frequentes', faq1q: 'Comment convertir du decimal en binaire?', faq1a: 'Divisez repetitivement le nombre par 2.',
    faq2q: 'A quoi sert l\'hexadecimal?', faq2a: 'Largement utilise pour les adresses memoire et les codes couleur.',
    faq3q: 'Quel est le nombre maximum supporte?', faq3a: 'Entiers JavaScript surs jusqu\'a 2^53-1.',
    faq4q: 'Comment les negatifs sont-ils representes?', faq4a: 'Ce convertisseur gere les entiers non negatifs.',
    faq5q: 'Que montre la representation en bits?', faq5a: 'Affiche les chiffres binaires groupes en octets.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Zahlensystem Konverter', description: 'Konvertieren Sie Zahlen zwischen binaer, oktal, dezimal und hexadezimal mit Live-Konvertierung.',
    decLabel: 'Dezimal (Basis 10)', binLabel: 'Binaer (Basis 2)', octLabel: 'Oktal (Basis 8)', hexLabel: 'Hexadezimal (Basis 16)',
    bitRepTitle: 'Bit-Darstellung', clear: 'Loeschen', loadSample: 'Beispiel laden', errorInvalid: 'Ungueltige Zahl fuer die ausgewaehlte Basis.',
    introTitle: 'Kostenloser Zahlensystem-Konverter', introText: 'Konvertieren Sie Ganzzahlen zwischen den vier gaengigsten Zahlensystemen.',
    tipTitle: 'Tipps zu Zahlensystemen', tip1: 'Binaer verwendet nur 0 und 1', tip2: 'Hexadezimal wird fuer Farbcodes verwendet',
    tip3: 'Oktal wird bei Unix-Berechtigungen verwendet', tip4: 'Eine Hex-Stelle entspricht 4 binaeren Bits', tip5: 'Praefix 0b binaer, 0o oktal, 0x hex',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Wie konvertiere ich Dezimal in Binaer?', faq1a: 'Teilen Sie die Zahl wiederholt durch 2.',
    faq2q: 'Wofuer wird Hexadezimal verwendet?', faq2a: 'Fuer Speicheradressen und Farbcodes.',
    faq3q: 'Was ist die maximale unterstuetzte Zahl?', faq3a: 'Sichere JavaScript-Ganzzahlen bis 2^53-1.',
    faq4q: 'Wie werden negative Zahlen dargestellt?', faq4a: 'Dieser Konverter arbeitet mit nicht-negativen Ganzzahlen.',
    faq5q: 'Was zeigt die Bit-Darstellung?', faq5a: 'Zeigt binaere Ziffern, in Bytes gruppiert.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor de Base Numerica', description: 'Convierte numeros entre binario, octal, decimal y hexadecimal con conversion en vivo.',
    decLabel: 'Decimal (Base 10)', binLabel: 'Binario (Base 2)', octLabel: 'Octal (Base 8)', hexLabel: 'Hexadecimal (Base 16)',
    bitRepTitle: 'Representacion de Bits', clear: 'Limpiar', loadSample: 'Cargar ejemplo', errorInvalid: 'Numero invalido para la base seleccionada.',
    introTitle: 'Convertidor de base numerica gratuito', introText: 'Convierte enteros entre las cuatro bases numericas mas comunes.',
    tipTitle: 'Consejos de bases numericas', tip1: 'Binario usa solo 0 y 1', tip2: 'Hexadecimal se usa para codigos de color',
    tip3: 'Octal se usa en permisos Unix', tip4: 'Un digito hex equivale a 4 bits binarios', tip5: 'Prefijo 0b binario, 0o octal, 0x hex',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Como convertir decimal a binario?', faq1a: 'Divide repetidamente el numero por 2.',
    faq2q: 'Para que se usa el hexadecimal?', faq2a: 'Para direcciones de memoria y codigos de color.',
    faq3q: 'Cual es el numero maximo soportado?', faq3a: 'Enteros seguros de JavaScript hasta 2^53-1.',
    faq4q: 'Como se representan los numeros negativos?', faq4a: 'Este convertidor trabaja con enteros no negativos.',
    faq5q: 'Que muestra la representacion de bits?', faq5a: 'Muestra digitos binarios agrupados en bytes.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Conversor de Base Numerica', description: 'Converta numeros entre binario, octal, decimal e hexadecimal com conversao ao vivo.',
    decLabel: 'Decimal (Base 10)', binLabel: 'Binario (Base 2)', octLabel: 'Octal (Base 8)', hexLabel: 'Hexadecimal (Base 16)',
    bitRepTitle: 'Representacao de Bits', clear: 'Limpar', loadSample: 'Carregar exemplo', errorInvalid: 'Numero invalido para a base selecionada.',
    introTitle: 'Conversor de base numerica gratuito', introText: 'Converta inteiros entre as quatro bases numericas mais comuns.',
    tipTitle: 'Dicas de bases numericas', tip1: 'Binario usa apenas 0 e 1', tip2: 'Hexadecimal e usado para codigos de cor',
    tip3: 'Octal e usado em permissoes Unix', tip4: 'Um digito hex equivale a 4 bits binarios', tip5: 'Prefixo 0b binario, 0o octal, 0x hex',
    faqTitle: 'Perguntas frequentes', faq1q: 'Como converter decimal para binario?', faq1a: 'Divida repetidamente o numero por 2.',
    faq2q: 'Para que e usado o hexadecimal?', faq2a: 'Para enderecos de memoria e codigos de cor.',
    faq3q: 'Qual e o numero maximo suportado?', faq3a: 'Inteiros seguros JavaScript ate 2^53-1.',
    faq4q: 'Como os numeros negativos sao representados?', faq4a: 'Este conversor trabalha com inteiros nao negativos.',
    faq5q: 'O que mostra a representacao de bits?', faq5a: 'Mostra digitos binarios agrupados em bytes.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Convertitore di Base Numerica', description: 'Converti numeri tra binario, ottale, decimale ed esadecimale con conversione in tempo reale.',
    decLabel: 'Decimale (Base 10)', binLabel: 'Binario (Base 2)', octLabel: 'Ottale (Base 8)', hexLabel: 'Esadecimale (Base 16)',
    bitRepTitle: 'Rappresentazione Bit', clear: 'Cancella', loadSample: 'Carica esempio', errorInvalid: 'Numero non valido per la base selezionata.',
    introTitle: 'Convertitore di base numerica gratuito', introText: 'Converti interi tra le quattro basi numeriche piu comuni.',
    tipTitle: 'Suggerimenti sulle basi numeriche', tip1: 'Il binario usa solo 0 e 1', tip2: 'L\'esadecimale e usato per i codici colore',
    tip3: 'L\'ottale e usato nei permessi Unix', tip4: 'Una cifra hex equivale a 4 bit binari', tip5: 'Prefisso 0b binario, 0o ottale, 0x esadecimale',
    faqTitle: 'Domande frequenti', faq1q: 'Come convertire decimale in binario?', faq1a: 'Dividi ripetutamente il numero per 2.',
    faq2q: 'A cosa serve l\'esadecimale?', faq2a: 'Per indirizzi di memoria e codici colore.',
    faq3q: 'Qual e il numero massimo supportato?', faq3a: 'Interi JavaScript sicuri fino a 2^53-1.',
    faq4q: 'Come vengono rappresentati i numeri negativi?', faq4a: 'Questo convertitore lavora con interi non negativi.',
    faq5q: 'Cosa mostra la rappresentazione dei bit?', faq5a: 'Mostra cifre binarie raggruppate in byte.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'Getalsbasis Converter', description: 'Converteer getallen tussen binaer, octaal, decimaal en hexadecimaal met live conversie.',
    decLabel: 'Decimaal (Basis 10)', binLabel: 'Binaer (Basis 2)', octLabel: 'Octaal (Basis 8)', hexLabel: 'Hexadecimaal (Basis 16)',
    bitRepTitle: 'Bit Weergave', clear: 'Wissen', loadSample: 'Voorbeeld laden', errorInvalid: 'Ongeldig getal voor de geselecteerde basis.',
    introTitle: 'Gratis getalsbasis converter', introText: 'Converteer gehele getallen tussen de vier meest voorkomende getalbases.',
    tipTitle: 'Tips voor getalbases', tip1: 'Binaer gebruikt alleen 0 en 1', tip2: 'Hexadecimaal wordt gebruikt voor kleurcodes',
    tip3: 'Octaal wordt gebruikt bij Unix-machtigingen', tip4: 'Een hex-cijfer staat voor 4 binaere bits', tip5: 'Prefix 0b binaer, 0o octaal, 0x hex',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Hoe converteer ik decimaal naar binaer?', faq1a: 'Deel het getal herhaaldelijk door 2.',
    faq2q: 'Waarvoor wordt hexadecimaal gebruikt?', faq2a: 'Voor geheugenadressen en kleurcodes.',
    faq3q: 'Wat is het maximale ondersteunde getal?', faq3a: 'Veilige JavaScript-gehele getallen tot 2^53-1.',
    faq4q: 'Hoe worden negatieve getallen weergegeven?', faq4a: 'Deze converter werkt met niet-negatieve gehele getallen.',
    faq5q: 'Wat toont de bit-weergave?', faq5a: 'Toont binaere cijfers gegroepeerd per byte.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Konwerter Podstawy Liczbowej', description: 'Konwertuj liczby miedzy binarnym, oktalnym, dziesietnym i szesnastkowym z konwersja na zywo.',
    decLabel: 'Dziesietny (Podstawa 10)', binLabel: 'Binarny (Podstawa 2)', octLabel: 'Oktalny (Podstawa 8)', hexLabel: 'Szesnastkowy (Podstawa 16)',
    bitRepTitle: 'Reprezentacja Bitowa', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', errorInvalid: 'Nieprawidlowa liczba dla wybranej podstawy.',
    introTitle: 'Darmowy konwerter podstawy liczbowej', introText: 'Konwertuj liczby calkowite miedzy czterema najczestszymi systemami liczbowymi.',
    tipTitle: 'Wskazowki dotyczace podstaw liczbowych', tip1: 'Binarny uzywa tylko 0 i 1', tip2: 'Szesnastkowy jest uzywany dla kodow kolorow',
    tip3: 'Oktalny jest uzywany w uprawnieniach Unix', tip4: 'Jedna cyfra hex rowna sie 4 bitom binarnym', tip5: 'Prefiks 0b binarny, 0o oktalny, 0x szesnastkowy',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Jak konwertowac dziesietne na binarne?', faq1a: 'Wielokrotnie dziel liczbe przez 2.',
    faq2q: 'Do czego sluzy szesnastkowy?', faq2a: 'Do adresow pamieci i kodow kolorow.',
    faq3q: 'Jaka jest maksymalna obslugiwana liczba?', faq3a: 'Bezpieczne liczby calkowite JavaScript do 2^53-1.',
    faq4q: 'Jak sa reprezentowane liczby ujemne?', faq4a: 'Konwerter dziala z nieujemnymi liczbami calkowitymi.',
    faq5q: 'Co pokazuje reprezentacja bitowa?', faq5a: 'Pokazuje cyfry binarne pogrupowane w bajty.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Talbas Konverterare', description: 'Konvertera tal mellan binaer, oktal, decimal och hexadecimal med livekonvertering.',
    decLabel: 'Decimal (Bas 10)', binLabel: 'Binaer (Bas 2)', octLabel: 'Oktal (Bas 8)', hexLabel: 'Hexadecimal (Bas 16)',
    bitRepTitle: 'Bitrepresentation', clear: 'Rensa', loadSample: 'Ladda exempel', errorInvalid: 'Ogiltigt tal for vald bas.',
    introTitle: 'Gratis talbas konverterare', introText: 'Konvertera heltal mellan de fyra vanligaste talbassystemen.',
    tipTitle: 'Tips for talbaser', tip1: 'Binaer anvander bara 0 och 1', tip2: 'Hexadecimal anvands for fargkoder',
    tip3: 'Oktal anvands vid Unix-rattigheter', tip4: 'En hex-siffra motsvarar 4 binaera bitar', tip5: 'Prefix 0b binaer, 0o oktal, 0x hex',
    faqTitle: 'Vanliga fragor', faq1q: 'Hur konverterar jag decimal till binaer?', faq1a: 'Dela upprepade ganger talet med 2.',
    faq2q: 'Vad anvands hexadecimal till?', faq2a: 'For minnesadresser och fargkoder.',
    faq3q: 'Vad ar det maximala talvärdet som stods?', faq3a: 'Sakra JavaScript-heltal upp till 2^53-1.',
    faq4q: 'Hur representeras negativa tal?', faq4a: 'Konverteraren arbetar med icke-negativa heltal.',
    faq5q: 'Vad visar bitrepresentationen?', faq5a: 'Visar binaera siffror grupperade i byte.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Tallbase Konverter', description: 'Konverter tall mellom binaer, oktal, desimal og heksadesimal med live konvertering.',
    decLabel: 'Desimal (Basis 10)', binLabel: 'Binaer (Basis 2)', octLabel: 'Oktal (Basis 8)', hexLabel: 'Heksadesimal (Basis 16)',
    bitRepTitle: 'Bitrepresentasjon', clear: 'Toemme', loadSample: 'Last eksempel', errorInvalid: 'Ugyldig tall for valgt base.',
    introTitle: 'Gratis tallbase konverter', introText: 'Konverter heltall mellom de fire vanligste tallbasene.',
    tipTitle: 'Tips for tallbaser', tip1: 'Binaer bruker bare 0 og 1', tip2: 'Heksadesimal brukes for fargekoder',
    tip3: 'Oktal brukes i Unix-tillatelser', tip4: 'Et hex-siffer er lik 4 binaere bits', tip5: 'Prefiks 0b binaer, 0o oktal, 0x hex',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Hvordan konverterer jeg desimal til binaer?', faq1a: 'Del gjentatte ganger tallet med 2.',
    faq2q: 'Hva brukes heksadesimal til?', faq2a: 'For minneadresser og fargekoder.',
    faq3q: 'Hva er det maksimale tallet som stoettes?', faq3a: 'Sikre JavaScript-heltall opp til 2^53-1.',
    faq4q: 'Hvordan representeres negative tall?', faq4a: 'Konverteren arbeider med ikke-negative heltall.',
    faq5q: 'Hva viser bitrepresentasjonen?', faq5a: 'Viser binaere sifre gruppert i byte.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: '進数変換ツール', description: '2進数、8進数、10進数、16進数の間で数値をライブ変換し、ビット表現を表示します。',
    decLabel: '10進数 (基数 10)', binLabel: '2進数 (基数 2)', octLabel: '8進数 (基数 8)', hexLabel: '16進数 (基数 16)',
    bitRepTitle: 'ビット表現', clear: 'クリア', loadSample: 'サンプル読込', errorInvalid: '選択した基数に対して数値が無効です。',
    introTitle: '無料の進数変換ツール', introText: '最も一般的な4つの進数（2進数、8進数、10進数、16進数）の間で整数を変換します。',
    tipTitle: '進数のヒント', tip1: '2進数は0と1のみを使用します', tip2: '16進数は色コードに使用されます',
    tip3: '8進数はUnix権限に使用されます', tip4: '1つの16進数字 = 4ビット', tip5: '0b:2進数、0o:8進数、0x:16進数',
    faqTitle: 'よくある質問', faq1q: '10進数を2進数に変換するには？', faq1a: '数を繰り返し2で割ります。',
    faq2q: '16進数は何に使われますか？', faq2a: 'メモリアドレスや色コードに使用されます。',
    faq3q: 'サポートされる最大の数は？', faq3a: 'JavaScriptの安全な整数 2^53-1 までです。',
    faq4q: '負の数はどのように表現されますか？', faq4a: 'このコンバーターは非負整数に対応しています。',
    faq5q: 'ビット表現は何を示しますか？', faq5a: 'バイトにグループ化された2進数字を視覚的に表示します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '진법 변환기', description: '이진수, 팔진수, 십진수, 십육진수 사이에서 숫자를 실시간으로 변환하고 비트 표현을 표시합니다.',
    decLabel: '10진수 (기수 10)', binLabel: '2진수 (기수 2)', octLabel: '8진수 (기수 8)', hexLabel: '16진수 (기수 16)',
    bitRepTitle: '비트 표현', clear: '지우기', loadSample: '샘플 로드', errorInvalid: '선택한 기수에 대해 유효하지 않은 숫자입니다.',
    introTitle: '무료 진법 변환기', introText: '가장 일반적인 4가지 진법 사이에서 정수를 변환합니다.',
    tipTitle: '진법 팁', tip1: '2진수는 0과 1만 사용합니다', tip2: '16진수는 색상 코드에 사용됩니다',
    tip3: '8진수는 Unix 권한에 사용됩니다', tip4: '16진수 한 자리 = 4비트', tip5: '0b:이진수, 0o:팔진수, 0x:십육진수',
    faqTitle: '자주 묻는 질문', faq1q: '10진수를 2진수로 변환하는 방법은?', faq1a: '숫자를 반복해서 2로 나눕니다.',
    faq2q: '16진수는 무엇에 사용되나요?', faq2a: '메모리 주소와 색상 코드에 사용됩니다.',
    faq3q: '지원하는 최대 숫자는 무엇인가요?', faq3a: 'JavaScript 안전 정수 최대 2^53-1.',
    faq4q: '음수는 어떻게 표현되나요?', faq4a: '이 변환기는 음이 아닌 정수로 작동합니다.',
    faq5q: '비트 표현은 무엇을 나타내나요?', faq5a: '바이트로 그룹화된 이진 숫자를 시각적으로 표시합니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Konverter Basis Bilangan', description: 'Konversi angka antara biner, oktal, desimal, dan heksadesimal dengan konversi langsung.',
    decLabel: 'Desimal (Basis 10)', binLabel: 'Biner (Basis 2)', octLabel: 'Oktal (Basis 8)', hexLabel: 'Heksadesimal (Basis 16)',
    bitRepTitle: 'Representasi Bit', clear: 'Hapus', loadSample: 'Muat Contoh', errorInvalid: 'Angka tidak valid untuk basis yang dipilih.',
    introTitle: 'Konverter basis bilangan gratis', introText: 'Konversi bilangan bulat antara empat basis bilangan paling umum.',
    tipTitle: 'Tips basis bilangan', tip1: 'Biner hanya menggunakan 0 dan 1', tip2: 'Heksadesimal digunakan untuk kode warna',
    tip3: 'Oktal digunakan dalam izin Unix', tip4: 'Satu digit hex = 4 bit biner', tip5: 'Awalan 0b biner, 0o oktal, 0x hex',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Bagaimana mengubah desimal ke biner?', faq1a: 'Bagi angka berulang kali dengan 2.',
    faq2q: 'Untuk apa heksadesimal digunakan?', faq2a: 'Untuk alamat memori dan kode warna.',
    faq3q: 'Berapa angka maksimum yang didukung?', faq3a: 'Bilangan bulat JavaScript aman hingga 2^53-1.',
    faq4q: 'Bagaimana bilangan negatif direpresentasikan?', faq4a: 'Konverter ini bekerja dengan bilangan bulat non-negatif.',
    faq5q: 'Apa yang ditampilkan representasi bit?', faq5a: 'Menampilkan digit biner yang dikelompokkan dalam byte.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวแปลงฐานตัวเลข', description: 'แปลงตัวเลขระหว่างไบนารี ออกทัล ทศนิยม และเลขฐานสิบหกแบบสดๆ',
    decLabel: 'ทศนิยม (ฐาน 10)', binLabel: 'ไบนารี (ฐาน 2)', octLabel: 'ออกทัล (ฐาน 8)', hexLabel: 'เลขฐานสิบหก (ฐาน 16)',
    bitRepTitle: 'การแสดงบิต', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', errorInvalid: 'ตัวเลขไม่ถูกต้องสำหรับฐานที่เลือก',
    introTitle: 'ตัวแปลงฐานตัวเลขฟรี', introText: 'แปลงจำนวนเต็มระหว่างสี่ฐานตัวเลขทั่วไปที่สุด',
    tipTitle: 'เคล็ดลับฐานตัวเลข', tip1: 'ไบนารีใช้เพียง 0 และ 1', tip2: 'เลขฐานสิบหกใช้สำหรับรหัสสี',
    tip3: 'ออกทัลใช้ในสิทธิ์ Unix', tip4: 'หนึ่งหลัก hex = 4 บิตไบนารี', tip5: '0b ไบนารี 0o ออกทัล 0x hex',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'วิธีแปลงทศนิยมเป็นไบนารี?', faq1a: 'หารตัวเลขด้วย 2 ซ้ำๆ',
    faq2q: 'เลขฐานสิบหกใช้สำหรับอะไร?', faq2a: 'สำหรับที่อยู่หน่วยความจำและรหัสสี',
    faq3q: 'ตัวเลขสูงสุดที่รองรับคือเท่าใด?', faq3a: 'จำนวนเต็ม JavaScript ที่ปลอดภัยสูงสุด 2^53-1',
    faq4q: 'ตัวเลขลบแสดงอย่างไร?', faq4a: 'ตัวแปลงนี้ทำงานกับจำนวนเต็มที่ไม่เป็นลบ',
    faq5q: 'การแสดงบิตแสดงอะไร?', faq5a: 'แสดงตัวเลขไบนารีที่จัดกลุ่มเป็นไบต์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

function convertFromDecimal(value: number): { bin: string; oct: string; hex: string } {
  if (isNaN(value) || value < 0 || !Number.isInteger(value)) return { bin: '', oct: '', hex: '' };
  return {
    bin: value.toString(2),
    oct: value.toString(8),
    hex: value.toString(16).toUpperCase(),
  };
}

export default function NumberBaseConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [dec, setDec] = useState('255');
  const [bin, setBin] = useState('11111111');
  const [oct, setOct] = useState('377');
  const [hex, setHex] = useState('FF');
  const [error, setError] = useState('');

  const updateAll = useCallback((decVal: number) => {
    const r = convertFromDecimal(decVal);
    setBin(r.bin);
    setOct(r.oct);
    setHex(r.hex);
  }, []);

  const handleDec = (v: string) => {
    setDec(v);
    setError('');
    const n = parseInt(v, 10);
    if (v === '' || isNaN(n) || n < 0) { setBin(''); setOct(''); setHex(''); return; }
    updateAll(n);
  };
  const handleBin = (v: string) => {
    setBin(v);
    setError('');
    if (!/^[01]*$/.test(v)) { setError(t.errorInvalid); return; }
    const n = parseInt(v, 2);
    if (isNaN(n)) { setDec(''); setOct(''); setHex(''); return; }
    setDec(String(n));
    setOct(n.toString(8));
    setHex(n.toString(16).toUpperCase());
  };
  const handleOct = (v: string) => {
    setOct(v);
    setError('');
    if (!/^[0-7]*$/.test(v)) { setError(t.errorInvalid); return; }
    const n = parseInt(v, 8);
    if (isNaN(n)) { setDec(''); setBin(''); setHex(''); return; }
    setDec(String(n));
    setBin(n.toString(2));
    setHex(n.toString(16).toUpperCase());
  };
  const handleHex = (v: string) => {
    setHex(v.toUpperCase());
    setError('');
    if (!/^[0-9A-Fa-f]*$/.test(v)) { setError(t.errorInvalid); return; }
    const n = parseInt(v, 16);
    if (isNaN(n)) { setDec(''); setBin(''); setOct(''); return; }
    setDec(String(n));
    setBin(n.toString(2));
    setOct(n.toString(8));
  };

  const decVal = parseInt(dec, 10);
  const bitStr = (!isNaN(decVal) && decVal >= 0) ? decVal.toString(2).padStart(Math.ceil(decVal.toString(2).length / 8) * 8 || 8, '0') : '';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const inputStyle: React.CSSProperties = { fontFamily: 'monospace', fontSize: 15, letterSpacing: 1 };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="number-base-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => { setDec('255'); handleDec('255'); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setDec(''); setBin(''); setOct(''); setHex(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f43f5e' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[
          { label: t.decLabel, value: dec, onChange: handleDec, placeholder: '255' },
          { label: t.binLabel, value: bin, onChange: handleBin, placeholder: '11111111' },
          { label: t.octLabel, value: oct, onChange: handleOct, placeholder: '377' },
          { label: t.hexLabel, value: hex, onChange: handleHex, placeholder: 'FF' },
        ].map(({ label, value, onChange, placeholder }) => (
          <div key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
              <CopyButton text={value} />
            </div>
            <input
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={placeholder}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      {bitStr && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.bitRepTitle}</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontFamily: 'monospace' }}>
            {Array.from({ length: Math.ceil(bitStr.length / 8) }, (_, byteIdx) => (
              <div key={byteIdx} style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 8 }, (_, bitIdx) => {
                  const charIdx = byteIdx * 8 + bitIdx;
                  const bit = charIdx < bitStr.length ? bitStr[charIdx] : '0';
                  return (
                    <span key={bitIdx} style={{
                      width: 24, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 4, fontSize: 13, fontWeight: 700,
                      background: bit === '1' ? 'var(--accent-blue)' : 'var(--bg-input)',
                      color: bit === '1' ? '#fff' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                    }}>{bit}</span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/roman-numeral-converter`, label: 'Roman Numeral Converter' },
            { href: `/${lang}/tools/byte-converter`, label: 'Byte Converter' },
            { href: `/${lang}/tools/binary-text`, label: 'Binary to Text' },
            { href: `/${lang}/tools/base64`, label: 'Base64 Encoder' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
