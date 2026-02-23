'use client';
import React from 'react';

const codeRustHello = `// src/lib.rs — compile to WebAssembly with wasm-pack
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello from Rust WASM, {}!", name)
}

// Expose a struct to JavaScript
#[wasm_bindgen]
pub struct ImageProcessor {
    width: u32,
    height: u32,
    data: Vec<u8>,
}

#[wasm_bindgen]
impl ImageProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> ImageProcessor {
        ImageProcessor {
            width,
            height,
            data: vec![0; (width * height * 4) as usize],
        }
    }

    pub fn grayscale(&mut self, input: &[u8]) {
        for i in (0..input.len()).step_by(4) {
            let r = input[i] as f32;
            let g = input[i + 1] as f32;
            let b = input[i + 2] as f32;
            let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
            self.data[i]     = gray;
            self.data[i + 1] = gray;
            self.data[i + 2] = gray;
            self.data[i + 3] = input[i + 3];
        }
    }

    pub fn get_data(&self) -> Vec\u003cu8\u003e {
        self.data.clone()
    }
}`;

const codeBuildWasm = `# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Build for browser (outputs pkg/ directory)
wasm-pack build --target web

# Build for Node.js
wasm-pack build --target nodejs

# Build for bundler (webpack/vite)
wasm-pack build --target bundler

# Output structure:
# pkg/
#   my_crate_bg.wasm   <- compiled WASM binary
#   my_crate.js        <- JS glue code
#   my_crate.d.ts      <- TypeScript types
#   package.json`;

const codeBrowserLoad = `// Loading WASM in the browser (vanilla JS)
import init, { add, greet, ImageProcessor } from './pkg/my_crate.js';

async function run() {
    // Initialize the WASM module
    await init();

    // Call exported functions
    console.log(add(1, 2));          // 3
    console.log(greet('World'));     // Hello from Rust WASM, World!

    // Use the ImageProcessor class
    const processor = new ImageProcessor(640, 480);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, 640, 480);

    processor.grayscale(imageData.data);
    const result = processor.get_data();
    const output = new ImageData(new Uint8ClampedArray(result), 640, 480);
    ctx.putImageData(output, 0, 0);
}

run();`;

const codeViteConfig = `// vite.config.ts — WASM support with Vite
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
    plugins: [
        wasm(),
        topLevelAwait(),
    ],
});

// Then in your app:
// import init, { myFunc } from './pkg/my_crate.js';
// await init();  // or use top-level await`;

const codeCppWasm = `// C++ compiled to WASM via Emscripten
#include \u003cemscripten/bind.h\u003e
#include \u003cvector\u003e
#include \u003ccmath\u003e

std::vector\u003cfloat\u003e fft(const std::vector\u003cfloat\u003e& input) {
    // Fast Fourier Transform implementation
    size_t n = input.size();
    std::vector\u003cfloat\u003e result(n);
    // ... FFT logic ...
    return result;
}

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("fft", &fft);
    emscripten::register_vector\u003cfloat\u003e("VectorFloat");
}

// Build:
// emcc -O3 -lembind signal.cpp -o signal.js \\
//   -s MODULARIZE=1 -s EXPORT_NAME=createModule \\
//   -s ALLOW_MEMORY_GROWTH=1`;

