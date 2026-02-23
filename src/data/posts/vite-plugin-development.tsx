'use client';
import React from 'react';

const codePluginBasic = `// Minimal Vite plugin structure
// A plugin is just an object with a name and hooks
export default function myPlugin(options = {}) {
  return {
    name: 'vite-plugin-my-plugin',   // required, shown in warnings/errors
    enforce: 'pre',                   // 'pre' | 'post' | undefined

    // Called once when Vite starts
    configResolved(config) {
      console.log('Vite mode:', config.mode);
    },

    // Modify Vite config before it resolves
    config(config, { command }) {
      if (command === 'build') {
        return { build: { sourcemap: true } };
      }
    },

    // Transform file contents
    transform(code, id) {
      if (!id.endsWith('.vue')) return null; // skip non-Vue files
      return { code: transformedCode, map: sourceMap };
    },

    // Resolve module imports to file paths
    resolveId(source, importer) {
      if (source === 'virtual:my-module') {
        return '\0virtual:my-module';  // '\0' prefix = virtual module
      }
    },

    // Load virtual module content
    load(id) {
      if (id === '\0virtual:my-module') {
        return 'export const message = "Hello from virtual module!"';
      }
    }
  };
}`;

const codeTransformHook = `// Real-world transform: inject build metadata into source files
// Similar to how vite-plugin-inspect or vite-plugin-svgr work
import { readFileSync } from 'fs';
import { createHash } from 'crypto';

export default function buildMetaPlugin() {
  let config;
  const buildTime = new Date().toISOString();

  return {
    name: 'vite-plugin-build-meta',
    enforce: 'post',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    transform(code, id) {
      // Only process files that import the meta module
      if (!code.includes('__BUILD_META__')) return null;

      const hash = createHash('sha256')
        .update(code)
        .digest('hex')
        .slice(0, 8);

      const meta = JSON.stringify({
        buildTime,
        mode: config.mode,
        hash,
        file: id.replace(config.root, ''),
      });

      const transformed = code.replace(
        /__BUILD_META__/g,
        meta
      );

      return {
        code: transformed,
        // Return null map to inherit original sourcemap
        map: null,
      };
    },
  };
}

// Usage in your app:
// import meta from 'virtual:build-meta';
// console.log(meta.buildTime);`;

const codeResolveId = `// Advanced resolveId: path aliases + conditional resolution
// Replaces tsconfig paths in runtime (Vite handles build, but not always HMR)
import path from 'path';
import fs from 'fs';

export default function aliasPlugin(aliases = {}) {
  // aliases = { '@': './src', '~utils': './src/utils' }
  const resolvedAliases = Object.fromEntries(
    Object.entries(aliases).map(([key, value]) => [
      key,
      path.resolve(process.cwd(), value),
    ])
  );

  return {
    name: 'vite-plugin-advanced-alias',

    resolveId(source, importer, options) {
      for (const [alias, target] of Object.entries(resolvedAliases)) {
        if (source === alias || source.startsWith(alias + '/')) {
          const resolved = source.replace(alias, target);

          // Try multiple extensions
          for (const ext of ['', '.ts', '.tsx', '.js', '/index.ts']) {
            const candidate = resolved + ext;
            if (fs.existsSync(candidate)) {
              return candidate;
            }
          }
        }
      }

      // Return null to let other resolvers handle it
      return null;
    },
  };
}

// vite.config.ts usage:
// plugins: [aliasPlugin({ '@': './src', '~hooks': './src/hooks' })]`;

const codeDevServer = `// Custom dev server middleware: mock API + WebSocket HMR notifications
export default function devApiPlugin(routes = {}) {
  return {
    name: 'vite-plugin-dev-api',
    apply: 'serve',   // Only active in dev server, not build

    configureServer(server) {
      // Add middleware BEFORE Vite's internal middlewares
      server.middlewares.use('/api', (req, res, next) => {
        const handler = routes[req.url];
        if (!handler) return next();

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Support async handlers
        Promise.resolve(handler(req))
          .then(data => res.end(JSON.stringify(data)))
          .catch(err => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          });
      });

      // Hook into Vite's WebSocket for custom HMR events
      server.ws.on('custom:ping', (data, client) => {
        client.send('custom:pong', { timestamp: Date.now() });
      });

      // Send custom event when a file changes
      server.watcher.on('change', (file) => {
        if (file.endsWith('.mock.ts')) {
          server.ws.send({ type: 'custom', event: 'mock-updated', data: { file } });
        }
      });
    },
  };
}

// Usage:
// plugins: [devApiPlugin({
//   '/users': () => [{ id: 1, name: 'Alice' }],
//   '/auth/me': () => ({ id: 1, role: 'admin' }),
// })]`;

const codeHMR = `// Plugin with HMR (Hot Module Replacement) support
// Allows modules to opt-in to custom update logic
export default function statePlugin() {
  return {
    name: 'vite-plugin-state-preserve',

    // Inject HMR handling code into every JS/TS file
    transform(code, id) {
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) return null;
      if (id.includes('node_modules')) return null;

      // Append HMR boundary acceptance
      const hmrCode = \`
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Module updated - newModule has the fresh exports
    console.log('[HMR] Module updated:', import.meta.url);
  });

  import.meta.hot.dispose((data) => {
    // Clean up side effects before module is replaced
    // data is passed to the next module version
    data.savedState = window.__APP_STATE__;
  });

  // Receive data from old module instance
  if (import.meta.hot.data.savedState) {
    window.__APP_STATE__ = import.meta.hot.data.savedState;
  }
}
\`;

      return { code: code + hmrCode, map: null };
    },

    handleHotUpdate({ file, server, modules }) {
      // Custom logic: invalidate dependent modules when a .schema file changes
      if (file.endsWith('.schema.json')) {
        const affectedModules = server.moduleGraph.getModulesByFile(file);
        return [...(affectedModules || []), ...modules];
      }
    },
  };
}`;

