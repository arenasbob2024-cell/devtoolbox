'use client';
import React from 'react';
import Link from 'next/link';

const translations = {
  en: {
    title: 'Webpack Complete Guide 2026: Loaders, Plugins, Code Splitting, and Module Federation',
    description: 'Master Webpack 5 with this comprehensive guide covering core configuration, loaders, plugins, code splitting, HMR, production optimization, and Module Federation for micro-frontends.',
    tldr: 'Webpack is a powerful module bundler that builds a dependency graph from your source files and outputs optimized bundles. Key concepts: entry (start point), output (bundle destination), loaders (file transformers), plugins (build lifecycle hooks), and mode (development vs production optimizations).',
  },
  zh: {
    title: 'Webpack 完整指南 2026：Loaders、Plugins、代码分割与模块联邦',
    description: '全面掌握 Webpack 5，涵盖核心配置、loaders、plugins、代码分割、HMR、生产优化和微前端模块联邦。',
    tldr: 'Webpack 是一个强大的模块打包工具，从源文件构建依赖图并输出优化后的 bundle。核心概念：entry（入口）、output（输出）、loaders（文件转换器）、plugins（构建钩子）和 mode（开发与生产优化）。',
  },
};

const faqData = [
  {
    question: 'What is Webpack and how does it differ from task runners like Gulp?',
    answer: 'Webpack is a static module bundler — it builds a complete dependency graph of your application starting from one or more entry points, then packages everything into optimized output bundles. Gulp and Grunt are task runners that execute sequential tasks (minify, compile, copy) but lack the module graph awareness that makes Webpack powerful for code splitting, tree shaking, and lazy loading.',
  },
  {
    question: 'What is the difference between Webpack 4 and Webpack 5?',
    answer: 'Webpack 5 (released 2020) introduced: persistent filesystem caching (dramatically faster incremental builds), Module Federation (runtime code sharing between separate builds), built-in asset modules replacing file-loader/url-loader, improved tree shaking with nested exports, and automatic node.js polyfill removal. Webpack 5 also removed deprecated APIs and enforced stricter module resolution.',
  },
  {
    question: 'How do I enable persistent caching in Webpack 5 to speed up builds?',
    answer: 'Add cache: { type: "filesystem" } to your webpack.config.js. This caches the compilation to disk and can reduce rebuild times by 80-95% on subsequent builds. The cache is stored in node_modules/.cache/webpack by default. Combine with babel-loader cacheDirectory: true for even faster incremental builds.',
  },
  {
    question: 'What is tree shaking in Webpack and how do I enable it?',
    answer: 'Tree shaking eliminates dead code (exports that are never imported) from your bundles. It works automatically when: (1) you use ES modules (import/export, not require/module.exports), (2) mode is set to "production", and (3) the sideEffects field is set in package.json. Mark pure modules with sideEffects: false in their package.json to allow Webpack to safely remove unused exports.',
  },
  {
    question: 'What is the SplitChunksPlugin and how should I configure it?',
    answer: 'SplitChunksPlugin automatically splits shared modules into separate chunks. The default configuration handles most cases. Use chunks: "all" to split async and sync modules, set minSize and maxSize to control chunk sizes, and use cacheGroups to define custom splitting rules. A common pattern is separating vendor (node_modules) code into its own chunk using cacheGroups.vendors.',
  },
  {
    question: 'How does Webpack Module Federation work for micro-frontends?',
    answer: 'Module Federation allows separate Webpack builds to share code at runtime without a shared build step. A host application consumes remote modules exposed by other applications. Configure the ModuleFederationPlugin with name (unique app ID), filename (usually remoteEntry.js), exposes (what this app shares), and remotes (what it consumes). Remote modules are loaded asynchronously via script tags at runtime.',
  },
  {
    question: 'What is the difference between style-loader and MiniCssExtractPlugin?',
    answer: 'style-loader injects CSS into the DOM as <style> tags at runtime — ideal for development because it enables Hot Module Replacement for CSS changes. MiniCssExtractPlugin extracts CSS into separate .css files — required for production because it enables parallel CSS loading, browser caching of CSS separately from JS, and eliminates the flash of unstyled content caused by JS-injected styles.',
  },
  {
    question: 'When should I migrate from Webpack to Vite?',
    answer: 'Consider migrating if: dev server startup takes more than 10 seconds, HMR is slow (>500ms), or the team is spending significant time maintaining webpack config. Stick with Webpack if: you use Module Federation for micro-frontends, have IE11 requirements, depend on Webpack-specific loaders, or have a stable complex config that works well. Vite is the recommended default for new projects in 2026.',
  },
];

export default function WebpackGuide({ lang }: { lang: string }) {
  const s = translations[lang as keyof typeof translations] || translations['en'];

  const codeBlockStyle: React.CSSProperties = {
    background: '#1e1e2e',
    color: '#cdd6f4',
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
    margin: '1rem 0 1.5rem',
    display: 'block',
  };

  const preStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    background: 'transparent',
    border: 'none',
    overflowX: 'auto',
  };

  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '1rem 1.25rem',
    borderRadius: '0 8px 8px 0',
    margin: '1.5rem 0',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    margin: '1.5rem 0',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '1rem 0 1.5rem',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '0.6rem 1rem',
    textAlign: 'left',
    borderBottom: '2px solid #cbd5e1',
    fontWeight: 600,
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.55rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* TL;DR Box */}
      <div style={tldrStyle}>
        <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.4rem' }}>
          TL;DR
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.6' }}>{s.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '0.6rem', fontSize: '1rem' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '1.4rem', lineHeight: '1.8', color: '#374151' }}>
          <li>Webpack 5 builds a <strong>dependency graph</strong> from entry points and outputs optimized bundles</li>
          <li><strong>Loaders</strong> transform individual files (TypeScript, SASS, images) before bundling</li>
          <li><strong>Plugins</strong> hook into the build lifecycle for HTML generation, CSS extraction, and optimization</li>
          <li><strong>Code splitting</strong> via dynamic imports and SplitChunksPlugin reduces initial load time</li>
          <li><strong>Module Federation</strong> enables micro-frontend architectures with runtime code sharing</li>
          <li>Production mode enables <strong>tree shaking</strong>, minification, and contenthash-based caching</li>
          <li>Persistent filesystem caching reduces incremental build times by <strong>80-95%</strong></li>
        </ul>
      </div>

      {/* Section 1: What is Webpack */}
      <div style={sectionStyle}>
        <h2>1. What Is Webpack — The Module Bundler Explained</h2>
        <p>
          Webpack is a <strong>static module bundler</strong> for modern JavaScript applications. When Webpack processes your project, it internally builds a <strong>dependency graph</strong> starting from one or more entry points. It then maps every module your project needs and packages them into one or more <em>bundles</em> — optimized files that can be served by a browser.
        </p>
        <p>
          Unlike task runners (Gulp, Grunt) that execute sequential transformations, Webpack understands the <em>relationships</em> between modules. This graph-awareness unlocks code splitting, tree shaking, lazy loading, and Module Federation — capabilities that are impossible with naive concatenation.
        </p>
        <p>
          The five core concepts every Webpack user must understand are:
        </p>
        <ul>
          <li><strong>Entry</strong> — The starting point of the dependency graph (typically <code>src/index.tsx</code>)</li>
          <li><strong>Output</strong> — Where to emit the bundles and what to name them</li>
          <li><strong>Loaders</strong> — Functions that transform files before they are added to the graph (e.g., TypeScript → JavaScript)</li>
          <li><strong>Plugins</strong> — Extensions that tap into the build lifecycle to perform broader tasks</li>
          <li><strong>Mode</strong> — Either <code>development</code> or <code>production</code>, enabling built-in optimizations</li>
        </ul>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// Conceptual view of the Webpack pipeline:\n' +
