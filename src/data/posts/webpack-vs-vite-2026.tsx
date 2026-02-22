'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Webpack vs Vite 2026: Which Build Tool Should You Choose?',
    intro: 'The JavaScript build tool landscape has shifted dramatically. In 2026, <strong>Vite</strong> has become the default for new projects, while <strong>Webpack</strong> continues to power millions of production applications. This comprehensive comparison covers performance benchmarks, feature sets, migration strategies, and ecosystem differences to help you make the right choice for your next project.',
    h2Overview: 'Overview: Two Philosophies',
    overviewP1: 'Webpack and Vite represent fundamentally different approaches to JavaScript bundling. Webpack bundles everything upfront using a JavaScript-based pipeline. Vite leverages native ES modules during development and uses Rollup (or Rolldown in Vite 6+) for production builds. Understanding this architectural difference is key to choosing the right tool.',
    overviewP2: 'Webpack was created in 2012 by Tobias Koppers and pioneered concepts like code splitting, loaders, and hot module replacement. Vite was created in 2020 by Evan You (creator of Vue.js) and reimagined the dev server by serving source files as native ES modules, eliminating the bundling step during development entirely.',
    h2Architecture: 'Architecture Comparison',
    architectureP1: 'The core architectural difference determines everything else: startup speed, HMR latency, configuration complexity, and plugin design.',
    h2DevPerformance: 'Development Performance Benchmarks',
    devPerfIntro: 'Development speed is where Vite dominates. These benchmarks are based on a React + TypeScript project with approximately 1,500 modules, measured on an M2 MacBook Pro.',
    thMetric: 'Metric',
    thWebpack: 'Webpack 5.9x',
    thVite: 'Vite 6.x',
    metricColdStart: 'Cold start (dev server)',
    metricHmr: 'HMR update',
    metricFirstPage: 'First page load (dev)',
    metricMemory: 'Memory usage (dev)',
    metricDepInstall: 'Dependency count',
    valWpCold: '8-18s',
    valViteCold: '200-600ms',
    valWpHmr: '200-800ms',
    valViteHmr: '10-50ms',
    valWpPage: '2-6s',
    valVitePage: '0.8-2s',
    valWpMem: '300-700MB',
    valViteMem: '100-250MB',
    valWpDeps: '12-20+ dev deps',
    valViteDeps: '2-4 dev deps',
    h2ProdBuild: 'Production Build Performance',
    prodBuildIntro: 'Production build performance matters for CI/CD pipelines. The gap narrows here because Vite uses Rollup (not esbuild) for production by default.',
    thProjectSize: 'Project Size',
    sizeSmall: 'Small (~200 modules)',
    sizeMedium: 'Medium (~1,500 modules)',
    sizeLarge: 'Large (~10,000 modules)',
    valWpSmall: '~6-12s',
    valViteSmall: '~3-6s',
    valWpMedium: '~25-50s',
    valViteMedium: '~10-20s',
    valWpLarge: '~90-240s',
    valViteLarge: '~30-80s',
    prodNote: '<strong>Note:</strong> Vite 6+ with Rolldown (Rust-based Rollup replacement) reduces production build times by another 3-10x. Webpack 5 persistent caching can significantly speed up incremental builds.',
    h2Config: 'Configuration Comparison',
    configIntro: 'Configuration complexity is one of the biggest practical differences between the two tools.',
    h3WebpackConfig: 'Webpack: Explicit Configuration',
    wpConfigDesc: 'A production-ready Webpack config typically spans 80-300 lines. You need loaders for every file type, plugins for HTML generation, CSS extraction, environment variables, and optimization.',
    h3ViteConfig: 'Vite: Convention Over Configuration',
    viteConfigDesc: 'Vite works with near-zero configuration. TypeScript, JSX, CSS Modules, PostCSS, and static assets are supported out of the box. A typical config is 10-30 lines.',
    h2Features: 'Feature Comparison Matrix',
    thFeature: 'Feature',
    thSupport: 'Support Level',
    featCodeSplit: 'Code Splitting',
    featTreeShake: 'Tree Shaking',
    featHmr: 'Hot Module Replacement',
    featCss: 'CSS Modules',
    featTs: 'TypeScript',
    featSsr: 'SSR Support',
    featModFed: 'Module Federation',
    featLibMode: 'Library Mode',
    featLegacy: 'Legacy Browser Support',
    featWorkers: 'Web Workers',
    valBoth: 'Both',
    valWpOnly: 'Webpack',
    valViteOnly: 'Vite',
    featCodeSplitDetail: 'Both support automatic and manual code splitting. Webpack via SplitChunksPlugin, Vite via Rollup manualChunks.',
    featModFedDetail: 'Webpack has native Module Federation for micro-frontends. Vite requires the vite-plugin-federation community plugin.',
    featLibModeDetail: 'Vite has a built-in library mode producing ESM, CJS, and UMD outputs. Webpack requires manual output configuration.',
    h2Ecosystem: 'Ecosystem and Framework Support',
    ecosystemP1: 'Webpack has the largest plugin ecosystem with thousands of loaders and plugins refined over a decade. Vite\'s plugin ecosystem is based on Rollup\'s plugin interface and is growing rapidly.',
    ecosystemP2: 'Framework support in 2026:',
    h2Migration: 'Migrating from Webpack to Vite',
    migrationIntro: 'Migrating from Webpack to Vite is straightforward for most projects. Here is a step-by-step approach:',
    h3Step1: 'Step 1: Install Vite',
    h3Step2: 'Step 2: Create vite.config.ts',
    h3Step3: 'Step 3: Update index.html',
    h3Step4: 'Step 4: Update package.json Scripts',
    h3Step5: 'Step 5: Handle Common Migration Issues',
    migrationIssuesIntro: 'Common issues when migrating from Webpack to Vite:',
    h2WhenWebpack: 'When to Choose Webpack',
    whenWebpackList: '<ul><li><strong>Existing large projects</strong> — If your project is already using Webpack with a complex configuration, migration may not be worth it</li><li><strong>Module Federation</strong> — If you need micro-frontend architecture with runtime code sharing</li><li><strong>Custom loaders</strong> — If you depend on Webpack-specific loaders without Vite equivalents</li><li><strong>Legacy browser support</strong> — If you need to support IE11 or other legacy browsers</li><li><strong>Specific plugins</strong> — Some niche Webpack plugins have no Vite equivalent</li></ul>',
    h2WhenVite: 'When to Choose Vite',
    whenViteList: '<ul><li><strong>New projects</strong> — Vite is the recommended choice for all new projects in 2026</li><li><strong>Developer experience</strong> — If fast startup and instant HMR are priorities</li><li><strong>Framework projects</strong> — React, Vue, Svelte, and SolidJS all recommend Vite</li><li><strong>Library development</strong> — Vite\'s library mode is excellent for publishing packages</li><li><strong>SSR applications</strong> — Vite has first-class SSR support</li><li><strong>Small to medium teams</strong> — Less configuration means faster onboarding</li></ul>',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Vite faster than Webpack in every scenario?',
    faq1A: 'Vite is dramatically faster for development (cold start, HMR). For production builds, the gap is smaller. Webpack 5 with persistent caching can approach Vite\'s build speeds for incremental builds. However, Vite 6+ with Rolldown is closing the production speed gap as well.',
    faq2Q: 'Can I use Webpack loaders with Vite?',
    faq2A: 'Not directly. Webpack loaders and Vite plugins have different APIs. However, most common Webpack loaders have Vite/Rollup equivalents. For example, sass-loader becomes built-in Vite Sass support, and file-loader becomes Vite\'s native static asset handling.',
    faq3Q: 'Is Webpack dead in 2026?',
    faq3A: 'No. Webpack still powers millions of applications and receives regular updates. Next.js still uses Webpack for production builds (alongside Turbopack for dev). However, Vite has become the preferred choice for new projects across most frameworks.',
    faq4Q: 'Should I migrate my existing Webpack project to Vite?',
    faq4A: 'It depends on the pain points. If slow dev server startup and HMR are hurting productivity, migration is worth it. If your Webpack setup is stable and performs adequately, the migration effort may not justify the benefits. Start by trying Vite on a non-critical project to evaluate the DX improvement.',
    faq5Q: 'What about Turbopack and Rspack?',
    faq5A: 'Turbopack (Rust-based, Vercel) is the default dev bundler for Next.js but not available standalone. Rspack is a Webpack-compatible bundler written in Rust that offers Webpack API compatibility with much faster build speeds. Both are viable alternatives, but Vite remains the most broadly adopted modern bundler.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'Webpack vs Vite 2026：你应该选择哪个构建工具？',
    intro: 'JavaScript 构建工具格局已经发生巨大变化。在 2026 年，<strong>Vite</strong> 已成为新项目的默认选择，而 <strong>Webpack</strong> 继续为数百万生产应用提供支持。本全面比较涵盖性能基准、功能集、迁移策略和生态系统差异，帮助你为下一个项目做出正确选择。',
    h2Overview: '概述：两种理念',
    overviewP1: 'Webpack 和 Vite 代表了 JavaScript 打包的根本不同方法。Webpack 使用基于 JavaScript 的管道预先打包所有内容。Vite 在开发期间利用原生 ES 模块，并使用 Rollup（或 Vite 6+ 中的 Rolldown）进行生产构建。',
    overviewP2: 'Webpack 由 Tobias Koppers 于 2012 年创建，开创了代码分割、加载器和热模块替换等概念。Vite 由尤雨溪于 2020 年创建，通过将源文件作为原生 ES 模块提供，彻底消除了开发期间的打包步骤。',
    h2Architecture: '架构比较',
    architectureP1: '核心架构差异决定了一切：启动速度、HMR 延迟、配置复杂度和插件设计。',
    h2DevPerformance: '开发性能基准',
    devPerfIntro: '开发速度是 Vite 占主导地位的领域。基于约 1,500 个模块的 React + TypeScript 项目测量。',
    thMetric: '指标', thWebpack: 'Webpack 5.9x', thVite: 'Vite 6.x',
    metricColdStart: '冷启动（开发服务器）', metricHmr: 'HMR 更新', metricFirstPage: '首页加载（开发）', metricMemory: '内存使用（开发）', metricDepInstall: '依赖数量',
    valWpCold: '8-18秒', valViteCold: '200-600毫秒', valWpHmr: '200-800毫秒', valViteHmr: '10-50毫秒', valWpPage: '2-6秒', valVitePage: '0.8-2秒', valWpMem: '300-700MB', valViteMem: '100-250MB', valWpDeps: '12-20+ 开发依赖', valViteDeps: '2-4 开发依赖',
    h2ProdBuild: '生产构建性能', prodBuildIntro: '生产构建性能对 CI/CD 流水线很重要。差距在这里缩小。', thProjectSize: '项目规模', sizeSmall: '小型（~200 模块）', sizeMedium: '中型（~1,500 模块）', sizeLarge: '大型（~10,000 模块）', valWpSmall: '~6-12秒', valViteSmall: '~3-6秒', valWpMedium: '~25-50秒', valViteMedium: '~10-20秒', valWpLarge: '~90-240秒', valViteLarge: '~30-80秒', prodNote: '<strong>注意：</strong>Vite 6+ 的 Rolldown 将生产构建时间再降低 3-10 倍。',
    h2Config: '配置对比', configIntro: '配置复杂度是两个工具之间最大的实际差异之一。', h3WebpackConfig: 'Webpack：显式配置', wpConfigDesc: '生产就绪的 Webpack 配置通常有 80-300 行。', h3ViteConfig: 'Vite：约定优于配置', viteConfigDesc: 'Vite 几乎无需配置即可工作。TypeScript、JSX、CSS Modules、PostCSS 都开箱即用。',
    h2Features: '功能对比矩阵', thFeature: '功能', thSupport: '支持级别', featCodeSplit: '代码分割', featTreeShake: 'Tree Shaking', featHmr: '热模块替换', featCss: 'CSS Modules', featTs: 'TypeScript', featSsr: 'SSR 支持', featModFed: '模块联邦', featLibMode: '库模式', featLegacy: '旧浏览器支持', featWorkers: 'Web Workers', valBoth: '两者都支持', valWpOnly: 'Webpack', valViteOnly: 'Vite', featCodeSplitDetail: '两者都支持自动和手动代码分割。', featModFedDetail: 'Webpack 原生支持模块联邦。Vite 需要社区插件。', featLibModeDetail: 'Vite 内置库模式。Webpack 需要手动配置输出。',
    h2Ecosystem: '生态系统和框架支持', ecosystemP1: 'Webpack 拥有最大的插件生态系统。Vite 的插件生态系统基于 Rollup 插件接口，正在快速增长。', ecosystemP2: '2026 年框架支持：',
    h2Migration: '从 Webpack 迁移到 Vite', migrationIntro: '对于大多数项目，从 Webpack 迁移到 Vite 很简单：', h3Step1: '步骤1：安装 Vite', h3Step2: '步骤2：创建 vite.config.ts', h3Step3: '步骤3：更新 index.html', h3Step4: '步骤4：更新 package.json 脚本', h3Step5: '步骤5：处理常见迁移问题', migrationIssuesIntro: '从 Webpack 迁移到 Vite 时的常见问题：',
    h2WhenWebpack: '何时选择 Webpack', whenWebpackList: '<ul><li><strong>现有大型项目</strong> — 如果项目已使用复杂的 Webpack 配置，迁移可能不值得</li><li><strong>模块联邦</strong> — 如果需要运行时代码共享的微前端架构</li><li><strong>自定义加载器</strong> — 如果依赖没有 Vite 等效的 Webpack 特定加载器</li><li><strong>旧浏览器支持</strong> — 如果需要支持 IE11 等旧浏览器</li></ul>',
    h2WhenVite: '何时选择 Vite', whenViteList: '<ul><li><strong>新项目</strong> — 2026 年所有新项目推荐使用 Vite</li><li><strong>开发者体验</strong> — 如果快速启动和即时 HMR 是优先事项</li><li><strong>框架项目</strong> — React、Vue、Svelte 都推荐 Vite</li><li><strong>库开发</strong> — Vite 的库模式非常适合发布包</li></ul>',
    h2Faq: '常见问题', faq1Q: 'Vite 在所有场景下都比 Webpack 快吗？', faq1A: 'Vite 在开发方面显著更快。对于生产构建，差距较小。', faq2Q: '可以在 Vite 中使用 Webpack 加载器吗？', faq2A: '不能直接使用。但大多数常见的 Webpack 加载器都有 Vite/Rollup 等效。', faq3Q: 'Webpack 在 2026 年过时了吗？', faq3A: '没有。Webpack 仍然为数百万应用提供支持。但 Vite 已成为新项目的首选。', faq4Q: '我应该将现有 Webpack 项目迁移到 Vite 吗？', faq4A: '取决于痛点。如果慢的开发服务器影响生产力，值得迁移。', faq5Q: 'Turbopack 和 Rspack 怎么样？', faq5A: 'Turbopack 是 Next.js 的默认开发打包器。Rspack 是兼容 Webpack 的 Rust 打包器。两者都是可行的替代方案。',
    relatedTitle: '相关工具和指南',
  },
  ja: {
    title: 'Webpack vs Vite 2026：どちらのビルドツールを選ぶべき？',
    intro: 'JavaScriptビルドツールの状況は大きく変化しました。2026年、<strong>Vite</strong>は新規プロジェクトのデフォルトとなり、<strong>Webpack</strong>は何百万もの本番アプリケーションを支え続けています。',
    h2Overview: '概要：2つの哲学', overviewP1: 'WebpackとViteはJavaScriptバンドリングへの根本的に異なるアプローチを表しています。', overviewP2: 'Webpackは2012年にTobias Koppersによって作成されました。Viteは2020年にEvan Youによって作成されました。',
    h2Architecture: 'アーキテクチャ比較', architectureP1: 'コアアーキテクチャの違いがすべてを決定します。',
    h2DevPerformance: '開発パフォーマンスベンチマーク', devPerfIntro: '開発速度はViteが圧倒的です。', thMetric: '指標', thWebpack: 'Webpack 5.9x', thVite: 'Vite 6.x', metricColdStart: 'コールドスタート', metricHmr: 'HMR更新', metricFirstPage: '初回ページロード', metricMemory: 'メモリ使用量', metricDepInstall: '依存関係数', valWpCold: '8-18秒', valViteCold: '200-600ミリ秒', valWpHmr: '200-800ミリ秒', valViteHmr: '10-50ミリ秒', valWpPage: '2-6秒', valVitePage: '0.8-2秒', valWpMem: '300-700MB', valViteMem: '100-250MB', valWpDeps: '12-20+ 依存', valViteDeps: '2-4 依存',
    h2ProdBuild: '本番ビルドパフォーマンス', prodBuildIntro: '本番ビルドパフォーマンスはCI/CDパイプラインに重要です。', thProjectSize: 'プロジェクトサイズ', sizeSmall: '小規模（~200モジュール）', sizeMedium: '中規模（~1,500モジュール）', sizeLarge: '大規模（~10,000モジュール）', valWpSmall: '~6-12秒', valViteSmall: '~3-6秒', valWpMedium: '~25-50秒', valViteMedium: '~10-20秒', valWpLarge: '~90-240秒', valViteLarge: '~30-80秒', prodNote: '<strong>注意：</strong>Vite 6+のRolldownは本番ビルド時間をさらに3-10倍短縮します。',
    h2Config: '設定の比較', configIntro: '設定の複雑さは2つのツール間の最大の実用的な違いです。', h3WebpackConfig: 'Webpack：明示的な設定', wpConfigDesc: '本番対応のWebpack設定は通常80-300行です。', h3ViteConfig: 'Vite：規約による設定', viteConfigDesc: 'Viteはほぼゼロ設定で動作します。',
    h2Features: '機能比較マトリックス', thFeature: '機能', thSupport: 'サポートレベル', featCodeSplit: 'コード分割', featTreeShake: 'ツリーシェイキング', featHmr: 'ホットモジュール置換', featCss: 'CSSモジュール', featTs: 'TypeScript', featSsr: 'SSRサポート', featModFed: 'モジュールフェデレーション', featLibMode: 'ライブラリモード', featLegacy: 'レガシーブラウザ対応', featWorkers: 'Web Workers', valBoth: '両方', valWpOnly: 'Webpack', valViteOnly: 'Vite', featCodeSplitDetail: '両方とも自動および手動コード分割をサポート。', featModFedDetail: 'Webpackはネイティブモジュールフェデレーション対応。Viteはコミュニティプラグインが必要。', featLibModeDetail: 'Viteには組み込みライブラリモードがあります。',
    h2Ecosystem: 'エコシステムとフレームワークサポート', ecosystemP1: 'Webpackは最大のプラグインエコシステムを持っています。', ecosystemP2: '2026年のフレームワークサポート：',
    h2Migration: 'WebpackからViteへの移行', migrationIntro: 'WebpackからViteへの移行はほとんどのプロジェクトで簡単です。', h3Step1: 'ステップ1：Viteをインストール', h3Step2: 'ステップ2：vite.config.tsを作成', h3Step3: 'ステップ3：index.htmlを更新', h3Step4: 'ステップ4：package.jsonスクリプトを更新', h3Step5: 'ステップ5：一般的な移行問題の処理', migrationIssuesIntro: 'WebpackからViteへの移行時の一般的な問題：',
    h2WhenWebpack: 'Webpackを選ぶべき場合', whenWebpackList: '<ul><li><strong>既存の大規模プロジェクト</strong></li><li><strong>モジュールフェデレーション</strong></li><li><strong>カスタムローダー</strong></li><li><strong>レガシーブラウザサポート</strong></li></ul>',
    h2WhenVite: 'Viteを選ぶべき場合', whenViteList: '<ul><li><strong>新規プロジェクト</strong></li><li><strong>開発者体験</strong></li><li><strong>フレームワークプロジェクト</strong></li><li><strong>ライブラリ開発</strong></li></ul>',
    h2Faq: 'よくある質問', faq1Q: 'Viteはすべてのシナリオでwebpackより速いですか？', faq1A: 'Viteは開発では劇的に速いです。本番ビルドでは差は小さくなります。', faq2Q: 'ViteでWebpackローダーは使えますか？', faq2A: '直接は使えません。しかしほとんどのWebpackローダーにはVite同等品があります。', faq3Q: '2026年にWebpackは時代遅れですか？', faq3A: 'いいえ。Webpackはまだ何百万ものアプリを支えています。', faq4Q: '既存のWebpackプロジェクトをViteに移行すべきですか？', faq4A: '痛点次第です。', faq5Q: 'TurbopackとRspackはどうですか？', faq5A: 'TurbopackはNext.jsのデフォルト開発バンドラーです。Rspackはwebpack互換のRustバンドラーです。',
    relatedTitle: '関連ツールとガイド',
  },
  ko: {
    title: 'Webpack vs Vite 2026: 어떤 빌드 도구를 선택해야 할까?',
    intro: 'JavaScript 빌드 도구 환경이 크게 변했습니다. 2026년에 <strong>Vite</strong>는 새 프로젝트의 기본 선택이 되었고, <strong>Webpack</strong>은 수백만 프로덕션 애플리케이션을 계속 지원합니다.',
    h2Overview: '개요: 두 가지 철학', overviewP1: 'Webpack과 Vite는 JavaScript 번들링에 대한 근본적으로 다른 접근 방식을 나타냅니다.', overviewP2: 'Webpack은 2012년에 만들어졌고, Vite는 2020년에 만들어졌습니다.',
    h2Architecture: '아키텍처 비교', architectureP1: '핵심 아키텍처 차이가 모든 것을 결정합니다.',
    h2DevPerformance: '개발 성능 벤치마크', devPerfIntro: '개발 속도는 Vite가 압도적입니다.', thMetric: '지표', thWebpack: 'Webpack 5.9x', thVite: 'Vite 6.x', metricColdStart: '콜드 스타트', metricHmr: 'HMR 업데이트', metricFirstPage: '첫 페이지 로드', metricMemory: '메모리 사용량', metricDepInstall: '의존성 수', valWpCold: '8-18초', valViteCold: '200-600밀리초', valWpHmr: '200-800밀리초', valViteHmr: '10-50밀리초', valWpPage: '2-6초', valVitePage: '0.8-2초', valWpMem: '300-700MB', valViteMem: '100-250MB', valWpDeps: '12-20+ 의존성', valViteDeps: '2-4 의존성',
    h2ProdBuild: '프로덕션 빌드 성능', prodBuildIntro: 'CI/CD 파이프라인에 중요합니다.', thProjectSize: '프로젝트 크기', sizeSmall: '소규모 (~200 모듈)', sizeMedium: '중규모 (~1,500 모듈)', sizeLarge: '대규모 (~10,000 모듈)', valWpSmall: '~6-12초', valViteSmall: '~3-6초', valWpMedium: '~25-50초', valViteMedium: '~10-20초', valWpLarge: '~90-240초', valViteLarge: '~30-80초', prodNote: '<strong>참고:</strong> Vite 6+의 Rolldown은 프로덕션 빌드 시간을 3-10배 더 줄입니다.',
    h2Config: '설정 비교', configIntro: '설정 복잡성은 두 도구 간의 가장 큰 실제 차이입니다.', h3WebpackConfig: 'Webpack: 명시적 설정', wpConfigDesc: '프로덕션 Webpack 설정은 보통 80-300줄입니다.', h3ViteConfig: 'Vite: 관례 기반 설정', viteConfigDesc: 'Vite는 거의 설정 없이 작동합니다.',
    h2Features: '기능 비교 매트릭스', thFeature: '기능', thSupport: '지원 수준', featCodeSplit: '코드 스플리팅', featTreeShake: '트리 셰이킹', featHmr: '핫 모듈 교체', featCss: 'CSS 모듈', featTs: 'TypeScript', featSsr: 'SSR 지원', featModFed: '모듈 페더레이션', featLibMode: '라이브러리 모드', featLegacy: '레거시 브라우저 지원', featWorkers: 'Web Workers', valBoth: '둘 다', valWpOnly: 'Webpack', valViteOnly: 'Vite', featCodeSplitDetail: '둘 다 자동 및 수동 코드 분할을 지원합니다.', featModFedDetail: 'Webpack은 네이티브 모듈 페더레이션을 지원합니다.', featLibModeDetail: 'Vite에는 내장 라이브러리 모드가 있습니다.',
    h2Ecosystem: '에코시스템과 프레임워크 지원', ecosystemP1: 'Webpack은 가장 큰 플러그인 에코시스템을 보유하고 있습니다.', ecosystemP2: '2026년 프레임워크 지원:',
    h2Migration: 'Webpack에서 Vite로 마이그레이션', migrationIntro: 'Webpack에서 Vite로의 마이그레이션은 대부분의 프로젝트에서 간단합니다.', h3Step1: '단계 1: Vite 설치', h3Step2: '단계 2: vite.config.ts 생성', h3Step3: '단계 3: index.html 업데이트', h3Step4: '단계 4: package.json 스크립트 업데이트', h3Step5: '단계 5: 일반적인 마이그레이션 문제 처리', migrationIssuesIntro: '마이그레이션 시 일반적인 문제:',
    h2WhenWebpack: 'Webpack을 선택해야 할 때', whenWebpackList: '<ul><li><strong>기존 대규모 프로젝트</strong></li><li><strong>모듈 페더레이션</strong></li><li><strong>커스텀 로더</strong></li><li><strong>레거시 브라우저 지원</strong></li></ul>',
    h2WhenVite: 'Vite를 선택해야 할 때', whenViteList: '<ul><li><strong>새 프로젝트</strong></li><li><strong>개발자 경험</strong></li><li><strong>프레임워크 프로젝트</strong></li><li><strong>라이브러리 개발</strong></li></ul>',
    h2Faq: '자주 묻는 질문', faq1Q: 'Vite가 모든 시나리오에서 Webpack보다 빠른가요?', faq1A: '개발에서는 극적으로 빠릅니다. 프로덕션 빌드에서는 차이가 적습니다.', faq2Q: 'Vite에서 Webpack 로더를 사용할 수 있나요?', faq2A: '직접적으로는 안 됩니다. 하지만 대부분의 Webpack 로더에는 Vite 대체가 있습니다.', faq3Q: '2026년에 Webpack은 구식인가요?', faq3A: '아닙니다. 하지만 Vite가 새 프로젝트의 선호 선택이 되었습니다.', faq4Q: '기존 Webpack 프로젝트를 Vite로 마이그레이션해야 하나요?', faq4A: '고통 포인트에 따라 다릅니다.', faq5Q: 'Turbopack과 Rspack은?', faq5A: 'Turbopack은 Next.js 기본 개발 번들러입니다. Rspack은 Webpack 호환 Rust 번들러입니다.',
    relatedTitle: '관련 도구 및 가이드',
  },
  fr: {
    title: 'Webpack vs Vite 2026 : Quel outil de build choisir ?',
    intro: 'En 2026, <strong>Vite</strong> est devenu le choix par défaut pour les nouveaux projets, tandis que <strong>Webpack</strong> continue d\'alimenter des millions d\'applications.',
    h2Overview: 'Vue d\'ensemble : deux philosophies', overviewP1: 'Webpack et Vite représentent des approches fondamentalement différentes.', overviewP2: 'Webpack a été créé en 2012. Vite a été créé en 2020 par Evan You.',
    h2Architecture: 'Comparaison d\'architecture', architectureP1: 'La différence architecturale principale détermine tout le reste.',
    h2DevPerformance: 'Benchmarks de performance en développement', devPerfIntro: 'La vitesse de développement est le domaine où Vite excelle.', thMetric: 'Métrique', thWebpack: 'Webpack 5.9x', thVite: 'Vite 6.x', metricColdStart: 'Démarrage à froid', metricHmr: 'Mise à jour HMR', metricFirstPage: 'Premier chargement', metricMemory: 'Utilisation mémoire', metricDepInstall: 'Nombre de dépendances', valWpCold: '8-18s', valViteCold: '200-600ms', valWpHmr: '200-800ms', valViteHmr: '10-50ms', valWpPage: '2-6s', valVitePage: '0.8-2s', valWpMem: '300-700MB', valViteMem: '100-250MB', valWpDeps: '12-20+ deps', valViteDeps: '2-4 deps',
    h2ProdBuild: 'Performance de build en production', prodBuildIntro: 'Important pour les pipelines CI/CD.', thProjectSize: 'Taille du projet', sizeSmall: 'Petit (~200 modules)', sizeMedium: 'Moyen (~1 500 modules)', sizeLarge: 'Grand (~10 000 modules)', valWpSmall: '~6-12s', valViteSmall: '~3-6s', valWpMedium: '~25-50s', valViteMedium: '~10-20s', valWpLarge: '~90-240s', valViteLarge: '~30-80s', prodNote: '<strong>Note :</strong> Vite 6+ avec Rolldown réduit les temps de build de 3-10x.',
    h2Config: 'Comparaison de configuration', configIntro: 'La complexité de la configuration est une différence majeure.', h3WebpackConfig: 'Webpack : Configuration explicite', wpConfigDesc: 'Une config Webpack fait typiquement 80-300 lignes.', h3ViteConfig: 'Vite : Convention plutôt que configuration', viteConfigDesc: 'Vite fonctionne avec quasi-zéro configuration.',
    h2Features: 'Matrice de comparaison', thFeature: 'Fonctionnalité', thSupport: 'Niveau de support', featCodeSplit: 'Code Splitting', featTreeShake: 'Tree Shaking', featHmr: 'HMR', featCss: 'CSS Modules', featTs: 'TypeScript', featSsr: 'Support SSR', featModFed: 'Module Federation', featLibMode: 'Mode bibliothèque', featLegacy: 'Navigateurs anciens', featWorkers: 'Web Workers', valBoth: 'Les deux', valWpOnly: 'Webpack', valViteOnly: 'Vite', featCodeSplitDetail: 'Les deux supportent le code splitting.', featModFedDetail: 'Webpack a le Module Federation natif.', featLibModeDetail: 'Vite a un mode bibliothèque intégré.',
    h2Ecosystem: 'Écosystème et support des frameworks', ecosystemP1: 'Webpack a le plus grand écosystème de plugins.', ecosystemP2: 'Support des frameworks en 2026 :',
    h2Migration: 'Migration de Webpack vers Vite', migrationIntro: 'La migration est simple pour la plupart des projets.', h3Step1: 'Étape 1 : Installer Vite', h3Step2: 'Étape 2 : Créer vite.config.ts', h3Step3: 'Étape 3 : Mettre à jour index.html', h3Step4: 'Étape 4 : Mettre à jour les scripts', h3Step5: 'Étape 5 : Gérer les problèmes courants', migrationIssuesIntro: 'Problèmes courants de migration :',
    h2WhenWebpack: 'Quand choisir Webpack', whenWebpackList: '<ul><li><strong>Projets existants volumineux</strong></li><li><strong>Module Federation</strong></li><li><strong>Loaders personnalisés</strong></li></ul>',
    h2WhenVite: 'Quand choisir Vite', whenViteList: '<ul><li><strong>Nouveaux projets</strong></li><li><strong>Expérience développeur</strong></li><li><strong>Projets framework</strong></li></ul>',
    h2Faq: 'Questions fréquentes', faq1Q: 'Vite est-il plus rapide que Webpack dans tous les cas ?', faq1A: 'En développement, oui. En production, l\'écart est plus faible.', faq2Q: 'Peut-on utiliser des loaders Webpack avec Vite ?', faq2A: 'Pas directement. Mais il existe des équivalents.', faq3Q: 'Webpack est-il obsolète en 2026 ?', faq3A: 'Non. Webpack alimente toujours des millions d\'applications.', faq4Q: 'Dois-je migrer mon projet Webpack vers Vite ?', faq4A: 'Cela dépend de vos besoins.', faq5Q: 'Et Turbopack/Rspack ?', faq5A: 'Turbopack est le bundler dev par défaut de Next.js. Rspack est un bundler Rust compatible Webpack.',
    relatedTitle: 'Outils et guides associés',
  },
  de: {
    title: 'Webpack vs Vite 2026: Welches Build-Tool sollten Sie wählen?',
    intro: 'Im Jahr 2026 ist <strong>Vite</strong> zum Standard für neue Projekte geworden, während <strong>Webpack</strong> weiterhin Millionen von Anwendungen antreibt.',
    h2Overview: 'Überblick: Zwei Philosophien', overviewP1: 'Webpack und Vite verfolgen grundlegend unterschiedliche Ansätze.', overviewP2: 'Webpack wurde 2012 erstellt. Vite wurde 2020 von Evan You erstellt.',
    h2Architecture: 'Architekturvergleich', architectureP1: 'Der architektonische Kernunterschied bestimmt alles andere.',
    h2DevPerformance: 'Entwicklungsperformance-Benchmarks', devPerfIntro: 'Entwicklungsgeschwindigkeit ist Vites Stärke.', thMetric: 'Metrik', thWebpack: 'Webpack 5.9x', thVite: 'Vite 6.x', metricColdStart: 'Kaltstart', metricHmr: 'HMR-Update', metricFirstPage: 'Erster Seitenaufruf', metricMemory: 'Speicherverbrauch', metricDepInstall: 'Abhängigkeiten', valWpCold: '8-18s', valViteCold: '200-600ms', valWpHmr: '200-800ms', valViteHmr: '10-50ms', valWpPage: '2-6s', valVitePage: '0.8-2s', valWpMem: '300-700MB', valViteMem: '100-250MB', valWpDeps: '12-20+ Deps', valViteDeps: '2-4 Deps',
    h2ProdBuild: 'Produktions-Build-Performance', prodBuildIntro: 'Wichtig für CI/CD-Pipelines.', thProjectSize: 'Projektgröße', sizeSmall: 'Klein (~200 Module)', sizeMedium: 'Mittel (~1.500 Module)', sizeLarge: 'Groß (~10.000 Module)', valWpSmall: '~6-12s', valViteSmall: '~3-6s', valWpMedium: '~25-50s', valViteMedium: '~10-20s', valWpLarge: '~90-240s', valViteLarge: '~30-80s', prodNote: '<strong>Hinweis:</strong> Vite 6+ mit Rolldown reduziert Build-Zeiten um weitere 3-10x.',
    h2Config: 'Konfigurationsvergleich', configIntro: 'Die Konfigurationskomplexität ist ein großer Unterschied.', h3WebpackConfig: 'Webpack: Explizite Konfiguration', wpConfigDesc: 'Eine Webpack-Konfiguration umfasst typischerweise 80-300 Zeilen.', h3ViteConfig: 'Vite: Konvention vor Konfiguration', viteConfigDesc: 'Vite funktioniert nahezu ohne Konfiguration.',
    h2Features: 'Funktionsvergleich', thFeature: 'Funktion', thSupport: 'Support-Level', featCodeSplit: 'Code-Splitting', featTreeShake: 'Tree Shaking', featHmr: 'HMR', featCss: 'CSS-Module', featTs: 'TypeScript', featSsr: 'SSR-Support', featModFed: 'Module Federation', featLibMode: 'Bibliotheksmodus', featLegacy: 'Legacy-Browser', featWorkers: 'Web Workers', valBoth: 'Beide', valWpOnly: 'Webpack', valViteOnly: 'Vite', featCodeSplitDetail: 'Beide unterstützen Code-Splitting.', featModFedDetail: 'Webpack hat natives Module Federation.', featLibModeDetail: 'Vite hat einen eingebauten Bibliotheksmodus.',
    h2Ecosystem: 'Ökosystem und Framework-Unterstützung', ecosystemP1: 'Webpack hat das größte Plugin-Ökosystem.', ecosystemP2: 'Framework-Unterstützung 2026:',
    h2Migration: 'Migration von Webpack zu Vite', migrationIntro: 'Die Migration ist für die meisten Projekte einfach.', h3Step1: 'Schritt 1: Vite installieren', h3Step2: 'Schritt 2: vite.config.ts erstellen', h3Step3: 'Schritt 3: index.html aktualisieren', h3Step4: 'Schritt 4: package.json-Skripte aktualisieren', h3Step5: 'Schritt 5: Häufige Probleme beheben', migrationIssuesIntro: 'Häufige Migrationsprobleme:',
    h2WhenWebpack: 'Wann Webpack wählen', whenWebpackList: '<ul><li><strong>Bestehende große Projekte</strong></li><li><strong>Module Federation</strong></li><li><strong>Benutzerdefinierte Loader</strong></li></ul>',
    h2WhenVite: 'Wann Vite wählen', whenViteList: '<ul><li><strong>Neue Projekte</strong></li><li><strong>Entwicklererfahrung</strong></li><li><strong>Framework-Projekte</strong></li></ul>',
    h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Ist Vite in jedem Szenario schneller?', faq1A: 'In der Entwicklung ja. Bei Produktions-Builds ist der Unterschied kleiner.', faq2Q: 'Kann man Webpack-Loader mit Vite verwenden?', faq2A: 'Nicht direkt. Aber es gibt Äquivalente.', faq3Q: 'Ist Webpack 2026 veraltet?', faq3A: 'Nein. Webpack betreibt weiterhin Millionen von Anwendungen.', faq4Q: 'Sollte ich mein Webpack-Projekt zu Vite migrieren?', faq4A: 'Hängt von den Schmerzpunkten ab.', faq5Q: 'Was ist mit Turbopack/Rspack?', faq5A: 'Turbopack ist der Standard-Dev-Bundler für Next.js. Rspack ist ein Webpack-kompatibler Rust-Bundler.',
    relatedTitle: 'Verwandte Tools und Anleitungen',
  },
  es: {
    title: 'Webpack vs Vite 2026: Cual herramienta de build elegir?',
    intro: 'En 2026, <strong>Vite</strong> se ha convertido en la opcion predeterminada para nuevos proyectos, mientras <strong>Webpack</strong> sigue impulsando millones de aplicaciones.',
    h2Overview: 'Resumen: dos filosofias', overviewP1: 'Webpack y Vite representan enfoques fundamentalmente diferentes.', overviewP2: 'Webpack fue creado en 2012. Vite fue creado en 2020 por Evan You.',
    h2Architecture: 'Comparacion de arquitectura', architectureP1: 'La diferencia arquitectonica central determina todo lo demas.',
    h2DevPerformance: 'Benchmarks de rendimiento en desarrollo', devPerfIntro: 'La velocidad de desarrollo es donde Vite domina.', thMetric: 'Metrica', thWebpack: 'Webpack 5.9x', thVite: 'Vite 6.x', metricColdStart: 'Arranque en frio', metricHmr: 'Actualizacion HMR', metricFirstPage: 'Primera carga', metricMemory: 'Uso de memoria', metricDepInstall: 'Dependencias', valWpCold: '8-18s', valViteCold: '200-600ms', valWpHmr: '200-800ms', valViteHmr: '10-50ms', valWpPage: '2-6s', valVitePage: '0.8-2s', valWpMem: '300-700MB', valViteMem: '100-250MB', valWpDeps: '12-20+ deps', valViteDeps: '2-4 deps',
    h2ProdBuild: 'Rendimiento de build en produccion', prodBuildIntro: 'Importante para pipelines CI/CD.', thProjectSize: 'Tamano del proyecto', sizeSmall: 'Pequeno (~200 modulos)', sizeMedium: 'Mediano (~1.500 modulos)', sizeLarge: 'Grande (~10.000 modulos)', valWpSmall: '~6-12s', valViteSmall: '~3-6s', valWpMedium: '~25-50s', valViteMedium: '~10-20s', valWpLarge: '~90-240s', valViteLarge: '~30-80s', prodNote: '<strong>Nota:</strong> Vite 6+ con Rolldown reduce los tiempos de build 3-10x mas.',
    h2Config: 'Comparacion de configuracion', configIntro: 'La complejidad de configuracion es una gran diferencia.', h3WebpackConfig: 'Webpack: Configuracion explicita', wpConfigDesc: 'Una config de Webpack tipica tiene 80-300 lineas.', h3ViteConfig: 'Vite: Convencion sobre configuracion', viteConfigDesc: 'Vite funciona con casi cero configuracion.',
    h2Features: 'Matriz de comparacion', thFeature: 'Caracteristica', thSupport: 'Nivel de soporte', featCodeSplit: 'Code Splitting', featTreeShake: 'Tree Shaking', featHmr: 'HMR', featCss: 'CSS Modules', featTs: 'TypeScript', featSsr: 'Soporte SSR', featModFed: 'Module Federation', featLibMode: 'Modo biblioteca', featLegacy: 'Navegadores antiguos', featWorkers: 'Web Workers', valBoth: 'Ambos', valWpOnly: 'Webpack', valViteOnly: 'Vite', featCodeSplitDetail: 'Ambos soportan code splitting.', featModFedDetail: 'Webpack tiene Module Federation nativo.', featLibModeDetail: 'Vite tiene modo biblioteca integrado.',
    h2Ecosystem: 'Ecosistema y soporte de frameworks', ecosystemP1: 'Webpack tiene el ecosistema de plugins mas grande.', ecosystemP2: 'Soporte de frameworks en 2026:',
    h2Migration: 'Migracion de Webpack a Vite', migrationIntro: 'La migracion es sencilla para la mayoria de proyectos.', h3Step1: 'Paso 1: Instalar Vite', h3Step2: 'Paso 2: Crear vite.config.ts', h3Step3: 'Paso 3: Actualizar index.html', h3Step4: 'Paso 4: Actualizar scripts', h3Step5: 'Paso 5: Manejar problemas comunes', migrationIssuesIntro: 'Problemas comunes de migracion:',
    h2WhenWebpack: 'Cuando elegir Webpack', whenWebpackList: '<ul><li><strong>Proyectos existentes grandes</strong></li><li><strong>Module Federation</strong></li><li><strong>Loaders personalizados</strong></li></ul>',
    h2WhenVite: 'Cuando elegir Vite', whenViteList: '<ul><li><strong>Nuevos proyectos</strong></li><li><strong>Experiencia de desarrollador</strong></li><li><strong>Proyectos framework</strong></li></ul>',
    h2Faq: 'Preguntas frecuentes', faq1Q: 'Es Vite mas rapido en todos los escenarios?', faq1A: 'En desarrollo, si. En produccion, la diferencia es menor.', faq2Q: 'Se pueden usar loaders de Webpack con Vite?', faq2A: 'No directamente. Pero existen equivalentes.', faq3Q: 'Esta Webpack obsoleto en 2026?', faq3A: 'No. Webpack sigue impulsando millones de aplicaciones.', faq4Q: 'Debo migrar mi proyecto Webpack a Vite?', faq4A: 'Depende de los puntos de dolor.', faq5Q: 'Y Turbopack/Rspack?', faq5A: 'Turbopack es el bundler dev por defecto de Next.js. Rspack es un bundler Rust compatible con Webpack.',
    relatedTitle: 'Herramientas y guias relacionadas',
  },
};