const codeViteConfig = `// Complete vite.config.ts with multiple plugins
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import myPlugin from './plugins/my-plugin';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    myPlugin({ debug: mode === 'development' }),

    // Bundle analyzer - only in build mode
    command === 'build' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ].filter(Boolean),

  resolve: {
    alias: { '@': '/src' },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  build: {
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },

  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
    },
    hmr: {
      overlay: true,    // Show errors as overlay
      port: 24678,
    },
  },
}));`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vite Plugin Development: Building Custom Transforms and Dev Tools',
    intro: 'Vite\'s plugin API is a thin layer over Rollup\'s, extended with dev-server hooks. Understanding it unlocks the ability to build custom transforms, virtual modules, dev-server middleware, and HMR logic — without ejecting from Vite.',
    basicTitle: 'Plugin Anatomy: Hooks and Lifecycle',
    basicDesc: 'A Vite plugin is a plain object (or a factory function returning one) with a name and hook methods. Hooks run at specific points in the build/dev pipeline.',
    transformTitle: 'transform Hook: Modifying Source Files',
    transformDesc: 'The transform hook is the most commonly used hook. It receives raw source code and a module ID (file path), returning new code and an optional source map.',
    resolveTitle: 'resolveId Hook: Custom Module Resolution',
    resolveDesc: 'The resolveId hook lets you intercept import paths and redirect them to different files or virtual modules. Return null to defer to other resolvers.',
    devServerTitle: 'configureServer: Dev Server Middleware',
    devServerDesc: 'The configureServer hook gives you full access to the Vite dev server — Connect middleware, WebSockets, the watcher, and the module graph.',
    hmrTitle: 'HMR: Hot Module Replacement Integration',
    hmrDesc: 'Plugins can inject HMR boundary code and handle custom update events, enabling module-level state preservation across hot reloads.',
    configTitle: 'Complete Plugin Configuration Example',
    configDesc: 'A production-ready vite.config.ts combining multiple plugins, manual code splitting, and server proxy configuration.',
    comparisonTitle: 'Vite Hooks Quick Reference',
    faqTitle: 'Frequently Asked Questions',
    faqQ1: 'When should I use enforce: "pre" vs "post"?',
    faqA1: 'Use "pre" when your plugin must run before other transforms (e.g., transpilers). Use "post" for plugins that need the fully transformed output. Omitting enforce places your plugin between pre and post plugins.',
    faqQ2: 'How do I create a virtual module in Vite?',
    faqA2: 'Use resolveId to return a module ID prefixed with \\0 (null byte), then use the load hook to return its content. The \\0 prefix tells Rollup to treat it as virtual and not look for it on disk.',
    faqQ3: 'Can Vite plugins work in both dev and build mode?',
    faqA3: 'Yes. Use the apply property: "serve" for dev-only, "build" for build-only, or omit it (default) to run in both. You can also use a function: apply(config, { command }) { return command === "build"; }.',
    faqQ4: 'How do I debug a Vite plugin?',
    faqA4: 'Add DEBUG=vite:* to your environment to see Vite internals. Use this.warn() and this.error() inside hooks for plugin-specific messages. The vite-plugin-inspect plugin visualizes plugin transforms in the browser.',
    relatedTools: 'Related Tools',
  },
  zh: {
    title: 'Vite 插件开发：自定义转换与开发工具构建',
    intro: 'Vite 的插件 API 是对 Rollup API 的轻量封装，并扩展了开发服务器钩子。掌握它可以让你构建自定义转换器、虚拟模块、开发服务器中间件和 HMR 逻辑，无需脱离 Vite 生态。',
    basicTitle: '插件解剖：钩子与生命周期',
    basicDesc: 'Vite 插件是一个普通对象（或返回该对象的工厂函数），包含 name 属性和钩子方法。钩子在构建/开发流水线的特定节点触发。',
    transformTitle: 'transform 钩子：修改源文件',
    transformDesc: 'transform 钩子是最常用的钩子。它接收原始源码和模块 ID（文件路径），返回新代码和可选的 source map。',
    resolveTitle: 'resolveId 钩子：自定义模块解析',
    resolveDesc: 'resolveId 钩子可以拦截导入路径，并将其重定向到不同的文件或虚拟模块。返回 null 则交由其他解析器处理。',
    devServerTitle: 'configureServer：开发服务器中间件',
    devServerDesc: 'configureServer 钩子提供对 Vite 开发服务器的完整访问权限——Connect 中间件、WebSocket、文件监听器以及模块图。',
    hmrTitle: 'HMR：热模块替换集成',
    hmrDesc: '插件可以注入 HMR 边界代码并处理自定义更新事件，实现热重载时的模块级状态保留。',
    configTitle: '完整插件配置示例',
    configDesc: '一个生产级 vite.config.ts，整合了多个插件、手动代码分割和服务器代理配置。',
    comparisonTitle: 'Vite 钩子速查',
    faqTitle: '常见问题',
    faqQ1: '何时使用 enforce: "pre" 或 "post"？',
    faqA1: '当插件必须在其他转换器（如编译器）之前运行时，使用 "pre"；当插件需要完整转换后的输出时，使用 "post"。省略 enforce 则插件位于 pre 与 post 插件之间。',
    faqQ2: '如何在 Vite 中创建虚拟模块？',
    faqA2: '在 resolveId 中返回以 \\0（空字节）为前缀的模块 ID，然后在 load 钩子中返回其内容。\\0 前缀告知 Rollup 将其视为虚拟模块，不在磁盘上查找。',
    faqQ3: 'Vite 插件可以同时在开发和构建模式下工作吗？',
    faqA3: '可以。使用 apply 属性："serve" 仅用于开发，"build" 仅用于构建，省略则在两种模式下均运行。也可以使用函数形式：apply(config, { command }) { return command === "build"; }。',
    faqQ4: '如何调试 Vite 插件？',
    faqA4: '在环境变量中添加 DEBUG=vite:* 可查看 Vite 内部日志。在钩子中使用 this.warn() 和 this.error() 输出插件特定信息。vite-plugin-inspect 插件可在浏览器中可视化插件转换过程。',
    relatedTools: '相关工具',
  },
  fr: {
    title: 'Développement de plugins Vite : transformations et outils de développement',
    intro: 'L\'API de plugins Vite est une fine couche au-dessus de Rollup, étendue avec des hooks de serveur de développement.',
    basicTitle: 'Anatomie d\'un plugin : hooks et cycle de vie',
    basicDesc: 'Un plugin Vite est un objet simple avec un nom et des méthodes de hook.',
    transformTitle: 'Hook transform : modifier les fichiers source',
    transformDesc: 'Le hook transform est le plus couramment utilisé.',
    resolveTitle: 'Hook resolveId : résolution de module personnalisée',
    resolveDesc: 'Le hook resolveId intercepte les chemins d\'importation et les redirige.',
    devServerTitle: 'configureServer : middleware du serveur de développement',
    devServerDesc: 'Le hook configureServer donne accès au serveur de développement Vite.',
    hmrTitle: 'HMR : intégration du remplacement à chaud de module',
    hmrDesc: 'Les plugins peuvent injecter du code HMR et gérer des événements de mise à jour personnalisés.',
    configTitle: 'Exemple complet de configuration de plugin',
    configDesc: 'Un vite.config.ts prêt pour la production combinant plusieurs plugins.',
    comparisonTitle: 'Référence rapide des hooks Vite',
    faqTitle: 'Questions fréquentes',
    faqQ1: 'Quand utiliser enforce: "pre" vs "post" ?',
    faqA1: 'Utilisez "pre" quand votre plugin doit s\'exécuter avant les autres transformations.',
    faqQ2: 'Comment créer un module virtuel dans Vite ?',
    faqA2: 'Utilisez resolveId pour retourner un ID préfixé par \\0, puis load pour son contenu.',
    faqQ3: 'Les plugins Vite fonctionnent-ils en mode dev et build ?',
    faqA3: 'Oui, utilisez la propriété apply pour contrôler le mode.',
    faqQ4: 'Comment déboguer un plugin Vite ?',
    faqA4: 'Ajoutez DEBUG=vite:* à votre environnement.',
    relatedTools: 'Outils associés',
  },
  de: {
    title: 'Vite Plugin-Entwicklung: Benutzerdefinierte Transforms und Dev-Tools',
    intro: 'Vites Plugin-API ist eine dünne Schicht über Rollup, erweitert mit Dev-Server-Hooks.',
    basicTitle: 'Plugin-Anatomie: Hooks und Lebenszyklus',
    basicDesc: 'Ein Vite-Plugin ist ein einfaches Objekt mit einem Namen und Hook-Methoden.',
    transformTitle: 'transform-Hook: Quelldateien modifizieren',
    transformDesc: 'Der transform-Hook ist der am häufigsten verwendete Hook.',
    resolveTitle: 'resolveId-Hook: Benutzerdefinierte Modulauflösung',
    resolveDesc: 'Der resolveId-Hook fängt Import-Pfade ab und leitet sie um.',
    devServerTitle: 'configureServer: Dev-Server-Middleware',
    devServerDesc: 'Der configureServer-Hook gibt vollen Zugriff auf den Vite-Dev-Server.',
    hmrTitle: 'HMR: Hot Module Replacement Integration',
    hmrDesc: 'Plugins können HMR-Code injizieren und benutzerdefinierte Update-Events verarbeiten.',
    configTitle: 'Vollständiges Plugin-Konfigurationsbeispiel',
    configDesc: 'Eine produktionsreife vite.config.ts mit mehreren Plugins.',
    comparisonTitle: 'Vite Hooks Schnellreferenz',
    faqTitle: 'Häufig gestellte Fragen',
    faqQ1: 'Wann sollte ich enforce: "pre" vs "post" verwenden?',
    faqA1: 'Verwenden Sie "pre", wenn Ihr Plugin vor anderen Transforms ausgeführt werden muss.',
    faqQ2: 'Wie erstelle ich ein virtuelles Modul in Vite?',
    faqA2: 'Verwenden Sie resolveId mit \\0-Präfix und load für den Inhalt.',
    faqQ3: 'Funktionieren Vite-Plugins in Dev- und Build-Modus?',
    faqA3: 'Ja, verwenden Sie die apply-Eigenschaft zur Steuerung.',
    faqQ4: 'Wie debugge ich ein Vite-Plugin?',
    faqA4: 'Fügen Sie DEBUG=vite:* zu Ihrer Umgebung hinzu.',
    relatedTools: 'Verwandte Tools',
  },
  es: {
    title: 'Desarrollo de plugins Vite: transformaciones y herramientas de desarrollo',
    intro: 'La API de plugins de Vite es una capa delgada sobre Rollup, extendida con hooks del servidor de desarrollo.',
    basicTitle: 'Anatomía del plugin: hooks y ciclo de vida',
    basicDesc: 'Un plugin de Vite es un objeto simple con un nombre y métodos hook.',
    transformTitle: 'Hook transform: modificar archivos fuente',
    transformDesc: 'El hook transform es el más utilizado.',
    resolveTitle: 'Hook resolveId: resolución de módulos personalizada',
    resolveDesc: 'El hook resolveId intercepta rutas de importación y las redirige.',
    devServerTitle: 'configureServer: middleware del servidor de desarrollo',
    devServerDesc: 'El hook configureServer da acceso completo al servidor de desarrollo Vite.',
    hmrTitle: 'HMR: integración de reemplazo en caliente de módulos',
    hmrDesc: 'Los plugins pueden inyectar código HMR y manejar eventos de actualización personalizados.',
    configTitle: 'Ejemplo completo de configuración de plugin',
    configDesc: 'Un vite.config.ts listo para producción con múltiples plugins.',
    comparisonTitle: 'Referencia rápida de hooks Vite',
    faqTitle: 'Preguntas frecuentes',
    faqQ1: '¿Cuándo usar enforce: "pre" vs "post"?',
    faqA1: 'Use "pre" cuando su plugin deba ejecutarse antes que otras transformaciones.',
    faqQ2: '¿Cómo crear un módulo virtual en Vite?',
    faqA2: 'Use resolveId con prefijo \\0 y load para su contenido.',
    faqQ3: '¿Los plugins Vite funcionan en modo dev y build?',
    faqA3: 'Sí, use la propiedad apply para controlar el modo.',
    faqQ4: '¿Cómo depurar un plugin Vite?',
    faqA4: 'Añada DEBUG=vite:* a su entorno.',
    relatedTools: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Viteプラグイン開発：カスタム変換とDev Toolsの構築',
    intro: 'ViteのプラグインAPIはRollupの薄いラッパーで、devサーバーフックが追加されています。',
    basicTitle: 'プラグインの解剖：フックとライフサイクル',
    basicDesc: 'Viteプラグインはnameとフックメソッドを持つシンプルなオブジェクトです。',
    transformTitle: 'transformフック：ソースファイルの変換',
    transformDesc: 'transformフックは最もよく使われるフックです。',
    resolveTitle: 'resolveIdフック：カスタムモジュール解決',
    resolveDesc: 'resolveIdフックはインポートパスを傍受してリダイレクトします。',
    devServerTitle: 'configureServer：Devサーバーミドルウェア',
    devServerDesc: 'configureServerフックはVite devサーバーへの完全なアクセスを提供します。',
    hmrTitle: 'HMR：ホットモジュールリプレースメント統合',
    hmrDesc: 'プラグインはHMRコードを注入してカスタム更新イベントを処理できます。',
    configTitle: '完全なプラグイン設定例',
    configDesc: '複数のプラグインを組み合わせた本番対応のvite.config.ts。',
    comparisonTitle: 'Viteフック クイックリファレンス',
    faqTitle: 'よくある質問',
    faqQ1: 'enforce: "pre"と"post"はいつ使うべきですか？',
    faqA1: '"pre"は他の変換より先に実行する必要がある場合に使用します。',
    faqQ2: 'Viteで仮想モジュールを作るには？',
    faqA2: 'resolveIdで\\0プレフィックスのIDを返し、loadでコンテンツを返します。',
    faqQ3: 'Viteプラグインはdevとbuildモードで動作しますか？',
    faqA3: 'はい、applyプロパティでモードを制御します。',
    faqQ4: 'Viteプラグインのデバッグ方法は？',
    faqA4: '環境変数にDEBUG=vite:*を追加してください。',
    relatedTools: '関連ツール',
  },
  ko: {
    title: 'Vite 플러그인 개발: 커스텀 변환 및 개발 도구 구축',
    intro: 'Vite의 플러그인 API는 Rollup 위에 얇게 쌓인 레이어로, 개발 서버 훅이 확장되어 있습니다.',
    basicTitle: '플러그인 해부: 훅과 라이프사이클',
    basicDesc: 'Vite 플러그인은 name과 훅 메서드를 가진 간단한 객체입니다.',
    transformTitle: 'transform 훅: 소스 파일 변환',
    transformDesc: 'transform 훅은 가장 많이 사용되는 훅입니다.',
    resolveTitle: 'resolveId 훅: 커스텀 모듈 해석',
    resolveDesc: 'resolveId 훅은 임포트 경로를 가로채 리디렉션합니다.',
    devServerTitle: 'configureServer: 개발 서버 미들웨어',
    devServerDesc: 'configureServer 훅은 Vite 개발 서버에 완전한 접근권을 제공합니다.',
    hmrTitle: 'HMR: 핫 모듈 교체 통합',
    hmrDesc: '플러그인은 HMR 코드를 주입하고 커스텀 업데이트 이벤트를 처리할 수 있습니다.',
    configTitle: '완전한 플러그인 설정 예시',
    configDesc: '여러 플러그인을 결합한 프로덕션 준비 vite.config.ts.',
    comparisonTitle: 'Vite 훅 빠른 참조',
    faqTitle: '자주 묻는 질문',
    faqQ1: 'enforce: "pre"와 "post"는 언제 사용하나요?',
    faqA1: '"pre"는 다른 변환보다 먼저 실행해야 할 때 사용합니다.',
    faqQ2: 'Vite에서 가상 모듈을 만드는 방법은?',
    faqA2: 'resolveId에서 \\0 접두사 ID를 반환하고 load에서 내용을 반환합니다.',
    faqQ3: 'Vite 플러그인은 dev와 build 모드에서 모두 작동하나요?',
    faqA3: '예, apply 속성으로 모드를 제어합니다.',
    faqQ4: 'Vite 플러그인을 디버깅하는 방법은?',
    faqA4: '환경 변수에 DEBUG=vite:*를 추가하세요.',
    relatedTools: '관련 도구',
  },
  pt: {
    title: 'Desenvolvimento de plugins Vite: transformações e ferramentas de desenvolvimento',
    intro: 'A API de plugins do Vite é uma camada fina sobre o Rollup, estendida com hooks do servidor de desenvolvimento.',
    basicTitle: 'Anatomia do plugin: hooks e ciclo de vida',
    basicDesc: 'Um plugin Vite é um objeto simples com um nome e métodos hook.',
    transformTitle: 'Hook transform: modificar arquivos fonte',
    transformDesc: 'O hook transform é o mais utilizado.',
    resolveTitle: 'Hook resolveId: resolução de módulos personalizada',
    resolveDesc: 'O hook resolveId intercepta caminhos de importação e os redireciona.',
    devServerTitle: 'configureServer: middleware do servidor de desenvolvimento',
    devServerDesc: 'O hook configureServer dá acesso completo ao servidor de desenvolvimento Vite.',
    hmrTitle: 'HMR: integração de substituição a quente de módulos',
    hmrDesc: 'Plugins podem injetar código HMR e lidar com eventos de atualização personalizados.',
    configTitle: 'Exemplo completo de configuração de plugin',
    configDesc: 'Um vite.config.ts pronto para produção com múltiplos plugins.',
    comparisonTitle: 'Referência rápida de hooks Vite',
    faqTitle: 'Perguntas frequentes',
    faqQ1: 'Quando usar enforce: "pre" vs "post"?',
    faqA1: 'Use "pre" quando seu plugin deve executar antes de outras transformações.',
    faqQ2: 'Como criar um módulo virtual no Vite?',
    faqA2: 'Use resolveId com prefixo \\0 e load para seu conteúdo.',
    faqQ3: 'Plugins Vite funcionam no modo dev e build?',
    faqA3: 'Sim, use a propriedade apply para controlar o modo.',
    faqQ4: 'Como depurar um plugin Vite?',
    faqA4: 'Adicione DEBUG=vite:* ao seu ambiente.',
    relatedTools: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Vite plugin ontwikkeling: aangepaste transforms en dev tools',
    intro: 'Vite\'s plugin API is een dunne laag bovenop Rollup, uitgebreid met dev-server hooks.',
    basicTitle: 'Plugin anatomie: hooks en levenscyclus',
    basicDesc: 'Een Vite plugin is een eenvoudig object met een naam en hook-methoden.',
    transformTitle: 'transform hook: bronbestanden aanpassen',
    transformDesc: 'De transform hook is de meest gebruikte hook.',
    resolveTitle: 'resolveId hook: aangepaste module-oplossing',
    resolveDesc: 'De resolveId hook onderschept importpaden en leidt ze om.',
    devServerTitle: 'configureServer: dev-server middleware',
    devServerDesc: 'De configureServer hook geeft volledige toegang tot de Vite dev-server.',
    hmrTitle: 'HMR: Hot Module Replacement integratie',
    hmrDesc: 'Plugins kunnen HMR-code injecteren en aangepaste update-events verwerken.',
    configTitle: 'Volledig voorbeeld van plugin-configuratie',
    configDesc: 'Een productieklare vite.config.ts met meerdere plugins.',
    comparisonTitle: 'Vite hooks snelreferentie',
    faqTitle: 'Veelgestelde vragen',
    faqQ1: 'Wanneer gebruik je enforce: "pre" vs "post"?',
    faqA1: 'Gebruik "pre" als je plugin voor andere transforms moet draaien.',
    faqQ2: 'Hoe maak ik een virtuele module in Vite?',
    faqA2: 'Gebruik resolveId met \\0-prefix en load voor de inhoud.',
    faqQ3: 'Werken Vite plugins in dev- en build-modus?',
    faqA3: 'Ja, gebruik de apply eigenschap om de modus te bepalen.',
    faqQ4: 'Hoe debug ik een Vite plugin?',
    faqA4: 'Voeg DEBUG=vite:* toe aan je omgeving.',
    relatedTools: 'Gerelateerde tools',
  },
  it: {
    title: 'Sviluppo di plugin Vite: trasformazioni personalizzate e strumenti di sviluppo',
    intro: 'L\'API dei plugin di Vite è un sottile strato sopra Rollup, esteso con hook del server di sviluppo.',
    basicTitle: 'Anatomia del plugin: hook e ciclo di vita',
    basicDesc: 'Un plugin Vite è un semplice oggetto con un nome e metodi hook.',
    transformTitle: 'Hook transform: modificare i file sorgente',
    transformDesc: 'L\'hook transform è il più comunemente usato.',
    resolveTitle: 'Hook resolveId: risoluzione di moduli personalizzata',
    resolveDesc: 'L\'hook resolveId intercetta i percorsi di importazione e li reindirizza.',
    devServerTitle: 'configureServer: middleware del server di sviluppo',
    devServerDesc: 'L\'hook configureServer dà accesso completo al server di sviluppo Vite.',
    hmrTitle: 'HMR: integrazione della sostituzione a caldo dei moduli',
    hmrDesc: 'I plugin possono iniettare codice HMR e gestire eventi di aggiornamento personalizzati.',
    configTitle: 'Esempio completo di configurazione plugin',
    configDesc: 'Un vite.config.ts pronto per la produzione con più plugin.',
    comparisonTitle: 'Riferimento rapido degli hook Vite',
    faqTitle: 'Domande frequenti',
    faqQ1: 'Quando usare enforce: "pre" vs "post"?',
    faqA1: 'Usa "pre" quando il tuo plugin deve eseguire prima di altre trasformazioni.',
    faqQ2: 'Come creare un modulo virtuale in Vite?',
    faqA2: 'Usa resolveId con prefisso \\0 e load per il suo contenuto.',
    faqQ3: 'I plugin Vite funzionano in modalità dev e build?',
    faqA3: 'Sì, usa la proprietà apply per controllare la modalità.',
    faqQ4: 'Come eseguire il debug di un plugin Vite?',
    faqA4: 'Aggiungi DEBUG=vite:* al tuo ambiente.',
    relatedTools: 'Strumenti correlati',
  },
  pl: {
    title: 'Tworzenie wtyczek Vite: niestandardowe transformacje i narzędzia deweloperskie',
    intro: 'API wtyczek Vite to cienka warstwa nad Rollupem, rozszerzona o hooki serwera deweloperskiego.',
    basicTitle: 'Anatomia wtyczki: hooki i cykl życia',
    basicDesc: 'Wtyczka Vite to prosty obiekt z nazwą i metodami hook.',
    transformTitle: 'Hook transform: modyfikowanie plików źródłowych',
    transformDesc: 'Hook transform jest najczęściej używanym hookiem.',
    resolveTitle: 'Hook resolveId: niestandardowe rozwiązywanie modułów',
    resolveDesc: 'Hook resolveId przechwytuje ścieżki importów i przekierowuje je.',
    devServerTitle: 'configureServer: middleware serwera deweloperskiego',
    devServerDesc: 'Hook configureServer daje pełny dostęp do serwera deweloperskiego Vite.',
    hmrTitle: 'HMR: integracja hot module replacement',
    hmrDesc: 'Wtyczki mogą wstrzykiwać kod HMR i obsługiwać niestandardowe zdarzenia aktualizacji.',
    configTitle: 'Pełny przykład konfiguracji wtyczki',
    configDesc: 'Gotowy na produkcję vite.config.ts z wieloma wtyczkami.',
    comparisonTitle: 'Szybka dokumentacja hooków Vite',
    faqTitle: 'Często zadawane pytania',
    faqQ1: 'Kiedy używać enforce: "pre" vs "post"?',
    faqA1: 'Użyj "pre" gdy wtyczka musi działać przed innymi transformacjami.',
    faqQ2: 'Jak stworzyć wirtualny moduł w Vite?',
    faqA2: 'Użyj resolveId z prefiksem \\0 i load dla zawartości.',
    faqQ3: 'Czy wtyczki Vite działają w trybie dev i build?',
    faqA3: 'Tak, użyj właściwości apply do sterowania trybem.',
    faqQ4: 'Jak debugować wtyczkę Vite?',
    faqA4: 'Dodaj DEBUG=vite:* do swojego środowiska.',
    relatedTools: 'Powiązane narzędzia',
  },
  sv: {
    title: 'Vite plugin-utveckling: anpassade transformationer och dev-verktyg',
    intro: 'Vites plugin-API är ett tunt lager ovanpå Rollup, utökat med dev-server-hooks.',
    basicTitle: 'Plugin-anatomi: hooks och livscykel',
    basicDesc: 'Ett Vite-plugin är ett enkelt objekt med ett namn och hook-metoder.',
    transformTitle: 'transform-hook: modifiera källfiler',
    transformDesc: 'transform-hooken är den vanligaste hooken.',
    resolveTitle: 'resolveId-hook: anpassad modulupplösning',
    resolveDesc: 'resolveId-hooken fångar upp importvägar och omdirigerar dem.',
    devServerTitle: 'configureServer: dev-server-middleware',
    devServerDesc: 'configureServer-hooken ger full åtkomst till Vite dev-server.',
    hmrTitle: 'HMR: Hot Module Replacement-integration',
    hmrDesc: 'Plugins kan injicera HMR-kod och hantera anpassade uppdateringshändelser.',
    configTitle: 'Komplett plugin-konfigurationsexempel',
    configDesc: 'En produktionsklar vite.config.ts med flera plugins.',
    comparisonTitle: 'Vite hooks snabbreferens',
    faqTitle: 'Vanliga frågor',
    faqQ1: 'När ska man använda enforce: "pre" vs "post"?',
    faqA1: 'Använd "pre" när ditt plugin måste köras före andra transformationer.',
    faqQ2: 'Hur skapar man en virtuell modul i Vite?',
    faqA2: 'Använd resolveId med \\0-prefix och load för innehållet.',
    faqQ3: 'Fungerar Vite-plugins i dev- och build-läge?',
    faqA3: 'Ja, använd apply-egenskapen för att styra läget.',
    faqQ4: 'Hur debuggar man ett Vite-plugin?',
    faqA4: 'Lägg till DEBUG=vite:* i din miljö.',
    relatedTools: 'Relaterade verktyg',
  },
  no: {
    title: 'Vite plugin-utvikling: egendefinerte transformasjoner og dev-verktøy',
    intro: 'Vites plugin-API er et tynt lag over Rollup, utvidet med dev-server-hooks.',
    basicTitle: 'Plugin-anatomi: hooks og livssyklus',
    basicDesc: 'Et Vite-plugin er et enkelt objekt med et navn og hook-metoder.',
    transformTitle: 'transform-hook: modifisere kildefiler',
    transformDesc: 'transform-hooken er den mest brukte hooken.',
    resolveTitle: 'resolveId-hook: egendefinert moduloppløsning',
    resolveDesc: 'resolveId-hooken avskjærer importbaner og omdirigerer dem.',
    devServerTitle: 'configureServer: dev-server-middleware',
    devServerDesc: 'configureServer-hooken gir full tilgang til Vite dev-server.',
    hmrTitle: 'HMR: Hot Module Replacement-integrasjon',
    hmrDesc: 'Plugins kan injisere HMR-kode og håndtere egendefinerte oppdateringshendelser.',
    configTitle: 'Komplett plugin-konfigurasjonseksempel',
    configDesc: 'En produksjonsklar vite.config.ts med flere plugins.',
    comparisonTitle: 'Vite hooks hurtigreferanse',
    faqTitle: 'Vanlige spørsmål',
    faqQ1: 'Når skal man bruke enforce: "pre" vs "post"?',
    faqA1: 'Bruk "pre" når pluginen din må kjøre før andre transformasjoner.',
    faqQ2: 'Hvordan lage en virtuell modul i Vite?',
    faqA2: 'Bruk resolveId med \\0-prefiks og load for innholdet.',
    faqQ3: 'Fungerer Vite-plugins i dev- og build-modus?',
    faqA3: 'Ja, bruk apply-egenskapen for å styre modusen.',
    faqQ4: 'Hvordan debugge et Vite-plugin?',
    faqA4: 'Legg til DEBUG=vite:* i miljøet ditt.',
    relatedTools: 'Relaterte verktøy',
  },
  id: {
    title: 'Pengembangan plugin Vite: transformasi kustom dan alat pengembangan',
    intro: 'API plugin Vite adalah lapisan tipis di atas Rollup, diperluas dengan hook server pengembangan.',
    basicTitle: 'Anatomi plugin: hook dan siklus hidup',
    basicDesc: 'Plugin Vite adalah objek sederhana dengan nama dan metode hook.',
    transformTitle: 'Hook transform: memodifikasi file sumber',
    transformDesc: 'Hook transform adalah hook yang paling sering digunakan.',
    resolveTitle: 'Hook resolveId: resolusi modul kustom',
    resolveDesc: 'Hook resolveId mencegat jalur impor dan mengalihkannya.',
    devServerTitle: 'configureServer: middleware server pengembangan',
    devServerDesc: 'Hook configureServer memberikan akses penuh ke server pengembangan Vite.',
    hmrTitle: 'HMR: integrasi penggantian modul panas',
    hmrDesc: 'Plugin dapat menyuntikkan kode HMR dan menangani event pembaruan kustom.',
    configTitle: 'Contoh konfigurasi plugin lengkap',
    configDesc: 'vite.config.ts siap produksi dengan beberapa plugin.',
    comparisonTitle: 'Referensi cepat hook Vite',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faqQ1: 'Kapan menggunakan enforce: "pre" vs "post"?',
    faqA1: 'Gunakan "pre" saat plugin Anda harus berjalan sebelum transformasi lain.',
    faqQ2: 'Bagaimana cara membuat modul virtual di Vite?',
    faqA2: 'Gunakan resolveId dengan prefiks \\0 dan load untuk kontennya.',
    faqQ3: 'Apakah plugin Vite bekerja dalam mode dev dan build?',
    faqA3: 'Ya, gunakan properti apply untuk mengontrol mode.',
    faqQ4: 'Bagaimana cara men-debug plugin Vite?',
    faqA4: 'Tambahkan DEBUG=vite:* ke lingkungan Anda.',
    relatedTools: 'Alat terkait',
  },
  th: {
    title: 'การพัฒนาปลั๊กอิน Vite: การแปลงแบบกำหนดเองและเครื่องมือพัฒนา',
    intro: 'Plugin API ของ Vite เป็นชั้นบางๆ เหนือ Rollup ที่ขยายด้วย dev server hooks',
    basicTitle: 'โครงสร้างปลั๊กอิน: hooks และวงจรชีวิต',
    basicDesc: 'ปลั๊กอิน Vite คือออบเจกต์ธรรมดาที่มีชื่อและเมธอด hook',
    transformTitle: 'hook transform: แก้ไขไฟล์ต้นฉบับ',
    transformDesc: 'hook transform เป็น hook ที่ใช้บ่อยที่สุด',
    resolveTitle: 'hook resolveId: การแก้ไขโมดูลแบบกำหนดเอง',
    resolveDesc: 'hook resolveId ดักจับเส้นทาง import และเปลี่ยนเส้นทาง',
    devServerTitle: 'configureServer: middleware ของ dev server',
    devServerDesc: 'hook configureServer ให้การเข้าถึง dev server ของ Vite อย่างเต็มที่',
    hmrTitle: 'HMR: การผสานรวม Hot Module Replacement',
    hmrDesc: 'ปลั๊กอินสามารถแทรกโค้ด HMR และจัดการเหตุการณ์อัปเดตแบบกำหนดเอง',
    configTitle: 'ตัวอย่างการกำหนดค่าปลั๊กอินครบถ้วน',
    configDesc: 'vite.config.ts พร้อมสำหรับการผลิตที่รวมหลายปลั๊กอิน',
    comparisonTitle: 'ข้อมูลอ้างอิงด่วน Vite hooks',
    faqTitle: 'คำถามที่พบบ่อย',
    faqQ1: 'ควรใช้ enforce: "pre" หรือ "post" เมื่อใด?',
    faqA1: 'ใช้ "pre" เมื่อปลั๊กอินต้องทำงานก่อนการแปลงอื่นๆ',
    faqQ2: 'วิธีสร้าง virtual module ใน Vite?',
    faqA2: 'ใช้ resolveId พร้อมคำนำหน้า \\0 และ load สำหรับเนื้อหา',
    faqQ3: 'ปลั๊กอิน Vite ทำงานในโหมด dev และ build ได้ไหม?',
    faqA3: 'ได้ ใช้คุณสมบัติ apply เพื่อควบคุมโหมด',
    faqQ4: 'วิธีดีบักปลั๊กอิน Vite?',
    faqA4: 'เพิ่ม DEBUG=vite:* ในสภาพแวดล้อมของคุณ',
    relatedTools: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function VitePluginDevelopment({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faqQ1, acceptedAnswer: { '@type': 'Answer', text: t.faqA1 } },
      { '@type': 'Question', name: t.faqQ2, acceptedAnswer: { '@type': 'Answer', text: t.faqA2 } },
      { '@type': 'Question', name: t.faqQ3, acceptedAnswer: { '@type': 'Answer', text: t.faqA3 } },
      { '@type': 'Question', name: t.faqQ4, acceptedAnswer: { '@type': 'Answer', text: t.faqA4 } },
    ],
  };

  const hookRows = [
    { hook: 'config', when: 'Before config resolve', use: 'Modify Vite config', applies: 'Both' },
    { hook: 'configResolved', when: 'After config resolve', use: 'Read final config', applies: 'Both' },
    { hook: 'configureServer', when: 'Before server starts', use: 'Add middleware', applies: 'Dev only' },
    { hook: 'transform', when: 'On each file request', use: 'Modify source code', applies: 'Both' },
    { hook: 'resolveId', when: 'On import resolution', use: 'Redirect imports', applies: 'Both' },
    { hook: 'load', when: 'After resolveId', use: 'Supply file content', applies: 'Both' },
    { hook: 'handleHotUpdate', when: 'On file change (HMR)', use: 'Custom HMR logic', applies: 'Dev only' },
    { hook: 'buildStart', when: 'Build begins', use: 'Initialize state', applies: 'Build only' },
    { hook: 'generateBundle', when: 'Bundle generated', use: 'Modify output assets', applies: 'Build only' },
  ];

  const preStyle: React.CSSProperties = {
    background: '#1a1a2e',
    color: '#e2e8f0',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    margin: '1rem 0',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{t.title}</h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{t.intro}</p>

      {/* Plugin Anatomy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.basicTitle}</h2>
        <p className="text-gray-600 mb-3">{t.basicDesc}</p>
        <pre style={preStyle}><code>{codePluginBasic}</code></pre>
      </section>

      {/* transform Hook */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.transformTitle}</h2>
        <p className="text-gray-600 mb-3">{t.transformDesc}</p>
        <pre style={preStyle}><code>{codeTransformHook}</code></pre>
      </section>

      {/* resolveId Hook */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.resolveTitle}</h2>
        <p className="text-gray-600 mb-3">{t.resolveDesc}</p>
        <pre style={preStyle}><code>{codeResolveId}</code></pre>
      </section>

      {/* Dev Server Middleware */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.devServerTitle}</h2>
        <p className="text-gray-600 mb-3">{t.devServerDesc}</p>
        <pre style={preStyle}><code>{codeDevServer}</code></pre>
      </section>

      {/* HMR */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.hmrTitle}</h2>
        <p className="text-gray-600 mb-3">{t.hmrDesc}</p>
        <pre style={preStyle}><code>{codeHMR}</code></pre>
      </section>

      {/* Full Config */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">{t.configTitle}</h2>
        <p className="text-gray-600 mb-3">{t.configDesc}</p>
        <pre style={preStyle}><code>{codeViteConfig}</code></pre>
      </section>

      {/* Hook Reference Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.comparisonTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Hook</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">When Called</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Typical Use</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Applies</th>
              </tr>
            </thead>
            <tbody>
              {hookRows.map((row, i) => (
                <tr key={row.hook} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-4 py-2 font-mono text-blue-700">{row.hook}</td>
                  <td className="border border-gray-200 px-4 py-2">{row.when}</td>
                  <td className="border border-gray-200 px-4 py-2">{row.use}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      row.applies === 'Dev only' ? 'bg-green-100 text-green-700' :
                      row.applies === 'Build only' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {row.applies}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t.faqTitle}</h2>
        <div className="space-y-4">
          {[
            { q: t.faqQ1, a: t.faqA1 },
            { q: t.faqQ2, a: t.faqA2 },
            { q: t.faqQ3, a: t.faqA3 },
            { q: t.faqQ4, a: t.faqA4 },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">{t.relatedTools}</h2>
        <div className="flex flex-wrap gap-2">
          {['json-formatter', 'regex-tester', 'base64-encoder', 'url-encoder', 'markdown-preview'].map(tool => (
            <a
              key={tool}
              href={`/${lang}/tools/${tool}`}
              className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {tool}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