'\n' +
'Entry (src/index.tsx)\n' +
'  └─ import React from "react"          → node_modules/react/index.js\n' +
'  └─ import App from "./App"            → src/App.tsx\n' +
'      └─ import styles from "./App.css" → src/App.css\n' +
'      └─ import logo from "./logo.svg"  → src/logo.svg\n' +
'\n' +
'Webpack builds the graph, applies loaders, runs plugins,\n' +
'then emits:\n' +
'  dist/main.a1b2c3.js     (app code + dependencies)\n' +
'  dist/main.a1b2c3.css    (extracted CSS via MiniCssExtractPlugin)\n' +
'  dist/logo.d4e5f6.svg    (hashed asset)\n' +
'  dist/index.html         (generated by HtmlWebpackPlugin)'
          }</code></pre>
        </div>
        <p>
          Webpack originated in 2012 and has been through five major versions. <strong>Webpack 5</strong> (released October 2020) introduced persistent caching, Module Federation, built-in asset modules, and improved tree shaking — all of which remain central to its use in 2026.
        </p>
      </div>

      {/* Section 2: Core Configuration */}
      <div style={sectionStyle}>
        <h2>2. Core Configuration — Entry, Output, Resolve, Mode, and Devtool</h2>
        <p>
          The <code>webpack.config.js</code> file exports a configuration object (or a function returning one). Understanding the top-level keys is essential before adding loaders and plugins.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// webpack.config.js — Core configuration explained\n' +
'const path = require(\'path\');\n' +
'\n' +
'module.exports = {\n' +
'  // ─── MODE ───────────────────────────────────────────────\n' +
'  // "development": enables useful error messages, source maps,\n' +
'  //               disables minification for readable output\n' +
'  // "production": enables minification, tree shaking, scope hoisting\n' +
'  mode: process.env.NODE_ENV === \'production\' ? \'production\' : \'development\',\n' +
'\n' +
'  // ─── ENTRY ───────────────────────────────────────────────\n' +
'  // Single entry: one output chunk\n' +
'  entry: \'./src/index.tsx\',\n' +
'\n' +
'  // Multiple entries: named output chunks\n' +
'  // entry: {\n' +
'  //   main: \'./src/index.tsx\',\n' +
'  //   admin: \'./src/admin/index.tsx\',\n' +
'  // },\n' +
'\n' +
'  // ─── OUTPUT ──────────────────────────────────────────────\n' +
'  output: {\n' +
'    path: path.resolve(__dirname, \'dist\'),\n' +
'    // [contenthash] changes only when file content changes\n' +
'    // Enables long-term browser caching\n' +
'    filename: \'[name].[contenthash:8].js\',\n' +
'    // Clean output directory before each build\n' +
'    clean: true,\n' +
'    // Public path for CDN deployments\n' +
'    publicPath: \'/\',\n' +
'  },\n' +
'\n' +
'  // ─── RESOLVE ─────────────────────────────────────────────\n' +
'  resolve: {\n' +
'    // Try these extensions in order when importing without extension\n' +
'    extensions: [\'.tsx\', \'.ts\', \'.jsx\', \'.js\', \'.json\'],\n' +
'    // Aliases for cleaner imports\n' +
'    alias: {\n' +
'      \'@\': path.resolve(__dirname, \'src\'),\n' +
'      \'@components\': path.resolve(__dirname, \'src/components\'),\n' +
'    },\n' +
'  },\n' +
'\n' +
'  // ─── DEVTOOL ─────────────────────────────────────────────\n' +
'  // Source map strategy — affects build speed and debuggability\n' +
'  // Development: "eval-source-map" (fast rebuilds, full source maps)\n' +
'  // Production: "source-map" (external .map files, full mapping)\n' +
'  //             "hidden-source-map" (for error monitoring, not public)\n' +
'  devtool: process.env.NODE_ENV === \'production\' ? \'source-map\' : \'eval-source-map\',\n' +
'\n' +
'  // ─── CACHE ───────────────────────────────────────────────\n' +
'  // Webpack 5 persistent caching — stores compilation to disk\n' +
'  // Reduces incremental build times by 80-95%\n' +
'  cache: {\n' +
'    type: \'filesystem\',\n' +
'    buildDependencies: {\n' +
'      config: [__filename], // Invalidate cache when config changes\n' +
'    },\n' +
'  },\n' +
'};'
          }</code></pre>
        </div>
        <p>
          The <strong>contenthash</strong> pattern in output filenames is critical for production deployments. When file content does not change, the hash stays the same, so browsers continue to serve the cached file. Only changed files get new hashes, forcing browsers to fetch updated content.
        </p>
        <p>
          The <strong>devtool</strong> option trades build speed for source map quality. In development, use <code>eval-source-map</code> for fast incremental rebuilds with accurate source locations. In production, use <code>source-map</code> to generate separate <code>.map</code> files that can be uploaded to error monitoring services like Sentry without shipping them to end users.
        </p>
      </div>

      {/* Section 3: Loaders */}
      <div style={sectionStyle}>
        <h2>3. Loaders — Transforming Every File Type</h2>
        <p>
          Loaders are the translation layer between your source files and the Webpack module graph. They are functions that receive a file's source content and return transformed JavaScript (or another format Webpack can process). Loaders are configured as rules that match files by regex pattern.
        </p>
        <p>
          <strong>Important:</strong> Loaders in an array are applied <em>right to left</em> (or bottom to top). So <code>['style-loader', 'css-loader', 'postcss-loader']</code> first runs <code>postcss-loader</code>, then <code>css-loader</code>, then <code>style-loader</code>.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// webpack.config.js — module.rules (loaders configuration)\n' +
