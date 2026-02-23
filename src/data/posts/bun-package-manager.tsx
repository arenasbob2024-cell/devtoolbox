'use client';
import React from 'react';

const codeBunInstall = `# Install Bun
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version  # 1.x.x

# Install dependencies (reads package.json)
bun install

# Install a specific package
bun add express
bun add -d typescript @types/node   # dev dependency
bun add -g bunx                     # global install

# Remove a package
bun remove lodash

# Update all packages
bun update

# Run a script from package.json
bun run build
bun run dev

# Execute a TypeScript file directly (no transpile step)
bun run index.ts`;

const codeBunWorkspaces = `// package.json — monorepo root
{
  "name": "my-monorepo",
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "bun run --filter '*' dev",
    "build": "bun run --filter '*' build",
    "test": "bun test"
  }
}

// Run a script only in specific workspace
bun run --filter @myapp/web dev

// Install a dependency in a specific workspace
bun add react --cwd apps/web

// Link a local workspace package
// (Bun automatically resolves workspace: protocol)`;

const codeBunLockfile = `# bun.lockb is a binary lockfile (much faster to parse than JSON)
# To view lockfile contents in human-readable form:
bun bun.lockb  # prints as yarn.lock format

# To regenerate lockfile:
bun install --frozen-lockfile  # CI: fails if lockfile is stale

# Migrating from npm/yarn/pnpm:
# Bun reads package-lock.json, yarn.lock, pnpm-lock.yaml
# to preserve existing versions on first install

# .gitignore for Bun:
# node_modules/
# *.lock  (optional — commit bun.lockb for reproducible installs)`;

const codeBunBenchmark = `# Benchmark: installing react + 1400 packages
# (warm cache, MacBook M2 Pro)

npm install:   28.3s
yarn install:  14.1s
pnpm install:   9.4s
bun install:    1.2s   # 23x faster than npm!

# Cold cache (first install, no node_modules)
npm install:   38.7s
bun install:    4.1s   # 9x faster

# bun install uses:
# - Symlink-based node_modules (like pnpm)
# - Binary lockfile (bun.lockb) for fast parsing
# - Parallel downloads
# - Global package cache (~/.bun/install/cache)
# - Native code (written in Zig)`;

const codeBunX = `# bunx — like npx but instant (no download delay)
bunx create-next-app@latest my-app
bunx prettier --write .
bunx eslint src/

# Run TypeScript directly
bun index.ts            # works without ts-node or compilation
bun --watch server.ts   # auto-restart on file changes

# Bun's built-in test runner (Jest-compatible API)
bun test
bun test --watch
bun test src/utils.test.ts

// Example test file
import { expect, test, describe } from 'bun:test';

describe('math', () => {
    test('adds numbers', () => {
        expect(1 + 2).toBe(3);
    });

    test('async operations', async () => {
        const result = await fetch('https://api.example.com/data');
        expect(result.ok).toBe(true);
    });
});`;

