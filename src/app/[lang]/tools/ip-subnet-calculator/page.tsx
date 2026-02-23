'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'IP Subnet Calculator',
    description: 'Calculate IP subnet details: network address, broadcast address, usable IP range, CIDR notation, and number of hosts.',
    ipLabel: 'IP Address', cidrLabel: 'CIDR Prefix (0-32)', calcBtn: 'Calculate', clear: 'Clear', loadSample: 'Load Sample',
    networkAddr: 'Network Address', broadcastAddr: 'Broadcast Address', subnetMask: 'Subnet Mask',
    wildcardMask: 'Wildcard Mask', firstHost: 'First Usable Host', lastHost: 'Last Usable Host',
    totalHosts: 'Total Hosts', usableHosts: 'Usable Hosts', ipClass: 'IP Class', cidrNotation: 'CIDR Notation',
    binaryMask: 'Binary Subnet Mask',
    errorInvalidIp: 'Invalid IP address. Please enter a valid IPv4 address (e.g. 192.168.1.0).',
    errorInvalidCidr: 'Invalid CIDR prefix. Must be between 0 and 32.',
    introTitle: 'Free Online IP Subnet Calculator',
    introText: 'Calculate comprehensive IPv4 subnet information from an IP address and CIDR prefix. Instantly see the network address, broadcast address, subnet mask, wildcard mask, usable host range, and total number of hosts. Useful for network engineers, system administrators, students, and anyone working with IP addressing and subnetting.',
    tipTitle: 'Subnetting Tips',
    tip1: '/24 subnet gives 254 usable hosts (256 - 2 for network and broadcast)',
    tip2: 'The network address is the first address in the subnet (all host bits = 0)',
    tip3: 'The broadcast address is the last address in the subnet (all host bits = 1)',
    tip4: 'CIDR /30 is commonly used for point-to-point links (2 usable hosts)',
    tip5: 'The wildcard mask is the inverse of the subnet mask, used in ACLs',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is CIDR notation?',
    faq1a: 'CIDR (Classless Inter-Domain Routing) notation represents an IP address and its subnet mask as a suffix. For example, 192.168.1.0/24 means the first 24 bits are the network portion and the remaining 8 bits are for hosts, allowing 254 usable hosts.',
    faq2q: 'How is the network address calculated?',
    faq2a: 'The network address is derived by applying a bitwise AND operation between the IP address and the subnet mask. This zeroes out all the host bits, leaving only the network portion. It is the first address in the subnet.',
    faq3q: 'What is the difference between subnet mask and wildcard mask?',
    faq3a: 'The subnet mask has 1s in the network portion and 0s in the host portion. The wildcard mask is the bitwise inverse: 0s in the network portion and 1s in the host portion. Wildcard masks are used in Cisco ACLs and OSPF area configurations.',
    faq4q: 'Why are 2 addresses reserved in every subnet?',
    faq4a: 'Every subnet reserves two addresses: the network address (all host bits = 0, used to identify the subnet) and the broadcast address (all host bits = 1, used to send packets to all hosts in the subnet). So a /24 has 256 addresses but only 254 are usable for hosts.',
    faq5q: 'What are the IP address classes?',
    faq5a: 'Class A: 1.0.0.0 to 126.255.255.255 (large networks). Class B: 128.0.0.0 to 191.255.255.255 (medium networks). Class C: 192.0.0.0 to 223.255.255.255 (small networks). Class D: 224.0.0.0 to 239.255.255.255 (multicast). Class E: 240.0.0.0 to 255.255.255.255 (reserved).',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'IP 子网计算器', description: '计算 IP 子网详细信息：网络地址、广播地址、可用 IP 范围和主机数量。',
    ipLabel: 'IP 地址', cidrLabel: 'CIDR 前缀 (0-32)', calcBtn: '计算', clear: '清除', loadSample: '加载示例',
    networkAddr: '网络地址', broadcastAddr: '广播地址', subnetMask: '子网掩码',
    wildcardMask: '通配符掩码', firstHost: '第一个可用主机', lastHost: '最后一个可用主机',
    totalHosts: '总主机数', usableHosts: '可用主机数', ipClass: 'IP 类别', cidrNotation: 'CIDR 表示法',
    binaryMask: '二进制子网掩码',
    errorInvalidIp: 'IP 地址无效。请输入有效的 IPv4 地址（例如 192.168.1.0）。',
    errorInvalidCidr: 'CIDR 前缀无效。必须在 0 到 32 之间。',
    introTitle: '免费在线 IP 子网计算器', introText: '从 IP 地址和 CIDR 前缀计算全面的 IPv4 子网信息。',
    tipTitle: '子网划分技巧', tip1: '/24 子网提供 254 个可用主机', tip2: '网络地址是子网中的第一个地址',
    tip3: '广播地址是子网中的最后一个地址', tip4: '/30 常用于点对点链路', tip5: '通配符掩码是子网掩码的反转，用于 ACL',
    faqTitle: '常见问题', faq1q: '什么是 CIDR 表示法？', faq1a: 'CIDR 用前缀长度表示网络地址和子网掩码。例如 192.168.1.0/24 表示前 24 位是网络部分。',
    faq2q: '网络地址如何计算？', faq2a: '网络地址通过 IP 地址与子网掩码的按位 AND 运算得出。',
    faq3q: '子网掩码和通配符掩码有何区别？', faq3a: '通配符掩码是子网掩码的按位反转，用于 ACL 配置。',
    faq4q: '为什么每个子网保留 2 个地址？', faq4a: '每个子网保留网络地址和广播地址，因此 /24 有 256 个地址但只有 254 个可用。',
    faq5q: 'IP 地址类别是什么？', faq5a: 'A 类：1-126，B 类：128-191，C 类：192-223，D 类（多播）：224-239，E 类（保留）：240-255。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Calculateur de Sous-reseau IP', description: 'Calculez les details du sous-reseau IP: adresse reseau, broadcast et plage d\'IP utilisable.',
    ipLabel: 'Adresse IP', cidrLabel: 'Prefixe CIDR (0-32)', calcBtn: 'Calculer', clear: 'Effacer', loadSample: 'Charger exemple',
    networkAddr: 'Adresse reseau', broadcastAddr: 'Adresse broadcast', subnetMask: 'Masque de sous-reseau',
    wildcardMask: 'Masque generique', firstHost: 'Premier hote utilisable', lastHost: 'Dernier hote utilisable',
    totalHosts: 'Total d\'hotes', usableHosts: 'Hotes utilisables', ipClass: 'Classe IP', cidrNotation: 'Notation CIDR',
    binaryMask: 'Masque binaire',
    errorInvalidIp: 'Adresse IP invalide. Entrez une adresse IPv4 valide.', errorInvalidCidr: 'Prefixe CIDR invalide. Doit etre entre 0 et 32.',
    introTitle: 'Calculateur de sous-reseau IP gratuit', introText: 'Calculez des informations completes sur le sous-reseau IPv4.',
    tipTitle: 'Conseils de sous-reseaux', tip1: '/24 donne 254 hotes utilisables', tip2: 'L\'adresse reseau est la premiere adresse',
    tip3: 'L\'adresse broadcast est la derniere adresse', tip4: '/30 est utilise pour les liaisons point a point', tip5: 'Le masque generique est utilise dans les ACL',
    faqTitle: 'Questions frequentes', faq1q: 'Qu\'est-ce que la notation CIDR?', faq1a: 'CIDR represente une adresse IP et son masque comme suffixe.',
    faq2q: 'Comment l\'adresse reseau est-elle calculee?', faq2a: 'Par AND binaire entre l\'IP et le masque.',
    faq3q: 'Quelle est la difference entre masque et masque generique?', faq3a: 'Le masque generique est l\'inverse du masque de sous-reseau.',
    faq4q: 'Pourquoi 2 adresses sont-elles reservees?', faq4a: 'L\'adresse reseau et broadcast sont reservees dans chaque sous-reseau.',
    faq5q: 'Quelles sont les classes d\'adresses IP?', faq5a: 'Classe A: 1-126, B: 128-191, C: 192-223, D: multicast, E: reserve.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'IP Subnetz-Rechner', description: 'Berechnen Sie IP-Subnetz-Details: Netzwerkadresse, Broadcast und nutzbaren IP-Bereich.',
    ipLabel: 'IP-Adresse', cidrLabel: 'CIDR-Praefix (0-32)', calcBtn: 'Berechnen', clear: 'Loeschen', loadSample: 'Beispiel laden',
    networkAddr: 'Netzwerkadresse', broadcastAddr: 'Broadcast-Adresse', subnetMask: 'Subnetzmaske',
    wildcardMask: 'Wildcard-Maske', firstHost: 'Erster nutzbarer Host', lastHost: 'Letzter nutzbarer Host',
    totalHosts: 'Gesamte Hosts', usableHosts: 'Nutzbare Hosts', ipClass: 'IP-Klasse', cidrNotation: 'CIDR-Notation',
    binaryMask: 'Binaere Subnetzmaske',
    errorInvalidIp: 'Ungueltige IP-Adresse. Bitte geben Sie eine gueltige IPv4-Adresse ein.', errorInvalidCidr: 'Ungueltiges CIDR-Praefix. Muss zwischen 0 und 32 liegen.',
    introTitle: 'Kostenloser IP Subnetz-Rechner', introText: 'Berechnen Sie umfassende IPv4-Subnetzinformationen aus einer IP-Adresse und einem CIDR-Praefix.',
    tipTitle: 'Subnetz-Tipps', tip1: '/24 Subnetz hat 254 nutzbare Hosts', tip2: 'Netzwerkadresse ist die erste Adresse im Subnetz',
    tip3: 'Broadcast-Adresse ist die letzte Adresse', tip4: '/30 wird fuer Punkt-zu-Punkt-Links verwendet', tip5: 'Wildcard-Maske ist das Inverse der Subnetzmaske',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Was ist CIDR-Notation?', faq1a: 'CIDR stellt eine IP-Adresse mit Praefixlaenge dar.',
    faq2q: 'Wie wird die Netzwerkadresse berechnet?', faq2a: 'Durch binaeres UND der IP mit der Subnetzmaske.',
    faq3q: 'Was ist der Unterschied zwischen Subnetzmaske und Wildcard-Maske?', faq3a: 'Die Wildcard-Maske ist das binaere Inverse der Subnetzmaske.',
    faq4q: 'Warum sind 2 Adressen reserviert?', faq4a: 'Netzwerk- und Broadcast-Adresse sind in jedem Subnetz reserviert.',
    faq5q: 'Was sind IP-Adressklassen?', faq5a: 'Klasse A: 1-126, B: 128-191, C: 192-223, D: Multicast, E: Reserviert.',
    relatedTitle: 'Verwandte Tools',
  },
  es: { title: 'Calculadora de Subred IP', description: 'Calcula detalles de subred IP.',
    ipLabel: 'Direccion IP', cidrLabel: 'Prefijo CIDR (0-32)', calcBtn: 'Calcular', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    networkAddr: 'Direccion de red', broadcastAddr: 'Direccion broadcast', subnetMask: 'Mascara de subred',
    wildcardMask: 'Mascara wildcard', firstHost: 'Primer host utilizable', lastHost: 'Ultimo host utilizable',
    totalHosts: 'Total de hosts', usableHosts: 'Hosts utilizables', ipClass: 'Clase IP', cidrNotation: 'Notacion CIDR', binaryMask: 'Mascara binaria',
    errorInvalidIp: 'Direccion IP invalida.', errorInvalidCidr: 'Prefijo CIDR invalido.',
    introTitle: 'Calculadora de subred IP gratuita', introText: 'Calcula informacion completa de subred IPv4.',
    tipTitle: 'Consejos de subred', tip1: '/24 da 254 hosts utilizables', tip2: 'La direccion de red es la primera del subnet',
    tip3: 'La broadcast es la ultima del subnet', tip4: '/30 se usa para enlaces punto a punto', tip5: 'La mascara wildcard es el inverso de la mascara de subred',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Que es la notacion CIDR?', faq1a: 'CIDR representa la red con un prefijo de longitud.',
    faq2q: 'Como se calcula la direccion de red?', faq2a: 'AND bit a bit entre IP y mascara.',
    faq3q: 'Diferencia entre mascara y wildcard?', faq3a: 'La wildcard es el inverso de la mascara.',
    faq4q: 'Por que se reservan 2 direcciones?', faq4a: 'Red y broadcast se reservan en cada subred.',
    faq5q: 'Cuales son las clases de IP?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: reservado.',
    relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Calculadora de Sub-rede IP', description: 'Calcule detalhes de sub-rede IP.',
    ipLabel: 'Endereco IP', cidrLabel: 'Prefixo CIDR (0-32)', calcBtn: 'Calcular', clear: 'Limpar', loadSample: 'Carregar exemplo',
    networkAddr: 'Endereco de rede', broadcastAddr: 'Endereco broadcast', subnetMask: 'Mascara de sub-rede',
    wildcardMask: 'Mascara wildcard', firstHost: 'Primeiro host utilizavel', lastHost: 'Ultimo host utilizavel',
    totalHosts: 'Total de hosts', usableHosts: 'Hosts utilizaveis', ipClass: 'Classe IP', cidrNotation: 'Notacao CIDR', binaryMask: 'Mascara binaria',
    errorInvalidIp: 'Endereco IP invalido.', errorInvalidCidr: 'Prefixo CIDR invalido.',
    introTitle: 'Calculadora de sub-rede IP gratuita', introText: 'Calcule informacoes completas de sub-rede IPv4.',
    tipTitle: 'Dicas de sub-rede', tip1: '/24 tem 254 hosts utilizaveis', tip2: 'O endereco de rede e o primeiro endereco',
    tip3: 'O endereco broadcast e o ultimo', tip4: '/30 e usado para links ponto a ponto', tip5: 'A mascara wildcard e o inverso da mascara de sub-rede',
    faqTitle: 'Perguntas frequentes', faq1q: 'O que e notacao CIDR?', faq1a: 'CIDR representa o endereco com comprimento de prefixo.',
    faq2q: 'Como o endereco de rede e calculado?', faq2a: 'AND bit a bit entre IP e mascara.',
    faq3q: 'Diferenca entre mascara e wildcard?', faq3a: 'O wildcard e o inverso da mascara.',
    faq4q: 'Por que 2 enderecos sao reservados?', faq4a: 'Rede e broadcast sao reservados em cada sub-rede.',
    faq5q: 'Quais sao as classes de IP?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: reservado.',
    relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Calcolatore di Sottorete IP', description: 'Calcola i dettagli della sottorete IP.',
    ipLabel: 'Indirizzo IP', cidrLabel: 'Prefisso CIDR (0-32)', calcBtn: 'Calcola', clear: 'Cancella', loadSample: 'Carica esempio',
    networkAddr: 'Indirizzo di rete', broadcastAddr: 'Indirizzo broadcast', subnetMask: 'Maschera di sottorete',
    wildcardMask: 'Maschera wildcard', firstHost: 'Primo host utilizzabile', lastHost: 'Ultimo host utilizzabile',
    totalHosts: 'Host totali', usableHosts: 'Host utilizzabili', ipClass: 'Classe IP', cidrNotation: 'Notazione CIDR', binaryMask: 'Maschera binaria',
    errorInvalidIp: 'Indirizzo IP non valido.', errorInvalidCidr: 'Prefisso CIDR non valido.',
    introTitle: 'Calcolatore di sottorete IP gratuito', introText: 'Calcola informazioni complete sulla sottorete IPv4.',
    tipTitle: 'Suggerimenti per la sottorete', tip1: '/24 ha 254 host utilizzabili', tip2: 'L\'indirizzo di rete e il primo della sottorete',
    tip3: 'Il broadcast e l\'ultimo', tip4: '/30 e usato per collegamenti punto-punto', tip5: 'La maschera wildcard e l\'inverso della maschera di sottorete',
    faqTitle: 'Domande frequenti', faq1q: 'Cos\'e la notazione CIDR?', faq1a: 'CIDR rappresenta l\'indirizzo con lunghezza del prefisso.',
    faq2q: 'Come viene calcolato l\'indirizzo di rete?', faq2a: 'AND bit a bit tra IP e maschera.',
    faq3q: 'Differenza tra maschera e wildcard?', faq3a: 'Il wildcard e l\'inverso della maschera.',
    faq4q: 'Perche 2 indirizzi sono riservati?', faq4a: 'Rete e broadcast sono riservati in ogni sottorete.',
    faq5q: 'Quali sono le classi IP?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: riservato.',
    relatedTitle: 'Strumenti correlati' },
  nl: { title: 'IP Subnetcalculator', description: 'Bereken IP-subnetdetails.',
    ipLabel: 'IP-adres', cidrLabel: 'CIDR-prefix (0-32)', calcBtn: 'Berekenen', clear: 'Wissen', loadSample: 'Voorbeeld laden',
    networkAddr: 'Netwerkadres', broadcastAddr: 'Broadcastadres', subnetMask: 'Subnetmasker',
    wildcardMask: 'Wildcard-masker', firstHost: 'Eerste bruikbare host', lastHost: 'Laatste bruikbare host',
    totalHosts: 'Totale hosts', usableHosts: 'Bruikbare hosts', ipClass: 'IP-klasse', cidrNotation: 'CIDR-notatie', binaryMask: 'Binair masker',
    errorInvalidIp: 'Ongeldig IP-adres.', errorInvalidCidr: 'Ongeldig CIDR-prefix.',
    introTitle: 'Gratis IP subnetcalculator', introText: 'Bereken uitgebreide IPv4-subnetinformatie.',
    tipTitle: 'Subnet tips', tip1: '/24 heeft 254 bruikbare hosts', tip2: 'Het netwerkadres is het eerste adres',
    tip3: 'Het broadcastadres is het laatste', tip4: '/30 wordt gebruikt voor punt-tot-punt-links', tip5: 'Wildcard-masker is het inverse van het subnetmasker',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Wat is CIDR-notatie?', faq1a: 'CIDR stelt een IP-adres voor met prefixlengte.',
    faq2q: 'Hoe wordt het netwerkadres berekend?', faq2a: 'Binaire AND tussen IP en masker.',
    faq3q: 'Verschil tussen masker en wildcard?', faq3a: 'Het wildcard-masker is het inverse van het subnetmasker.',
    faq4q: 'Waarom zijn 2 adressen gereserveerd?', faq4a: 'Netwerk en broadcast zijn gereserveerd in elk subnet.',
    faq5q: 'Wat zijn de IP-adresklassen?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: gereserveerd.',
    relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Kalkulator Podsieci IP', description: 'Oblicz szczegoly podsieci IP.',
    ipLabel: 'Adres IP', cidrLabel: 'Prefiks CIDR (0-32)', calcBtn: 'Oblicz', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad',
    networkAddr: 'Adres sieci', broadcastAddr: 'Adres rozgloszeniowy', subnetMask: 'Maska podsieci',
    wildcardMask: 'Maska wildcard', firstHost: 'Pierwszy uzyteczny host', lastHost: 'Ostatni uzyteczny host',
    totalHosts: 'Lacznie hostow', usableHosts: 'Uzyteczne hosty', ipClass: 'Klasa IP', cidrNotation: 'Notacja CIDR', binaryMask: 'Binarna maska',
    errorInvalidIp: 'Nieprawidlowy adres IP.', errorInvalidCidr: 'Nieprawidlowy prefiks CIDR.',
    introTitle: 'Darmowy kalkulator podsieci IP', introText: 'Oblicz pelne informacje o podsieci IPv4.',
    tipTitle: 'Wskazowki podsieci', tip1: '/24 ma 254 uzyteczne hosty', tip2: 'Adres sieci to pierwszy adres podsieci',
    tip3: 'Adres rozgloszeniowy to ostatni adres', tip4: '/30 jest uzywany dla laczy punkt-punkt', tip5: 'Maska wildcard jest odwrotnoscia maski podsieci',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Co to jest notacja CIDR?', faq1a: 'CIDR reprezentuje adres z dlugoscia prefiksu.',
    faq2q: 'Jak obliczany jest adres sieci?', faq2a: 'Operacja AND bit po bicie miedzy IP a maska.',
    faq3q: 'Roznica miedzy maska a wildcard?', faq3a: 'Maska wildcard jest odwrotnoscia maski podsieci.',
    faq4q: 'Dlaczego 2 adresy sa zarezerwowane?', faq4a: 'Adres sieci i rozgloszeniowy sa zarezerwowane.',
    faq5q: 'Jakie sa klasy adresow IP?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: zarezerwowane.',
    relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'IP Undernaetskalkylator', description: 'Beraekna IP-undernaetsdetaljer.',
    ipLabel: 'IP-adress', cidrLabel: 'CIDR-prefix (0-32)', calcBtn: 'Beraekna', clear: 'Rensa', loadSample: 'Ladda exempel',
    networkAddr: 'Naetverksadress', broadcastAddr: 'Broadcastadress', subnetMask: 'Naetmaske',
    wildcardMask: 'Wildcard-mask', firstHost: 'Forsta anvaendbara host', lastHost: 'Sista anvaendbara host',
    totalHosts: 'Totala hosts', usableHosts: 'Anvaendbara hosts', ipClass: 'IP-klass', cidrNotation: 'CIDR-notation', binaryMask: 'Binaer mask',
    errorInvalidIp: 'Ogiltig IP-adress.', errorInvalidCidr: 'Ogiltigt CIDR-prefix.',
    introTitle: 'Gratis IP undernaetskalkylator', introText: 'Beraekna detaljerad IPv4-undernaetsinformation.',
    tipTitle: 'Undernaets tips', tip1: '/24 har 254 anvaendbara hosts', tip2: 'Naetverksadressen aer den foersta adressen',
    tip3: 'Broadcastadressen aer den sista', tip4: '/30 anvaends for punkt-till-punkt-laenkar', tip5: 'Wildcard-masken aer det omvaenda av naetmasken',
    faqTitle: 'Vanliga fragor', faq1q: 'Vad aer CIDR-notation?', faq1a: 'CIDR representerar en IP-adress med prefixlaengd.',
    faq2q: 'Hur beraeknas naetverksadressen?', faq2a: 'Binaert AND mellan IP och mask.',
    faq3q: 'Skillnad mellan mask och wildcard?', faq3a: 'Wildcard-masken aer det omvaenda av naetmasken.',
    faq4q: 'Varfor aer 2 adresser reserverade?', faq4a: 'Naetverks- och broadcastadress aer reserverade i varje undernaet.',
    faq5q: 'Vilka aer IP-adressklasserna?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: reserverat.',
    relatedTitle: 'Relaterade verktyg' },
  no: { title: 'IP Subnett-kalkulator', description: 'Beregn IP-subnettdetaljer.',
    ipLabel: 'IP-adresse', cidrLabel: 'CIDR-prefiks (0-32)', calcBtn: 'Beregn', clear: 'Toemme', loadSample: 'Last eksempel',
    networkAddr: 'Nettverksadresse', broadcastAddr: 'Kringkastingsadresse', subnetMask: 'Nettmaske',
    wildcardMask: 'Wildcard-maske', firstHost: 'Forste brukbare vert', lastHost: 'Siste brukbare vert',
    totalHosts: 'Totale verter', usableHosts: 'Brukbare verter', ipClass: 'IP-klasse', cidrNotation: 'CIDR-notasjon', binaryMask: 'Binaer maske',
    errorInvalidIp: 'Ugyldig IP-adresse.', errorInvalidCidr: 'Ugyldig CIDR-prefiks.',
    introTitle: 'Gratis IP subnett-kalkulator', introText: 'Beregn detaljert IPv4-subnettinformasjon.',
    tipTitle: 'Subnett tips', tip1: '/24 har 254 brukbare verter', tip2: 'Nettverksadressen er den forste adressen',
    tip3: 'Kringkastingsadressen er den siste', tip4: '/30 brukes for punkt-til-punkt-lenker', tip5: 'Wildcard-masken er det omvendte av nettmasken',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Hva er CIDR-notasjon?', faq1a: 'CIDR representerer en IP-adresse med prefikslengde.',
    faq2q: 'Hvordan beregnes nettverksadressen?', faq2a: 'Binaer AND mellom IP og maske.',
    faq3q: 'Forskjell mellom maske og wildcard?', faq3a: 'Wildcard-masken er det omvendte av nettmasken.',
    faq4q: 'Hvorfor er 2 adresser reservert?', faq4a: 'Nettverks- og kringkastingsadresse er reservert i hvert subnett.',
    faq5q: 'Hvilke er IP-adresseklassene?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: reservert.',
    relatedTitle: 'Relaterte verktoy' },
  ja: { title: 'IP サブネット計算機', description: 'IP サブネットの詳細を計算します。',
    ipLabel: 'IP アドレス', cidrLabel: 'CIDR プレフィックス (0-32)', calcBtn: '計算', clear: 'クリア', loadSample: 'サンプル読込',
    networkAddr: 'ネットワークアドレス', broadcastAddr: 'ブロードキャストアドレス', subnetMask: 'サブネットマスク',
    wildcardMask: 'ワイルドカードマスク', firstHost: '最初の使用可能ホスト', lastHost: '最後の使用可能ホスト',
    totalHosts: '総ホスト数', usableHosts: '使用可能ホスト数', ipClass: 'IP クラス', cidrNotation: 'CIDR 表記', binaryMask: '2進数サブネットマスク',
    errorInvalidIp: 'IP アドレスが無効です。', errorInvalidCidr: 'CIDR プレフィックスが無効です。',
    introTitle: '無料 IP サブネット計算機', introText: 'IP アドレスと CIDR プレフィックスから IPv4 サブネット情報を計算します。',
    tipTitle: 'サブネッティングのヒント', tip1: '/24 サブネットは 254 の使用可能ホストを持つ', tip2: 'ネットワークアドレスはサブネットの最初のアドレス',
    tip3: 'ブロードキャストアドレスは最後のアドレス', tip4: '/30 はポイントツーポイントリンクに使用', tip5: 'ワイルドカードマスクはサブネットマスクの逆',
    faqTitle: 'よくある質問', faq1q: 'CIDR 表記とは？', faq1a: 'CIDR は IP アドレスをプレフィックス長で表します。',
    faq2q: 'ネットワークアドレスはどう計算されますか？', faq2a: 'IP とマスクのビット単位 AND 演算です。',
    faq3q: 'サブネットマスクとワイルドカードの違い？', faq3a: 'ワイルドカードはサブネットマスクのビット反転です。',
    faq4q: 'なぜ 2 つのアドレスが予約されているの？', faq4a: 'ネットワークとブロードキャストが各サブネットで予約されています。',
    faq5q: 'IP アドレスクラスは？', faq5a: 'A: 1-126、B: 128-191、C: 192-223、D: マルチキャスト、E: 予約済み',
    relatedTitle: '関連ツール' },
  ko: { title: 'IP 서브넷 계산기', description: 'IP 서브넷 세부 정보를 계산합니다.',
    ipLabel: 'IP 주소', cidrLabel: 'CIDR 접두사 (0-32)', calcBtn: '계산', clear: '지우기', loadSample: '샘플 로드',
    networkAddr: '네트워크 주소', broadcastAddr: '브로드캐스트 주소', subnetMask: '서브넷 마스크',
    wildcardMask: '와일드카드 마스크', firstHost: '첫 번째 사용 가능한 호스트', lastHost: '마지막 사용 가능한 호스트',
    totalHosts: '전체 호스트', usableHosts: '사용 가능한 호스트', ipClass: 'IP 클래스', cidrNotation: 'CIDR 표기법', binaryMask: '이진 서브넷 마스크',
    errorInvalidIp: '유효하지 않은 IP 주소입니다.', errorInvalidCidr: '유효하지 않은 CIDR 접두사입니다.',
    introTitle: '무료 IP 서브넷 계산기', introText: 'IP 주소와 CIDR 접두사에서 IPv4 서브넷 정보를 계산합니다.',
    tipTitle: '서브넷팅 팁', tip1: '/24 서브넷은 254개의 사용 가능한 호스트를 가짐', tip2: '네트워크 주소는 서브넷의 첫 번째 주소',
    tip3: '브로드캐스트 주소는 마지막 주소', tip4: '/30은 포인트 투 포인트 링크에 사용', tip5: '와일드카드 마스크는 서브넷 마스크의 역수',
    faqTitle: '자주 묻는 질문', faq1q: 'CIDR 표기법이란?', faq1a: 'CIDR은 IP 주소를 접두사 길이로 나타냅니다.',
    faq2q: '네트워크 주소는 어떻게 계산되나요?', faq2a: 'IP와 마스크의 비트 단위 AND 연산입니다.',
    faq3q: '서브넷 마스크와 와일드카드의 차이?', faq3a: '와일드카드는 서브넷 마스크의 비트 반전입니다.',
    faq4q: '왜 2개의 주소가 예약되어 있나요?', faq4a: '각 서브넷에서 네트워크와 브로드캐스트가 예약됩니다.',
    faq5q: 'IP 주소 클래스는?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: 멀티캐스트, E: 예약됨',
    relatedTitle: '관련 도구' },
  id: { title: 'Kalkulator Subnet IP', description: 'Hitung detail subnet IP.',
    ipLabel: 'Alamat IP', cidrLabel: 'Prefiks CIDR (0-32)', calcBtn: 'Hitung', clear: 'Hapus', loadSample: 'Muat contoh',
    networkAddr: 'Alamat jaringan', broadcastAddr: 'Alamat broadcast', subnetMask: 'Masker subnet',
    wildcardMask: 'Masker wildcard', firstHost: 'Host pertama yang dapat digunakan', lastHost: 'Host terakhir yang dapat digunakan',
    totalHosts: 'Total host', usableHosts: 'Host yang dapat digunakan', ipClass: 'Kelas IP', cidrNotation: 'Notasi CIDR', binaryMask: 'Masker biner',
    errorInvalidIp: 'Alamat IP tidak valid.', errorInvalidCidr: 'Prefiks CIDR tidak valid.',
    introTitle: 'Kalkulator subnet IP gratis', introText: 'Hitung informasi subnet IPv4 yang komprehensif.',
    tipTitle: 'Tips subnetting', tip1: '/24 memiliki 254 host yang dapat digunakan', tip2: 'Alamat jaringan adalah alamat pertama',
    tip3: 'Alamat broadcast adalah yang terakhir', tip4: '/30 digunakan untuk tautan titik-ke-titik', tip5: 'Masker wildcard adalah kebalikan dari masker subnet',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Apa itu notasi CIDR?', faq1a: 'CIDR mewakili alamat IP dengan panjang awalan.',
    faq2q: 'Bagaimana alamat jaringan dihitung?', faq2a: 'AND bitwise antara IP dan masker.',
    faq3q: 'Perbedaan masker dan wildcard?', faq3a: 'Masker wildcard adalah kebalikan dari masker subnet.',
    faq4q: 'Mengapa 2 alamat dicadangkan?', faq4a: 'Jaringan dan broadcast dicadangkan di setiap subnet.',
    faq5q: 'Apa kelas alamat IP?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: multicast, E: cadangan.',
    relatedTitle: 'Alat terkait' },
  th: { title: 'เครื่องคำนวณซับเน็ต IP', description: 'คำนวณรายละเอียดซับเน็ต IP',
    ipLabel: 'ที่อยู่ IP', cidrLabel: 'คำนำหน้า CIDR (0-32)', calcBtn: 'คำนวณ', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง',
    networkAddr: 'ที่อยู่เครือข่าย', broadcastAddr: 'ที่อยู่บรอดแคสต์', subnetMask: 'ซับเน็ตมาสก์',
    wildcardMask: 'ไวลด์การ์ดมาสก์', firstHost: 'โฮสต์แรกที่ใช้ได้', lastHost: 'โฮสต์สุดท้ายที่ใช้ได้',
    totalHosts: 'โฮสต์ทั้งหมด', usableHosts: 'โฮสต์ที่ใช้ได้', ipClass: 'คลาส IP', cidrNotation: 'รูปแบบ CIDR', binaryMask: 'ซับเน็ตมาสก์ไบนารี',
    errorInvalidIp: 'ที่อยู่ IP ไม่ถูกต้อง', errorInvalidCidr: 'คำนำหน้า CIDR ไม่ถูกต้อง',
    introTitle: 'เครื่องคำนวณซับเน็ต IP ฟรี', introText: 'คำนวณข้อมูลซับเน็ต IPv4 จากที่อยู่ IP และคำนำหน้า CIDR',
    tipTitle: 'เคล็ดลับการแบ่งซับเน็ต', tip1: '/24 มี 254 โฮสต์ที่ใช้ได้', tip2: 'ที่อยู่เครือข่ายคือที่อยู่แรกในซับเน็ต',
    tip3: 'ที่อยู่บรอดแคสต์คือที่อยู่สุดท้าย', tip4: '/30 ใช้สำหรับลิงก์แบบ point-to-point', tip5: 'ไวลด์การ์ดมาสก์คือส่วนกลับของซับเน็ตมาสก์',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'รูปแบบ CIDR คืออะไร?', faq1a: 'CIDR แสดงที่อยู่ IP พร้อมความยาวคำนำหน้า',
    faq2q: 'ที่อยู่เครือข่ายคำนวณอย่างไร?', faq2a: 'AND แบบบิตระหว่าง IP และมาสก์',
    faq3q: 'ความแตกต่างระหว่างมาสก์และไวลด์การ์ด?', faq3a: 'ไวลด์การ์ดมาสก์คือส่วนกลับของซับเน็ตมาสก์',
    faq4q: 'ทำไมจึงต้องสงวน 2 ที่อยู่?', faq4a: 'เครือข่ายและบรอดแคสต์ถูกสงวนในแต่ละซับเน็ต',
    faq5q: 'คลาสที่อยู่ IP คืออะไร?', faq5a: 'A: 1-126, B: 128-191, C: 192-223, D: มัลติแคสต์, E: สงวน',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

interface SubnetResult {
  networkAddr: string;
  broadcastAddr: string;
  subnetMask: string;
  wildcardMask: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  cidrNotation: string;
  binaryMask: string;
}

function ipToNum(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function numToIp(num: number): string {
  return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
}

function getIpClass(firstOctet: number): string {
  if (firstOctet < 128) return 'A';
  if (firstOctet < 192) return 'B';
  if (firstOctet < 224) return 'C';
  if (firstOctet < 240) return 'D (Multicast)';
  return 'E (Reserved)';
}

function calculateSubnet(ip: string, cidr: number): SubnetResult {
  const ipNum = ipToNum(ip);
  const maskNum = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | (~maskNum >>> 0)) >>> 0;
  const wildcardNum = (~maskNum) >>> 0;
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? totalHosts : Math.max(0, totalHosts - 2);
  const firstHostNum = cidr >= 31 ? networkNum : networkNum + 1;
  const lastHostNum = cidr >= 31 ? broadcastNum : broadcastNum - 1;
  const firstOctet = parseInt(ip.split('.')[0], 10);
  const binaryMask = numToIp(maskNum).split('.').map(o => parseInt(o, 10).toString(2).padStart(8, '0')).join('.');

  return {
    networkAddr: numToIp(networkNum),
    broadcastAddr: numToIp(broadcastNum),
    subnetMask: numToIp(maskNum),
    wildcardMask: numToIp(wildcardNum),
    firstHost: numToIp(firstHostNum),
    lastHost: numToIp(lastHostNum),
    totalHosts,
    usableHosts,
    ipClass: getIpClass(firstOctet),
    cidrNotation: `${numToIp(networkNum)}/${cidr}`,
    binaryMask,
  };
}

export default function IpSubnetCalculator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [ip, setIp] = useState('192.168.1.100');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState('');

  const calculate = useCallback(() => {
    setError('');
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip) || ip.split('.').some(o => parseInt(o, 10) > 255)) {
      setError(t.errorInvalidIp);
      return;
    }
    const cidrNum = parseInt(cidr, 10);
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      setError(t.errorInvalidCidr);
      return;
    }
    setResult(calculateSubnet(ip, cidrNum));
  }, [ip, cidr, t]);

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

  const resultRows = result ? [
    { label: t.cidrNotation, value: result.cidrNotation },
    { label: t.networkAddr, value: result.networkAddr },
    { label: t.broadcastAddr, value: result.broadcastAddr },
    { label: t.subnetMask, value: result.subnetMask },
    { label: t.wildcardMask, value: result.wildcardMask },
    { label: t.firstHost, value: result.firstHost },
    { label: t.lastHost, value: result.lastHost },
    { label: t.totalHosts, value: result.totalHosts.toLocaleString() },
    { label: t.usableHosts, value: result.usableHosts.toLocaleString() },
    { label: t.ipClass, value: result.ipClass },
    { label: t.binaryMask, value: result.binaryMask },
  ] : [];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="ip-subnet-calculator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.ipLabel}</label>
          <input value={ip} onChange={e => setIp(e.target.value)} placeholder="192.168.1.0" style={{ width: 200, fontFamily: 'monospace' }} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.cidrLabel}</label>
          <input value={cidr} onChange={e => setCidr(e.target.value)} placeholder="24" type="number" min="0" max="32" style={{ width: 100, fontFamily: 'monospace' }} />
        </div>
        <button onClick={calculate} className="btn btn-primary">{t.calcBtn}</button>
        <button onClick={() => { setIp('192.168.1.100'); setCidr('24'); setResult(null); setError(''); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setIp(''); setCidr(''); setResult(null); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f43f5e' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {resultRows.map(({ label, value }, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? 'var(--bg-input)' : 'transparent' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--text-secondary)', width: '40%' }}>{label}</td>
                  <td style={{ padding: '10px 16px', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{value}</span>
                      <CopyButton text={String(value)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/http-status`, label: 'HTTP Status Codes' },
            { href: `/${lang}/tools/fake-data`, label: 'Fake Data Generator' },
            { href: `/${lang}/tools/http-headers-guide`, label: 'HTTP Headers Guide' },
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