'module.exports = {\n' +
'  module: {\n' +
'    rules: [\n' +
'\n' +
'      // ─── TYPESCRIPT / JAVASCRIPT ─────────────────────────\n' +
'      {\n' +
'        test: /\\.(tsx?|jsx?)$/,\n' +
'        exclude: /node_modules/,\n' +
'        use: {\n' +
'          loader: \'babel-loader\',\n' +
'          options: {\n' +
'            presets: [\n' +
'              [\'@babel/preset-env\', { targets: \'> 0.5%, not dead\' }],\n' +
'              [\'@babel/preset-react\', { runtime: \'automatic\' }],\n' +
'              \'@babel/preset-typescript\',\n' +
'            ],\n' +
'            // Caches transpilation results to disk for faster rebuilds\n' +
'            cacheDirectory: true,\n' +
'          },\n' +
'        },\n' +
'      },\n' +
'\n' +
'      // Alternative: ts-loader (uses tsc, full type checking)\n' +
'      // {\n' +
'      //   test: /\\.tsx?$/,\n' +
'      //   use: \'ts-loader\',\n' +
'      //   exclude: /node_modules/,\n' +
'      // },\n' +
'\n' +
'      // ─── CSS ─────────────────────────────────────────────\n' +
'      // Development: style-loader injects CSS via <style> tags (enables HMR)\n' +
'      // Production: MiniCssExtractPlugin.loader extracts to .css files\n' +
'      {\n' +
'        test: /\\.css$/,\n' +
'        use: [\n' +
'          isDev ? \'style-loader\' : MiniCssExtractPlugin.loader,\n' +
'          {\n' +
'            loader: \'css-loader\',\n' +
'            options: {\n' +
'              modules: {\n' +
'                // Enable CSS Modules for *.module.css files\n' +
'                auto: /\\.module\\.css$/,\n' +
'                localIdentName: isDev ? \'[local]--[hash:base64:5]\' : \'[hash:base64:8]\',\n' +
'              },\n' +
'              importLoaders: 1, // Number of loaders before css-loader\n' +
'            },\n' +
'          },\n' +
'          \'postcss-loader\', // Handles autoprefixer, tailwind, etc.\n' +
'        ],\n' +
'      },\n' +
'\n' +
'      // ─── SASS / SCSS ──────────────────────────────────────\n' +
'      {\n' +
'        test: /\\.(scss|sass)$/,\n' +
'        use: [\n' +
'          isDev ? \'style-loader\' : MiniCssExtractPlugin.loader,\n' +
'          \'css-loader\',\n' +
'          \'postcss-loader\',\n' +
'          \'sass-loader\', // Compiles Sass to CSS (requires sass package)\n' +
'        ],\n' +
'      },\n' +
'\n' +
'      // ─── IMAGES & FONTS (Webpack 5 Asset Modules) ─────────\n' +
'      // Replaces file-loader and url-loader from Webpack 4\n' +
'      {\n' +
'        test: /\\.(png|jpg|jpeg|gif|webp)$/i,\n' +
'        type: \'asset\',\n' +
'        parser: {\n' +
'          // Inline as base64 if < 8KB, otherwise emit as file\n' +
'          dataUrlCondition: { maxSize: 8 * 1024 },\n' +
'        },\n' +
'        generator: {\n' +
'          filename: \'images/[name].[contenthash:8][ext]\',\n' +
'        },\n' +
'      },\n' +
'      {\n' +
'        test: /\\.svg$/,\n' +
'        // Use \'asset/source\' to inline SVG as raw string\n' +
'        // Or @svgr/webpack to import SVG as React components\n' +
'        use: [\'@svgr/webpack\'],\n' +
'      },\n' +
'      {\n' +
'        test: /\\.(woff2?|eot|ttf|otf)$/,\n' +
'        type: \'asset/resource\',\n' +
'        generator: {\n' +
'          filename: \'fonts/[name].[contenthash:8][ext]\',\n' +
'        },\n' +
'      },\n' +
'\n' +
'    ],\n' +
'  },\n' +
'};'
          }</code></pre>
        </div>
        <p>
          <strong>babel-loader vs ts-loader:</strong> <code>babel-loader</code> strips TypeScript types without performing type-checking, making it significantly faster. Use it with a separate <code>tsc --noEmit</code> in CI for type safety. <code>ts-loader</code> runs the TypeScript compiler and catches type errors during the build but is slower.
        </p>
        <p>
          <strong>Webpack 5 Asset Modules</strong> replace the three old file loaders: <code>file-loader</code> (emit file → <code>asset/resource</code>), <code>url-loader</code> (inline as base64 → <code>asset/inline</code>), and <code>raw-loader</code> (source as string → <code>asset/source</code>). The <code>asset</code> type automatically chooses between inline and file based on a configurable size threshold.
        </p>
      </div>

      {/* Section 4: Plugins */}
      <div style={sectionStyle}>
        <h2>4. Plugins — Extending the Build Lifecycle</h2>
        <p>
          While loaders operate on individual files, <strong>plugins</strong> tap into Webpack's compilation lifecycle to perform tasks that span the entire build. They can generate files, inject environment variables, analyze bundle sizes, or copy static assets.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'const path = require(\'path\');\n' +
'const HtmlWebpackPlugin = require(\'html-webpack-plugin\');\n' +
'const MiniCssExtractPlugin = require(\'mini-css-extract-plugin\');\n' +
'const { DefinePlugin } = require(\'webpack\');\n' +
'const CopyWebpackPlugin = require(\'copy-webpack-plugin\');\n' +
'const { BundleAnalyzerPlugin } = require(\'webpack-bundle-analyzer\');\n' +
'\n' +
'module.exports = {\n' +
'  plugins: [\n' +
'\n' +
'    // ─── HtmlWebpackPlugin ───────────────────────────────────\n' +
'    // Generates dist/index.html with correct <script> and <link> tags\n' +
'    // automatically updated with hashed filenames\n' +
'    new HtmlWebpackPlugin({\n' +
'      template: \'./public/index.html\',   // Base HTML template\n' +
'      favicon: \'./public/favicon.ico\',\n' +
'      minify: {\n' +
'        removeComments: true,\n' +
'        collapseWhitespace: true,\n' +
'        removeAttributeQuotes: true,\n' +
'      },\n' +
'    }),\n' +
'\n' +
'    // ─── MiniCssExtractPlugin ────────────────────────────────\n' +
'    // Extracts CSS into separate files for parallel loading\n' +
'    // Required for production (replaces style-loader)\n' +
'    new MiniCssExtractPlugin({\n' +
'      filename: \'css/[name].[contenthash:8].css\',\n' +
'      chunkFilename: \'css/[name].[contenthash:8].chunk.css\',\n' +
'    }),\n' +
'\n' +
'    // ─── DefinePlugin ────────────────────────────────────────\n' +
'    // Replaces variables at compile time — enables dead code elimination\n' +
'    // Values must be JSON.stringify(\'d strings for string literals\n' +
'    new DefinePlugin({\n' +
'      \'process.env.NODE_ENV\': JSON.stringify(process.env.NODE_ENV),\n' +
'      \'process.env.API_BASE_URL\': JSON.stringify(process.env.API_BASE_URL),\n' +
'      __DEV__: process.env.NODE_ENV !== \'production\',\n' +
'      APP_VERSION: JSON.stringify(require(\'./package.json\').version),\n' +
'    }),\n' +
'\n' +
'    // ─── CopyWebpackPlugin ───────────────────────────────────\n' +
'    // Copies files/directories to output — useful for static assets\n' +
'    // not imported by any module\n' +
'    new CopyWebpackPlugin({\n' +
'      patterns: [\n' +
'        { from: \'public/robots.txt\', to: \'robots.txt\' },\n' +
'        { from: \'public/images\', to: \'images\' },\n' +
'      ],\n' +
'    }),\n' +
'\n' +
'    // ─── BundleAnalyzerPlugin ────────────────────────────────\n' +
'    // Opens an interactive treemap of your bundle contents\n' +
'    // Enable only when analyzing: ANALYZE=true npm run build\n' +
'    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),\n' +
'\n' +
'  ],\n' +
'};'
          }</code></pre>
        </div>
        <p>
          The <code>DefinePlugin</code> is particularly powerful because it performs <em>compile-time string replacement</em>, not runtime variable injection. When you define <code>process.env.NODE_ENV</code> as <code>"production"</code>, Webpack replaces every occurrence of that expression in your code with the literal string. Any code inside <code>if (process.env.NODE_ENV !== 'production') {'{'} ... {'}'}</code> blocks becomes dead code that tree shaking removes.
        </p>
      </div>

      {/* Section 5: Code Splitting */}
      <div style={sectionStyle}>
        <h2>5. Code Splitting — Dynamic Imports, SplitChunksPlugin, and Bundle Analysis</h2>
        <p>
          Code splitting is one of Webpack's most impactful optimization features. Instead of shipping one massive bundle, you split your code into smaller chunks that load on demand. This reduces <strong>Time to Interactive (TTI)</strong> by only loading what the current page actually needs.
        </p>
        <p>There are three approaches to code splitting in Webpack:</p>
        <ul>
          <li><strong>Multiple entry points</strong> — manually define multiple bundles (limited and error-prone)</li>
          <li><strong>Dynamic imports</strong> — use <code>import()</code> to tell Webpack where to split</li>
          <li><strong>SplitChunksPlugin</strong> — automatically extract shared modules into separate chunks</li>
        </ul>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// Dynamic imports — the primary code splitting mechanism\n' +