const codeBunNpm = `// package.json scripts with Bun
{
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target node",
    "bundle:web": "bun build src/app.ts --outdir public/js --target browser --minify",
    "test": "bun test",
    "lint": "bunx eslint src/",
    "format": "bunx prettier --write src/"
  }
}

// Bun's built-in bundler (replaces esbuild/webpack for simple cases)
// bun build src/index.ts --outdir dist --target node --minify

// Environment variables (Bun auto-loads .env files)
// No need for dotenv package!
console.log(process.env.DATABASE_URL); // works in Bun automatically`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Bun 1.x Package Manager: Faster than npm, pnpm, and Yarn',
    intro: 'Bun is an all-in-one JavaScript runtime and toolkit written in Zig. Its package manager installs dependencies up to 23x faster than npm by using a binary lockfile, a global package cache, and symlink-based node_modules. In 2026, Bun 1.x has become a serious alternative to the Node.js ecosystem for both development and production.',
    installTitle: 'Installation and Basic Commands',
    installDesc: 'Bun installs in seconds and works as a drop-in replacement for npm commands. It reads package.json, installs to node_modules, and supports all npm registry packages.',
    workspacesTitle: 'Workspaces (Monorepo Support)',
    workspacesDesc: 'Bun supports npm-style workspaces for monorepos. Use --filter to run scripts across all workspaces, or target specific packages.',
    lockfileTitle: 'The Binary Lockfile (bun.lockb)',
    lockfileDesc: 'Bun uses a binary lockfile (bun.lockb) instead of JSON. It is dramatically faster to parse than package-lock.json or yarn.lock, which is why bun install is so fast.',
    benchmarkTitle: 'Performance Benchmarks',
    benchmarkDesc: 'Bun\'s package manager is substantially faster than all alternatives due to its native code (Zig), binary lockfile, parallel downloads, and global cache.',
    bunxTitle: 'bunx and Built-in Tools',
    bunxDesc: 'bunx runs packages without downloading — it uses cached binaries. Bun also includes a built-in test runner (Jest-compatible), TypeScript runner, bundler, and .env loader.',
    scriptsTitle: 'Scripts and Build Integration',
    scriptsDesc: 'Bun runs package.json scripts faster than npm/yarn because it avoids spinning up a new Node.js process. It also includes a built-in bundler that can replace esbuild for simple use cases.',
    comparisonTitle: 'Bun vs npm vs pnpm vs Yarn',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Commit bun.lockb to version control for reproducible installs. Use --frozen-lockfile in CI to catch lockfile drift.',
    bp2: 'Use bun --watch for development — it is faster than nodemon or ts-node-dev and works with TypeScript natively.',
    bp3: 'Migrate from npm scripts gradually: replace npm run with bun run and npm install with bun install first.',
    bp4: 'For monorepos, Bun workspaces are simpler than Turborepo\'s configuration but pair well with it for task caching.',
    bp5: 'Bun auto-loads .env, .env.local, .env.production — no dotenv package needed. Use this to simplify config.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is Bun production-ready in 2026?',
    faq1a: 'Yes. Bun 1.0+ reached stability in 2023, and 1.x in 2024-2026 has full Node.js API compatibility. Major companies use it in production. Oven (the company behind Bun) publishes compatibility reports showing 99%+ Node.js API coverage.',
    faq2q: 'Does Bun work with all npm packages?',
    faq2a: 'Almost all packages work. Bun implements Node.js built-in modules (fs, path, crypto, http, etc.) and is compatible with the npm registry. Edge cases exist for packages that use native Node addons (.node files) — those require native compilation and may not work immediately.',
    faq3q: 'Can I use Bun with Next.js?',
    faq3a: 'Yes for the package manager — run bun install instead of npm install and use bun run dev. For the runtime, Next.js 14+ added experimental Bun support. The package manager works today without any issues.',
    faq4q: 'How does bun.lockb differ from package-lock.json?',
    faq4a: 'bun.lockb is a binary format (not human-readable) that stores resolved package versions, checksums, and download URLs. It parses in microseconds vs. milliseconds for JSON lockfiles. You can view its contents with the bun bun.lockb command.',
    faq5q: 'Should I use Bun or pnpm for a new project?',
    faq5a: 'Both are excellent choices. Bun is faster (especially for install) and includes a runtime, test runner, and bundler. pnpm has broader ecosystem adoption, better monorepo tooling with Changesets, and is more battle-tested in large enterprise monorepos. For greenfield projects, Bun\'s all-in-one approach is very appealing.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Bun 1.x 包管理器：比 npm、pnpm 和 Yarn 更快',
    intro: 'Bun 是一个用 Zig 编写的全能 JavaScript 运行时和工具集。其包管理器通过使用二进制锁文件、全局包缓存和基于符号链接的 node_modules，安装依赖比 npm 快多达 23 倍。',
    installTitle: '安装和基本命令',
    installDesc: 'Bun 安装只需几秒钟，可作为 npm 命令的即插即用替代品。它读取 package.json，安装到 node_modules，并支持所有 npm 注册表包。',
    workspacesTitle: '工作区（Monorepo 支持）',
    workspacesDesc: 'Bun 支持 npm 风格的 monorepo 工作区。使用 --filter 在所有工作区运行脚本，或针对特定包。',
    lockfileTitle: '二进制锁文件（bun.lockb）',
    lockfileDesc: 'Bun 使用二进制锁文件（bun.lockb）而非 JSON。解析速度比 package-lock.json 或 yarn.lock 快得多，这也是 bun install 如此快速的原因。',
    benchmarkTitle: '性能基准测试',
    benchmarkDesc: 'Bun 的包管理器因其原生代码（Zig）、二进制锁文件、并行下载和全局缓存而大幅领先于所有竞争对手。',
    bunxTitle: 'bunx 和内置工具',
    bunxDesc: 'bunx 无需下载即可运行包——使用缓存的二进制文件。Bun 还包含内置测试运行器（Jest 兼容）、TypeScript 运行器、打包器和 .env 加载器。',
    scriptsTitle: '脚本和构建集成',
    scriptsDesc: 'Bun 比 npm/yarn 更快地运行 package.json 脚本，因为它避免了启动新的 Node.js 进程。它还包含一个内置打包器，可以替代 esbuild 用于简单的用例。',
    comparisonTitle: 'Bun vs npm vs pnpm vs Yarn',
    bestPracticesTitle: '最佳实践',
    bp1: '将 bun.lockb 提交到版本控制以实现可重现的安装。在 CI 中使用 --frozen-lockfile 来检测锁文件漂移。',
    bp2: '开发时使用 bun --watch——比 nodemon 或 ts-node-dev 更快，且原生支持 TypeScript。',
    bp3: '逐步从 npm 脚本迁移：先将 npm run 替换为 bun run，将 npm install 替换为 bun install。',
    bp4: '对于 monorepo，Bun 工作区比 Turborepo 配置简单，但与后者配合用于任务缓存效果很好。',
    bp5: 'Bun 自动加载 .env、.env.local、.env.production——无需 dotenv 包。使用此功能简化配置。',
    faqTitle: '常见问题',
    faq1q: '2026 年 Bun 是否适合生产使用？',
    faq1a: '是的。Bun 1.0+ 于 2023 年达到稳定，1.x 在 2024-2026 年具有完整的 Node.js API 兼容性。许多主要公司在生产中使用它。',
    faq2q: 'Bun 与所有 npm 包兼容吗？',
    faq2a: '几乎所有包都可以工作。边缘情况存在于使用原生 Node 插件（.node 文件）的包，这些包可能不会立即工作。',
    faq3q: '我可以在 Next.js 中使用 Bun 吗？',
    faq3a: '可以用于包管理器——运行 bun install 替代 npm install，使用 bun run dev。对于运行时，Next.js 14+ 添加了实验性 Bun 支持。',
    faq4q: 'bun.lockb 与 package-lock.json 有何不同？',
    faq4a: 'bun.lockb 是二进制格式（非人类可读），存储已解析的包版本、校验和和下载 URL。解析速度比 JSON 锁文件快数个数量级。',
    faq5q: '新项目应该使用 Bun 还是 pnpm？',
    faq5a: '两者都是极佳选择。Bun 更快（尤其是安装），并包含运行时、测试运行器和打包器。pnpm 有更广泛的生态系统采用，在大型企业 monorepo 中更经过实战检验。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Bun 1.x Package Manager : Plus rapide que npm, pnpm et Yarn', intro: 'Bun est un runtime JavaScript tout-en-un écrit en Zig. Son gestionnaire de paquets installe les dépendances jusqu\'à 23x plus vite que npm.', installTitle: 'Installation et commandes de base', installDesc: 'Bun s\'installe en quelques secondes et fonctionne comme un remplacement direct aux commandes npm.', workspacesTitle: 'Workspaces (support monorepo)', workspacesDesc: 'Bun supporte les workspaces de style npm pour les monorepos.', lockfileTitle: 'Le fichier de verrouillage binaire (bun.lockb)', lockfileDesc: 'Bun utilise un fichier de verrouillage binaire au lieu de JSON.', benchmarkTitle: 'Benchmarks de performance', benchmarkDesc: 'Le gestionnaire de paquets de Bun est nettement plus rapide que toutes les alternatives.', bunxTitle: 'bunx et outils intégrés', bunxDesc: 'bunx exécute des paquets sans téléchargement en utilisant des binaires en cache.', scriptsTitle: 'Scripts et intégration build', scriptsDesc: 'Bun exécute les scripts package.json plus vite que npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Bonnes pratiques', bp1: 'Committer bun.lockb pour des installations reproductibles.', bp2: 'Utiliser bun --watch pour le développement.', bp3: 'Migrer progressivement depuis npm.', bp4: 'Pour les monorepos, combiner Bun workspaces avec Turborepo.', bp5: 'Bun charge automatiquement .env — pas besoin de dotenv.', faqTitle: 'Foire aux questions', faq1q: 'Bun est-il prêt pour la production en 2026 ?', faq1a: 'Oui. Bun 1.0+ a atteint la stabilité en 2023 avec une couverture API Node.js à 99%+.', faq2q: 'Bun fonctionne-t-il avec tous les paquets npm ?', faq2a: 'Presque tous. Les cas limites concernent les paquets utilisant des addons natifs Node.', faq3q: 'Puis-je utiliser Bun avec Next.js ?', faq3a: 'Oui pour le gestionnaire de paquets — bun install fonctionne immédiatement.', faq4q: 'Comment bun.lockb diffère-t-il de package-lock.json ?', faq4a: 'bun.lockb est un format binaire qui se parse en microsecondes.', faq5q: 'Bun ou pnpm pour un nouveau projet ?', faq5a: 'Les deux sont excellents. Bun pour l\'approche tout-en-un, pnpm pour les grands monorepos.', relatedTitle: 'Outils associés' },
  de: { title: 'Bun 1.x Paketmanager: Schneller als npm, pnpm und Yarn', intro: 'Bun ist eine All-in-One JavaScript-Runtime und Toolkit in Zig. Der Paketmanager installiert Abhängigkeiten bis zu 23x schneller als npm.', installTitle: 'Installation und Grundbefehle', installDesc: 'Bun installiert sich in Sekunden und funktioniert als Drop-in-Ersatz für npm-Befehle.', workspacesTitle: 'Workspaces (Monorepo-Unterstützung)', workspacesDesc: 'Bun unterstützt npm-style Workspaces für Monorepos.', lockfileTitle: 'Die binäre Lockfile (bun.lockb)', lockfileDesc: 'Bun verwendet eine binäre Lockfile statt JSON.', benchmarkTitle: 'Leistungs-Benchmarks', benchmarkDesc: 'Buns Paketmanager ist deutlich schneller als alle Alternativen.', bunxTitle: 'bunx und eingebaute Tools', bunxDesc: 'bunx führt Pakete ohne Download aus — verwendet gecachte Binärdateien.', scriptsTitle: 'Skripte und Build-Integration', scriptsDesc: 'Bun führt package.json-Skripte schneller aus als npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Best Practices', bp1: 'bun.lockb für reproduzierbare Installs committen.', bp2: 'bun --watch für die Entwicklung verwenden.', bp3: 'Schrittweise von npm migrieren.', bp4: 'Für Monorepos Bun Workspaces mit Turborepo kombinieren.', bp5: 'Bun lädt .env automatisch — kein dotenv-Paket nötig.', faqTitle: 'Häufige Fragen', faq1q: 'Ist Bun 2026 produktionsbereit?', faq1a: 'Ja. Bun 1.0+ erreichte 2023 Stabilität mit 99%+ Node.js-API-Abdeckung.', faq2q: 'Funktioniert Bun mit allen npm-Paketen?', faq2a: 'Fast alle. Ausnahmen sind Pakete mit nativen Node-Addons.', faq3q: 'Kann ich Bun mit Next.js verwenden?', faq3a: 'Ja für den Paketmanager — bun install funktioniert sofort.', faq4q: 'Wie unterscheidet sich bun.lockb von package-lock.json?', faq4a: 'bun.lockb ist ein Binärformat, das in Mikrosekunden geparst wird.', faq5q: 'Bun oder pnpm für ein neues Projekt?', faq5a: 'Beide sind ausgezeichnet. Bun für den All-in-One-Ansatz, pnpm für große Monorepos.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Bun 1.x Package Manager: Más rápido que npm, pnpm y Yarn', intro: 'Bun es un runtime JavaScript todo-en-uno escrito en Zig. Su gestor de paquetes instala dependencias hasta 23x más rápido que npm.', installTitle: 'Instalación y comandos básicos', installDesc: 'Bun se instala en segundos y funciona como reemplazo directo de los comandos npm.', workspacesTitle: 'Workspaces (soporte monorepo)', workspacesDesc: 'Bun soporta workspaces de estilo npm para monorepos.', lockfileTitle: 'El archivo de bloqueo binario (bun.lockb)', lockfileDesc: 'Bun usa un archivo de bloqueo binario en lugar de JSON.', benchmarkTitle: 'Benchmarks de rendimiento', benchmarkDesc: 'El gestor de paquetes de Bun es sustancialmente más rápido que todas las alternativas.', bunxTitle: 'bunx y herramientas integradas', bunxDesc: 'bunx ejecuta paquetes sin descargar usando binarios en caché.', scriptsTitle: 'Scripts e integración de build', scriptsDesc: 'Bun ejecuta scripts de package.json más rápido que npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Mejores prácticas', bp1: 'Hacer commit de bun.lockb para instalaciones reproducibles.', bp2: 'Usar bun --watch para desarrollo.', bp3: 'Migrar gradualmente desde npm.', bp4: 'Para monorepos, combinar Bun workspaces con Turborepo.', bp5: 'Bun carga .env automáticamente — no se necesita dotenv.', faqTitle: 'Preguntas frecuentes', faq1q: '¿Está Bun listo para producción en 2026?', faq1a: 'Sí. Bun 1.0+ alcanzó estabilidad en 2023 con 99%+ de cobertura de API de Node.js.', faq2q: '¿Bun funciona con todos los paquetes npm?', faq2a: 'Casi todos. Los casos límite son paquetes que usan addons nativos de Node.', faq3q: '¿Puedo usar Bun con Next.js?', faq3a: 'Sí para el gestor de paquetes — bun install funciona de inmediato.', faq4q: '¿Cómo difiere bun.lockb de package-lock.json?', faq4a: 'bun.lockb es formato binario que se parsea en microsegundos.', faq5q: '¿Bun o pnpm para un nuevo proyecto?', faq5a: 'Ambos son excelentes. Bun para el enfoque todo-en-uno, pnpm para grandes monorepos.', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'Bun 1.x パッケージマネージャー：npm、pnpm、Yarnより高速', intro: 'Bunはzig製の全能JavaScriptランタイム。パッケージマネージャーはバイナリロックファイル、グローバルキャッシュ、シンリンクnode_modulesでnpmより最大23倍速くインストール。', installTitle: 'インストールと基本コマンド', installDesc: 'Bunは数秒でインストールでき、npmコマンドのドロップイン代替として機能します。', workspacesTitle: 'ワークスペース（モノレポサポート）', workspacesDesc: 'Bunはモノレポのためのnpmスタイルワークスペースをサポートします。', lockfileTitle: 'バイナリロックファイル（bun.lockb）', lockfileDesc: 'BunはJSONの代わりにバイナリロックファイルを使用します。', benchmarkTitle: 'パフォーマンスベンチマーク', benchmarkDesc: 'Bunのパッケージマネージャーはネイティブコード（Zig）、バイナリロックファイル、並列ダウンロード、グローバルキャッシュにより大幅に高速です。', bunxTitle: 'bunxと組み込みツール', bunxDesc: 'bunxはキャッシュされたバイナリを使用してダウンロードなしでパッケージを実行します。', scriptsTitle: 'スクリプトとビルド統合', scriptsDesc: 'Bunはnpm/yarnよりも速くpackage.jsonスクリプトを実行します。', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'ベストプラクティス', bp1: '再現性のあるインストールのためにbun.lockbをバージョン管理にコミット。', bp2: '開発にはbun --watchを使用。', bp3: 'npmから段階的に移行。', bp4: 'モノレポにはBunワークスペースとTurborepoを組み合わせ。', bp5: 'Bunは.envを自動ロード — dotenvパッケージ不要。', faqTitle: 'よくある質問', faq1q: '2026年のBunは本番環境で使えますか？', faq1a: 'はい。Bun 1.0+は2023年に安定に達し、99%以上のNode.js APIカバレッジを持ちます。', faq2q: 'Bunはすべてのnpmパッケージで動作しますか？', faq2a: 'ほぼすべて。ネイティブNodeアドオンを使うパッケージには例外があります。', faq3q: 'BunをNext.jsで使えますか？', faq3a: 'パッケージマネージャーとしては即座に — bun installが動作します。', faq4q: 'bun.lockbとpackage-lock.jsonの違いは？', faq4a: 'bun.lockbはマイクロ秒で解析されるバイナリ形式です。', faq5q: '新プロジェクトにBunとpnpmどちらを使うべき？', faq5a: 'どちらも優秀。Bunはオールインワンアプローチ、pnpmは大規模モノレポに。', relatedTitle: '関連ツール' },
  ko: { title: 'Bun 1.x 패키지 관리자: npm, pnpm, Yarn보다 빠른', intro: 'Bun은 Zig로 작성된 올인원 JavaScript 런타임 및 툴킷입니다. 패키지 관리자는 바이너리 락파일, 전역 캐시, 심링크 node_modules로 npm보다 최대 23배 빠르게 설치합니다.', installTitle: '설치 및 기본 명령어', installDesc: 'Bun은 몇 초 만에 설치되며 npm 명령어의 드롭인 대체제로 작동합니다.', workspacesTitle: '워크스페이스 (모노레포 지원)', workspacesDesc: 'Bun은 모노레포를 위한 npm 스타일 워크스페이스를 지원합니다.', lockfileTitle: '바이너리 락파일 (bun.lockb)', lockfileDesc: 'Bun은 JSON 대신 바이너리 락파일을 사용합니다.', benchmarkTitle: '성능 벤치마크', benchmarkDesc: 'Bun의 패키지 관리자는 네이티브 코드(Zig), 바이너리 락파일, 병렬 다운로드, 전역 캐시로 모든 대안보다 실질적으로 빠릅니다.', bunxTitle: 'bunx와 내장 도구', bunxDesc: 'bunx는 캐시된 바이너리를 사용해 다운로드 없이 패키지를 실행합니다.', scriptsTitle: '스크립트 및 빌드 통합', scriptsDesc: 'Bun은 npm/yarn보다 package.json 스크립트를 더 빠르게 실행합니다.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: '모범 사례', bp1: '재현 가능한 설치를 위해 bun.lockb를 버전 관리에 커밋하세요.', bp2: '개발에는 bun --watch를 사용하세요.', bp3: 'npm에서 점진적으로 마이그레이션하세요.', bp4: '모노레포에는 Bun 워크스페이스와 Turborepo를 조합하세요.', bp5: 'Bun은 .env를 자동으로 로드합니다 — dotenv 패키지 불필요.', faqTitle: '자주 묻는 질문', faq1q: '2026년 Bun은 프로덕션에서 사용할 수 있나요?', faq1a: '네. Bun 1.0+는 2023년에 안정화되었으며 99%+ Node.js API 커버리지를 가집니다.', faq2q: 'Bun은 모든 npm 패키지와 호환되나요?', faq2a: '거의 모두. 네이티브 Node 애드온을 사용하는 패키지는 예외입니다.', faq3q: 'Bun을 Next.js와 함께 사용할 수 있나요?', faq3a: '패키지 관리자로는 즉시 — bun install이 작동합니다.', faq4q: 'bun.lockb는 package-lock.json과 어떻게 다른가요?', faq4a: 'bun.lockb는 마이크로초 단위로 파싱되는 바이너리 형식입니다.', faq5q: '새 프로젝트에 Bun과 pnpm 중 어느 것을 사용해야 하나요?', faq5a: '둘 다 훌륭합니다. Bun은 올인원 접근법, pnpm은 대규모 모노레포에 적합합니다.', relatedTitle: '관련 도구' },
  pt: { title: 'Bun 1.x Package Manager: Mais rápido que npm, pnpm e Yarn', intro: 'Bun é um runtime JavaScript tudo-em-um escrito em Zig. Seu gerenciador de pacotes instala dependências até 23x mais rápido que o npm.', installTitle: 'Instalação e comandos básicos', installDesc: 'Bun instala em segundos e funciona como substituto direto dos comandos npm.', workspacesTitle: 'Workspaces (suporte a monorepo)', workspacesDesc: 'Bun suporta workspaces no estilo npm para monorepos.', lockfileTitle: 'O arquivo de lock binário (bun.lockb)', lockfileDesc: 'Bun usa um arquivo de lock binário em vez de JSON.', benchmarkTitle: 'Benchmarks de desempenho', benchmarkDesc: 'O gerenciador de pacotes do Bun é substancialmente mais rápido que todas as alternativas.', bunxTitle: 'bunx e ferramentas integradas', bunxDesc: 'bunx executa pacotes sem download usando binários em cache.', scriptsTitle: 'Scripts e integração de build', scriptsDesc: 'Bun executa scripts do package.json mais rápido que npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Boas práticas', bp1: 'Fazer commit do bun.lockb para instalações reproduzíveis.', bp2: 'Usar bun --watch para desenvolvimento.', bp3: 'Migrar progressivamente do npm.', bp4: 'Para monorepos, combinar Bun workspaces com Turborepo.', bp5: 'Bun carrega .env automaticamente — sem necessidade de dotenv.', faqTitle: 'Perguntas frequentes', faq1q: 'O Bun está pronto para produção em 2026?', faq1a: 'Sim. Bun 1.0+ alcançou estabilidade em 2023 com 99%+ de cobertura da API Node.js.', faq2q: 'O Bun funciona com todos os pacotes npm?', faq2a: 'Quase todos. Exceções para pacotes com addons nativos do Node.', faq3q: 'Posso usar Bun com Next.js?', faq3a: 'Sim para o gerenciador de pacotes — bun install funciona imediatamente.', faq4q: 'Como o bun.lockb difere do package-lock.json?', faq4a: 'bun.lockb é formato binário que é analisado em microssegundos.', faq5q: 'Bun ou pnpm para um novo projeto?', faq5a: 'Ambos são excelentes. Bun para abordagem tudo-em-um, pnpm para grandes monorepos.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Bun 1.x Package Manager: Più veloce di npm, pnpm e Yarn', intro: 'Bun è un runtime JavaScript tutto-in-uno scritto in Zig. Il suo gestore di pacchetti installa dipendenze fino a 23x più veloce di npm.', installTitle: 'Installazione e comandi di base', installDesc: 'Bun si installa in secondi e funziona come sostituto diretto dei comandi npm.', workspacesTitle: 'Workspaces (supporto monorepo)', workspacesDesc: 'Bun supporta workspaces in stile npm per i monorepo.', lockfileTitle: 'Il file di lock binario (bun.lockb)', lockfileDesc: 'Bun usa un file di lock binario invece di JSON.', benchmarkTitle: 'Benchmark di prestazioni', benchmarkDesc: 'Il gestore di pacchetti di Bun è sostanzialmente più veloce di tutte le alternative.', bunxTitle: 'bunx e strumenti integrati', bunxDesc: 'bunx esegue pacchetti senza download usando binari in cache.', scriptsTitle: 'Script e integrazione build', scriptsDesc: 'Bun esegue gli script di package.json più velocemente di npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Best practice', bp1: 'Fare commit di bun.lockb per installazioni riproducibili.', bp2: 'Usare bun --watch per lo sviluppo.', bp3: 'Migrare gradualmente da npm.', bp4: 'Per i monorepo, combinare Bun workspaces con Turborepo.', bp5: 'Bun carica .env automaticamente — nessun pacchetto dotenv necessario.', faqTitle: 'Domande frequenti', faq1q: 'Bun è pronto per la produzione nel 2026?', faq1a: 'Sì. Bun 1.0+ ha raggiunto la stabilità nel 2023 con copertura API Node.js al 99%+.', faq2q: 'Bun funziona con tutti i pacchetti npm?', faq2a: 'Quasi tutti. Eccezioni per i pacchetti con addon nativi Node.', faq3q: 'Posso usare Bun con Next.js?', faq3a: 'Sì per il gestore di pacchetti — bun install funziona immediatamente.', faq4q: 'Come differisce bun.lockb da package-lock.json?', faq4a: 'bun.lockb è formato binario che viene analizzato in microsecondi.', faq5q: 'Bun o pnpm per un nuovo progetto?', faq5a: 'Entrambi sono eccellenti. Bun per l\'approccio tutto-in-uno, pnpm per i grandi monorepo.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'Bun 1.x Package Manager: Sneller dan npm, pnpm en Yarn', intro: 'Bun is een alles-in-één JavaScript runtime en toolkit geschreven in Zig. De pakketbeheerder installeert afhankelijkheden tot 23x sneller dan npm.', installTitle: 'Installatie en basiscommando\'s', installDesc: 'Bun installeert in seconden en werkt als directe vervanging voor npm-commando\'s.', workspacesTitle: 'Workspaces (monorepo-ondersteuning)', workspacesDesc: 'Bun ondersteunt npm-stijl workspaces voor monorepo\'s.', lockfileTitle: 'Het binaire lockbestand (bun.lockb)', lockfileDesc: 'Bun gebruikt een binair lockbestand in plaats van JSON.', benchmarkTitle: 'Prestatiebenchmarks', benchmarkDesc: 'Buns pakketbeheerder is aanzienlijk sneller dan alle alternatieven.', bunxTitle: 'bunx en ingebouwde tools', bunxDesc: 'bunx voert pakketten uit zonder download met gecachte binaries.', scriptsTitle: 'Scripts en build-integratie', scriptsDesc: 'Bun voert package.json-scripts sneller uit dan npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Best practices', bp1: 'bun.lockb committen voor reproduceerbare installaties.', bp2: 'bun --watch gebruiken voor ontwikkeling.', bp3: 'Geleidelijk migreren van npm.', bp4: 'Voor monorepo\'s, Bun workspaces combineren met Turborepo.', bp5: 'Bun laadt .env automatisch — geen dotenv-pakket nodig.', faqTitle: 'Veelgestelde vragen', faq1q: 'Is Bun productie-klaar in 2026?', faq1a: 'Ja. Bun 1.0+ bereikte stabiliteit in 2023 met 99%+ Node.js API-dekking.', faq2q: 'Werkt Bun met alle npm-pakketten?', faq2a: 'Bijna alle. Uitzonderingen voor pakketten met native Node-addons.', faq3q: 'Kan ik Bun gebruiken met Next.js?', faq3a: 'Ja voor de pakketbeheerder — bun install werkt direct.', faq4q: 'Hoe verschilt bun.lockb van package-lock.json?', faq4a: 'bun.lockb is binair formaat dat in microseconden wordt geparseerd.', faq5q: 'Bun of pnpm voor een nieuw project?', faq5a: 'Beide zijn uitstekend. Bun voor alles-in-één aanpak, pnpm voor grote monorepo\'s.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Bun 1.x Package Manager: Szybszy niż npm, pnpm i Yarn', intro: 'Bun to wszechstronny runtime JavaScript napisany w Zig. Menedżer pakietów instaluje zależności do 23x szybciej niż npm.', installTitle: 'Instalacja i podstawowe komendy', installDesc: 'Bun instaluje się w sekundach i działa jako bezpośredni zamiennik komend npm.', workspacesTitle: 'Workspaces (wsparcie monorepo)', workspacesDesc: 'Bun obsługuje workspaces w stylu npm dla monorepo.', lockfileTitle: 'Binarna blokada (bun.lockb)', lockfileDesc: 'Bun używa binarnego pliku blokady zamiast JSON.', benchmarkTitle: 'Benchmarki wydajności', benchmarkDesc: 'Menedżer pakietów Bun jest znacznie szybszy niż wszystkie alternatywy.', bunxTitle: 'bunx i wbudowane narzędzia', bunxDesc: 'bunx uruchamia pakiety bez pobierania używając buforowanych binariów.', scriptsTitle: 'Skrypty i integracja build', scriptsDesc: 'Bun wykonuje skrypty package.json szybciej niż npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Najlepsze praktyki', bp1: 'Commitować bun.lockb dla reprodukowalnych instalacji.', bp2: 'Używać bun --watch do programowania.', bp3: 'Migrować stopniowo z npm.', bp4: 'Dla monorepo łączyć Bun workspaces z Turborepo.', bp5: 'Bun automatycznie ładuje .env — brak potrzeby dotenv.', faqTitle: 'Często zadawane pytania', faq1q: 'Czy Bun jest gotowy do produkcji w 2026?', faq1a: 'Tak. Bun 1.0+ osiągnął stabilność w 2023 z pokryciem API Node.js 99%+.', faq2q: 'Czy Bun działa ze wszystkimi pakietami npm?', faq2a: 'Prawie wszystkimi. Wyjątki to pakiety z natywnymi addonami Node.', faq3q: 'Czy mogę używać Bun z Next.js?', faq3a: 'Tak jako menedżer pakietów — bun install działa od razu.', faq4q: 'Czym różni się bun.lockb od package-lock.json?', faq4a: 'bun.lockb to format binarny parsowany w mikrosekundach.', faq5q: 'Bun czy pnpm dla nowego projektu?', faq5a: 'Oba są doskonałe. Bun dla podejścia all-in-one, pnpm dla dużych monorepo.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Bun 1.x pakethanterare: Snabbare än npm, pnpm och Yarn', intro: 'Bun är en allt-i-ett JavaScript-runtime och toolkit skriven i Zig. Pakethanteraren installerar beroenden upp till 23x snabbare än npm.', installTitle: 'Installation och grundkommandon', installDesc: 'Bun installeras på sekunder och fungerar som direktersättning för npm-kommandon.', workspacesTitle: 'Workspaces (monorepo-stöd)', workspacesDesc: 'Bun stöder npm-stil workspaces för monorepos.', lockfileTitle: 'Den binära låsfilen (bun.lockb)', lockfileDesc: 'Bun använder en binär låsfil istället för JSON.', benchmarkTitle: 'Prestandabenchmarks', benchmarkDesc: 'Buns pakethanterare är avsevärt snabbare än alla alternativ.', bunxTitle: 'bunx och inbyggda verktyg', bunxDesc: 'bunx kör paket utan nedladdning med cachade binärer.', scriptsTitle: 'Skript och build-integration', scriptsDesc: 'Bun kör package.json-skript snabbare än npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Bästa praxis', bp1: 'Committa bun.lockb för reproducerbara installationer.', bp2: 'Använd bun --watch för utveckling.', bp3: 'Migrera gradvis från npm.', bp4: 'För monorepos, kombinera Bun workspaces med Turborepo.', bp5: 'Bun laddar .env automatiskt — inget dotenv-paket behövs.', faqTitle: 'Vanliga frågor', faq1q: 'Är Bun produktionsklar 2026?', faq1a: 'Ja. Bun 1.0+ nådde stabilitet 2023 med 99%+ Node.js API-täckning.', faq2q: 'Fungerar Bun med alla npm-paket?', faq2a: 'Nästan alla. Undantag för paket med native Node-tillägg.', faq3q: 'Kan jag använda Bun med Next.js?', faq3a: 'Ja för pakethanteraren — bun install fungerar direkt.', faq4q: 'Hur skiljer sig bun.lockb från package-lock.json?', faq4a: 'bun.lockb är binärt format som parsas på mikrosekunder.', faq5q: 'Bun eller pnpm för ett nytt projekt?', faq5a: 'Båda är utmärkta. Bun för allt-i-ett-ansatsen, pnpm för stora monorepos.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Bun 1.x pakkebehandler: Raskere enn npm, pnpm og Yarn', intro: 'Bun er en alt-i-ett JavaScript-runtime og verktøysett skrevet i Zig. Pakkebehandleren installerer avhengigheter opptil 23x raskere enn npm.', installTitle: 'Installasjon og grunnleggende kommandoer', installDesc: 'Bun installeres på sekunder og fungerer som direkteerstatter for npm-kommandoer.', workspacesTitle: 'Workspaces (monorepo-støtte)', workspacesDesc: 'Bun støtter npm-style workspaces for monorepos.', lockfileTitle: 'Den binære låsefilen (bun.lockb)', lockfileDesc: 'Bun bruker en binær låsefil i stedet for JSON.', benchmarkTitle: 'Ytelsesbenchmarks', benchmarkDesc: 'Buns pakkebehandler er vesentlig raskere enn alle alternativer.', bunxTitle: 'bunx og innebygde verktøy', bunxDesc: 'bunx kjører pakker uten nedlasting med bufrede binærfiler.', scriptsTitle: 'Skript og build-integrasjon', scriptsDesc: 'Bun kjører package.json-skript raskere enn npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Beste praksis', bp1: 'Committe bun.lockb for reproduserbare installasjoner.', bp2: 'Bruke bun --watch for utvikling.', bp3: 'Migrere gradvis fra npm.', bp4: 'For monorepos, kombinere Bun workspaces med Turborepo.', bp5: 'Bun laster .env automatisk — ingen dotenv-pakke nødvendig.', faqTitle: 'Ofte stilte spørsmål', faq1q: 'Er Bun produksjonsklar i 2026?', faq1a: 'Ja. Bun 1.0+ nådde stabilitet i 2023 med 99%+ Node.js API-dekning.', faq2q: 'Fungerer Bun med alle npm-pakker?', faq2a: 'Nesten alle. Unntak for pakker med native Node-tillegg.', faq3q: 'Kan jeg bruke Bun med Next.js?', faq3a: 'Ja for pakkebehandleren — bun install fungerer umiddelbart.', faq4q: 'Hvordan skiller bun.lockb seg fra package-lock.json?', faq4a: 'bun.lockb er binærformat som parsers på mikrosekunder.', faq5q: 'Bun eller pnpm for et nytt prosjekt?', faq5a: 'Begge er utmerkede. Bun for alt-i-ett-tilnærmingen, pnpm for store monorepos.', relatedTitle: 'Relaterte verktøy' },
  id: { title: 'Bun 1.x Package Manager: Lebih Cepat dari npm, pnpm, dan Yarn', intro: 'Bun adalah runtime JavaScript all-in-one yang ditulis dalam Zig. Package manager-nya menginstal dependensi hingga 23x lebih cepat dari npm.', installTitle: 'Instalasi dan Perintah Dasar', installDesc: 'Bun terinstal dalam hitungan detik dan bekerja sebagai pengganti langsung perintah npm.', workspacesTitle: 'Workspaces (Dukungan Monorepo)', workspacesDesc: 'Bun mendukung workspaces gaya npm untuk monorepo.', lockfileTitle: 'Lockfile Biner (bun.lockb)', lockfileDesc: 'Bun menggunakan lockfile biner alih-alih JSON.', benchmarkTitle: 'Benchmark Performa', benchmarkDesc: 'Package manager Bun jauh lebih cepat dari semua alternatif.', bunxTitle: 'bunx dan Alat Bawaan', bunxDesc: 'bunx menjalankan paket tanpa unduhan menggunakan biner yang di-cache.', scriptsTitle: 'Skrip dan Integrasi Build', scriptsDesc: 'Bun menjalankan skrip package.json lebih cepat dari npm/yarn.', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'Praktik Terbaik', bp1: 'Commit bun.lockb untuk instalasi yang dapat direproduksi.', bp2: 'Gunakan bun --watch untuk pengembangan.', bp3: 'Migrasi secara bertahap dari npm.', bp4: 'Untuk monorepo, gabungkan Bun workspaces dengan Turborepo.', bp5: 'Bun memuat .env secara otomatis — tidak perlu paket dotenv.', faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Apakah Bun sudah siap produksi di 2026?', faq1a: 'Ya. Bun 1.0+ mencapai stabilitas pada 2023 dengan cakupan API Node.js 99%+.', faq2q: 'Apakah Bun bekerja dengan semua paket npm?', faq2a: 'Hampir semua. Pengecualian untuk paket yang menggunakan addon Node natif.', faq3q: 'Bisakah saya menggunakan Bun dengan Next.js?', faq3a: 'Ya untuk package manager — bun install langsung bekerja.', faq4q: 'Bagaimana bun.lockb berbeda dari package-lock.json?', faq4a: 'bun.lockb adalah format biner yang di-parse dalam milidetik.', faq5q: 'Bun atau pnpm untuk proyek baru?', faq5a: 'Keduanya sangat baik. Bun untuk pendekatan all-in-one, pnpm untuk monorepo besar.', relatedTitle: 'Alat Terkait' },
  th: { title: 'Bun 1.x Package Manager: เร็วกว่า npm, pnpm และ Yarn', intro: 'Bun คือ JavaScript runtime และ toolkit แบบครบวงจรที่เขียนด้วย Zig Package manager ติดตั้ง dependencies เร็วกว่า npm ถึง 23 เท่า', installTitle: 'การติดตั้งและคำสั่งพื้นฐาน', installDesc: 'Bun ติดตั้งภายในไม่กี่วินาทีและทำงานเป็นตัวแทนทดแทนสำหรับคำสั่ง npm', workspacesTitle: 'Workspaces (รองรับ Monorepo)', workspacesDesc: 'Bun รองรับ workspaces แบบ npm สำหรับ monorepo', lockfileTitle: 'Binary Lockfile (bun.lockb)', lockfileDesc: 'Bun ใช้ binary lockfile แทน JSON', benchmarkTitle: 'การทดสอบประสิทธิภาพ', benchmarkDesc: 'Package manager ของ Bun เร็วกว่าทุกทางเลือกอย่างมีนัยสำคัญ', bunxTitle: 'bunx และเครื่องมือในตัว', bunxDesc: 'bunx รันแพ็คเกจโดยไม่ต้องดาวน์โหลดโดยใช้ binary ที่แคชไว้', scriptsTitle: 'Scripts และการรวมกับ Build', scriptsDesc: 'Bun รัน scripts ใน package.json เร็วกว่า npm/yarn', comparisonTitle: 'Bun vs npm vs pnpm vs Yarn', bestPracticesTitle: 'แนวปฏิบัติที่ดีที่สุด', bp1: 'Commit bun.lockb เพื่อการติดตั้งที่ reproducible', bp2: 'ใช้ bun --watch สำหรับการพัฒนา', bp3: 'ย้ายจาก npm ทีละน้อย', bp4: 'สำหรับ monorepo ใช้ Bun workspaces ร่วมกับ Turborepo', bp5: 'Bun โหลด .env อัตโนมัติ ไม่ต้องใช้ dotenv', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'Bun พร้อมสำหรับ production ในปี 2026 หรือไม่?', faq1a: 'ใช่ Bun 1.0+ บรรลุความเสถียรในปี 2023 โดยมีการครอบคลุม Node.js API 99%+', faq2q: 'Bun ทำงานกับแพ็คเกจ npm ทั้งหมดได้หรือไม่?', faq2a: 'เกือบทั้งหมด ข้อยกเว้นสำหรับแพ็คเกจที่ใช้ native Node addons', faq3q: 'ฉันสามารถใช้ Bun กับ Next.js ได้ไหม?', faq3a: 'ได้สำหรับ package manager — bun install ทำงานได้ทันที', faq4q: 'bun.lockb แตกต่างจาก package-lock.json อย่างไร?', faq4a: 'bun.lockb คือ binary format ที่ parse ได้ในไมโครวินาที', faq5q: 'ควรใช้ Bun หรือ pnpm สำหรับโปรเจ็กต์ใหม่?', faq5a: 'ทั้งสองดีเยี่ยม Bun สำหรับ all-in-one pnpm สำหรับ monorepo ขนาดใหญ่', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function BunPackageManager({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

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

  const compRows = [
    { feature: 'Install speed (warm)', bun: '1.2s', npm: '28.3s', pnpm: '9.4s', yarn: '14.1s' },
    { feature: 'Lockfile format', bun: 'Binary', npm: 'JSON', pnpm: 'YAML', yarn: 'Custom text' },
    { feature: 'node_modules style', bun: 'Symlinks', npm: 'Hoisted', pnpm: 'Symlinks', yarn: 'Hoisted/PnP' },
    { feature: 'Workspace support', bun: 'Yes', npm: 'Yes', pnpm: 'Yes', yarn: 'Yes' },
    { feature: 'Built-in TypeScript', bun: 'Yes (native)', npm: 'No', pnpm: 'No', yarn: 'No' },
    { feature: 'Built-in test runner', bun: 'Yes (Jest API)', npm: 'No', pnpm: 'No', yarn: 'No' },
    { feature: '.env auto-loading', bun: 'Yes', npm: 'No', pnpm: 'No', yarn: 'No' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.installTitle}</h2>
      <p>{t.installDesc}</p>
      <pre style={preStyle}><code>{codeBunInstall}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.workspacesTitle}</h2>
      <p>{t.workspacesDesc}</p>
      <pre style={preStyle}><code>{codeBunWorkspaces}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.lockfileTitle}</h2>
      <p>{t.lockfileDesc}</p>
      <pre style={preStyle}><code>{codeBunLockfile}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.benchmarkTitle}</h2>
      <p>{t.benchmarkDesc}</p>
      <pre style={preStyle}><code>{codeBunBenchmark}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bunxTitle}</h2>
      <p>{t.bunxDesc}</p>
      <pre style={preStyle}><code>{codeBunX}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.scriptsTitle}</h2>
      <p>{t.scriptsDesc}</p>
      <pre style={preStyle}><code>{codeBunNpm}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Feature</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Bun</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>npm</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>pnpm</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Yarn</th>
            </tr>
          </thead>
          <tbody>
            {compRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', color: '#38a169', fontWeight: 600 }}>{row.bun}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.npm}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.pnpm}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.yarn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/cron-parser" style={{ color: '#3182ce' }}>Cron Parser</a></li>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
        </ul>
      </div>
    </article>
  );
}
