'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vite vs Webpack vs esbuild: Complete Build Tool Comparison (2025)',
    intro: 'The JavaScript build tool landscape has evolved dramatically. In 2025, developers must choose between <strong>Webpack</strong>, <strong>Vite</strong>, <strong>esbuild</strong>, and <strong>Turbopack</strong> — each with radically different architectures and trade-offs. This comprehensive guide compares all four across dev server speed, production build performance, configuration complexity, plugin ecosystems, and framework support to help you pick the right bundler for your project.',
    linkFormatter: 'Try our JS/HTML Formatter tool to beautify your build output →',
    linkJsonFormatter: 'Use our JSON Formatter to inspect your build configs →',

    // Section 1: Build Tool Landscape
    h2_landscape: 'The Build Tool Landscape in 2025',
    landscape_p1: 'Modern JavaScript applications need a build step. Browsers do not natively understand TypeScript, JSX, Vue SFCs, or CSS modules. A build tool transforms your source code into optimized bundles that browsers can execute. But the job goes far beyond transpilation: build tools also handle code splitting, tree shaking, hot module replacement (HMR), asset optimization, and dependency resolution.',
    landscape_p2: 'For years, <strong>Webpack</strong> was the undisputed king. It pioneered concepts like code splitting, loaders, and plugin-based architecture. But its JavaScript-based architecture hit performance walls as projects grew larger. This opened the door for a new generation of tools written in faster languages: <strong>esbuild</strong> (Go), <strong>Vite</strong> (leveraging esbuild + Rollup), and <strong>Turbopack</strong> (Rust).',
    landscape_p3: 'The core tension is between <strong>maturity and speed</strong>. Webpack has the richest ecosystem but slower builds. esbuild is blindingly fast but has a limited plugin API. Vite strikes a pragmatic balance by using esbuild for development and Rollup for production. Turbopack, backed by Vercel, aims to be the successor to Webpack with Rust-level performance.',

    // Section 2: Webpack Overview
    h2_webpack: 'Webpack: The Config-Driven Veteran',
    webpack_p1: 'Webpack was created by Tobias Koppers in 2012 and has been the default bundler for most JavaScript projects for over a decade. It treats every file — JavaScript, CSS, images, fonts — as a module in a dependency graph. Loaders transform files, plugins extend functionality, and the output is one or more optimized bundles.',
    h3_webpack_features: 'Key Features',
    webpack_features_list: '<ul><li><strong>Code splitting</strong> — automatic and manual chunk splitting via dynamic imports and SplitChunksPlugin</li><li><strong>Loaders</strong> — transform any file type (babel-loader, ts-loader, css-loader, file-loader, etc.)</li><li><strong>Plugins</strong> — extend the build pipeline (HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin, etc.)</li><li><strong>Tree shaking</strong> — eliminate unused exports from bundles (requires ES modules)</li><li><strong>Module Federation</strong> — share code between independently deployed applications at runtime</li><li><strong>Dev server</strong> — webpack-dev-server with HMR support</li><li><strong>Source maps</strong> — multiple source map strategies for debugging</li><li><strong>Caching</strong> — persistent filesystem cache for faster rebuilds (Webpack 5)</li></ul>',
    h3_webpack_config: 'Configuration Example',
    webpack_config_code: `// webpack.config.js
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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
        test: /\\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};`,
    h3_webpack_pros: 'Pros',
    webpack_pros_list: '<ul><li>Most mature and battle-tested bundler in the ecosystem</li><li>Richest plugin and loader ecosystem — a plugin exists for virtually everything</li><li>Module Federation enables micro-frontend architectures</li><li>Extensive documentation and community resources</li><li>Persistent caching in Webpack 5 significantly improves rebuild speed</li><li>Fine-grained control over every aspect of the build</li></ul>',
    h3_webpack_cons: 'Cons',
    webpack_cons_list: '<ul><li>Slow cold start — JavaScript-based architecture limits speed</li><li>Complex configuration — webpack.config.js can grow to hundreds of lines</li><li>HMR is slower compared to Vite (full module re-evaluation)</li><li>Steep learning curve for beginners</li><li>Large dependency footprint — many loaders and plugins to install</li></ul>',

    // Section 3: Vite Overview
    h2_vite: 'Vite: Native ESM Dev Server + Rollup Production Builds',
    vite_p1: 'Vite (French for "fast") was created by Evan You (creator of Vue.js) in 2020. It fundamentally rethinks the dev server by leveraging the browser\'s native ES module support. Instead of bundling your entire application before serving it, Vite serves source files directly as ES modules and lets the browser handle imports. This results in near-instant server startup regardless of project size.',
    vite_p2: 'For production builds, Vite uses <strong>Rollup</strong> under the hood, which produces highly optimized bundles with excellent tree shaking. Starting from Vite 5, it also uses esbuild for dependency pre-bundling and TypeScript/JSX transpilation during development.',
    h3_vite_features: 'Key Features',
    vite_features_list: '<ul><li><strong>Native ESM dev server</strong> — serves source files as ES modules, no bundling during development</li><li><strong>Lightning-fast HMR</strong> — updates propagate in milliseconds regardless of app size</li><li><strong>Dependency pre-bundling</strong> — uses esbuild to pre-bundle node_modules dependencies into ESM</li><li><strong>Rollup-based production builds</strong> — mature, optimized output with code splitting and tree shaking</li><li><strong>CSS code splitting</strong> — automatically extracts CSS used by async chunks</li><li><strong>Optimized asset handling</strong> — images, fonts, and other assets with content hashing</li><li><strong>SSR support</strong> — first-class server-side rendering primitives</li><li><strong>Library mode</strong> — build libraries with Rollup-based output formats (ESM, CJS, UMD)</li></ul>',
    h3_vite_config: 'Configuration Example',
    vite_config_code: `// vite.config.ts
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
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});`,
    h3_vite_pros: 'Pros',
    vite_pros_list: '<ul><li>Near-instant dev server cold start — no bundling required</li><li>Fastest HMR in the ecosystem — updates in under 50ms</li><li>Simple, minimal configuration — works out of the box for most frameworks</li><li>Growing plugin ecosystem compatible with Rollup plugins</li><li>First-class TypeScript, JSX, CSS Modules, and PostCSS support</li><li>Excellent DX (developer experience) with clear error messages</li></ul>',
    h3_vite_cons: 'Cons',
    vite_cons_list: '<ul><li>Dev and production use different bundlers (esbuild vs Rollup) — occasional behavior differences</li><li>Rollup production builds are slower than esbuild-only builds</li><li>Smaller plugin ecosystem compared to Webpack</li><li>Some CJS-only packages require extra configuration for pre-bundling</li><li>Module Federation support requires community plugins (not built-in)</li></ul>',

    // Section 4: esbuild Overview
    h2_esbuild: 'esbuild: The Speed Demon',
    esbuild_p1: 'esbuild was created by Evan Wallace (co-founder of Figma) in 2020. Written in <strong>Go</strong>, it parallelizes work across CPU cores and avoids the overhead of a JavaScript runtime. The result is build speeds 10-100x faster than JavaScript-based bundlers. esbuild can bundle a large project in under a second where Webpack would take 30+ seconds.',
    esbuild_p2: 'However, esbuild intentionally has a <strong>limited plugin API</strong> and does not aim to replace Webpack feature-for-feature. It excels as a transpiler and bundler but lacks advanced features like HMR, sophisticated code splitting strategies, and HTML generation. Many tools (including Vite) use esbuild internally while adding higher-level features on top.',
    h3_esbuild_features: 'Key Features',
    esbuild_features_list: '<ul><li><strong>Extreme speed</strong> — written in Go, 10-100x faster than JavaScript bundlers</li><li><strong>TypeScript and JSX</strong> — native transpilation without Babel</li><li><strong>Tree shaking</strong> — dead code elimination at the statement level</li><li><strong>Minification</strong> — fast, high-quality JavaScript and CSS minification</li><li><strong>Source maps</strong> — fast source map generation</li><li><strong>Multiple output formats</strong> — ESM, CJS, and IIFE</li><li><strong>CSS bundling</strong> — native CSS bundling with CSS modules support</li><li><strong>Watch mode</strong> — incremental rebuilds on file changes</li></ul>',
    h3_esbuild_config: 'Configuration Example',
    esbuild_config_code: `// esbuild.config.mjs
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  plugins: [],
});

// Or use the CLI:
// esbuild src/index.tsx --bundle --outdir=dist
//   --format=esm --splitting --minify --sourcemap`,
    h3_esbuild_pros: 'Pros',
    esbuild_pros_list: '<ul><li>Fastest build tool available — measured in milliseconds, not seconds</li><li>Zero configuration needed for basic use cases</li><li>Excellent TypeScript and JSX support out of the box</li><li>Very small dependency footprint — single binary</li><li>Consistent speed — Go-based parallelism scales with CPU cores</li><li>Great as a transpiler/minifier embedded in other tools</li></ul>',
    h3_esbuild_cons: 'Cons',
    esbuild_cons_list: '<ul><li>Limited plugin API — cannot match Webpack\'s extensibility</li><li>No built-in HMR or dev server (requires wrapper tools)</li><li>No HTML generation — needs separate tooling for HTML entry points</li><li>Code splitting is basic compared to Webpack or Rollup</li><li>Not suitable as a standalone tool for complex web applications</li><li>TypeScript type checking is not performed (transpile-only)</li></ul>',

    // Section 5: Turbopack Overview
    h2_turbopack: 'Turbopack: The Rust-Powered Next.js Default',
    turbopack_p1: 'Turbopack was announced by Vercel in October 2022 as the successor to Webpack. Written in <strong>Rust</strong> using the Turbo engine, it uses <strong>incremental computation</strong> — meaning it only recomputes what has actually changed. Turbopack became the default bundler for Next.js development mode starting with Next.js 15.',
    turbopack_p2: 'Turbopack is designed to handle the largest codebases in the world. Its incremental architecture means that HMR speed does not degrade as your project grows. A 10,000-module app updates just as fast as a 100-module app because only the changed module and its dependents are reprocessed.',
    h3_turbopack_features: 'Key Features',
    turbopack_features_list: '<ul><li><strong>Incremental computation</strong> — only reprocesses what changed, consistent HMR speed at any scale</li><li><strong>Rust-based</strong> — native performance without JavaScript runtime overhead</li><li><strong>Next.js integration</strong> — first-class support as the default Next.js dev bundler</li><li><strong>Lazy bundling</strong> — only bundles code that is actually requested by the browser</li><li><strong>TypeScript and JSX</strong> — native support via SWC transpilation</li><li><strong>CSS support</strong> — CSS modules, PostCSS, and Tailwind CSS</li><li><strong>Webpack compatibility layer</strong> — supports many common Webpack loaders</li></ul>',
    h3_turbopack_pros: 'Pros',
    turbopack_pros_list: '<ul><li>HMR speed remains constant regardless of application size</li><li>Native Rust performance with fine-grained caching</li><li>Seamless Next.js integration — zero configuration needed</li><li>Lazy compilation reduces initial dev server startup time</li><li>Backed by Vercel with strong long-term investment</li></ul>',
    h3_turbopack_cons: 'Cons',
    turbopack_cons_list: '<ul><li>Tightly coupled to Next.js — not yet available as a standalone bundler</li><li>Production builds still use Webpack in Next.js (Turbopack is dev-only as of early 2025)</li><li>No standalone plugin API — relies on Webpack compatibility layer</li><li>Relatively new — less community content and troubleshooting resources</li><li>Cannot be used with non-Next.js frameworks</li></ul>',

    // Section 6: Dev Server Speed Comparison
    h2_dev_speed: 'Dev Server Speed Comparison',
    dev_speed_intro: 'Development speed is where these tools differ most dramatically. The following benchmarks are based on a React + TypeScript project with approximately 1,000 modules.',
    th_metric: 'Metric',
    th_webpack_name: 'Webpack 5',
    th_vite_name: 'Vite 6',
    th_esbuild_name: 'esbuild',
    th_turbopack_name: 'Turbopack',
    metric_cold_start: 'Dev server cold start',
    metric_hmr: 'HMR update time',
    metric_page_load: 'First page load (dev)',
    metric_memory: 'Memory usage (dev)',
    val_wp_cold: '~8-15s',
    val_vite_cold: '~300-800ms',
    val_es_cold: '~100-300ms',
    val_tp_cold: '~1-3s',
    val_wp_hmr: '~200-500ms',
    val_vite_hmr: '~20-50ms',
    val_es_hmr: 'N/A (no built-in HMR)',
    val_tp_hmr: '~10-30ms',
    val_wp_page: '~2-5s',
    val_vite_page: '~1-3s',
    val_es_page: 'N/A',
    val_tp_page: '~1-2s',
    val_wp_mem: '~300-600MB',
    val_vite_mem: '~150-300MB',
    val_es_mem: '~50-100MB',
    val_tp_mem: '~200-400MB',
    dev_speed_note: '<strong>Note:</strong> esbuild does not include a dev server or HMR out of the box. It is primarily a bundler/transpiler. Turbopack numbers are for Next.js projects only. Benchmarks are approximate and vary based on hardware, project structure, and dependency count.',

    // Section 7: Build Speed Comparison
    h2_build_speed: 'Production Build Speed Comparison',
    build_speed_intro: 'Production build performance matters for CI/CD pipelines. Here are approximate build times for different project sizes.',
    th_project_size: 'Project Size',
    size_small: 'Small (~100 modules)',
    size_medium: 'Medium (~1,000 modules)',
    size_large: 'Large (~10,000 modules)',
    size_mono: 'Monorepo (~50,000 modules)',
    val_wp_small: '~5-10s',
    val_vite_small: '~2-4s',
    val_es_small: '~0.1-0.3s',
    val_tp_small: 'N/A (dev only)',
    val_wp_medium: '~20-45s',
    val_vite_medium: '~8-15s',
    val_es_medium: '~0.5-1.5s',
    val_tp_medium: 'N/A (dev only)',
    val_wp_large: '~60-180s',
    val_vite_large: '~25-60s',
    val_es_large: '~2-5s',
    val_tp_large: 'N/A (dev only)',
    val_wp_mono: '~300-600s',
    val_vite_mono: '~90-200s',
    val_es_mono: '~10-30s',
    val_tp_mono: 'N/A (dev only)',
    build_speed_note: '<strong>Note:</strong> Vite production builds use Rollup, which is slower than esbuild but produces more optimized output. Turbopack does not currently support production builds. These numbers include TypeScript transpilation, minification, and asset processing.',

    // Section 8: Configuration Complexity
    h2_config: 'Configuration Complexity',
    config_intro: 'One of the biggest differences between these tools is how much configuration they require. Webpack is notoriously config-heavy, while Vite and esbuild aim for sensible defaults.',
    h3_config_webpack: 'Webpack: Explicit Configuration',
    config_webpack_p: 'A typical Webpack project requires installing and configuring multiple loaders and plugins. A production-ready webpack.config.js often spans 100-300 lines. You need to explicitly configure TypeScript support (ts-loader or babel-loader + @babel/preset-typescript), CSS processing (css-loader + postcss-loader + MiniCssExtractPlugin), asset handling, dev server, and optimization settings.',
    webpack_deps_code: `# Typical Webpack dependencies
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin mini-css-extract-plugin
npm install --save-dev ts-loader css-loader postcss-loader style-loader
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev babel-loader
# Total: 12+ dev dependencies just for the build tool`,
    h3_config_vite: 'Vite: Convention Over Configuration',
    config_vite_p: 'Vite works out of the box with zero configuration for most projects. TypeScript, JSX, CSS Modules, and PostCSS are supported natively. A typical vite.config.ts is 10-30 lines. The only required plugin is framework-specific (e.g., @vitejs/plugin-react).',
    vite_deps_code: `# Typical Vite dependencies
npm install --save-dev vite @vitejs/plugin-react
# Total: 2 dev dependencies
# TypeScript, CSS Modules, PostCSS — all built-in`,
    h3_config_esbuild: 'esbuild: Minimal API',
    config_esbuild_p: 'esbuild has the simplest API — a single function call or CLI command. However, you may need additional tooling for HTML generation, dev server, and HMR. The esbuild API is programmable in JavaScript/Go but lacks the declarative config file pattern.',
    esbuild_deps_code: `# Typical esbuild dependencies
npm install --save-dev esbuild
# Total: 1 dev dependency
# But you'll likely need additional tools for a full dev workflow`,
    h3_config_turbopack: 'Turbopack: Zero Configuration (within Next.js)',
    config_turbopack_p: 'Turbopack requires no separate configuration — it is enabled automatically in Next.js. Any configuration is done through next.config.js. If you need custom Webpack loaders, many work through the Webpack compatibility layer.',
    turbopack_deps_code: `# Turbopack dependencies (via Next.js)
npx create-next-app@latest my-app
# Turbopack is included — no extra installation
# Enable in dev: next dev --turbopack`,

    // Section 9: Plugin Ecosystem
    h2_plugins: 'Plugin Ecosystem Comparison',
    plugins_intro: 'The plugin ecosystem determines how easily you can extend a build tool to handle your project\'s specific needs.',
    h3_plugins_webpack: 'Webpack Loaders and Plugins',
    plugins_webpack_p: 'Webpack has the <strong>largest plugin ecosystem</strong> in the JavaScript bundler world. With thousands of loaders and plugins available on npm, you can find a solution for virtually any build requirement. The loader/plugin architecture is well-documented and has been refined over a decade. Key examples include: babel-loader, ts-loader, css-loader, sass-loader, less-loader, file-loader, url-loader, HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin, CopyWebpackPlugin, BundleAnalyzerPlugin, and Module Federation Plugin.',
    h3_plugins_vite: 'Vite Plugins (Rollup-Compatible)',
    plugins_vite_p: 'Vite\'s plugin API is based on <strong>Rollup\'s plugin interface</strong> with Vite-specific extensions. This means many existing Rollup plugins work directly with Vite. The Vite plugin ecosystem is growing rapidly, with official plugins for React, Vue, Svelte, and Legacy browser support. Community plugins cover PWA, SSG, component inspection, and more. Creating a Vite plugin is significantly simpler than creating a Webpack loader/plugin pair.',
    vite_plugin_code: `// Example: Custom Vite plugin
export default function myPlugin() {
  return {
    name: 'my-plugin',
    // Rollup-compatible hooks
    resolveId(source) {
      if (source === 'virtual-module') {
        return source;
      }
    },
    load(id) {
      if (id === 'virtual-module') {
        return 'export default "Hello from virtual module"';
      }
    },
    // Vite-specific hooks
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Custom middleware
        next();
      });
    },
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        '<script>console.log("injected")</script></head>'
      );
    },
  };
}`,
    h3_plugins_esbuild: 'esbuild Plugins',
    plugins_esbuild_p: 'esbuild\'s plugin API is intentionally <strong>minimal and focused</strong>. Plugins can intercept module resolution (onResolve) and loading (onLoad), but cannot modify the bundling or optimization phases. This keeps esbuild fast but limits extensibility. The plugin ecosystem is small compared to Webpack or Vite.',
    esbuild_plugin_code: `// Example: esbuild plugin
const envPlugin = {
  name: 'env',
  setup(build) {
    // Intercept import paths starting with "env:"
    build.onResolve({ filter: /^env:/ }, (args) => ({
      path: args.path,
      namespace: 'env-ns',
    }));
    // Load the intercepted paths
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }));
  },
};

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [envPlugin],
});`,

    // Section 10: Framework Support
    h2_frameworks: 'Framework Support Comparison',
    frameworks_intro: 'Different build tools have varying levels of support for popular frameworks. Here is the compatibility matrix.',
    th_framework: 'Framework',
    fw_react: 'React',
    fw_vue: 'Vue 3',
    fw_svelte: 'Svelte',
    fw_nextjs: 'Next.js',
    fw_nuxt: 'Nuxt 3',
    fw_angular: 'Angular',
    fw_solid: 'SolidJS',
    fw_astro: 'Astro',
    val_wp_react: 'Full (babel-loader/ts-loader)',
    val_wp_vue: 'Full (vue-loader)',
    val_wp_svelte: 'Full (svelte-loader)',
    val_wp_nextjs: 'Default prod bundler',
    val_wp_nuxt: 'Supported (legacy)',
    val_wp_angular: 'Default (via Angular CLI)',
    val_wp_solid: 'Full (babel-plugin)',
    val_wp_astro: 'Not used',
    val_vite_react: 'Full (@vitejs/plugin-react)',
    val_vite_vue: 'Full (@vitejs/plugin-vue)',
    val_vite_svelte: 'Full (@sveltejs/vite-plugin-svelte)',
    val_vite_nextjs: 'Not supported',
    val_vite_nuxt: 'Default bundler',
    val_vite_angular: 'Default (Angular 17+)',
    val_vite_solid: 'Full (vite-plugin-solid)',
    val_vite_astro: 'Default bundler',
    val_es_react: 'Transpile only (no HMR)',
    val_es_vue: 'Transpile only',
    val_es_svelte: 'Via plugins',
    val_es_nextjs: 'Not supported',
    val_es_nuxt: 'Not supported',
    val_es_angular: 'Not supported',
    val_es_solid: 'Transpile only',
    val_es_astro: 'Not used directly',
    val_tp_react: 'Full (via Next.js)',
    val_tp_vue: 'Not supported',
    val_tp_svelte: 'Not supported',
    val_tp_nextjs: 'Default dev bundler',
    val_tp_nuxt: 'Not supported',
    val_tp_angular: 'Not supported',
    val_tp_solid: 'Not supported',
    val_tp_astro: 'Not supported',

    // Section 11: Migration Guide
    h2_migration: 'Migration Guide: Webpack to Vite',
    migration_intro: 'Vite is the most common migration target for Webpack users. Here is a step-by-step guide with common gotchas.',
    h3_migration_steps: 'Step-by-Step Migration',
    migration_step1: '<strong>Step 1: Install Vite and framework plugin</strong>',
    migration_step1_code: `npm install --save-dev vite @vitejs/plugin-react
# Remove Webpack dependencies
npm uninstall webpack webpack-cli webpack-dev-server
npm uninstall html-webpack-plugin mini-css-extract-plugin
npm uninstall babel-loader ts-loader css-loader style-loader`,
    migration_step2: '<strong>Step 2: Create vite.config.ts</strong>',
    migration_step2_code: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // Vite uses URL-style paths
    },
  },
});`,
    migration_step3: '<strong>Step 3: Move index.html to project root</strong>',
    migration_step3_desc: 'Vite uses index.html as the entry point (not a Webpack plugin). Move it from <code>public/index.html</code> to the project root and add a script tag pointing to your entry file:',
    migration_step3_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
  <!-- This is the key difference from Webpack -->
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
    migration_step4: '<strong>Step 4: Update package.json scripts</strong>',
    migration_step4_code: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}`,
    migration_step5: '<strong>Step 5: Update environment variables</strong>',
    migration_step5_desc: 'Vite uses <code>import.meta.env</code> instead of <code>process.env</code>. Variables must be prefixed with <code>VITE_</code> instead of <code>REACT_APP_</code>:',
    migration_step5_code: `// Before (Webpack / CRA)
const apiUrl = process.env.REACT_APP_API_URL;

// After (Vite)
const apiUrl = import.meta.env.VITE_API_URL;`,
    h3_migration_gotchas: 'Common Migration Gotchas',
    migration_gotchas_list: '<ul><li><strong>CJS dependencies</strong> — Some packages only ship CommonJS. Add them to <code>optimizeDeps.include</code> in vite.config.ts</li><li><strong>Global variables</strong> — <code>process.env</code> is not available. Use <code>define</code> in config or <code>import.meta.env</code></li><li><strong>require() calls</strong> — Vite uses ESM. Replace <code>require()</code> with <code>import</code> statements</li><li><strong>CSS imports</strong> — Vite handles CSS natively. Remove css-loader, style-loader, and MiniCssExtractPlugin</li><li><strong>Static assets</strong> — Use <code>new URL(\'./asset.png\', import.meta.url).href</code> for dynamic asset paths</li><li><strong>Proxy configuration</strong> — Vite uses a different proxy config format in <code>server.proxy</code></li><li><strong>Jest to Vitest</strong> — Consider migrating to Vitest, which shares Vite\'s config and is significantly faster</li></ul>',

    // Section 12: Decision Matrix
    h2_decision: 'Decision Matrix: Which Build Tool to Choose',
    decision_intro: 'The right tool depends on your project type, team size, and priorities. Here is a practical decision matrix.',
    th_project_type: 'Project Type',
    th_recommended: 'Recommended Tool',
    th_reason: 'Reason',
    proj_new_spa: 'New SPA (React/Vue/Svelte)',
    proj_new_spa_tool: 'Vite',
    proj_new_spa_reason: 'Fastest DX, simple config, excellent framework support',
    proj_nextjs: 'Next.js application',
    proj_nextjs_tool: 'Turbopack (dev) + Webpack (prod)',
    proj_nextjs_reason: 'Built-in, zero config, best Next.js performance',
    proj_nuxt: 'Nuxt 3 application',
    proj_nuxt_tool: 'Vite',
    proj_nuxt_reason: 'Default Nuxt bundler, excellent Vue ecosystem integration',
    proj_legacy: 'Legacy Webpack project',
    proj_legacy_tool: 'Keep Webpack (migrate incrementally)',
    proj_legacy_reason: 'Low risk, enable persistent caching for speed',
    proj_lib: 'NPM library',
    proj_lib_tool: 'Vite (library mode) or esbuild',
    proj_lib_reason: 'Clean ESM/CJS output, simple configuration',
    proj_micro: 'Micro-frontends',
    proj_micro_tool: 'Webpack',
    proj_micro_reason: 'Module Federation is unique to Webpack',
    proj_speed: 'Speed-critical CI pipeline',
    proj_speed_tool: 'esbuild',
    proj_speed_reason: 'Fastest production builds by a huge margin',
    proj_enterprise: 'Enterprise monorepo',
    proj_enterprise_tool: 'Vite + Turborepo',
    proj_enterprise_reason: 'Fast dev + orchestrated builds across packages',
    decision_summary: 'For most new projects in 2025, <strong>Vite is the default recommendation</strong>. It offers the best balance of development speed, production output quality, and ecosystem support. Use Webpack only if you need Module Federation or are maintaining an existing Webpack project. Use esbuild when raw build speed is the top priority and you do not need a dev server. Use Turbopack if you are building with Next.js.',

    // Section 13: FAQ
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Is Vite faster than Webpack?',
    faq1_a: 'Yes, Vite is significantly faster than Webpack for development. Vite\'s dev server starts in under a second regardless of project size because it uses native ES modules instead of bundling. HMR updates take 20-50ms in Vite versus 200-500ms in Webpack. For production builds, Vite (using Rollup) is about 2-3x faster than Webpack. However, if you enable Webpack 5\'s persistent filesystem cache, the gap narrows for subsequent builds.',
    faq2_q: 'Can esbuild replace Webpack completely?',
    faq2_a: 'For most web applications, no. esbuild lacks a built-in dev server, HMR, HTML generation, and has a limited plugin API. It is best used as a transpiler/bundler embedded in higher-level tools (like Vite) or for building Node.js libraries and simple scripts where you do not need a dev server. For complex web applications with code splitting, multiple entry points, and framework-specific transforms, Vite or Webpack remain better choices.',
    faq3_q: 'Should I migrate from Webpack to Vite?',
    faq3_a: 'It depends on your situation. If your team frequently complains about slow dev server startup or HMR, migrating to Vite can dramatically improve developer experience. The migration is straightforward for most React, Vue, and Svelte projects. However, if your Webpack setup is heavily customized with many loaders and plugins, the migration may require significant effort. Start by evaluating whether your Webpack plugins have Vite equivalents.',
    faq4_q: 'What is Turbopack and when should I use it?',
    faq4_a: 'Turbopack is a Rust-based bundler built by Vercel specifically for Next.js. It uses incremental computation to maintain consistent HMR speed regardless of project size. As of early 2025, Turbopack is the default dev bundler for Next.js but does not support production builds yet. You should use it if you are building a Next.js application — it is enabled automatically. It is not available as a standalone tool for non-Next.js projects.',
    faq5_q: 'Why does Vite use Rollup for production instead of esbuild?',
    faq5_a: 'Although esbuild is faster, Rollup produces more optimized output for production bundles. Rollup has better tree shaking, more mature code splitting with precise chunk control, and a richer plugin ecosystem for production transforms. Vite\'s philosophy is to use the fastest tool for each context: esbuild for development (where speed matters most) and Rollup for production (where output optimization matters most). The Vite team has been working on Rolldown, a Rust-based Rollup replacement that aims to combine esbuild\'s speed with Rollup\'s optimization quality.',
  },
  zh: {
    title: 'Vite vs Webpack vs esbuild：完整构建工具对比（2025）',
    intro: 'JavaScript 构建工具格局已经发生了巨大变化。2025 年，开发者必须在 <strong>Webpack</strong>、<strong>Vite</strong>、<strong>esbuild</strong> 和 <strong>Turbopack</strong> 之间做出选择——每个工具都有截然不同的架构和权衡。本综合指南从开发服务器速度、生产构建性能、配置复杂度、插件生态和框架支持等维度全面对比这四个工具，帮助你为项目选择合适的打包器。',
    linkFormatter: '试试我们的 JS/HTML 格式化工具来美化你的构建输出 →',
    linkJsonFormatter: '使用我们的 JSON 格式化工具来检查你的构建配置 →',

    // Section 1: Build Tool Landscape
    h2_landscape: '2025 年构建工具格局',
    landscape_p1: '现代 JavaScript 应用需要构建步骤。浏览器原生不支持 TypeScript、JSX、Vue SFC 或 CSS 模块。构建工具将你的源代码转换为浏览器可以执行的优化包。但工作远不止转译：构建工具还处理代码分割、树摇优化、热模块替换（HMR）、资源优化和依赖解析。',
    landscape_p2: '多年来，<strong>Webpack</strong> 是无可争议的霸主。它开创了代码分割、加载器和基于插件的架构等概念。但随着项目规模增长，其基于 JavaScript 的架构遇到了性能瓶颈。这为用更快语言编写的新一代工具打开了大门：<strong>esbuild</strong>（Go）、<strong>Vite</strong>（利用 esbuild + Rollup）和 <strong>Turbopack</strong>（Rust）。',
    landscape_p3: '核心矛盾在于<strong>成熟度与速度</strong>之间的权衡。Webpack 拥有最丰富的生态但构建较慢。esbuild 速度惊人但插件 API 有限。Vite 在开发时使用 esbuild、生产时使用 Rollup，取得了务实的平衡。Turbopack 由 Vercel 支持，旨在以 Rust 级别的性能成为 Webpack 的继任者。',

    // Section 2: Webpack Overview
    h2_webpack: 'Webpack：配置驱动的老将',
    webpack_p1: 'Webpack 由 Tobias Koppers 于 2012 年创建，十多年来一直是大多数 JavaScript 项目的默认打包器。它将每个文件——JavaScript、CSS、图片、字体——都视为依赖图中的模块。Loader 转换文件，Plugin 扩展功能，输出是一个或多个优化后的包。',
    h3_webpack_features: '核心特性',
    webpack_features_list: '<ul><li><strong>代码分割</strong>——通过动态导入和 SplitChunksPlugin 实现自动和手动分块</li><li><strong>Loader</strong>——转换任何文件类型（babel-loader、ts-loader、css-loader、file-loader 等）</li><li><strong>Plugin</strong>——扩展构建流水线（HtmlWebpackPlugin、MiniCssExtractPlugin、DefinePlugin 等）</li><li><strong>树摇优化</strong>——从包中消除未使用的导出（需要 ES 模块）</li><li><strong>Module Federation</strong>——在运行时在独立部署的应用之间共享代码</li><li><strong>开发服务器</strong>——支持 HMR 的 webpack-dev-server</li><li><strong>Source Map</strong>——多种 source map 策略用于调试</li><li><strong>缓存</strong>——持久化文件系统缓存加速重新构建（Webpack 5）</li></ul>',
    h3_webpack_config: '配置示例',
    webpack_config_code: `// webpack.config.js
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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
        test: /\\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};`,
    h3_webpack_pros: '优点',
    webpack_pros_list: '<ul><li>生态中最成熟、经过实战检验的打包器</li><li>最丰富的插件和 Loader 生态——几乎任何需求都有对应的插件</li><li>Module Federation 支持微前端架构</li><li>详尽的文档和社区资源</li><li>Webpack 5 的持久化缓存显著提升重建速度</li><li>对构建的每个环节都有细粒度控制</li></ul>',
    h3_webpack_cons: '缺点',
    webpack_cons_list: '<ul><li>冷启动慢——基于 JavaScript 的架构限制了速度</li><li>配置复杂——webpack.config.js 可能增长到数百行</li><li>HMR 比 Vite 慢（完整模块重新评估）</li><li>初学者学习曲线陡峭</li><li>依赖体积大——需要安装许多 Loader 和 Plugin</li></ul>',

    // Section 3: Vite Overview
    h2_vite: 'Vite：原生 ESM 开发服务器 + Rollup 生产构建',
    vite_p1: 'Vite（法语意为"快"）由 Evan You（Vue.js 创始人）于 2020 年创建。它从根本上重新思考了开发服务器，利用浏览器原生的 ES 模块支持。Vite 不是在提供服务之前打包整个应用，而是直接将源文件作为 ES 模块提供，让浏览器处理导入。这使得无论项目多大，服务器启动都近乎即时。',
    vite_p2: '在生产构建中，Vite 底层使用 <strong>Rollup</strong>，生成高度优化的包，具有出色的树摇优化。从 Vite 5 开始，它还在开发期间使用 esbuild 进行依赖预打包和 TypeScript/JSX 转译。',
    h3_vite_features: '核心特性',
    vite_features_list: '<ul><li><strong>原生 ESM 开发服务器</strong>——将源文件作为 ES 模块提供，开发期间无需打包</li><li><strong>闪电般的 HMR</strong>——无论应用大小，更新都在毫秒内传播</li><li><strong>依赖预打包</strong>——使用 esbuild 将 node_modules 依赖预打包为 ESM</li><li><strong>基于 Rollup 的生产构建</strong>——成熟、优化的输出，支持代码分割和树摇</li><li><strong>CSS 代码分割</strong>——自动提取异步块使用的 CSS</li><li><strong>优化的资源处理</strong>——图片、字体和其他资源的内容哈希</li><li><strong>SSR 支持</strong>——一流的服务端渲染原语</li><li><strong>库模式</strong>——使用基于 Rollup 的输出格式（ESM、CJS、UMD）构建库</li></ul>',
    h3_vite_config: '配置示例',
    vite_config_code: `// vite.config.ts
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
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});`,
    h3_vite_pros: '优点',
    vite_pros_list: '<ul><li>开发服务器冷启动近乎即时——无需打包</li><li>生态中最快的 HMR——更新在 50ms 以内</li><li>简单、最少的配置——大多数框架开箱即用</li><li>不断增长的插件生态，兼容 Rollup 插件</li><li>一流的 TypeScript、JSX、CSS Modules 和 PostCSS 支持</li><li>出色的开发体验（DX），错误信息清晰</li></ul>',
    h3_vite_cons: '缺点',
    vite_cons_list: '<ul><li>开发和生产使用不同的打包器（esbuild vs Rollup）——偶尔有行为差异</li><li>Rollup 生产构建比纯 esbuild 构建慢</li><li>与 Webpack 相比插件生态较小</li><li>某些仅 CJS 的包需要额外配置进行预打包</li><li>Module Federation 支持需要社区插件（非内置）</li></ul>',

    // Section 4: esbuild Overview
    h2_esbuild: 'esbuild：速度恶魔',
    esbuild_p1: 'esbuild 由 Evan Wallace（Figma 联合创始人）于 2020 年创建。使用 <strong>Go</strong> 编写，它在 CPU 核心之间并行化工作，避免了 JavaScript 运行时的开销。结果是构建速度比基于 JavaScript 的打包器快 10-100 倍。esbuild 可以在不到一秒内打包一个大型项目，而 Webpack 需要 30 秒以上。',
    esbuild_p2: '然而，esbuild 故意采用<strong>有限的插件 API</strong>，不打算逐一替代 Webpack 的功能。它作为转译器和打包器表现出色，但缺少 HMR、复杂的代码分割策略和 HTML 生成等高级功能。许多工具（包括 Vite）在内部使用 esbuild，同时在其之上添加更高级的功能。',
    h3_esbuild_features: '核心特性',
    esbuild_features_list: '<ul><li><strong>极致速度</strong>——用 Go 编写，比 JavaScript 打包器快 10-100 倍</li><li><strong>TypeScript 和 JSX</strong>——原生转译，无需 Babel</li><li><strong>树摇优化</strong>——语句级别的死代码消除</li><li><strong>压缩</strong>——快速、高质量的 JavaScript 和 CSS 压缩</li><li><strong>Source Map</strong>——快速生成 source map</li><li><strong>多种输出格式</strong>——ESM、CJS 和 IIFE</li><li><strong>CSS 打包</strong>——原生 CSS 打包，支持 CSS 模块</li><li><strong>监听模式</strong>——文件变更时增量重建</li></ul>',
    h3_esbuild_config: '配置示例',
    esbuild_config_code: `// esbuild.config.mjs
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  minify: true,
  sourcemap: true,
  target: ['es2020'],
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  plugins: [],
});

// 或使用 CLI：
// esbuild src/index.tsx --bundle --outdir=dist
//   --format=esm --splitting --minify --sourcemap`,
    h3_esbuild_pros: '优点',
    esbuild_pros_list: '<ul><li>最快的可用构建工具——以毫秒而非秒计算</li><li>基本用例零配置</li><li>开箱即用的优秀 TypeScript 和 JSX 支持</li><li>极小的依赖体积——单一二进制文件</li><li>一致的速度——基于 Go 的并行处理随 CPU 核心扩展</li><li>作为嵌入其他工具的转译器/压缩器表现出色</li></ul>',
    h3_esbuild_cons: '缺点',
    esbuild_cons_list: '<ul><li>有限的插件 API——无法匹配 Webpack 的可扩展性</li><li>没有内置 HMR 或开发服务器（需要包装工具）</li><li>没有 HTML 生成——需要单独的工具处理 HTML 入口</li><li>代码分割功能比 Webpack 或 Rollup 基础</li><li>不适合作为复杂 Web 应用的独立工具</li><li>不执行 TypeScript 类型检查（仅转译）</li></ul>',

    // Section 5: Turbopack Overview
    h2_turbopack: 'Turbopack：Rust 驱动的 Next.js 默认打包器',
    turbopack_p1: 'Turbopack 由 Vercel 于 2022 年 10 月发布，定位为 Webpack 的继任者。使用 <strong>Rust</strong> 编写，基于 Turbo 引擎，它采用<strong>增量计算</strong>——意味着只重新计算实际变更的部分。从 Next.js 15 开始，Turbopack 成为 Next.js 开发模式的默认打包器。',
    turbopack_p2: 'Turbopack 的设计目标是处理世界上最大的代码库。其增量架构意味着 HMR 速度不会随项目增长而下降。一个 10,000 模块的应用与 100 模块的应用更新速度一样快，因为只有变更的模块及其依赖会被重新处理。',
    h3_turbopack_features: '核心特性',
    turbopack_features_list: '<ul><li><strong>增量计算</strong>——只重新处理变更部分，任何规模下 HMR 速度一致</li><li><strong>基于 Rust</strong>——原生性能，无 JavaScript 运行时开销</li><li><strong>Next.js 集成</strong>——作为默认 Next.js 开发打包器的一流支持</li><li><strong>懒打包</strong>——只打包浏览器实际请求的代码</li><li><strong>TypeScript 和 JSX</strong>——通过 SWC 转译原生支持</li><li><strong>CSS 支持</strong>——CSS 模块、PostCSS 和 Tailwind CSS</li><li><strong>Webpack 兼容层</strong>——支持许多常用的 Webpack Loader</li></ul>',
    h3_turbopack_pros: '优点',
    turbopack_pros_list: '<ul><li>HMR 速度无论应用规模大小都保持恒定</li><li>Rust 原生性能，配合细粒度缓存</li><li>无缝 Next.js 集成——零配置</li><li>懒编译减少初始开发服务器启动时间</li><li>由 Vercel 支持，有强大的长期投入</li></ul>',
    h3_turbopack_cons: '缺点',
    turbopack_cons_list: '<ul><li>与 Next.js 紧密耦合——尚未作为独立打包器提供</li><li>Next.js 中生产构建仍使用 Webpack（截至 2025 年初 Turbopack 仅用于开发）</li><li>没有独立的插件 API——依赖 Webpack 兼容层</li><li>相对较新——社区内容和故障排除资源较少</li><li>无法与非 Next.js 框架一起使用</li></ul>',

    // Section 6: Dev Server Speed Comparison
    h2_dev_speed: '开发服务器速度对比',
    dev_speed_intro: '开发速度是这些工具差异最大的地方。以下基准测试基于一个约 1,000 模块的 React + TypeScript 项目。',
    th_metric: '指标',
    th_webpack_name: 'Webpack 5',
    th_vite_name: 'Vite 6',
    th_esbuild_name: 'esbuild',
    th_turbopack_name: 'Turbopack',
    metric_cold_start: '开发服务器冷启动',
    metric_hmr: 'HMR 更新时间',
    metric_page_load: '首次页面加载（开发）',
    metric_memory: '内存使用（开发）',
    val_wp_cold: '~8-15s',
    val_vite_cold: '~300-800ms',
    val_es_cold: '~100-300ms',
    val_tp_cold: '~1-3s',
    val_wp_hmr: '~200-500ms',
    val_vite_hmr: '~20-50ms',
    val_es_hmr: '无（无内置 HMR）',
    val_tp_hmr: '~10-30ms',
    val_wp_page: '~2-5s',
    val_vite_page: '~1-3s',
    val_es_page: '无',
    val_tp_page: '~1-2s',
    val_wp_mem: '~300-600MB',
    val_vite_mem: '~150-300MB',
    val_es_mem: '~50-100MB',
    val_tp_mem: '~200-400MB',
    dev_speed_note: '<strong>注意：</strong>esbuild 没有内置开发服务器或 HMR，它主要是打包器/转译器。Turbopack 数据仅针对 Next.js 项目。基准测试为近似值，会因硬件、项目结构和依赖数量而异。',

    // Section 7: Build Speed Comparison
    h2_build_speed: '生产构建速度对比',
    build_speed_intro: '生产构建性能对 CI/CD 流水线至关重要。以下是不同项目规模的近似构建时间。',
    th_project_size: '项目规模',
    size_small: '小型（约 100 模块）',
    size_medium: '中型（约 1,000 模块）',
    size_large: '大型（约 10,000 模块）',
    size_mono: 'Monorepo（约 50,000 模块）',
    val_wp_small: '~5-10s',
    val_vite_small: '~2-4s',
    val_es_small: '~0.1-0.3s',
    val_tp_small: '无（仅开发）',
    val_wp_medium: '~20-45s',
    val_vite_medium: '~8-15s',
    val_es_medium: '~0.5-1.5s',
    val_tp_medium: '无（仅开发）',
    val_wp_large: '~60-180s',
    val_vite_large: '~25-60s',
    val_es_large: '~2-5s',
    val_tp_large: '无（仅开发）',
    val_wp_mono: '~300-600s',
    val_vite_mono: '~90-200s',
    val_es_mono: '~10-30s',
    val_tp_mono: '无（仅开发）',
    build_speed_note: '<strong>注意：</strong>Vite 生产构建使用 Rollup，比 esbuild 慢但输出更优化。Turbopack 目前不支持生产构建。这些数字包括 TypeScript 转译、压缩和资源处理。',

    // Section 8: Configuration Complexity
    h2_config: '配置复杂度',
    config_intro: '这些工具之间最大的区别之一是需要多少配置。Webpack 以配置繁重著称，而 Vite 和 esbuild 力求合理的默认值。',
    h3_config_webpack: 'Webpack：显式配置',
    config_webpack_p: '典型的 Webpack 项目需要安装和配置多个 Loader 和 Plugin。一个生产就绪的 webpack.config.js 通常跨越 100-300 行。你需要显式配置 TypeScript 支持（ts-loader 或 babel-loader + @babel/preset-typescript）、CSS 处理（css-loader + postcss-loader + MiniCssExtractPlugin）、资源处理、开发服务器和优化设置。',
    webpack_deps_code: `# 典型的 Webpack 依赖
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev html-webpack-plugin mini-css-extract-plugin
npm install --save-dev ts-loader css-loader postcss-loader style-loader
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev babel-loader
# 总计：仅构建工具就需要 12+ 个开发依赖`,
    h3_config_vite: 'Vite：约定优于配置',
    config_vite_p: 'Vite 对大多数项目零配置即可工作。TypeScript、JSX、CSS Modules 和 PostCSS 原生支持。典型的 vite.config.ts 只有 10-30 行。唯一需要的插件是框架特定的（例如 @vitejs/plugin-react）。',
    vite_deps_code: `# 典型的 Vite 依赖
npm install --save-dev vite @vitejs/plugin-react
# 总计：2 个开发依赖
# TypeScript、CSS Modules、PostCSS——全部内置`,
    h3_config_esbuild: 'esbuild：最简 API',
    config_esbuild_p: 'esbuild 有最简单的 API——一个函数调用或 CLI 命令。但是，你可能需要额外的工具来处理 HTML 生成、开发服务器和 HMR。esbuild API 可以在 JavaScript/Go 中编程使用，但缺少声明式配置文件模式。',
    esbuild_deps_code: `# 典型的 esbuild 依赖
npm install --save-dev esbuild
# 总计：1 个开发依赖
# 但你可能需要额外的工具来完成完整的开发工作流`,
    h3_config_turbopack: 'Turbopack：零配置（在 Next.js 中）',
    config_turbopack_p: 'Turbopack 不需要单独配置——它在 Next.js 中自动启用。所有配置通过 next.config.js 完成。如果你需要自定义 Webpack Loader，许多可以通过 Webpack 兼容层工作。',
    turbopack_deps_code: `# Turbopack 依赖（通过 Next.js）
npx create-next-app@latest my-app
# Turbopack 已包含——无需额外安装
# 在开发中启用：next dev --turbopack`,

    // Section 9: Plugin Ecosystem
    h2_plugins: '插件生态对比',
    plugins_intro: '插件生态决定了你可以多容易地扩展构建工具来满足项目的特定需求。',
    h3_plugins_webpack: 'Webpack Loader 和 Plugin',
    plugins_webpack_p: 'Webpack 拥有 JavaScript 打包器世界中<strong>最大的插件生态</strong>。npm 上有数千个 Loader 和 Plugin，几乎可以找到满足任何构建需求的解决方案。Loader/Plugin 架构文档完善，经过十年的改进。关键示例包括：babel-loader、ts-loader、css-loader、sass-loader、less-loader、file-loader、url-loader、HtmlWebpackPlugin、MiniCssExtractPlugin、DefinePlugin、CopyWebpackPlugin、BundleAnalyzerPlugin 和 Module Federation Plugin。',
    h3_plugins_vite: 'Vite 插件（Rollup 兼容）',
    plugins_vite_p: 'Vite 的插件 API 基于 <strong>Rollup 的插件接口</strong>，并有 Vite 特定的扩展。这意味着许多现有的 Rollup 插件可以直接与 Vite 配合使用。Vite 插件生态正在快速增长，有针对 React、Vue、Svelte 和旧版浏览器支持的官方插件。社区插件涵盖 PWA、SSG、组件检查等。创建 Vite 插件比创建 Webpack Loader/Plugin 对简单得多。',
    vite_plugin_code: `// 示例：自定义 Vite 插件
export default function myPlugin() {
  return {
    name: 'my-plugin',
    // Rollup 兼容钩子
    resolveId(source) {
      if (source === 'virtual-module') {
        return source;
      }
    },
    load(id) {
      if (id === 'virtual-module') {
        return 'export default "Hello from virtual module"';
      }
    },
    // Vite 特定钩子
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // 自定义中间件
        next();
      });
    },
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        '<script>console.log("injected")</script></head>'
      );
    },
  };
}`,
    h3_plugins_esbuild: 'esbuild 插件',
    plugins_esbuild_p: 'esbuild 的插件 API 故意设计为<strong>最小化且聚焦</strong>。插件可以拦截模块解析（onResolve）和加载（onLoad），但无法修改打包或优化阶段。这保持了 esbuild 的速度但限制了可扩展性。与 Webpack 或 Vite 相比，插件生态较小。',
    esbuild_plugin_code: `// 示例：esbuild 插件
const envPlugin = {
  name: 'env',
  setup(build) {
    // 拦截以 "env:" 开头的导入路径
    build.onResolve({ filter: /^env:/ }, (args) => ({
      path: args.path,
      namespace: 'env-ns',
    }));
    // 加载拦截的路径
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }));
  },
};

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [envPlugin],
});`,

    // Section 10: Framework Support
    h2_frameworks: '框架支持对比',
    frameworks_intro: '不同的构建工具对流行框架的支持程度各不相同。以下是兼容性矩阵。',
    th_framework: '框架',
    fw_react: 'React',
    fw_vue: 'Vue 3',
    fw_svelte: 'Svelte',
    fw_nextjs: 'Next.js',
    fw_nuxt: 'Nuxt 3',
    fw_angular: 'Angular',
    fw_solid: 'SolidJS',
    fw_astro: 'Astro',
    val_wp_react: '完全支持（babel-loader/ts-loader）',
    val_wp_vue: '完全支持（vue-loader）',
    val_wp_svelte: '完全支持（svelte-loader）',
    val_wp_nextjs: '默认生产打包器',
    val_wp_nuxt: '支持（旧版）',
    val_wp_angular: '默认（通过 Angular CLI）',
    val_wp_solid: '完全支持（babel-plugin）',
    val_wp_astro: '未使用',
    val_vite_react: '完全支持（@vitejs/plugin-react）',
    val_vite_vue: '完全支持（@vitejs/plugin-vue）',
    val_vite_svelte: '完全支持（@sveltejs/vite-plugin-svelte）',
    val_vite_nextjs: '不支持',
    val_vite_nuxt: '默认打包器',
    val_vite_angular: '默认（Angular 17+）',
    val_vite_solid: '完全支持（vite-plugin-solid）',
    val_vite_astro: '默认打包器',
    val_es_react: '仅转译（无 HMR）',
    val_es_vue: '仅转译',
    val_es_svelte: '通过插件',
    val_es_nextjs: '不支持',
    val_es_nuxt: '不支持',
    val_es_angular: '不支持',
    val_es_solid: '仅转译',
    val_es_astro: '非直接使用',
    val_tp_react: '完全支持（通过 Next.js）',
    val_tp_vue: '不支持',
    val_tp_svelte: '不支持',
    val_tp_nextjs: '默认开发打包器',
    val_tp_nuxt: '不支持',
    val_tp_angular: '不支持',
    val_tp_solid: '不支持',
    val_tp_astro: '不支持',

    // Section 11: Migration Guide
    h2_migration: '迁移指南：从 Webpack 到 Vite',
    migration_intro: 'Vite 是 Webpack 用户最常见的迁移目标。以下是分步指南和常见陷阱。',
    h3_migration_steps: '分步迁移',
    migration_step1: '<strong>步骤 1：安装 Vite 和框架插件</strong>',
    migration_step1_code: `npm install --save-dev vite @vitejs/plugin-react
# 删除 Webpack 依赖
npm uninstall webpack webpack-cli webpack-dev-server
npm uninstall html-webpack-plugin mini-css-extract-plugin
npm uninstall babel-loader ts-loader css-loader style-loader`,
    migration_step2: '<strong>步骤 2：创建 vite.config.ts</strong>',
    migration_step2_code: `// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // Vite 使用 URL 风格路径
    },
  },
});`,
    migration_step3: '<strong>步骤 3：将 index.html 移到项目根目录</strong>',
    migration_step3_desc: 'Vite 使用 index.html 作为入口（而非 Webpack 插件）。将其从 <code>public/index.html</code> 移到项目根目录，并添加指向入口文件的 script 标签：',
    migration_step3_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
  <!-- 这是与 Webpack 的关键区别 -->
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
    migration_step4: '<strong>步骤 4：更新 package.json 脚本</strong>',
    migration_step4_code: `{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}`,
    migration_step5: '<strong>步骤 5：更新环境变量</strong>',
    migration_step5_desc: 'Vite 使用 <code>import.meta.env</code> 而非 <code>process.env</code>。变量必须以 <code>VITE_</code> 为前缀而非 <code>REACT_APP_</code>：',
    migration_step5_code: `// 之前（Webpack / CRA）
const apiUrl = process.env.REACT_APP_API_URL;

// 之后（Vite）
const apiUrl = import.meta.env.VITE_API_URL;`,
    h3_migration_gotchas: '常见迁移陷阱',
    migration_gotchas_list: '<ul><li><strong>CJS 依赖</strong>——某些包只提供 CommonJS。在 vite.config.ts 的 <code>optimizeDeps.include</code> 中添加它们</li><li><strong>全局变量</strong>——<code>process.env</code> 不可用。使用配置中的 <code>define</code> 或 <code>import.meta.env</code></li><li><strong>require() 调用</strong>——Vite 使用 ESM。将 <code>require()</code> 替换为 <code>import</code> 语句</li><li><strong>CSS 导入</strong>——Vite 原生处理 CSS。删除 css-loader、style-loader 和 MiniCssExtractPlugin</li><li><strong>静态资源</strong>——动态资源路径使用 <code>new URL(\'./asset.png\', import.meta.url).href</code></li><li><strong>代理配置</strong>——Vite 在 <code>server.proxy</code> 中使用不同的代理配置格式</li><li><strong>Jest 到 Vitest</strong>——考虑迁移到 Vitest，它共享 Vite 配置且速度显著更快</li></ul>',

    // Section 12: Decision Matrix
    h2_decision: '决策矩阵：如何选择构建工具',
    decision_intro: '正确的工具取决于你的项目类型、团队规模和优先级。以下是实用的决策矩阵。',
    th_project_type: '项目类型',
    th_recommended: '推荐工具',
    th_reason: '原因',
    proj_new_spa: '新的 SPA（React/Vue/Svelte）',
    proj_new_spa_tool: 'Vite',
    proj_new_spa_reason: '最快的开发体验，简单配置，出色的框架支持',
    proj_nextjs: 'Next.js 应用',
    proj_nextjs_tool: 'Turbopack（开发）+ Webpack（生产）',
    proj_nextjs_reason: '内置，零配置，最佳 Next.js 性能',
    proj_nuxt: 'Nuxt 3 应用',
    proj_nuxt_tool: 'Vite',
    proj_nuxt_reason: 'Nuxt 默认打包器，出色的 Vue 生态集成',
    proj_legacy: '遗留 Webpack 项目',
    proj_legacy_tool: '保留 Webpack（渐进迁移）',
    proj_legacy_reason: '低风险，启用持久化缓存提升速度',
    proj_lib: 'NPM 库',
    proj_lib_tool: 'Vite（库模式）或 esbuild',
    proj_lib_reason: '干净的 ESM/CJS 输出，简单配置',
    proj_micro: '微前端',
    proj_micro_tool: 'Webpack',
    proj_micro_reason: 'Module Federation 是 Webpack 独有的',
    proj_speed: '速度关键的 CI 流水线',
    proj_speed_tool: 'esbuild',
    proj_speed_reason: '生产构建速度遥遥领先',
    proj_enterprise: '企业级 Monorepo',
    proj_enterprise_tool: 'Vite + Turborepo',
    proj_enterprise_reason: '快速开发 + 跨包编排构建',
    decision_summary: '对于 2025 年的大多数新项目，<strong>Vite 是默认推荐</strong>。它在开发速度、生产输出质量和生态支持方面提供了最佳平衡。仅在需要 Module Federation 或维护现有 Webpack 项目时使用 Webpack。当原始构建速度是首要优先级且不需要开发服务器时使用 esbuild。如果使用 Next.js 构建则使用 Turbopack。',

    // Section 13: FAQ
    h2_faq: '常见问题',
    faq1_q: 'Vite 比 Webpack 快吗？',
    faq1_a: '是的，Vite 在开发方面比 Webpack 快得多。Vite 的开发服务器无论项目大小都能在一秒内启动，因为它使用原生 ES 模块而非打包。Vite 中 HMR 更新需要 20-50ms，而 Webpack 需要 200-500ms。在生产构建方面，Vite（使用 Rollup）比 Webpack 快约 2-3 倍。但如果启用 Webpack 5 的持久化文件系统缓存，后续构建的差距会缩小。',
    faq2_q: 'esbuild 能完全替代 Webpack 吗？',
    faq2_a: '对于大多数 Web 应用，不能。esbuild 缺少内置开发服务器、HMR、HTML 生成，且插件 API 有限。它最适合作为嵌入更高级工具（如 Vite）的转译器/打包器，或用于构建不需要开发服务器的 Node.js 库和简单脚本。对于具有代码分割、多入口和框架特定转换的复杂 Web 应用，Vite 或 Webpack 仍然是更好的选择。',
    faq3_q: '我应该从 Webpack 迁移到 Vite 吗？',
    faq3_a: '取决于你的情况。如果你的团队经常抱怨开发服务器启动慢或 HMR 慢，迁移到 Vite 可以显著改善开发体验。对于大多数 React、Vue 和 Svelte 项目，迁移很简单。但如果你的 Webpack 配置使用了许多 Loader 和 Plugin 进行了大量自定义，迁移可能需要较大工作量。首先评估你的 Webpack 插件是否有 Vite 等价物。',
    faq4_q: 'Turbopack 是什么，我应该什么时候使用它？',
    faq4_a: 'Turbopack 是 Vercel 专门为 Next.js 构建的基于 Rust 的打包器。它使用增量计算来保持一致的 HMR 速度，无论项目大小。截至 2025 年初，Turbopack 是 Next.js 的默认开发打包器，但尚不支持生产构建。如果你正在构建 Next.js 应用，应该使用它——它会自动启用。目前不可用于非 Next.js 项目的独立工具。',
    faq5_q: '为什么 Vite 生产构建使用 Rollup 而不是 esbuild？',
    faq5_a: '虽然 esbuild 更快，但 Rollup 为生产包生成更优化的输出。Rollup 有更好的树摇优化、更成熟的代码分割和精确的块控制，以及更丰富的生产转换插件生态。Vite 的理念是在每个场景使用最快的工具：开发时使用 esbuild（速度最重要），生产时使用 Rollup（输出优化最重要）。Vite 团队一直在开发 Rolldown，一个基于 Rust 的 Rollup 替代品，旨在结合 esbuild 的速度和 Rollup 的优化质量。',
  },
};