'\n' +
'// React lazy loading (most common pattern)\n' +
'import React, { lazy, Suspense } from \'react\';\n' +
'\n' +
'const Dashboard = lazy(() => import(\'./pages/Dashboard\'));\n' +
'const Analytics = lazy(() =>\n' +
'  // Webpack magic comment: set the chunk name\n' +
'  import(/* webpackChunkName: "analytics" */ \'./pages/Analytics\')\n' +
');\n' +
'const Settings = lazy(() =>\n' +
'  import(\n' +
'    /* webpackChunkName: "settings" */\n' +
'    /* webpackPrefetch: true */  // Hint browser to prefetch after idle\n' +
'    \'./pages/Settings\'\n' +
'  )\n' +
');\n' +
'\n' +
'function App() {\n' +
'  return (\n' +
'    <Suspense fallback={<div>Loading...</div>}>\n' +
'      <Routes>\n' +
'        <Route path="/dashboard" element={<Dashboard />} />\n' +
'        <Route path="/analytics" element={<Analytics />} />\n' +
'        <Route path="/settings" element={<Settings />} />\n' +
'      </Routes>\n' +
'    </Suspense>\n' +
'  );\n' +
'}'
          }</code></pre>
        </div>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// webpack.config.js — SplitChunksPlugin configuration\n' +
'module.exports = {\n' +
'  optimization: {\n' +
'    splitChunks: {\n' +
'      // Split both async (dynamic imports) and sync chunks\n' +
'      chunks: \'all\',\n' +
'\n' +
'      // Minimum size (bytes) before a chunk is generated\n' +
'      minSize: 20_000,   // 20 KB\n' +
'\n' +
'      // Maximum size (bytes) — Webpack tries to split larger chunks\n' +
'      maxSize: 244_000,  // ~244 KB (HTTP/2 sweet spot)\n' +
'\n' +
'      // Minimum number of chunks that must share a module before splitting\n' +
'      minChunks: 1,\n' +
'\n' +
'      cacheGroups: {\n' +
'        // Separate vendor libraries (node_modules) into their own chunk\n' +
'        // Vendors rarely change so the browser caches them long-term\n' +
'        defaultVendors: {\n' +
'          test: /[\\\\/]node_modules[\\\\/]/,\n' +
'          name: \'vendors\',\n' +
'          priority: 20,\n' +
'          reuseExistingChunk: true,\n' +
'        },\n' +
'        // Split React core into its own tiny chunk\n' +
'        react: {\n' +
'          test: /[\\\\/]node_modules[\\\\/](react|react-dom)[\\\\/]/,\n' +
'          name: \'react-vendor\',\n' +
'          priority: 30, // Higher priority wins\n' +
'        },\n' +
'        // Split shared internal utilities used in 2+ chunks\n' +
'        common: {\n' +
'          name: \'common\',\n' +
'          minChunks: 2,\n' +
'          priority: 10,\n' +
'          reuseExistingChunk: true,\n' +
'        },\n' +
'      },\n' +
'    },\n' +
'    // Generate a separate runtime chunk for better long-term caching\n' +
'    runtimeChunk: \'single\',\n' +
'  },\n' +
'};'
          }</code></pre>
        </div>
        <p>
          <strong>Bundle analysis</strong> is essential for understanding what ends up in your output. Run <code>ANALYZE=true npm run build</code> with <code>webpack-bundle-analyzer</code> configured to open an interactive treemap. Look for: large node_modules that should be lazily loaded, duplicate copies of the same library at different versions, and modules imported in many places that could be extracted.
        </p>
      </div>

      {/* Section 6: Dev Server and HMR */}
      <div style={sectionStyle}>
        <h2>6. Dev Server and Hot Module Replacement (HMR)</h2>
        <p>
          <code>webpack-dev-server</code> provides a local HTTP server with automatic reloading during development. <strong>Hot Module Replacement (HMR)</strong> goes further — it replaces updated modules in a running application <em>without a full page reload</em>, preserving application state.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// webpack.config.js — devServer configuration\n' +
