'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Node.js Performance Optimization: Clustering, Streams, Profiling, and Caching',
    intro: 'Node.js can handle tens of thousands of concurrent connections on a single server — but only if you avoid the common performance pitfalls. This guide covers <strong>clustering</strong> to use all CPU cores, <strong>streams</strong> to avoid memory overflow, <strong>profiling</strong> to find bottlenecks, and <strong>caching strategies</strong> that can reduce response times by 90%.',
    h2EventLoop: 'Understanding the Event Loop',
    eventLoopP1: 'Node.js is single-threaded. Blocking the event loop blocks all requests. The most critical performance rule: never run CPU-intensive operations synchronously in the main thread.',
    h2Clustering: 'Clustering for Multi-Core Performance',
    clusterP1: 'Node.js runs on a single CPU core by default. The cluster module creates child processes that share the server port, utilizing all available CPU cores.',
    h2Streams: 'Streams for Memory Efficiency',
    streamsP1: 'Streams allow processing data piece-by-piece without loading everything into memory. Essential for file processing, HTTP responses, and database cursors.',
    h2Profiling: 'Profiling and Finding Bottlenecks',
    profilingP1: 'You cannot optimize what you cannot measure. Node.js provides built-in profiling tools and V8 inspector integration for finding performance bottlenecks.',
    h2Caching: 'Caching Strategies',
    cachingP1: 'Caching is the highest-impact performance optimization. Even a simple in-memory cache can reduce database load by 80-90% for read-heavy applications.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How many worker threads or cluster workers should I create?',
    faq1A: 'For cluster (multi-process): create one worker per CPU core, os.cpus().length workers. For worker_threads (CPU-intensive tasks): create a pool of threads equal to CPU cores minus 1 (to leave one for the event loop). Too many threads/processes causes context switching overhead.',
    faq2Q: 'When should I use streams vs loading data into memory?',
    faq2A: 'Use streams when: processing files larger than 10MB, piping data between sources (file to HTTP response), processing data that arrives incrementally, or when you need backpressure control. Load into memory only when: you need random access, data fits comfortably (under 100MB), or you need to do complex transformations on the entire dataset.',
    faq3Q: 'What is the --inspect flag and how do I use it?',
    faq3A: 'The --inspect flag starts Node.js with the V8 inspector protocol enabled. Open chrome://inspect in Chrome to attach DevTools to the Node.js process. You get the full Chrome DevTools including the Performance profiler, Memory profiler, and CPU profiler. Use --inspect-brk to break on the first line (useful for startup profiling).',
    faq4Q: 'Why is my Node.js app using so much memory?',
    faq4A: 'Common causes: (1) Memory leaks — event listeners not removed, closures holding references, (2) Caching without eviction policies, (3) Buffer misuse — creating buffers but not releasing them, (4) Large in-memory datasets instead of streaming. Use the --max-old-space-size flag to increase V8 heap size, but also profile memory with Chrome DevTools to find the actual cause.',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Optimisation des performances Node.js : clustering, streams, profilage et mise en cache', intro: 'Node.js peut gérer des dizaines de milliers de connexions simultanées sur un seul serveur. Ce guide couvre le <strong>clustering</strong>, les <strong>streams</strong>, le <strong>profilage</strong> et les <strong>stratégies de mise en cache</strong>.', h2EventLoop: 'Comprendre la boucle d\'événements', eventLoopP1: 'Node.js est monothread. Bloquer la boucle d\'événements bloque toutes les requêtes.', h2Clustering: 'Clustering pour les performances multi-coeurs', clusterP1: 'Node.js fonctionne sur un seul coeur CPU par défaut. Le module cluster crée des processus enfants qui partagent le port du serveur.', h2Streams: 'Streams pour l\'efficacité mémoire', streamsP1: 'Les streams permettent de traiter les données morceau par morceau sans tout charger en mémoire.', h2Profiling: 'Profilage et détection des goulots d\'étranglement', profilingP1: 'Vous ne pouvez pas optimiser ce que vous ne pouvez pas mesurer.', h2Caching: 'Stratégies de mise en cache', cachingP1: 'La mise en cache est l\'optimisation des performances à plus fort impact.', h2Faq: 'Questions fréquentes', faq1Q: 'Combien de workers de cluster créer ?', faq1A: 'Créez un worker par coeur CPU, os.cpus().length workers.', faq2Q: 'Quand utiliser les streams vs charger en mémoire ?', faq2A: 'Utilisez les streams pour les fichiers de plus de 10 Mo, le piping de données et le traitement incrémental.', faq3Q: 'Qu\'est-ce que le flag --inspect et comment l\'utiliser ?', faq3A: 'Le flag --inspect démarre Node.js avec le protocole V8 inspector activé. Ouvrez chrome://inspect dans Chrome.', faq4Q: 'Pourquoi mon app Node.js utilise-t-elle autant de mémoire ?', faq4A: 'Causes communes : fuites mémoire, caches sans éviction, grands ensembles de données en mémoire.', relatedTitle: 'Outils associés' },
  de: { title: 'Node.js Performance-Optimierung: Clustering, Streams, Profiling und Caching', intro: 'Node.js kann zehntausende gleichzeitige Verbindungen auf einem einzelnen Server verwalten. Dieser Leitfaden behandelt <strong>Clustering</strong>, <strong>Streams</strong>, <strong>Profiling</strong> und <strong>Caching-Strategien</strong>.', h2EventLoop: 'Die Ereignisschleife verstehen', eventLoopP1: 'Node.js ist single-threaded. Das Blockieren der Ereignisschleife blockiert alle Anfragen.', h2Clustering: 'Clustering für Multi-Core-Performance', clusterP1: 'Node.js läuft standardmäßig auf einem einzelnen CPU-Kern. Das Cluster-Modul erstellt Kindprozesse, die den Serverport teilen.', h2Streams: 'Streams für Speichereffizienz', streamsP1: 'Streams ermöglichen die stückweise Verarbeitung von Daten, ohne alles in den Speicher zu laden.', h2Profiling: 'Profiling und Engpässe finden', profilingP1: 'Sie können nicht optimieren, was Sie nicht messen können.', h2Caching: 'Caching-Strategien', cachingP1: 'Caching ist die wirkungsvollste Performance-Optimierung.', h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Wie viele Cluster-Worker sollte ich erstellen?', faq1A: 'Erstellen Sie einen Worker pro CPU-Kern, os.cpus().length Worker.', faq2Q: 'Wann sollte ich Streams vs. In-Memory-Laden verwenden?', faq2A: 'Verwenden Sie Streams für Dateien über 10 MB, Data-Piping und inkrementelle Verarbeitung.', faq3Q: 'Was ist das --inspect-Flag und wie verwende ich es?', faq3A: 'Das --inspect-Flag startet Node.js mit aktiviertem V8-Inspector-Protokoll. Öffnen Sie chrome://inspect in Chrome.', faq4Q: 'Warum verbraucht meine Node.js-App so viel Speicher?', faq4A: 'Häufige Ursachen: Speicherlecks, Caches ohne Eviction, große In-Memory-Datensätze.', relatedTitle: 'Verwandte Tools' },
  it: { title: 'Ottimizzazione delle prestazioni Node.js', intro: 'Node.js può gestire decine di migliaia di connessioni simultanee su un singolo server. Questa guida copre <strong>clustering</strong>, <strong>stream</strong>, <strong>profiling</strong> e <strong>strategie di caching</strong>.', h2EventLoop: 'Capire il ciclo degli eventi', eventLoopP1: 'Node.js è single-thread. Bloccare il ciclo degli eventi blocca tutte le richieste.', h2Clustering: 'Clustering per prestazioni multi-core', clusterP1: 'Node.js viene eseguito su un singolo core CPU per impostazione predefinita.', h2Streams: 'Stream per efficienza della memoria', streamsP1: 'Gli stream permettono di elaborare i dati pezzo per pezzo senza caricare tutto in memoria.', h2Profiling: 'Profiling e rilevamento dei colli di bottiglia', profilingP1: 'Non puoi ottimizzare ciò che non puoi misurare.', h2Caching: 'Strategie di caching', cachingP1: 'Il caching è l\'ottimizzazione delle prestazioni con il maggiore impatto.', h2Faq: 'Domande frequenti', faq1Q: 'Quanti worker del cluster creare?', faq1A: 'Crea un worker per core CPU, os.cpus().length worker.', faq2Q: 'Quando usare gli stream vs caricare in memoria?', faq2A: 'Usa gli stream per file superiori a 10 MB, piping di dati e elaborazione incrementale.', faq3Q: 'Cos\'è il flag --inspect?', faq3A: 'Il flag --inspect avvia Node.js con il protocollo V8 inspector abilitato.', faq4Q: 'Perché la mia app Node.js usa così tanta memoria?', faq4A: 'Cause comuni: perdite di memoria, cache senza eviction, grandi set di dati in memoria.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'Optimizacion de rendimiento de Node.js', intro: 'Node.js puede manejar decenas de miles de conexiones simultaneas en un solo servidor. Esta guia cubre <strong>clustering</strong>, <strong>streams</strong>, <strong>profiling</strong> y <strong>estrategias de caching</strong>.', h2EventLoop: 'Comprender el bucle de eventos', eventLoopP1: 'Node.js es de un solo hilo. Bloquear el bucle de eventos bloquea todas las solicitudes.', h2Clustering: 'Clustering para rendimiento multi-nucleo', clusterP1: 'Node.js se ejecuta en un solo nucleo de CPU por defecto.', h2Streams: 'Streams para eficiencia de memoria', streamsP1: 'Los streams permiten procesar datos pieza por pieza sin cargar todo en memoria.', h2Profiling: 'Profiling y busqueda de cuellos de botella', profilingP1: 'No puedes optimizar lo que no puedes medir.', h2Caching: 'Estrategias de caching', cachingP1: 'El caching es la optimizacion de rendimiento de mayor impacto.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Cuantos workers de cluster crear?', faq1A: 'Crea un worker por nucleo de CPU, os.cpus().length workers.', faq2Q: 'Cuando usar streams vs cargar en memoria?', faq2A: 'Usa streams para archivos mayores de 10 MB, piping de datos y procesamiento incremental.', faq3Q: 'Que es el flag --inspect?', faq3A: 'El flag --inspect inicia Node.js con el protocolo V8 inspector habilitado.', faq4Q: 'Por que mi app Node.js usa tanta memoria?', faq4A: 'Causas comunes: fugas de memoria, caches sin eviction, grandes conjuntos de datos en memoria.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Otimização de Performance do Node.js', intro: 'Node.js pode lidar com dezenas de milhares de conexões simultâneas em um único servidor. Este guia cobre <strong>clustering</strong>, <strong>streams</strong>, <strong>profiling</strong> e <strong>estratégias de caching</strong>.', h2EventLoop: 'Entendendo o Event Loop', eventLoopP1: 'Node.js é single-threaded. Bloquear o event loop bloqueia todas as requisições.', h2Clustering: 'Clustering para performance multi-core', clusterP1: 'Node.js roda em um único núcleo de CPU por padrão.', h2Streams: 'Streams para eficiência de memória', streamsP1: 'Streams permitem processar dados pedaço por pedaço sem carregar tudo na memória.', h2Profiling: 'Profiling e encontrando gargalos', profilingP1: 'Você não pode otimizar o que não pode medir.', h2Caching: 'Estratégias de caching', cachingP1: 'Caching é a otimização de performance de maior impacto.', h2Faq: 'Perguntas frequentes', faq1Q: 'Quantos workers de cluster devo criar?', faq1A: 'Crie um worker por núcleo de CPU, os.cpus().length workers.', faq2Q: 'Quando usar streams vs carregar na memória?', faq2A: 'Use streams para arquivos maiores que 10 MB, piping de dados e processamento incremental.', faq3Q: 'O que é a flag --inspect?', faq3A: 'A flag --inspect inicia Node.js com o protocolo V8 inspector habilitado.', faq4Q: 'Por que meu app Node.js usa tanta memória?', faq4A: 'Causas comuns: vazamentos de memória, caches sem eviction, grandes conjuntos de dados na memória.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Node.js Prestatieoptimalisatie', intro: 'Node.js kan tienduizenden gelijktijdige verbindingen op één server verwerken. Deze gids behandelt <strong>clustering</strong>, <strong>streams</strong>, <strong>profiling</strong> en <strong>cachingstrategieën</strong>.', h2EventLoop: 'De gebeurtenislus begrijpen', eventLoopP1: 'Node.js is single-threaded. Het blokkeren van de gebeurtenislus blokkeert alle verzoeken.', h2Clustering: 'Clustering voor multi-core prestaties', clusterP1: 'Node.js draait standaard op één CPU-kern.', h2Streams: 'Streams voor geheugenefficiëntie', streamsP1: 'Streams maken stukje-bij-beetje verwerking mogelijk zonder alles in geheugen te laden.', h2Profiling: 'Profiling en knelpunten vinden', profilingP1: 'U kunt niet optimaliseren wat u niet kunt meten.', h2Caching: 'Cachingstrategieën', cachingP1: 'Caching is de meest impactvolle prestatieoptimalisatie.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Hoeveel cluster-workers moet ik aanmaken?', faq1A: 'Maak één worker per CPU-kern, os.cpus().length workers.', faq2Q: 'Wanneer streams gebruiken vs in geheugen laden?', faq2A: 'Gebruik streams voor bestanden groter dan 10 MB, data-piping en incrementele verwerking.', faq3Q: 'Wat is de --inspect vlag?', faq3A: 'De --inspect vlag start Node.js met het V8 inspector protocol ingeschakeld.', faq4Q: 'Waarom gebruikt mijn Node.js app zo veel geheugen?', faq4A: 'Veelvoorkomende oorzaken: geheugenlekkages, caches zonder eviction, grote in-memory datasets.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Optymalizacja wydajności Node.js', intro: 'Node.js może obsługiwać dziesiątki tysięcy jednoczesnych połączeń na jednym serwerze. Ten przewodnik obejmuje <strong>clustering</strong>, <strong>strumienie</strong>, <strong>profilowanie</strong> i <strong>strategie buforowania</strong>.', h2EventLoop: 'Zrozumienie pętli zdarzeń', eventLoopP1: 'Node.js jest jednowątkowy. Blokowanie pętli zdarzeń blokuje wszystkie żądania.', h2Clustering: 'Clustering dla wydajności wielordzeniowej', clusterP1: 'Node.js domyślnie działa na jednym rdzeniu procesora.', h2Streams: 'Strumienie dla efektywności pamięci', streamsP1: 'Strumienie umożliwiają przetwarzanie danych kawałek po kawałku bez ładowania wszystkiego do pamięci.', h2Profiling: 'Profilowanie i znajdowanie wąskich gardeł', profilingP1: 'Nie możesz optymalizować tego, czego nie możesz zmierzyć.', h2Caching: 'Strategie buforowania', cachingP1: 'Buforowanie jest najbardziej wpływową optymalizacją wydajności.', h2Faq: 'Często zadawane pytania', faq1Q: 'Ile workerów klastra powinienem tworzyć?', faq1A: 'Utwórz jednego workera na rdzeń procesora, os.cpus().length workerów.', faq2Q: 'Kiedy używać strumieni vs ładowania do pamięci?', faq2A: 'Używaj strumieni dla plików powyżej 10 MB, pipingowania danych i przetwarzania przyrostowego.', faq3Q: 'Co to jest flaga --inspect?', faq3A: 'Flaga --inspect uruchamia Node.js z włączonym protokołem V8 inspector.', faq4Q: 'Dlaczego moja aplikacja Node.js używa tak dużo pamięci?', faq4A: 'Częste przyczyny: wycieki pamięci, cache bez eviction, duże zestawy danych w pamięci.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Node.js Prestandaoptimering', intro: 'Node.js kan hantera tiotusentals simultana anslutningar på en enda server. Den här guiden täcker <strong>clustering</strong>, <strong>strömmar</strong>, <strong>profiling</strong> och <strong>cachingstrategier</strong>.', h2EventLoop: 'Förstå händelseloopen', eventLoopP1: 'Node.js är single-threaded. Att blockera händelseloopen blockerar alla förfrågningar.', h2Clustering: 'Clustering för flerkärnsprestanda', clusterP1: 'Node.js körs som standard på en enda CPU-kärna.', h2Streams: 'Strömmar för minneseffektivitet', streamsP1: 'Strömmar möjliggör bit-för-bit-bearbetning utan att ladda allt i minnet.', h2Profiling: 'Profiling och hitta flaskhalsar', profilingP1: 'Du kan inte optimera det du inte kan mäta.', h2Caching: 'Cachingstrategier', cachingP1: 'Caching är den mest effektfulla prestandaoptimeringen.', h2Faq: 'Vanliga frågor', faq1Q: 'Hur många cluster-workers ska jag skapa?', faq1A: 'Skapa en worker per CPU-kärna, os.cpus().length workers.', faq2Q: 'När ska jag använda strömmar vs att ladda i minnet?', faq2A: 'Använd strömmar för filer större än 10 MB, piping av data och inkrementell bearbetning.', faq3Q: 'Vad är --inspect-flaggan?', faq3A: 'Flaggan --inspect startar Node.js med V8 inspector-protokollet aktiverat.', faq4Q: 'Varför använder min Node.js-app så mycket minne?', faq4A: 'Vanliga orsaker: minnesläckor, caches utan eviction, stora in-memory-dataset.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Node.js Ytelsesoptimalisering', intro: 'Node.js kan håndtere titusenvis av samtidige tilkoblinger på en enkelt server. Denne guiden dekker <strong>clustering</strong>, <strong>strømmer</strong>, <strong>profilering</strong> og <strong>cachingstrategier</strong>.', h2EventLoop: 'Forstå hendelsesløkken', eventLoopP1: 'Node.js er entrådet. Å blokkere hendelsesløkken blokkerer alle forespørsler.', h2Clustering: 'Clustering for flerkjerneprestasjon', clusterP1: 'Node.js kjører som standard på én CPU-kjerne.', h2Streams: 'Strømmer for minneeffektivitet', streamsP1: 'Strømmer muliggjør bit-for-bit-behandling uten å laste alt inn i minnet.', h2Profiling: 'Profilering og finn flaskehalser', profilingP1: 'Du kan ikke optimalisere det du ikke kan måle.', h2Caching: 'Cachingstrategier', cachingP1: 'Caching er den mest virkningsfulle ytelsesoptimaliseringen.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Hvor mange cluster-workere bør jeg opprette?', faq1A: 'Opprett én worker per CPU-kjerne, os.cpus().length workere.', faq2Q: 'Når bruke strømmer vs å laste i minnet?', faq2A: 'Bruk strømmer for filer større enn 10 MB, datapiping og inkrementell behandling.', faq3Q: 'Hva er --inspect-flagget?', faq3A: 'Flagget --inspect starter Node.js med V8 inspector-protokollen aktivert.', faq4Q: 'Hvorfor bruker min Node.js-app så mye minne?', faq4A: 'Vanlige årsaker: minnelekkasjer, caches uten eviction, store in-memory-datasett.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'Node.js 性能优化：集群、流、性能分析与缓存', intro: 'Node.js 在单台服务器上可处理数万个并发连接——但前提是避免常见的性能陷阱。本指南涵盖利用所有 CPU 核心的<strong>集群</strong>、避免内存溢出的<strong>流</strong>、查找瓶颈的<strong>性能分析</strong>，以及可将响应时间减少 90% 的<strong>缓存策略</strong>。', h2EventLoop: '理解事件循环', eventLoopP1: 'Node.js 是单线程的。阻塞事件循环会阻塞所有请求。最关键的性能规则：永远不要在主线程中同步运行 CPU 密集型操作。', h2Clustering: '集群实现多核性能', clusterP1: 'Node.js 默认只运行在单个 CPU 核上。cluster 模块可创建共享服务器端口的子进程，利用所有可用 CPU 核。', h2Streams: '流实现内存效率', streamsP1: '流允许逐块处理数据而不将所有内容加载到内存，对文件处理、HTTP 响应和数据库游标至关重要。', h2Profiling: '性能分析与查找瓶颈', profilingP1: '无法测量的东西无法优化。Node.js 提供内置分析工具和 V8 检查器集成。', h2Caching: '缓存策略', cachingP1: '缓存是影响最大的性能优化。即使简单的内存缓存也能将读密集型应用的数据库负载降低 80-90%。', h2Faq: '常见问题', faq1Q: '应该创建多少个 worker 线程或集群 worker？', faq1A: '集群（多进程）：每个 CPU 核创建一个 worker，即 os.cpus().length 个 worker。线程数过多会导致上下文切换开销。', faq2Q: '什么时候使用流而不是将数据加载到内存？', faq2A: '以下情况使用流：处理超过 10MB 的文件、在源之间管道传输数据、增量处理数据、或需要背压控制。', faq3Q: '--inspect 标志是什么，如何使用？', faq3A: '--inspect 标志以启用 V8 检查器协议启动 Node.js。在 Chrome 中打开 chrome://inspect 即可将 DevTools 附加到 Node.js 进程。', faq4Q: '为什么我的 Node.js 应用使用这么多内存？', faq4A: '常见原因：内存泄漏（未移除的事件监听器、闭包持有引用）、无淘汰策略的缓存、Buffer 误用。', relatedTitle: '相关工具' },
  ja: { title: 'Node.jsパフォーマンス最適化：クラスタリング、ストリーム、プロファイリング、キャッシュ', intro: 'Node.jsは単一サーバーで数万の同時接続を処理できます。このガイドでは<strong>クラスタリング</strong>、<strong>ストリーム</strong>、<strong>プロファイリング</strong>、<strong>キャッシュ戦略</strong>を解説します。', h2EventLoop: 'イベントループを理解する', eventLoopP1: 'Node.jsはシングルスレッドです。イベントループをブロックするとすべてのリクエストがブロックされます。', h2Clustering: 'マルチコアパフォーマンスのためのクラスタリング', clusterP1: 'Node.jsはデフォルトで単一CPUコアで動作します。clusterモジュールでサーバーポートを共有する子プロセスを作成できます。', h2Streams: 'メモリ効率のためのストリーム', streamsP1: 'ストリームはすべてをメモリにロードせずにデータを少しずつ処理します。', h2Profiling: 'プロファイリングとボトルネックの発見', profilingP1: '測定できないものは最適化できません。', h2Caching: 'キャッシュ戦略', cachingP1: 'キャッシングは最も影響力のあるパフォーマンス最適化です。', h2Faq: 'よくある質問', faq1Q: 'ワーカースレッドやクラスターワーカーをいくつ作るべきか？', faq1A: 'クラスターはCPUコアごとに1ワーカー、os.cpus().length個作成してください。', faq2Q: 'ストリームvs メモリへのロードはいつ使うべきか？', faq2A: '10MB超のファイル処理、データパイピング、インクリメンタル処理にはストリームを使用してください。', faq3Q: '--inspectフラグとは何か？', faq3A: '--inspectフラグはV8インスペクタープロトコルを有効にしてNode.jsを起動します。', faq4Q: 'なぜNode.jsアプリがこんなにメモリを使うのか？', faq4A: '一般的な原因：メモリリーク、eviction なしのキャッシュ、大量のインメモリデータセット。', relatedTitle: '関連ツール' },
  ko: { title: 'Node.js 성능 최적화: 클러스터링, 스트림, 프로파일링, 캐싱', intro: 'Node.js는 단일 서버에서 수만 건의 동시 연결을 처리할 수 있습니다. 이 가이드는 <strong>클러스터링</strong>, <strong>스트림</strong>, <strong>프로파일링</strong>, <strong>캐싱 전략</strong>을 다룹니다.', h2EventLoop: '이벤트 루프 이해', eventLoopP1: 'Node.js는 단일 스레드입니다. 이벤트 루프를 차단하면 모든 요청이 차단됩니다.', h2Clustering: '멀티코어 성능을 위한 클러스터링', clusterP1: 'Node.js는 기본적으로 단일 CPU 코어에서 실행됩니다.', h2Streams: '메모리 효율을 위한 스트림', streamsP1: '스트림은 모든 것을 메모리에 로드하지 않고 데이터를 조각별로 처리합니다.', h2Profiling: '프로파일링 및 병목 현상 찾기', profilingP1: '측정할 수 없는 것은 최적화할 수 없습니다.', h2Caching: '캐싱 전략', cachingP1: '캐싱은 가장 영향력 있는 성능 최적화입니다.', h2Faq: '자주 묻는 질문', faq1Q: '클러스터 워커는 얼마나 만들어야 하나요?', faq1A: 'CPU 코어당 하나의 워커를 생성하세요, os.cpus().length개의 워커.', faq2Q: '스트림 vs 메모리 로드 중 언제 사용해야 하나요?', faq2A: '10MB 이상의 파일 처리, 데이터 파이핑, 점진적 처리에 스트림을 사용하세요.', faq3Q: '--inspect 플래그란?', faq3A: '--inspect 플래그는 V8 인스펙터 프로토콜이 활성화된 상태로 Node.js를 시작합니다.', faq4Q: '왜 Node.js 앱이 메모리를 많이 사용하나요?', faq4A: '일반적인 원인: 메모리 누수, 제거 정책 없는 캐시, 대용량 인메모리 데이터셋.', relatedTitle: '관련 도구' },
  id: { title: 'Optimasi Performa Node.js', intro: 'Node.js dapat menangani puluhan ribu koneksi bersamaan di satu server. Panduan ini mencakup <strong>clustering</strong>, <strong>stream</strong>, <strong>profiling</strong>, dan <strong>strategi caching</strong>.', h2EventLoop: 'Memahami Event Loop', eventLoopP1: 'Node.js bersifat single-threaded. Memblokir event loop memblokir semua permintaan.', h2Clustering: 'Clustering untuk Performa Multi-Core', clusterP1: 'Node.js berjalan di satu inti CPU secara default.', h2Streams: 'Stream untuk Efisiensi Memori', streamsP1: 'Stream memungkinkan pemrosesan data sepotong demi sepotong tanpa memuat semuanya ke memori.', h2Profiling: 'Profiling dan Menemukan Bottleneck', profilingP1: 'Anda tidak dapat mengoptimalkan apa yang tidak dapat Anda ukur.', h2Caching: 'Strategi Caching', cachingP1: 'Caching adalah optimasi performa yang paling berdampak.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Berapa banyak worker cluster yang harus saya buat?', faq1A: 'Buat satu worker per inti CPU, os.cpus().length worker.', faq2Q: 'Kapan menggunakan stream vs memuat ke memori?', faq2A: 'Gunakan stream untuk file lebih dari 10 MB, piping data, dan pemrosesan inkremental.', faq3Q: 'Apa itu flag --inspect?', faq3A: 'Flag --inspect memulai Node.js dengan protokol V8 inspector diaktifkan.', faq4Q: 'Mengapa app Node.js saya menggunakan banyak memori?', faq4A: 'Penyebab umum: kebocoran memori, cache tanpa eviction, dataset besar di memori.', relatedTitle: 'Alat Terkait' },
  th: { title: 'การปรับแต่งประสิทธิภาพ Node.js', intro: 'Node.js สามารถจัดการการเชื่อมต่อพร้อมกันหลายหมื่นรายการบนเซิร์ฟเวอร์เดียว คู่มือนี้ครอบคลุม <strong>clustering</strong>, <strong>streams</strong>, <strong>profiling</strong> และ <strong>กลยุทธ์การ caching</strong>', h2EventLoop: 'ทำความเข้าใจ Event Loop', eventLoopP1: 'Node.js เป็น single-threaded การบล็อก event loop จะบล็อกคำขอทั้งหมด', h2Clustering: 'Clustering สำหรับประสิทธิภาพ Multi-Core', clusterP1: 'Node.js ทำงานบน CPU core เดียวโดยค่าเริ่มต้น', h2Streams: 'Streams สำหรับประสิทธิภาพหน่วยความจำ', streamsP1: 'Streams ช่วยให้ประมวลผลข้อมูลทีละส่วนโดยไม่ต้องโหลดทั้งหมดเข้าหน่วยความจำ', h2Profiling: 'Profiling และการหา Bottleneck', profilingP1: 'คุณไม่สามารถปรับแต่งสิ่งที่วัดไม่ได้', h2Caching: 'กลยุทธ์การ Caching', cachingP1: 'Caching เป็นการปรับแต่งประสิทธิภาพที่มีผลกระทบสูงที่สุด', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'ควรสร้าง worker threads หรือ cluster workers กี่ตัว?', faq1A: 'สำหรับ cluster: สร้าง worker หนึ่งตัวต่อ CPU core, os.cpus().length workers', faq2Q: 'เมื่อไหร่ควรใช้ streams vs โหลดข้อมูลเข้าหน่วยความจำ?', faq2A: 'ใช้ streams สำหรับไฟล์ขนาดเกิน 10MB การ pipe ข้อมูล และการประมวลผลแบบ incremental', faq3Q: 'flag --inspect คืออะไร?', faq3A: 'flag --inspect เริ่มต้น Node.js โดยเปิดใช้งาน V8 inspector protocol', faq4Q: 'ทำไมแอป Node.js ของฉันถึงใช้หน่วยความจำมากขนาดนี้?', faq4A: 'สาเหตุทั่วไป: memory leaks, cache โดยไม่มี eviction policy, dataset ขนาดใหญ่ใน memory', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const clusterCode = `// Node.js Cluster Module — Use All CPU Cores
const cluster = require('cluster');
const os = require('os');
const express = require('express');

const NUM_WORKERS = os.cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);
  console.log(\`Starting \${NUM_WORKERS} workers...\`);

  // Fork workers
  for (let i = 0; i \u003c NUM_WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) =\u003e {
    console.log(\`Worker \${worker.process.pid} died (\${signal || code}). Restarting...\`);
    cluster.fork(); // Auto-restart crashed workers
  });

  cluster.on('online', (worker) =\u003e {
    console.log(\`Worker \${worker.process.pid} is online\`);
  });

} else {
  // Worker process — runs the actual server
  const app = express();

  app.get('/api/users', async (req, res) =\u003e {
    const users = await db.getUsers();
    res.json(users);
  });

  app.listen(3000, () =\u003e {
    console.log(\`Worker \${process.pid} listening on port 3000\`);
  });
}

// Alternative: PM2 cluster mode (recommended for production)
// pm2 start server.js -i max   # auto-detect CPU count
// pm2 start server.js -i 4     # explicit count`;

const streamsCode = `// Node.js Streams — Memory-Efficient Processing

const fs = require('fs');
const { Transform, pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

// 1. Stream a large file as HTTP response (no memory buffering)
app.get('/download/large-file', (req, res) =\u003e {
  const filePath = './large-file.csv';
  const stat = fs.statSync(filePath);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

  // Pipe file directly to response — never fully in memory
  fs.createReadStream(filePath).pipe(res);
});

// 2. Transform stream for CSV processing
class CsvParser extends Transform {
  constructor() {
    super({ objectMode: true });
    this.buffer = '';
    this.headers = null;
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\\n');
    this.buffer = lines.pop(); // Keep incomplete line in buffer

    for (const line of lines) {
      if (!this.headers) {
        this.headers = line.split(',');
        continue;
      }
      const values = line.split(',');
      const record = {};
      this.headers.forEach((h, i) =\u003e record[h.trim()] = values[i]?.trim());
      this.push(record);
    }
    callback();
  }
}

// 3. Pipeline for reliable error handling
async function processLargeCsvFile(inputPath, outputPath) {
  await pipelineAsync(
    fs.createReadStream(inputPath),
    new CsvParser(),
    new Transform({
      objectMode: true,
      transform(record, enc, cb) {
        // Transform each record
        record.processed = true;
        cb(null, JSON.stringify(record) + '\\n');
      }
    }),
    fs.createWriteStream(outputPath)
  );
  console.log('Processing complete');
}`;

const cachingCode = `// Caching Strategies for Node.js

// 1. In-Memory LRU Cache
const { LRUCache } = require('lru-cache');

const cache = new LRUCache({
  max: 500,           // Maximum 500 items
  ttl: 5 * 60 * 1000, // 5 minutes TTL
  allowStale: true,   // Return stale value while refreshing
  updateAgeOnGet: true,
});

async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const user = await db.findUser(id);
  cache.set(cacheKey, user);
  return user;
}

// 2. Redis Cache with Stale-While-Revalidate
const Redis = require('ioredis');
const redis = new Redis();

async function getCachedData(key, fetchFn, ttl = 300) {
  const [cached, ttlRemaining] = await redis.pipeline()
    .get(key)
    .ttl(key)
    .exec();

  if (cached[1]) {
    const data = JSON.parse(cached[1]);

    // Background refresh when \u003c 60 seconds remaining
    if (ttlRemaining[1] \u003c 60) {
      fetchFn().then(fresh =\u003e
        redis.setex(key, ttl, JSON.stringify(fresh))
      );
    }

    return data;
  }

  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}

// 3. HTTP Response Caching with ETags
app.get('/api/products', async (req, res) =\u003e {
  const products = await getProducts();
  const etag = require('crypto')
    .createHash('md5')
    .update(JSON.stringify(products))
    .digest('hex');

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }

  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  res.json(products);
});`;

export default function NodejsPerformanceTips({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2EventLoop}</h2>
      <p>{s.eventLoopP1}</p>
      <pre><code className="language-javascript">{`// NEVER do this — blocks the event loop
app.get('/compute', (req, res) => {
  // Synchronous CPU-heavy computation blocks ALL requests
  let result = 0;
  for (let i = 0; i < 1e9; i++) result += i;  // 1 billion iterations!
  res.json({ result });
});

// DO THIS instead — offload to worker thread
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

app.get('/compute', (req, res) => {
  const worker = new Worker('./computeWorker.js', {
    workerData: { input: req.query.n }
  });
  worker.on('message', result => res.json({ result }));
  worker.on('error', err => res.status(500).json({ error: err.message }));
});`}</code></pre>

      <h2>{s.h2Clustering}</h2>
      <p>{s.clusterP1}</p>
      <pre><code className="language-javascript">{clusterCode}</code></pre>

      <h2>{s.h2Streams}</h2>
      <p>{s.streamsP1}</p>
      <pre><code className="language-javascript">{streamsCode}</code></pre>

      <h2>{s.h2Caching}</h2>
      <p>{s.cachingP1}</p>
      <pre><code className="language-javascript">{cachingCode}</code></pre>

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
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link></li>
        <li><Link href={`/${lang}/tools/cron-parser`}>Cron Parser</Link></li>
        <li><Link href={`/${lang}/blog/javascript-error-handling`}>JavaScript Error Handling</Link></li>
        <li><Link href={`/${lang}/blog/aws-s3-guide`}>AWS S3 for Developers</Link></li>
      </ul>
    </>
  );
}
