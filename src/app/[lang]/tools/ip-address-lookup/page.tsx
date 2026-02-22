'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'IP Address Lookup Tool',
    description: 'Look up any IP address to find geolocation, ISP, timezone, and more. Automatically detects your current IP address.',
    ipLabel: 'IP Address',
    ipPlaceholder: 'Enter an IP address (e.g., 8.8.8.8)',
    lookupBtn: 'Lookup',
    lookupMyIp: 'My IP',
    clear: 'Clear',
    yourIp: 'Your IP Address',
    loading: 'Looking up...',
    results: 'Lookup Results',
    ip: 'IP Address',
    city: 'City',
    region: 'Region',
    country: 'Country',
    loc: 'Location',
    org: 'Organization / ISP',
    postal: 'Postal Code',
    timezone: 'Timezone',
    hostname: 'Hostname',
    error: 'Could not look up this IP address. Please check the address and try again.',
    invalidIp: 'Please enter a valid IPv4 or IPv6 address.',
    introTitle: 'Free Online IP Address Lookup Tool',
    introText: 'Quickly look up geolocation data for any IPv4 or IPv6 address. This tool uses the ipinfo.io API to retrieve city, region, country, ISP/organization, coordinates, postal code, and timezone information. Your own IP is detected automatically when you first load the page. All lookups happen client-side; no data is stored on our servers.',
    tipTitle: 'What Can You Learn from an IP Address?',
    tip1: 'Approximate geographic location (city, region, country)',
    tip2: 'Internet Service Provider (ISP) or organization',
    tip3: 'Timezone and postal code area',
    tip4: 'Whether it is a VPN, proxy, or hosting provider IP',
    tip5: 'Latitude and longitude coordinates for mapping',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is an IP address lookup?',
    faq1a: 'An IP address lookup queries a geolocation database to find information associated with an IP address, such as the approximate physical location (city, region, country), the Internet Service Provider (ISP), timezone, and coordinates. This data is useful for security analysis, network troubleshooting, and understanding web traffic origins.',
    faq2q: 'How accurate is IP geolocation?',
    faq2a: 'IP geolocation is typically accurate to the city level for most residential connections, though exact street addresses cannot be determined from an IP alone. VPNs, proxies, and mobile networks may show the location of the server or carrier gateway rather than the actual user location. Accuracy varies by region and ISP.',
    faq3q: 'Can I look up my own IP address?',
    faq3a: 'Yes. This tool automatically detects and displays your current public IP address when you first load the page. Click the "My IP" button at any time to look up your current IP. Note that if you are using a VPN, it will show the VPN server IP, not your actual IP.',
    faq4q: 'Is this tool free to use?',
    faq4a: 'Yes, this tool is completely free. It uses the public ipinfo.io API for lookups. For high-volume or commercial use, consider using a paid geolocation API service for better rate limits and additional data fields.',
    faq5q: 'What is the difference between IPv4 and IPv6?',
    faq5a: 'IPv4 uses 32-bit addresses (e.g., 8.8.8.8), while IPv6 uses 128-bit addresses (e.g., 2001:4860:4860::8888). IPv6 provides a vastly larger address space to accommodate the growing number of internet-connected devices. Both types can be looked up with this tool.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'IP 地址查询工具',
    description: '查询任何 IP 地址的地理位置、ISP、时区等信息。自动检测您的当前 IP 地址。',
    ipLabel: 'IP 地址',
    ipPlaceholder: '输入 IP 地址 (例如 8.8.8.8)',
    lookupBtn: '查询',
    lookupMyIp: '我的 IP',
    clear: '清除',
    yourIp: '您的 IP 地址',
    loading: '查询中...',
    results: '查询结果',
    ip: 'IP 地址',
    city: '城市',
    region: '地区',
    country: '国家',
    loc: '位置坐标',
    org: '组织 / ISP',
    postal: '邮政编码',
    timezone: '时区',
    hostname: '主机名',
    error: '无法查询此 IP 地址，请检查地址后重试。',
    invalidIp: '请输入有效的 IPv4 或 IPv6 地址。',
    introTitle: '免费在线 IP 地址查询工具',
    introText: '快速查询任何 IPv4 或 IPv6 地址的地理位置数据。使用 ipinfo.io API 获取城市、地区、国家、ISP/组织、坐标、邮编和时区信息。首次加载页面时自动检测您的 IP。所有查询在客户端完成，不存储任何数据。',
    tipTitle: '从 IP 地址可以了解什么？',
    tip1: '大致地理位置（城市、地区、国家）',
    tip2: '互联网服务提供商（ISP）或组织',
    tip3: '时区和邮政编码区域',
    tip4: '是否为 VPN、代理或主机托管商 IP',
    tip5: '用于地图标注的经纬度坐标',
    faqTitle: '常见问题',
    faq1q: '什么是 IP 地址查询？', faq1a: 'IP 地址查询通过地理位置数据库查找与 IP 地址相关的信息，如大致物理位置、ISP、时区和坐标。适用于安全分析、网络故障排查和流量来源分析。',
    faq2q: 'IP 地理定位有多准确？', faq2a: '对于大多数家庭连接，IP 地理定位通常精确到城市级别。VPN、代理和移动网络可能显示服务器或运营商网关位置。准确度因地区和 ISP 而异。',
    faq3q: '可以查询自己的 IP 地址吗？', faq3a: '可以。本工具在页面加载时自动检测并显示您的公网 IP 地址。如果使用 VPN，将显示 VPN 服务器 IP。',
    faq4q: '这个工具免费吗？', faq4a: '完全免费。使用 ipinfo.io 公共 API 进行查询。大批量或商业用途建议使用付费地理位置 API 服务。',
    faq5q: 'IPv4 和 IPv6 有什么区别？', faq5a: 'IPv4 使用 32 位地址（如 8.8.8.8），而 IPv6 使用 128 位地址（如 2001:4860:4860::8888）。IPv6 提供了更大的地址空间以满足日益增长的联网设备需求。本工具支持两种地址的查询。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Outil de Recherche d\'Adresse IP',
    description: 'Recherchez n\'importe quelle adresse IP. Detecte automatiquement votre IP actuelle.',
    ipLabel: 'Adresse IP', ipPlaceholder: 'Entrez une adresse IP (ex: 8.8.8.8)', lookupBtn: 'Rechercher',
    lookupMyIp: 'Mon IP', clear: 'Effacer', yourIp: 'Votre adresse IP', loading: 'Recherche en cours...',
    results: 'Resultats', ip: 'Adresse IP', city: 'Ville', region: 'Region', country: 'Pays',
    loc: 'Localisation', org: 'Organisation / FAI', postal: 'Code postal', timezone: 'Fuseau horaire', hostname: 'Nom d\'hote',
    error: 'Impossible de rechercher cette adresse IP.', invalidIp: 'Veuillez entrer une adresse IPv4 ou IPv6 valide.',
    introTitle: 'Outil de recherche IP gratuit', introText: 'Recherchez les donnees de geolocalisation pour toute adresse IP. Utilise l\'API ipinfo.io.',
    tipTitle: 'Que peut-on apprendre d\'une adresse IP?', tip1: 'Localisation geographique', tip2: 'Fournisseur d\'acces', tip3: 'Fuseau horaire', tip4: 'VPN ou proxy', tip5: 'Coordonnees GPS',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que la recherche IP?', faq1a: 'La recherche IP interroge une base de geolocalisation pour trouver les informations associees a une adresse IP.',
    faq2q: 'Quelle precision?', faq2a: 'Typiquement precise au niveau de la ville pour les connexions residentielle.',
    faq3q: 'Puis-je rechercher mon propre IP?', faq3a: 'Oui, l\'outil detecte automatiquement votre IP publique.',
    faq4q: 'Est-ce gratuit?', faq4a: 'Oui, completement gratuit via l\'API publique ipinfo.io.',
    faq5q: 'Quelle est la difference entre IPv4 et IPv6?', faq5a: 'IPv4 utilise des adresses 32 bits (ex: 8.8.8.8), tandis qu\'IPv6 utilise des adresses 128 bits (ex: 2001:4860:4860::8888). IPv6 offre un espace d\'adressage beaucoup plus large.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'IP-Adresse Nachschlagen',
    description: 'Jede IP-Adresse nachschlagen. Erkennt automatisch Ihre aktuelle IP.',
    ipLabel: 'IP-Adresse', ipPlaceholder: 'IP-Adresse eingeben (z.B. 8.8.8.8)', lookupBtn: 'Nachschlagen',
    lookupMyIp: 'Meine IP', clear: 'Loeschen', yourIp: 'Ihre IP-Adresse', loading: 'Suche laeuft...',
    results: 'Ergebnisse', ip: 'IP-Adresse', city: 'Stadt', region: 'Region', country: 'Land',
    loc: 'Standort', org: 'Organisation / ISP', postal: 'Postleitzahl', timezone: 'Zeitzone', hostname: 'Hostname',
    error: 'Diese IP-Adresse konnte nicht nachgeschlagen werden.', invalidIp: 'Bitte geben Sie eine gueltige IPv4- oder IPv6-Adresse ein.',
    introTitle: 'Kostenloses IP-Nachschlage-Tool', introText: 'Geolokalisierungsdaten fuer jede IP-Adresse nachschlagen. Verwendet die ipinfo.io API.',
    tipTitle: 'Was kann man von einer IP lernen?', tip1: 'Geographische Lage', tip2: 'Internet-Provider', tip3: 'Zeitzone', tip4: 'VPN oder Proxy', tip5: 'GPS-Koordinaten',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist IP-Nachschlagen?', faq1a: 'IP-Nachschlagen fragt eine Geolokalisierungsdatenbank ab um Informationen zu einer IP-Adresse zu finden.',
    faq2q: 'Wie genau ist es?', faq2a: 'Typischerweise auf Stadtebene genau fuer Wohnverbindungen.',
    faq3q: 'Kann ich meine eigene IP nachschlagen?', faq3a: 'Ja, das Tool erkennt automatisch Ihre oeffentliche IP.',
    faq4q: 'Ist es kostenlos?', faq4a: 'Ja, komplett kostenlos ueber die oeffentliche ipinfo.io API.',
    faq5q: 'Was ist der Unterschied zwischen IPv4 und IPv6?', faq5a: 'IPv4 verwendet 32-Bit-Adressen (z.B. 8.8.8.8), waehrend IPv6 128-Bit-Adressen verwendet (z.B. 2001:4860:4860::8888). IPv6 bietet einen viel groesseren Adressraum.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Herramienta de Busqueda de IP',
    description: 'Busque cualquier direccion IP. Detecta automaticamente su IP actual.',
    ipLabel: 'Direccion IP', ipPlaceholder: 'Ingrese una direccion IP (ej: 8.8.8.8)', lookupBtn: 'Buscar',
    lookupMyIp: 'Mi IP', clear: 'Limpiar', yourIp: 'Su direccion IP', loading: 'Buscando...',
    results: 'Resultados', ip: 'Direccion IP', city: 'Ciudad', region: 'Region', country: 'Pais',
    loc: 'Ubicacion', org: 'Organizacion / ISP', postal: 'Codigo postal', timezone: 'Zona horaria', hostname: 'Nombre de host',
    error: 'No se pudo buscar esta direccion IP.', invalidIp: 'Ingrese una direccion IPv4 o IPv6 valida.',
    introTitle: 'Herramienta de busqueda IP gratuita', introText: 'Busque datos de geolocalizacion para cualquier direccion IP. Usa la API ipinfo.io.',
    tipTitle: 'Que se puede saber de una IP?', tip1: 'Ubicacion geografica', tip2: 'Proveedor de internet', tip3: 'Zona horaria', tip4: 'VPN o proxy', tip5: 'Coordenadas GPS',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la busqueda de IP?', faq1a: 'La busqueda de IP consulta una base de geolocalizacion para encontrar informacion asociada a una direccion IP.',
    faq2q: 'Que tan precisa es?', faq2a: 'Tipicamente precisa a nivel de ciudad para conexiones residenciales.',
    faq3q: 'Puedo buscar mi propia IP?', faq3a: 'Si, la herramienta detecta automaticamente su IP publica.',
    faq4q: 'Es gratis?', faq4a: 'Si, completamente gratis a traves de la API publica ipinfo.io.',
    faq5q: 'Cual es la diferencia entre IPv4 e IPv6?', faq5a: 'IPv4 utiliza direcciones de 32 bits (ej: 8.8.8.8), mientras que IPv6 utiliza direcciones de 128 bits (ej: 2001:4860:4860::8888). IPv6 ofrece un espacio de direcciones mucho mas grande.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'IP アドレス検索ツール',
    description: 'IP アドレスの地理位置、ISP、タイムゾーンなどを検索。現在の IP を自動検出。',
    ipLabel: 'IP アドレス', ipPlaceholder: 'IP アドレスを入力 (例: 8.8.8.8)', lookupBtn: '検索',
    lookupMyIp: '自分の IP', clear: 'クリア', yourIp: 'あなたの IP アドレス', loading: '検索中...',
    results: '検索結果', ip: 'IP アドレス', city: '都市', region: '地域', country: '国',
    loc: '位置', org: '組織 / ISP', postal: '郵便番号', timezone: 'タイムゾーン', hostname: 'ホスト名',
    error: 'この IP アドレスを検索できませんでした。', invalidIp: '有効な IPv4 または IPv6 アドレスを入力してください。',
    introTitle: '無料 IP アドレス検索ツール', introText: 'ipinfo.io API を使用して任意の IP アドレスの地理位置データを検索します。',
    tipTitle: 'IP アドレスからわかること', tip1: '地理的位置', tip2: 'プロバイダー', tip3: 'タイムゾーン', tip4: 'VPN やプロキシ', tip5: 'GPS 座標',
    faqTitle: 'よくある質問',
    faq1q: 'IP アドレス検索とは？', faq1a: 'ジオロケーションデータベースに問い合わせて IP アドレスに関連する情報を見つけます。',
    faq2q: '精度は？', faq2a: '住宅接続の場合、通常は市レベルの精度です。',
    faq3q: '自分の IP を検索できますか？', faq3a: 'はい、ツールが自動的に公開 IP を検出します。',
    faq4q: '無料ですか？', faq4a: 'はい、ipinfo.io の公開 API を通じて完全に無料です。',
    faq5q: 'IPv4 と IPv6 の違いは？', faq5a: 'IPv4 は 32 ビットアドレス（例: 8.8.8.8）を使用し、IPv6 は 128 ビットアドレス（例: 2001:4860:4860::8888）を使用します。IPv6 はより大きなアドレス空間を提供します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'IP 주소 조회 도구',
    description: 'IP 주소의 지리적 위치, ISP, 시간대 등을 조회합니다. 현재 IP를 자동 감지합니다.',
    ipLabel: 'IP 주소', ipPlaceholder: 'IP 주소 입력 (예: 8.8.8.8)', lookupBtn: '조회',
    lookupMyIp: '내 IP', clear: '지우기', yourIp: '당신의 IP 주소', loading: '조회 중...',
    results: '조회 결과', ip: 'IP 주소', city: '도시', region: '지역', country: '국가',
    loc: '위치', org: '조직 / ISP', postal: '우편번호', timezone: '시간대', hostname: '호스트명',
    error: '이 IP 주소를 조회할 수 없습니다.', invalidIp: '유효한 IPv4 또는 IPv6 주소를 입력하세요.',
    introTitle: '무료 IP 주소 조회 도구', introText: 'ipinfo.io API를 사용하여 모든 IP 주소의 지리 위치 데이터를 조회합니다.',
    tipTitle: 'IP 주소로 알 수 있는 것', tip1: '지리적 위치', tip2: '인터넷 제공업체', tip3: '시간대', tip4: 'VPN 또는 프록시', tip5: 'GPS 좌표',
    faqTitle: '자주 묻는 질문',
    faq1q: 'IP 주소 조회란?', faq1a: '지리 위치 데이터베이스에 질의하여 IP 주소 관련 정보를 찾습니다.',
    faq2q: '정확도는?', faq2a: '주거 연결의 경우 일반적으로 도시 수준의 정확도입니다.',
    faq3q: '내 IP를 조회할 수 있나요?', faq3a: '네, 도구가 자동으로 공인 IP를 감지합니다.',
    faq4q: '무료인가요?', faq4a: '네, ipinfo.io 공개 API를 통해 완전 무료입니다.',
    faq5q: 'IPv4와 IPv6의 차이점은?', faq5a: 'IPv4는 32비트 주소(예: 8.8.8.8)를 사용하고, IPv6는 128비트 주소(예: 2001:4860:4860::8888)를 사용합니다. IPv6는 더 많은 주소 공간을 제공합니다.',
    relatedTitle: '관련 도구',
  },
  it: {
    title: 'Strumento di Ricerca Indirizzo IP',
    description: 'Cerca qualsiasi indirizzo IP per trovare geolocalizzazione, ISP e fuso orario. Rileva automaticamente il tuo IP.',
    ipLabel: 'Indirizzo IP', ipPlaceholder: 'Inserisci un indirizzo IP (es: 8.8.8.8)', lookupBtn: 'Cerca',
    lookupMyIp: 'Il mio IP', clear: 'Cancella', yourIp: 'Il tuo indirizzo IP', loading: 'Ricerca in corso...',
    results: 'Risultati', ip: 'Indirizzo IP', city: 'Citta', region: 'Regione', country: 'Paese',
    loc: 'Posizione', org: 'Organizzazione / ISP', postal: 'Codice postale', timezone: 'Fuso orario', hostname: 'Nome host',
    error: 'Impossibile cercare questo indirizzo IP.', invalidIp: 'Inserisci un indirizzo IPv4 o IPv6 valido.',
    introTitle: 'Strumento di ricerca IP gratuito', introText: 'Cerca i dati di geolocalizzazione per qualsiasi indirizzo IP. Utilizza l\'API ipinfo.io.',
    tipTitle: 'Cosa si puo imparare da un IP?', tip1: 'Posizione geografica', tip2: 'Provider Internet', tip3: 'Fuso orario', tip4: 'VPN o proxy', tip5: 'Coordinate GPS',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e la ricerca IP?', faq1a: 'La ricerca IP interroga un database di geolocalizzazione per trovare informazioni associate a un indirizzo IP.',
    faq2q: 'Quanto e precisa?', faq2a: 'Tipicamente precisa a livello di citta per le connessioni residenziali.',
    faq3q: 'Posso cercare il mio IP?', faq3a: 'Si, lo strumento rileva automaticamente il tuo IP pubblico.',
    faq4q: 'E gratuito?', faq4a: 'Si, completamente gratuito tramite l\'API pubblica ipinfo.io.',
    faq5q: 'Qual e la differenza tra IPv4 e IPv6?', faq5a: 'IPv4 utilizza indirizzi a 32 bit (es: 8.8.8.8), mentre IPv6 utilizza indirizzi a 128 bit (es: 2001:4860:4860::8888). IPv6 offre uno spazio di indirizzi molto piu ampio.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Ferramenta de Consulta de Endereco IP',
    description: 'Consulte qualquer endereco IP para encontrar geolocalizacao, ISP e fuso horario. Detecta automaticamente seu IP atual.',
    ipLabel: 'Endereco IP', ipPlaceholder: 'Insira um endereco IP (ex: 8.8.8.8)', lookupBtn: 'Consultar',
    lookupMyIp: 'Meu IP', clear: 'Limpar', yourIp: 'Seu endereco IP', loading: 'Consultando...',
    results: 'Resultados', ip: 'Endereco IP', city: 'Cidade', region: 'Regiao', country: 'Pais',
    loc: 'Localizacao', org: 'Organizacao / ISP', postal: 'Codigo postal', timezone: 'Fuso horario', hostname: 'Nome do host',
    error: 'Nao foi possivel consultar este endereco IP.', invalidIp: 'Insira um endereco IPv4 ou IPv6 valido.',
    introTitle: 'Ferramenta de consulta IP gratuita', introText: 'Consulte dados de geolocalizacao para qualquer endereco IP. Usa a API ipinfo.io.',
    tipTitle: 'O que se pode aprender de um IP?', tip1: 'Localizacao geografica', tip2: 'Provedor de internet', tip3: 'Fuso horario', tip4: 'VPN ou proxy', tip5: 'Coordenadas GPS',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e consulta de IP?', faq1a: 'A consulta de IP interroga um banco de dados de geolocalizacao para encontrar informacoes associadas a um endereco IP.',
    faq2q: 'Qual a precisao?', faq2a: 'Tipicamente precisa ao nivel da cidade para conexoes residenciais.',
    faq3q: 'Posso consultar meu proprio IP?', faq3a: 'Sim, a ferramenta detecta automaticamente seu IP publico.',
    faq4q: 'E gratuito?', faq4a: 'Sim, completamente gratuito atraves da API publica ipinfo.io.',
    faq5q: 'Qual a diferenca entre IPv4 e IPv6?', faq5a: 'IPv4 usa enderecos de 32 bits (ex: 8.8.8.8), enquanto IPv6 usa enderecos de 128 bits (ex: 2001:4860:4860::8888). IPv6 oferece um espaco de enderecos muito maior.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'IP-Adres Opzoeken Tool',
    description: 'Zoek elk IP-adres op voor geolocatie, ISP en tijdzone. Detecteert automatisch uw huidige IP.',
    ipLabel: 'IP-adres', ipPlaceholder: 'Voer een IP-adres in (bijv. 8.8.8.8)', lookupBtn: 'Opzoeken',
    lookupMyIp: 'Mijn IP', clear: 'Wissen', yourIp: 'Uw IP-adres', loading: 'Opzoeken...',
    results: 'Resultaten', ip: 'IP-adres', city: 'Stad', region: 'Regio', country: 'Land',
    loc: 'Locatie', org: 'Organisatie / ISP', postal: 'Postcode', timezone: 'Tijdzone', hostname: 'Hostnaam',
    error: 'Kon dit IP-adres niet opzoeken.', invalidIp: 'Voer een geldig IPv4- of IPv6-adres in.',
    introTitle: 'Gratis IP-adres opzoektool', introText: 'Zoek geolocatiegegevens op voor elk IP-adres. Gebruikt de ipinfo.io API.',
    tipTitle: 'Wat kun je leren van een IP?', tip1: 'Geografische locatie', tip2: 'Internetprovider', tip3: 'Tijdzone', tip4: 'VPN of proxy', tip5: 'GPS-coordinaten',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is IP opzoeken?', faq1a: 'IP opzoeken bevraagt een geolocatiedatabase om informatie bij een IP-adres te vinden.',
    faq2q: 'Hoe nauwkeurig is het?', faq2a: 'Doorgaans nauwkeurig op stadsniveau voor residentiole verbindingen.',
    faq3q: 'Kan ik mijn eigen IP opzoeken?', faq3a: 'Ja, de tool detecteert automatisch uw openbare IP.',
    faq4q: 'Is het gratis?', faq4a: 'Ja, volledig gratis via de openbare ipinfo.io API.',
    faq5q: 'Wat is het verschil tussen IPv4 en IPv6?', faq5a: 'IPv4 gebruikt 32-bits adressen (bijv. 8.8.8.8), terwijl IPv6 128-bits adressen gebruikt (bijv. 2001:4860:4860::8888). IPv6 biedt een veel grotere adresruimte.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Narzedzie Wyszukiwania Adresu IP',
    description: 'Wyszukaj dowolny adres IP aby znalezc geolokalizacje, ISP i strefe czasowa. Automatycznie wykrywa Twoj IP.',
    ipLabel: 'Adres IP', ipPlaceholder: 'Wpisz adres IP (np. 8.8.8.8)', lookupBtn: 'Wyszukaj',
    lookupMyIp: 'Moj IP', clear: 'Wyczysc', yourIp: 'Twoj adres IP', loading: 'Wyszukiwanie...',
    results: 'Wyniki', ip: 'Adres IP', city: 'Miasto', region: 'Region', country: 'Kraj',
    loc: 'Lokalizacja', org: 'Organizacja / ISP', postal: 'Kod pocztowy', timezone: 'Strefa czasowa', hostname: 'Nazwa hosta',
    error: 'Nie mozna wyszukac tego adresu IP.', invalidIp: 'Wpisz prawidlowy adres IPv4 lub IPv6.',
    introTitle: 'Darmowe narzedzie do wyszukiwania IP', introText: 'Wyszukuj dane geolokalizacyjne dla dowolnego adresu IP. Uzywa API ipinfo.io.',
    tipTitle: 'Co mozna dowiedziec sie z adresu IP?', tip1: 'Lokalizacja geograficzna', tip2: 'Dostawca internetu', tip3: 'Strefa czasowa', tip4: 'VPN lub proxy', tip5: 'Wspolrzedne GPS',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest wyszukiwanie IP?', faq1a: 'Wyszukiwanie IP odpytuje baze geolokalizacji w celu znalezienia informacji powiazanych z adresem IP.',
    faq2q: 'Jak dokladne jest?', faq2a: 'Zazwyczaj dokladne na poziomie miasta dla polaczen domowych.',
    faq3q: 'Czy moge wyszukac swoj wlasny IP?', faq3a: 'Tak, narzedzie automatycznie wykrywa Twoj publiczny IP.',
    faq4q: 'Czy jest darmowe?', faq4a: 'Tak, calkowicie darmowe dzieki publicznemu API ipinfo.io.',
    faq5q: 'Jaka jest roznica miedzy IPv4 a IPv6?', faq5a: 'IPv4 uzywa adresow 32-bitowych (np. 8.8.8.8), a IPv6 uzywa adresow 128-bitowych (np. 2001:4860:4860::8888). IPv6 oferuje znacznie wieksza przestrzen adresowa.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'IP-Adress Soekverktyg',
    description: 'Slaa upp vilken IP-adress som helst foer att hitta geolokalisering, ISP och tidszon. Detekterar automatiskt din IP.',
    ipLabel: 'IP-adress', ipPlaceholder: 'Ange en IP-adress (t.ex. 8.8.8.8)', lookupBtn: 'Soek',
    lookupMyIp: 'Min IP', clear: 'Rensa', yourIp: 'Din IP-adress', loading: 'Soeker...',
    results: 'Resultat', ip: 'IP-adress', city: 'Stad', region: 'Region', country: 'Land',
    loc: 'Plats', org: 'Organisation / ISP', postal: 'Postnummer', timezone: 'Tidszon', hostname: 'Vaerdnamn',
    error: 'Kunde inte slaa upp denna IP-adress.', invalidIp: 'Ange en giltig IPv4- eller IPv6-adress.',
    introTitle: 'Gratis IP-adress soekverktyg', introText: 'Slaa upp geolokaliseringsdata foer vilken IP-adress som helst. Anvaender ipinfo.io API.',
    tipTitle: 'Vad kan man laera sig fraan en IP?', tip1: 'Geografisk plats', tip2: 'Internetleverantoer', tip3: 'Tidszon', tip4: 'VPN eller proxy', tip5: 'GPS-koordinater',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer IP-uppslag?', faq1a: 'IP-uppslag fraagar en geolokaliseringsdatabas foer att hitta information kopplad till en IP-adress.',
    faq2q: 'Hur noggrant aer det?', faq2a: 'Vanligtvis noggrant paa stadsnivaa foer bostadsanslutningar.',
    faq3q: 'Kan jag slaa upp min egen IP?', faq3a: 'Ja, verktyget detekterar automatiskt din offentliga IP.',
    faq4q: 'Aer det gratis?', faq4a: 'Ja, helt gratis via det offentliga ipinfo.io API.',
    faq5q: 'Vad aer skillnaden mellan IPv4 och IPv6?', faq5a: 'IPv4 anvaender 32-bitars adresser (t.ex. 8.8.8.8), medan IPv6 anvaender 128-bitars adresser (t.ex. 2001:4860:4860::8888). IPv6 erbjuder ett mycket stoerre adressutrymme.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'IP-Adresse Oppslagsverktoy',
    description: 'Slaa opp enhver IP-adresse for aa finne geolokalisering, ISP og tidssone. Oppdager automatisk din IP.',
    ipLabel: 'IP-adresse', ipPlaceholder: 'Skriv inn en IP-adresse (f.eks. 8.8.8.8)', lookupBtn: 'Soek',
    lookupMyIp: 'Min IP', clear: 'Toem', yourIp: 'Din IP-adresse', loading: 'Soeker...',
    results: 'Resultater', ip: 'IP-adresse', city: 'By', region: 'Region', country: 'Land',
    loc: 'Plassering', org: 'Organisasjon / ISP', postal: 'Postnummer', timezone: 'Tidssone', hostname: 'Vertsnavn',
    error: 'Kunne ikke slaa opp denne IP-adressen.', invalidIp: 'Vennligst skriv inn en gyldig IPv4- eller IPv6-adresse.',
    introTitle: 'Gratis IP-adresse oppslagsverktoy', introText: 'Slaa opp geolokaliseringsdata for enhver IP-adresse. Bruker ipinfo.io API.',
    tipTitle: 'Hva kan man laere av en IP?', tip1: 'Geografisk plassering', tip2: 'Internettleverandor', tip3: 'Tidssone', tip4: 'VPN eller proxy', tip5: 'GPS-koordinater',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er IP-oppslag?', faq1a: 'IP-oppslag sporr en geolokaliseringsdatabase for aa finne informasjon knyttet til en IP-adresse.',
    faq2q: 'Hvor noyaktig er det?', faq2a: 'Vanligvis noyaktig paa bynivaa for boligforbindelser.',
    faq3q: 'Kan jeg slaa opp min egen IP?', faq3a: 'Ja, verktoeyet oppdager automatisk din offentlige IP.',
    faq4q: 'Er det gratis?', faq4a: 'Ja, helt gratis via det offentlige ipinfo.io API.',
    faq5q: 'Hva er forskjellen mellom IPv4 og IPv6?', faq5a: 'IPv4 bruker 32-bits adresser (f.eks. 8.8.8.8), mens IPv6 bruker 128-bits adresser (f.eks. 2001:4860:4860::8888). IPv6 tilbyr et mye stoerre adresserom.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Alat Pencarian Alamat IP',
    description: 'Cari alamat IP apa pun untuk menemukan geolokasi, ISP, dan zona waktu. Mendeteksi IP Anda saat ini secara otomatis.',
    ipLabel: 'Alamat IP', ipPlaceholder: 'Masukkan alamat IP (mis: 8.8.8.8)', lookupBtn: 'Cari',
    lookupMyIp: 'IP Saya', clear: 'Hapus', yourIp: 'Alamat IP Anda', loading: 'Mencari...',
    results: 'Hasil', ip: 'Alamat IP', city: 'Kota', region: 'Wilayah', country: 'Negara',
    loc: 'Lokasi', org: 'Organisasi / ISP', postal: 'Kode pos', timezone: 'Zona waktu', hostname: 'Nama host',
    error: 'Tidak dapat mencari alamat IP ini.', invalidIp: 'Masukkan alamat IPv4 atau IPv6 yang valid.',
    introTitle: 'Alat pencarian IP gratis', introText: 'Cari data geolokasi untuk alamat IP apa pun. Menggunakan API ipinfo.io.',
    tipTitle: 'Apa yang bisa dipelajari dari IP?', tip1: 'Lokasi geografis', tip2: 'Penyedia internet', tip3: 'Zona waktu', tip4: 'VPN atau proxy', tip5: 'Koordinat GPS',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu pencarian IP?', faq1a: 'Pencarian IP meminta database geolokasi untuk menemukan informasi yang terkait dengan alamat IP.',
    faq2q: 'Seberapa akurat?', faq2a: 'Biasanya akurat hingga tingkat kota untuk koneksi perumahan.',
    faq3q: 'Bisakah saya mencari IP sendiri?', faq3a: 'Ya, alat ini secara otomatis mendeteksi IP publik Anda.',
    faq4q: 'Apakah gratis?', faq4a: 'Ya, sepenuhnya gratis melalui API publik ipinfo.io.',
    faq5q: 'Apa perbedaan antara IPv4 dan IPv6?', faq5a: 'IPv4 menggunakan alamat 32-bit (mis: 8.8.8.8), sedangkan IPv6 menggunakan alamat 128-bit (mis: 2001:4860:4860::8888). IPv6 menyediakan ruang alamat yang jauh lebih besar.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือค้นหาที่อยู่ IP',
    description: 'ค้นหาที่อยู่ IP เพื่อดูตำแหน่งทางภูมิศาสตร์ ISP เขตเวลา และอื่นๆ ตรวจจับ IP ปัจจุบันของคุณอัตโนมัติ',
    ipLabel: 'ที่อยู่ IP', ipPlaceholder: 'ป้อนที่อยู่ IP (เช่น 8.8.8.8)', lookupBtn: 'ค้นหา',
    lookupMyIp: 'IP ของฉัน', clear: 'ล้าง', yourIp: 'ที่อยู่ IP ของคุณ', loading: 'กำลังค้นหา...',
    results: 'ผลลัพธ์', ip: 'ที่อยู่ IP', city: 'เมือง', region: 'ภูมิภาค', country: 'ประเทศ',
    loc: 'ตำแหน่ง', org: 'องค์กร / ISP', postal: 'รหัสไปรษณีย์', timezone: 'เขตเวลา', hostname: 'ชื่อโฮสต์',
    error: 'ไม่สามารถค้นหาที่อยู่ IP นี้ได้', invalidIp: 'กรุณาป้อนที่อยู่ IPv4 หรือ IPv6 ที่ถูกต้อง',
    introTitle: 'เครื่องมือค้นหา IP ฟรี', introText: 'ค้นหาข้อมูลตำแหน่งทางภูมิศาสตร์สำหรับที่อยู่ IP ใดก็ได้ ใช้ API ipinfo.io',
    tipTitle: 'สิ่งที่เรียนรู้ได้จาก IP', tip1: 'ตำแหน่งทางภูมิศาสตร์', tip2: 'ผู้ให้บริการอินเทอร์เน็ต', tip3: 'เขตเวลา', tip4: 'VPN หรือ proxy', tip5: 'พิกัด GPS',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การค้นหา IP คืออะไร?', faq1a: 'การค้นหา IP สอบถามฐานข้อมูลตำแหน่งทางภูมิศาสตร์เพื่อค้นหาข้อมูลที่เกี่ยวข้องกับที่อยู่ IP',
    faq2q: 'แม่นยำแค่ไหน?', faq2a: 'โดยทั่วไปแม่นยำระดับเมืองสำหรับการเชื่อมต่อที่อยู่อาศัย',
    faq3q: 'ค้นหา IP ตัวเองได้ไหม?', faq3a: 'ได้ เครื่องมือจะตรวจจับ IP สาธารณะของคุณโดยอัตโนมัติ',
    faq4q: 'ฟรีไหม?', faq4a: 'ใช่ ฟรีทั้งหมดผ่าน API สาธารณะ ipinfo.io',
    faq5q: 'IPv4 กับ IPv6 ต่างกันอย่างไร?', faq5a: 'IPv4 ใช้ที่อยู่ 32 บิต (เช่น 8.8.8.8) ในขณะที่ IPv6 ใช้ที่อยู่ 128 บิต (เช่น 2001:4860:4860::8888) IPv6 มีพื้นที่ที่อยู่มากกว่ามาก',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  hostname?: string;
}