'module.exports = {\n' +
'  devServer: {\n' +
'    // Serve from dist output directory\n' +
'    static: {\n' +
'      directory: path.join(__dirname, \'public\'),\n' +
'    },\n' +
'\n' +
'    // Enable Hot Module Replacement\n' +
'    hot: true,\n' +
'\n' +
'    // Enable history API fallback for SPAs (React Router)\n' +
'    historyApiFallback: true,\n' +
'\n' +
'    port: 3000,\n' +
'    open: true, // Open browser on start\n' +
'\n' +
'    // Proxy API requests to backend server\n' +
'    // Avoids CORS issues during development\n' +
'    proxy: [\n' +
'      {\n' +
'        context: [\'/api\'],\n' +
'        target: \'http://localhost:8080\',\n' +
'        changeOrigin: true,\n' +
'        // Rewrite paths: /api/users → /users\n' +
'        pathRewrite: { \'^/api\': \'\' },\n' +
'      },\n' +
'    ],\n' +
'\n' +
'    // Compress responses with gzip\n' +
'    compress: true,\n' +
'\n' +
'    // Show full-screen overlay for errors\n' +
'    client: {\n' +
'      overlay: {\n' +
'        errors: true,\n' +
'        warnings: false,\n' +
'      },\n' +
'      progress: true,\n' +
'    },\n' +
'\n' +
'    // Custom headers (useful for SharedArrayBuffer / COOP / COEP)\n' +
'    headers: {\n' +
'      \'Cross-Origin-Opener-Policy\': \'same-origin\',\n' +
'      \'Cross-Origin-Embedder-Policy\': \'require-corp\',\n' +
'    },\n' +
'  },\n' +
'};'
          }</code></pre>
        </div>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// HMR setup for React — using react-refresh\n' +
'// Install: npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh\n' +
'\n' +
'const ReactRefreshWebpackPlugin = require(\'@pmmmwh/react-refresh-webpack-plugin\');\n' +
'\n' +
'module.exports = {\n' +
'  // In dev mode only:\n' +
'  plugins: [\n' +
'    isDev && new ReactRefreshWebpackPlugin(),\n' +
'  ].filter(Boolean),\n' +
'\n' +
'  module: {\n' +
'    rules: [\n' +
'      {\n' +
'        test: /\\.(tsx?|jsx?)$/,\n' +
'        exclude: /node_modules/,\n' +
'        use: {\n' +
'          loader: \'babel-loader\',\n' +
'          options: {\n' +
'            plugins: [\n' +
'              // Only add react-refresh/babel in development\n' +
'              isDev && require.resolve(\'react-refresh/babel\'),\n' +
'            ].filter(Boolean),\n' +
'          },\n' +
'        },\n' +
'      },\n' +
'    ],\n' +
'  },\n' +
'};\n' +
'\n' +
'// Manual HMR acceptance (for non-React modules)\n' +
'// In your module:\n' +
'if (module.hot) {\n' +
'  module.hot.accept(\'./state\', () => {\n' +
'    // Re-import and apply updated module\n' +
'    const nextState = require(\'./state\').default;\n' +
'    applyState(nextState);\n' +
'  });\n' +
'}'
          }</code></pre>
        </div>
        <p>
          <strong>HMR vs live reload:</strong> Live reload refreshes the entire browser page when any file changes. HMR surgically replaces only the changed module and its dependents, preserving React component state, form data, scroll positions, and other runtime state. This dramatically improves the feedback loop during development.
        </p>
      </div>

      {/* Section 7: Production Optimization */}
      <div style={sectionStyle}>
        <h2>7. Production Optimization — Tree Shaking, Minification, Terser, and Caching</h2>
        <p>
          When <code>mode</code> is set to <code>"production"</code>, Webpack enables many optimizations automatically. But there are additional configurations that can reduce bundle size by an additional 20-40% on top of defaults.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// webpack.config.js — Full production optimization config\n' +
'const TerserPlugin = require(\'terser-webpack-plugin\');\n' +
'const CssMinimizerPlugin = require(\'css-minimizer-webpack-plugin\');\n' +
'\n' +
'module.exports = {\n' +
'  mode: \'production\',\n' +
'\n' +
'  optimization: {\n' +
'    // ─── MINIFICATION ──────────────────────────────────────\n' +
'    minimize: true,\n' +
'    minimizer: [\n' +
'      // TerserPlugin: minifies JS\n' +
'      new TerserPlugin({\n' +
'        parallel: true,  // Use multi-process parallel running\n' +
'        terserOptions: {\n' +
'          compress: {\n' +
'            drop_console: true,   // Remove console.log in production\n' +
'            drop_debugger: true,  // Remove debugger statements\n' +
'            pure_funcs: [\'console.log\', \'console.info\'],\n' +
'          },\n' +
'          format: {\n' +
'            comments: false,      // Remove all comments\n' +
'          },\n' +
'        },\n' +
'        extractComments: false,   // Don\'t emit license.txt files\n' +
'      }),\n' +
'      // CssMinimizerPlugin: minifies extracted CSS\n' +
'      new CssMinimizerPlugin(),\n' +
'    ],\n' +
'\n' +
'    // ─── TREE SHAKING ─────────────────────────────────────\n' +
'    // usedExports: Mark unused exports (requires ES modules)\n' +
'    usedExports: true,\n' +
'    // sideEffects: Respect package.json sideEffects field\n' +
'    sideEffects: true,\n' +
'\n' +
'    // ─── SCOPE HOISTING ────────────────────────────────────\n' +
'    // ModuleConcatenationPlugin: merge ES modules into single scope\n' +
'    // Reduces bundle size and improves runtime performance\n' +
'    // Enabled automatically in production mode\n' +
'    concatenateModules: true,\n' +
'\n' +
'    // ─── CHUNK NAMING ──────────────────────────────────────\n' +
'    // Use deterministic IDs instead of auto-incrementing numbers\n' +
'    // Ensures chunk IDs don\'t change when unrelated modules are added\n' +
'    moduleIds: \'deterministic\',\n' +
'    chunkIds: \'deterministic\',\n' +
'\n' +
'    // ─── SPLIT CHUNKS ─────────────────────────────────────\n' +
'    splitChunks: {\n' +
'      chunks: \'all\',\n' +
'      cacheGroups: {\n' +
'        vendor: {\n' +
'          test: /[\\\\/]node_modules[\\\\/]/,\n' +
'          name: \'vendors\',\n' +
'          chunks: \'all\',\n' +
'        },\n' +
'      },\n' +
'    },\n' +
'    runtimeChunk: \'single\',\n' +
'  },\n' +
'};'
          }</code></pre>
        </div>
        <p>
          <strong>Tree shaking requirements:</strong> For tree shaking to work, three conditions must be met: (1) your code must use ES module syntax (<code>import</code>/<code>export</code>, not <code>require</code>), (2) the library you import from must also use ES modules (check its <code>package.json</code> for a <code>module</code> field), and (3) the module must declare <code>sideEffects: false</code> in its <code>package.json</code>.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// package.json — sideEffects configuration for your library\n' +
