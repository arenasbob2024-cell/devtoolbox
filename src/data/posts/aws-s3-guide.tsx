'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'AWS S3 for Developers: Upload, Presigned URLs, Bucket Policies, and CloudFront',
    intro: 'Amazon S3 (Simple Storage Service) is the backbone of file storage for millions of applications. With 99.999999999% (11 nines) durability and virtually unlimited storage, it handles everything from user uploads to video streaming. This guide covers the <strong>S3 SDK</strong>, <strong>presigned URLs</strong>, <strong>bucket policies</strong>, and integrating with <strong>CloudFront</strong> for global CDN delivery.',
    h2Basics: 'S3 Basics: Buckets and Objects',
    basicsP1: 'S3 stores data as objects within buckets. An object consists of the file data plus metadata. Each object is identified by a key (essentially a file path) within the bucket.',
    h2Upload: 'Uploading Files with the AWS SDK v3',
    uploadP1: 'The AWS SDK v3 for JavaScript uses a modular design where you import only the commands you need. This reduces bundle size significantly.',
    h2Presigned: 'Presigned URLs for Secure Direct Uploads',
    presignedP1: 'Presigned URLs allow clients to upload directly to S3 without routing through your server. This dramatically reduces server load for file uploads. The URL is time-limited and signed with your AWS credentials.',
    h2Policy: 'Bucket Policies and Security',
    policyP1: 'S3 bucket policies control access at the bucket and object level. They use the same IAM policy language but are attached to buckets rather than IAM users.',
    h2CloudFront: 'CloudFront CDN Integration',
    cloudFrontP1: 'CloudFront is AWS\'s CDN that caches S3 content at edge locations worldwide. Using CloudFront in front of S3 reduces latency, lowers S3 data transfer costs, and adds HTTPS to private buckets.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Should I allow public access to my S3 bucket?',
    faq1A: 'Only for static website hosting or truly public assets (like a public CDN). For user uploads, sensitive files, or application assets that should require authentication, keep the bucket private and use presigned URLs or CloudFront signed URLs for access. AWS now blocks public access by default, which is the correct default.',
    faq2Q: 'How long should presigned URLs be valid?',
    faq2A: 'It depends on use case: for upload URLs (PUT), 15-30 minutes is typical. For download URLs, it depends on the sensitivity — public media might be 1-24 hours, while confidential documents might be 5-15 minutes. The maximum expiry for presigned URLs is 7 days (604800 seconds) for most operations.',
    faq3Q: 'How do I reduce S3 storage costs?',
    faq3A: 'Use S3 Intelligent-Tiering for unknown access patterns (automatically moves to cheaper tiers). For known patterns: S3 Standard for frequent access, S3 Standard-IA for infrequent, S3 Glacier for archival. Enable S3 Lifecycle Rules to automatically transition or delete old objects. Enable S3 Storage Lens for visibility into your usage.',
    faq4Q: 'What is multipart upload and when should I use it?',
    faq4A: 'Multipart upload splits large files into parts that are uploaded in parallel, then assembled by S3. AWS recommends multipart for files over 100MB and requires it for files over 5GB (maximum single PUT object size). It also enables resumable uploads — if one part fails, only that part needs to be re-uploaded.',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'AWS S3 pour les développeurs : upload, URLs présignées, politiques de bucket et CloudFront', intro: 'Amazon S3 est la colonne vertébrale du stockage de fichiers pour des millions d\'applications. Ce guide couvre le <strong>SDK S3</strong>, les <strong>URLs présignées</strong>, les <strong>politiques de bucket</strong> et l\'intégration avec <strong>CloudFront</strong>.', h2Basics: 'Bases S3 : buckets et objets', basicsP1: 'S3 stocke les données en tant qu\'objets dans des buckets.', h2Upload: 'Upload avec le SDK AWS v3', uploadP1: 'Le SDK AWS v3 utilise une conception modulaire pour réduire la taille du bundle.', h2Presigned: 'URLs présignées pour les uploads directs sécurisés', presignedP1: 'Les URLs présignées permettent aux clients d\'uploader directement sur S3 sans passer par votre serveur.', h2Policy: 'Politiques de bucket et sécurité', policyP1: 'Les politiques de bucket S3 contrôlent l\'accès au niveau du bucket et de l\'objet.', h2CloudFront: 'Intégration CloudFront CDN', cloudFrontP1: 'CloudFront est le CDN d\'AWS qui met en cache le contenu S3 dans des emplacements de périphérie mondiaux.', h2Faq: 'Questions fréquentes', faq1Q: 'Dois-je autoriser l\'accès public à mon bucket S3 ?', faq1A: 'Seulement pour l\'hébergement de sites web statiques ou les ressources vraiment publiques. Gardez le bucket privé et utilisez des URLs présignées.', faq2Q: 'Quelle durée de validité pour les URLs présignées ?', faq2A: '15-30 minutes pour les URLs d\'upload. La durée maximale est de 7 jours.', faq3Q: 'Comment réduire les coûts de stockage S3 ?', faq3A: 'Utilisez S3 Intelligent-Tiering et les règles de cycle de vie pour déplacer ou supprimer automatiquement les anciens objets.', faq4Q: 'Qu\'est-ce que le multipart upload ?', faq4A: 'Le multipart upload divise les gros fichiers en parties uploadées en parallèle. Recommandé pour les fichiers de plus de 100 Mo.', relatedTitle: 'Outils associés' },
  de: { title: 'AWS S3 für Entwickler: Upload, Presigned URLs, Bucket-Policies und CloudFront', intro: 'Amazon S3 ist das Rückgrat der Dateispeicherung für Millionen von Anwendungen. Dieser Leitfaden behandelt das <strong>S3 SDK</strong>, <strong>Presigned URLs</strong>, <strong>Bucket-Policies</strong> und die Integration mit <strong>CloudFront</strong>.', h2Basics: 'S3-Grundlagen: Buckets und Objekte', basicsP1: 'S3 speichert Daten als Objekte in Buckets.', h2Upload: 'Dateien mit dem AWS SDK v3 hochladen', uploadP1: 'Das AWS SDK v3 verwendet ein modulares Design zur Bundle-Größenreduzierung.', h2Presigned: 'Presigned URLs für sichere direkte Uploads', presignedP1: 'Presigned URLs ermöglichen Clients das direkte Hochladen auf S3 ohne Ihren Server.', h2Policy: 'Bucket-Policies und Sicherheit', policyP1: 'S3-Bucket-Policies steuern den Zugriff auf Bucket- und Objektebene.', h2CloudFront: 'CloudFront-CDN-Integration', cloudFrontP1: 'CloudFront ist Amazons CDN, das S3-Inhalte weltweit zwischenspeichert.', h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Sollte ich öffentlichen Zugriff auf meinen S3-Bucket erlauben?', faq1A: 'Nur für statisches Website-Hosting oder wirklich öffentliche Assets. Halten Sie den Bucket privat und verwenden Sie Presigned URLs.', faq2Q: 'Wie lange sollten Presigned URLs gültig sein?', faq2A: '15-30 Minuten für Upload-URLs. Die maximale Gültigkeitsdauer beträgt 7 Tage.', faq3Q: 'Wie kann ich S3-Speicherkosten reduzieren?', faq3A: 'Verwenden Sie S3 Intelligent-Tiering und Lifecycle-Regeln.', faq4Q: 'Was ist Multipart-Upload?', faq4A: 'Multipart-Upload teilt große Dateien in parallel hochgeladene Teile auf. Empfohlen für Dateien über 100 MB.', relatedTitle: 'Verwandte Tools' },
  it: { title: 'AWS S3 per sviluppatori', intro: 'Amazon S3 è la spina dorsale dell\'archiviazione file per milioni di applicazioni. Questa guida copre il <strong>SDK S3</strong>, le <strong>URL prefirmate</strong>, le <strong>policy dei bucket</strong> e l\'integrazione con <strong>CloudFront</strong>.', h2Basics: 'Basi di S3: bucket e oggetti', basicsP1: 'S3 memorizza i dati come oggetti all\'interno dei bucket.', h2Upload: 'Caricamento file con AWS SDK v3', uploadP1: 'AWS SDK v3 utilizza un design modulare per ridurre le dimensioni del bundle.', h2Presigned: 'URL prefirmate per upload diretti sicuri', presignedP1: 'Le URL prefirmate permettono ai client di caricare direttamente su S3 senza passare per il server.', h2Policy: 'Policy dei bucket e sicurezza', policyP1: 'Le policy dei bucket S3 controllano l\'accesso a livello di bucket e oggetto.', h2CloudFront: 'Integrazione CloudFront CDN', cloudFrontP1: 'CloudFront è il CDN di AWS che memorizza nella cache i contenuti S3 a livello globale.', h2Faq: 'Domande frequenti', faq1Q: 'Devo consentire l\'accesso pubblico al mio bucket S3?', faq1A: 'Solo per hosting di siti web statici o risorse veramente pubbliche. Mantieni il bucket privato e usa URL prefirmate.', faq2Q: 'Per quanto tempo devono essere valide le URL prefirmate?', faq2A: '15-30 minuti per le URL di upload. La durata massima è di 7 giorni.', faq3Q: 'Come ridurre i costi di archiviazione S3?', faq3A: 'Usa S3 Intelligent-Tiering e regole del ciclo di vita.', faq4Q: 'Cos\'è il multipart upload?', faq4A: 'Il multipart upload divide i file grandi in parti caricate in parallelo. Consigliato per file superiori a 100 MB.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'AWS S3 para desarrolladores', intro: 'Amazon S3 es la columna vertebral del almacenamiento de archivos para millones de aplicaciones. Esta guia cubre el <strong>SDK de S3</strong>, las <strong>URLs prefirmadas</strong>, las <strong>politicas de bucket</strong> y la integracion con <strong>CloudFront</strong>.', h2Basics: 'Conceptos basicos de S3: buckets y objetos', basicsP1: 'S3 almacena datos como objetos dentro de buckets.', h2Upload: 'Subir archivos con el SDK de AWS v3', uploadP1: 'El SDK de AWS v3 utiliza un diseno modular para reducir el tamano del bundle.', h2Presigned: 'URLs prefirmadas para subidas directas seguras', presignedP1: 'Las URLs prefirmadas permiten a los clientes subir directamente a S3 sin pasar por el servidor.', h2Policy: 'Politicas de bucket y seguridad', policyP1: 'Las politicas de bucket S3 controlan el acceso a nivel de bucket y objeto.', h2CloudFront: 'Integracion CloudFront CDN', cloudFrontP1: 'CloudFront es la CDN de AWS que almacena contenido S3 en ubicaciones de borde mundiales.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Debo permitir acceso publico a mi bucket S3?', faq1A: 'Solo para hosting de sitios web estaticos o activos verdaderamente publicos. Mantiene el bucket privado y usa URLs prefirmadas.', faq2Q: 'Por cuanto tiempo deben ser validas las URLs prefirmadas?', faq2A: '15-30 minutos para URLs de subida. La duracion maxima es de 7 dias.', faq3Q: 'Como reducir los costos de almacenamiento de S3?', faq3A: 'Usa S3 Intelligent-Tiering y reglas de ciclo de vida.', faq4Q: 'Que es la carga multiparte?', faq4A: 'La carga multiparte divide archivos grandes en partes cargadas en paralelo. Recomendado para archivos mayores de 100 MB.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'AWS S3 para desenvolvedores', intro: 'Amazon S3 é a espinha dorsal do armazenamento de arquivos para milhões de aplicações. Este guia cobre o <strong>SDK do S3</strong>, <strong>URLs pré-assinadas</strong>, <strong>políticas de bucket</strong> e integração com <strong>CloudFront</strong>.', h2Basics: 'Básicos do S3: buckets e objetos', basicsP1: 'O S3 armazena dados como objetos dentro de buckets.', h2Upload: 'Upload de arquivos com AWS SDK v3', uploadP1: 'O AWS SDK v3 usa um design modular para reduzir o tamanho do bundle.', h2Presigned: 'URLs pré-assinadas para uploads diretos seguros', presignedP1: 'URLs pré-assinadas permitem que clientes façam upload diretamente para o S3 sem passar pelo servidor.', h2Policy: 'Políticas de bucket e segurança', policyP1: 'As políticas de bucket do S3 controlam o acesso no nível do bucket e do objeto.', h2CloudFront: 'Integração CloudFront CDN', cloudFrontP1: 'CloudFront é o CDN da AWS que armazena conteúdo do S3 em locais de borda no mundo todo.', h2Faq: 'Perguntas frequentes', faq1Q: 'Devo permitir acesso público ao meu bucket S3?', faq1A: 'Apenas para hospedagem de sites estáticos ou ativos realmente públicos. Mantenha o bucket privado e use URLs pré-assinadas.', faq2Q: 'Por quanto tempo as URLs pré-assinadas devem ser válidas?', faq2A: '15-30 minutos para URLs de upload. A validade máxima é de 7 dias.', faq3Q: 'Como reduzir os custos de armazenamento do S3?', faq3A: 'Use S3 Intelligent-Tiering e regras de ciclo de vida.', faq4Q: 'O que é upload multipart?', faq4A: 'Upload multipart divide arquivos grandes em partes enviadas em paralelo. Recomendado para arquivos acima de 100 MB.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'AWS S3 voor ontwikkelaars', intro: 'Amazon S3 is de ruggengraat van bestandsopslag voor miljoenen applicaties. Deze gids behandelt de <strong>S3 SDK</strong>, <strong>presigned URLs</strong>, <strong>bucket-beleid</strong> en integratie met <strong>CloudFront</strong>.', h2Basics: 'S3-basisprincipes: buckets en objecten', basicsP1: 'S3 slaat gegevens op als objecten in buckets.', h2Upload: 'Bestanden uploaden met AWS SDK v3', uploadP1: 'De AWS SDK v3 gebruikt een modulair ontwerp om de bundelgrootte te verkleinen.', h2Presigned: 'Presigned URLs voor veilige directe uploads', presignedP1: 'Presigned URLs stellen clients in staat direct naar S3 te uploaden zonder uw server.', h2Policy: 'Bucketbeleid en beveiliging', policyP1: 'S3-bucketbeleidsregels beheren toegang op bucket- en objectniveau.', h2CloudFront: 'CloudFront CDN-integratie', cloudFrontP1: 'CloudFront is het CDN van AWS dat S3-inhoud wereldwijd in cache opslaat.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Moet ik openbare toegang tot mijn S3-bucket toestaan?', faq1A: 'Alleen voor statische websitehosting of echt openbare assets. Houd de bucket privé en gebruik presigned URLs.', faq2Q: 'Hoe lang moeten presigned URLs geldig zijn?', faq2A: '15-30 minuten voor upload-URLs. De maximale geldigheidsduur is 7 dagen.', faq3Q: 'Hoe verlaag ik S3-opslagkosten?', faq3A: 'Gebruik S3 Intelligent-Tiering en levenscyclusregels.', faq4Q: 'Wat is multipart upload?', faq4A: 'Multipart upload verdeelt grote bestanden in parallel geüploade delen. Aanbevolen voor bestanden groter dan 100 MB.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'AWS S3 dla deweloperów', intro: 'Amazon S3 to kręgosłup przechowywania plików dla milionów aplikacji. Ten przewodnik omawia <strong>SDK S3</strong>, <strong>presigned URLs</strong>, <strong>polityki bucket</strong> i integrację z <strong>CloudFront</strong>.', h2Basics: 'Podstawy S3: buckety i obiekty', basicsP1: 'S3 przechowuje dane jako obiekty w bucketach.', h2Upload: 'Przesyłanie plików za pomocą AWS SDK v3', uploadP1: 'AWS SDK v3 używa modularnego projektu do zmniejszenia rozmiaru bundle.', h2Presigned: 'Presigned URLs do bezpiecznych bezpośrednich przesyłek', presignedP1: 'Presigned URLs pozwalają klientom przesyłać bezpośrednio do S3 bez pośrednictwa serwera.', h2Policy: 'Polityki bucket i bezpieczeństwo', policyP1: 'Polityki bucket S3 kontrolują dostęp na poziomie bucketa i obiektu.', h2CloudFront: 'Integracja CloudFront CDN', cloudFrontP1: 'CloudFront to CDN AWS, który buforuje zawartość S3 w lokalizacjach brzegowych na całym świecie.', h2Faq: 'Często zadawane pytania', faq1Q: 'Czy powinienem zezwolić na publiczny dostęp do mojego bucketa S3?', faq1A: 'Tylko do hostingu statycznych witryn lub naprawdę publicznych zasobów. Zachowaj bucket jako prywatny i używaj presigned URLs.', faq2Q: 'Jak długo powinny być ważne presigned URLs?', faq2A: '15-30 minut dla URL-ów do przesyłania. Maksymalny czas ważności wynosi 7 dni.', faq3Q: 'Jak obniżyć koszty przechowywania w S3?', faq3A: 'Używaj S3 Intelligent-Tiering i reguł cyklu życia.', faq4Q: 'Co to jest multipart upload?', faq4A: 'Multipart upload dzieli duże pliki na równolegle przesyłane części. Zalecane dla plików powyżej 100 MB.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'AWS S3 för utvecklare', intro: 'Amazon S3 är ryggraden i fillagring för miljoner applikationer. Den här guiden täcker <strong>S3 SDK</strong>, <strong>presignerade URLs</strong>, <strong>bucketpolicyer</strong> och integration med <strong>CloudFront</strong>.', h2Basics: 'S3-grunder: buckets och objekt', basicsP1: 'S3 lagrar data som objekt i buckets.', h2Upload: 'Ladda upp filer med AWS SDK v3', uploadP1: 'AWS SDK v3 använder ett modulärt design för att minska bundelstorlek.', h2Presigned: 'Presignerade URLs för säkra direktuppladdningar', presignedP1: 'Presignerade URLs tillåter klienter att ladda upp direkt till S3 utan din server.', h2Policy: 'Bucketpolicyer och säkerhet', policyP1: 'S3-bucketpolicyer styr åtkomst på bucket- och objektnivå.', h2CloudFront: 'CloudFront CDN-integration', cloudFrontP1: 'CloudFront är Amazons CDN som cachar S3-innehåll globalt.', h2Faq: 'Vanliga frågor', faq1Q: 'Bör jag tillåta offentlig åtkomst till min S3-bucket?', faq1A: 'Bara för statisk webbhosting eller verkligen offentliga tillgångar. Håll bucketen privat och använd presignerade URLs.', faq2Q: 'Hur länge bör presignerade URLs vara giltiga?', faq2A: '15-30 minuter för upload-URLs. Maximal giltighetstid är 7 dagar.', faq3Q: 'Hur minskar jag S3-lagringskostnader?', faq3A: 'Använd S3 Intelligent-Tiering och livscykelregler.', faq4Q: 'Vad är multipart-uppladdning?', faq4A: 'Multipart-uppladdning delar upp stora filer i parallellt uppladdade delar. Rekommenderas för filer över 100 MB.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'AWS S3 for utviklere', intro: 'Amazon S3 er ryggraden i fillagring for millioner av applikasjoner. Denne guiden dekker <strong>S3 SDK</strong>, <strong>forhåndssignerte URLer</strong>, <strong>bucketpolicyer</strong> og integrering med <strong>CloudFront</strong>.', h2Basics: 'S3-grunnleggende: buckets og objekter', basicsP1: 'S3 lagrer data som objekter i buckets.', h2Upload: 'Laste opp filer med AWS SDK v3', uploadP1: 'AWS SDK v3 bruker et modulært design for å redusere bundelstørrelse.', h2Presigned: 'Forhåndssignerte URLer for sikre direkte opplastinger', presignedP1: 'Forhåndssignerte URLer lar klienter laste opp direkte til S3 uten serveren din.', h2Policy: 'Bucketpolicyer og sikkerhet', policyP1: 'S3-bucketpolicyer styrer tilgang på bucket- og objektnivå.', h2CloudFront: 'CloudFront CDN-integrering', cloudFrontP1: 'CloudFront er Amazons CDN som cacher S3-innhold globalt.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Bør jeg tillate offentlig tilgang til S3-bucketen min?', faq1A: 'Bare for statisk netthosting eller virkelig offentlige eiendeler. Hold bucketen privat og bruk forhåndssignerte URLer.', faq2Q: 'Hvor lenge bør forhåndssignerte URLer være gyldige?', faq2A: '15-30 minutter for opplastings-URLer. Maksimal gyldighet er 7 dager.', faq3Q: 'Hvordan redusere S3-lagringskostnader?', faq3A: 'Bruk S3 Intelligent-Tiering og livssyklusregler.', faq4Q: 'Hva er multipart-opplasting?', faq4A: 'Multipart-opplasting deler store filer i parallelt opplastede deler. Anbefalt for filer over 100 MB.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'AWS S3 开发者指南：上传、预签名 URL、存储桶策略和 CloudFront', intro: 'Amazon S3 是数百万应用文件存储的骨干。本指南涵盖 <strong>S3 SDK</strong>、<strong>预签名 URL</strong>、<strong>存储桶策略</strong>和 <strong>CloudFront</strong> 集成。', h2Basics: 'S3 基础：存储桶与对象', basicsP1: 'S3 将数据作为对象存储在存储桶中。每个对象由文件数据加元数据组成，通过键（本质上是文件路径）唯一标识。', h2Upload: '使用 AWS SDK v3 上传文件', uploadP1: 'AWS SDK v3 采用模块化设计，只导入需要的命令，显著减少包大小。', h2Presigned: '预签名 URL 实现安全直传', presignedP1: '预签名 URL 允许客户端直接上传到 S3，无需通过服务器中转，大幅降低文件上传的服务器负载。URL 有时间限制并用 AWS 凭证签名。', h2Policy: '存储桶策略与安全', policyP1: 'S3 存储桶策略在存储桶和对象级别控制访问权限，使用 IAM 策略语言。', h2CloudFront: 'CloudFront CDN 集成', cloudFrontP1: 'CloudFront 是 AWS 的 CDN，在全球边缘节点缓存 S3 内容，降低延迟和数据传输成本。', h2Faq: '常见问题', faq1Q: '应该允许公开访问 S3 存储桶吗？', faq1A: '仅对静态网站托管或真正公开的资产开放。用户上传、敏感文件等应保持存储桶私有，使用预签名 URL 提供访问。', faq2Q: '预签名 URL 应该有效多长时间？', faq2A: '上传 URL（PUT）通常为 15-30 分钟。最大过期时间为 7 天（604800 秒）。', faq3Q: '如何降低 S3 存储成本？', faq3A: '使用 S3 智能分层（Intelligent-Tiering）和生命周期规则自动转换或删除旧对象。', faq4Q: '什么是分段上传（Multipart Upload）？', faq4A: '分段上传将大文件拆分为并行上传的部分，然后由 S3 合并。AWS 建议文件超过 100MB 使用分段上传，5GB 以上必须使用。', relatedTitle: '相关工具' },
  ja: { title: 'AWS S3開発者ガイド：アップロード、署名付きURL、バケットポリシー、CloudFront', intro: 'Amazon S3は何百万ものアプリケーションのファイルストレージの基盤です。このガイドでは<strong>S3 SDK</strong>、<strong>署名付きURL</strong>、<strong>バケットポリシー</strong>、<strong>CloudFront</strong>との統合を解説します。', h2Basics: 'S3の基礎：バケットとオブジェクト', basicsP1: 'S3はバケット内のオブジェクトとしてデータを保存します。', h2Upload: 'AWS SDK v3でのファイルアップロード', uploadP1: 'AWS SDK v3は必要なコマンドのみをインポートするモジュラー設計を使用します。', h2Presigned: 'セキュアな直接アップロードのための署名付きURL', presignedP1: '署名付きURLにより、クライアントはサーバーを経由せずにS3に直接アップロードできます。', h2Policy: 'バケットポリシーとセキュリティ', policyP1: 'S3バケットポリシーはバケットおよびオブジェクトレベルでアクセスを制御します。', h2CloudFront: 'CloudFront CDN統合', cloudFrontP1: 'CloudFrontはAWSのCDNで、S3コンテンツを世界中のエッジロケーションでキャッシュします。', h2Faq: 'よくある質問', faq1Q: 'S3バケットへのパブリックアクセスを許可すべきか？', faq1A: '静的ウェブサイトホスティングや本当に公開されたアセットのみです。バケットをプライベートに保ち、署名付きURLを使用してください。', faq2Q: '署名付きURLの有効期間はどれくらいにすべきか？', faq2A: 'アップロードURLは15-30分が一般的です。最大有効期間は7日間です。', faq3Q: 'S3ストレージコストを削減するには？', faq3A: 'S3インテリジェントティアリングとライフサイクルルールを使用してください。', faq4Q: 'マルチパートアップロードとは？', faq4A: '大きなファイルを並行してアップロードされる部分に分割します。100MB以上のファイルに推奨されます。', relatedTitle: '関連ツール' },
  ko: { title: 'AWS S3 개발자 가이드: 업로드, 서명된 URL, 버킷 정책, CloudFront', intro: 'Amazon S3는 수백만 개의 애플리케이션을 위한 파일 스토리지의 핵심입니다. 이 가이드는 <strong>S3 SDK</strong>, <strong>서명된 URL</strong>, <strong>버킷 정책</strong>, <strong>CloudFront</strong> 통합을 다룹니다.', h2Basics: 'S3 기초: 버킷과 객체', basicsP1: 'S3는 데이터를 버킷 내의 객체로 저장합니다.', h2Upload: 'AWS SDK v3로 파일 업로드', uploadP1: 'AWS SDK v3는 필요한 명령만 가져오는 모듈형 설계를 사용합니다.', h2Presigned: '안전한 직접 업로드를 위한 서명된 URL', presignedP1: '서명된 URL을 통해 클라이언트는 서버를 거치지 않고 S3에 직접 업로드할 수 있습니다.', h2Policy: '버킷 정책 및 보안', policyP1: 'S3 버킷 정책은 버킷 및 객체 수준에서 액세스를 제어합니다.', h2CloudFront: 'CloudFront CDN 통합', cloudFrontP1: 'CloudFront는 전세계 엣지 위치에서 S3 콘텐츠를 캐싱하는 AWS의 CDN입니다.', h2Faq: '자주 묻는 질문', faq1Q: 'S3 버킷에 공개 액세스를 허용해야 하나요?', faq1A: '정적 웹사이트 호스팅이나 진정으로 공개된 자산에만 허용하세요. 버킷을 비공개로 유지하고 서명된 URL을 사용하세요.', faq2Q: '서명된 URL은 얼마나 유효해야 하나요?', faq2A: '업로드 URL은 15-30분이 일반적입니다. 최대 유효 기간은 7일입니다.', faq3Q: 'S3 스토리지 비용을 줄이는 방법은?', faq3A: 'S3 Intelligent-Tiering과 수명 주기 규칙을 사용하세요.', faq4Q: '멀티파트 업로드란?', faq4A: '멀티파트 업로드는 대용량 파일을 병렬로 업로드되는 부분으로 분할합니다. 100MB 이상의 파일에 권장됩니다.', relatedTitle: '관련 도구' },
  id: { title: 'AWS S3 untuk Pengembang', intro: 'Amazon S3 adalah tulang punggung penyimpanan file untuk jutaan aplikasi. Panduan ini mencakup <strong>S3 SDK</strong>, <strong>URL yang ditandatangani</strong>, <strong>kebijakan bucket</strong>, dan integrasi dengan <strong>CloudFront</strong>.', h2Basics: 'Dasar S3: Bucket dan Objek', basicsP1: 'S3 menyimpan data sebagai objek di dalam bucket.', h2Upload: 'Mengunggah File dengan AWS SDK v3', uploadP1: 'AWS SDK v3 menggunakan desain modular untuk mengurangi ukuran bundle.', h2Presigned: 'URL yang Ditandatangani untuk Upload Langsung yang Aman', presignedP1: 'URL yang ditandatangani memungkinkan klien mengunggah langsung ke S3 tanpa melalui server.', h2Policy: 'Kebijakan Bucket dan Keamanan', policyP1: 'Kebijakan bucket S3 mengontrol akses di tingkat bucket dan objek.', h2CloudFront: 'Integrasi CloudFront CDN', cloudFrontP1: 'CloudFront adalah CDN AWS yang menyimpan konten S3 di lokasi edge di seluruh dunia.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Haruskah saya mengizinkan akses publik ke bucket S3 saya?', faq1A: 'Hanya untuk hosting website statis atau aset yang benar-benar publik. Jaga bucket tetap privat dan gunakan URL yang ditandatangani.', faq2Q: 'Berapa lama URL yang ditandatangani harus berlaku?', faq2A: '15-30 menit untuk URL upload. Masa berlaku maksimum adalah 7 hari.', faq3Q: 'Bagaimana mengurangi biaya penyimpanan S3?', faq3A: 'Gunakan S3 Intelligent-Tiering dan aturan siklus hidup.', faq4Q: 'Apa itu multipart upload?', faq4A: 'Multipart upload membagi file besar menjadi bagian yang diunggah secara paralel. Direkomendasikan untuk file lebih dari 100 MB.', relatedTitle: 'Alat Terkait' },
  th: { title: 'AWS S3 สำหรับนักพัฒนา', intro: 'Amazon S3 คือรากฐานของการจัดเก็บไฟล์สำหรับแอปพลิเคชันนับล้าน คู่มือนี้ครอบคลุม <strong>S3 SDK</strong>, <strong>Presigned URLs</strong>, <strong>Bucket Policies</strong> และการรวมกับ <strong>CloudFront</strong>', h2Basics: 'พื้นฐาน S3: Buckets และ Objects', basicsP1: 'S3 จัดเก็บข้อมูลเป็น objects ภายใน buckets', h2Upload: 'การอัปโหลดไฟล์ด้วย AWS SDK v3', uploadP1: 'AWS SDK v3 ใช้การออกแบบแบบ modular เพื่อลดขนาด bundle', h2Presigned: 'Presigned URLs สำหรับการอัปโหลดโดยตรงที่ปลอดภัย', presignedP1: 'Presigned URLs อนุญาตให้ client อัปโหลดโดยตรงไปยัง S3 โดยไม่ผ่านเซิร์ฟเวอร์', h2Policy: 'Bucket Policies และความปลอดภัย', policyP1: 'Bucket policies ของ S3 ควบคุมการเข้าถึงในระดับ bucket และ object', h2CloudFront: 'การรวม CloudFront CDN', cloudFrontP1: 'CloudFront คือ CDN ของ AWS ที่ cache เนื้อหา S3 ที่ edge locations ทั่วโลก', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'ควรอนุญาตการเข้าถึงแบบสาธารณะสำหรับ S3 bucket หรือไม่?', faq1A: 'เฉพาะสำหรับการโฮสต์เว็บไซต์แบบ static หรือ assets ที่สาธารณะจริงๆ เก็บ bucket ไว้เป็นส่วนตัวและใช้ presigned URLs', faq2Q: 'Presigned URLs ควรมีอายุกี่นาที?', faq2A: '15-30 นาทีสำหรับ upload URLs อายุสูงสุดคือ 7 วัน', faq3Q: 'จะลดค่าใช้จ่ายการจัดเก็บ S3 ได้อย่างไร?', faq3A: 'ใช้ S3 Intelligent-Tiering และ Lifecycle Rules', faq4Q: 'Multipart upload คืออะไร?', faq4A: 'Multipart upload แบ่งไฟล์ขนาดใหญ่ออกเป็นส่วนๆ ที่อัปโหลดแบบ parallel แนะนำสำหรับไฟล์ที่มีขนาดเกิน 100MB', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const uploadCode = `// AWS SDK v3 — File Upload to S3

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage'; // For multipart upload
import { fromEnv } from '@aws-sdk/credential-providers';

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: fromEnv(), // Reads AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
});

const BUCKET = process.env.S3_BUCKET_NAME!;

// 1. Simple upload (files \u003c 5MB)
async function uploadFile(key: string, file: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,           // e.g., 'uploads/2026/user-123/avatar.jpg'
    Body: file,
    ContentType: contentType,
    // Optional: set cache headers
    CacheControl: 'max-age=31536000',
    // Optional: make publicly readable
    // ACL: 'public-read',
    // Optional: custom metadata
    Metadata: {
      'uploaded-by': 'server',
      'original-name': 'avatar.jpg',
    },
  });

  const result = await s3.send(command);
  return {
    url: \`https://\${BUCKET}.s3.amazonaws.com/\${key}\`,
    etag: result.ETag,
    versionId: result.VersionId,
  };
}

// 2. Multipart upload for large files (recommended for \u003e 100MB)
async function uploadLargeFile(key: string, stream: NodeJS.ReadableStream, contentType: string) {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: BUCKET,
      Key: key,
      Body: stream,
      ContentType: contentType,
    },
    partSize: 10 * 1024 * 1024, // 10 MB parts
    queueSize: 4,                // 4 concurrent uploads
  });

  upload.on('httpUploadProgress', (progress) =\u003e {
    console.log(\`Uploaded: \${progress.loaded}/\${progress.total} bytes\`);
  });

  return upload.done();
}`;

const presignedCode = `// Presigned URLs — Direct Browser-to-S3 Upload

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

// Generate presigned upload URL (browser uploads directly to S3)
async function generateUploadUrl(
  fileName: string,
  fileType: string,
  userId: string
) {
  const key = \`uploads/\${userId}/\${randomUUID()}-\${fileName}\`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: fileType,
    // Optional: limit file size with Content-Length condition
    // This must be enforced server-side with a policy
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 15 * 60, // 15 minutes
  });

  return {
    uploadUrl: signedUrl,
    key,             // Return key so client can reference the uploaded file
    expiresIn: 900,  // seconds
  };
}

// Express.js endpoint
app.post('/api/upload-url', authenticate, async (req, res) =\u003e {
  const { fileName, fileType, fileSize } = req.body;

  // Validate file type and size on server
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(fileType)) {
    return res.status(400).json({ error: 'File type not allowed' });
  }
  if (fileSize \u003e 10 * 1024 * 1024) {  // 10 MB limit
    return res.status(400).json({ error: 'File too large' });
  }

  const { uploadUrl, key } = await generateUploadUrl(fileName, fileType, req.user.id);
  res.json({ uploadUrl, key });
});

// Client-side: use the presigned URL to upload
async function uploadToS3(file, presignedUrl) {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) throw new Error('Upload failed');
  return response;
}`;

const cloudFrontCode = `// CloudFront + S3 Setup

// 1. Bucket policy to allow CloudFront (Origin Access Control)
const bucketPolicy = {
  Version: '2012-10-17',
  Statement: [
    {
      Sid: 'AllowCloudFrontServicePrincipal',
      Effect: 'Allow',
      Principal: {
        Service: 'cloudfront.amazonaws.com',
      },
      Action: 's3:GetObject',
      Resource: \`arn:aws:s3:::my-bucket/*\`,
      Condition: {
        StringEquals: {
          'AWS:SourceArn': 'arn:aws:cloudfront::123456789:distribution/ABCDEF123456',
        },
      },
    },
  ],
};

// 2. Generate signed URLs for private CloudFront content
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

function generateCloudFrontSignedUrl(key: string, expirySeconds = 3600) {
  const url = \`https://\${process.env.CLOUDFRONT_DOMAIN}/\${key}\`;
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + expirySeconds);

  return getSignedUrl({
    url,
    keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID!,
    privateKey: process.env.CLOUDFRONT_PRIVATE_KEY!,
    dateLessThan: expiryDate.toISOString(),
  });
}

// 3. Invalidate CloudFront cache when S3 objects change
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });

async function invalidateCache(paths: string[]) {
  const command = new CreateInvalidationCommand({
    DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID!,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: paths.length,
        Items: paths.map(p =\u003e \`/\${p}\`),
      },
    },
  });

  return cloudfront.send(command);
}

// Usage: invalidate a specific file after update
await invalidateCache(['uploads/profile-pictures/user-123.jpg']);
// Wildcard: invalidate all files in a folder
await invalidateCache(['uploads/*']);`;

export default function AwsS3Guide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Basics}</h2>
      <p>{s.basicsP1}</p>
      <pre><code className="language-text">{`S3 Core Concepts:
  Bucket     — Top-level container (globally unique name, tied to a region)
  Object     — A file stored in a bucket (up to 5TB per object)
  Key        — The object's path/name: "uploads/2026/user-123/photo.jpg"
  Prefix     — Virtual folder: "uploads/2026/" (S3 has no real folders)
  Region     — Where the bucket lives: us-east-1, eu-west-1, ap-southeast-1

Storage Classes:
  Standard              — Frequently accessed data, 99.99% availability
  Standard-IA           — Infrequent access, lower cost, retrieval fee
  One Zone-IA           — Lower cost, single AZ (no cross-AZ replication)
  Intelligent-Tiering   — Auto-move between tiers based on access patterns
  Glacier Instant       — Archive with millisecond retrieval
  Glacier Flexible      — Archive with minutes-to-hours retrieval
  Glacier Deep Archive  — Cheapest storage, 12-48h retrieval`}</code></pre>

      <h2>{s.h2Upload}</h2>
      <p>{s.uploadP1}</p>
      <pre><code className="language-typescript">{uploadCode}</code></pre>

      <h2>{s.h2Presigned}</h2>
      <p>{s.presignedP1}</p>
      <pre><code className="language-typescript">{presignedCode}</code></pre>

      <h2>{s.h2CloudFront}</h2>
      <p>{s.cloudFrontP1}</p>
      <pre><code className="language-typescript">{cloudFrontCode}</code></pre>

      <h2>{s.h2Faq}</h2>
      <h3>{s.faq1Q}</h3>
      <p>{s.faq1A}</p>
      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>
      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>
      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/base64`}>Base64 Encoder/Decoder</Link></li>
        <li><Link href={`/${lang}/tools/url-parser`}>URL Parser</Link></li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link></li>
        <li><Link href={`/${lang}/blog/github-actions-docker`}>GitHub Actions + Docker CI/CD</Link></li>
        <li><Link href={`/${lang}/blog/nodejs-performance-tips`}>Node.js Performance Tips</Link></li>
      </ul>
    </>
  );
}