export default function ViteVsWebpackEsbuildComparison({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p><Link href={`/${lang}/tools/js-html-formatter`} style={{ fontWeight: 600 }}>{t.linkFormatter}</Link></p>

      {/* ========== BUILD TOOL LANDSCAPE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_landscape}</h2>
      <p>{t.landscape_p1}</p>
      <p dangerouslySetInnerHTML={{ __html: t.landscape_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.landscape_p3 }} />

      {/* ========== WEBPACK ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_webpack}</h2>
      <p>{t.webpack_p1}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_webpack_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.webpack_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_webpack_config}</h3>
      <pre><code>{t.webpack_config_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_webpack_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.webpack_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_webpack_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.webpack_cons_list }} />

      {/* ========== VITE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_vite}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.vite_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.vite_p2 }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_vite_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.vite_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_vite_config}</h3>
      <pre><code>{t.vite_config_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_vite_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.vite_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_vite_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.vite_cons_list }} />

      {/* ========== ESBUILD ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_esbuild}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.esbuild_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.esbuild_p2 }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_esbuild_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.esbuild_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_esbuild_config}</h3>
      <pre><code>{t.esbuild_config_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_esbuild_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.esbuild_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_esbuild_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.esbuild_cons_list }} />

      {/* ========== TURBOPACK ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_turbopack}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.turbopack_p1 }} />
      <p>{t.turbopack_p2}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_turbopack_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.turbopack_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_turbopack_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.turbopack_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_turbopack_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.turbopack_cons_list }} />

      {/* ========== DEV SERVER SPEED ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_dev_speed}</h2>
      <p>{t.dev_speed_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_metric}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_webpack_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_vite_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_esbuild_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_turbopack_name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.metric_cold_start}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_cold}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_vite_cold}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_es_cold}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_cold}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.metric_hmr}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_hmr}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_vite_hmr}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_hmr}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_tp_hmr}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.metric_page_load}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_page}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_page}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_page}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_tp_page}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.metric_memory}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_mem}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_mem}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_es_mem}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_mem}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote dangerouslySetInnerHTML={{ __html: t.dev_speed_note }} />

      {/* ========== BUILD SPEED ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_build_speed}</h2>
      <p>{t.build_speed_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_project_size}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_webpack_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_vite_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_esbuild_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_turbopack_name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.size_small}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_small}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_small}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_es_small}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_small}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.size_medium}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_medium}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_medium}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_es_medium}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_medium}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.size_large}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_large}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_large}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_es_large}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_large}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.size_mono}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_mono}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_mono}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_es_mono}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_mono}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote dangerouslySetInnerHTML={{ __html: t.build_speed_note }} />

      {/* ========== CONFIGURATION COMPLEXITY ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_config}</h2>
      <p>{t.config_intro}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_config_webpack}</h3>
      <p>{t.config_webpack_p}</p>
      <pre><code>{t.webpack_deps_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_config_vite}</h3>
      <p>{t.config_vite_p}</p>
      <pre><code>{t.vite_deps_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_config_esbuild}</h3>
      <p>{t.config_esbuild_p}</p>
      <pre><code>{t.esbuild_deps_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_config_turbopack}</h3>
      <p>{t.config_turbopack_p}</p>
      <pre><code>{t.turbopack_deps_code}</code></pre>

      {/* ========== PLUGIN ECOSYSTEM ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_plugins}</h2>
      <p>{t.plugins_intro}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_plugins_webpack}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.plugins_webpack_p }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_plugins_vite}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.plugins_vite_p }} />
      <pre><code>{t.vite_plugin_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_plugins_esbuild}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.plugins_esbuild_p }} />
      <pre><code>{t.esbuild_plugin_code}</code></pre>

      {/* ========== FRAMEWORK SUPPORT ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_frameworks}</h2>
      <p>{t.frameworks_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_framework}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_webpack_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_vite_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_esbuild_name}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_turbopack_name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_react}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_react}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_react}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_react}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_react}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_vue}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_vue}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_vue}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_vue}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_vue}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_svelte}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_svelte}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_svelte}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_svelte}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_svelte}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_nextjs}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_nextjs}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_nextjs}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_nextjs}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_nextjs}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_nuxt}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_nuxt}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_nuxt}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_nuxt}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_nuxt}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_angular}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_angular}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_angular}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_angular}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_angular}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_solid}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_solid}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_solid}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_solid}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_solid}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.fw_astro}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_wp_astro}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_vite_astro}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_es_astro}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_tp_astro}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========== MIGRATION GUIDE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_migration}</h2>
      <p>{t.migration_intro}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_migration_steps}</h3>

      <p dangerouslySetInnerHTML={{ __html: t.migration_step1 }} />
      <pre><code>{t.migration_step1_code}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.migration_step2 }} />
      <pre><code>{t.migration_step2_code}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.migration_step3 }} />
      <p dangerouslySetInnerHTML={{ __html: t.migration_step3_desc }} />
      <pre><code>{t.migration_step3_code}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.migration_step4 }} />
      <pre><code>{t.migration_step4_code}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.migration_step5 }} />
      <p dangerouslySetInnerHTML={{ __html: t.migration_step5_desc }} />
      <pre><code>{t.migration_step5_code}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_migration_gotchas}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.migration_gotchas_list }} />

      {/* ========== DECISION MATRIX ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_decision}</h2>
      <p>{t.decision_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_project_type}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_recommended}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_reason}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_new_spa}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.proj_new_spa_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_new_spa_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_nextjs}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.proj_nextjs_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_nextjs_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_nuxt}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.proj_nuxt_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_nuxt_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_legacy}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_legacy_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_legacy_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_lib}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.proj_lib_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_lib_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_micro}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_micro_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_micro_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_speed}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.proj_speed_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_speed_reason}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.proj_enterprise}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.proj_enterprise_tool}</td>
              <td className="border border-gray-700 px-4 py-2">{t.proj_enterprise_reason}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: t.decision_summary }} />

      <p><Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{t.linkJsonFormatter}</Link></p>

      {/* ========== FAQ ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>
    </article>
  );
}
