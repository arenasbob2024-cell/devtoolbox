'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'React Server Components: Complete Guide for 2026',
    intro: '<strong>React Server Components (RSC)</strong> represent the biggest architectural shift in React since hooks. They allow components to run exclusively on the server, enabling direct database access, zero client-side JavaScript for server components, and automatic code splitting. This guide covers RSC patterns, data fetching strategies, streaming, when to use client vs server components, and practical examples with Next.js App Router.',
    h2WhatAre: 'What Are React Server Components?',
    whatP1: 'React Server Components are components that render on the server and send their output (React elements, not HTML) to the client. Unlike traditional SSR which renders the entire page on the server and hydrates it on the client, Server Components <strong>never ship their JavaScript to the browser</strong>. This means you can use server-only code (database queries, file system access, API keys) directly in your components without any of that code reaching the client.',
    whatP2: 'In the RSC model, there are three types of components: <strong>Server Components</strong> (default, run only on server), <strong>Client Components</strong> (marked with "use client", run on both server and client), and <strong>Shared Components</strong> (can run in either context depending on who imports them).',
    h2ServerVsClient: 'Server vs Client Components',
    thAspect: 'Aspect',
    thServer: 'Server Component',
    thClient: 'Client Component',
    aspDefault: 'Default in App Router',
    aspDirective: 'Directive needed',
    aspJs: 'JavaScript sent to client',
    aspState: 'useState / useEffect',
    aspEvents: 'Event handlers (onClick)',
    aspDb: 'Direct database access',
    aspFs: 'File system access',
    aspEnv: 'Server-only env vars',
    aspAsync: 'Async component (await)',
    aspBundle: 'Bundle size impact',
    valServerDefault: 'Yes (default)',
    valClientDefault: 'No (opt-in)',
    valServerDirective: 'None',
    valClientDirective: '"use client"',
    valServerJs: 'None (zero JS)',
    valClientJs: 'Yes (component + deps)',
    valServerState: 'Not available',
    valClientState: 'Available',
    valServerEvents: 'Not available',
    valClientEvents: 'Available',
    valServerDb: 'Yes',
    valClientDb: 'No',
    valServerFs: 'Yes',
    valClientFs: 'No',
    valServerEnv: 'Yes',
    valClientEnv: 'No (only NEXT_PUBLIC_*)',
    valServerAsync: 'Yes (native async/await)',
    valClientAsync: 'No (use useEffect or SWR)',
    valServerBundle: 'Zero',
    valClientBundle: 'Adds to bundle',
    h2DecisionTree: 'Decision Tree: Server or Client?',
    h2Patterns: 'RSC Patterns',
    h3DataFetching: 'Pattern 1: Server-Side Data Fetching',
    dataFetchP: 'Server Components can fetch data directly using async/await. No useEffect, no loading states to manage, no client-side fetch libraries needed.',
    h3Composition: 'Pattern 2: Server-Client Composition',
    compositionP: 'Server Components can import and render Client Components. Client Components cannot import Server Components, but they can accept Server Components as children props.',
    h3FormActions: 'Pattern 3: Server Actions for Mutations',
    formActionsP: 'Server Actions (marked with "use server") allow Client Components to call server-side functions directly. This replaces API routes for mutations.',
    h3Streaming: 'Pattern 4: Streaming with Suspense',
    streamingP: 'React Server Components support streaming, which means slow data fetches do not block the entire page. Use Suspense boundaries to stream components as they become ready.',
    h2DataFetching: 'Data Fetching Strategies',
    h3Sequential: 'Sequential Data Fetching',
    sequentialP: 'When data requests depend on each other, they must be sequential. Use async/await naturally.',
    h3Parallel: 'Parallel Data Fetching',
    parallelP: 'When data requests are independent, fetch them in parallel using Promise.all to avoid request waterfalls.',
    h3Preloading: 'Data Preloading Pattern',
    preloadingP: 'Use the preload pattern to start data fetching before the component that needs it begins rendering. This is useful when a parent component knows what data its children will need.',
    h2Caching: 'Caching and Revalidation',
    cachingP: 'Next.js extends fetch with caching controls. Understanding the caching layers is essential for RSC performance.',
    h2Migration: 'Migration from Client-Side React',
    migrationIntro: 'Migrating from a traditional client-side React app to RSC involves rethinking your component architecture.',
    h2Performance: 'Performance Benefits',
    performanceP: 'RSC provides several performance advantages over traditional client-side React:',
    h2CommonMistakes: 'Common Mistakes',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Can I use Server Components without Next.js?',
    faq1A: 'Technically yes, but practically Next.js (App Router) is the primary production-ready framework for RSC. The React team designed RSC to be framework-agnostic, but the bundler integration required is complex. Remix and other frameworks are adding RSC support, but Next.js is the most mature implementation.',
    faq2Q: 'Do Server Components replace SSR?',
    faq2A: 'No. Server Components complement SSR. With Next.js App Router, you get both: Server Components render on the server without sending JS to the client, and Client Components are SSR-rendered (for initial HTML) and then hydrated on the client. RSC is a finer-grained approach that lets you choose per-component whether it needs client interactivity.',
    faq3Q: 'When should I use "use client"?',
    faq3A: 'Add "use client" when your component needs: useState, useEffect, useRef, or other React hooks; event handlers (onClick, onChange); browser-only APIs (window, localStorage); third-party libraries that use hooks or browser APIs. Keep the "use client" boundary as low in your component tree as possible to maximize Server Components.',
    faq4Q: 'Can Server Components use context?',
    faq4A: 'No. React Context (useContext) is a client-side feature. Server Components cannot use or provide context. If you need to share data between Server Components, pass it as props or use a shared data-fetching function. For theming or other global state, wrap your Client Components in a Client Context Provider.',
    faq5Q: 'How do Server Components affect SEO?',
    faq5A: 'Positively. Server Components produce HTML on the server, which search engines can crawl. Since Server Components do not require JavaScript to render content, the HTML is available immediately. Combined with streaming, search engines receive content faster than with client-side rendering.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'React Server Components：2026 完全指南',
    intro: '<strong>React Server Components (RSC)</strong> 代表了自 hooks 以来 React 最大的架构转变。它们允许组件专门在服务器上运行，实现直接数据库访问、服务器组件零客户端 JavaScript 和自动代码分割。',
    h2WhatAre: '什么是 React Server Components？', whatP1: 'React Server Components 是在服务器上渲染并将输出发送到客户端的组件。与传统 SSR 不同，Server Components <strong>不会将其 JavaScript 发送到浏览器</strong>。', whatP2: '在 RSC 模型中，有三种类型的组件：<strong>Server Components</strong>（默认）、<strong>Client Components</strong>（标记 "use client"）和 <strong>Shared Components</strong>。',
    h2ServerVsClient: 'Server vs Client Components', thAspect: '方面', thServer: 'Server Component', thClient: 'Client Component', aspDefault: 'App Router 默认', aspDirective: '需要的指令', aspJs: '发送到客户端的 JS', aspState: 'useState / useEffect', aspEvents: '事件处理器', aspDb: '直接数据库访问', aspFs: '文件系统访问', aspEnv: '服务端环境变量', aspAsync: '异步组件', aspBundle: '包大小影响', valServerDefault: '是（默认）', valClientDefault: '否（选择加入）', valServerDirective: '无', valClientDirective: '"use client"', valServerJs: '无（零 JS）', valClientJs: '是', valServerState: '不可用', valClientState: '可用', valServerEvents: '不可用', valClientEvents: '可用', valServerDb: '是', valClientDb: '否', valServerFs: '是', valClientFs: '否', valServerEnv: '是', valClientEnv: '否', valServerAsync: '是', valClientAsync: '否', valServerBundle: '零', valClientBundle: '增加包大小',
    h2DecisionTree: '决策树：Server 还是 Client？', h2Patterns: 'RSC 模式', h3DataFetching: '模式 1：服务端数据获取', dataFetchP: 'Server Components 可以直接使用 async/await 获取数据。', h3Composition: '模式 2：Server-Client 组合', compositionP: 'Server Components 可以渲染 Client Components。Client Components 可以接受 Server Components 作为 children。', h3FormActions: '模式 3：Server Actions', formActionsP: 'Server Actions 允许 Client Components 直接调用服务端函数。', h3Streaming: '模式 4：Suspense 流式传输', streamingP: '支持流式传输，慢的数据获取不会阻塞整个页面。',
    h2DataFetching: '数据获取策略', h3Sequential: '顺序数据获取', sequentialP: '当请求相互依赖时使用顺序获取。', h3Parallel: '并行数据获取', parallelP: '当请求独立时，使用 Promise.all 并行获取。', h3Preloading: '数据预加载', preloadingP: '使用预加载模式在组件渲染前开始数据获取。',
    h2Caching: '缓存和重新验证', cachingP: 'Next.js 扩展了 fetch 的缓存控制。',
    h2Migration: '从客户端 React 迁移', migrationIntro: '迁移到 RSC 需要重新思考组件架构。',
    h2Performance: '性能优势', performanceP: 'RSC 相比传统客户端 React 提供多项性能优势：',
    h2CommonMistakes: '常见错误',
    h2Faq: '常见问题', faq1Q: '可以不用 Next.js 使用 Server Components 吗？', faq1A: '技术上可以，但实际上 Next.js 是 RSC 的主要生产就绪框架。', faq2Q: 'Server Components 替代 SSR 吗？', faq2A: '不。Server Components 补充 SSR。', faq3Q: '何时使用 "use client"？', faq3A: '当组件需要 hooks、事件处理器、浏览器 API 时。', faq4Q: 'Server Components 可以使用 context 吗？', faq4A: '不可以。React Context 是客户端功能。', faq5Q: 'Server Components 如何影响 SEO？', faq5A: '正面影响。在服务器上产生 HTML，搜索引擎可以爬取。',
    relatedTitle: '相关工具和指南',
  },
  ja: {
    title: 'React Server Components：2026年完全ガイド',
    intro: '<strong>React Server Components (RSC)</strong>はhooks以来最大のReactアーキテクチャの変革です。',
    h2WhatAre: 'React Server Componentsとは？', whatP1: 'サーバー上でレンダリングされ、出力をクライアントに送信するコンポーネントです。', whatP2: 'RSCモデルには3種類のコンポーネントがあります。',
    h2ServerVsClient: 'Server vs Client Components', thAspect: '項目', thServer: 'Server Component', thClient: 'Client Component', aspDefault: 'App Routerデフォルト', aspDirective: 'ディレクティブ', aspJs: 'クライアントJS', aspState: 'useState/useEffect', aspEvents: 'イベントハンドラ', aspDb: 'DB直接アクセス', aspFs: 'ファイルシステム', aspEnv: 'サーバー環境変数', aspAsync: '非同期コンポーネント', aspBundle: 'バンドルサイズ', valServerDefault: 'はい', valClientDefault: 'いいえ', valServerDirective: 'なし', valClientDirective: '"use client"', valServerJs: 'なし（ゼロJS）', valClientJs: 'はい', valServerState: '利用不可', valClientState: '利用可能', valServerEvents: '利用不可', valClientEvents: '利用可能', valServerDb: 'はい', valClientDb: 'いいえ', valServerFs: 'はい', valClientFs: 'いいえ', valServerEnv: 'はい', valClientEnv: 'いいえ', valServerAsync: 'はい', valClientAsync: 'いいえ', valServerBundle: 'ゼロ', valClientBundle: '増加',
    h2DecisionTree: '決定木：ServerかClientか？', h2Patterns: 'RSCパターン', h3DataFetching: 'パターン1：サーバーサイドデータ取得', dataFetchP: 'async/awaitで直接データ取得。', h3Composition: 'パターン2：Server-Client合成', compositionP: 'ServerはClientをレンダリング可能。', h3FormActions: 'パターン3：Server Actions', formActionsP: 'サーバーサイド関数を直接呼び出し。', h3Streaming: 'パターン4：Suspenseストリーミング', streamingP: '遅いデータ取得がページ全体をブロックしない。',
    h2DataFetching: 'データ取得戦略', h3Sequential: '逐次データ取得', sequentialP: '依存関係がある場合。', h3Parallel: '並列データ取得', parallelP: '独立した場合はPromise.all。', h3Preloading: 'データプリロード', preloadingP: 'レンダリング前にデータ取得を開始。',
    h2Caching: 'キャッシュと再検証', cachingP: 'Next.jsはfetchにキャッシュ制御を拡張。',
    h2Migration: 'クライアントサイドReactからの移行', migrationIntro: 'コンポーネントアーキテクチャの再考が必要。',
    h2Performance: 'パフォーマンスの利点', performanceP: 'RSCは従来のクライアントサイドReactに比べて複数のパフォーマンス優位性を提供。',
    h2CommonMistakes: 'よくある間違い',
    h2Faq: 'よくある質問', faq1Q: 'Next.jsなしでServer Componentsは使える？', faq1A: '技術的にはい。実用的にはNext.jsが主要なフレームワーク。', faq2Q: 'Server ComponentsはSSRの代替？', faq2A: 'いいえ、補完します。', faq3Q: '"use client"はいつ使う？', faq3A: 'hooks、イベントハンドラ、ブラウザAPIが必要な時。', faq4Q: 'Server ComponentsでContextは使える？', faq4A: '使えません。', faq5Q: 'SEOへの影響は？', faq5A: 'ポジティブ。サーバーでHTMLを生成。',
    relatedTitle: '関連ツールとガイド',
  },
  ko: {
    title: 'React Server Components: 2026년 완전 가이드',
    intro: '<strong>React Server Components (RSC)</strong>는 hooks 이후 가장 큰 React 아키텍처 변화입니다.',
    h2WhatAre: 'React Server Components란?', whatP1: '서버에서 렌더링되어 출력을 클라이언트로 보내는 컴포넌트입니다.', whatP2: 'RSC 모델에는 세 가지 유형의 컴포넌트가 있습니다.',
    h2ServerVsClient: 'Server vs Client Components', thAspect: '항목', thServer: 'Server Component', thClient: 'Client Component', aspDefault: 'App Router 기본값', aspDirective: '디렉티브', aspJs: '클라이언트 JS', aspState: 'useState/useEffect', aspEvents: '이벤트 핸들러', aspDb: 'DB 직접 접근', aspFs: '파일 시스템', aspEnv: '서버 환경 변수', aspAsync: '비동기 컴포넌트', aspBundle: '번들 크기', valServerDefault: '예', valClientDefault: '아니오', valServerDirective: '없음', valClientDirective: '"use client"', valServerJs: '없음 (제로 JS)', valClientJs: '예', valServerState: '사용 불가', valClientState: '사용 가능', valServerEvents: '사용 불가', valClientEvents: '사용 가능', valServerDb: '예', valClientDb: '아니오', valServerFs: '예', valClientFs: '아니오', valServerEnv: '예', valClientEnv: '아니오', valServerAsync: '예', valClientAsync: '아니오', valServerBundle: '제로', valClientBundle: '증가',
    h2DecisionTree: '결정 트리: Server인가 Client인가?', h2Patterns: 'RSC 패턴', h3DataFetching: '패턴 1: 서버 사이드 데이터 페칭', dataFetchP: 'async/await로 직접 데이터 가져오기.', h3Composition: '패턴 2: Server-Client 조합', compositionP: 'Server가 Client를 렌더링 가능.', h3FormActions: '패턴 3: Server Actions', formActionsP: '서버 사이드 함수를 직접 호출.', h3Streaming: '패턴 4: Suspense 스트리밍', streamingP: '느린 데이터 페칭이 전체 페이지를 차단하지 않음.',
    h2DataFetching: '데이터 페칭 전략', h3Sequential: '순차적 데이터 페칭', sequentialP: '의존성이 있는 경우.', h3Parallel: '병렬 데이터 페칭', parallelP: '독립적인 경우 Promise.all 사용.', h3Preloading: '데이터 프리로딩', preloadingP: '렌더링 전에 데이터 페칭 시작.',
    h2Caching: '캐싱과 재검증', cachingP: 'Next.js는 fetch에 캐싱 제어를 확장합니다.',
    h2Migration: '클라이언트 사이드 React에서 마이그레이션', migrationIntro: '컴포넌트 아키텍처를 재고해야 합니다.',
    h2Performance: '성능 이점', performanceP: 'RSC는 여러 성능 이점을 제공합니다.',
    h2CommonMistakes: '일반적인 실수',
    h2Faq: '자주 묻는 질문', faq1Q: 'Next.js 없이 Server Components를 사용할 수 있나요?', faq1A: '기술적으로는 가능하지만, 실용적으로 Next.js가 주요 프레임워크입니다.', faq2Q: 'Server Components가 SSR을 대체하나요?', faq2A: '아닙니다. 보완합니다.', faq3Q: '"use client"는 언제 사용하나요?', faq3A: 'hooks, 이벤트 핸들러, 브라우저 API가 필요할 때.', faq4Q: 'Server Components에서 Context를 사용할 수 있나요?', faq4A: '사용할 수 없습니다.', faq5Q: 'SEO에 미치는 영향은?', faq5A: '긍정적입니다. 서버에서 HTML 생성.',
    relatedTitle: '관련 도구 및 가이드',
  },
  fr: {
    title: 'React Server Components : Guide Complet 2026',
    intro: '<strong>React Server Components (RSC)</strong> representent le plus grand changement architectural depuis les hooks.',
    h2WhatAre: 'Que sont les RSC ?', whatP1: 'Composants rendus sur le serveur.', whatP2: 'Trois types de composants dans le modele RSC.',
    h2ServerVsClient: 'Server vs Client', thAspect: 'Aspect', thServer: 'Server Component', thClient: 'Client Component', aspDefault: 'Par defaut', aspDirective: 'Directive', aspJs: 'JS client', aspState: 'useState/useEffect', aspEvents: 'Gestionnaires', aspDb: 'Acces DB', aspFs: 'Systeme de fichiers', aspEnv: 'Variables serveur', aspAsync: 'Composant async', aspBundle: 'Taille bundle', valServerDefault: 'Oui', valClientDefault: 'Non', valServerDirective: 'Aucune', valClientDirective: '"use client"', valServerJs: 'Aucun', valClientJs: 'Oui', valServerState: 'Non', valClientState: 'Oui', valServerEvents: 'Non', valClientEvents: 'Oui', valServerDb: 'Oui', valClientDb: 'Non', valServerFs: 'Oui', valClientFs: 'Non', valServerEnv: 'Oui', valClientEnv: 'Non', valServerAsync: 'Oui', valClientAsync: 'Non', valServerBundle: 'Zero', valClientBundle: 'Augmente',
    h2DecisionTree: 'Arbre de decision', h2Patterns: 'Patterns RSC', h3DataFetching: 'Pattern 1 : Chargement serveur', dataFetchP: 'Chargement direct avec async/await.', h3Composition: 'Pattern 2 : Composition', compositionP: 'Server peut rendre Client.', h3FormActions: 'Pattern 3 : Server Actions', formActionsP: 'Appeler des fonctions serveur directement.', h3Streaming: 'Pattern 4 : Streaming', streamingP: 'Le chargement lent ne bloque pas la page.',
    h2DataFetching: 'Strategies de chargement', h3Sequential: 'Sequentiel', sequentialP: 'Quand les requetes dependent.', h3Parallel: 'Parallele', parallelP: 'Promise.all pour les requetes independantes.', h3Preloading: 'Prechargement', preloadingP: 'Commencer avant le rendu.',
    h2Caching: 'Cache et revalidation', cachingP: 'Next.js etend fetch avec le controle du cache.',
    h2Migration: 'Migration depuis le client-side React', migrationIntro: 'Repenser l\'architecture des composants.',
    h2Performance: 'Avantages de performance', performanceP: 'RSC offre plusieurs avantages de performance.',
    h2CommonMistakes: 'Erreurs courantes',
    h2Faq: 'Questions frequentes', faq1Q: 'Utiliser RSC sans Next.js ?', faq1A: 'Techniquement oui. Pratiquement Next.js est le principal framework.', faq2Q: 'RSC remplace SSR ?', faq2A: 'Non, il le complete.', faq3Q: 'Quand "use client" ?', faq3A: 'Quand vous avez besoin de hooks ou d\'API navigateur.', faq4Q: 'Context dans Server Components ?', faq4A: 'Non disponible.', faq5Q: 'Impact SEO ?', faq5A: 'Positif. HTML genere cote serveur.',
    relatedTitle: 'Outils et guides associes',
  },
  de: {
    title: 'React Server Components: Kompletter Guide 2026',
    intro: '<strong>React Server Components (RSC)</strong> sind die groesste architektonische Veraenderung seit Hooks.',
    h2WhatAre: 'Was sind RSC?', whatP1: 'Komponenten, die auf dem Server gerendert werden.', whatP2: 'Drei Arten von Komponenten im RSC-Modell.',
    h2ServerVsClient: 'Server vs Client', thAspect: 'Aspekt', thServer: 'Server Component', thClient: 'Client Component', aspDefault: 'Standard', aspDirective: 'Direktive', aspJs: 'Client-JS', aspState: 'useState/useEffect', aspEvents: 'Event-Handler', aspDb: 'DB-Zugriff', aspFs: 'Dateisystem', aspEnv: 'Server-Umgebungsvariablen', aspAsync: 'Async-Komponente', aspBundle: 'Bundle-Groesse', valServerDefault: 'Ja', valClientDefault: 'Nein', valServerDirective: 'Keine', valClientDirective: '"use client"', valServerJs: 'Kein (Zero JS)', valClientJs: 'Ja', valServerState: 'Nicht verfuegbar', valClientState: 'Verfuegbar', valServerEvents: 'Nicht verfuegbar', valClientEvents: 'Verfuegbar', valServerDb: 'Ja', valClientDb: 'Nein', valServerFs: 'Ja', valClientFs: 'Nein', valServerEnv: 'Ja', valClientEnv: 'Nein', valServerAsync: 'Ja', valClientAsync: 'Nein', valServerBundle: 'Null', valClientBundle: 'Erhoehung',
    h2DecisionTree: 'Entscheidungsbaum', h2Patterns: 'RSC-Patterns', h3DataFetching: 'Pattern 1: Server-Datenabruf', dataFetchP: 'Direkter Datenabruf mit async/await.', h3Composition: 'Pattern 2: Komposition', compositionP: 'Server kann Client rendern.', h3FormActions: 'Pattern 3: Server Actions', formActionsP: 'Server-Funktionen direkt aufrufen.', h3Streaming: 'Pattern 4: Streaming', streamingP: 'Langsame Daten blockieren nicht die Seite.',
    h2DataFetching: 'Datenabruf-Strategien', h3Sequential: 'Sequentiell', sequentialP: 'Bei abhaengigen Anfragen.', h3Parallel: 'Parallel', parallelP: 'Promise.all fuer unabhaengige Anfragen.', h3Preloading: 'Vorladen', preloadingP: 'Datenabruf vor dem Rendern starten.',
    h2Caching: 'Caching und Revalidierung', cachingP: 'Next.js erweitert fetch mit Cache-Kontrolle.',
    h2Migration: 'Migration von Client-side React', migrationIntro: 'Komponentenarchitektur ueberdenken.',
    h2Performance: 'Performance-Vorteile', performanceP: 'RSC bietet mehrere Leistungsvorteile.',
    h2CommonMistakes: 'Haeufige Fehler',
    h2Faq: 'Haeufige Fragen', faq1Q: 'RSC ohne Next.js?', faq1A: 'Technisch ja. Praktisch ist Next.js das Hauptframework.', faq2Q: 'Ersetzt RSC SSR?', faq2A: 'Nein, ergaenzt es.', faq3Q: 'Wann "use client"?', faq3A: 'Bei Hooks oder Browser-APIs.', faq4Q: 'Context in Server Components?', faq4A: 'Nicht verfuegbar.', faq5Q: 'SEO-Auswirkung?', faq5A: 'Positiv. HTML auf dem Server generiert.',
    relatedTitle: 'Verwandte Tools und Anleitungen',
  },
  es: {
    title: 'React Server Components: Guia Completa 2026',
    intro: '<strong>React Server Components (RSC)</strong> representan el mayor cambio arquitectonico desde los hooks.',
    h2WhatAre: 'Que son los RSC?', whatP1: 'Componentes que se renderizan en el servidor.', whatP2: 'Tres tipos de componentes en el modelo RSC.',
    h2ServerVsClient: 'Server vs Client', thAspect: 'Aspecto', thServer: 'Server Component', thClient: 'Client Component', aspDefault: 'Por defecto', aspDirective: 'Directiva', aspJs: 'JS cliente', aspState: 'useState/useEffect', aspEvents: 'Eventos', aspDb: 'Acceso DB', aspFs: 'Sistema de archivos', aspEnv: 'Variables servidor', aspAsync: 'Componente async', aspBundle: 'Tamano bundle', valServerDefault: 'Si', valClientDefault: 'No', valServerDirective: 'Ninguna', valClientDirective: '"use client"', valServerJs: 'Ninguno', valClientJs: 'Si', valServerState: 'No disponible', valClientState: 'Disponible', valServerEvents: 'No disponible', valClientEvents: 'Disponible', valServerDb: 'Si', valClientDb: 'No', valServerFs: 'Si', valClientFs: 'No', valServerEnv: 'Si', valClientEnv: 'No', valServerAsync: 'Si', valClientAsync: 'No', valServerBundle: 'Cero', valClientBundle: 'Aumenta',
    h2DecisionTree: 'Arbol de decision', h2Patterns: 'Patrones RSC', h3DataFetching: 'Patron 1: Carga de datos servidor', dataFetchP: 'Carga directa con async/await.', h3Composition: 'Patron 2: Composicion', compositionP: 'Server puede renderizar Client.', h3FormActions: 'Patron 3: Server Actions', formActionsP: 'Llamar funciones del servidor directamente.', h3Streaming: 'Patron 4: Streaming', streamingP: 'La carga lenta no bloquea la pagina.',
    h2DataFetching: 'Estrategias de carga', h3Sequential: 'Secuencial', sequentialP: 'Cuando las peticiones dependen.', h3Parallel: 'Paralelo', parallelP: 'Promise.all para peticiones independientes.', h3Preloading: 'Precarga', preloadingP: 'Iniciar carga antes del renderizado.',
    h2Caching: 'Cache y revalidacion', cachingP: 'Next.js extiende fetch con control de cache.',
    h2Migration: 'Migracion desde React cliente', migrationIntro: 'Repensar la arquitectura de componentes.',
    h2Performance: 'Ventajas de rendimiento', performanceP: 'RSC ofrece varias ventajas de rendimiento.',
    h2CommonMistakes: 'Errores comunes',
    h2Faq: 'Preguntas frecuentes', faq1Q: 'RSC sin Next.js?', faq1A: 'Tecnicamente si. Practicamente Next.js es el framework principal.', faq2Q: 'RSC reemplaza SSR?', faq2A: 'No, lo complementa.', faq3Q: 'Cuando "use client"?', faq3A: 'Cuando necesitas hooks o APIs del navegador.', faq4Q: 'Context en Server Components?', faq4A: 'No disponible.', faq5Q: 'Impacto SEO?', faq5A: 'Positivo. HTML generado en el servidor.',
    relatedTitle: 'Herramientas y guias relacionadas',
  },
};

