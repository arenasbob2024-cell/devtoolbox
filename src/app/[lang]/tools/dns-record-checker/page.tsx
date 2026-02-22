'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'DNS Record Checker',
    description: 'Look up DNS records (A, AAAA, CNAME, MX, TXT, NS) for any domain. Free, fast, and private DNS lookup tool.',
    domainLabel: 'Domain Name',
    domainPlaceholder: 'example.com',
    recordType: 'Record Type',
    lookup: 'Lookup DNS',
    clear: 'Clear',
    resultsLabel: 'DNS Records',
    copyLabel: 'Copy Results',
    introTitle: 'Free Online DNS Record Checker',
    introText: 'Enter a domain name and select a DNS record type to look up its DNS records instantly. This tool uses public DNS-over-HTTPS resolvers to fetch A, AAAA, CNAME, MX, TXT, and NS records directly from your browser.',
    howTitle: 'How to Check DNS Records',
    step1: 'Enter the domain name you want to look up (e.g., example.com)',
    step2: 'Select the DNS record type (A, AAAA, CNAME, MX, TXT, or NS)',
    step3: 'Click "Lookup DNS" to fetch the records',
    step4: 'View and copy the results',
    featuresTitle: 'Features',
    feature1: 'Supports A, AAAA, CNAME, MX, TXT, and NS record types',
    feature2: 'Uses DNS-over-HTTPS for privacy and reliability',
    feature3: 'Results include TTL (Time to Live) values',
    feature4: 'No server-side processing required',
    feature5: 'Works with any public domain name',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are DNS records?',
    faq1a: 'DNS records are instructions stored in DNS servers that map domain names to IP addresses and other data. Common types include A records (IPv4 addresses), AAAA records (IPv6), MX records (mail servers), and TXT records (verification data).',
    faq2q: 'What is the difference between A and AAAA records?',
    faq2a: 'A records map a domain to an IPv4 address (e.g., 93.184.216.34), while AAAA records map a domain to an IPv6 address (e.g., 2606:2800:220:1:248:1893:25c8:1946). Both serve the same purpose but for different IP versions.',
    faq3q: 'What are MX records used for?',
    faq3a: 'MX (Mail Exchange) records specify which mail servers handle email for a domain. They include a priority value, where lower numbers indicate higher priority servers.',
    faq4q: 'Is this DNS lookup private?',
    faq4a: 'Yes. The lookup is performed using DNS-over-HTTPS to public resolvers directly from your browser. Your queries are encrypted in transit and no data is stored on our servers.',
    faq5q: 'Why might DNS records not be found?',
    faq5a: 'Some domains may not have all record types configured. For example, a domain without email service may not have MX records. Also, recently changed records may take time to propagate.',
    relatedTitle: 'Related Tools',
    errorEmpty: 'Please enter a domain name.',
    errorFetch: 'Failed to fetch DNS records. Please check the domain and try again.',
    loading: 'Looking up DNS records...',
    noRecords: 'No records found for this query.',
    ttl: 'TTL',
    type: 'Type',
    value: 'Value',
    priority: 'Priority',
  },
  zh: {
    title: 'DNS 记录查询工具',
    description: '查询任意域名的 DNS 记录（A、AAAA、CNAME、MX、TXT、NS）。免费、快速、私密的 DNS 查询工具。',
    domainLabel: '域名',
    domainPlaceholder: 'example.com',
    recordType: '记录类型',
    lookup: '查询 DNS',
    clear: '清除',
    resultsLabel: 'DNS 记录',
    copyLabel: '复制结果',
    introTitle: '免费在线 DNS 记录查询工具',
    introText: '输入域名并选择 DNS 记录类型，即可即时查询 DNS 记录。本工具使用公共 DNS-over-HTTPS 解析器直接在浏览器中获取 A、AAAA、CNAME、MX、TXT 和 NS 记录。',
    howTitle: '如何查询 DNS 记录',
    step1: '输入要查询的域名（例如 example.com）',
    step2: '选择 DNS 记录类型（A、AAAA、CNAME、MX、TXT 或 NS）',
    step3: '点击"查询 DNS"获取记录',
    step4: '查看并复制结果',
    featuresTitle: '功能特性',
    feature1: '支持 A、AAAA、CNAME、MX、TXT 和 NS 记录类型',
    feature2: '使用 DNS-over-HTTPS 确保隐私和可靠性',
    feature3: '结果包含 TTL（生存时间）值',
    feature4: '无需服务器端处理',
    feature5: '适用于任何公共域名',
    faqTitle: '常见问题',
    faq1q: '什么是 DNS 记录？',
    faq1a: 'DNS 记录是存储在 DNS 服务器中的指令，用于将域名映射到 IP 地址和其他数据。常见类型包括 A 记录（IPv4 地址）、AAAA 记录（IPv6）、MX 记录（邮件服务器）和 TXT 记录（验证数据）。',
    faq2q: 'A 记录和 AAAA 记录有什么区别？',
    faq2a: 'A 记录将域名映射到 IPv4 地址，而 AAAA 记录将域名映射到 IPv6 地址。两者目的相同，但用于不同的 IP 版本。',
    faq3q: 'MX 记录用于什么？',
    faq3a: 'MX（邮件交换）记录指定哪些邮件服务器处理域名的电子邮件。它们包含优先级值，数字越小优先级越高。',
    faq4q: '此 DNS 查询是否私密？',
    faq4a: '是的。查询通过 DNS-over-HTTPS 直接从浏览器向公共解析器发起。查询在传输中加密，我们的服务器不存储任何数据。',
    faq5q: '为什么可能找不到 DNS 记录？',
    faq5a: '某些域名可能未配置所有记录类型。例如，没有电子邮件服务的域名可能没有 MX 记录。此外，最近更改的记录可能需要时间传播。',
    relatedTitle: '相关工具',
    errorEmpty: '请输入域名。',
    errorFetch: '获取 DNS 记录失败。请检查域名并重试。',
    loading: '正在查询 DNS 记录...',
    noRecords: '未找到此查询的记录。',
    ttl: 'TTL',
    type: '类型',
    value: '值',
    priority: '优先级',
  },
  ja: {
    title: 'DNS レコードチェッカー',
    description: '任意のドメインのDNSレコード（A、AAAA、CNAME、MX、TXT、NS）を検索。無料で高速なDNSルックアップツール。',
    domainLabel: 'ドメイン名',
    domainPlaceholder: 'example.com',
    recordType: 'レコードタイプ',
    lookup: 'DNS検索',
    clear: 'クリア',
    resultsLabel: 'DNSレコード',
    copyLabel: '結果をコピー',
    introTitle: '無料オンラインDNSレコードチェッカー',
    introText: 'ドメイン名を入力してDNSレコードタイプを選択すると、即座にDNSレコードを検索できます。このツールはDNS-over-HTTPSパブリックリゾルバを使用してブラウザから直接取得します。',
    howTitle: 'DNSレコードの確認方法',
    step1: '検索したいドメイン名を入力（例：example.com）',
    step2: 'DNSレコードタイプを選択（A、AAAA、CNAME、MX、TXT、NS）',
    step3: '「DNS検索」をクリックしてレコードを取得',
    step4: '結果を確認してコピー',
    featuresTitle: '機能',
    feature1: 'A、AAAA、CNAME、MX、TXT、NSレコードタイプに対応',
    feature2: 'DNS-over-HTTPSでプライバシーと信頼性を確保',
    feature3: 'TTL（生存時間）値を含む結果を表示',
    feature4: 'サーバー側の処理は不要',
    feature5: 'あらゆるパブリックドメインで動作',
    faqTitle: 'よくある質問',
    faq1q: 'DNSレコードとは何ですか？',
    faq1a: 'DNSレコードはDNSサーバーに保存される指示で、ドメイン名をIPアドレスなどのデータにマッピングします。一般的なタイプにはAレコード、AAAAレコード、MXレコード、TXTレコードがあります。',
    faq2q: 'AレコードとAAAAレコードの違いは？',
    faq2a: 'AレコードはドメインをIPv4アドレスにマッピングし、AAAAレコードはIPv6アドレスにマッピングします。',
    faq3q: 'MXレコードは何に使われますか？',
    faq3a: 'MX（メール交換）レコードは、ドメインのメールを処理するメールサーバーを指定します。優先度の値が含まれ、数値が小さいほど優先度が高くなります。',
    faq4q: 'このDNS検索はプライベートですか？',
    faq4a: 'はい。検索はDNS-over-HTTPSを使用してブラウザから直接パブリックリゾルバに行われます。',
    faq5q: 'DNSレコードが見つからない理由は？',
    faq5a: '一部のドメインではすべてのレコードタイプが設定されていない場合があります。また、最近変更されたレコードは伝播に時間がかかる場合があります。',
    relatedTitle: '関連ツール',
    errorEmpty: 'ドメイン名を入力してください。',
    errorFetch: 'DNSレコードの取得に失敗しました。ドメインを確認して再試行してください。',
    loading: 'DNSレコードを検索中...',
    noRecords: 'この検索のレコードは見つかりませんでした。',
    ttl: 'TTL',
    type: 'タイプ',
    value: '値',
    priority: '優先度',
  },
  ko: {
    title: 'DNS 레코드 검사기',
    description: '모든 도메인의 DNS 레코드(A, AAAA, CNAME, MX, TXT, NS)를 조회합니다. 무료, 빠르고 안전한 DNS 조회 도구.',
    domainLabel: '도메인 이름',
    domainPlaceholder: 'example.com',
    recordType: '레코드 유형',
    lookup: 'DNS 조회',
    clear: '지우기',
    resultsLabel: 'DNS 레코드',
    copyLabel: '결과 복사',
    introTitle: '무료 온라인 DNS 레코드 검사기',
    introText: '도메인 이름을 입력하고 DNS 레코드 유형을 선택하여 즉시 DNS 레코드를 조회할 수 있습니다. 이 도구는 DNS-over-HTTPS 공용 리졸버를 사용하여 브라우저에서 직접 가져옵니다.',
    howTitle: 'DNS 레코드 확인 방법',
    step1: '조회할 도메인 이름 입력(예: example.com)',
    step2: 'DNS 레코드 유형 선택(A, AAAA, CNAME, MX, TXT, NS)',
    step3: '"DNS 조회"를 클릭하여 레코드 가져오기',
    step4: '결과 확인 및 복사',
    featuresTitle: '기능',
    feature1: 'A, AAAA, CNAME, MX, TXT, NS 레코드 유형 지원',
    feature2: 'DNS-over-HTTPS로 개인 정보 보호 및 신뢰성 보장',
    feature3: 'TTL(수명) 값이 포함된 결과',
    feature4: '서버 측 처리 불필요',
    feature5: '모든 공용 도메인에서 작동',
    faqTitle: '자주 묻는 질문',
    faq1q: 'DNS 레코드란 무엇인가요?',
    faq1a: 'DNS 레코드는 DNS 서버에 저장된 명령으로, 도메인 이름을 IP 주소 및 기타 데이터에 매핑합니다.',
    faq2q: 'A 레코드와 AAAA 레코드의 차이점은?',
    faq2a: 'A 레코드는 도메인을 IPv4 주소에 매핑하고, AAAA 레코드는 IPv6 주소에 매핑합니다.',
    faq3q: 'MX 레코드는 무엇에 사용되나요?',
    faq3a: 'MX(메일 교환) 레코드는 도메인의 이메일을 처리하는 메일 서버를 지정합니다.',
    faq4q: '이 DNS 조회는 비공개인가요?',
    faq4a: '네. DNS-over-HTTPS를 사용하여 브라우저에서 직접 공용 리졸버에 조회합니다.',
    faq5q: 'DNS 레코드를 찾을 수 없는 이유는?',
    faq5a: '일부 도메인은 모든 레코드 유형이 구성되지 않을 수 있습니다. 최근 변경된 레코드는 전파에 시간이 걸릴 수 있습니다.',
    relatedTitle: '관련 도구',
    errorEmpty: '도메인 이름을 입력하세요.',
    errorFetch: 'DNS 레코드를 가져오지 못했습니다. 도메인을 확인하고 다시 시도하세요.',
    loading: 'DNS 레코드 조회 중...',
    noRecords: '이 쿼리에 대한 레코드를 찾을 수 없습니다.',
    ttl: 'TTL',
    type: '유형',
    value: '값',
    priority: '우선순위',
  },
  fr: {
    title: 'Verificateur d\'enregistrements DNS',
    description: 'Recherchez les enregistrements DNS (A, AAAA, CNAME, MX, TXT, NS) pour tout domaine. Outil de recherche DNS gratuit et rapide.',
    domainLabel: 'Nom de domaine',
    domainPlaceholder: 'example.com',
    recordType: 'Type d\'enregistrement',
    lookup: 'Rechercher DNS',
    clear: 'Effacer',
    resultsLabel: 'Enregistrements DNS',
    copyLabel: 'Copier les resultats',
    introTitle: 'Verificateur d\'enregistrements DNS en ligne gratuit',
    introText: 'Entrez un nom de domaine et selectionnez un type d\'enregistrement DNS pour rechercher ses enregistrements instantanement. Cet outil utilise des resolveurs DNS-over-HTTPS publics.',
    howTitle: 'Comment verifier les enregistrements DNS',
    step1: 'Entrez le nom de domaine a rechercher',
    step2: 'Selectionnez le type d\'enregistrement DNS',
    step3: 'Cliquez sur "Rechercher DNS" pour obtenir les enregistrements',
    step4: 'Consultez et copiez les resultats',
    featuresTitle: 'Fonctionnalites',
    feature1: 'Prend en charge les types A, AAAA, CNAME, MX, TXT et NS',
    feature2: 'Utilise DNS-over-HTTPS pour la confidentialite',
    feature3: 'Les resultats incluent les valeurs TTL',
    feature4: 'Aucun traitement cote serveur necessaire',
    feature5: 'Fonctionne avec tout nom de domaine public',
    faqTitle: 'Questions frequentes',
    faq1q: 'Que sont les enregistrements DNS ?',
    faq1a: 'Les enregistrements DNS sont des instructions stockees dans les serveurs DNS qui mappent les noms de domaine aux adresses IP et autres donnees.',
    faq2q: 'Quelle est la difference entre A et AAAA ?',
    faq2a: 'Les enregistrements A mappent un domaine a une adresse IPv4, tandis que les AAAA le mappent a une adresse IPv6.',
    faq3q: 'A quoi servent les enregistrements MX ?',
    faq3a: 'Les enregistrements MX specifient les serveurs de messagerie qui gerent le courrier electronique pour un domaine.',
    faq4q: 'Cette recherche DNS est-elle privee ?',
    faq4a: 'Oui. La recherche est effectuee via DNS-over-HTTPS directement depuis votre navigateur.',
    faq5q: 'Pourquoi les enregistrements DNS ne sont-ils pas trouves ?',
    faq5a: 'Certains domaines peuvent ne pas avoir tous les types d\'enregistrement configures. Les enregistrements recemment modifies peuvent prendre du temps a se propager.',
    relatedTitle: 'Outils connexes',
    errorEmpty: 'Veuillez entrer un nom de domaine.',
    errorFetch: 'Impossible de recuperer les enregistrements DNS.',
    loading: 'Recherche des enregistrements DNS...',
    noRecords: 'Aucun enregistrement trouve.',
    ttl: 'TTL',
    type: 'Type',
    value: 'Valeur',
    priority: 'Priorite',
  },
  de: {
    title: 'DNS-Eintrag Pruefer',
    description: 'DNS-Eintraege (A, AAAA, CNAME, MX, TXT, NS) fuer jede Domain nachschlagen. Kostenloses und schnelles DNS-Lookup-Tool.',
    domainLabel: 'Domainname',
    domainPlaceholder: 'example.com',
    recordType: 'Eintragstyp',
    lookup: 'DNS nachschlagen',
    clear: 'Leeren',
    resultsLabel: 'DNS-Eintraege',
    copyLabel: 'Ergebnisse kopieren',
    introTitle: 'Kostenloser Online DNS-Eintrag Pruefer',
    introText: 'Geben Sie einen Domainnamen ein und waehlen Sie einen DNS-Eintragstyp, um die Eintraege sofort nachzuschlagen. Dieses Tool verwendet oeffentliche DNS-over-HTTPS-Resolver.',
    howTitle: 'So pruefen Sie DNS-Eintraege',
    step1: 'Geben Sie den Domainnamen ein',
    step2: 'Waehlen Sie den DNS-Eintragstyp',
    step3: 'Klicken Sie auf "DNS nachschlagen"',
    step4: 'Ergebnisse anzeigen und kopieren',
    featuresTitle: 'Funktionen',
    feature1: 'Unterstuetzt A, AAAA, CNAME, MX, TXT und NS',
    feature2: 'Verwendet DNS-over-HTTPS fuer Datenschutz',
    feature3: 'Ergebnisse enthalten TTL-Werte',
    feature4: 'Keine serverseitige Verarbeitung erforderlich',
    feature5: 'Funktioniert mit jedem oeffentlichen Domainnamen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was sind DNS-Eintraege?',
    faq1a: 'DNS-Eintraege sind Anweisungen in DNS-Servern, die Domainnamen auf IP-Adressen und andere Daten abbilden.',
    faq2q: 'Was ist der Unterschied zwischen A und AAAA?',
    faq2a: 'A-Eintraege bilden eine Domain auf eine IPv4-Adresse ab, AAAA auf eine IPv6-Adresse.',
    faq3q: 'Wofuer werden MX-Eintraege verwendet?',
    faq3a: 'MX-Eintraege geben an, welche Mailserver E-Mails fuer eine Domain verarbeiten.',
    faq4q: 'Ist diese DNS-Abfrage privat?',
    faq4a: 'Ja. Die Abfrage erfolgt ueber DNS-over-HTTPS direkt aus Ihrem Browser.',
    faq5q: 'Warum werden DNS-Eintraege nicht gefunden?',
    faq5a: 'Einige Domains haben moeglicherweise nicht alle Eintragstypen konfiguriert.',
    relatedTitle: 'Verwandte Tools',
    errorEmpty: 'Bitte Domainnamen eingeben.',
    errorFetch: 'DNS-Eintraege konnten nicht abgerufen werden.',
    loading: 'DNS-Eintraege werden nachgeschlagen...',
    noRecords: 'Keine Eintraege gefunden.',
    ttl: 'TTL',
    type: 'Typ',
    value: 'Wert',
    priority: 'Prioritaet',
  },
  es: {
    title: 'Verificador de registros DNS',
    description: 'Busque registros DNS (A, AAAA, CNAME, MX, TXT, NS) para cualquier dominio. Herramienta de consulta DNS gratuita y rapida.',
    domainLabel: 'Nombre de dominio',
    domainPlaceholder: 'example.com',
    recordType: 'Tipo de registro',
    lookup: 'Buscar DNS',
    clear: 'Limpiar',
    resultsLabel: 'Registros DNS',
    copyLabel: 'Copiar resultados',
    introTitle: 'Verificador de registros DNS en linea gratuito',
    introText: 'Ingrese un nombre de dominio y seleccione un tipo de registro DNS para buscar sus registros al instante.',
    howTitle: 'Como verificar registros DNS',
    step1: 'Ingrese el nombre de dominio',
    step2: 'Seleccione el tipo de registro DNS',
    step3: 'Haga clic en "Buscar DNS"',
    step4: 'Vea y copie los resultados',
    featuresTitle: 'Caracteristicas',
    feature1: 'Soporta tipos A, AAAA, CNAME, MX, TXT y NS',
    feature2: 'Usa DNS-over-HTTPS para privacidad',
    feature3: 'Los resultados incluyen valores TTL',
    feature4: 'Sin procesamiento del lado del servidor',
    feature5: 'Funciona con cualquier dominio publico',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que son los registros DNS?',
    faq1a: 'Los registros DNS son instrucciones almacenadas en servidores DNS que mapean nombres de dominio a direcciones IP y otros datos.',
    faq2q: 'Cual es la diferencia entre A y AAAA?',
    faq2a: 'Los registros A mapean un dominio a una direccion IPv4, mientras que AAAA lo mapea a IPv6.',
    faq3q: 'Para que se usan los registros MX?',
    faq3a: 'Los registros MX especifican los servidores de correo que manejan el email de un dominio.',
    faq4q: 'Es privada esta consulta DNS?',
    faq4a: 'Si. La consulta se realiza via DNS-over-HTTPS directamente desde tu navegador.',
    faq5q: 'Por que no se encuentran registros DNS?',
    faq5a: 'Algunos dominios pueden no tener todos los tipos de registro configurados.',
    relatedTitle: 'Herramientas relacionadas',
    errorEmpty: 'Por favor ingrese un nombre de dominio.',
    errorFetch: 'No se pudieron obtener los registros DNS.',
    loading: 'Buscando registros DNS...',
    noRecords: 'No se encontraron registros.',
    ttl: 'TTL',
    type: 'Tipo',
    value: 'Valor',
    priority: 'Prioridad',
  },
  pt: {
    title: 'Verificador de Registros DNS',
    description: 'Consulte registros DNS (A, AAAA, CNAME, MX, TXT, NS) para qualquer dominio. Ferramenta de consulta DNS gratuita e rapida.',
    domainLabel: 'Nome do dominio',
    domainPlaceholder: 'example.com',
    recordType: 'Tipo de registro',
    lookup: 'Consultar DNS',
    clear: 'Limpar',
    resultsLabel: 'Registros DNS',
    copyLabel: 'Copiar resultados',
    introTitle: 'Verificador de Registros DNS Online Gratuito',
    introText: 'Digite um nome de dominio e selecione um tipo de registro DNS para consultar seus registros instantaneamente.',
    howTitle: 'Como verificar registros DNS',
    step1: 'Digite o nome do dominio',
    step2: 'Selecione o tipo de registro DNS',
    step3: 'Clique em "Consultar DNS"',
    step4: 'Visualize e copie os resultados',
    featuresTitle: 'Recursos',
    feature1: 'Suporta tipos A, AAAA, CNAME, MX, TXT e NS',
    feature2: 'Usa DNS-over-HTTPS para privacidade',
    feature3: 'Resultados incluem valores TTL',
    feature4: 'Sem processamento do lado do servidor',
    feature5: 'Funciona com qualquer dominio publico',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que sao registros DNS?',
    faq1a: 'Registros DNS sao instrucoes armazenadas em servidores DNS que mapeiam nomes de dominio para enderecos IP e outros dados.',
    faq2q: 'Qual a diferenca entre A e AAAA?',
    faq2a: 'Registros A mapeiam um dominio para um endereco IPv4, enquanto AAAA mapeia para IPv6.',
    faq3q: 'Para que servem os registros MX?',
    faq3a: 'Registros MX especificam quais servidores de email processam o correio de um dominio.',
    faq4q: 'Esta consulta DNS e privada?',
    faq4a: 'Sim. A consulta e feita via DNS-over-HTTPS diretamente do seu navegador.',
    faq5q: 'Por que os registros DNS nao sao encontrados?',
    faq5a: 'Alguns dominios podem nao ter todos os tipos de registro configurados.',
    relatedTitle: 'Ferramentas relacionadas',
    errorEmpty: 'Por favor insira um nome de dominio.',
    errorFetch: 'Falha ao obter registros DNS.',
    loading: 'Consultando registros DNS...',
    noRecords: 'Nenhum registro encontrado.',
    ttl: 'TTL',
    type: 'Tipo',
    value: 'Valor',
    priority: 'Prioridade',
  },
  it: {
    title: 'Verificatore Record DNS',
    description: 'Cerca record DNS (A, AAAA, CNAME, MX, TXT, NS) per qualsiasi dominio. Strumento di ricerca DNS gratuito e veloce.',
    domainLabel: 'Nome dominio',
    domainPlaceholder: 'example.com',
    recordType: 'Tipo di record',
    lookup: 'Cerca DNS',
    clear: 'Cancella',
    resultsLabel: 'Record DNS',
    copyLabel: 'Copia risultati',
    introTitle: 'Verificatore Record DNS Online Gratuito',
    introText: 'Inserisci un nome di dominio e seleziona un tipo di record DNS per cercarne i record istantaneamente.',
    howTitle: 'Come verificare i record DNS',
    step1: 'Inserisci il nome del dominio',
    step2: 'Seleziona il tipo di record DNS',
    step3: 'Clicca su "Cerca DNS"',
    step4: 'Visualizza e copia i risultati',
    featuresTitle: 'Funzionalita',
    feature1: 'Supporta tipi A, AAAA, CNAME, MX, TXT e NS',
    feature2: 'Usa DNS-over-HTTPS per la privacy',
    feature3: 'I risultati includono valori TTL',
    feature4: 'Nessun processing lato server',
    feature5: 'Funziona con qualsiasi dominio pubblico',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cosa sono i record DNS?',
    faq1a: 'I record DNS sono istruzioni archiviate nei server DNS che mappano i nomi di dominio agli indirizzi IP.',
    faq2q: 'Qual e la differenza tra A e AAAA?',
    faq2a: 'I record A mappano un dominio a un indirizzo IPv4, mentre AAAA lo mappa a IPv6.',
    faq3q: 'A cosa servono i record MX?',
    faq3a: 'I record MX specificano quali server di posta gestiscono le email per un dominio.',
    faq4q: 'Questa ricerca DNS e privata?',
    faq4a: 'Si. La ricerca viene effettuata tramite DNS-over-HTTPS direttamente dal browser.',
    faq5q: 'Perche i record DNS non vengono trovati?',
    faq5a: 'Alcuni domini potrebbero non avere tutti i tipi di record configurati.',
    relatedTitle: 'Strumenti correlati',
    errorEmpty: 'Inserisci un nome di dominio.',
    errorFetch: 'Impossibile recuperare i record DNS.',
    loading: 'Ricerca record DNS in corso...',
    noRecords: 'Nessun record trovato.',
    ttl: 'TTL',
    type: 'Tipo',
    value: 'Valore',
    priority: 'Priorita',
  },
  nl: {
    title: 'DNS Record Checker',
    description: 'Zoek DNS-records (A, AAAA, CNAME, MX, TXT, NS) op voor elk domein. Gratis en snelle DNS-lookup tool.',
    domainLabel: 'Domeinnaam',
    domainPlaceholder: 'example.com',
    recordType: 'Recordtype',
    lookup: 'DNS opzoeken',
    clear: 'Wissen',
    resultsLabel: 'DNS Records',
    copyLabel: 'Resultaten kopieren',
    introTitle: 'Gratis Online DNS Record Checker',
    introText: 'Voer een domeinnaam in en selecteer een DNS-recordtype om de records direct op te zoeken.',
    howTitle: 'Hoe DNS-records te controleren',
    step1: 'Voer de domeinnaam in',
    step2: 'Selecteer het DNS-recordtype',
    step3: 'Klik op "DNS opzoeken"',
    step4: 'Bekijk en kopieer de resultaten',
    featuresTitle: 'Functies',
    feature1: 'Ondersteunt A, AAAA, CNAME, MX, TXT en NS types',
    feature2: 'Gebruikt DNS-over-HTTPS voor privacy',
    feature3: 'Resultaten bevatten TTL-waarden',
    feature4: 'Geen server-side verwerking nodig',
    feature5: 'Werkt met elke publieke domeinnaam',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat zijn DNS-records?',
    faq1a: 'DNS-records zijn instructies in DNS-servers die domeinnamen koppelen aan IP-adressen.',
    faq2q: 'Wat is het verschil tussen A en AAAA?',
    faq2a: 'A-records koppelen een domein aan een IPv4-adres, AAAA aan een IPv6-adres.',
    faq3q: 'Waarvoor worden MX-records gebruikt?',
    faq3a: 'MX-records specificeren welke mailservers e-mail afhandelen voor een domein.',
    faq4q: 'Is deze DNS-lookup privaat?',
    faq4a: 'Ja. De lookup wordt uitgevoerd via DNS-over-HTTPS direct vanuit uw browser.',
    faq5q: 'Waarom worden DNS-records niet gevonden?',
    faq5a: 'Sommige domeinen hebben mogelijk niet alle recordtypen geconfigureerd.',
    relatedTitle: 'Gerelateerde tools',
    errorEmpty: 'Voer een domeinnaam in.',
    errorFetch: 'Kan DNS-records niet ophalen.',
    loading: 'DNS-records opzoeken...',
    noRecords: 'Geen records gevonden.',
    ttl: 'TTL',
    type: 'Type',
    value: 'Waarde',
    priority: 'Prioriteit',
  },
  pl: {
    title: 'Sprawdzanie rekordow DNS',
    description: 'Sprawdz rekordy DNS (A, AAAA, CNAME, MX, TXT, NS) dla dowolnej domeny. Darmowe i szybkie narzedzie DNS.',
    domainLabel: 'Nazwa domeny',
    domainPlaceholder: 'example.com',
    recordType: 'Typ rekordu',
    lookup: 'Wyszukaj DNS',
    clear: 'Wyczysc',
    resultsLabel: 'Rekordy DNS',
    copyLabel: 'Kopiuj wyniki',
    introTitle: 'Darmowe Sprawdzanie Rekordow DNS Online',
    introText: 'Wpisz nazwe domeny i wybierz typ rekordu DNS, aby natychmiast wyszukac rekordy.',
    howTitle: 'Jak sprawdzic rekordy DNS',
    step1: 'Wpisz nazwe domeny',
    step2: 'Wybierz typ rekordu DNS',
    step3: 'Kliknij "Wyszukaj DNS"',
    step4: 'Przejrzyj i skopiuj wyniki',
    featuresTitle: 'Funkcje',
    feature1: 'Obsluguje typy A, AAAA, CNAME, MX, TXT i NS',
    feature2: 'Uzywa DNS-over-HTTPS dla prywatnosci',
    feature3: 'Wyniki zawieraja wartosci TTL',
    feature4: 'Brak przetwarzania po stronie serwera',
    feature5: 'Dziala z kazda publiczna domena',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym sa rekordy DNS?',
    faq1a: 'Rekordy DNS to instrukcje przechowywane na serwerach DNS, ktore mapuja nazwy domen na adresy IP.',
    faq2q: 'Jaka jest roznica miedzy A a AAAA?',
    faq2a: 'Rekordy A mapuja domene na adres IPv4, a AAAA na adres IPv6.',
    faq3q: 'Do czego sluza rekordy MX?',
    faq3a: 'Rekordy MX okreslaja, ktore serwery pocztowe obsluguja poczte dla domeny.',
    faq4q: 'Czy to wyszukiwanie DNS jest prywatne?',
    faq4a: 'Tak. Wyszukiwanie odbywa sie przez DNS-over-HTTPS bezposrednio z przegladarki.',
    faq5q: 'Dlaczego rekordy DNS nie sa znajdowane?',
    faq5a: 'Niektore domeny moga nie miec skonfigurowanych wszystkich typow rekordow.',
    relatedTitle: 'Powiazane narzedzia',
    errorEmpty: 'Prosze wpisac nazwe domeny.',
    errorFetch: 'Nie udalo sie pobrac rekordow DNS.',
    loading: 'Wyszukiwanie rekordow DNS...',
    noRecords: 'Nie znaleziono rekordow.',
    ttl: 'TTL',
    type: 'Typ',
    value: 'Wartosc',
    priority: 'Priorytet',
  },
  sv: {
    title: 'DNS-postkontroll',
    description: 'Slaa upp DNS-poster (A, AAAA, CNAME, MX, TXT, NS) foer alla domaneer. Gratis och snabbt DNS-uppslag.',
    domainLabel: 'Domannamn',
    domainPlaceholder: 'example.com',
    recordType: 'Posttyp',
    lookup: 'Slaa upp DNS',
    clear: 'Rensa',
    resultsLabel: 'DNS-poster',
    copyLabel: 'Kopiera resultat',
    introTitle: 'Gratis DNS-postkontroll Online',
    introText: 'Ange ett domannamn och valj en DNS-posttyp foer att slaa upp poster direkt.',
    howTitle: 'Hur man kontrollerar DNS-poster',
    step1: 'Ange domannamnet',
    step2: 'Valj DNS-posttypen',
    step3: 'Klicka paa "Slaa upp DNS"',
    step4: 'Visa och kopiera resultaten',
    featuresTitle: 'Funktioner',
    feature1: 'Stoeder A, AAAA, CNAME, MX, TXT och NS typer',
    feature2: 'Anvaender DNS-over-HTTPS foer integritet',
    feature3: 'Resultaten inkluderar TTL-vaerden',
    feature4: 'Ingen serverbehandling behoevs',
    feature5: 'Fungerar med alla publika domannamn',
    faqTitle: 'Vanliga fraagor',
    faq1q: 'Vad aer DNS-poster?',
    faq1a: 'DNS-poster aer instruktioner som lagras i DNS-servrar som mappar domannamn till IP-adresser.',
    faq2q: 'Vad aer skillnaden mellan A och AAAA?',
    faq2a: 'A-poster mappar en doman till en IPv4-adress, medan AAAA mappar till IPv6.',
    faq3q: 'Vad anvaends MX-poster till?',
    faq3a: 'MX-poster anger vilka e-postservrar som hanterar e-post foer en doman.',
    faq4q: 'Aer denna DNS-uppsokning privat?',
    faq4a: 'Ja. Uppsokningen goers via DNS-over-HTTPS direkt fraan din webblasare.',
    faq5q: 'Varfoer hittas inte DNS-poster?',
    faq5a: 'Vissa domaner kanske inte har alla posttyper konfigurerade.',
    relatedTitle: 'Relaterade verktyg',
    errorEmpty: 'Ange ett domannamn.',
    errorFetch: 'Kunde inte hamta DNS-poster.',
    loading: 'Slaar upp DNS-poster...',
    noRecords: 'Inga poster hittades.',
    ttl: 'TTL',
    type: 'Typ',
    value: 'Vaerde',
    priority: 'Prioritet',
  },
  no: {
    title: 'DNS-postkontroll',
    description: 'Slaa opp DNS-poster (A, AAAA, CNAME, MX, TXT, NS) for alle domener. Gratis og rask DNS-oppslag.',
    domainLabel: 'Domenenavn',
    domainPlaceholder: 'example.com',
    recordType: 'Posttype',
    lookup: 'Slaa opp DNS',
    clear: 'Toom',
    resultsLabel: 'DNS-poster',
    copyLabel: 'Kopier resultater',
    introTitle: 'Gratis DNS-postkontroll Online',
    introText: 'Skriv inn et domenenavn og velg en DNS-posttype for aa slaa opp poster umiddelbart.',
    howTitle: 'Slik sjekker du DNS-poster',
    step1: 'Skriv inn domenenavnet',
    step2: 'Velg DNS-posttypen',
    step3: 'Klikk paa "Slaa opp DNS"',
    step4: 'Se og kopier resultatene',
    featuresTitle: 'Funksjoner',
    feature1: 'Stoetter A, AAAA, CNAME, MX, TXT og NS typer',
    feature2: 'Bruker DNS-over-HTTPS for personvern',
    feature3: 'Resultater inkluderer TTL-verdier',
    feature4: 'Ingen serverbehandling nodvendig',
    feature5: 'Fungerer med alle offentlige domenenavn',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hva er DNS-poster?',
    faq1a: 'DNS-poster er instruksjoner lagret i DNS-servere som kartlegger domenenavn til IP-adresser.',
    faq2q: 'Hva er forskjellen mellom A og AAAA?',
    faq2a: 'A-poster kartlegger et domene til en IPv4-adresse, mens AAAA kartlegger til IPv6.',
    faq3q: 'Hva brukes MX-poster til?',
    faq3a: 'MX-poster angir hvilke e-postservere som haandterer e-post for et domene.',
    faq4q: 'Er dette DNS-oppslaget privat?',
    faq4a: 'Ja. Oppslaget gjores via DNS-over-HTTPS direkte fra nettleseren din.',
    faq5q: 'Hvorfor finnes ikke DNS-poster?',
    faq5a: 'Noen domener har kanskje ikke alle posttyper konfigurert.',
    relatedTitle: 'Relaterte verktoy',
    errorEmpty: 'Vennligst skriv inn et domenenavn.',
    errorFetch: 'Kunne ikke hente DNS-poster.',
    loading: 'Slaar opp DNS-poster...',
    noRecords: 'Ingen poster funnet.',
    ttl: 'TTL',
    type: 'Type',
    value: 'Verdi',
    priority: 'Prioritet',
  },
  id: {
    title: 'Pemeriksa Rekaman DNS',
    description: 'Cari rekaman DNS (A, AAAA, CNAME, MX, TXT, NS) untuk domain apa pun. Alat pencarian DNS gratis dan cepat.',
    domainLabel: 'Nama Domain',
    domainPlaceholder: 'example.com',
    recordType: 'Jenis Rekaman',
    lookup: 'Cari DNS',
    clear: 'Hapus',
    resultsLabel: 'Rekaman DNS',
    copyLabel: 'Salin Hasil',
    introTitle: 'Pemeriksa Rekaman DNS Online Gratis',
    introText: 'Masukkan nama domain dan pilih jenis rekaman DNS untuk mencari rekaman secara instan.',
    howTitle: 'Cara memeriksa rekaman DNS',
    step1: 'Masukkan nama domain',
    step2: 'Pilih jenis rekaman DNS',
    step3: 'Klik "Cari DNS"',
    step4: 'Lihat dan salin hasilnya',
    featuresTitle: 'Fitur',
    feature1: 'Mendukung tipe A, AAAA, CNAME, MX, TXT dan NS',
    feature2: 'Menggunakan DNS-over-HTTPS untuk privasi',
    feature3: 'Hasil mencakup nilai TTL',
    feature4: 'Tidak perlu pemrosesan sisi server',
    feature5: 'Bekerja dengan nama domain publik apa pun',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu rekaman DNS?',
    faq1a: 'Rekaman DNS adalah instruksi yang disimpan di server DNS yang memetakan nama domain ke alamat IP.',
    faq2q: 'Apa perbedaan antara A dan AAAA?',
    faq2a: 'Rekaman A memetakan domain ke alamat IPv4, sedangkan AAAA memetakan ke IPv6.',
    faq3q: 'Untuk apa rekaman MX digunakan?',
    faq3a: 'Rekaman MX menentukan server email mana yang menangani email untuk domain.',
    faq4q: 'Apakah pencarian DNS ini pribadi?',
    faq4a: 'Ya. Pencarian dilakukan melalui DNS-over-HTTPS langsung dari browser Anda.',
    faq5q: 'Mengapa rekaman DNS tidak ditemukan?',
    faq5a: 'Beberapa domain mungkin tidak memiliki semua jenis rekaman yang dikonfigurasi.',
    relatedTitle: 'Alat terkait',
    errorEmpty: 'Silakan masukkan nama domain.',
    errorFetch: 'Gagal mengambil rekaman DNS.',
    loading: 'Mencari rekaman DNS...',
    noRecords: 'Tidak ada rekaman yang ditemukan.',
    ttl: 'TTL',
    type: 'Tipe',
    value: 'Nilai',
    priority: 'Prioritas',
  },
  th: {
    title: 'ตรวจสอบระเบียน DNS',
    description: 'ค้นหาระเบียน DNS (A, AAAA, CNAME, MX, TXT, NS) สำหรับโดเมนใดก็ได้ เครื่องมือค้นหา DNS ฟรีและรวดเร็ว',
    domainLabel: 'ชื่อโดเมน',
    domainPlaceholder: 'example.com',
    recordType: 'ประเภทระเบียน',
    lookup: 'ค้นหา DNS',
    clear: 'ล้าง',
    resultsLabel: 'ระเบียน DNS',
    copyLabel: 'คัดลอกผลลัพธ์',
    introTitle: 'ตรวจสอบระเบียน DNS ออนไลน์ฟรี',
    introText: 'กรอกชื่อโดเมนและเลือกประเภทระเบียน DNS เพื่อค้นหาระเบียนทันที',
    howTitle: 'วิธีตรวจสอบระเบียน DNS',
    step1: 'กรอกชื่อโดเมน',
    step2: 'เลือกประเภทระเบียน DNS',
    step3: 'คลิก "ค้นหา DNS"',
    step4: 'ดูและคัดลอกผลลัพธ์',
    featuresTitle: 'คุณสมบัติ',
    feature1: 'รองรับประเภท A, AAAA, CNAME, MX, TXT และ NS',
    feature2: 'ใช้ DNS-over-HTTPS เพื่อความเป็นส่วนตัว',
    feature3: 'ผลลัพธ์รวมค่า TTL',
    feature4: 'ไม่ต้องประมวลผลฝั่งเซิร์ฟเวอร์',
    feature5: 'ใช้งานได้กับชื่อโดเมนสาธารณะทุกชื่อ',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ระเบียน DNS คืออะไร?',
    faq1a: 'ระเบียน DNS คือคำสั่งที่เก็บอยู่ในเซิร์ฟเวอร์ DNS ที่แมปชื่อโดเมนไปยังที่อยู่ IP',
    faq2q: 'ความแตกต่างระหว่าง A และ AAAA คืออะไร?',
    faq2a: 'ระเบียน A แมปโดเมนไปยังที่อยู่ IPv4 ในขณะที่ AAAA แมปไปยัง IPv6',
    faq3q: 'ระเบียน MX ใช้ทำอะไร?',
    faq3a: 'ระเบียน MX ระบุว่าเซิร์ฟเวอร์เมลใดจัดการอีเมลสำหรับโดเมน',
    faq4q: 'การค้นหา DNS นี้เป็นส่วนตัวหรือไม่?',
    faq4a: 'ใช่ การค้นหาทำผ่าน DNS-over-HTTPS โดยตรงจากเบราว์เซอร์ของคุณ',
    faq5q: 'ทำไมจึงไม่พบระเบียน DNS?',
    faq5a: 'บางโดเมนอาจไม่ได้กำหนดค่าระเบียนทุกประเภท',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
    errorEmpty: 'กรุณากรอกชื่อโดเมน',
    errorFetch: 'ไม่สามารถดึงระเบียน DNS ได้',
    loading: 'กำลังค้นหาระเบียน DNS...',
    noRecords: 'ไม่พบระเบียน',
    ttl: 'TTL',
    type: 'ประเภท',
    value: 'ค่า',
    priority: 'ลำดับความสำคัญ',
  },
};

