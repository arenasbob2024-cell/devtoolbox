'use client';
import React from 'react';

const codeInstall = '# Install Rollup globally\n'
  + 'npm install -g rollup\n'
  + '\n'
  + '# Or as a dev dependency (recommended)\n'
  + 'npm install --save-dev rollup\n'
  + '\n'
  + '# Verify installation\n'
  + 'npx rollup --version\n'
  + '\n'
  + '# Bundle a file (CLI)\n'
  + 'npx rollup src/index.js --file dist/bundle.js --format esm\n'
  + '\n'
  + '# Bundle with a config file\n'
  + 'npx rollup --config rollup.config.mjs\n'
  + '\n'
  + '# Watch mode\n'
  + 'npx rollup --config --watch';

const codeBasicConfig = '// rollup.config.mjs\n'
  + 'export default {\n'
  + '  input: \'src/index.js\',\n'
  + '  output: {\n'
  + '    file: \'dist/bundle.js\',\n'
  + '    format: \'esm\',\n'
  + '    sourcemap: true,\n'
  + '  },\n'
  + '};\n'
  + '\n'
  + '// Multiple outputs (library authors)\n'
  + 'export default {\n'
  + '  input: \'src/index.js\',\n'
  + '  output: [\n'
  + '    {\n'
  + '      file: \'dist/my-lib.esm.js\',\n'
  + '      format: \'esm\',\n'
  + '      sourcemap: true,\n'
  + '    },\n'
  + '    {\n'
  + '      file: \'dist/my-lib.cjs.js\',\n'
  + '      format: \'cjs\',\n'
  + '      sourcemap: true,\n'
  + '    },\n'
  + '    {\n'
  + '      file: \'dist/my-lib.umd.js\',\n'
  + '      format: \'umd\',\n'
  + '      name: \'MyLib\',\n'
  + '      sourcemap: true,\n'
  + '    },\n'
  + '  ],\n'
  + '};';

const codePlugins = '// rollup.config.mjs with essential plugins\n'
  + 'import resolve from \'@rollup/plugin-node-resolve\';\n'
  + 'import commonjs from \'@rollup/plugin-commonjs\';\n'
  + 'import terser from \'@rollup/plugin-terser\';\n'
  + 'import babel from \'@rollup/plugin-babel\';\n'
  + 'import typescript from \'@rollup/plugin-typescript\';\n'
  + 'import json from \'@rollup/plugin-json\';\n'
  + '\n'
  + 'export default {\n'
  + '  input: \'src/index.ts\',\n'
  + '  output: {\n'
  + '    file: \'dist/bundle.js\',\n'
  + '    format: \'esm\',\n'
  + '    sourcemap: true,\n'
  + '  },\n'
  + '  plugins: [\n'
  + '    // Resolve node_modules imports\n'
  + '    resolve({\n'
  + '      browser: true,\n'
  + '      preferBuiltins: false,\n'
  + '    }),\n'
  + '\n'
  + '    // Convert CommonJS modules to ESM\n'
  + '    commonjs(),\n'
  + '\n'
  + '    // Compile TypeScript\n'
  + '    typescript({\n'
  + '      tsconfig: \'./tsconfig.json\',\n'
  + '    }),\n'
  + '\n'
  + '    // Transpile with Babel\n'
  + '    babel({\n'
  + '      babelHelpers: \'bundled\',\n'
  + '      presets: [[\'@babel/preset-env\', {\n'
  + '        targets: \'>0.25%, not dead\',\n'
  + '      }]],\n'
  + '      exclude: \'node_modules/**\',\n'
  + '    }),\n'
  + '\n'
  + '    // Import JSON files\n'
  + '    json(),\n'
  + '\n'
  + '    // Minify for production\n'
  + '    terser({\n'
  + '      compress: { drop_console: true },\n'
  + '    }),\n'
  + '  ],\n'
  + '};';

const codeTreeShaking = '// math.js - only used functions are included\n'
  + 'export function add(a, b) {\n'
  + '  return a + b;\n'
  + '}\n'
  + '\n'
  + 'export function subtract(a, b) {\n'
  + '  return a - b;\n'
  + '}\n'
  + '\n'
  + 'export function multiply(a, b) {\n'
  + '  return a * b;\n'
  + '}\n'
  + '\n'
  + '// index.js - only imports add\n'
  + 'import { add } from \'./math.js\';\n'
  + 'console.log(add(2, 3));\n'
  + '\n'
  + '// Rollup output: subtract and multiply are removed!\n'
  + '// This is tree-shaking in action.\n'
  + '\n'
  + '// Mark side-effect-free modules in package.json:\n'
  + '// {\n'
  + '//   "sideEffects": false\n'
  + '// }\n'
  + '//\n'
  + '// Or specify files with side effects:\n'
  + '// {\n'
  + '//   "sideEffects": ["./src/polyfills.js", "*.css"]\n'
  + '// }';