export default function WebpackVsVite2026({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Overview}</h2>
      <p>{s.overviewP1}</p>
      <p>{s.overviewP2}</p>

      <h2>{s.h2Architecture}</h2>
      <p>{s.architectureP1}</p>
      <pre><code className="language-text">{`Webpack Architecture (Bundle-First):
  Source Files --> Loaders --> Dependency Graph --> Bundle --> Browser
  [.tsx .css .svg] [babel] [resolve all imports] [chunk] [serve bundle]

  - Bundles EVERYTHING before serving
  - JavaScript-based pipeline
  - HMR: re-bundle changed module + dependents

Vite Architecture (Native ESM):
  Source Files --> Browser (Native ESM imports)
  [.tsx .css .svg] [serve as-is via HTTP]

  - Dev: NO bundling - browser handles ES imports
  - esbuild: pre-bundles node_modules only
  - Rollup/Rolldown: production builds only
  - HMR: invalidate single module, browser re-fetches`}</code></pre>

      <h2>{s.h2DevPerformance}</h2>
      <p>{s.devPerfIntro}</p>
      <table>
        <thead><tr><th>{s.thMetric}</th><th>{s.thWebpack}</th><th>{s.thVite}</th></tr></thead>
        <tbody>
          <tr><td>{s.metricColdStart}</td><td>{s.valWpCold}</td><td>{s.valViteCold}</td></tr>
          <tr><td>{s.metricHmr}</td><td>{s.valWpHmr}</td><td>{s.valViteHmr}</td></tr>
          <tr><td>{s.metricFirstPage}</td><td>{s.valWpPage}</td><td>{s.valVitePage}</td></tr>
          <tr><td>{s.metricMemory}</td><td>{s.valWpMem}</td><td>{s.valViteMem}</td></tr>
          <tr><td>{s.metricDepInstall}</td><td>{s.valWpDeps}</td><td>{s.valViteDeps}</td></tr>
        </tbody>
      </table>

      <h2>{s.h2ProdBuild}</h2>
      <p>{s.prodBuildIntro}</p>
      <table>
        <thead><tr><th>{s.thProjectSize}</th><th>{s.thWebpack}</th><th>{s.thVite}</th></tr></thead>
        <tbody>
          <tr><td>{s.sizeSmall}</td><td>{s.valWpSmall}</td><td>{s.valViteSmall}</td></tr>
          <tr><td>{s.sizeMedium}</td><td>{s.valWpMedium}</td><td>{s.valViteMedium}</td></tr>
          <tr><td>{s.sizeLarge}</td><td>{s.valWpLarge}</td><td>{s.valViteLarge}</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: s.prodNote }} />

      <h2>{s.h2Config}</h2>
      <p>{s.configIntro}</p>

      <h3>{s.h3WebpackConfig}</h3>
      <p>{s.wpConfigDesc}</p>
      <pre><code className="language-javascript">{`// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\\.(png|svg|jpg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  devServer: { port: 3000, hot: true },
};

// Required dev dependencies: ~12-15 packages`}</code></pre>

      <h3>{s.h3ViteConfig}</h3>
      <p>{s.viteConfigDesc}</p>
      <pre><code className="language-typescript">{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});