const IP_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$|^[0-9a-fA-F]{1,4}::(?:[0-9a-fA-F]{1,4}:){0,4}[0-9a-fA-F]{1,4}$/;

export default function IpAddressLookup() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [ipInput, setIpInput] = useState('');
  const [result, setResult] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [myIp, setMyIp] = useState('');

  // Auto-detect user IP on mount
  useEffect(() => {
    fetch('https://ipinfo.io/json?token=')
      .then(r => r.json())
      .then((data: IpInfo) => {
        setMyIp(data.ip);
        setResult(data);
      })
      .catch(() => { /* silently fail */ });
  }, []);

  const lookupIp = async (ip?: string) => {
    const target = ip || ipInput.trim();
    if (!target) return;
    if (!IP_REGEX.test(target) && target !== myIp) {
      setError(t.invalidIp);
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`https://ipinfo.io/${target}/json?token=`);
      if (!res.ok) throw new Error('Lookup failed');
      const data: IpInfo = await res.json();
      setResult(data);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const resultText = result
    ? Object.entries(result)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    : '';

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

  const fields: { key: keyof IpInfo; label: string }[] = [
    { key: 'ip', label: t.ip },
    { key: 'city', label: t.city },
    { key: 'region', label: t.region },
    { key: 'country', label: t.country },
    { key: 'loc', label: t.loc },
    { key: 'org', label: t.org },
    { key: 'postal', label: t.postal },
    { key: 'timezone', label: t.timezone },
    { key: 'hostname', label: t.hostname },
  ];

  return (
    <ToolLayout title={t.title} description={t.description} toolId="ip-address-lookup">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Your IP banner */}
      {myIp && (
        <div style={{
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span><strong>{t.yourIp}:</strong> {myIp}</span>
          <CopyButton text={myIp} />
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={ipInput}
          onChange={e => setIpInput(e.target.value)}
          placeholder={t.ipPlaceholder}
          onKeyDown={e => e.key === 'Enter' && lookupIp()}
          style={{ flex: 1, minWidth: 200, padding: '8px 12px', fontSize: 14 }}
        />
        <button onClick={() => lookupIp()} className="btn btn-primary" disabled={loading}>{t.lookupBtn}</button>
        <button onClick={() => lookupIp(myIp)} className="btn btn-secondary" disabled={loading || !myIp}>{t.lookupMyIp}</button>
        <button onClick={() => { setIpInput(''); setResult(null); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {loading && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.loading}</div>}
      {error && <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 16 }}>{error}</div>}

      {/* Results table */}
      {result && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.results}</label>
            <CopyButton text={resultText} />
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <tbody>
                {fields.map(({ key, label }) => {
                  const value = result[key];
                  if (!value) return null;
                  return (
                    <tr key={key} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, width: 160, background: 'var(--bg-input)', whiteSpace: 'nowrap' }}>{label}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace' }}>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Map link */}
          {result.loc && (
            <div style={{ marginTop: 12 }}>
              <a
                href={`https://www.google.com/maps?q=${result.loc}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'underline' }}
              >
                View on Google Maps ({result.loc})
              </a>
            </div>
          )}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li>
          <li>{t.tip2}</li>
          <li>{t.tip3}</li>
          <li>{t.tip4}</li>
          <li>{t.tip5}</li>
        </ul>

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
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/ip-calculator`, label: 'IP Calculator' },
            { href: `/${lang}/tools/password-generator-online`, label: 'Password Generator' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
            { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' },
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