const codeCodeSplitting = '// rollup.config.mjs - code splitting with multiple entry points\n'
  + 'export default {\n'
  + '  input: {\n'
  + '    main: \'src/main.js\',\n'
  + '    admin: \'src/admin.js\',\n'
  + '    vendor: \'src/vendor.js\',\n'
  + '  },\n'
  + '  output: {\n'
  + '    dir: \'dist\',\n'
  + '    format: \'esm\',\n'
  + '    entryFileNames: \'[name]-[hash].js\',\n'
  + '    chunkFileNames: \'chunks/[name]-[hash].js\',\n'
  + '    manualChunks: {\n'
  + '      // Force specific modules into named chunks\n'
  + '      lodash: [\'lodash-es\'],\n'
  + '      react: [\'react\', \'react-dom\'],\n'
  + '    },\n'
  + '  },\n'
  + '};\n'
  + '\n'
  + '// Dynamic import for lazy loading\n'
  + '// src/main.js\n'
  + 'async function loadChart() {\n'
  + '  const { Chart } = await import(\'./chart.js\');\n'
  + '  return new Chart(\'#canvas\');\n'
  + '}\n'
  + '\n'
  + 'document.getElementById(\'btn\').addEventListener(\'click\', loadChart);';

const codeOutputFormats = '// ESM - Modern browsers and Node.js (recommended)\n'
  + '// Uses import/export syntax\n'
  + '{\n'
  + '  output: {\n'
  + '    file: \'dist/lib.esm.js\',\n'
  + '    format: \'esm\',     // or \'es\'\n'
  + '  }\n'
  + '}\n'
  + '\n'
  + '// CommonJS - Node.js require() style\n'
  + '{\n'
  + '  output: {\n'
  + '    file: \'dist/lib.cjs.js\',\n'
  + '    format: \'cjs\',\n'
  + '    exports: \'auto\',   // \'default\', \'named\', \'none\'\n'
  + '  }\n'
  + '}\n'
  + '\n'
  + '// UMD - Universal (browsers + Node.js + AMD)\n'
  + '{\n'
  + '  output: {\n'
  + '    file: \'dist/lib.umd.js\',\n'
  + '    format: \'umd\',\n'
  + '    name: \'MyLibrary\',  // global variable name\n'
  + '    globals: {\n'
  + '      react: \'React\',\n'
  + '      \'react-dom\': \'ReactDOM\',\n'
  + '    },\n'
  + '  },\n'
  + '  external: [\'react\', \'react-dom\'],\n'
  + '}\n'
  + '\n'
  + '// IIFE - Immediately Invoked Function Expression\n'
  + '// For <script> tags, no module loader needed\n'
  + '{\n'
  + '  output: {\n'
  + '    file: \'dist/lib.iife.js\',\n'
  + '    format: \'iife\',\n'
  + '    name: \'MyLibrary\',\n'
  + '  }\n'
  + '}';

const codeLibraryBundling = '// Complete library bundling config\n'
  + '// rollup.config.mjs\n'
  + 'import resolve from \'@rollup/plugin-node-resolve\';\n'
  + 'import commonjs from \'@rollup/plugin-commonjs\';\n'
  + 'import typescript from \'@rollup/plugin-typescript\';\n'
  + 'import terser from \'@rollup/plugin-terser\';\n'
  + 'import { readFileSync } from \'fs\';\n'
  + '\n'
  + 'const pkg = JSON.parse(\n'
  + '  readFileSync(\'./package.json\', \'utf8\')\n'
  + ');\n'
  + '\n'
  + 'export default {\n'
  + '  input: \'src/index.ts\',\n'
  + '  // Externalize peer dependencies\n'
  + '  external: [\n'
  + '    ...Object.keys(pkg.peerDependencies || {}),\n'
  + '    ...Object.keys(pkg.dependencies || {}),\n'
  + '  ],\n'
  + '  output: [\n'
  + '    {\n'
  + '      file: pkg.module,       // "dist/index.esm.js"\n'
  + '      format: \'esm\',\n'
  + '      sourcemap: true,\n'
  + '    },\n'
  + '    {\n'
  + '      file: pkg.main,         // "dist/index.cjs.js"\n'
  + '      format: \'cjs\',\n'
  + '      sourcemap: true,\n'
  + '      exports: \'named\',\n'
  + '    },\n'
  + '  ],\n'
  + '  plugins: [\n'
  + '    resolve(),\n'
  + '    commonjs(),\n'
  + '    typescript({ declaration: true, declarationDir: \'dist/types\' }),\n'
  + '    terser(),\n'
  + '  ],\n'
  + '};\n'
  + '\n'
  + '// Matching package.json fields:\n'
  + '// {\n'
  + '//   "main": "dist/index.cjs.js",\n'
  + '//   "module": "dist/index.esm.js",\n'
  + '//   "types": "dist/types/index.d.ts",\n'
  + '//   "exports": {\n'
  + '//     ".": {\n'
  + '//       "import": "./dist/index.esm.js",\n'
  + '//       "require": "./dist/index.cjs.js",\n'
  + '//       "types": "./dist/types/index.d.ts"\n'
  + '//     }\n'
  + '//   },\n'
  + '//   "files": ["dist"]\n'
  + '// }';

