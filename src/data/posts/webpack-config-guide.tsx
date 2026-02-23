'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Webpack 5 Configuration Guide: Loaders, Plugins, Optimization, and Code Splitting',
    intro: 'Webpack 5 remains the dominant bundler for large-scale production applications, particularly those requiring <strong>Module Federation</strong>, complex code splitting, or migration from legacy setups. This guide covers everything from basic loaders to advanced optimization techniques that reduce bundle sizes by 40-60%.',
    h2Basics: 'Webpack 5 Basics and Entry/Output',
    basicsP1: 'The webpack.config.js file controls all bundling behavior. Understanding the core concepts — entry, output, mode, and resolve — is essential before diving into loaders and plugins.',
    h2Loaders: 'Essential Loaders',
    loadersP1: 'Loaders transform files before they are added to the dependency graph. Each loader handles a specific file type or transformation.',
    h2Plugins: 'Key Plugins',
    pluginsP1: 'Plugins tap into the webpack compilation lifecycle to perform a wide range of tasks including bundle analysis, HTML generation, and environment variable injection.',
    h2CodeSplitting: 'Code Splitting and Lazy Loading',
    codeSplitP1: 'Code splitting is Webpack\'s most important optimization feature. It splits your code into multiple bundles that can be loaded on demand, reducing initial load time.',
    h2Optimization: 'Production Optimization',
    optimP1: 'Production builds require aggressive optimization to minimize bundle sizes. Webpack 5\'s built-in optimizations plus careful configuration can achieve significant size reductions.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'When should I use Webpack instead of Vite?',
    faq1A: 'Choose Webpack for: Module Federation (micro-frontends), very large existing codebases with complex Webpack configs, specific loaders with no Vite equivalent, or when you need IE11 support. For new projects in 2026, Vite is usually the better choice.',
    faq2Q: 'How do I analyze my Webpack bundle size?',
    faq2A: 'Use webpack-bundle-analyzer: npm install --save-dev webpack-bundle-analyzer, then add it as a plugin with BundleAnalyzerPlugin. Run your build and it opens an interactive treemap showing what\'s consuming your bundle size. Focus on the largest rectangles first.',
    faq3Q: 'What is Module Federation in Webpack 5?',
    faq3A: 'Module Federation allows multiple separate Webpack builds to share code at runtime without a shared build process. Each application can expose components/modules and consume from others. It\'s the primary architecture for micro-frontends at scale.',
    faq4Q: 'Why is my Webpack build so slow?',
    faq4A: 'Common causes: (1) No persistent caching (add cache: { type: "filesystem" }), (2) Too many loaders in chain, (3) babel-loader without exclude: /node_modules/, (4) large devtool source maps in development, (5) not using thread-loader for parallel builds. Enable cache first as it provides the biggest speedup.',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Guide de configuration Webpack 5 : loaders, plugins, optimisation et code splitting', intro: 'Webpack 5 reste le bundler dominant pour les applications de production à grande échelle. Ce guide couvre tout, des loaders de base aux techniques d\'optimisation avancées réduisant la taille des bundles de 40 à 60%.', h2Basics: 'Bases de Webpack 5 et entrée/sortie', basicsP1: 'Le fichier webpack.config.js contrôle tout le comportement de bundling.', h2Loaders: 'Loaders essentiels', loadersP1: 'Les loaders transforment les fichiers avant qu\'ils ne soient ajoutés au graphe de dépendances.', h2Plugins: 'Plugins clés', pluginsP1: 'Les plugins s\'intègrent dans le cycle de compilation webpack.', h2CodeSplitting: 'Code splitting et chargement paresseux', codeSplitP1: 'Le code splitting est la fonctionnalité d\'optimisation la plus importante de Webpack.', h2Optimization: 'Optimisation de production', optimP1: 'Les builds de production nécessitent une optimisation agressive.', h2Faq: 'Questions fréquentes', faq1Q: 'Quand utiliser Webpack plutôt que Vite ?', faq1A: 'Choisissez Webpack pour Module Federation, les grandes codebases existantes, ou quand vous avez besoin du support IE11.', faq2Q: 'Comment analyser la taille de mon bundle Webpack ?', faq2A: 'Utilisez webpack-bundle-analyzer pour visualiser ce qui consomme votre taille de bundle.', faq3Q: 'Qu\'est-ce que Module Federation dans Webpack 5 ?', faq3A: 'Module Federation permet à plusieurs builds Webpack de partager du code à l\'exécution pour les micro-frontends.', faq4Q: 'Pourquoi mon build Webpack est-il si lent ?', faq4A: 'Causes communes : pas de cache persistant, trop de loaders, babel sans exclude node_modules.', relatedTitle: 'Outils associés' },
  de: { title: 'Webpack 5 Konfigurationshandbuch: Loader, Plugins, Optimierung und Code-Splitting', intro: 'Webpack 5 bleibt der dominante Bundler für groß angelegte Produktionsanwendungen. Dieser Leitfaden deckt alles von grundlegenden Loadern bis zu fortgeschrittenen Optimierungstechniken ab.', h2Basics: 'Webpack 5 Grundlagen und Entry/Output', basicsP1: 'Die webpack.config.js-Datei steuert das gesamte Bundling-Verhalten.', h2Loaders: 'Wesentliche Loader', loadersP1: 'Loader transformieren Dateien, bevor sie dem Abhängigkeitsgraphen hinzugefügt werden.', h2Plugins: 'Schlüssel-Plugins', pluginsP1: 'Plugins greifen in den Webpack-Kompilierungslebenszyklus ein.', h2CodeSplitting: 'Code-Splitting und Lazy Loading', codeSplitP1: 'Code-Splitting ist Webpacks wichtigste Optimierungsfunktion.', h2Optimization: 'Produktionsoptimierung', optimP1: 'Produktions-Builds erfordern aggressive Optimierung.', h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Wann sollte ich Webpack statt Vite verwenden?', faq1A: 'Wählen Sie Webpack für Module Federation, große bestehende Codebasen oder IE11-Unterstützung.', faq2Q: 'Wie analysiere ich meine Webpack-Bundle-Größe?', faq2A: 'Verwenden Sie webpack-bundle-analyzer für interaktive Visualisierung.', faq3Q: 'Was ist Module Federation in Webpack 5?', faq3A: 'Module Federation ermöglicht mehreren Webpack-Builds, Code zur Laufzeit zu teilen.', faq4Q: 'Warum ist mein Webpack-Build so langsam?', faq4A: 'Häufige Ursachen: Kein persistentes Caching, zu viele Loader, babel ohne node_modules exclude.', relatedTitle: 'Verwandte Tools' },
  it: { title: 'Guida alla configurazione di Webpack 5', intro: 'Webpack 5 rimane il bundler dominante per applicazioni di produzione su larga scala. Questa guida copre dai loader di base alle tecniche di ottimizzazione avanzate.', h2Basics: 'Basi di Webpack 5 ed entry/output', basicsP1: 'Il file webpack.config.js controlla tutto il comportamento di bundling.', h2Loaders: 'Loader essenziali', loadersP1: 'I loader trasformano i file prima che vengano aggiunti al grafo delle dipendenze.', h2Plugins: 'Plugin chiave', pluginsP1: 'I plugin si integrano nel ciclo di vita di compilazione webpack.', h2CodeSplitting: 'Code splitting e lazy loading', codeSplitP1: 'Il code splitting è la funzione di ottimizzazione più importante di Webpack.', h2Optimization: 'Ottimizzazione per la produzione', optimP1: 'Le build di produzione richiedono un\'ottimizzazione aggressiva.', h2Faq: 'Domande frequenti', faq1Q: 'Quando usare Webpack invece di Vite?', faq1A: 'Scegli Webpack per Module Federation, codebase grandi esistenti, o supporto IE11.', faq2Q: 'Come analizzare le dimensioni del bundle Webpack?', faq2A: 'Usa webpack-bundle-analyzer per visualizzare cosa consuma la dimensione del bundle.', faq3Q: 'Cos\'è Module Federation in Webpack 5?', faq3A: 'Module Federation permette a più build Webpack di condividere codice a runtime per i micro-frontend.', faq4Q: 'Perché la mia build Webpack è così lenta?', faq4A: 'Cause comuni: nessuna cache persistente, troppi loader, babel senza escludere node_modules.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'Guia de configuracion de Webpack 5', intro: 'Webpack 5 sigue siendo el bundler dominante para aplicaciones de produccion a gran escala. Esta guia cubre desde loaders basicos hasta tecnicas de optimizacion avanzadas.', h2Basics: 'Conceptos basicos de Webpack 5 y entry/output', basicsP1: 'El archivo webpack.config.js controla todo el comportamiento de bundling.', h2Loaders: 'Loaders esenciales', loadersP1: 'Los loaders transforman archivos antes de agregarlos al grafo de dependencias.', h2Plugins: 'Plugins clave', pluginsP1: 'Los plugins se integran en el ciclo de compilacion de webpack.', h2CodeSplitting: 'Code splitting y carga diferida', codeSplitP1: 'El code splitting es la caracteristica de optimizacion mas importante de Webpack.', h2Optimization: 'Optimizacion de produccion', optimP1: 'Las builds de produccion requieren optimizacion agresiva.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Cuando usar Webpack en lugar de Vite?', faq1A: 'Elige Webpack para Module Federation, grandes codebases existentes o soporte IE11.', faq2Q: 'Como analizar el tamano del bundle Webpack?', faq2A: 'Usa webpack-bundle-analyzer para visualizar que consume el tamano del bundle.', faq3Q: 'Que es Module Federation en Webpack 5?', faq3A: 'Module Federation permite que multiples builds de Webpack compartan codigo en tiempo de ejecucion.', faq4Q: 'Por que mi build de Webpack es tan lenta?', faq4A: 'Causas comunes: sin cache persistente, demasiados loaders, babel sin excluir node_modules.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Guia de configuração do Webpack 5', intro: 'Webpack 5 continua sendo o bundler dominante para aplicações de produção em larga escala. Este guia cobre desde loaders básicos até técnicas avançadas de otimização.', h2Basics: 'Básicos do Webpack 5 e entry/output', basicsP1: 'O arquivo webpack.config.js controla todo o comportamento de bundling.', h2Loaders: 'Loaders essenciais', loadersP1: 'Loaders transformam arquivos antes de adicioná-los ao grafo de dependências.', h2Plugins: 'Plugins principais', pluginsP1: 'Plugins se integram ao ciclo de vida de compilação do webpack.', h2CodeSplitting: 'Code splitting e lazy loading', codeSplitP1: 'O code splitting é a funcionalidade de otimização mais importante do Webpack.', h2Optimization: 'Otimização de produção', optimP1: 'Builds de produção requerem otimização agressiva.', h2Faq: 'Perguntas frequentes', faq1Q: 'Quando usar Webpack em vez de Vite?', faq1A: 'Escolha Webpack para Module Federation, grandes codebases existentes ou suporte IE11.', faq2Q: 'Como analisar o tamanho do bundle Webpack?', faq2A: 'Use webpack-bundle-analyzer para visualizar o que consome o tamanho do bundle.', faq3Q: 'O que é Module Federation no Webpack 5?', faq3A: 'Module Federation permite que múltiplos builds Webpack compartilhem código em runtime.', faq4Q: 'Por que meu build Webpack é tão lento?', faq4A: 'Causas comuns: sem cache persistente, muitos loaders, babel sem excluir node_modules.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Webpack 5 Configuratiegids', intro: 'Webpack 5 blijft de dominante bundler voor grootschalige productietoepassingen. Deze gids behandelt alles van basisloaders tot geavanceerde optimalisatietechnieken.', h2Basics: 'Webpack 5 basisprincipes en entry/output', basicsP1: 'Het webpack.config.js-bestand beheert al het bundlinggedrag.', h2Loaders: 'Essentiële loaders', loadersP1: 'Loaders transformeren bestanden voordat ze worden toegevoegd aan de afhankelijkheidsgraph.', h2Plugins: 'Sleutelplugins', pluginsP1: 'Plugins koppelen in aan de webpack-compilatielevenscyclus.', h2CodeSplitting: 'Code splitting en lazy loading', codeSplitP1: 'Code splitting is de belangrijkste optimalisatiefunctie van Webpack.', h2Optimization: 'Productieoptimalisatie', optimP1: 'Productiebuilds vereisen agressieve optimalisatie.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Wanneer Webpack gebruiken in plaats van Vite?', faq1A: 'Kies Webpack voor Module Federation, grote bestaande codebases of IE11-ondersteuning.', faq2Q: 'Hoe analyseer ik mijn Webpack-bundelgrootte?', faq2A: 'Gebruik webpack-bundle-analyzer voor interactieve visualisatie.', faq3Q: 'Wat is Module Federation in Webpack 5?', faq3A: 'Module Federation staat meerdere Webpack-builds toe om code te delen tijdens runtime.', faq4Q: 'Waarom is mijn Webpack-build zo traag?', faq4A: 'Veelvoorkomende oorzaken: geen persistent caching, te veel loaders, babel zonder node_modules uitsluiten.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Przewodnik po konfiguracji Webpack 5', intro: 'Webpack 5 pozostaje dominującym bundlerem dla dużych aplikacji produkcyjnych. Ten przewodnik obejmuje wszystko od podstawowych loaderów po zaawansowane techniki optymalizacji.', h2Basics: 'Podstawy Webpack 5 i entry/output', basicsP1: 'Plik webpack.config.js kontroluje całe zachowanie bundlowania.', h2Loaders: 'Podstawowe loadery', loadersP1: 'Loadery transformują pliki przed dodaniem ich do grafu zależności.', h2Plugins: 'Kluczowe wtyczki', pluginsP1: 'Wtyczki integrują się z cyklem życia kompilacji webpacka.', h2CodeSplitting: 'Podział kodu i lazy loading', codeSplitP1: 'Podział kodu jest najważniejszą funkcją optymalizacji Webpacka.', h2Optimization: 'Optymalizacja produkcyjna', optimP1: 'Buildy produkcyjne wymagają agresywnej optymalizacji.', h2Faq: 'Często zadawane pytania', faq1Q: 'Kiedy używać Webpack zamiast Vite?', faq1A: 'Wybierz Webpack dla Module Federation, dużych istniejących baz kodu lub obsługi IE11.', faq2Q: 'Jak przeanalizować rozmiar pakietu Webpack?', faq2A: 'Użyj webpack-bundle-analyzer do interaktywnej wizualizacji.', faq3Q: 'Czym jest Module Federation w Webpack 5?', faq3A: 'Module Federation pozwala wielu kompilacjom Webpack na współdzielenie kodu w czasie działania.', faq4Q: 'Dlaczego mój build Webpack jest tak wolny?', faq4A: 'Częste przyczyny: brak trwałego buforowania, zbyt wiele loaderów, babel bez wykluczenia node_modules.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Webpack 5 Konfigurationsguide', intro: 'Webpack 5 är fortfarande den dominanta bundlern för storskaliga produktionsapplikationer. Denna guide täcker allt från grundläggande loaders till avancerade optimeringstekniker.', h2Basics: 'Webpack 5 grunder och entry/output', basicsP1: 'Filen webpack.config.js styr allt bundlingbeteende.', h2Loaders: 'Viktiga loaders', loadersP1: 'Loaders transformerar filer innan de läggs till beroendegrafen.', h2Plugins: 'Nyckelplugins', pluginsP1: 'Plugins kopplar in i webpack-kompileringens livscykel.', h2CodeSplitting: 'Koddelning och lazy loading', codeSplitP1: 'Koddelning är Webpacks viktigaste optimeringsfunktion.', h2Optimization: 'Produktionsoptimering', optimP1: 'Produktionsbyggen kräver aggressiv optimering.', h2Faq: 'Vanliga frågor', faq1Q: 'När ska jag använda Webpack istället för Vite?', faq1A: 'Välj Webpack för Module Federation, stora befintliga kodbaser eller IE11-stöd.', faq2Q: 'Hur analyserar jag min Webpack-bundelstorlek?', faq2A: 'Använd webpack-bundle-analyzer för interaktiv visualisering.', faq3Q: 'Vad är Module Federation i Webpack 5?', faq3A: 'Module Federation tillåter flera Webpack-builds att dela kod vid körning.', faq4Q: 'Varför är min Webpack-build så långsam?', faq4A: 'Vanliga orsaker: ingen persistent caching, för många loaders, babel utan node_modules-undantag.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Webpack 5 Konfigurasjonsguide', intro: 'Webpack 5 er fortsatt den dominerende bundleren for storskala produksjonsapplikasjoner. Denne guiden dekker alt fra grunnleggende loaders til avanserte optimaliseringsteknikker.', h2Basics: 'Webpack 5 grunnleggende og entry/output', basicsP1: 'Filen webpack.config.js styrer all bundlingadferd.', h2Loaders: 'Viktige loaders', loadersP1: 'Loaders transformerer filer før de legges til avhengighetsgrafen.', h2Plugins: 'Nøkkelplugins', pluginsP1: 'Plugins kobler seg inn i webpack-kompileringens livssyklus.', h2CodeSplitting: 'Kodedeling og lazy loading', codeSplitP1: 'Kodedeling er Webpacks viktigste optimaliseringsfunksjon.', h2Optimization: 'Produksjonsoptimalisering', optimP1: 'Produksjonsbygger krever aggressiv optimalisering.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Når bør jeg bruke Webpack i stedet for Vite?', faq1A: 'Velg Webpack for Module Federation, store eksisterende kodebaser eller IE11-støtte.', faq2Q: 'Hvordan analyserer jeg Webpack-bundelstørrelsen min?', faq2A: 'Bruk webpack-bundle-analyzer for interaktiv visualisering.', faq3Q: 'Hva er Module Federation i Webpack 5?', faq3A: 'Module Federation lar flere Webpack-bygg dele kode ved kjøring.', faq4Q: 'Hvorfor er Webpack-bygget mitt så tregt?', faq4A: 'Vanlige årsaker: ingen vedvarende caching, for mange loaders, babel uten å ekskludere node_modules.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'Webpack 5 配置指南：Loaders、Plugins、优化与代码分割', intro: 'Webpack 5 依然是大规模生产应用的主流打包工具，特别是需要<strong>模块联邦</strong>、复杂代码分割或从旧版迁移的场景。本指南涵盖从基础 loader 到将包体积减少 40-60% 的高级优化技术。', h2Basics: 'Webpack 5 基础与 Entry/Output', basicsP1: 'webpack.config.js 文件控制所有打包行为。', h2Loaders: '核心 Loaders', loadersP1: 'Loader 在文件加入依赖图之前对其进行转换，每个 loader 处理特定的文件类型。', h2Plugins: '关键 Plugins', pluginsP1: 'Plugin 可接入 webpack 编译生命周期，执行包分析、HTML 生成、环境变量注入等任务。', h2CodeSplitting: '代码分割与懒加载', codeSplitP1: '代码分割是 Webpack 最重要的优化功能，可将代码分割为按需加载的多个 bundle。', h2Optimization: '生产环境优化', optimP1: '生产构建需要积极优化来最小化 bundle 体积。', h2Faq: '常见问题', faq1Q: '什么时候应该选择 Webpack 而非 Vite？', faq1A: '选择 Webpack 的场景：模块联邦（微前端）、已有复杂 Webpack 配置的大型项目、需要 IE11 支持。', faq2Q: '如何分析 Webpack bundle 体积？', faq2A: '使用 webpack-bundle-analyzer，它会显示一个交互式树图，展示各部分的体积占比。', faq3Q: 'Webpack 5 中的模块联邦是什么？', faq3A: '模块联邦允许多个独立的 Webpack 构建在运行时共享代码，是微前端的主流架构。', faq4Q: '为什么我的 Webpack 构建这么慢？', faq4A: '常见原因：未启用持久缓存、loader 链过长、babel-loader 未排除 node_modules、开发环境 source map 级别过高。', relatedTitle: '相关工具' },
  ja: { title: 'Webpack 5 設定ガイド：ローダー、プラグイン、最適化、コード分割', intro: 'Webpack 5は大規模な本番アプリケーションの主要バンドラーです。このガイドは基本的なローダーからバンドルサイズを40-60%削減する高度な最適化技術まで解説します。', h2Basics: 'Webpack 5の基礎とエントリー/出力', basicsP1: 'webpack.config.jsファイルはすべてのバンドル動作を制御します。', h2Loaders: '重要なローダー', loadersP1: 'ローダーはファイルが依存関係グラフに追加される前に変換します。', h2Plugins: 'キープラグイン', pluginsP1: 'プラグインはwebpackコンパイルのライフサイクルに組み込まれます。', h2CodeSplitting: 'コード分割とレイジーローディング', codeSplitP1: 'コード分割はWebpackの最も重要な最適化機能です。', h2Optimization: '本番最適化', optimP1: '本番ビルドにはバンドルサイズを最小化するための積極的な最適化が必要です。', h2Faq: 'よくある質問', faq1Q: 'いつWebpackを使うべきか？', faq1A: 'Module Federation、大規模既存コードベース、IE11サポートが必要な場合はWebpackを選んでください。', faq2Q: 'WebpackバンドルサイズはどうやってAnalysis？', faq2A: 'webpack-bundle-analyzerを使って、バンドルサイズを消費しているものをインタラクティブに可視化してください。', faq3Q: 'Webpack 5のModule Federationとは？', faq3A: 'Module Federationは複数のWebpackビルドが実行時にコードを共有できるようにします。マイクロフロントエンドのアーキテクチャです。', faq4Q: 'なぜWebpackビルドが遅いのか？', faq4A: '一般的な原因：永続的なキャッシングなし、ローダーが多すぎる、node_modulesを除外しないbabel-loader。', relatedTitle: '関連ツール' },
  ko: { title: 'Webpack 5 구성 가이드: Loaders, Plugins, 최적화 및 코드 분할', intro: 'Webpack 5는 대규모 프로덕션 애플리케이션의 지배적인 번들러로 남아 있습니다. 이 가이드는 기본 로더부터 번들 크기를 40-60% 줄이는 고급 최적화 기술까지 다룹니다.', h2Basics: 'Webpack 5 기초 및 Entry/Output', basicsP1: 'webpack.config.js 파일은 모든 번들링 동작을 제어합니다.', h2Loaders: '필수 Loaders', loadersP1: '로더는 파일이 의존성 그래프에 추가되기 전에 변환합니다.', h2Plugins: '주요 Plugins', pluginsP1: '플러그인은 webpack 컴파일 수명주기에 접속합니다.', h2CodeSplitting: '코드 분할 및 레이지 로딩', codeSplitP1: '코드 분할은 Webpack의 가장 중요한 최적화 기능입니다.', h2Optimization: '프로덕션 최적화', optimP1: '프로덕션 빌드는 번들 크기를 최소화하기 위한 적극적인 최적화가 필요합니다.', h2Faq: '자주 묻는 질문', faq1Q: '언제 Webpack 대신 Vite를 사용해야 하나요?', faq1A: 'Module Federation, 복잡한 기존 Webpack 설정, IE11 지원이 필요한 경우 Webpack을 선택하세요.', faq2Q: 'Webpack 번들 크기를 어떻게 분석하나요?', faq2A: 'webpack-bundle-analyzer를 사용하여 번들 크기를 소비하는 것을 인터랙티브하게 시각화하세요.', faq3Q: 'Webpack 5의 Module Federation이란?', faq3A: 'Module Federation은 별도의 빌드 프로세스 없이 여러 Webpack 빌드가 런타임에 코드를 공유할 수 있게 합니다.', faq4Q: 'Webpack 빌드가 왜 이렇게 느린가요?', faq4A: '일반적인 원인: 영구 캐싱 없음, 너무 많은 로더, node_modules 제외 없는 babel-loader.', relatedTitle: '관련 도구' },
  id: { title: 'Panduan Konfigurasi Webpack 5', intro: 'Webpack 5 tetap menjadi bundler dominan untuk aplikasi produksi berskala besar. Panduan ini mencakup segalanya dari loader dasar hingga teknik optimasi lanjutan.', h2Basics: 'Dasar-dasar Webpack 5 dan Entry/Output', basicsP1: 'File webpack.config.js mengontrol semua perilaku bundling.', h2Loaders: 'Loader Penting', loadersP1: 'Loader mengubah file sebelum ditambahkan ke grafik dependensi.', h2Plugins: 'Plugin Utama', pluginsP1: 'Plugin terhubung ke siklus hidup kompilasi webpack.', h2CodeSplitting: 'Code Splitting dan Lazy Loading', codeSplitP1: 'Code splitting adalah fitur optimasi terpenting Webpack.', h2Optimization: 'Optimasi Produksi', optimP1: 'Build produksi memerlukan optimasi agresif untuk meminimalkan ukuran bundle.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Kapan menggunakan Webpack daripada Vite?', faq1A: 'Pilih Webpack untuk Module Federation, codebase besar yang sudah ada, atau dukungan IE11.', faq2Q: 'Bagaimana menganalisis ukuran bundle Webpack?', faq2A: 'Gunakan webpack-bundle-analyzer untuk visualisasi interaktif.', faq3Q: 'Apa itu Module Federation di Webpack 5?', faq3A: 'Module Federation memungkinkan beberapa build Webpack berbagi kode saat runtime.', faq4Q: 'Mengapa build Webpack saya sangat lambat?', faq4A: 'Penyebab umum: tidak ada caching persisten, terlalu banyak loader, babel tanpa mengecualikan node_modules.', relatedTitle: 'Alat Terkait' },
  th: { title: 'คู่มือการตั้งค่า Webpack 5', intro: 'Webpack 5 ยังคงเป็น bundler ที่โดดเด่นสำหรับแอปพลิเคชัน production ขนาดใหญ่ คู่มือนี้ครอบคลุมตั้งแต่ loader พื้นฐานไปจนถึงเทคนิคการปรับแต่งขั้นสูง', h2Basics: 'พื้นฐาน Webpack 5 และ Entry/Output', basicsP1: 'ไฟล์ webpack.config.js ควบคุมพฤติกรรม bundling ทั้งหมด', h2Loaders: 'Loaders ที่จำเป็น', loadersP1: 'Loaders แปลงไฟล์ก่อนที่จะถูกเพิ่มเข้าสู่ dependency graph', h2Plugins: 'Plugins หลัก', pluginsP1: 'Plugins เชื่อมต่อกับ lifecycle การ compile ของ webpack', h2CodeSplitting: 'Code Splitting และ Lazy Loading', codeSplitP1: 'Code splitting เป็นคุณสมบัติการปรับแต่งที่สำคัญที่สุดของ Webpack', h2Optimization: 'การปรับแต่งสำหรับ Production', optimP1: 'การ build สำหรับ production ต้องการการปรับแต่งอย่างเข้มข้น', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'เมื่อไหร่ควรใช้ Webpack แทน Vite?', faq1A: 'เลือก Webpack สำหรับ Module Federation, codebase ขนาดใหญ่ที่มีอยู่แล้ว หรือต้องการรองรับ IE11', faq2Q: 'จะวิเคราะห์ขนาด bundle ของ Webpack ได้อย่างไร?', faq2A: 'ใช้ webpack-bundle-analyzer เพื่อการแสดงผลแบบ interactive', faq3Q: 'Module Federation ใน Webpack 5 คืออะไร?', faq3A: 'Module Federation อนุญาตให้ Webpack หลาย build แชร์โค้ดกันในเวลา runtime', faq4Q: 'ทำไม Webpack build ของฉันถึงช้ามาก?', faq4A: 'สาเหตุทั่วไป: ไม่มี persistent caching, loader มากเกินไป, babel โดยไม่ exclude node_modules', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const basicConfigCode = `// webpack.config.js — Complete Production Config

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',

  entry: {
    main: './src/index.tsx',
    // Multiple entry points for different pages
    // admin: './src/admin/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[hash:8][ext][query]',
    clean: true,   // Remove old files on each build
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },

  // Persistent filesystem cache — huge speed improvement for incremental builds
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], // Invalidate cache when config changes
    },
  },

  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
};`;

const loadersCode = `// Essential Webpack Loaders Configuration

module.exports = {
  module: {
    rules: [
      // 1. TypeScript/JavaScript with Babel
      {
        test: /\\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: '\u003e0.25%, not dead' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            // Cache Babel results for faster rebuilds
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },

      // 2. CSS / SCSS / PostCSS
      {
        test: /\\.module\\.(css|scss)$/,  // CSS Modules
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 2 },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /(?!\\.module)\\.(css|scss)$/,  // Global CSS
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // 3. Images and fonts (Webpack 5 Asset Modules — no loader needed)
      {
        test: /\\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset',  // Auto-chooses between inline and resource
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 }, // Inline if \u003c 10KB
        },
      },
      {
        test: /\\.svg$/,
        use: ['@svgr/webpack'],  // Import SVGs as React components
      },
      {
        test: /\\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};`;

const codeSplitCode = `// Code Splitting and Lazy Loading

// 1. Dynamic imports (automatic code splitting)
// React.lazy creates a separate chunk for each lazy component
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    \u003cSuspense fallback={\u003cdiv\u003eLoading...\u003c/div\u003e}\u003e
      \u003cRoutes\u003e
        \u003cRoute path="/dashboard" element={\u003cDashboard /\u003e} /\u003e
        \u003cRoute path="/settings" element={\u003cSettings /\u003e} /\u003e
        \u003cRoute path="/analytics" element={\u003cAnalytics /\u003e} /\u003e
      \u003c/Routes\u003e
    \u003c/Suspense\u003e
  );
}

// 2. Manual chunk naming with magic comments
const HeavyChart = lazy(
  () => import(/* webpackChunkName: "charts" */ './components/HeavyChart')
);

// 3. Webpack SplitChunksPlugin configuration
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor chunk: node_modules
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
        },
        // Separate React from other vendors
        react: {
          test: /[\\\\/]node_modules[\\\\/](react|react-dom|react-router)[\\\\/]/,
          name: 'react-vendor',
          chunks: 'all',
          priority: 30,
        },
        // Shared chunks used by 2+ modules
        common: {
          name: 'common',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single',  // Separate runtime chunk
  },
};`;

export default function WebpackConfigGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Basics}</h2>
      <p>{s.basicsP1}</p>
      <pre><code className="language-javascript">{basicConfigCode}</code></pre>

      <h2>{s.h2Loaders}</h2>
      <p>{s.loadersP1}</p>
      <pre><code className="language-javascript">{loadersCode}</code></pre>

      <h2>{s.h2CodeSplitting}</h2>
      <p>{s.codeSplitP1}</p>
      <pre><code className="language-javascript">{codeSplitCode}</code></pre>

      <h2>{s.h2Optimization}</h2>
      <p>{s.optimP1}</p>
      <pre><code className="language-javascript">{`// Production Optimization Configuration
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,  // Use all CPU cores
        terserOptions: {
          compress: {
            drop_console: true,    // Remove console.log in production
            drop_debugger: true,
            pure_funcs: ['console.log'],
          },
          format: { comments: false },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // Tree shaking — only include used exports
    usedExports: true,
    sideEffects: true,  // Respect package.json sideEffects field
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    // Only add analyzer when needed: ANALYZE=true npm run build
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};`}</code></pre>

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
        <li><Link href={`/${lang}/tools/js-html-formatter`}>JS/HTML Formatter</Link></li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link></li>
        <li><Link href={`/${lang}/blog/webpack-vs-vite-2026`}>Webpack vs Vite 2026</Link></li>
        <li><Link href={`/${lang}/blog/nodejs-performance-tips`}>Node.js Performance Tips</Link></li>
      </ul>
    </>
  );
}