export default function ReactServerComponentsGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2WhatAre}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatP1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatP2 }} />

      <h2>{s.h2ServerVsClient}</h2>
      <table>
        <thead><tr><th>{s.thAspect}</th><th>{s.thServer}</th><th>{s.thClient}</th></tr></thead>
        <tbody>
          <tr><td>{s.aspDefault}</td><td>{s.valServerDefault}</td><td>{s.valClientDefault}</td></tr>
          <tr><td>{s.aspDirective}</td><td>{s.valServerDirective}</td><td>{s.valClientDirective}</td></tr>
          <tr><td>{s.aspJs}</td><td>{s.valServerJs}</td><td>{s.valClientJs}</td></tr>
          <tr><td>{s.aspState}</td><td>{s.valServerState}</td><td>{s.valClientState}</td></tr>
          <tr><td>{s.aspEvents}</td><td>{s.valServerEvents}</td><td>{s.valClientEvents}</td></tr>
          <tr><td>{s.aspDb}</td><td>{s.valServerDb}</td><td>{s.valClientDb}</td></tr>
          <tr><td>{s.aspFs}</td><td>{s.valServerFs}</td><td>{s.valClientFs}</td></tr>
          <tr><td>{s.aspEnv}</td><td>{s.valServerEnv}</td><td>{s.valClientEnv}</td></tr>
          <tr><td>{s.aspAsync}</td><td>{s.valServerAsync}</td><td>{s.valClientAsync}</td></tr>
          <tr><td>{s.aspBundle}</td><td>{s.valServerBundle}</td><td>{s.valClientBundle}</td></tr>
        </tbody>
      </table>

      <h2>{s.h2DecisionTree}</h2>
      <pre><code className="language-text">{`Should this component be a Server or Client Component?

  Does it need useState, useEffect, or useRef?
  ├── YES → Client Component ("use client")
  └── NO ↓

  Does it need event handlers (onClick, onChange, onSubmit)?
  ├── YES → Client Component ("use client")
  └── NO ↓

  Does it use browser-only APIs (window, localStorage, navigator)?
  ├── YES → Client Component ("use client")
  └── NO ↓

  Does it use third-party libraries that require hooks or browser APIs?
  ├── YES → Client Component ("use client")
  └── NO ↓

  Does it fetch data or access databases/file system?
  ├── YES → Server Component (default) ← BEST CHOICE
  └── NO → Server Component (default) ← still the default`}</code></pre>

      <h2>{s.h2Patterns}</h2>

      <h3>{s.h3DataFetching}</h3>
      <p>{s.dataFetchP}</p>
      <pre><code className="language-tsx">{`// app/users/page.tsx — Server Component (default, no directive needed)
import { db } from '@/lib/database';

// This component is async — only possible in Server Components
export default async function UsersPage() {
  // Direct database query — this code NEVER reaches the client
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div>
      <h1>Users ({users.length})</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Benefits:
// - Zero JavaScript sent to client for this component
// - No loading states needed (data is available before render)
// - Database credentials never exposed to the browser
// - No useEffect + fetch + useState dance`}</code></pre>

      <h3>{s.h3Composition}</h3>
      <p>{s.compositionP}</p>
      <pre><code className="language-tsx">{`// components/LikeButton.tsx — Client Component
'use client';
import { useState } from 'react';

export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => {
      setLiked(!liked);
      setCount(c => liked ? c - 1 : c + 1);
    }}>
      {liked ? 'Unlike' : 'Like'} ({count})
    </button>
  );
}

// app/posts/[id]/page.tsx — Server Component
import { db } from '@/lib/database';
import { LikeButton } from '@/components/LikeButton';

export default async function PostPage({ params }: { params: { id: string } }) {
  // Server: fetch data
  const post = await db.post.findUnique({ where: { id: params.id } });

  return (
    <article>
      {/* Server-rendered content (zero JS) */}
      <h1>{post?.title}</h1>
      <div>{post?.content}</div>

      {/* Client Component island (only this ships JS) */}
      <LikeButton postId={params.id} />
    </article>
  );
}

// Pattern: Server Component as children of Client Component
// components/Sidebar.tsx
'use client';
export function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <aside style={{ display: open ? 'block' : 'none' }}>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {children}  {/* Server Component content passed as children */}
    </aside>
  );
}`}</code></pre>

      <h3>{s.h3FormActions}</h3>
      <p>{s.formActionsP}</p>
      <pre><code className="language-tsx">{`// app/actions.ts — Server Action
'use server';

import { db } from '@/lib/database';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await db.post.create({
    data: { title, content, authorId: 'user-1' },
  });

  revalidatePath('/posts');
}

export async function deletePost(postId: string) {
  await db.post.delete({ where: { id: postId } });
  revalidatePath('/posts');
}

// components/CreatePostForm.tsx — Client Component using Server Action
'use client';
import { createPost } from '@/app/actions';
import { useActionState } from 'react';

export function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Write your post..." required />
      <button type="submit">Create Post</button>
    </form>
  );
}

// Works without API routes!
// The form submits directly to the server action
// Progressive enhancement: works without JavaScript`}</code></pre>

      <h3>{s.h3Streaming}</h3>
      <p>{s.streamingP}</p>
      <pre><code className="language-tsx">{`// app/dashboard/page.tsx — Streaming with Suspense
import { Suspense } from 'react';

// Slow component — fetches from external API
async function AnalyticsChart() {
  const data = await fetch('https://api.analytics.com/data', {
    next: { revalidate: 60 },
  });
  const analytics = await data.json();
  return <div>Chart: {analytics.visitors} visitors</div>;
}

// Fast component — fetches from local DB
async function RecentPosts() {
  const posts = await db.post.findMany({ take: 5 });
  return (
    <ul>
      {posts.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* This renders immediately */}
      <Suspense fallback={<div>Loading posts...</div>}>
        <RecentPosts />
      </Suspense>

      {/* This streams in when ready (doesn't block the page) */}
      <Suspense fallback={<div>Loading analytics...</div>}>
        <AnalyticsChart />
      </Suspense>
    </div>
  );
}

// Result: User sees "Dashboard" + posts immediately
// Analytics chart streams in when the API responds
// No client-side loading spinners needed`}</code></pre>

      <h2>{s.h2DataFetching}</h2>

      <h3>{s.h3Sequential}</h3>
      <p>{s.sequentialP}</p>
      <pre><code className="language-tsx">{`// Sequential: second request depends on first
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);           // 1st request
  const posts = await getUserPosts(user.name);  // 2nd (depends on user.name)

  return <div>{user.name}: {posts.length} posts</div>;
}`}</code></pre>

      <h3>{s.h3Parallel}</h3>
      <p>{s.parallelP}</p>
      <pre><code className="language-tsx">{`// Parallel: independent requests — use Promise.all
async function Dashboard() {
  // Start all requests simultaneously
  const [users, posts, analytics] = await Promise.all([
    getUsers(),
    getPosts(),
    getAnalytics(),
  ]);

  return (
    <div>
      <UserList users={users} />
      <PostList posts={posts} />
      <AnalyticsPanel data={analytics} />
    </div>
  );
}`}</code></pre>

      <h2>{s.h2Caching}</h2>
      <p>{s.cachingP}</p>
      <pre><code className="language-tsx">{`// Next.js fetch caching strategies

// 1. Static (cached indefinitely until revalidated)
const data = await fetch('https://api.example.com/data');
// Equivalent to: { cache: 'force-cache' }

// 2. Revalidate every 60 seconds (ISR)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
});

// 3. Dynamic (no caching — fresh on every request)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// 4. Tag-based revalidation
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});

// In a Server Action:
import { revalidateTag } from 'next/cache';
revalidateTag('posts');  // Purge all fetches tagged 'posts'`}</code></pre>

      <h2>{s.h2Performance}</h2>
      <p>{s.performanceP}</p>
      <pre><code className="language-text">{`RSC Performance Benefits:

1. Zero Client JavaScript for Server Components
   - Only Client Components ship JS to the browser
   - Large libraries used on server (markdown, syntax highlighting) add zero bundle

2. Streaming SSR
   - HTML streams to browser as components resolve
   - First Contentful Paint (FCP) is faster
   - Time to Interactive (TTI) is faster (less JS to hydrate)

3. Automatic Code Splitting
   - Each Client Component is automatically code-split
   - No manual dynamic imports needed

4. Reduced Data Transfer
   - Server Components fetch data on the server (same network)
   - No client-side fetch waterfalls
   - No duplicate data in both HTML and JS payload

5. Smaller Hydration Payload
   - Only Client Components need hydration
   - Server Component output is static — no hydration needed

Typical Results:
   Before RSC: 450KB JS bundle, 2.5s TTI
   After RSC:  180KB JS bundle, 1.1s TTI (60% JS reduction)`}</code></pre>

      <h2>{s.h2CommonMistakes}</h2>
      <pre><code className="language-tsx">{`// Mistake 1: Adding "use client" unnecessarily
// BAD: This doesn't need client-side JavaScript
'use client';  // REMOVE THIS
export function UserCard({ name, email }: { name: string; email: string }) {
  return <div>{name} ({email})</div>;  // No hooks, no events = Server Component
}

// Mistake 2: Importing Server Component in Client Component
// BAD: This won't work
'use client';
import { ServerComponent } from './ServerComponent';  // ERROR
// FIX: Pass as children instead
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// Mistake 3: Using "use client" too high in the tree
// BAD: Making a layout a Client Component
'use client';  // This makes EVERYTHING below it client-side
export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  return <div className={theme}>{children}</div>;
}
// FIX: Extract the interactive part into a small Client Component
// components/ThemeToggle.tsx
'use client';
export function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  return <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>{theme}</button>;
}
// layout.tsx — stays as Server Component
export function Layout({ children }: { children: React.ReactNode }) {
  return <div><ThemeToggle />{children}</div>;
}`}</code></pre>

      <h2>{s.h2Faq}</h2>

      <h3>{s.faq1Q}</h3>
      <p>{s.faq1A}</p>

      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>

      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>

      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h3>{s.faq5Q}</h3>
      <p>{s.faq5A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format API responses and data</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate types from API responses</li>
        <li><Link href={`/${lang}/tools/html-to-jsx`}>HTML to JSX</Link> - Convert HTML to React JSX</li>
        <li><Link href={`/${lang}/blog/nextjs-app-router-guide`}>Next.js App Router Guide</Link></li>
        <li><Link href={`/${lang}/blog/react-hooks-guide`}>React Hooks Guide</Link></li>
        <li><Link href={`/${lang}/blog/typescript-generics-guide`}>TypeScript Generics Guide</Link></li>
        <li><Link href={`/${lang}/blog/web-performance-optimization`}>Web Performance Optimization</Link></li>
      </ul>
    </>
  );
}