// Required dev dependencies: 2 packages (vite + @vitejs/plugin-react)`}</code></pre>

      <h2>{s.h2Features}</h2>
      <pre><code className="language-text">{`Feature              Webpack 5          Vite 6            Winner
-------------------------------------------------------------------
Code Splitting       SplitChunksPlugin  Rollup chunks     Tie
Tree Shaking         ES modules         ES modules        Tie
HMR Speed            200-800ms          10-50ms           Vite
CSS Modules          css-loader         Built-in          Vite
TypeScript           ts-loader/babel    Built-in (esbuild) Vite
SSR Support          Manual setup       First-class       Vite
Module Federation    Native             Plugin needed     Webpack
Library Mode         Manual config      Built-in          Vite
Legacy Browsers      babel-loader       @vitejs/legacy    Tie
Web Workers          worker-loader      Built-in          Vite
Source Maps          Multiple strategies Multiple          Tie
Config Complexity    80-300 lines       10-30 lines       Vite
Plugin Ecosystem     Thousands          Growing (500+)    Webpack`}</code></pre>

      <h2>{s.h2Ecosystem}</h2>
      <p>{s.ecosystemP1}</p>
      <p>{s.ecosystemP2}</p>
      <pre><code className="language-text">{`Framework        Webpack          Vite           Default Choice
-------------------------------------------------------------------
React            Full support     Full support   Vite (create-vite)
Vue 3            vue-loader       Built-in       Vite (create-vue)
Svelte           svelte-loader    Built-in       Vite (create-svelte)
SolidJS          Community        Built-in       Vite
Angular          Built-in (CLI)   Analog.js      Webpack (Angular CLI)
Next.js          Production       Not used       Webpack/Turbopack
Nuxt 3           Not used         Built-in       Vite
Astro            Not used         Built-in       Vite
Remix            Legacy           Built-in       Vite`}</code></pre>

      <h2>{s.h2Migration}</h2>
      <p>{s.migrationIntro}</p>

      <h3>{s.h3Step1}</h3>
      <pre><code className="language-bash">{`# Remove Webpack dependencies
npm uninstall webpack webpack-cli webpack-dev-server \\
  html-webpack-plugin mini-css-extract-plugin \\
  ts-loader css-loader postcss-loader style-loader \\
  babel-loader @babel/core @babel/preset-env

# Install Vite
npm install --save-dev vite @vitejs/plugin-react`}</code></pre>

      <h3>{s.h3Step2}</h3>
      <pre><code className="language-typescript">{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: { port: 3000 },
});`}</code></pre>

      <h3>{s.h3Step3}</h3>
      <pre><code className="language-html">{`<!-- Move index.html to project root (not public/) -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
  <!-- Vite requires this script tag -->
  <script type="module" src="/src/index.tsx"></script>