const codeNodeWasm = `// Using WASM in Node.js
import { readFile } from 'fs/promises';
import { WASM } from 'node:wasm'; // Node 22+ native WASM

// Traditional approach
const wasmBuffer = await readFile('./my_module.wasm');
const { instance } = await WebAssembly.instantiate(wasmBuffer, {
    env: {
        memory: new WebAssembly.Memory({ initial: 256 }),
        __stack_pointer: new WebAssembly.Global({ value: 'i32', mutable: true }, 0),
    },
});

// Call exported functions
const result = instance.exports.add(5, 3);
console.log(result); // 8

// With wasm-pack (Node target)
import { add, greet } from './pkg/my_crate_nodejs.js';
console.log(add(10, 20)); // 30`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'WebAssembly in 2026: Rust, C++, and the Browser Runtime',
    intro: 'WebAssembly (WASM) has matured from an experimental technology into a production-ready runtime used by Figma, Google Earth, and Cloudflare Workers. In 2026, WASM runs not just in browsers but in servers, edge runtimes, and embedded systems. This guide covers compiling Rust and C++ to WASM, loading it in browsers and Node.js, and practical use cases like image processing, audio codecs, and games.',
    rustTitle: 'Compiling Rust to WebAssembly',
    rustDesc: 'Rust is the premier language for WebAssembly development. wasm-pack handles compilation, generates JavaScript bindings, and creates TypeScript type definitions automatically.',
    buildTitle: 'Building and Targets',
    buildDesc: 'wasm-pack supports three output targets: web (vanilla browsers), nodejs (server-side), and bundler (Webpack/Vite/Rollup). Each generates different JS glue code.',
    browserTitle: 'Loading WASM in the Browser',
    browserDesc: 'WASM modules must be initialized asynchronously. The init() function fetches and compiles the .wasm binary. After that, exported functions work like normal JavaScript.',
    viteTitle: 'Vite Integration',
    viteDesc: 'The vite-plugin-wasm plugin handles WASM loading seamlessly. Combined with vite-plugin-top-level-await, you can use top-level await for initialization.',
    cppTitle: 'C++ with Emscripten',
    cppDesc: 'Emscripten compiles C and C++ to WebAssembly. It is widely used for porting existing C++ codebases — game engines, image/audio codecs, scientific computing libraries.',
    nodeTitle: 'WebAssembly in Node.js',
    nodeDesc: 'Node.js has supported WebAssembly since v8.0. For performance-critical server code, WASM can outperform pure JavaScript by 2-10x for compute-heavy tasks.',
    useCasesTitle: 'Real-World Use Cases',
    useCase1: 'Image Processing: Figma uses WASM for rendering, squoosh.app uses it for image compression codecs (WebP, AVIF)',
    useCase2: 'Audio/Video Codecs: FFmpeg compiled to WASM runs entirely in the browser without server uploads',
    useCase3: 'Games: Unity, Godot, and Unreal Engine all export to WebAssembly',
    useCase4: 'Cryptography: Fast elliptic curve and AES implementations safe from JS JIT timing attacks',
    useCase5: 'Edge Computing: Cloudflare Workers and Fastly Compute run WASM modules at the network edge',
    comparisonTitle: 'JavaScript vs WebAssembly Performance',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Minimize JS\u2194WASM boundary crossings: passing large arrays is cheap but calling functions per-pixel is expensive. Batch operations.',
    bp2: 'Use shared memory (SharedArrayBuffer) with Web Workers for parallel WASM execution on multi-core machines.',
    bp3: 'Profile with Chrome DevTools WASM profiling — WASM appears in flamegraphs alongside JavaScript.',
    bp4: 'For Rust: enable wasm-opt in Cargo.toml and use wee_alloc for a smaller memory allocator.',
    bp5: 'Stream-compile large WASM modules with WebAssembly.instantiateStreaming() to avoid blocking the main thread.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is WebAssembly faster than JavaScript?',
    faq1a: 'For compute-heavy tasks (number crunching, image processing, cryptography), WASM is typically 2-10x faster than optimized JS. For DOM manipulation and async I/O, JavaScript is equally fast and more ergonomic. WASM cannot directly access the DOM — it must call back into JavaScript for that.',
    faq2q: 'Can I use WASM with React / Next.js?',
    faq2a: 'Yes. In Next.js, import WASM modules in a useEffect hook or use next.config.js with experiment.asyncWebAssembly: true. For computationally heavy tasks, offload to a Web Worker so the main thread (and React rendering) stays responsive.',
    faq3q: 'What languages compile to WebAssembly?',
    faq3a: 'Rust (best tooling), C/C++ (via Emscripten), Go (via tinygo or standard go build -target=wasm), AssemblyScript (TypeScript-like syntax), Zig, Kotlin/Wasm, and C# (.NET Blazor). Even Python can run in WASM via Pyodide.',
    faq4q: 'Is WASM safe? Can it access the filesystem?',
    faq4a: 'WebAssembly runs in a sandboxed environment. In browsers, it has no access to the filesystem, network, or DOM without explicit JavaScript bridge calls. In WASI (WebAssembly System Interface) runtimes like Wasmtime, capabilities like filesystem access must be explicitly granted at startup.',
    faq5q: 'What is WASI and how does it differ from browser WASM?',
    faq5a: 'WASI (WebAssembly System Interface) is a standard API for running WASM outside the browser — on servers, CLIs, and embedded systems. It provides POSIX-like syscalls (filesystem, networking, randomness) in a capability-based security model. Tools like Wasmtime and WasmEdge are popular WASI runtimes.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'WebAssembly 2026：Rust、C++ 与浏览器运行时',
    intro: 'WebAssembly（WASM）已从实验性技术发展为 Figma、Google Earth 和 Cloudflare Workers 使用的生产级运行时。2026 年，WASM 不仅在浏览器中运行，还在服务器、边缘运行时和嵌入式系统中运行。本指南涵盖将 Rust 和 C++ 编译为 WASM、在浏览器和 Node.js 中加载，以及图像处理、音频编解码器和游戏等实际应用。',
    rustTitle: '将 Rust 编译为 WebAssembly',
    rustDesc: 'Rust 是 WebAssembly 开发的首选语言。wasm-pack 处理编译、自动生成 JavaScript 绑定和 TypeScript 类型定义。',
    buildTitle: '构建和目标',
    buildDesc: 'wasm-pack 支持三种输出目标：web（原生浏览器）、nodejs（服务端）和 bundler（Webpack/Vite/Rollup）。每种目标生成不同的 JS 胶水代码。',
    browserTitle: '在浏览器中加载 WASM',
    browserDesc: 'WASM 模块必须异步初始化。init() 函数获取并编译 .wasm 二进制文件。之后，导出的函数像普通 JavaScript 一样工作。',
    viteTitle: 'Vite 集成',
    viteDesc: 'vite-plugin-wasm 插件无缝处理 WASM 加载。结合 vite-plugin-top-level-await，可以使用顶层 await 进行初始化。',
    cppTitle: 'C++ 与 Emscripten',
    cppDesc: 'Emscripten 将 C 和 C++ 编译为 WebAssembly。广泛用于移植现有 C++ 代码库——游戏引擎、图像/音频编解码器、科学计算库。',
    nodeTitle: 'Node.js 中的 WebAssembly',
    nodeDesc: 'Node.js 自 v8.0 起支持 WebAssembly。对于性能关键的服务器代码，WASM 在计算密集型任务上可比纯 JavaScript 快 2-10 倍。',
    useCasesTitle: '实际应用场景',
    useCase1: '图像处理：Figma 使用 WASM 渲染，squoosh.app 使用它进行图像压缩编解码（WebP、AVIF）',
    useCase2: '音视频编解码器：编译为 WASM 的 FFmpeg 完全在浏览器中运行，无需上传到服务器',
    useCase3: '游戏：Unity、Godot 和 Unreal Engine 均可导出为 WebAssembly',
    useCase4: '密码学：快速的椭圆曲线和 AES 实现，不受 JS JIT 时序攻击影响',
    useCase5: '边缘计算：Cloudflare Workers 和 Fastly Compute 在网络边缘运行 WASM 模块',
    comparisonTitle: 'JavaScript vs WebAssembly 性能',
    bestPracticesTitle: '最佳实践',
    bp1: '最小化 JS↔WASM 边界穿越：传递大数组成本低，但逐像素调用函数成本高，应批量操作。',
    bp2: '使用共享内存（SharedArrayBuffer）和 Web Workers 在多核机器上实现并行 WASM 执行。',
    bp3: '使用 Chrome DevTools WASM 分析功能进行性能分析——WASM 与 JavaScript 一起出现在火焰图中。',
    bp4: '对于 Rust：在 Cargo.toml 中启用 wasm-opt，使用 wee_alloc 作为更小的内存分配器。',
    bp5: '使用 WebAssembly.instantiateStreaming() 流式编译大型 WASM 模块，避免阻塞主线程。',
    faqTitle: '常见问题',
    faq1q: 'WebAssembly 比 JavaScript 快吗？',
    faq1a: '对于计算密集型任务（数字运算、图像处理、密码学），WASM 通常比优化过的 JS 快 2-10 倍。对于 DOM 操作和异步 I/O，JavaScript 同样快且更符合人体工程学。WASM 无法直接访问 DOM，必须通过回调 JavaScript 来实现。',
    faq2q: '我可以在 React / Next.js 中使用 WASM 吗？',
    faq2a: '可以。在 Next.js 中，在 useEffect 钩子中导入 WASM 模块，或在 next.config.js 中使用 experiment.asyncWebAssembly: true。对于计算密集型任务，卸载到 Web Worker，使主线程（和 React 渲染）保持响应。',
    faq3q: '哪些语言可以编译为 WebAssembly？',
    faq3a: 'Rust（最佳工具链）、C/C++（通过 Emscripten）、Go（通过 tinygo 或标准 go build -target=wasm）、AssemblyScript（类 TypeScript 语法）、Zig、Kotlin/Wasm 和 C#（.NET Blazor）。甚至 Python 也可以通过 Pyodide 在 WASM 中运行。',
    faq4q: 'WASM 安全吗？可以访问文件系统吗？',
    faq4a: 'WebAssembly 在沙盒环境中运行。在浏览器中，没有显式 JavaScript 桥接调用，它无法访问文件系统、网络或 DOM。在 WASI 运行时（如 Wasmtime）中，文件系统访问等功能必须在启动时显式授予。',
    faq5q: 'WASI 是什么，与浏览器 WASM 有何不同？',
    faq5a: 'WASI（WebAssembly 系统接口）是在浏览器外运行 WASM 的标准 API——用于服务器、CLI 和嵌入式系统。它以基于能力的安全模型提供类 POSIX 的系统调用（文件系统、网络、随机数）。Wasmtime 和 WasmEdge 是流行的 WASI 运行时。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'WebAssembly en 2026 : Rust, C++ et le runtime navigateur',
    intro: 'WebAssembly (WASM) est passé d\'une technologie expérimentale à un runtime de production utilisé par Figma, Google Earth et Cloudflare Workers. En 2026, WASM s\'exécute non seulement dans les navigateurs, mais aussi sur les serveurs, les runtimes edge et les systèmes embarqués.',
    rustTitle: 'Compiler Rust en WebAssembly', rustDesc: 'Rust est le premier langage pour le développement WebAssembly. wasm-pack gère la compilation, génère les liaisons JavaScript et crée automatiquement les définitions de types TypeScript.',
    buildTitle: 'Construction et cibles', buildDesc: 'wasm-pack supporte trois cibles de sortie : web, nodejs et bundler. Chacune génère un code de liaison JS différent.',
    browserTitle: 'Charger WASM dans le navigateur', browserDesc: 'Les modules WASM doivent être initialisés de manière asynchrone. La fonction init() récupère et compile le binaire .wasm.',
    viteTitle: 'Intégration Vite', viteDesc: 'Le plugin vite-plugin-wasm gère le chargement WASM de manière transparente.',
    cppTitle: 'C++ avec Emscripten', cppDesc: 'Emscripten compile C et C++ en WebAssembly. Largement utilisé pour porter des bases de code C++ existantes.',
    nodeTitle: 'WebAssembly dans Node.js', nodeDesc: 'Node.js supporte WebAssembly depuis la v8.0. Pour le code serveur critique en performance, WASM peut surpasser JavaScript pur de 2 à 10x.',
    useCasesTitle: 'Cas d\'utilisation réels',
    useCase1: 'Traitement d\'image : Figma utilise WASM pour le rendu, squoosh.app pour la compression (WebP, AVIF)',
    useCase2: 'Codecs audio/vidéo : FFmpeg compilé en WASM s\'exécute entièrement dans le navigateur',
    useCase3: 'Jeux : Unity, Godot et Unreal Engine exportent tous vers WebAssembly',
    useCase4: 'Cryptographie : implémentations rapides d\'elliptic curve et AES',
    useCase5: 'Edge computing : Cloudflare Workers et Fastly Compute exécutent des modules WASM',
    comparisonTitle: 'Performance JavaScript vs WebAssembly',
    bestPracticesTitle: 'Bonnes pratiques',
    bp1: 'Minimiser les traversées de la frontière JS↔WASM : les tableaux volumineux sont bon marché, les appels par pixel sont coûteux.',
    bp2: 'Utiliser la mémoire partagée (SharedArrayBuffer) avec Web Workers pour l\'exécution parallèle.',
    bp3: 'Profiler avec Chrome DevTools WASM profiling.',
    bp4: 'Pour Rust : activer wasm-opt dans Cargo.toml.',
    bp5: 'Utiliser WebAssembly.instantiateStreaming() pour les grands modules.',
    faqTitle: 'Foire aux questions',
    faq1q: 'WebAssembly est-il plus rapide que JavaScript ?',
    faq1a: 'Pour les tâches intensives en calcul, WASM est généralement 2 à 10x plus rapide que JS optimisé. Pour la manipulation DOM et les E/S async, JavaScript est tout aussi rapide.',
    faq2q: 'Puis-je utiliser WASM avec React / Next.js ?',
    faq2a: 'Oui. Dans Next.js, importez les modules WASM dans un hook useEffect ou utilisez experiment.asyncWebAssembly dans next.config.js.',
    faq3q: 'Quels langages compilent en WebAssembly ?',
    faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor). Même Python via Pyodide.',
    faq4q: 'WASM est-il sûr ? Peut-il accéder au système de fichiers ?',
    faq4a: 'WebAssembly s\'exécute dans un sandbox. Dans les navigateurs, aucun accès au système de fichiers, au réseau ou au DOM sans pont JavaScript explicite.',
    faq5q: 'Qu\'est-ce que WASI ?',
    faq5a: 'WASI (WebAssembly System Interface) est une API standard pour exécuter WASM hors du navigateur avec un modèle de sécurité basé sur les capacités.',
    relatedTitle: 'Outils associés',
  },
  de: {
    title: 'WebAssembly 2026: Rust, C++ und die Browser-Runtime',
    intro: 'WebAssembly (WASM) hat sich von einer experimentellen Technologie zu einer produktionsreifen Runtime entwickelt, die von Figma, Google Earth und Cloudflare Workers genutzt wird.',
    rustTitle: 'Rust zu WebAssembly kompilieren', rustDesc: 'Rust ist die führende Sprache für WebAssembly-Entwicklung. wasm-pack übernimmt die Kompilierung und generiert JavaScript-Bindungen.',
    buildTitle: 'Build-Targets', buildDesc: 'wasm-pack unterstützt drei Ausgabe-Targets: web, nodejs und bundler.',
    browserTitle: 'WASM im Browser laden', browserDesc: 'WASM-Module müssen asynchron initialisiert werden.',
    viteTitle: 'Vite-Integration', viteDesc: 'Das vite-plugin-wasm-Plugin behandelt das Laden von WASM nahtlos.',
    cppTitle: 'C++ mit Emscripten', cppDesc: 'Emscripten kompiliert C und C++ zu WebAssembly.',
    nodeTitle: 'WebAssembly in Node.js', nodeDesc: 'Node.js unterstützt WebAssembly seit v8.0.',
    useCasesTitle: 'Praxisanwendungen',
    useCase1: 'Bildverarbeitung: Figma nutzt WASM für Rendering',
    useCase2: 'Audio-/Video-Codecs: FFmpeg als WASM im Browser',
    useCase3: 'Spiele: Unity, Godot, Unreal Engine exportieren nach WASM',
    useCase4: 'Kryptographie: schnelle elliptische-Kurven-Implementierungen',
    useCase5: 'Edge Computing: Cloudflare Workers und Fastly Compute',
    comparisonTitle: 'JavaScript vs. WebAssembly Leistung',
    bestPracticesTitle: 'Best Practices',
    bp1: 'JS↔WASM-Grenzüberquerungen minimieren: große Arrays sind günstig, Pro-Pixel-Aufrufe sind teuer.',
    bp2: 'Shared Memory (SharedArrayBuffer) mit Web Workers für parallele Ausführung nutzen.',
    bp3: 'Mit Chrome DevTools WASM-Profiling analysieren.',
    bp4: 'Für Rust: wasm-opt in Cargo.toml aktivieren.',
    bp5: 'WebAssembly.instantiateStreaming() für große Module verwenden.',
    faqTitle: 'Häufig gestellte Fragen',
    faq1q: 'Ist WebAssembly schneller als JavaScript?',
    faq1a: 'Für rechenintensive Aufgaben ist WASM typischerweise 2-10x schneller als optimiertes JS.',
    faq2q: 'Kann ich WASM mit React / Next.js verwenden?',
    faq2a: 'Ja. In Next.js WASM-Module in einem useEffect-Hook importieren oder experiment.asyncWebAssembly in next.config.js verwenden.',
    faq3q: 'Welche Sprachen kompilieren zu WebAssembly?',
    faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).',
    faq4q: 'Ist WASM sicher? Kann es auf das Dateisystem zugreifen?',
    faq4a: 'WebAssembly läuft in einer Sandbox. Im Browser kein Zugriff ohne explizite JavaScript-Brücke.',
    faq5q: 'Was ist WASI?',
    faq5a: 'WASI ist eine Standard-API zum Ausführen von WASM außerhalb des Browsers.',
    relatedTitle: 'Verwandte Tools',
  },
  es: { title: 'WebAssembly en 2026: Rust, C++ y el runtime del navegador', intro: 'WebAssembly (WASM) ha madurado de tecnología experimental a runtime de producción usado por Figma, Google Earth y Cloudflare Workers.', rustTitle: 'Compilar Rust a WebAssembly', rustDesc: 'Rust es el lenguaje principal para el desarrollo de WebAssembly.', buildTitle: 'Construcción y objetivos', buildDesc: 'wasm-pack soporta tres objetivos: web, nodejs y bundler.', browserTitle: 'Cargar WASM en el navegador', browserDesc: 'Los módulos WASM deben inicializarse de forma asíncrona.', viteTitle: 'Integración con Vite', viteDesc: 'El plugin vite-plugin-wasm maneja la carga de WASM sin problemas.', cppTitle: 'C++ con Emscripten', cppDesc: 'Emscripten compila C y C++ a WebAssembly.', nodeTitle: 'WebAssembly en Node.js', nodeDesc: 'Node.js soporta WebAssembly desde v8.0.', useCasesTitle: 'Casos de uso reales', useCase1: 'Procesamiento de imágenes: Figma usa WASM para renderizado', useCase2: 'Codecs audio/video: FFmpeg compilado a WASM en el navegador', useCase3: 'Juegos: Unity, Godot y Unreal Engine exportan a WebAssembly', useCase4: 'Criptografía: implementaciones rápidas de curva elíptica y AES', useCase5: 'Edge computing: Cloudflare Workers y Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly rendimiento', bestPracticesTitle: 'Mejores prácticas', bp1: 'Minimizar los cruces de frontera JS↔WASM.', bp2: 'Usar memoria compartida con Web Workers para ejecución paralela.', bp3: 'Perfilar con Chrome DevTools WASM profiling.', bp4: 'Para Rust: activar wasm-opt en Cargo.toml.', bp5: 'Usar WebAssembly.instantiateStreaming() para módulos grandes.', faqTitle: 'Preguntas frecuentes', faq1q: '¿Es WebAssembly más rápido que JavaScript?', faq1a: 'Para tareas computacionalmente intensivas, WASM es típicamente 2-10x más rápido que JS optimizado.', faq2q: '¿Puedo usar WASM con React / Next.js?', faq2a: 'Sí. En Next.js, importa módulos WASM en un hook useEffect.', faq3q: '¿Qué lenguajes compilan a WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: '¿Es WASM seguro? ¿Puede acceder al sistema de archivos?', faq4a: 'WebAssembly se ejecuta en un sandbox. En navegadores, sin acceso sin puente JavaScript explícito.', faq5q: '¿Qué es WASI?', faq5a: 'WASI es una API estándar para ejecutar WASM fuera del navegador.', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'WebAssembly 2026年：Rust、C++とブラウザランタイム', intro: 'WebAssembly（WASM）は実験的技術から、Figma、Google Earth、Cloudflare Workersで使用される本番対応ランタイムに成熟しました。', rustTitle: 'RustをWebAssemblyにコンパイル', rustDesc: 'RustはWebAssembly開発の主要言語です。', buildTitle: 'ビルドとターゲット', buildDesc: 'wasm-packはweb、nodejs、bundlerの3つの出力ターゲットをサポートします。', browserTitle: 'ブラウザでWASMを読み込む', browserDesc: 'WASMモジュールは非同期で初期化する必要があります。', viteTitle: 'Viteとの統合', viteDesc: 'vite-plugin-wasmプラグインがWASMの読み込みをシームレスに処理します。', cppTitle: 'EmscriptenによるC++', cppDesc: 'EmscriptenはCとC++をWebAssemblyにコンパイルします。', nodeTitle: 'Node.jsのWebAssembly', nodeDesc: 'Node.jsはv8.0からWebAssemblyをサポートしています。', useCasesTitle: '実際のユースケース', useCase1: '画像処理：FigmaはWASMをレンダリングに使用', useCase2: 'オーディオ/ビデオコーデック：FFmpegがWASMとしてブラウザで動作', useCase3: 'ゲーム：Unity、Godot、Unreal EngineはWebAssemblyに出力', useCase4: '暗号：高速な楕円曲線とAES実装', useCase5: 'エッジコンピューティング：Cloudflare WorkersとFastly Compute', comparisonTitle: 'JavaScriptとWebAssemblyのパフォーマンス', bestPracticesTitle: 'ベストプラクティス', bp1: 'JS↔WASMの境界越えを最小化する。', bp2: 'Web WorkersとSharedArrayBufferで並列実行。', bp3: 'Chrome DevToolsのWASMプロファイリングでプロファイル。', bp4: 'Rust：Cargo.tomlでwasm-optを有効化。', bp5: 'WebAssembly.instantiateStreaming()で大型モジュールをストリーム。', faqTitle: 'よくある質問', faq1q: 'WebAssemblyはJavaScriptより速いですか？', faq1a: '計算集約型タスクでは、WASMは最適化されたJSより通常2-10倍速いです。', faq2q: 'React / Next.jsでWASMを使えますか？', faq2a: 'はい。Next.jsではuseEffectフックでWASMモジュールをインポートします。', faq3q: 'どの言語がWebAssemblyにコンパイルされますか？', faq3a: 'Rust、C/C++（Emscripten）、Go（tinygo）、AssemblyScript、Zig、Kotlin/Wasm、C#（Blazor）。', faq4q: 'WASMは安全ですか？ファイルシステムにアクセスできますか？', faq4a: 'WebAssemblyはサンドボックス環境で動作します。', faq5q: 'WASIとは何ですか？', faq5a: 'WASIはブラウザ外でWASMを実行するための標準APIです。', relatedTitle: '関連ツール' },
  ko: { title: 'WebAssembly 2026: Rust, C++와 브라우저 런타임', intro: 'WebAssembly(WASM)는 실험적 기술에서 Figma, Google Earth, Cloudflare Workers가 사용하는 프로덕션 런타임으로 성숙했습니다.', rustTitle: 'Rust를 WebAssembly로 컴파일', rustDesc: 'Rust는 WebAssembly 개발의 주요 언어입니다.', buildTitle: '빌드 및 타겟', buildDesc: 'wasm-pack은 web, nodejs, bundler 세 가지 출력 타겟을 지원합니다.', browserTitle: '브라우저에서 WASM 로드', browserDesc: 'WASM 모듈은 비동기적으로 초기화해야 합니다.', viteTitle: 'Vite 통합', viteDesc: 'vite-plugin-wasm 플러그인이 WASM 로딩을 원활하게 처리합니다.', cppTitle: 'Emscripten을 이용한 C++', cppDesc: 'Emscripten은 C와 C++를 WebAssembly로 컴파일합니다.', nodeTitle: 'Node.js의 WebAssembly', nodeDesc: 'Node.js는 v8.0부터 WebAssembly를 지원합니다.', useCasesTitle: '실제 사용 사례', useCase1: '이미지 처리: Figma는 렌더링에 WASM 사용', useCase2: '오디오/비디오 코덱: FFmpeg가 브라우저에서 WASM으로 실행', useCase3: '게임: Unity, Godot, Unreal Engine이 WebAssembly로 내보냄', useCase4: '암호화: 빠른 타원 곡선 및 AES 구현', useCase5: '엣지 컴퓨팅: Cloudflare Workers와 Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly 성능', bestPracticesTitle: '모범 사례', bp1: 'JS↔WASM 경계 교차를 최소화하세요.', bp2: 'Web Workers와 SharedArrayBuffer로 병렬 실행.', bp3: 'Chrome DevTools WASM 프로파일링으로 분석.', bp4: 'Rust: Cargo.toml에서 wasm-opt 활성화.', bp5: 'WebAssembly.instantiateStreaming()으로 대형 모듈 스트리밍.', faqTitle: '자주 묻는 질문', faq1q: 'WebAssembly가 JavaScript보다 빠른가요?', faq1a: '계산 집약적 작업에서 WASM은 최적화된 JS보다 보통 2-10배 빠릅니다.', faq2q: 'React / Next.js에서 WASM을 사용할 수 있나요?', faq2a: '네. Next.js에서는 useEffect 훅에서 WASM 모듈을 임포트합니다.', faq3q: '어떤 언어가 WebAssembly로 컴파일되나요?', faq3a: 'Rust, C/C++(Emscripten), Go(tinygo), AssemblyScript, Zig, Kotlin/Wasm, C#(Blazor).', faq4q: 'WASM은 안전한가요? 파일시스템에 접근할 수 있나요?', faq4a: 'WebAssembly는 샌드박스 환경에서 실행됩니다.', faq5q: 'WASI란 무엇인가요?', faq5a: 'WASI는 브라우저 외부에서 WASM을 실행하기 위한 표준 API입니다.', relatedTitle: '관련 도구' },
  pt: { title: 'WebAssembly em 2026: Rust, C++ e o runtime do navegador', intro: 'WebAssembly (WASM) evoluiu de tecnologia experimental para runtime de produção usado por Figma, Google Earth e Cloudflare Workers.', rustTitle: 'Compilar Rust para WebAssembly', rustDesc: 'Rust é a principal linguagem para desenvolvimento WebAssembly.', buildTitle: 'Build e alvos', buildDesc: 'wasm-pack suporta três alvos: web, nodejs e bundler.', browserTitle: 'Carregar WASM no navegador', browserDesc: 'Módulos WASM devem ser inicializados assincronamente.', viteTitle: 'Integração com Vite', viteDesc: 'O plugin vite-plugin-wasm gerencia o carregamento WASM.', cppTitle: 'C++ com Emscripten', cppDesc: 'Emscripten compila C e C++ para WebAssembly.', nodeTitle: 'WebAssembly no Node.js', nodeDesc: 'Node.js suporta WebAssembly desde v8.0.', useCasesTitle: 'Casos de uso reais', useCase1: 'Processamento de imagem: Figma usa WASM para renderização', useCase2: 'Codecs de áudio/vídeo: FFmpeg compilado para WASM no navegador', useCase3: 'Jogos: Unity, Godot e Unreal Engine exportam para WebAssembly', useCase4: 'Criptografia: implementações rápidas de curva elíptica e AES', useCase5: 'Edge computing: Cloudflare Workers e Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly desempenho', bestPracticesTitle: 'Boas práticas', bp1: 'Minimizar travessias de fronteira JS↔WASM.', bp2: 'Usar memória compartilhada com Web Workers para execução paralela.', bp3: 'Perfilar com Chrome DevTools WASM profiling.', bp4: 'Para Rust: ativar wasm-opt no Cargo.toml.', bp5: 'Usar WebAssembly.instantiateStreaming() para módulos grandes.', faqTitle: 'Perguntas frequentes', faq1q: 'WebAssembly é mais rápido que JavaScript?', faq1a: 'Para tarefas computacionalmente intensivas, WASM é tipicamente 2-10x mais rápido.', faq2q: 'Posso usar WASM com React / Next.js?', faq2a: 'Sim. No Next.js, importe módulos WASM em um hook useEffect.', faq3q: 'Quais linguagens compilam para WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'WASM é seguro? Pode acessar o sistema de arquivos?', faq4a: 'WebAssembly executa em sandbox. No navegador, sem acesso sem ponte JavaScript explícita.', faq5q: 'O que é WASI?', faq5a: 'WASI é uma API padrão para executar WASM fora do navegador.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'WebAssembly nel 2026: Rust, C++ e il runtime del browser', intro: 'WebAssembly (WASM) è maturato da tecnologia sperimentale a runtime di produzione usato da Figma, Google Earth e Cloudflare Workers.', rustTitle: 'Compilare Rust in WebAssembly', rustDesc: 'Rust è il linguaggio principale per lo sviluppo WebAssembly.', buildTitle: 'Build e target', buildDesc: 'wasm-pack supporta tre target: web, nodejs e bundler.', browserTitle: 'Caricare WASM nel browser', browserDesc: 'I moduli WASM devono essere inizializzati in modo asincrono.', viteTitle: 'Integrazione con Vite', viteDesc: 'Il plugin vite-plugin-wasm gestisce il caricamento WASM.', cppTitle: 'C++ con Emscripten', cppDesc: 'Emscripten compila C e C++ in WebAssembly.', nodeTitle: 'WebAssembly in Node.js', nodeDesc: 'Node.js supporta WebAssembly dalla v8.0.', useCasesTitle: 'Casi d\'uso reali', useCase1: 'Elaborazione immagini: Figma usa WASM per il rendering', useCase2: 'Codec audio/video: FFmpeg compilato in WASM nel browser', useCase3: 'Giochi: Unity, Godot e Unreal Engine esportano in WebAssembly', useCase4: 'Crittografia: implementazioni veloci di curva ellittica e AES', useCase5: 'Edge computing: Cloudflare Workers e Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly prestazioni', bestPracticesTitle: 'Best practice', bp1: 'Minimizzare gli attraversamenti del confine JS↔WASM.', bp2: 'Usare memoria condivisa con Web Workers per l\'esecuzione parallela.', bp3: 'Profilare con Chrome DevTools WASM profiling.', bp4: 'Per Rust: abilitare wasm-opt in Cargo.toml.', bp5: 'Usare WebAssembly.instantiateStreaming() per moduli grandi.', faqTitle: 'Domande frequenti', faq1q: 'WebAssembly è più veloce di JavaScript?', faq1a: 'Per task computazionalmente intensivi, WASM è tipicamente 2-10x più veloce.', faq2q: 'Posso usare WASM con React / Next.js?', faq2a: 'Sì. In Next.js, importa moduli WASM in un hook useEffect.', faq3q: 'Quali linguaggi compilano in WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'WASM è sicuro? Può accedere al filesystem?', faq4a: 'WebAssembly gira in sandbox. Nel browser, senza accesso senza bridge JavaScript esplicito.', faq5q: 'Cos\'è WASI?', faq5a: 'WASI è un\'API standard per eseguire WASM fuori dal browser.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'WebAssembly in 2026: Rust, C++ en de browserruntime', intro: 'WebAssembly (WASM) is geëvolueerd van experimentele technologie naar een productierijpe runtime die gebruikt wordt door Figma, Google Earth en Cloudflare Workers.', rustTitle: 'Rust compileren naar WebAssembly', rustDesc: 'Rust is de primaire taal voor WebAssembly-ontwikkeling.', buildTitle: 'Build en targets', buildDesc: 'wasm-pack ondersteunt drie output-targets: web, nodejs en bundler.', browserTitle: 'WASM laden in de browser', browserDesc: 'WASM-modules moeten asynchroon worden geïnitialiseerd.', viteTitle: 'Vite-integratie', viteDesc: 'De vite-plugin-wasm plugin handelt WASM-laden naadloos af.', cppTitle: 'C++ met Emscripten', cppDesc: 'Emscripten compileert C en C++ naar WebAssembly.', nodeTitle: 'WebAssembly in Node.js', nodeDesc: 'Node.js ondersteunt WebAssembly sinds v8.0.', useCasesTitle: 'Praktijkvoorbeelden', useCase1: 'Beeldverwerking: Figma gebruikt WASM voor rendering', useCase2: 'Audio-/videocodecs: FFmpeg als WASM in de browser', useCase3: 'Games: Unity, Godot en Unreal Engine exporteren naar WebAssembly', useCase4: 'Cryptografie: snelle elliptische curve en AES-implementaties', useCase5: 'Edge computing: Cloudflare Workers en Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly prestaties', bestPracticesTitle: 'Best practices', bp1: 'JS↔WASM-grensovergangen minimaliseren.', bp2: 'Gedeeld geheugen met Web Workers voor parallelle uitvoering.', bp3: 'Profileren met Chrome DevTools WASM profiling.', bp4: 'Voor Rust: wasm-opt in Cargo.toml inschakelen.', bp5: 'WebAssembly.instantiateStreaming() voor grote modules gebruiken.', faqTitle: 'Veelgestelde vragen', faq1q: 'Is WebAssembly sneller dan JavaScript?', faq1a: 'Voor rekenintensieve taken is WASM doorgaans 2-10x sneller dan geoptimaliseerd JS.', faq2q: 'Kan ik WASM gebruiken met React / Next.js?', faq2a: 'Ja. In Next.js WASM-modules importeren in een useEffect-hook.', faq3q: 'Welke talen compileren naar WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'Is WASM veilig? Heeft het toegang tot het bestandssysteem?', faq4a: 'WebAssembly draait in een sandbox. In browsers geen toegang zonder expliciete JavaScript-brug.', faq5q: 'Wat is WASI?', faq5a: 'WASI is een standaard-API voor het uitvoeren van WASM buiten de browser.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'WebAssembly w 2026: Rust, C++ i środowisko uruchomieniowe przeglądarki', intro: 'WebAssembly (WASM) dojrzał od eksperymentalnej technologii do gotowego do produkcji środowiska używanego przez Figma, Google Earth i Cloudflare Workers.', rustTitle: 'Kompilowanie Rusta do WebAssembly', rustDesc: 'Rust jest głównym językiem do tworzenia WebAssembly.', buildTitle: 'Build i cele', buildDesc: 'wasm-pack obsługuje trzy cele wyjściowe: web, nodejs i bundler.', browserTitle: 'Ładowanie WASM w przeglądarce', browserDesc: 'Moduły WASM muszą być inicjalizowane asynchronicznie.', viteTitle: 'Integracja z Vite', viteDesc: 'Plugin vite-plugin-wasm obsługuje ładowanie WASM bezproblemowo.', cppTitle: 'C++ z Emscripten', cppDesc: 'Emscripten kompiluje C i C++ do WebAssembly.', nodeTitle: 'WebAssembly w Node.js', nodeDesc: 'Node.js obsługuje WebAssembly od v8.0.', useCasesTitle: 'Praktyczne zastosowania', useCase1: 'Przetwarzanie obrazów: Figma używa WASM do renderowania', useCase2: 'Kodeki audio/wideo: FFmpeg jako WASM w przeglądarce', useCase3: 'Gry: Unity, Godot i Unreal Engine eksportują do WebAssembly', useCase4: 'Kryptografia: szybkie implementacje krzywej eliptycznej i AES', useCase5: 'Edge computing: Cloudflare Workers i Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly wydajność', bestPracticesTitle: 'Najlepsze praktyki', bp1: 'Minimalizować przejścia granicy JS↔WASM.', bp2: 'Używać pamięci współdzielonej z Web Workers do równoległego wykonania.', bp3: 'Profilować za pomocą Chrome DevTools WASM profiling.', bp4: 'Dla Rusta: włączyć wasm-opt w Cargo.toml.', bp5: 'Używać WebAssembly.instantiateStreaming() dla dużych modułów.', faqTitle: 'Często zadawane pytania', faq1q: 'Czy WebAssembly jest szybszy niż JavaScript?', faq1a: 'Dla zadań obliczeniowych WASM jest zazwyczaj 2-10x szybszy niż zoptymalizowany JS.', faq2q: 'Czy mogę używać WASM z React / Next.js?', faq2a: 'Tak. W Next.js importuj moduły WASM w hooku useEffect.', faq3q: 'Jakie języki kompilują się do WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'Czy WASM jest bezpieczny? Czy może uzyskać dostęp do systemu plików?', faq4a: 'WebAssembly działa w piaskownicy. W przeglądarkach brak dostępu bez explicite mostu JavaScript.', faq5q: 'Co to jest WASI?', faq5a: 'WASI to standardowe API do uruchamiania WASM poza przeglądarką.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'WebAssembly 2026: Rust, C++ och webbläsarens runtime', intro: 'WebAssembly (WASM) har mognat från experimentell teknik till en produktionsklar runtime som används av Figma, Google Earth och Cloudflare Workers.', rustTitle: 'Kompilera Rust till WebAssembly', rustDesc: 'Rust är det primära språket för WebAssembly-utveckling.', buildTitle: 'Build och targets', buildDesc: 'wasm-pack stöder tre utdatamål: web, nodejs och bundler.', browserTitle: 'Ladda WASM i webbläsaren', browserDesc: 'WASM-moduler måste initialiseras asynkront.', viteTitle: 'Vite-integration', viteDesc: 'Plugin-programmet vite-plugin-wasm hanterar WASM-laddning smidigt.', cppTitle: 'C++ med Emscripten', cppDesc: 'Emscripten kompilerar C och C++ till WebAssembly.', nodeTitle: 'WebAssembly i Node.js', nodeDesc: 'Node.js har stött WebAssembly sedan v8.0.', useCasesTitle: 'Verkliga användningsfall', useCase1: 'Bildbehandling: Figma använder WASM för rendering', useCase2: 'Audio-/videocodecs: FFmpeg som WASM i webbläsaren', useCase3: 'Spel: Unity, Godot och Unreal Engine exporterar till WebAssembly', useCase4: 'Kryptografi: snabba implementeringar av elliptiska kurvor och AES', useCase5: 'Edge computing: Cloudflare Workers och Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly prestanda', bestPracticesTitle: 'Bästa praxis', bp1: 'Minimera JS↔WASM-gränsövergångar.', bp2: 'Använda delat minne med Web Workers för parallell körning.', bp3: 'Profilera med Chrome DevTools WASM-profilering.', bp4: 'För Rust: aktivera wasm-opt i Cargo.toml.', bp5: 'Använda WebAssembly.instantiateStreaming() för stora moduler.', faqTitle: 'Vanliga frågor', faq1q: 'Är WebAssembly snabbare än JavaScript?', faq1a: 'För beräkningsintensiva uppgifter är WASM typiskt sett 2-10x snabbare än optimerat JS.', faq2q: 'Kan jag använda WASM med React / Next.js?', faq2a: 'Ja. I Next.js, importera WASM-moduler i en useEffect-hook.', faq3q: 'Vilka språk kompilerar till WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'Är WASM säkert? Kan det komma åt filsystemet?', faq4a: 'WebAssembly körs i en sandlåda. I webbläsare, ingen åtkomst utan explicit JavaScript-brygga.', faq5q: 'Vad är WASI?', faq5a: 'WASI är ett standard-API för att köra WASM utanför webbläsaren.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'WebAssembly i 2026: Rust, C++ og nettleserens runtime', intro: 'WebAssembly (WASM) har modnet fra eksperimentell teknologi til en produksjonsklar runtime brukt av Figma, Google Earth og Cloudflare Workers.', rustTitle: 'Kompilere Rust til WebAssembly', rustDesc: 'Rust er det primære språket for WebAssembly-utvikling.', buildTitle: 'Build og mål', buildDesc: 'wasm-pack støtter tre utdatamål: web, nodejs og bundler.', browserTitle: 'Laste WASM i nettleseren', browserDesc: 'WASM-moduler må initialiseres asynkront.', viteTitle: 'Vite-integrasjon', viteDesc: 'Plugin-en vite-plugin-wasm håndterer WASM-lasting sømløst.', cppTitle: 'C++ med Emscripten', cppDesc: 'Emscripten kompilerer C og C++ til WebAssembly.', nodeTitle: 'WebAssembly i Node.js', nodeDesc: 'Node.js har støttet WebAssembly siden v8.0.', useCasesTitle: 'Virkelige brukstilfeller', useCase1: 'Bildebehandling: Figma bruker WASM til rendering', useCase2: 'Audio-/videocodecs: FFmpeg som WASM i nettleseren', useCase3: 'Spill: Unity, Godot og Unreal Engine eksporterer til WebAssembly', useCase4: 'Kryptografi: raske implementasjoner av elliptisk kurve og AES', useCase5: 'Edge computing: Cloudflare Workers og Fastly Compute', comparisonTitle: 'JavaScript vs WebAssembly ytelse', bestPracticesTitle: 'Beste praksis', bp1: 'Minimere JS↔WASM-grenseoverganger.', bp2: 'Bruke delt minne med Web Workers for parallell kjøring.', bp3: 'Profilere med Chrome DevTools WASM-profilering.', bp4: 'For Rust: aktivere wasm-opt i Cargo.toml.', bp5: 'Bruke WebAssembly.instantiateStreaming() for store moduler.', faqTitle: 'Ofte stilte spørsmål', faq1q: 'Er WebAssembly raskere enn JavaScript?', faq1a: 'For beregningsintensive oppgaver er WASM typisk 2-10x raskere enn optimert JS.', faq2q: 'Kan jeg bruke WASM med React / Next.js?', faq2a: 'Ja. I Next.js, importer WASM-moduler i en useEffect-hook.', faq3q: 'Hvilke språk kompilerer til WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'Er WASM sikkert? Kan det få tilgang til filsystemet?', faq4a: 'WebAssembly kjører i en sandkasse. I nettlesere, ingen tilgang uten eksplisitt JavaScript-bro.', faq5q: 'Hva er WASI?', faq5a: 'WASI er et standard-API for å kjøre WASM utenfor nettleseren.', relatedTitle: 'Relaterte verktøy' },
  id: { title: 'WebAssembly di 2026: Rust, C++, dan Browser Runtime', intro: 'WebAssembly (WASM) telah matang dari teknologi eksperimental menjadi runtime siap produksi yang digunakan oleh Figma, Google Earth, dan Cloudflare Workers.', rustTitle: 'Mengkompilasi Rust ke WebAssembly', rustDesc: 'Rust adalah bahasa utama untuk pengembangan WebAssembly.', buildTitle: 'Build dan Target', buildDesc: 'wasm-pack mendukung tiga target output: web, nodejs, dan bundler.', browserTitle: 'Memuat WASM di Browser', browserDesc: 'Modul WASM harus diinisialisasi secara asinkron.', viteTitle: 'Integrasi Vite', viteDesc: 'Plugin vite-plugin-wasm menangani pemuatan WASM dengan mulus.', cppTitle: 'C++ dengan Emscripten', cppDesc: 'Emscripten mengkompilasi C dan C++ ke WebAssembly.', nodeTitle: 'WebAssembly di Node.js', nodeDesc: 'Node.js telah mendukung WebAssembly sejak v8.0.', useCasesTitle: 'Kasus Penggunaan Nyata', useCase1: 'Pemrosesan Gambar: Figma menggunakan WASM untuk rendering', useCase2: 'Codec Audio/Video: FFmpeg dikompilasi ke WASM di browser', useCase3: 'Game: Unity, Godot, dan Unreal Engine mengekspor ke WebAssembly', useCase4: 'Kriptografi: implementasi kurva eliptik dan AES yang cepat', useCase5: 'Edge Computing: Cloudflare Workers dan Fastly Compute', comparisonTitle: 'Performa JavaScript vs WebAssembly', bestPracticesTitle: 'Praktik Terbaik', bp1: 'Minimalkan penyeberangan batas JS↔WASM.', bp2: 'Gunakan memori bersama dengan Web Workers untuk eksekusi paralel.', bp3: 'Profil dengan Chrome DevTools WASM profiling.', bp4: 'Untuk Rust: aktifkan wasm-opt di Cargo.toml.', bp5: 'Gunakan WebAssembly.instantiateStreaming() untuk modul besar.', faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Apakah WebAssembly lebih cepat dari JavaScript?', faq1a: 'Untuk tugas komputasi berat, WASM biasanya 2-10x lebih cepat dari JS yang dioptimalkan.', faq2q: 'Bisakah saya menggunakan WASM dengan React / Next.js?', faq2a: 'Ya. Di Next.js, impor modul WASM di hook useEffect.', faq3q: 'Bahasa apa yang dikompilasi ke WebAssembly?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor).', faq4q: 'Apakah WASM aman? Bisakah mengakses filesystem?', faq4a: 'WebAssembly berjalan di lingkungan sandbox. Di browser, tidak ada akses tanpa jembatan JavaScript eksplisit.', faq5q: 'Apa itu WASI?', faq5a: 'WASI adalah API standar untuk menjalankan WASM di luar browser.', relatedTitle: 'Alat Terkait' },
  th: { title: 'WebAssembly ในปี 2026: Rust, C++ และ Browser Runtime', intro: 'WebAssembly (WASM) พัฒนาจากเทคโนโลยีทดลองสู่ runtime ระดับ production ที่ใช้โดย Figma, Google Earth และ Cloudflare Workers', rustTitle: 'คอมไพล์ Rust เป็น WebAssembly', rustDesc: 'Rust เป็นภาษาหลักสำหรับการพัฒนา WebAssembly', buildTitle: 'การ Build และ Targets', buildDesc: 'wasm-pack รองรับสาม output targets: web, nodejs และ bundler', browserTitle: 'โหลด WASM ในเบราว์เซอร์', browserDesc: 'WASM modules ต้องเริ่มต้นแบบ asynchronous', viteTitle: 'การรวมกับ Vite', viteDesc: 'plugin vite-plugin-wasm จัดการการโหลด WASM อย่างราบรื่น', cppTitle: 'C++ กับ Emscripten', cppDesc: 'Emscripten คอมไพล์ C และ C++ เป็น WebAssembly', nodeTitle: 'WebAssembly ใน Node.js', nodeDesc: 'Node.js รองรับ WebAssembly ตั้งแต่ v8.0', useCasesTitle: 'กรณีการใช้งานจริง', useCase1: 'การประมวลผลภาพ: Figma ใช้ WASM สำหรับการเรนเดอร์', useCase2: 'Codecs เสียง/วิดีโอ: FFmpeg คอมไพล์เป็น WASM ในเบราว์เซอร์', useCase3: 'เกม: Unity, Godot และ Unreal Engine ส่งออกเป็น WebAssembly', useCase4: 'การเข้ารหัส: การใช้งาน elliptic curve และ AES ที่รวดเร็ว', useCase5: 'Edge Computing: Cloudflare Workers และ Fastly Compute', comparisonTitle: 'ประสิทธิภาพ JavaScript vs WebAssembly', bestPracticesTitle: 'แนวปฏิบัติที่ดีที่สุด', bp1: 'ลดการข้ามขอบเขต JS↔WASM ให้น้อยที่สุด', bp2: 'ใช้หน่วยความจำที่แชร์กับ Web Workers สำหรับการประมวลผลแบบขนาน', bp3: 'วิเคราะห์ด้วย Chrome DevTools WASM profiling', bp4: 'สำหรับ Rust: เปิดใช้งาน wasm-opt ใน Cargo.toml', bp5: 'ใช้ WebAssembly.instantiateStreaming() สำหรับโมดูลขนาดใหญ่', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'WebAssembly เร็วกว่า JavaScript หรือไม่?', faq1a: 'สำหรับงานที่ต้องการการคำนวณมาก WASM มักเร็วกว่า JS ที่ปรับแต่งแล้ว 2-10 เท่า', faq2q: 'ฉันสามารถใช้ WASM กับ React / Next.js ได้ไหม?', faq2a: 'ได้ ใน Next.js นำเข้าโมดูล WASM ใน hook useEffect', faq3q: 'ภาษาใดที่คอมไพล์เป็น WebAssembly ได้?', faq3a: 'Rust, C/C++ (Emscripten), Go (tinygo), AssemblyScript, Zig, Kotlin/Wasm, C# (Blazor)', faq4q: 'WASM ปลอดภัยไหม? สามารถเข้าถึง filesystem ได้ไหม?', faq4a: 'WebAssembly ทำงานในสภาพแวดล้อม sandbox ในเบราว์เซอร์ ไม่มีการเข้าถึงโดยไม่มีสะพาน JavaScript', faq5q: 'WASI คืออะไร?', faq5a: 'WASI คือ API มาตรฐานสำหรับการเรียกใช้ WASM นอกเบราว์เซอร์', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function WebAssemblyGuide({ lang }: { lang: string }) {
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

  const perfRows = [
    { task: 'Image grayscale (4K)', js: '~180ms', wasm: '~22ms', speedup: '8x' },
    { task: 'SHA-256 hashing (1MB)', js: '~45ms', wasm: '~8ms', speedup: '5.6x' },
    { task: 'JSON parsing (10MB)', js: '~120ms', wasm: '~110ms', speedup: '1.1x' },
    { task: 'DOM manipulation (1000 nodes)', js: '~12ms', wasm: 'N/A (must call JS)', speedup: '—' },
    { task: 'Fibonacci (n=45)', js: '~12s', wasm: '~2.1s', speedup: '5.7x' },
    { task: 'Regex matching (large text)', js: '~35ms', wasm: '~15ms', speedup: '2.3x' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.rustTitle}</h2>
      <p>{t.rustDesc}</p>
      <pre style={preStyle}><code>{codeRustHello}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.buildTitle}</h2>
      <p>{t.buildDesc}</p>
      <pre style={preStyle}><code>{codeBuildWasm}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.browserTitle}</h2>
      <p>{t.browserDesc}</p>
      <pre style={preStyle}><code>{codeBrowserLoad}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.viteTitle}</h2>
      <p>{t.viteDesc}</p>
      <pre style={preStyle}><code>{codeViteConfig}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.cppTitle}</h2>
      <p>{t.cppDesc}</p>
      <pre style={preStyle}><code>{codeCppWasm}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.nodeTitle}</h2>
      <p>{t.nodeDesc}</p>
      <pre style={preStyle}><code>{codeNodeWasm}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.useCasesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.useCase1}</li>
        <li>{t.useCase2}</li>
        <li>{t.useCase3}</li>
        <li>{t.useCase4}</li>
        <li>{t.useCase5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Task</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>JavaScript</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>WebAssembly</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Speedup</th>
            </tr>
          </thead>
          <tbody>
            {perfRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.task}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.js}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.wasm}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 600, color: row.speedup !== '—' ? '#38a169' : undefined }}>{row.speedup}</td>
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
          <li><a href="/en/tools/base64" style={{ color: '#3182ce' }}>Base64 Encoder/Decoder</a></li>
          <li><a href="/en/tools/hash-generator" style={{ color: '#3182ce' }}>Hash Generator</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