'{\n' +
'  "name": "my-ui-library",\n' +
'  // Tell Webpack/bundlers that no modules have side effects\n' +
'  // This enables aggressive tree shaking\n' +
'  "sideEffects": false,\n' +
'\n' +
'  // Exception: CSS files always have side effects\n' +
'  // "sideEffects": ["*.css", "*.scss"],\n' +
'\n' +
'  "main": "dist/index.cjs.js",    // CommonJS\n' +
'  "module": "dist/index.esm.js",  // ES Modules (preferred for bundlers)\n' +
'  "exports": {\n' +
'    "import": "./dist/index.esm.js",\n' +
'    "require": "./dist/index.cjs.js"\n' +
'  }\n' +
'}'
          }</code></pre>
        </div>
      </div>

      {/* Section 8: Module Federation */}
      <div style={sectionStyle}>
        <h2>8. Webpack 5 Module Federation — Micro-Frontends at Scale</h2>
        <p>
          <strong>Module Federation</strong> is the flagship feature of Webpack 5. It allows multiple separately compiled and deployed Webpack applications to share code at runtime — no shared build step, no monorepo required. This is the architecture powering large-scale micro-frontend systems at companies like Zalando, IKEA, and many others.
        </p>
        <p>
          The model has two roles: a <strong>host</strong> application that consumes remote modules, and <strong>remote</strong> applications that expose modules. A single application can be both a host and a remote simultaneously.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// Remote Application — webpack.config.js\n' +
'// This app EXPOSES components for other apps to consume\n' +
'\n' +
'const { ModuleFederationPlugin } = require("webpack").container;\n' +
'\n' +
'module.exports = {\n' +
'  plugins: [\n' +
'    new ModuleFederationPlugin({\n' +
'      // Unique name for this federated module\n' +
'      name: "productApp",\n' +
'\n' +
'      // The entry point file that other apps will load\n' +
'      // Accessible at: https://products.example.com/remoteEntry.js\n' +
'      filename: "remoteEntry.js",\n' +
'\n' +
'      // What this app exposes to others\n' +
'      exposes: {\n' +
'        "./ProductList": "./src/components/ProductList",\n' +
'        "./ProductCard": "./src/components/ProductCard",\n' +
'        "./useCart": "./src/hooks/useCart",\n' +
'      },\n' +
'\n' +
'      // Shared dependencies — prevents duplicate instances\n' +
'      // Both apps will share a single React instance\n' +
'      shared: {\n' +
'        react: { singleton: true, requiredVersion: "^18.0.0" },\n' +
'        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },\n' +
'      },\n' +
'    }),\n' +
'  ],\n' +
'};'
          }</code></pre>
        </div>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// Host Application — webpack.config.js\n' +