const codeWatchMode = '// rollup.config.mjs with watch options\n'
  + 'export default {\n'
  + '  input: \'src/index.js\',\n'
  + '  output: {\n'
  + '    file: \'dist/bundle.js\',\n'
  + '    format: \'esm\',\n'
  + '  },\n'
  + '  watch: {\n'
  + '    include: \'src/**\',\n'
  + '    exclude: \'node_modules/**\',\n'
  + '    clearScreen: false,\n'
  + '    // Rebuild delay (ms)\n'
  + '    buildDelay: 100,\n'
  + '  },\n'
  + '};\n'
  + '\n'
  + '// package.json scripts\n'
  + '// {\n'
  + '//   "scripts": {\n'
  + '//     "build": "rollup -c",\n'
  + '//     "dev": "rollup -c --watch",\n'
  + '//     "build:prod": "NODE_ENV=production rollup -c"\n'
  + '//   }\n'
  + '// }\n'
  + '\n'
  + '// Programmatic API\n'
  + 'import { watch } from \'rollup\';\n'
  + '\n'
  + 'const watcher = watch({\n'
  + '  input: \'src/index.js\',\n'
  + '  output: { file: \'dist/bundle.js\', format: \'esm\' },\n'
  + '});\n'
  + '\n'
  + 'watcher.on(\'event\', (event) => {\n'
  + '  if (event.code === \'BUNDLE_END\') {\n'
  + '    console.log(\'Built in \' + event.duration + \'ms\');\n'
  + '  }\n'
  + '  if (event.code === \'ERROR\') {\n'
  + '    console.error(event.error);\n'
  + '  }\n'
  + '});\n'
  + '\n'
  + '// Close watcher when done\n'
  + '// watcher.close();';

const codeAdvancedConfig = '// Advanced rollup.config.mjs\n'
  + 'import resolve from \'@rollup/plugin-node-resolve\';\n'
  + 'import commonjs from \'@rollup/plugin-commonjs\';\n'
  + 'import terser from \'@rollup/plugin-terser\';\n'
  + 'import replace from \'@rollup/plugin-replace\';\n'
  + 'import alias from \'@rollup/plugin-alias\';\n'
  + 'import { visualizer } from \'rollup-plugin-visualizer\';\n'
  + '\n'
  + 'const isProduction = process.env.NODE_ENV === \'production\';\n'
  + '\n'
  + 'export default {\n'
  + '  input: \'src/index.js\',\n'
  + '  output: {\n'
  + '    dir: \'dist\',\n'
  + '    format: \'esm\',\n'
  + '    sourcemap: !isProduction,\n'
  + '    banner: \'/* My Library v1.0.0 */\',\n'
  + '  },\n'
  + '  plugins: [\n'
  + '    // Path aliases (like Webpack resolve.alias)\n'
  + '    alias({\n'
  + '      entries: [\n'
  + '        { find: \'@\', replacement: \'./src\' },\n'
  + '        { find: \'@utils\', replacement: \'./src/utils\' },\n'
  + '      ],\n'
  + '    }),\n'
  + '\n'
  + '    // Environment variable replacement\n'
  + '    replace({\n'
  + '      preventAssignment: true,\n'
  + '      \'process.env.NODE_ENV\': JSON.stringify(\n'
  + '        process.env.NODE_ENV || \'development\'\n'
  + '      ),\n'
  + '    }),\n'
  + '\n'
  + '    resolve(),\n'
  + '    commonjs(),\n'
  + '\n'
  + '    // Only minify in production\n'
  + '    isProduction && terser(),\n'
  + '\n'
  + '    // Bundle visualization\n'
  + '    isProduction && visualizer({\n'
  + '      filename: \'stats.html\',\n'
  + '      gzipSize: true,\n'
  + '    }),\n'
  + '  ].filter(Boolean),\n'
  + '\n'
  + '  // Suppress specific warnings\n'
  + '  onwarn(warning, warn) {\n'
  + '    if (warning.code === \'CIRCULAR_DEPENDENCY\') return;\n'
  + '    warn(warning);\n'
  + '  },\n'
  + '};';