const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface DnsResult {
  type: string;
  name: string;
  ttl: number;
  value: string;
  priority?: number;
}

const DNS_TYPE_MAP: Record<number, string> = {
  1: 'A',
  2: 'NS',
  5: 'CNAME',
  15: 'MX',
  16: 'TXT',
  28: 'AAAA',
};

export default function DnsRecordChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [results, setResults] = useState<DnsResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultText, setResultText] = useState('');

  const handleLookup = useCallback(async () => {
    setError('');
    setResults([]);
    setResultText('');

    const cleanDomain = domain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!cleanDomain) {
      setError(t.errorEmpty);
      return;
    }

    setLoading(true);
    try {
      const typeParam = recordType;
      const url = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=${typeParam}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('HTTP error');
      const data = await response.json();

      if (!data.Answer || data.Answer.length === 0) {
        setResultText(t.noRecords);
        setLoading(false);
        return;
      }

      const parsed: DnsResult[] = data.Answer.map((ans: DnsAnswer) => {
        const typeName = DNS_TYPE_MAP[ans.type] || String(ans.type);
        let value = ans.data;
        let priority: number | undefined;

        if (typeName === 'MX') {
          const parts = value.split(' ');
          if (parts.length >= 2) {
            priority = parseInt(parts[0], 10);
            value = parts.slice(1).join(' ');
          }
        }

        if (typeName === 'TXT' && value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }

        return {
          type: typeName,
          name: ans.name,
          ttl: ans.TTL,
          value,
          priority,
        };
      });

      setResults(parsed);

      const text = parsed.map(r => {
        let line = `${r.type}\t${r.name}\t${r.ttl}\t`;
        if (r.priority !== undefined) line += `${r.priority}\t`;
        line += r.value;
        return line;
      }).join('\n');
      setResultText(text);
    } catch {
      setError(t.errorFetch);
    } finally {
      setLoading(false);
    }
  }, [domain, recordType, t]);

  const handleClear = useCallback(() => {
    setDomain('');
    setResults([]);
    setResultText('');
    setError('');
  }, []);

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
    <ToolLayout title={t.title} description={t.description} toolId="dns-record-checker">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Input section */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.domainLabel}</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder={t.domainPlaceholder}
            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: 14,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        <div style={{ minWidth: 140 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.recordType}</label>
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: 14,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
            }}
          >
            {RECORD_TYPES.map(rt => (
              <option key={rt} value={rt}>{rt}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleLookup} className="btn btn-primary" style={{ fontSize: 13 }} disabled={loading}>
          {loading ? t.loading : t.lookup}
        </button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>
          {t.clear}
        </button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose, #f43f5e)',
        }}>
          {'\u2715'} {error}
        </div>
      )}

      {/* Results table */}
      {results.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.resultsLabel}</label>
            <CopyButton text={resultText} label={t.copyLabel} />
          </div>
          <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'JetBrains Mono, Fira Code, monospace' }}>
              <thead>
                <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.type}</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.value}</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.ttl}</th>
                  {results.some(r => r.priority !== undefined) && (
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.priority}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        background: 'var(--accent-blue)',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700,
                      }}>
                        {r.type}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', wordBreak: 'break-all' }}>{r.value}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{r.ttl}s</td>
                    {results.some(rec => rec.priority !== undefined) && (
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>
                        {r.priority !== undefined ? r.priority : '-'}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {resultText && results.length === 0 && !error && (
        <div style={{
          padding: '14px 18px',
          background: 'var(--bg-card)',
          borderRadius: 8,
          fontSize: 14,
          color: 'var(--text-secondary)',
          marginBottom: 16,
        }}>
          {resultText}
        </div>
      )}

      {/* SEO content */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.feature1}</li>
          <li>{t.feature2}</li>
          <li>{t.feature3}</li>
          <li>{t.feature4}</li>
          <li>{t.feature5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/ip-address-lookup`, label: 'IP Address Lookup' },
            { href: `/${lang}/tools/http-status-codes`, label: 'HTTP Status Codes' },
            { href: `/${lang}/tools/url-parser`, label: 'URL Parser' },
          ].map((link) => (
            <a key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
