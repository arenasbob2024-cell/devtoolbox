'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'DNS Lookup Tool',
    description: 'Perform DNS lookups to find A, AAAA, CNAME, MX, NS, TXT, and SOA records for any domain.',
    domainLabel: 'Domain Name',
    domainPlaceholder: 'Enter domain (e.g., example.com)',
    lookup: 'Lookup',
    clear: 'Clear',
    loading: 'Looking up DNS records...',
    results: 'DNS Records',
    recordType: 'Record Type',
    recordName: 'Name',
    recordValue: 'Value',
    recordTtl: 'TTL',
    noRecords: 'No DNS records found for this domain.',
    invalidDomain: 'Please enter a valid domain name.',
    error: 'DNS lookup failed. Please check the domain and try again.',
    allTypes: 'All Types',
    filter: 'Filter by Type',
    totalRecords: 'Total Records',
    queryTime: 'Query Time',
    dnsServer: 'DNS Server',
    samples: 'Try These',
    introTitle: 'Free Online DNS Lookup Tool',
    introText: 'Query DNS records for any domain name. This tool fetches real-time DNS data including A (IPv4), AAAA (IPv6), CNAME (aliases), MX (mail servers), NS (name servers), TXT (text records), and SOA (start of authority) records. Useful for domain troubleshooting, email configuration verification, and DNS migration checks.',
    tipTitle: 'Understanding DNS Record Types',
    tip1: 'A records map domain names to IPv4 addresses (e.g., 93.184.216.34)',
    tip2: 'AAAA records map domain names to IPv6 addresses',
    tip3: 'MX records specify mail servers with priority values (lower = higher priority)',
    tip4: 'CNAME records create aliases pointing one domain to another',
    tip5: 'TXT records store text data, often used for SPF, DKIM, and domain verification',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a DNS lookup?',
    faq1a: 'A DNS (Domain Name System) lookup queries DNS servers to translate a domain name into its associated records. This includes IP addresses (A/AAAA records), mail servers (MX records), name servers (NS records), and other DNS data. DNS is the foundation of how the internet routes traffic to the correct servers.',
    faq2q: 'What are the different DNS record types?',
    faq2a: 'A records map domains to IPv4 addresses. AAAA records map to IPv6 addresses. CNAME records create domain aliases. MX records specify email servers. NS records identify authoritative name servers. TXT records hold text data for verification (SPF, DKIM, DMARC). SOA records contain zone authority information.',
    faq3q: 'How do I check if my DNS is configured correctly?',
    faq3a: 'Enter your domain name and check that: A records point to your server IP, MX records point to your email provider, NS records show your DNS provider, and TXT records include required verification entries (like SPF for email). Compare results with your DNS provider dashboard.',
    faq4q: 'What does TTL mean in DNS records?',
    faq4a: 'TTL (Time To Live) is the number of seconds a DNS record is cached by resolvers and browsers. A lower TTL means changes propagate faster but increase DNS query load. Typical values range from 300 seconds (5 minutes) to 86400 seconds (24 hours). Before making DNS changes, reduce TTL first.',
    faq5q: 'Is this DNS lookup tool free?',
    faq5a: 'Yes, this tool is completely free. It uses public DNS-over-HTTPS (DoH) services to perform real-time lookups. No account or API key is required. All queries are made directly from your browser.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'DNS 查询工具',
    description: '查询任何域名的 A、AAAA、CNAME、MX、NS、TXT 和 SOA 记录。',
    domainLabel: '域名',
    domainPlaceholder: '输入域名 (例如 example.com)',
    lookup: '查询',
    clear: '清除',
    loading: '正在查询 DNS 记录...',
    results: 'DNS 记录',
    recordType: '记录类型',
    recordName: '名称',
    recordValue: '值',
    recordTtl: 'TTL',
    noRecords: '未找到此域名的 DNS 记录。',
    invalidDomain: '请输入有效的域名。',
    error: 'DNS 查询失败，请检查域名后重试。',
    allTypes: '所有类型',
    filter: '按类型筛选',
    totalRecords: '总记录数',
    queryTime: '查询时间',
    dnsServer: 'DNS 服务器',
    samples: '试试这些',
    introTitle: '免费在线 DNS 查询工具',
    introText: '查询任何域名的 DNS 记录。此工具获取实时 DNS 数据，包括 A（IPv4）、AAAA（IPv6）、CNAME（别名）、MX（邮件服务器）、NS（名称服务器）、TXT（文本记录）和 SOA（起始授权）记录。适用于域名故障排查、邮件配置验证和 DNS 迁移检查。',
    tipTitle: '了解 DNS 记录类型',
    tip1: 'A 记录将域名映射到 IPv4 地址（如 93.184.216.34）',
    tip2: 'AAAA 记录将域名映射到 IPv6 地址',
    tip3: 'MX 记录指定邮件服务器及优先级（数值越小优先级越高）',
    tip4: 'CNAME 记录创建指向另一个域名的别名',
    tip5: 'TXT 记录存储文本数据，常用于 SPF、DKIM 和域名验证',
    faqTitle: '常见问题',
    faq1q: '什么是 DNS 查询？', faq1a: 'DNS 查询向 DNS 服务器请求将域名转换为相关记录，包括 IP 地址、邮件服务器、名称服务器等。DNS 是互联网将流量路由到正确服务器的基础。',
    faq2q: 'DNS 记录有哪些类型？', faq2a: 'A 记录映射到 IPv4 地址，AAAA 映射到 IPv6，CNAME 创建别名，MX 指定邮件服务器，NS 标识权威名称服务器，TXT 存储验证文本，SOA 包含区域授权信息。',
    faq3q: '如何检查 DNS 是否配置正确？', faq3a: '输入域名检查：A 记录指向服务器 IP，MX 记录指向邮件提供商，NS 记录显示 DNS 提供商，TXT 记录包含所需验证条目。',
    faq4q: 'DNS 记录中的 TTL 是什么？', faq4a: 'TTL（生存时间）是 DNS 记录被解析器缓存的秒数。较低的 TTL 意味着更改传播更快但增加查询负载。典型值从 300 秒到 86400 秒。',
    faq5q: '这个工具免费吗？', faq5a: '是的，完全免费。使用公共 DNS-over-HTTPS 服务执行实时查询。无需账户或 API 密钥。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Outil de Recherche DNS',
    description: 'Effectuez des recherches DNS pour trouver les enregistrements A, AAAA, CNAME, MX, NS, TXT et SOA.',
    domainLabel: 'Nom de domaine', domainPlaceholder: 'Entrez un domaine (ex: example.com)',
    lookup: 'Rechercher', clear: 'Effacer', loading: 'Recherche DNS en cours...',
    results: 'Enregistrements DNS', recordType: 'Type', recordName: 'Nom', recordValue: 'Valeur', recordTtl: 'TTL',
    noRecords: 'Aucun enregistrement DNS trouve.', invalidDomain: 'Veuillez entrer un nom de domaine valide.',
    error: 'Echec de la recherche DNS.', allTypes: 'Tous les types', filter: 'Filtrer par type',
    totalRecords: 'Total enregistrements', queryTime: 'Temps de requete', dnsServer: 'Serveur DNS', samples: 'Essayez',
    introTitle: 'Outil de recherche DNS gratuit', introText: 'Interrogez les enregistrements DNS de tout domaine. A, AAAA, CNAME, MX, NS, TXT et SOA en temps reel.',
    tipTitle: 'Types d\'enregistrements DNS', tip1: 'A: domaine vers IPv4', tip2: 'AAAA: domaine vers IPv6',
    tip3: 'MX: serveurs de messagerie', tip4: 'CNAME: alias de domaine', tip5: 'TXT: donnees texte (SPF, DKIM)',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'une recherche DNS?', faq1a: 'Une recherche DNS interroge les serveurs DNS pour traduire un nom de domaine en enregistrements associes.',
    faq2q: 'Quels sont les types d\'enregistrements?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - chacun a un role specifique dans le systeme DNS.',
    faq3q: 'Comment verifier ma configuration DNS?', faq3a: 'Entrez votre domaine et verifiez les enregistrements A, MX, NS et TXT.',
    faq4q: 'Que signifie TTL?', faq4a: 'TTL (Time To Live) est le nombre de secondes pendant lesquelles un enregistrement DNS est mis en cache.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, completement gratuit. Utilise DNS-over-HTTPS pour les requetes en temps reel.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'DNS-Lookup Tool',
    description: 'DNS-Abfragen fuer A, AAAA, CNAME, MX, NS, TXT und SOA-Eintraege.',
    domainLabel: 'Domainname', domainPlaceholder: 'Domain eingeben (z.B. example.com)',
    lookup: 'Abfragen', clear: 'Loeschen', loading: 'DNS-Eintraege werden abgefragt...',
    results: 'DNS-Eintraege', recordType: 'Typ', recordName: 'Name', recordValue: 'Wert', recordTtl: 'TTL',
    noRecords: 'Keine DNS-Eintraege gefunden.', invalidDomain: 'Bitte geben Sie einen gueltigen Domainnamen ein.',
    error: 'DNS-Abfrage fehlgeschlagen.', allTypes: 'Alle Typen', filter: 'Nach Typ filtern',
    totalRecords: 'Eintraege gesamt', queryTime: 'Abfragezeit', dnsServer: 'DNS-Server', samples: 'Beispiele',
    introTitle: 'Kostenloses DNS-Lookup Tool', introText: 'DNS-Eintraege fuer jede Domain abfragen. A, AAAA, CNAME, MX, NS, TXT und SOA in Echtzeit.',
    tipTitle: 'DNS-Eintragstypen', tip1: 'A: Domain zu IPv4', tip2: 'AAAA: Domain zu IPv6',
    tip3: 'MX: Mailserver', tip4: 'CNAME: Domain-Alias', tip5: 'TXT: Textdaten (SPF, DKIM)',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein DNS-Lookup?', faq1a: 'Ein DNS-Lookup fragt DNS-Server ab um einen Domainnamen in zugehoerige Eintraege aufzuloesen.',
    faq2q: 'Welche Eintragstypen gibt es?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - jeder hat eine bestimmte Rolle im DNS-System.',
    faq3q: 'Wie pruefe ich meine DNS-Konfiguration?', faq3a: 'Geben Sie Ihre Domain ein und ueberpruefen Sie A, MX, NS und TXT-Eintraege.',
    faq4q: 'Was bedeutet TTL?', faq4a: 'TTL (Time To Live) ist die Anzahl der Sekunden die ein DNS-Eintrag zwischengespeichert wird.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos. Verwendet DNS-over-HTTPS fuer Echtzeit-Abfragen.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Herramienta de Busqueda DNS',
    description: 'Busque registros A, AAAA, CNAME, MX, NS, TXT y SOA de cualquier dominio.',
    domainLabel: 'Nombre de dominio', domainPlaceholder: 'Ingrese dominio (ej: example.com)',
    lookup: 'Buscar', clear: 'Limpiar', loading: 'Buscando registros DNS...',
    results: 'Registros DNS', recordType: 'Tipo', recordName: 'Nombre', recordValue: 'Valor', recordTtl: 'TTL',
    noRecords: 'No se encontraron registros DNS.', invalidDomain: 'Ingrese un nombre de dominio valido.',
    error: 'Error en la busqueda DNS.', allTypes: 'Todos', filter: 'Filtrar por tipo',
    totalRecords: 'Total registros', queryTime: 'Tiempo de consulta', dnsServer: 'Servidor DNS', samples: 'Pruebe estos',
    introTitle: 'Herramienta de busqueda DNS gratuita', introText: 'Consulte registros DNS de cualquier dominio en tiempo real.',
    tipTitle: 'Tipos de registros DNS', tip1: 'A: dominio a IPv4', tip2: 'AAAA: dominio a IPv6',
    tip3: 'MX: servidores de correo', tip4: 'CNAME: alias de dominio', tip5: 'TXT: datos de texto (SPF, DKIM)',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es una busqueda DNS?', faq1a: 'Una busqueda DNS consulta servidores DNS para traducir un nombre de dominio en registros asociados.',
    faq2q: 'Cuales son los tipos de registros?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - cada uno tiene un rol especifico.',
    faq3q: 'Como verifico mi configuracion DNS?', faq3a: 'Ingrese su dominio y verifique los registros A, MX, NS y TXT.',
    faq4q: 'Que significa TTL?', faq4a: 'TTL es el numero de segundos que un registro DNS se almacena en cache.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis. Usa DNS-over-HTTPS.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'DNS ルックアップツール',
    description: '任意のドメインの A、AAAA、CNAME、MX、NS、TXT、SOA レコードを検索。',
    domainLabel: 'ドメイン名', domainPlaceholder: 'ドメインを入力 (例: example.com)',
    lookup: '検索', clear: 'クリア', loading: 'DNS レコードを検索中...',
    results: 'DNS レコード', recordType: 'タイプ', recordName: '名前', recordValue: '値', recordTtl: 'TTL',
    noRecords: 'DNS レコードが見つかりません。', invalidDomain: '有効なドメイン名を入力してください。',
    error: 'DNS 検索に失敗しました。', allTypes: 'すべて', filter: 'タイプでフィルタ',
    totalRecords: '合計レコード', queryTime: 'クエリ時間', dnsServer: 'DNS サーバー', samples: '試してみる',
    introTitle: '無料 DNS ルックアップツール', introText: '任意のドメインの DNS レコードをリアルタイムで検索します。',
    tipTitle: 'DNS レコードタイプ', tip1: 'A: ドメインを IPv4 にマッピング', tip2: 'AAAA: IPv6 にマッピング',
    tip3: 'MX: メールサーバー', tip4: 'CNAME: ドメインエイリアス', tip5: 'TXT: テキストデータ（SPF、DKIM）',
    faqTitle: 'よくある質問',
    faq1q: 'DNS ルックアップとは？', faq1a: 'DNS ルックアップは DNS サーバーに問い合わせてドメイン名を関連レコードに変換します。',
    faq2q: 'レコードタイプの種類は？', faq2a: 'A、AAAA、CNAME、MX、NS、TXT、SOA - それぞれ DNS システムで特定の役割があります。',
    faq3q: 'DNS 設定の確認方法は？', faq3a: 'ドメインを入力して A、MX、NS、TXT レコードを確認してください。',
    faq4q: 'TTL とは？', faq4a: 'TTL（生存時間）は DNS レコードがキャッシュされる秒数です。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。DNS-over-HTTPS を使用します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'DNS 조회 도구',
    description: '모든 도메인의 A, AAAA, CNAME, MX, NS, TXT, SOA 레코드를 조회합니다.',
    domainLabel: '도메인 이름', domainPlaceholder: '도메인 입력 (예: example.com)',
    lookup: '조회', clear: '지우기', loading: 'DNS 레코드 조회 중...',
    results: 'DNS 레코드', recordType: '타입', recordName: '이름', recordValue: '값', recordTtl: 'TTL',
    noRecords: 'DNS 레코드를 찾을 수 없습니다.', invalidDomain: '유효한 도메인 이름을 입력하세요.',
    error: 'DNS 조회 실패.', allTypes: '전체', filter: '타입별 필터',
    totalRecords: '총 레코드', queryTime: '쿼리 시간', dnsServer: 'DNS 서버', samples: '이것들을 시도',
    introTitle: '무료 DNS 조회 도구', introText: '모든 도메인의 DNS 레코드를 실시간으로 조회합니다.',
    tipTitle: 'DNS 레코드 타입', tip1: 'A: 도메인을 IPv4로 매핑', tip2: 'AAAA: IPv6로 매핑',
    tip3: 'MX: 메일 서버', tip4: 'CNAME: 도메인 별칭', tip5: 'TXT: 텍스트 데이터 (SPF, DKIM)',
    faqTitle: '자주 묻는 질문',
    faq1q: 'DNS 조회란?', faq1a: 'DNS 조회는 DNS 서버에 쿼리하여 도메인 이름을 관련 레코드로 변환합니다.',
    faq2q: '레코드 타입의 종류는?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - 각각 DNS 시스템에서 특정 역할이 있습니다.',
    faq3q: 'DNS 설정 확인 방법?', faq3a: '도메인을 입력하고 A, MX, NS, TXT 레코드를 확인하세요.',
    faq4q: 'TTL이란?', faq4a: 'TTL(Time To Live)은 DNS 레코드가 캐시되는 초 단위 시간입니다.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다. DNS-over-HTTPS를 사용합니다.',
    relatedTitle: '관련 도구',
  },
  it: {
    title: 'Strumento di Ricerca DNS',
    description: 'Esegui ricerche DNS per trovare record A, AAAA, CNAME, MX, NS, TXT e SOA.',
    domainLabel: 'Nome dominio', domainPlaceholder: 'Inserisci dominio (es: example.com)',
    lookup: 'Cerca', clear: 'Cancella', loading: 'Ricerca record DNS in corso...',
    results: 'Record DNS', recordType: 'Tipo', recordName: 'Nome', recordValue: 'Valore', recordTtl: 'TTL',
    noRecords: 'Nessun record DNS trovato.', invalidDomain: 'Inserisci un nome di dominio valido.',
    error: 'Ricerca DNS fallita.', allTypes: 'Tutti', filter: 'Filtra per tipo',
    totalRecords: 'Totale record', queryTime: 'Tempo di query', dnsServer: 'Server DNS', samples: 'Prova questi',
    introTitle: 'Strumento di ricerca DNS gratuito', introText: 'Interroga i record DNS di qualsiasi dominio in tempo reale.',
    tipTitle: 'Tipi di record DNS', tip1: 'A: dominio a IPv4', tip2: 'AAAA: dominio a IPv6',
    tip3: 'MX: server di posta', tip4: 'CNAME: alias di dominio', tip5: 'TXT: dati testo (SPF, DKIM)',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e una ricerca DNS?', faq1a: 'Una ricerca DNS interroga i server DNS per tradurre un nome di dominio nei record associati.',
    faq2q: 'Quali tipi di record esistono?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - ognuno ha un ruolo specifico.',
    faq3q: 'Come verifico la mia configurazione DNS?', faq3a: 'Inserisci il tuo dominio e verifica i record A, MX, NS e TXT.',
    faq4q: 'Cosa significa TTL?', faq4a: 'TTL e il numero di secondi in cui un record DNS viene memorizzato nella cache.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito. Usa DNS-over-HTTPS.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Ferramenta de Consulta DNS',
    description: 'Consulte registros A, AAAA, CNAME, MX, NS, TXT e SOA de qualquer dominio.',
    domainLabel: 'Nome do dominio', domainPlaceholder: 'Digite o dominio (ex: example.com)',
    lookup: 'Consultar', clear: 'Limpar', loading: 'Consultando registros DNS...',
    results: 'Registros DNS', recordType: 'Tipo', recordName: 'Nome', recordValue: 'Valor', recordTtl: 'TTL',
    noRecords: 'Nenhum registro DNS encontrado.', invalidDomain: 'Digite um nome de dominio valido.',
    error: 'Falha na consulta DNS.', allTypes: 'Todos', filter: 'Filtrar por tipo',
    totalRecords: 'Total de registros', queryTime: 'Tempo de consulta', dnsServer: 'Servidor DNS', samples: 'Tente estes',
    introTitle: 'Ferramenta de consulta DNS gratuita', introText: 'Consulte registros DNS de qualquer dominio em tempo real.',
    tipTitle: 'Tipos de registros DNS', tip1: 'A: dominio para IPv4', tip2: 'AAAA: dominio para IPv6',
    tip3: 'MX: servidores de email', tip4: 'CNAME: alias de dominio', tip5: 'TXT: dados de texto (SPF, DKIM)',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e uma consulta DNS?', faq1a: 'Uma consulta DNS solicita aos servidores DNS para traduzir um nome de dominio em registros associados.',
    faq2q: 'Quais tipos de registros existem?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - cada um tem um papel especifico.',
    faq3q: 'Como verificar minha configuracao DNS?', faq3a: 'Digite seu dominio e verifique os registros A, MX, NS e TXT.',
    faq4q: 'O que significa TTL?', faq4a: 'TTL e o numero de segundos que um registro DNS fica em cache.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito. Usa DNS-over-HTTPS.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'DNS Lookup Tool',
    description: 'Voer DNS-lookups uit voor A, AAAA, CNAME, MX, NS, TXT en SOA-records.',
    domainLabel: 'Domeinnaam', domainPlaceholder: 'Voer domein in (bijv. example.com)',
    lookup: 'Opzoeken', clear: 'Wis', loading: 'DNS-records opzoeken...',
    results: 'DNS-records', recordType: 'Type', recordName: 'Naam', recordValue: 'Waarde', recordTtl: 'TTL',
    noRecords: 'Geen DNS-records gevonden.', invalidDomain: 'Voer een geldig domein in.',
    error: 'DNS-lookup mislukt.', allTypes: 'Alle', filter: 'Filter op type',
    totalRecords: 'Totaal records', queryTime: 'Querytijd', dnsServer: 'DNS-server', samples: 'Probeer deze',
    introTitle: 'Gratis DNS lookup tool', introText: 'Vraag DNS-records op voor elk domein in realtime.',
    tipTitle: 'DNS-recordtypen', tip1: 'A: domein naar IPv4', tip2: 'AAAA: naar IPv6', tip3: 'MX: mailservers', tip4: 'CNAME: domein alias', tip5: 'TXT: tekstdata (SPF, DKIM)',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is een DNS-lookup?', faq1a: 'Een DNS-lookup vraagt DNS-servers om een domeinnaam te vertalen naar bijbehorende records.',
    faq2q: 'Welke recordtypen zijn er?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - elk met een specifieke rol.',
    faq3q: 'Hoe controleer ik mijn DNS?', faq3a: 'Voer uw domein in en controleer A, MX, NS en TXT records.',
    faq4q: 'Wat betekent TTL?', faq4a: 'TTL is het aantal seconden dat een DNS-record wordt gecacht.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis via DNS-over-HTTPS.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Narzedzie Wyszukiwania DNS',
    description: 'Wyszukaj rekordy A, AAAA, CNAME, MX, NS, TXT i SOA dla dowolnej domeny.',
    domainLabel: 'Nazwa domeny', domainPlaceholder: 'Wpisz domene (np. example.com)',
    lookup: 'Wyszukaj', clear: 'Wyczysc', loading: 'Wyszukiwanie rekordow DNS...',
    results: 'Rekordy DNS', recordType: 'Typ', recordName: 'Nazwa', recordValue: 'Wartosc', recordTtl: 'TTL',
    noRecords: 'Nie znaleziono rekordow DNS.', invalidDomain: 'Wpisz poprawna nazwe domeny.',
    error: 'Wyszukiwanie DNS nie powiodlo sie.', allTypes: 'Wszystkie', filter: 'Filtruj wedlug typu',
    totalRecords: 'Laczna liczba rekordow', queryTime: 'Czas zapytania', dnsServer: 'Serwer DNS', samples: 'Sprobuj tych',
    introTitle: 'Darmowe narzedzie DNS', introText: 'Wyszukuj rekordy DNS dla dowolnej domeny w czasie rzeczywistym.',
    tipTitle: 'Typy rekordow DNS', tip1: 'A: domena do IPv4', tip2: 'AAAA: do IPv6', tip3: 'MX: serwery pocztowe', tip4: 'CNAME: alias domeny', tip5: 'TXT: dane tekstowe (SPF, DKIM)',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest wyszukiwanie DNS?', faq1a: 'Wyszukiwanie DNS odpytuje serwery DNS w celu przetlumaczenia nazwy domeny na powiazane rekordy.',
    faq2q: 'Jakie sa typy rekordow?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - kazdy ma okreslona role.',
    faq3q: 'Jak sprawdzic konfiguracje DNS?', faq3a: 'Wpisz domene i sprawdz rekordy A, MX, NS i TXT.',
    faq4q: 'Co oznacza TTL?', faq4a: 'TTL to liczba sekund przez ktore rekord DNS jest buforowany.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe przez DNS-over-HTTPS.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'DNS Lookup Verktyg',
    description: 'DNS-uppslag foer A, AAAA, CNAME, MX, NS, TXT och SOA-poster.',
    domainLabel: 'Domannamn', domainPlaceholder: 'Ange doman (t.ex. example.com)',
    lookup: 'Soek', clear: 'Rensa', loading: 'Soeker DNS-poster...',
    results: 'DNS-poster', recordType: 'Typ', recordName: 'Namn', recordValue: 'Vaerde', recordTtl: 'TTL',
    noRecords: 'Inga DNS-poster hittades.', invalidDomain: 'Ange ett giltigt domannamn.',
    error: 'DNS-uppslag misslyckades.', allTypes: 'Alla', filter: 'Filtrera per typ',
    totalRecords: 'Totalt poster', queryTime: 'Fragetid', dnsServer: 'DNS-server', samples: 'Proeva dessa',
    introTitle: 'Gratis DNS-uppslag', introText: 'Fraaga DNS-poster foer vilken doman som helst i realtid.',
    tipTitle: 'DNS-posttyper', tip1: 'A: doman till IPv4', tip2: 'AAAA: till IPv6', tip3: 'MX: e-postservrar', tip4: 'CNAME: domanalias', tip5: 'TXT: textdata (SPF, DKIM)',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer DNS-uppslag?', faq1a: 'DNS-uppslag fraagar DNS-servrar foer att oeverstaetta ett domannamn till tillhoerande poster.',
    faq2q: 'Vilka posttyper finns?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - var och en med en specifik roll.',
    faq3q: 'Hur kontrollerar jag min DNS?', faq3a: 'Ange din doman och kontrollera A, MX, NS och TXT-poster.',
    faq4q: 'Vad betyder TTL?', faq4a: 'TTL aer antalet sekunder som en DNS-post cachas.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis via DNS-over-HTTPS.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'DNS Oppslag Verktoy',
    description: 'DNS-oppslag for A, AAAA, CNAME, MX, NS, TXT og SOA-poster.',
    domainLabel: 'Domenenavn', domainPlaceholder: 'Skriv inn domene (f.eks. example.com)',
    lookup: 'Soek', clear: 'Toem', loading: 'Soeker etter DNS-poster...',
    results: 'DNS-poster', recordType: 'Type', recordName: 'Navn', recordValue: 'Verdi', recordTtl: 'TTL',
    noRecords: 'Ingen DNS-poster funnet.', invalidDomain: 'Skriv inn et gyldig domenenavn.',
    error: 'DNS-oppslag mislyktes.', allTypes: 'Alle', filter: 'Filtrer etter type',
    totalRecords: 'Totalt poster', queryTime: 'Sporretid', dnsServer: 'DNS-server', samples: 'Proev disse',
    introTitle: 'Gratis DNS-oppslagsverktoy', introText: 'Spoer etter DNS-poster for et hvilket som helst domene i sanntid.',
    tipTitle: 'DNS-posttyper', tip1: 'A: domene til IPv4', tip2: 'AAAA: til IPv6', tip3: 'MX: e-postservere', tip4: 'CNAME: domenealias', tip5: 'TXT: tekstdata (SPF, DKIM)',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er DNS-oppslag?', faq1a: 'DNS-oppslag sporr DNS-servere for aa oversette et domenenavn til tilknyttede poster.',
    faq2q: 'Hvilke posttyper finnes?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - hver med en spesifikk rolle.',
    faq3q: 'Hvordan sjekke min DNS?', faq3a: 'Skriv inn ditt domene og sjekk A, MX, NS og TXT-poster.',
    faq4q: 'Hva betyr TTL?', faq4a: 'TTL er antall sekunder en DNS-post caches.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis via DNS-over-HTTPS.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Alat Pencarian DNS',
    description: 'Cari record A, AAAA, CNAME, MX, NS, TXT, dan SOA untuk domain apa pun.',
    domainLabel: 'Nama domain', domainPlaceholder: 'Masukkan domain (mis: example.com)',
    lookup: 'Cari', clear: 'Hapus', loading: 'Mencari record DNS...',
    results: 'Record DNS', recordType: 'Tipe', recordName: 'Nama', recordValue: 'Nilai', recordTtl: 'TTL',
    noRecords: 'Tidak ada record DNS ditemukan.', invalidDomain: 'Masukkan nama domain yang valid.',
    error: 'Pencarian DNS gagal.', allTypes: 'Semua', filter: 'Filter berdasarkan tipe',
    totalRecords: 'Total record', queryTime: 'Waktu query', dnsServer: 'Server DNS', samples: 'Coba ini',
    introTitle: 'Alat pencarian DNS gratis', introText: 'Cari record DNS untuk domain apa pun secara real-time.',
    tipTitle: 'Tipe record DNS', tip1: 'A: domain ke IPv4', tip2: 'AAAA: ke IPv6', tip3: 'MX: server email', tip4: 'CNAME: alias domain', tip5: 'TXT: data teks (SPF, DKIM)',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu pencarian DNS?', faq1a: 'Pencarian DNS meminta server DNS untuk menerjemahkan nama domain menjadi record terkait.',
    faq2q: 'Apa saja tipe record?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - masing-masing memiliki peran spesifik.',
    faq3q: 'Bagaimana memeriksa konfigurasi DNS?', faq3a: 'Masukkan domain Anda dan periksa record A, MX, NS, dan TXT.',
    faq4q: 'Apa arti TTL?', faq4a: 'TTL adalah jumlah detik record DNS disimpan dalam cache.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis melalui DNS-over-HTTPS.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือค้นหา DNS',
    description: 'ค้นหา record A, AAAA, CNAME, MX, NS, TXT และ SOA สำหรับโดเมนใดก็ได้',
    domainLabel: 'ชื่อโดเมน', domainPlaceholder: 'ป้อนโดเมน (เช่น example.com)',
    lookup: 'ค้นหา', clear: 'ล้าง', loading: 'กำลังค้นหา DNS record...',
    results: 'DNS Records', recordType: 'ประเภท', recordName: 'ชื่อ', recordValue: 'ค่า', recordTtl: 'TTL',
    noRecords: 'ไม่พบ DNS record', invalidDomain: 'กรุณาป้อนชื่อโดเมนที่ถูกต้อง',
    error: 'การค้นหา DNS ล้มเหลว', allTypes: 'ทั้งหมด', filter: 'กรองตามประเภท',
    totalRecords: 'จำนวน record ทั้งหมด', queryTime: 'เวลาค้นหา', dnsServer: 'DNS Server', samples: 'ลองเหล่านี้',
    introTitle: 'เครื่องมือค้นหา DNS ฟรี', introText: 'ค้นหา DNS record สำหรับโดเมนใดก็ได้แบบเรียลไทม์',
    tipTitle: 'ประเภท DNS Record', tip1: 'A: โดเมนไปยัง IPv4', tip2: 'AAAA: ไปยัง IPv6', tip3: 'MX: เซิร์ฟเวอร์อีเมล', tip4: 'CNAME: ชื่อแทนโดเมน', tip5: 'TXT: ข้อมูลข้อความ (SPF, DKIM)',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การค้นหา DNS คืออะไร?', faq1a: 'การค้นหา DNS สอบถาม DNS Server เพื่อแปลชื่อโดเมนเป็น record ที่เกี่ยวข้อง',
    faq2q: 'มีประเภท record อะไรบ้าง?', faq2a: 'A, AAAA, CNAME, MX, NS, TXT, SOA - แต่ละอันมีบทบาทเฉพาะ',
    faq3q: 'ตรวจสอบ DNS ของฉันอย่างไร?', faq3a: 'ป้อนโดเมนและตรวจสอบ record A, MX, NS และ TXT',
    faq4q: 'TTL หมายถึงอะไร?', faq4a: 'TTL คือจำนวนวินาทีที่ DNS record ถูกแคช',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมดผ่าน DNS-over-HTTPS',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface DnsRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA'];