const codeCustomPlugin = '// Writing a custom Rollup plugin\n'
  + 'function myPlugin(options = {}) {\n'
  + '  return {\n'
  + '    name: \'my-plugin\',\n'
  + '\n'
  + '    // Called on each build start\n'
  + '    buildStart() {\n'
  + '      console.log(\'Build started...\');\n'
  + '    },\n'
  + '\n'
  + '    // Resolve custom import paths\n'
  + '    resolveId(source) {\n'
  + '      if (source === \'virtual:config\') {\n'
  + '        return source; // handle this id\n'
  + '      }\n'
  + '      return null; // let other plugins handle it\n'
  + '    },\n'
  + '\n'
  + '    // Provide content for resolved ids\n'
  + '    load(id) {\n'
  + '      if (id === \'virtual:config\') {\n'
  + '        return \'export default { version: \"1.0\" };\';\n'
  + '      }\n'
  + '      return null;\n'
  + '    },\n'
  + '\n'
  + '    // Transform individual modules\n'
  + '    transform(code, id) {\n'
  + '      if (id.endsWith(\'.css\')) {\n'
  + '        return {\n'
  + '          code: \'export default \' + JSON.stringify(code),\n'
  + '          map: null,\n'
  + '        };\n'
  + '      }\n'
  + '    },\n'
  + '\n'
  + '    // Post-processing the final bundle\n'
  + '    generateBundle(options, bundle) {\n'
  + '      for (const [name, chunk] of Object.entries(bundle)) {\n'
  + '        console.log(name + \': \' + chunk.code.length + \' bytes\');\n'
  + '      }\n'
  + '    },\n'
  + '  };\n'
  + '}';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Rollup.js Module Bundler: The Complete Guide to Efficient JavaScript Bundling',
    description: 'Learn Rollup.js from basics to advanced configuration. Covers plugins, tree-shaking, code splitting, output formats (ESM, CJS, UMD, IIFE), library bundling, watch mode, and comparison with Webpack and Vite.',
    intro: 'Rollup is a JavaScript module bundler that compiles small pieces of code into larger, more complex bundles. It is the bundler of choice for JavaScript libraries and is known for producing clean, efficient output with excellent tree-shaking. Rollup uses the ES module standard natively, which means it can statically analyze your imports and exports to eliminate dead code more effectively than bundlers that rely on CommonJS. If you are building a library for npm, a framework component, or a lean application bundle, Rollup is an outstanding tool to master.',
    tldrTitle: 'TL;DR',
    tldr: 'Rollup is a module bundler optimized for libraries and lean applications. It offers best-in-class tree-shaking, outputs ESM/CJS/UMD/IIFE, and has a rich plugin ecosystem. Use Rollup when you need clean, efficient bundles -- especially for npm packages. For complex applications with HMR needs, consider Vite (which uses Rollup under the hood for production builds).',
    keyTakeawaysTitle: 'Key Takeaways',
    kt1: 'Rollup produces the smallest bundles among major bundlers thanks to native ES module support and superior tree-shaking.',
    kt2: 'The plugin ecosystem (@rollup/plugin-*) covers every need: TypeScript, CommonJS conversion, Babel, minification, and more.',
    kt3: 'Multiple output formats (ESM, CJS, UMD, IIFE) from a single config make it ideal for library authors.',
    kt4: 'Code splitting with dynamic imports supports lazy-loading for application builds.',
    kt5: 'Vite uses Rollup for production builds, so Rollup plugins work in both ecosystems.',
    installTitle: 'Installation and Getting Started',
    installDesc: 'Rollup can be installed globally or as a project dependency. The recommended approach is to install it locally and use it via npx or package.json scripts. Rollup supports both CLI usage and configuration files for complex setups.',
    configTitle: 'Configuration File',
    configDesc: 'A rollup.config.mjs file is the standard way to configure Rollup. It exports a configuration object or an array of configurations. Using .mjs extension ensures the file is treated as an ES module. You can define single or multiple outputs, which is extremely useful for library authors who need to ship ESM, CommonJS, and UMD builds simultaneously.',
    pluginsTitle: 'Essential Plugins',
    pluginsDesc: 'Rollup has a rich ecosystem of official plugins under the @rollup/ scope. The most commonly used plugins include: node-resolve (resolve node_modules imports), commonjs (convert CJS to ESM), terser (minification), babel (transpilation), typescript (TS compilation), and json (import JSON files). These plugins cover 90% of typical bundling requirements.',
    treeShakingTitle: 'Tree-Shaking (Dead Code Elimination)',
    treeShakingDesc: 'Tree-shaking is Rollup\'s signature feature. Because Rollup natively understands ES module import/export statements, it can statically determine which exports are used and remove unused code from the final bundle. This produces significantly smaller bundles compared to bundlers that wrap modules in function calls. Setting "sideEffects: false" in package.json helps Rollup eliminate entire unused modules.',
    codeSplittingTitle: 'Code Splitting and Dynamic Imports',
    codeSplittingDesc: 'Rollup supports code splitting through multiple entry points and dynamic import() expressions. When using code splitting, output must use the "dir" option instead of "file". Rollup automatically creates shared chunks for code used by multiple entry points, and you can use manualChunks to control chunk grouping.',
    outputFormatsTitle: 'Output Formats: ESM, CJS, UMD, and IIFE',
    outputFormatsDesc: 'Rollup supports four main output formats. ESM (ES Modules) uses import/export syntax and is the modern standard for both browsers and Node.js. CJS (CommonJS) uses require() and module.exports for Node.js compatibility. UMD (Universal Module Definition) works in browsers, Node.js, and AMD loaders. IIFE (Immediately Invoked Function Expression) is for direct script tag inclusion without any module loader.',
    libraryTitle: 'Library Bundling Best Practices',
    libraryDesc: 'Rollup excels at bundling libraries for npm. The key principles are: externalize all dependencies (do not bundle them), generate both ESM and CJS outputs, emit TypeScript declaration files, configure package.json exports map correctly, and keep the bundle as lean as possible.',
    watchTitle: 'Watch Mode and Development Workflow',
    watchDesc: 'Rollup includes a built-in watch mode that rebuilds your bundle when source files change. You can configure which files to watch, set a rebuild delay, and use the programmatic API for custom build pipelines. For application development, consider pairing Rollup with a dev server plugin or using Vite which adds HMR on top of Rollup.',
    advancedTitle: 'Advanced Configuration',
    advancedDesc: 'Advanced Rollup configurations often include path aliases, environment variable replacement, conditional plugins, bundle visualization, custom warning handlers, and banner/footer injection. The configuration file is plain JavaScript, so you can use any logic to build your config dynamically.',
    customPluginTitle: 'Writing Custom Plugins',
    customPluginDesc: 'Rollup plugins follow a simple hook-based API. The most important hooks are: buildStart (initialization), resolveId (custom module resolution), load (provide module content), transform (modify module code), and generateBundle (post-processing). Understanding this lifecycle lets you extend Rollup for any use case.',
    comparisonTitle: 'Rollup vs Webpack vs Vite',
    comparisonDesc: 'Each bundler has distinct strengths. Rollup produces the cleanest output and is best for libraries. Webpack has the richest ecosystem and is best for complex applications. Vite uses Rollup for production and esbuild for development, offering the best developer experience with instant HMR.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Always externalize peer dependencies when building libraries. Bundling React or other peer deps into your library causes duplicate copies in consumer apps.',
    bp2: 'Use the package.json "exports" field with "import" and "require" conditions to support both ESM and CJS consumers.',
    bp3: 'Enable sourcemaps during development but consider disabling them in production builds for smaller output.',
    bp4: 'Set "sideEffects: false" in package.json when your library is side-effect-free to enable maximum tree-shaking.',
    bp5: 'Use rollup-plugin-visualizer to analyze bundle size and identify opportunities for optimization.',
    bp6: 'Prefer @rollup/plugin-typescript over rollup-plugin-ts for TypeScript -- the official plugin is better maintained and more reliable.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'When should I use Rollup instead of Webpack?',
    faq1a: 'Use Rollup when building JavaScript libraries, framework components, or any package published to npm. Rollup produces cleaner, smaller bundles with better tree-shaking. Use Webpack for complex applications that need advanced code splitting, HMR, and a large plugin ecosystem. For new application projects, Vite (which uses Rollup under the hood) is often the best choice.',
    faq2q: 'Does Rollup support TypeScript?',
    faq2a: 'Yes. Use @rollup/plugin-typescript to compile TypeScript files. It integrates with your tsconfig.json and can generate declaration files (.d.ts). For faster builds, you can also use esbuild-based alternatives like rollup-plugin-esbuild which handles TypeScript transpilation much faster (though without type checking).',
    faq3q: 'How does Rollup tree-shaking work?',
    faq3a: 'Rollup statically analyzes ES module import/export statements to determine which exports are used. Unused exports and their associated code are removed from the final bundle. This works because ES modules have a static structure -- imports and exports are determined at parse time, not runtime. CommonJS modules cannot be tree-shaken as effectively because require() calls are dynamic.',
    faq4q: 'Can Rollup handle CSS and images?',
    faq4a: 'Yes, through plugins. Use rollup-plugin-postcss for CSS (supports CSS Modules, Sass, Less), @rollup/plugin-image for image files, and rollup-plugin-copy for static assets. Rollup does not handle non-JavaScript assets natively, but its plugin system covers all common asset types.',
    faq5q: 'What is the difference between ESM and CJS output?',
    faq5a: 'ESM (ES Modules) uses import/export syntax and supports tree-shaking, top-level await, and static analysis. CJS (CommonJS) uses require()/module.exports and is the traditional Node.js format. ESM is the modern standard and should be the primary format. Include CJS output for backward compatibility with older Node.js versions or tools that do not support ESM.',
    faq6q: 'How does Vite relate to Rollup?',
    faq6a: 'Vite uses Rollup as its production bundler. During development, Vite uses esbuild for fast module transformation and serves files via native ESM. For production builds, Vite delegates to Rollup with pre-configured optimizations. This means Rollup plugins are generally compatible with Vite, and knowledge of Rollup configuration transfers directly.',
    faq7q: 'Can I use Rollup for application bundling?',
    faq7a: 'Yes, but with caveats. Rollup handles code splitting and dynamic imports well, but it lacks built-in HMR (Hot Module Replacement) and dev server features. For applications, Vite provides a better developer experience by wrapping Rollup with a fast dev server. Use Rollup directly for applications only if you have simple needs or a custom build pipeline.',
    faq8q: 'How do I handle circular dependencies in Rollup?',
    faq8a: 'Rollup supports circular dependencies in ES modules, but it emits warnings. You can suppress specific warnings using the onwarn handler in your config. The best practice is to refactor your code to eliminate circular dependencies, as they can cause subtle initialization bugs. If unavoidable, ensure the circular references do not cause issues at runtime.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Rollup.js 模块打包器：高效 JavaScript 打包完全指南',
    description: '从基础到高级配置全面学习 Rollup.js。涵盖插件、tree-shaking、代码分割、输出格式（ESM、CJS、UMD、IIFE）、库打包、watch 模式，以及与 Webpack 和 Vite 的比较。',
    intro: 'Rollup 是一个 JavaScript 模块打包器，将小段代码编译成更大、更复杂的包。它是 JavaScript 库的首选打包器，以产生干净、高效的输出和出色的 tree-shaking 而闻名。Rollup 原生使用 ES 模块标准，这意味着它可以静态分析你的导入和导出，比依赖 CommonJS 的打包器更有效地消除死代码。如果你正在为 npm 构建库、框架组件或精简的应用包，Rollup 是一个值得掌握的出色工具。',
    tldrTitle: 'TL;DR',
    tldr: 'Rollup 是一个针对库和精简应用优化的模块打包器。它提供一流的 tree-shaking，输出 ESM/CJS/UMD/IIFE，并拥有丰富的插件生态系统。当你需要干净、高效的包时使用 Rollup -- 特别是 npm 包。对于需要 HMR 的复杂应用，考虑使用 Vite（其生产构建底层使用 Rollup）。',
    keyTakeawaysTitle: '关键要点',
    kt1: '由于原生 ES 模块支持和卓越的 tree-shaking，Rollup 在主要打包器中产生最小的包。',
    kt2: '插件生态系统（@rollup/plugin-*）覆盖所有需求：TypeScript、CommonJS 转换、Babel、压缩等。',
    kt3: '单一配置的多输出格式（ESM、CJS、UMD、IIFE）使其成为库作者的理想选择。',
    kt4: '带动态导入的代码分割支持应用构建的延迟加载。',
    kt5: 'Vite 使用 Rollup 进行生产构建，因此 Rollup 插件在两个生态系统中都可用。',
    installTitle: '安装和入门',
    installDesc: 'Rollup 可以全局安装或作为项目依赖安装。推荐的方法是本地安装并通过 npx 或 package.json 脚本使用。Rollup 支持 CLI 和配置文件两种用法。',
    configTitle: '配置文件',
    configDesc: 'rollup.config.mjs 文件是配置 Rollup 的标准方式。它导出一个配置对象或配置数组。使用 .mjs 扩展名确保文件被视为 ES 模块。你可以定义单个或多个输出，这对需要同时发布 ESM、CommonJS 和 UMD 构建的库作者非常有用。',
    pluginsTitle: '核心插件',
    pluginsDesc: 'Rollup 在 @rollup/ 范围下拥有丰富的官方插件生态系统。最常用的插件包括：node-resolve（解析 node_modules 导入）、commonjs（将 CJS 转换为 ESM）、terser（压缩）、babel（转译）、typescript（TS 编译）和 json（导入 JSON 文件）。',
    treeShakingTitle: 'Tree-Shaking（死代码消除）',
    treeShakingDesc: 'Tree-shaking 是 Rollup 的标志性功能。因为 Rollup 原生理解 ES 模块的 import/export 语句，它可以静态确定哪些导出被使用并从最终包中移除未使用的代码。在 package.json 中设置 "sideEffects: false" 有助于 Rollup 消除整个未使用的模块。',
    codeSplittingTitle: '代码分割和动态导入',
    codeSplittingDesc: 'Rollup 通过多入口点和动态 import() 表达式支持代码分割。使用代码分割时，输出必须使用 "dir" 选项而非 "file"。Rollup 自动为多个入口点共用的代码创建共享块。',
    outputFormatsTitle: '输出格式：ESM、CJS、UMD 和 IIFE',
    outputFormatsDesc: 'Rollup 支持四种主要输出格式。ESM 使用 import/export 语法，是浏览器和 Node.js 的现代标准。CJS 使用 require() 用于 Node.js 兼容性。UMD 在浏览器、Node.js 和 AMD 中通用。IIFE 用于直接 script 标签引入。',
    libraryTitle: '库打包最佳实践',
    libraryDesc: 'Rollup 擅长为 npm 打包库。关键原则：将所有依赖外部化、生成 ESM 和 CJS 输出、发出 TypeScript 声明文件、正确配置 package.json exports 映射。',
    watchTitle: 'Watch 模式和开发工作流',
    watchDesc: 'Rollup 包含内置的 watch 模式，当源文件更改时自动重建。你可以配置要监视的文件、设置重建延迟，并使用编程 API 进行自定义构建管道。',
    advancedTitle: '高级配置',
    advancedDesc: '高级 Rollup 配置通常包括路径别名、环境变量替换、条件插件、包可视化、自定义警告处理器和 banner/footer 注入。',
    customPluginTitle: '编写自定义插件',
    customPluginDesc: 'Rollup 插件遵循简单的基于钩子的 API。最重要的钩子包括：buildStart、resolveId、load、transform 和 generateBundle。',
    comparisonTitle: 'Rollup vs Webpack vs Vite',
    comparisonDesc: '每个打包器有不同的优势。Rollup 产生最干净的输出，最适合库。Webpack 拥有最丰富的生态系统，最适合复杂应用。Vite 在生产中使用 Rollup，在开发中使用 esbuild，提供最佳开发体验。',
    bestPracticesTitle: '最佳实践',
    bp1: '构建库时始终将 peer 依赖外部化。将 React 等 peer 依赖打包到库中会导致消费应用中出现重复副本。',
    bp2: '使用 package.json "exports" 字段的 "import" 和 "require" 条件来支持 ESM 和 CJS 消费者。',
    bp3: '开发期间启用 sourcemap，但考虑在生产构建中禁用以减小输出大小。',
    bp4: '当库没有副作用时，在 package.json 中设置 "sideEffects: false" 以启用最大化 tree-shaking。',
    bp5: '使用 rollup-plugin-visualizer 分析包大小并识别优化机会。',
    bp6: '优先使用 @rollup/plugin-typescript 而非 rollup-plugin-ts -- 官方插件维护更好、更可靠。',
    faqTitle: '常见问题',
    faq1q: '什么时候应该使用 Rollup 而不是 Webpack？',
    faq1a: '构建 JavaScript 库、框架组件或任何发布到 npm 的包时使用 Rollup。Rollup 产生更干净、更小的包，具有更好的 tree-shaking。对于复杂应用使用 Webpack。对于新应用项目，Vite（底层使用 Rollup）通常是最佳选择。',
    faq2q: 'Rollup 支持 TypeScript 吗？',
    faq2a: '支持。使用 @rollup/plugin-typescript 编译 TypeScript 文件。它与 tsconfig.json 集成并可以生成声明文件（.d.ts）。',
    faq3q: 'Rollup 的 tree-shaking 如何工作？',
    faq3a: 'Rollup 静态分析 ES 模块的 import/export 语句来确定哪些导出被使用。未使用的导出及其关联代码会从最终包中移除。',
    faq4q: 'Rollup 能处理 CSS 和图片吗？',
    faq4a: '可以，通过插件。使用 rollup-plugin-postcss 处理 CSS，@rollup/plugin-image 处理图片文件。',
    faq5q: 'ESM 和 CJS 输出有什么区别？',
    faq5a: 'ESM 使用 import/export 语法，支持 tree-shaking 和静态分析。CJS 使用 require()/module.exports，是传统 Node.js 格式。ESM 是现代标准，应作为主要格式。',
    faq6q: 'Vite 和 Rollup 是什么关系？',
    faq6a: 'Vite 使用 Rollup 作为其生产打包器。开发期间 Vite 使用 esbuild 进行快速模块转换。Rollup 插件通常与 Vite 兼容。',
    faq7q: 'Rollup 可以用于应用打包吗？',
    faq7a: '可以，但有注意事项。Rollup 可以处理代码分割和动态导入，但缺少内置 HMR 和开发服务器功能。对于应用，Vite 提供更好的开发体验。',
    faq8q: '如何处理 Rollup 中的循环依赖？',
    faq8a: 'Rollup 支持 ES 模块中的循环依赖，但会发出警告。你可以使用配置中的 onwarn 处理器抑制特定警告。最佳实践是重构代码以消除循环依赖。',
    relatedTitle: '相关工具',
  },
};