'// This app CONSUMES components from remote apps\n' +
'\n' +
'const { ModuleFederationPlugin } = require("webpack").container;\n' +
'\n' +
'module.exports = {\n' +
'  plugins: [\n' +
'    new ModuleFederationPlugin({\n' +
'      name: "shell",\n' +
'\n' +
'      // Register remote applications\n' +
'      remotes: {\n' +
'        // Format: "name@url/remoteEntry.js"\n' +
'        productApp: "productApp@https://products.example.com/remoteEntry.js",\n' +
'        cartApp: "cartApp@https://cart.example.com/remoteEntry.js",\n' +
'      },\n' +
'\n' +
'      shared: {\n' +
'        react: { singleton: true, requiredVersion: "^18.0.0" },\n' +
'        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },\n' +
'      },\n' +
'    }),\n' +
'  ],\n' +
'};\n' +
'\n' +
'// ─── Consuming remote modules in your React code ───────────────\n' +
'// src/App.tsx (in the host application)\n' +
'\n' +
'import React, { lazy, Suspense } from "react";\n' +
'\n' +
'// Remote components load asynchronously via the remoteEntry.js script\n' +
'const ProductList = lazy(() => import("productApp/ProductList"));\n' +
'const CartWidget = lazy(() => import("cartApp/CartWidget"));\n' +
'\n' +
'function App() {\n' +
'  return (\n' +
'    <div>\n' +
'      <Suspense fallback={<div>Loading products...</div>}>\n' +
'        <ProductList />\n' +
'      </Suspense>\n' +
'      <Suspense fallback={<div>Loading cart...</div>}>\n' +
'        <CartWidget />\n' +
'      </Suspense>\n' +
'    </div>\n' +
'  );\n' +
'}'
          }</code></pre>
        </div>
        <p>
          The <code>shared</code> configuration is critical. Without it, each federated app would load its own copy of React, leading to multiple React instances that break hooks and context. The <code>singleton: true</code> option ensures all federated modules share a single instance. The <code>requiredVersion</code> field triggers a runtime warning if version requirements are not met.
        </p>
        <p>
          <strong>Bootstrap pattern:</strong> Module Federation requires that the entry point be asynchronous. Wrap your application bootstrap in a dynamic import:
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// src/index.tsx (host or remote)\n' +
'// Without this async bootstrap, Module Federation fails with:\n' +
'// "Shared module is not available for eager consumption"\n' +
'\n' +
'import(/* webpackChunkName: "bootstrap" */ "./bootstrap");\n' +
'\n' +
'// src/bootstrap.tsx\n' +
'import React from "react";\n' +
'import ReactDOM from "react-dom/client";\n' +
'import App from "./App";\n' +
'\n' +
'const root = ReactDOM.createRoot(document.getElementById("root")!);\n' +
'root.render(<App />);'
          }</code></pre>
        </div>
      </div>

      {/* Section 9: Comparison Table */}
      <div style={sectionStyle}>
        <h2>9. Webpack vs Vite vs esbuild vs Rollup vs Parcel — Comparison Table</h2>
        <p>
          Choosing the right bundler depends on your project's requirements. Here is a comprehensive comparison of the five major bundlers in 2026:
        </p>
        <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Feature / Tool</th>
                <th style={thStyle}>Webpack 5</th>
                <th style={thStyle}>Vite 6</th>
                <th style={thStyle}>esbuild</th>
                <th style={thStyle}>Rollup 4</th>
                <th style={thStyle}>Parcel 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}><strong>Primary use case</strong></td>
                <td style={tdStyle}>Large apps, micro-frontends</td>
                <td style={tdStyle}>Modern SPAs, full-stack apps</td>
                <td style={tdStyle}>Ultra-fast builds, tooling</td>
                <td style={tdStyle}>Libraries, ESM bundles</td>
                <td style={tdStyle}>Zero-config apps</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Dev server cold start</strong></td>
                <td style={tdStyle}>8–18s</td>
                <td style={tdStyle}>200–600ms</td>
                <td style={tdStyle}>~50ms</td>
                <td style={tdStyle}>N/A (no dev server)</td>
                <td style={tdStyle}>2–5s</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>HMR speed</strong></td>
                <td style={tdStyle}>200–800ms</td>
                <td style={tdStyle}>10–50ms</td>
                <td style={tdStyle}>~50ms</td>
                <td style={tdStyle}>N/A</td>
                <td style={tdStyle}>50–200ms</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Production bundler</strong></td>
                <td style={tdStyle}>Webpack (JS)</td>
                <td style={tdStyle}>Rollup / Rolldown</td>
                <td style={tdStyle}>esbuild (Go)</td>
                <td style={tdStyle}>Rollup (JS)</td>
                <td style={tdStyle}>SWC (Rust)</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Code splitting</strong></td>
                <td style={tdStyle}>Excellent</td>
                <td style={tdStyle}>Excellent</td>
                <td style={tdStyle}>Basic</td>
                <td style={tdStyle}>Good</td>
                <td style={tdStyle}>Good</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Tree shaking</strong></td>
                <td style={tdStyle}>Excellent</td>
                <td style={tdStyle}>Excellent</td>
                <td style={tdStyle}>Good</td>
                <td style={tdStyle}>Excellent</td>
                <td style={tdStyle}>Good</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Module Federation</strong></td>
                <td style={tdStyle}>Native</td>
                <td style={tdStyle}>Plugin only</td>
                <td style={tdStyle}>No</td>
                <td style={tdStyle}>No</td>
                <td style={tdStyle}>No</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>TypeScript support</strong></td>
                <td style={tdStyle}>Via ts-loader / babel</td>
                <td style={tdStyle}>Built-in (esbuild)</td>
                <td style={tdStyle}>Built-in</td>
                <td style={tdStyle}>Plugin</td>
                <td style={tdStyle}>Built-in</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>CSS Modules</strong></td>
                <td style={tdStyle}>Via css-loader</td>
                <td style={tdStyle}>Built-in</td>
                <td style={tdStyle}>Basic</td>
                <td style={tdStyle}>Plugin</td>
                <td style={tdStyle}>Built-in</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>SSR support</strong></td>
                <td style={tdStyle}>Manual</td>
                <td style={tdStyle}>First-class</td>
                <td style={tdStyle}>Manual</td>
                <td style={tdStyle}>Manual</td>
                <td style={tdStyle}>Experimental</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Legacy browser support</strong></td>
                <td style={tdStyle}>babel-loader</td>
                <td style={tdStyle}>@vitejs/legacy plugin</td>
                <td style={tdStyle}>Limited</td>
                <td style={tdStyle}>Plugin</td>
                <td style={tdStyle}>Built-in</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Configuration complexity</strong></td>
                <td style={tdStyle}>High (80–300 lines)</td>
                <td style={tdStyle}>Low (10–30 lines)</td>
                <td style={tdStyle}>Low (JS API)</td>
                <td style={tdStyle}>Medium</td>
                <td style={tdStyle}>None (zero-config)</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Plugin ecosystem</strong></td>
                <td style={tdStyle}>Thousands</td>
                <td style={tdStyle}>Growing (500+)</td>
                <td style={tdStyle}>Limited</td>
                <td style={tdStyle}>Hundreds</td>
                <td style={tdStyle}>Moderate</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Best for</strong></td>
                <td style={tdStyle}>Enterprise, micro-frontends</td>
                <td style={tdStyle}>New projects 2026</td>
                <td style={tdStyle}>Build tools, CLIs</td>
                <td style={tdStyle}>Library authors</td>
                <td style={tdStyle}>Prototypes, beginners</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>When to choose Webpack in 2026:</strong> If you need Module Federation for micro-frontends, are maintaining a large existing Webpack codebase, need IE11 support, or depend on specific Webpack-only loaders. For new applications without these requirements, Vite is the recommended default.
        </p>
        <p>
          <strong>When to choose Rollup:</strong> If you are building a JavaScript library or component library intended for publishing on npm. Rollup produces the cleanest ESM output with minimal boilerplate, ideal for tree-shaking-friendly packages.
        </p>
        <p>
          <strong>When to choose esbuild:</strong> If you are building internal tooling, scripts, or a CLI tool where build speed is the top priority and plugin ecosystem depth is less important.
        </p>
      </div>

      {/* Section 10: Complete Production Config */}
      <div style={sectionStyle}>
        <h2>10. Complete Production-Ready Webpack 5 Configuration</h2>
        <p>
          Here is a battle-tested, production-ready webpack configuration that incorporates all the best practices covered in this guide. It handles TypeScript, React, CSS Modules, SASS, image optimization, code splitting, and environment-based configuration.
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'// webpack.config.js — Production-ready configuration\n' +
'const path = require(\'path\');\n' +
'const HtmlWebpackPlugin = require(\'html-webpack-plugin\');\n' +
'const MiniCssExtractPlugin = require(\'mini-css-extract-plugin\');\n' +
'const CssMinimizerPlugin = require(\'css-minimizer-webpack-plugin\');\n' +
'const TerserPlugin = require(\'terser-webpack-plugin\');\n' +
'const { DefinePlugin } = require(\'webpack\');\n' +
'const CopyWebpackPlugin = require(\'copy-webpack-plugin\');\n' +
'const ReactRefreshWebpackPlugin = require(\'@pmmmwh/react-refresh-webpack-plugin\');\n' +
'\n' +
'const isDev = process.env.NODE_ENV !== \'production\';\n' +
'\n' +
'module.exports = {\n' +
'  mode: isDev ? \'development\' : \'production\',\n' +
'\n' +
'  entry: \'./src/index.tsx\',\n' +
'\n' +
'  output: {\n' +
'    path: path.resolve(__dirname, \'dist\'),\n' +
'    filename: isDev ? \'js/[name].js\' : \'js/[name].[contenthash:8].js\',\n' +
'    chunkFilename: isDev ? \'js/[name].chunk.js\' : \'js/[name].[contenthash:8].chunk.js\',\n' +
'    assetModuleFilename: \'assets/[name].[contenthash:8][ext]\',\n' +
'    publicPath: \'/\',\n' +
'    clean: true,\n' +
'  },\n' +
'\n' +
'  resolve: {\n' +
'    extensions: [\'.tsx\', \'.ts\', \'.jsx\', \'.js\', \'.json\'],\n' +
'    alias: { \'@\': path.resolve(__dirname, \'src\') },\n' +
'  },\n' +
'\n' +
'  devtool: isDev ? \'eval-source-map\' : \'source-map\',\n' +
'\n' +
'  cache: {\n' +
'    type: \'filesystem\',\n' +
'    buildDependencies: { config: [__filename] },\n' +
'  },\n' +
'\n' +
'  module: {\n' +
'    rules: [\n' +
'      {\n' +
'        test: /\\.(tsx?|jsx?)$/,\n' +
'        exclude: /node_modules/,\n' +
'        use: {\n' +
'          loader: \'babel-loader\',\n' +
'          options: {\n' +
'            presets: [\n' +
'              [\'@babel/preset-env\', { targets: \'> 0.5%, not dead\' }],\n' +
'              [\'@babel/preset-react\', { runtime: \'automatic\' }],\n' +
'              \'@babel/preset-typescript\',\n' +
'            ],\n' +
'            plugins: [isDev && \'react-refresh/babel\'].filter(Boolean),\n' +
'            cacheDirectory: true,\n' +
'          },\n' +
'        },\n' +
'      },\n' +
'      {\n' +
'        test: /\\.css$/,\n' +
'        use: [\n' +
'          isDev ? \'style-loader\' : MiniCssExtractPlugin.loader,\n' +
'          { loader: \'css-loader\', options: { modules: { auto: true } } },\n' +
'          \'postcss-loader\',\n' +
'        ],\n' +
'      },\n' +
'      {\n' +
'        test: /\\.(scss|sass)$/,\n' +
'        use: [\n' +
'          isDev ? \'style-loader\' : MiniCssExtractPlugin.loader,\n' +
'          \'css-loader\', \'postcss-loader\', \'sass-loader\',\n' +
'        ],\n' +
'      },\n' +
'      {\n' +
'        test: /\\.(png|jpg|jpeg|gif|webp)$/i,\n' +
'        type: \'asset\',\n' +
'        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },\n' +
'      },\n' +
'      { test: /\\.svg$/, use: [\'@svgr/webpack\'] },\n' +
'      { test: /\\.(woff2?|eot|ttf|otf)$/, type: \'asset/resource\' },\n' +
'    ],\n' +
'  },\n' +
'\n' +
'  plugins: [\n' +
'    new HtmlWebpackPlugin({ template: \'./public/index.html\', favicon: \'./public/favicon.ico\' }),\n' +
'    !isDev && new MiniCssExtractPlugin({ filename: \'css/[name].[contenthash:8].css\' }),\n' +
'    new DefinePlugin({\n' +
'      \'process.env.NODE_ENV\': JSON.stringify(process.env.NODE_ENV),\n' +
'      \'process.env.API_URL\': JSON.stringify(process.env.API_URL || \'/api\'),\n' +
'    }),\n' +
'    new CopyWebpackPlugin({ patterns: [{ from: \'public/robots.txt\' }] }),\n' +
'    isDev && new ReactRefreshWebpackPlugin(),\n' +
'  ].filter(Boolean),\n' +
'\n' +
'  optimization: {\n' +
'    minimize: !isDev,\n' +
'    minimizer: [\n' +
'      new TerserPlugin({ terserOptions: { compress: { drop_console: true } } }),\n' +
'      new CssMinimizerPlugin(),\n' +
'    ],\n' +
'    splitChunks: {\n' +
'      chunks: \'all\',\n' +
'      cacheGroups: {\n' +
'        vendor: { test: /[\\\\/]node_modules[\\\\/]/, name: \'vendors\', priority: 20 },\n' +
'        react: {\n' +
'          test: /[\\\\/]node_modules[\\\\/](react|react-dom|react-router)[\\\\/]/,\n' +
'          name: \'react-vendor\',\n' +
'          priority: 30,\n' +
'        },\n' +
'      },\n' +
'    },\n' +
'    runtimeChunk: \'single\',\n' +
'    moduleIds: \'deterministic\',\n' +
'  },\n' +
'\n' +
'  devServer: {\n' +
'    port: 3000,\n' +
'    hot: true,\n' +
'    historyApiFallback: true,\n' +
'    proxy: [{ context: [\'/api\'], target: \'http://localhost:8080\', changeOrigin: true }],\n' +
'  },\n' +
'};'
          }</code></pre>
        </div>
        <p>
          Install all required dependencies with this single command:
        </p>
        <div style={codeBlockStyle}>
          <pre style={preStyle}><code>{
'npm install --save-dev \\\n' +
'  webpack webpack-cli webpack-dev-server \\\n' +
'  babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript \\\n' +
'  css-loader style-loader postcss-loader postcss autoprefixer \\\n' +
'  sass sass-loader \\\n' +
'  mini-css-extract-plugin css-minimizer-webpack-plugin \\\n' +
'  html-webpack-plugin copy-webpack-plugin \\\n' +
'  terser-webpack-plugin \\\n' +
'  @svgr/webpack \\\n' +
'  @pmmmwh/react-refresh-webpack-plugin react-refresh \\\n' +
'  webpack-bundle-analyzer'
          }</code></pre>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={sectionStyle}>
        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{faq.question}</h3>
            <p style={{ margin: 0, color: '#374151', lineHeight: '1.7' }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Related Tools */}
      <div style={sectionStyle}>
        <h2>Related Tools and Resources</h2>
        <ul>
          <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> — Format webpack.config.js and package.json</li>
          <li><Link href={`/${lang}/tools/js-html-formatter`}>JS/HTML Formatter</Link> — Beautify bundled output for debugging</li>
          <li><Link href={`/${lang}/tools/regex-tester`}>Regex Tester</Link> — Test file matching patterns for loader rules</li>
          <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML Converter</Link> — Convert between config formats</li>
          <li><Link href={`/${lang}/blog/webpack-vs-vite-2026`}>Webpack vs Vite 2026: Full Performance Comparison</Link></li>
          <li><Link href={`/${lang}/blog/vite-vs-webpack-esbuild-comparison`}>Vite vs Webpack vs esbuild — Detailed Benchmark</Link></li>
          <li><Link href={`/${lang}/blog/typescript-vs-javascript`}>TypeScript vs JavaScript — Which Should You Use?</Link></li>
        </ul>
      </div>
    </>
  );
}