const SAMPLE_DOMAINS = ['google.com', 'github.com', 'cloudflare.com', 'example.com'];
const DOMAIN_REGEX = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

const TYPE_COLORS: Record<string, string> = {
  A: '#3b82f6', AAAA: '#8b5cf6', CNAME: '#f59e0b', MX: '#ef4444', NS: '#22c55e', TXT: '#06b6d4', SOA: '#6b7280',
};

export default function DnsLookupTool() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [domain, setDomain] = useState('');
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [queryTime, setQueryTime] = useState(0);

  const lookupDns = useCallback(async (d?: string) => {
    const target = (d || domain).trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!target) return;
    if (!DOMAIN_REGEX.test(target)) { setError(t.invalidDomain); return; }

    setLoading(true);
    setError('');
    setRecords([]);
    const startTime = Date.now();
    const allRecords: DnsRecord[] = [];

    try {
      const fetches = RECORD_TYPES.map(async (type) => {
        try {
          const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(target)}&type=${type}`, {
            headers: { Accept: 'application/dns-json' },
          });
          if (!res.ok) return;
          const data = await res.json();
          if (data.Answer) {
            for (const ans of data.Answer) {
              const rType = typeNumberToString(ans.type);
              allRecords.push({
                type: rType,
                name: ans.name?.replace(/\.$/, '') || target,
                value: ans.data || '',
                ttl: ans.TTL || 0,
              });
            }
          }
        } catch { /* individual type fail is ok */ }
      });

      await Promise.all(fetches);
      setQueryTime(Date.now() - startTime);
      setRecords(allRecords);
      if (allRecords.length === 0) setError(t.noRecords);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }, [domain, t]);

  const typeNumberToString = (num: number): string => {
    const map: Record<number, string> = { 1: 'A', 28: 'AAAA', 5: 'CNAME', 15: 'MX', 2: 'NS', 16: 'TXT', 6: 'SOA' };
    return map[num] || `TYPE${num}`;
  };

  const filteredRecords = filter ? records.filter(r => r.type === filter) : records;
  const uniqueTypes = [...new Set(records.map(r => r.type))];
  const resultText = filteredRecords.map(r => `${r.type}\t${r.name}\t${r.value}\t${r.ttl}`).join('\n');

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

  return (
    <ToolLayout title={t.title} description={t.description} toolId="dns-lookup-tool">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          placeholder={t.domainPlaceholder}
          onKeyDown={e => e.key === 'Enter' && lookupDns()}
          style={{ flex: 1, minWidth: 240, padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
        />
        <button onClick={() => lookupDns()} className="btn btn-primary" disabled={loading}>{t.lookup}</button>
        <button onClick={() => { setDomain(''); setRecords([]); setError(''); setFilter(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Sample domains */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.samples}:</span>
        {SAMPLE_DOMAINS.map(d => (
          <button key={d} onClick={() => { setDomain(d); lookupDns(d); }}
            style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--accent-blue)', fontFamily: 'monospace' }}>
            {d}
          </button>
        ))}
      </div>

      {loading && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid var(--accent-blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        {t.loading}
        <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
      </div>}
      {error && !loading && <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 16 }}>{error}</div>}

      {/* Results */}
      {records.length > 0 && (
        <>
          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              <strong>{t.totalRecords}:</strong> {records.length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              <strong>{t.queryTime}:</strong> {queryTime}ms
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              <strong>{t.dnsServer}:</strong> dns.google (8.8.8.8)
            </div>
          </div>

          {/* Type filter */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('')}
              style={{
                padding: '4px 12px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                border: !filter ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: !filter ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)',
                color: 'var(--text-primary)', fontWeight: !filter ? 600 : 400,
              }}>
              {t.allTypes} ({records.length})
            </button>
            {uniqueTypes.map(type => {
              const count = records.filter(r => r.type === type).length;
              return (
                <button key={type} onClick={() => setFilter(type)}
                  style={{
                    padding: '4px 12px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                    border: filter === type ? `2px solid ${TYPE_COLORS[type] || '#6b7280'}` : '1px solid var(--border-color)',
                    background: filter === type ? `${TYPE_COLORS[type] || '#6b7280'}22` : 'var(--bg-input)',
                    color: TYPE_COLORS[type] || 'var(--text-primary)', fontWeight: filter === type ? 700 : 400,
                  }}>
                  {type} ({count})
                </button>
              );
            })}
          </div>

          {/* Records table */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.results}</label>
            <CopyButton text={resultText} />
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, width: 80 }}>{t.recordType}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, width: 180 }}>{t.recordName}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{t.recordValue}</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, width: 80 }}>{t.recordTtl}</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
                        background: TYPE_COLORS[r.type] || '#6b7280', color: '#fff',
                      }}>{r.type}</span>
                    </td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>{r.name}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{r.value}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, textAlign: 'right', color: 'var(--text-secondary)' }}>{r.ttl}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a },
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
            { href: `/${lang}/tools/ip-address-lookup`, label: 'IP Address Lookup' },
            { href: `/${lang}/tools/ip-calculator`, label: 'IP Calculator' },
            { href: `/${lang}/tools/http-header-analyzer`, label: 'HTTP Header Analyzer' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
          ].map(link => (
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