</body>
</html>`}</code></pre>

      <h3>{s.h3Step4}</h3>
      <pre><code className="language-json">{`{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}`}</code></pre>

      <h3>{s.h3Step5}</h3>
      <p>{s.migrationIssuesIntro}</p>
      <pre><code className="language-typescript">{`// Issue 1: require() calls - convert to import
// Before (Webpack)
const logo = require('./logo.png');
// After (Vite)
import logo from './logo.png';

// Issue 2: process.env - use import.meta.env
// Before (Webpack)
const apiUrl = process.env.REACT_APP_API_URL;
// After (Vite)
const apiUrl = import.meta.env.VITE_API_URL;

// Issue 3: Global CSS imports
// Before (Webpack with css-loader)
import styles from './App.module.css';
// After (Vite - same syntax, works out of the box)
import styles from './App.module.css';

// Issue 4: SVG as React components
// Before (Webpack with @svgr/webpack)
import { ReactComponent as Logo } from './logo.svg';
// After (Vite with vite-plugin-svgr)
import Logo from './logo.svg?react';`}</code></pre>

      <h2>{s.h2WhenWebpack}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.whenWebpackList }} />

      <h2>{s.h2WhenVite}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.whenViteList }} />

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
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format build configs and package.json</li>
        <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML Converter</Link> - Convert between config formats</li>
        <li><Link href={`/${lang}/tools/js-html-formatter`}>JS/HTML Formatter</Link> - Beautify bundled output</li>
        <li><Link href={`/${lang}/blog/vite-vs-webpack-esbuild-comparison`}>Vite vs Webpack vs esbuild Detailed Comparison</Link></li>
        <li><Link href={`/${lang}/blog/typescript-vs-javascript`}>TypeScript vs JavaScript</Link></li>
      </ul>
    </>
  );
}