export default function RollupGuide({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  const compRows = [
    { feature: 'Primary use case', rollup: 'Libraries', webpack: 'Applications', vite: 'Applications + DX' },
    { feature: 'Tree-shaking', rollup: 'Excellent (native ESM)', webpack: 'Good (since v5)', vite: 'Excellent (Rollup)' },
    { feature: 'Dev server / HMR', rollup: 'Plugin needed', webpack: 'Built-in (WDS)', vite: 'Built-in (instant)' },
    { feature: 'Output cleanliness', rollup: 'Very clean', webpack: 'Wrapped in runtime', vite: 'Clean (Rollup)' },
    { feature: 'Config complexity', rollup: 'Simple', webpack: 'Complex', vite: 'Minimal' },
    { feature: 'Build speed', rollup: 'Fast', webpack: 'Moderate', vite: 'Very fast (esbuild)' },
    { feature: 'Code splitting', rollup: 'Yes', webpack: 'Yes (advanced)', vite: 'Yes (Rollup)' },
    { feature: 'Plugin ecosystem', rollup: 'Moderate', webpack: 'Very large', vite: 'Growing (Rollup compat)' },
    { feature: 'Bundle size', rollup: 'Smallest', webpack: 'Larger', vite: 'Small (Rollup)' },
  ];

  const preStyle: React.CSSProperties = {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '1.25rem',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  };

  const thStyle: React.CSSProperties = {
    padding: '0.75rem',
    textAlign: 'left' as const,
    border: '1px solid #dee2e6',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid #dee2e6',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>{t.tldrTitle}</h2>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>{t.keyTakeawaysTitle}</h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
        </ul>
      </div>

      {/* Installation */}
      <h2>{t.installTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.installDesc}</p>
      <pre style={preStyle}><code>{codeInstall}</code></pre>

      {/* Configuration */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.configTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.configDesc}</p>
      <pre style={preStyle}><code>{codeBasicConfig}</code></pre>

      {/* Plugins */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.pluginsTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.pluginsDesc}</p>
      <pre style={preStyle}><code>{codePlugins}</code></pre>

      {/* Tree-Shaking */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.treeShakingTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.treeShakingDesc}</p>
      <pre style={preStyle}><code>{codeTreeShaking}</code></pre>

      {/* Code Splitting */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.codeSplittingTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.codeSplittingDesc}</p>
      <pre style={preStyle}><code>{codeCodeSplitting}</code></pre>

      {/* Output Formats */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.outputFormatsTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.outputFormatsDesc}</p>
      <pre style={preStyle}><code>{codeOutputFormats}</code></pre>

      {/* Library Bundling */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.libraryTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.libraryDesc}</p>
      <pre style={preStyle}><code>{codeLibraryBundling}</code></pre>

      {/* Watch Mode */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.watchTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.watchDesc}</p>
      <pre style={preStyle}><code>{codeWatchMode}</code></pre>

      {/* Advanced Configuration */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.advancedTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.advancedDesc}</p>
      <pre style={preStyle}><code>{codeAdvancedConfig}</code></pre>

      {/* Custom Plugins */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.customPluginTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.customPluginDesc}</p>
      <pre style={preStyle}><code>{codeCustomPlugin}</code></pre>

      {/* Comparison Table */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <p style={{ lineHeight: '1.7' }}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Rollup</th>
              <th style={thStyle}>Webpack</th>
              <th style={thStyle}>Vite</th>
            </tr>
          </thead>
          <tbody>
            {compRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ ...tdStyle, fontWeight: 500, fontFamily: 'inherit' }}>{row.feature}</td>
                <td style={{ ...tdStyle, color: '#16a34a', fontWeight: 600 }}>{row.rollup}</td>
                <td style={tdStyle}>{row.webpack}</td>
                <td style={tdStyle}>{row.vite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
      </ul>

      {/* FAQ */}
      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
        [t.faq6q, t.faq6a],
        [t.faq7q, t.faq7a],
        [t.faq8q, t.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568', lineHeight: '1.7' }}>{a}</p>
        </div>
      ))}

      {/* Related Tools */}
      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
          <li><a href="/en/tools/javascript-minifier" style={{ color: '#3182ce' }}>JavaScript Minifier</a></li>
        </ul>
      </div>
    </article>
  );
}
