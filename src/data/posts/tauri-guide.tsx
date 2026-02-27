'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tauri Guide 2026: Build Lightweight Cross-Platform Desktop Apps with Rust and Web Technologies',
    intro: 'Tauri is an open-source framework for building lightweight, secure, cross-platform desktop applications using a Rust backend and any web frontend. Unlike Electron, Tauri does not bundle Chromium or Node.js, resulting in dramatically smaller binaries (often under 5 MB), lower memory usage, and a stronger security model. With Tauri 2.0, the framework extends beyond the desktop to support iOS and Android, making it a compelling choice for developers who want native performance and web development flexibility.',
    tldr: 'Tauri is a Rust-powered framework for building cross-platform desktop apps with web frontends (React, Vue, Svelte, SolidJS). It produces binaries under 5 MB, uses 50-80% less RAM than Electron, provides a granular permissions-based security model, and supports mobile platforms (iOS/Android) in Tauri 2.0. The Rust backend handles system APIs while the frontend renders in the OS native webview.',
    keyTakeaway1: 'Tauri apps are dramatically smaller than Electron apps because they use the OS native webview instead of bundling Chromium, often producing binaries under 5 MB.',
    keyTakeaway2: 'The Rust backend provides memory safety, high performance, and direct access to system APIs without garbage collection overhead.',
    keyTakeaway3: 'Tauri 2.0 introduces mobile support for iOS and Android, allowing a single codebase to target desktop and mobile platforms.',
    keyTakeaway4: 'A granular permissions system controls which system APIs the frontend can access, making Tauri apps more secure by default than Electron apps.',
    keyTakeaway5: 'Tauri works with any web frontend framework including React, Vue, Svelte, SolidJS, and plain HTML/CSS/JS.',
    keyTakeaway6: 'The plugin ecosystem provides ready-made modules for local storage, SQL databases, HTTP requests, file system access, shell commands, and auto-updates.',

    h2WhatIs: 'What Is Tauri and How Does It Work?',
    whatIsDesc: 'Tauri is a toolkit for building desktop applications where the user interface is built with web technologies (HTML, CSS, JavaScript) and the backend logic runs in Rust. Instead of shipping an entire browser engine like Electron does with Chromium, Tauri uses the webview already installed on the operating system: WebView2 on Windows, WebKit on macOS, and WebKitGTK on Linux.',
    whatIsDesc2: 'This architecture means Tauri apps inherit the rendering engine of the host OS while the Rust core handles system-level operations like file access, window management, and inter-process communication. The result is applications that are an order of magnitude smaller and consume significantly less memory than their Electron equivalents.',

    h2Comparison: 'Tauri vs Electron: A Detailed Comparison',
    comparisonDesc: 'The most common question developers ask is how Tauri compares to Electron. Here is a side-by-side breakdown of the key differences:',
    compFeature: 'Feature',
    compTauri: 'Tauri',
    compElectron: 'Electron',
    compLang: 'Backend Language',
    compTauriLang: 'Rust',
    compElectronLang: 'Node.js (JavaScript)',
    compEngine: 'Rendering Engine',
    compTauriEngine: 'OS native webview',
    compElectronEngine: 'Bundled Chromium',
    compSize: 'Binary Size (Hello World)',
    compTauriSize: '~3-5 MB',
    compElectronSize: '~150-200 MB',
    compMem: 'Memory Usage',
    compTauriMem: '~30-80 MB',
    compElectronMem: '~150-300 MB',
    compSecurity: 'Security Model',
    compTauriSecurity: 'Granular permissions',
    compElectronSecurity: 'Full Node.js access',
    compMobile: 'Mobile Support',
    compTauriMobile: 'iOS and Android (v2)',
    compElectronMobile: 'Not supported',
    compStartup: 'Cold Startup Time',
    compTauriStartup: '~0.5-1 second',
    compElectronStartup: '~2-5 seconds',
    compAutoUpdate: 'Auto-Update',
    compTauriAutoUpdate: 'Built-in plugin',
    compElectronAutoUpdate: 'electron-updater',

    h2Tauri2: 'What Is New in Tauri 2.0',
    tauri2Desc: 'Tauri 2.0 is a major release that restructures the framework around a plugin-based architecture and adds mobile platform support. The core has been rewritten to be more modular, and many features that were built-in to Tauri 1.x are now official plugins that you opt into.',
    tauri2Desc2: 'Key changes include a new permissions system that replaces the allowlist from v1, first-class support for building iOS and Android apps from the same codebase, Swift and Kotlin bindings for platform-specific mobile code, a multiwebview API for complex window layouts, and significantly improved IPC performance.',

    h2Setup: 'Project Setup with create-tauri-app',
    setupDesc: 'The fastest way to create a new Tauri project is with the official scaffolding tool. It supports multiple frontend frameworks and package managers out of the box.',

    h2Commands: 'Rust Commands and the Invoke System',
    commandsDesc: 'Tauri commands are Rust functions that the frontend can call through an IPC bridge. You define them in Rust with the #[tauri::command] attribute and invoke them from JavaScript using the invoke function. Commands can accept arguments, return values, and access application state.',
    commandsDesc2: 'Commands run on the Rust side, so they have full access to the file system, network, and any Rust crate. The IPC layer automatically serializes and deserializes arguments and return values using serde.',

    h2Events: 'Events System: Emit and Listen',
    eventsDesc: 'The events system provides bidirectional communication between the Rust backend and the web frontend. Events are useful for pushing data from Rust to the frontend (like progress updates or real-time notifications) and for sending messages between windows.',
    eventsDesc2: 'Events can be emitted globally (to all windows) or targeted to a specific window. The frontend can listen for events from Rust and vice versa, enabling reactive patterns without polling.',

    h2Windows: 'Window Management',
    windowsDesc: 'Tauri provides comprehensive APIs for creating and managing application windows. You can define windows in the configuration file or create them dynamically at runtime from either Rust or JavaScript. Tauri 2.0 also introduces a multiwebview API that allows multiple web views within a single window.',

    h2FileSystem: 'File System Access',
    fsDesc: 'Tauri provides file system access through the fs plugin with a scoped security model. Instead of giving the frontend unrestricted access to the entire file system, you define which directories and files the frontend is allowed to read or write through permissions.',

    h2Plugins: 'Plugins: Store, SQL, HTTP, Shell',
    pluginsDesc: 'Tauri 2.0 uses a plugin architecture where system capabilities are provided through official and community plugins. The most commonly used plugins include persistent storage, SQLite databases, HTTP clients, and shell command execution.',
    h3Store: 'Store Plugin (Persistent Key-Value Storage)',
    storeDesc: 'The store plugin provides a simple persistent key-value store backed by a JSON file. It is ideal for application settings, user preferences, and small data that needs to persist across sessions.',
    h3SQL: 'SQL Plugin (SQLite Database)',
    sqlDesc: 'The SQL plugin provides a SQLite database for structured data storage. It supports migrations, parameterized queries, and multiple database connections.',
    h3HTTP: 'HTTP Plugin',
    httpDesc: 'The HTTP plugin allows the frontend to make HTTP requests through the Rust backend, bypassing CORS restrictions and providing access to system certificates.',
    h3Shell: 'Shell Plugin',
    shellDesc: 'The shell plugin lets you spawn child processes and execute system commands from the frontend, with scoped permissions to control which commands are allowed.',

    h2Security: 'Security Model and Permissions',
    securityDesc: 'Security is a core design principle of Tauri. The framework implements a defense-in-depth approach with multiple layers: process isolation between the Rust backend and the webview frontend, a granular permissions system that controls API access, Content Security Policy (CSP) enforcement, and scope-based file system restrictions.',
    securityDesc2: 'In Tauri 2.0, the allowlist from v1 has been replaced by a more powerful permissions system. Each plugin defines its own permissions, and you explicitly grant the frontend access to specific capabilities in your configuration file.',

    h2Updater: 'Auto-Updater',
    updaterDesc: 'Tauri includes a built-in auto-update mechanism through the updater plugin. It supports differential updates, signature verification, and custom update endpoints. The updater checks a remote server for new versions and downloads updates in the background.',

    h2Building: 'Building and Distribution',
    buildingDesc: 'Tauri produces native application bundles for each target platform. On Windows it generates MSI and NSIS installers, on macOS it creates DMG and app bundles, and on Linux it produces AppImage and deb packages. Cross-compilation is supported through GitHub Actions.',

    h2Mobile: 'Mobile Support: iOS and Android',
    mobileDesc: 'Tauri 2.0 brings first-class mobile support, allowing you to build iOS and Android apps from the same codebase used for desktop. The mobile runtime uses WKWebView on iOS and Android WebView, with platform-specific code written in Swift and Kotlin respectively.',
    mobileDesc2: 'Mobile apps access native device features like the camera, GPS, biometrics, and push notifications through Tauri plugins. The development workflow includes hot-reload support for both platforms using the standard iOS Simulator and Android Emulator.',

    h2Frontend: 'Frontend Framework Integration',
    frontendDesc: 'Tauri is frontend-agnostic and works with any framework that produces HTML, CSS, and JavaScript. The most popular choices are React, Vue, Svelte, and SolidJS. Each can be scaffolded directly through create-tauri-app.',

    h2Performance: 'Performance and Bundle Size',
    perfDesc: 'Tauri delivers superior performance compared to Electron across all key metrics. Here are best practices for maximizing performance:',
    bp1: 'Use the OS native webview instead of bundling a browser engine to keep binary sizes under 5 MB.',
    bp2: 'Offload CPU-intensive work to Rust commands instead of running them in JavaScript for significant speed improvements.',
    bp3: 'Use the event system for real-time data streaming instead of polling with repeated invoke calls.',
    bp4: 'Scope file system permissions to only the directories your app needs to reduce the attack surface.',
    bp5: 'Enable the updater plugin with differential updates to minimize download sizes for users.',
    bp6: 'Use the store plugin for lightweight key-value data and the SQL plugin for structured data instead of file-based storage.',
    bp7: 'Leverage Tauri resource system for bundling static assets that the Rust backend needs to access.',
    bp8: 'Configure CSP headers to prevent XSS attacks and restrict which resources the webview can load.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Tauri used for?',
    faq1A: 'Tauri is used for building cross-platform desktop applications with web technologies. Common use cases include developer tools, productivity apps, dashboards, media players, file managers, and system utilities. With Tauri 2.0, it also supports building iOS and Android mobile applications from the same codebase.',
    faq2Q: 'Is Tauri better than Electron?',
    faq2A: 'Tauri produces significantly smaller binaries (3-5 MB vs 150+ MB), uses less memory (30-80 MB vs 150-300 MB), and has a stronger security model. However, Electron has a larger ecosystem, more mature tooling, and guaranteed cross-platform rendering consistency since it bundles Chromium. Choose Tauri for performance and security, Electron for maximum browser API compatibility.',
    faq3Q: 'Do I need to know Rust to use Tauri?',
    faq3A: 'Basic Tauri apps can be built with minimal Rust knowledge since the scaffolding tool generates the boilerplate. However, as your app grows, you will need Rust for custom commands, system integrations, and performance-critical backend logic. The Tauri command system uses straightforward Rust patterns that are accessible to developers learning the language.',
    faq4Q: 'Which frontend frameworks work with Tauri?',
    faq4A: 'Tauri works with any frontend framework that outputs HTML, CSS, and JavaScript. Officially supported scaffolding templates exist for React, Vue, Svelte, SolidJS, Angular, Preact, vanilla JavaScript, and vanilla TypeScript. You can also use meta-frameworks like Next.js, Nuxt, or SvelteKit in static export mode.',
    faq5Q: 'Does Tauri support mobile apps?',
    faq5A: 'Yes. Tauri 2.0 introduced first-class support for iOS and Android. You can build mobile apps from the same codebase used for desktop, using WKWebView on iOS and Android WebView. Platform-specific code is written in Swift and Kotlin, and native device features are accessed through Tauri plugins.',
    faq6Q: 'How does Tauri handle auto-updates?',
    faq6A: 'Tauri provides a built-in updater plugin that checks a remote endpoint for new versions. It supports signature verification to prevent tampered updates, differential updates to minimize download size, and custom update endpoints. You configure the update URL and public key in tauri.conf.json.',
    faq7Q: 'Is Tauri production-ready?',
    faq7A: 'Yes. Tauri 2.0 is stable and used in production by many companies. Notable apps built with Tauri include CrabNebula Cloud, Clash Verge (network proxy), Pake (web-to-desktop wrapper), and various enterprise internal tools. The framework is backed by the Tauri Foundation under the Commons Conservancy.',
    faq8Q: 'How do I access the file system in Tauri?',
    faq8A: 'Tauri provides file system access through the fs plugin with scoped permissions. You define which directories the app can access in the capabilities configuration, such as the app data directory, desktop, downloads, or custom paths. The frontend then uses the plugin API to read, write, and manage files within those scopes.',
  },
  zh: {
    title: 'Tauri 指南 2026：使用 Rust 和 Web 技术构建轻量级跨平台桌面应用',
    intro: 'Tauri 是一个开源框架，使用 Rust 后端和任意 Web 前端构建轻量、安全的跨平台桌面应用。与 Electron 不同，Tauri 不捆绑 Chromium 或 Node.js，因此二进制文件极小（通常低于 5 MB）、内存占用更低、安全模型更强。Tauri 2.0 将支持扩展到 iOS 和 Android，使其成为追求原生性能与 Web 开发灵活性的开发者的理想选择。',
    tldr: 'Tauri 是一个由 Rust 驱动的跨平台桌面应用框架，支持 React、Vue、Svelte、SolidJS 等 Web 前端。二进制文件低于 5 MB，内存占用比 Electron 少 50-80%，具有细粒度权限安全模型，Tauri 2.0 支持 iOS/Android 移动端。Rust 后端处理系统 API，前端在操作系统原生 webview 中渲染。',
    keyTakeaway1: 'Tauri 应用远小于 Electron，因为它使用操作系统原生 webview 而非捆绑 Chromium，二进制文件通常低于 5 MB。',
    keyTakeaway2: 'Rust 后端提供内存安全、高性能和直接系统 API 访问，无垃圾回收开销。',
    keyTakeaway3: 'Tauri 2.0 引入了 iOS 和 Android 移动端支持，单一代码库可同时覆盖桌面和移动平台。',
    keyTakeaway4: '细粒度权限系统控制前端可访问的系统 API，使 Tauri 应用默认比 Electron 更安全。',
    keyTakeaway5: 'Tauri 支持任意 Web 前端框架，包括 React、Vue、Svelte、SolidJS 和纯 HTML/CSS/JS。',
    keyTakeaway6: '插件生态提供本地存储、SQL 数据库、HTTP 请求、文件系统访问、Shell 命令和自动更新等即用模块。',

    h2WhatIs: '什么是 Tauri，它是如何工作的？',
    whatIsDesc: 'Tauri 是一个构建桌面应用的工具包，用户界面使用 Web 技术（HTML、CSS、JavaScript）构建，后端逻辑运行在 Rust 中。Tauri 使用操作系统自带的 webview：Windows 上的 WebView2、macOS 上的 WebKit、Linux 上的 WebKitGTK。',
    whatIsDesc2: '这种架构意味着 Tauri 应用继承宿主操作系统的渲染引擎，而 Rust 核心处理文件访问、窗口管理和进程间通信等系统级操作。结果是应用体积小一个数量级，内存消耗远低于 Electron 应用。',

    h2Comparison: 'Tauri vs Electron：详细对比',
    comparisonDesc: '开发者最常问的问题是 Tauri 和 Electron 有什么区别。以下是关键差异的对比：',
    compFeature: '特性',
    compTauri: 'Tauri',
    compElectron: 'Electron',
    compLang: '后端语言',
    compTauriLang: 'Rust',
    compElectronLang: 'Node.js (JavaScript)',
    compEngine: '渲染引擎',
    compTauriEngine: '操作系统原生 webview',
    compElectronEngine: '捆绑 Chromium',
    compSize: '二进制大小（Hello World）',
    compTauriSize: '~3-5 MB',
    compElectronSize: '~150-200 MB',
    compMem: '内存占用',
    compTauriMem: '~30-80 MB',
    compElectronMem: '~150-300 MB',
    compSecurity: '安全模型',
    compTauriSecurity: '细粒度权限',
    compElectronSecurity: '完整 Node.js 访问',
    compMobile: '移动端支持',
    compTauriMobile: 'iOS 和 Android（v2）',
    compElectronMobile: '不支持',
    compStartup: '冷启动时间',
    compTauriStartup: '~0.5-1 秒',
    compElectronStartup: '~2-5 秒',
    compAutoUpdate: '自动更新',
    compTauriAutoUpdate: '内置插件',
    compElectronAutoUpdate: 'electron-updater',

    h2Tauri2: 'Tauri 2.0 新特性',
    tauri2Desc: 'Tauri 2.0 是一个重大版本，围绕插件化架构重构了框架并添加了移动端支持。核心已重写为更模块化的设计，许多 Tauri 1.x 的内置功能现在是需要主动引入的官方插件。',
    tauri2Desc2: '主要变化包括替代 v1 allowlist 的新权限系统、一等 iOS 和 Android 支持、Swift 和 Kotlin 绑定、多 webview API 以及显著改进的 IPC 性能。',

    h2Setup: '使用 create-tauri-app 搭建项目',
    setupDesc: '创建新 Tauri 项目最快的方式是使用官方脚手架工具，开箱支持多种前端框架和包管理器。',

    h2Commands: 'Rust 命令与 Invoke 系统',
    commandsDesc: 'Tauri 命令是前端通过 IPC 桥调用的 Rust 函数。使用 #[tauri::command] 属性在 Rust 中定义，通过 invoke 从 JavaScript 调用。命令可以接受参数、返回值并访问应用状态。',
    commandsDesc2: '命令在 Rust 端运行，拥有对文件系统、网络和任何 Rust crate 的完整访问。IPC 层使用 serde 自动序列化和反序列化参数和返回值。',

    h2Events: '事件系统：Emit 与 Listen',
    eventsDesc: '事件系统提供 Rust 后端与 Web 前端之间的双向通信。事件适用于从 Rust 向前端推送数据（如进度更新或实时通知）以及窗口间通信。',
    eventsDesc2: '事件可以全局发射（到所有窗口）或定向到特定窗口。前端可以监听 Rust 的事件，反之亦然。',

    h2Windows: '窗口管理',
    windowsDesc: 'Tauri 提供创建和管理应用窗口的完整 API。可以在配置文件中定义窗口，也可以从 Rust 或 JavaScript 在运行时动态创建。Tauri 2.0 还引入了在单个窗口内支持多个 web view 的多 webview API。',

    h2FileSystem: '文件系统访问',
    fsDesc: 'Tauri 通过 fs 插件提供具有作用域安全模型的文件系统访问。不是给前端对整个文件系统的无限制访问，而是通过权限定义前端可以读写的目录和文件。',

    h2Plugins: '插件：Store、SQL、HTTP、Shell',
    pluginsDesc: 'Tauri 2.0 使用插件架构，系统能力通过官方和社区插件提供。最常用的插件包括持久化存储、SQLite 数据库、HTTP 客户端和 Shell 命令执行。',
    h3Store: 'Store 插件（持久化键值存储）',
    storeDesc: 'Store 插件提供基于 JSON 文件的简单持久化键值存储，适用于应用设置、用户偏好和需要跨会话持久化的小数据。',
    h3SQL: 'SQL 插件（SQLite 数据库）',
    sqlDesc: 'SQL 插件提供 SQLite 数据库用于结构化数据存储，支持迁移、参数化查询和多数据库连接。',
    h3HTTP: 'HTTP 插件',
    httpDesc: 'HTTP 插件允许前端通过 Rust 后端发起 HTTP 请求，绕过 CORS 限制并使用系统证书。',
    h3Shell: 'Shell 插件',
    shellDesc: 'Shell 插件允许生成子进程和执行系统命令，通过作用域权限控制允许的命令。',

    h2Security: '安全模型与权限',
    securityDesc: '安全是 Tauri 的核心设计原则。框架实现了纵深防御策略：Rust 后端与 webview 前端的进程隔离、细粒度权限系统、CSP 强制执行以及基于作用域的文件系统限制。',
    securityDesc2: 'Tauri 2.0 中，v1 的 allowlist 已被更强大的权限系统取代。每个插件定义自己的权限，在配置文件中显式授予前端对特定能力的访问。',

    h2Updater: '自动更新',
    updaterDesc: 'Tauri 通过 updater 插件内置自动更新机制，支持差量更新、签名验证和自定义更新端点。更新器检查远程服务器的新版本并在后台下载更新。',

    h2Building: '构建与分发',
    buildingDesc: 'Tauri 为每个目标平台生成原生应用包。Windows 生成 MSI 和 NSIS 安装程序，macOS 创建 DMG 和应用包，Linux 生成 AppImage 和 deb 包。通过 GitHub Actions 支持交叉编译。',

    h2Mobile: '移动端支持：iOS 和 Android',
    mobileDesc: 'Tauri 2.0 带来一等移动端支持，可以从桌面同一代码库构建 iOS 和 Android 应用。移动运行时在 iOS 上使用 WKWebView，Android 上使用 Android WebView，平台特定代码分别用 Swift 和 Kotlin 编写。',
    mobileDesc2: '移动应用通过 Tauri 插件访问相机、GPS、生物识别和推送通知等原生设备功能。开发工作流支持 iOS 模拟器和 Android 模拟器的热重载。',

    h2Frontend: '前端框架集成',
    frontendDesc: 'Tauri 与前端框架无关，支持任何输出 HTML、CSS 和 JavaScript 的框架。最流行的选择是 React、Vue、Svelte 和 SolidJS，均可通过 create-tauri-app 直接脚手架。',

    h2Performance: '性能与包体积',
    perfDesc: 'Tauri 在所有关键指标上都优于 Electron。以下是最大化性能的最佳实践：',
    bp1: '使用操作系统原生 webview 而非捆绑浏览器引擎，保持二进制大小低于 5 MB。',
    bp2: '将 CPU 密集型工作转移到 Rust 命令，而非在 JavaScript 中运行，可显著提升速度。',
    bp3: '使用事件系统进行实时数据推送，而非轮询式的 invoke 调用。',
    bp4: '将文件系统权限限定在应用所需的目录，以减少攻击面。',
    bp5: '启用带差量更新的 updater 插件，最小化用户的下载大小。',
    bp6: '轻量键值数据使用 Store 插件，结构化数据使用 SQL 插件，避免文件存储。',
    bp7: '利用 Tauri 资源系统捆绑 Rust 后端需要访问的静态资源。',
    bp8: '配置 CSP 头部防止 XSS 攻击，限制 webview 可加载的资源。',

    h2Faq: '常见问题',
    faq1Q: 'Tauri 用来做什么？',
    faq1A: 'Tauri 用于构建跨平台桌面应用，常见用例包括开发者工具、生产力应用、仪表盘、媒体播放器、文件管理器和系统工具。Tauri 2.0 还支持 iOS 和 Android 移动应用。',
    faq2Q: 'Tauri 比 Electron 好吗？',
    faq2A: 'Tauri 产生的二进制文件更小（3-5 MB vs 150+ MB）、内存更低、安全模型更强。但 Electron 生态更大、工具更成熟、跨平台渲染一致性更好。追求性能和安全选 Tauri，追求浏览器 API 兼容性选 Electron。',
    faq3Q: '使用 Tauri 需要会 Rust 吗？',
    faq3A: '基础 Tauri 应用只需少量 Rust 知识，脚手架工具会生成样板代码。但随着应用增长，需要 Rust 编写自定义命令、系统集成和性能关键的后端逻辑。',
    faq4Q: 'Tauri 支持哪些前端框架？',
    faq4A: 'Tauri 支持任何输出 HTML/CSS/JS 的前端框架。官方脚手架模板包括 React、Vue、Svelte、SolidJS、Angular、Preact、原生 JS 和 TypeScript。也可以使用 Next.js、Nuxt 等元框架的静态导出模式。',
    faq5Q: 'Tauri 支持移动端吗？',
    faq5A: '支持。Tauri 2.0 引入了 iOS 和 Android 一等支持，可从同一代码库构建移动应用，通过 Tauri 插件访问原生设备功能。',
    faq6Q: 'Tauri 如何处理自动更新？',
    faq6A: 'Tauri 内置 updater 插件检查远程端点的新版本，支持签名验证、差量更新和自定义更新端点。在 tauri.conf.json 中配置更新 URL 和公钥。',
    faq7Q: 'Tauri 可以用于生产吗？',
    faq7A: '可以。Tauri 2.0 已稳定并被许多公司在生产环境使用。CrabNebula Cloud、Clash Verge、Pake 等知名应用都基于 Tauri 构建。',
    faq8Q: '如何在 Tauri 中访问文件系统？',
    faq8A: 'Tauri 通过 fs 插件提供具有作用域权限的文件系统访问。在能力配置中定义应用可访问的目录，然后前端使用插件 API 在这些作用域内读写文件。',
  },
};

export default function TauriGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const sectionTitle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#e5e7eb' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.6' };
  const tableCell: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', textAlign: 'left' as const };
  const tableHeader: React.CSSProperties = { ...tableCell, fontWeight: 600, backgroundColor: '#f8fafc' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>{t.keyTakeaway1}</li>
          <li style={listItem}>{t.keyTakeaway2}</li>
          <li style={listItem}>{t.keyTakeaway3}</li>
          <li style={listItem}>{t.keyTakeaway4}</li>
          <li style={listItem}>{t.keyTakeaway5}</li>
          <li style={listItem}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* What Is Tauri */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'// Tauri Architecture Overview\n'
        + '//\n'
        + '// +---------------------------+\n'
        + '// |     Web Frontend          |\n'
        + '// |  (React/Vue/Svelte/etc)   |\n'
        + '// |     HTML + CSS + JS       |\n'
        + '// +---------------------------+\n'
        + '//           | IPC (invoke / events)\n'
        + '// +---------------------------+\n'
        + '// |     Tauri Core (Rust)     |\n'
        + '// |  Commands, Plugins, State |\n'
        + '// |  Window Mgmt, FS, Shell   |\n'
        + '// +---------------------------+\n'
        + '//           | OS APIs\n'
        + '// +---------------------------+\n'
        + '// |   OS Native Webview       |\n'
        + '// |  WebView2 / WebKit /      |\n'
        + '// |  WebKitGTK                |\n'
        + '// +---------------------------+'}</code></pre>

      {/* Tauri vs Electron */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
          <thead>
            <tr>
              <th style={tableHeader}>{t.compFeature}</th>
              <th style={tableHeader}>{t.compTauri}</th>
              <th style={tableHeader}>{t.compElectron}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tableCell}>{t.compLang}</td><td style={tableCell}>{t.compTauriLang}</td><td style={tableCell}>{t.compElectronLang}</td></tr>
            <tr><td style={tableCell}>{t.compEngine}</td><td style={tableCell}>{t.compTauriEngine}</td><td style={tableCell}>{t.compElectronEngine}</td></tr>
            <tr><td style={tableCell}>{t.compSize}</td><td style={tableCell}>{t.compTauriSize}</td><td style={tableCell}>{t.compElectronSize}</td></tr>
            <tr><td style={tableCell}>{t.compMem}</td><td style={tableCell}>{t.compTauriMem}</td><td style={tableCell}>{t.compElectronMem}</td></tr>
            <tr><td style={tableCell}>{t.compSecurity}</td><td style={tableCell}>{t.compTauriSecurity}</td><td style={tableCell}>{t.compElectronSecurity}</td></tr>
            <tr><td style={tableCell}>{t.compMobile}</td><td style={tableCell}>{t.compTauriMobile}</td><td style={tableCell}>{t.compElectronMobile}</td></tr>
            <tr><td style={tableCell}>{t.compStartup}</td><td style={tableCell}>{t.compTauriStartup}</td><td style={tableCell}>{t.compElectronStartup}</td></tr>
            <tr><td style={tableCell}>{t.compAutoUpdate}</td><td style={tableCell}>{t.compTauriAutoUpdate}</td><td style={tableCell}>{t.compElectronAutoUpdate}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Tauri 2.0 */}
      <h2 style={sectionTitle}>{t.h2Tauri2}</h2>
      <p style={para}>{t.tauri2Desc}</p>
      <p style={para}>{t.tauri2Desc2}</p>

      {/* Project Setup */}
      <h2 style={sectionTitle}>{t.h2Setup}</h2>
      <p style={para}>{t.setupDesc}</p>
      <pre style={codeBlock}><code>{'# Create a new Tauri project with the interactive CLI\n'
        + 'npm create tauri-app@latest\n'
        + '\n'
        + '# Or specify options directly\n'
        + 'npm create tauri-app@latest my-app -- \\\n'
        + '  --template react-ts\n'
        + '\n'
        + '# Available templates:\n'
        + '# vanilla, vanilla-ts, react, react-ts,\n'
        + '# vue, vue-ts, svelte, svelte-ts,\n'
        + '# solid, solid-ts, angular, preact, preact-ts\n'
        + '\n'
        + '# Project structure after scaffolding:\n'
        + '# my-app/\n'
        + '#   src/           <- frontend code (React/Vue/etc)\n'
        + '#   src-tauri/\n'
        + '#     src/\n'
        + '#       main.rs    <- Rust entry point\n'
        + '#       lib.rs     <- command definitions\n'
        + '#     Cargo.toml   <- Rust dependencies\n'
        + '#     tauri.conf.json  <- Tauri configuration\n'
        + '#     capabilities/    <- permissions config\n'
        + '#   package.json'}</code></pre>

      <pre style={codeBlock}><code>{'# Development commands\n'
        + 'cd my-app\n'
        + 'npm install\n'
        + '\n'
        + '# Start dev server with hot-reload\n'
        + 'npm run tauri dev\n'
        + '\n'
        + '# Build for production\n'
        + 'npm run tauri build\n'
        + '\n'
        + '# Add mobile targets\n'
        + 'npm run tauri android init\n'
        + 'npm run tauri ios init\n'
        + '\n'
        + '# Run on mobile\n'
        + 'npm run tauri android dev\n'
        + 'npm run tauri ios dev'}</code></pre>

      {/* Rust Commands */}
      <h2 style={sectionTitle}>{t.h2Commands}</h2>
      <p style={para}>{t.commandsDesc}</p>
      <p style={para}>{t.commandsDesc2}</p>
      <pre style={codeBlock}><code>{'// src-tauri/src/lib.rs\n'
        + 'use tauri::State;\n'
        + 'use std::sync::Mutex;\n'
        + '\n'
        + '// Simple command with arguments and return value\n'
        + '#[tauri::command]\n'
        + 'fn greet(name: &str) -> String {\n'
        + '    format!("Hello, {}! From Rust.", name)\n'
        + '}\n'
        + '\n'
        + '// Async command for I/O operations\n'
        + '#[tauri::command]\n'
        + 'async fn read_file(path: String) -> Result<String, String> {\n'
        + '    std::fs::read_to_string(&path)\n'
        + '        .map_err(|e| e.to_string())\n'
        + '}\n'
        + '\n'
        + '// Command with application state\n'
        + 'struct AppState {\n'
        + '    count: Mutex<i32>,\n'
        + '}\n'
        + '\n'
        + '#[tauri::command]\n'
        + 'fn increment(state: State<AppState>) -> i32 {\n'
        + '    let mut count = state.count.lock().unwrap();\n'
        + '    *count += 1;\n'
        + '    *count\n'
        + '}\n'
        + '\n'
        + '// Register commands in the app builder\n'
        + '#[cfg_attr(mobile, tauri::mobile_entry_point)]\n'
        + 'pub fn run() {\n'
        + '    tauri::Builder::default()\n'
        + '        .manage(AppState { count: Mutex::new(0) })\n'
        + '        .invoke_handler(tauri::generate_handler![\n'
        + '            greet, read_file, increment\n'
        + '        ])\n'
        + '        .run(tauri::generate_context!())\n'
        + '        .expect("error while running application");\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'// Frontend: calling Rust commands from JavaScript\n'
        + 'import { invoke } from "@tauri-apps/api/core";\n'
        + '\n'
        + '// Call the greet command\n'
        + 'const message = await invoke("greet", { name: "World" });\n'
        + 'console.log(message); // "Hello, World! From Rust."\n'
        + '\n'
        + '// Call async command with error handling\n'
        + 'try {\n'
        + '  const content = await invoke("read_file", {\n'
        + '    path: "/path/to/file.txt"\n'
        + '  });\n'
        + '  console.log(content);\n'
        + '} catch (error) {\n'
        + '  console.error("Failed to read file:", error);\n'
        + '}\n'
        + '\n'
        + '// Call stateful command\n'
        + 'const newCount = await invoke("increment");\n'
        + 'console.log("Count:", newCount);'}</code></pre>

      {/* Events System */}
      <h2 style={sectionTitle}>{t.h2Events}</h2>
      <p style={para}>{t.eventsDesc}</p>
      <p style={para}>{t.eventsDesc2}</p>
      <pre style={codeBlock}><code>{'// Rust: emitting events to the frontend\n'
        + 'use tauri::{AppHandle, Emitter};\n'
        + '\n'
        + '#[tauri::command]\n'
        + 'async fn process_files(\n'
        + '    app: AppHandle,\n'
        + '    paths: Vec<String>\n'
        + ') -> Result<(), String> {\n'
        + '    let total = paths.len();\n'
        + '    for (i, path) in paths.iter().enumerate() {\n'
        + '        // Process each file...\n'
        + '        std::thread::sleep(\n'
        + '            std::time::Duration::from_millis(100)\n'
        + '        );\n'
        + '\n'
        + '        // Emit progress event to frontend\n'
        + '        app.emit("progress", serde_json::json!({\n'
        + '            "current": i + 1,\n'
        + '            "total": total,\n'
        + '            "file": path\n'
        + '        })).map_err(|e| e.to_string())?;\n'
        + '    }\n'
        + '    Ok(())\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'// Frontend: listening for events from Rust\n'
        + 'import { listen } from "@tauri-apps/api/event";\n'
        + 'import { invoke } from "@tauri-apps/api/core";\n'
        + '\n'
        + '// Listen for progress events\n'
        + 'const unlisten = await listen("progress", (event) => {\n'
        + '  const { current, total, file } = event.payload;\n'
        + '  console.log("Processing " + current + "/" + total\n'
        + '    + ": " + file);\n'
        + '  updateProgressBar(current / total * 100);\n'
        + '});\n'
        + '\n'
        + '// Start the process\n'
        + 'await invoke("process_files", {\n'
        + '  paths: ["/file1.txt", "/file2.txt"]\n'
        + '});\n'
        + '\n'
        + '// Clean up listener when done\n'
        + 'unlisten();'}</code></pre>

      {/* Window Management */}
      <h2 style={sectionTitle}>{t.h2Windows}</h2>
      <p style={para}>{t.windowsDesc}</p>
      <pre style={codeBlock}><code>{'// Frontend: window management\n'
        + 'import { WebviewWindow } from "@tauri-apps/api/webviewWindow";\n'
        + 'import { getCurrentWindow } from "@tauri-apps/api/window";\n'
        + '\n'
        + '// Create a new window\n'
        + 'const webview = new WebviewWindow("settings", {\n'
        + '  url: "/settings",\n'
        + '  title: "Settings",\n'
        + '  width: 600,\n'
        + '  height: 400,\n'
        + '  resizable: true,\n'
        + '  center: true,\n'
        + '});\n'
        + '\n'
        + '// Control the current window\n'
        + 'const appWindow = getCurrentWindow();\n'
        + 'await appWindow.setTitle("My Tauri App");\n'
        + 'await appWindow.setSize({ width: 800, height: 600 });\n'
        + 'await appWindow.center();\n'
        + 'await appWindow.setAlwaysOnTop(true);\n'
        + '\n'
        + '// Minimize, maximize, close\n'
        + 'await appWindow.minimize();\n'
        + 'await appWindow.toggleMaximize();\n'
        + 'await appWindow.close();'}</code></pre>

      {/* File System */}
      <h2 style={sectionTitle}>{t.h2FileSystem}</h2>
      <p style={para}>{t.fsDesc}</p>
      <pre style={codeBlock}><code>{'// Frontend: file system operations\n'
        + 'import {\n'
        + '  readTextFile, writeTextFile,\n'
        + '  readDir, mkdir, remove\n'
        + '} from "@tauri-apps/plugin-fs";\n'
        + 'import { appDataDir, join } from "@tauri-apps/api/path";\n'
        + '\n'
        + '// Read a file from the app data directory\n'
        + 'const dataDir = await appDataDir();\n'
        + 'const configPath = await join(dataDir, "config.json");\n'
        + 'const content = await readTextFile(configPath);\n'
        + 'const config = JSON.parse(content);\n'
        + '\n'
        + '// Write a file\n'
        + 'await writeTextFile(\n'
        + '  await join(dataDir, "output.txt"),\n'
        + '  "Hello from Tauri!"\n'
        + ');\n'
        + '\n'
        + '// List directory contents\n'
        + 'const entries = await readDir(dataDir);\n'
        + 'for (const entry of entries) {\n'
        + '  console.log(entry.name, entry.isDirectory);\n'
        + '}\n'
        + '\n'
        + '// Create a directory\n'
        + 'await mkdir(await join(dataDir, "exports"), {\n'
        + '  recursive: true\n'
        + '});'}</code></pre>

      {/* Plugins */}
      <h2 style={sectionTitle}>{t.h2Plugins}</h2>
      <p style={para}>{t.pluginsDesc}</p>

      <h3 style={subTitle}>{t.h3Store}</h3>
      <p style={para}>{t.storeDesc}</p>
      <pre style={codeBlock}><code>{'# Install the store plugin\n'
        + 'npm run tauri add store\n'
        + '\n'
        + '// Frontend: using the store plugin\n'
        + 'import { load } from "@tauri-apps/plugin-store";\n'
        + '\n'
        + 'const store = await load("settings.json");\n'
        + '\n'
        + '// Set values\n'
        + 'await store.set("theme", "dark");\n'
        + 'await store.set("fontSize", 14);\n'
        + 'await store.set("user", {\n'
        + '  name: "Alice",\n'
        + '  email: "alice@example.com"\n'
        + '});\n'
        + '\n'
        + '// Get values\n'
        + 'const theme = await store.get("theme");\n'
        + 'const user = await store.get("user");\n'
        + '\n'
        + '// Persist to disk\n'
        + 'await store.save();\n'
        + '\n'
        + '// Listen for changes\n'
        + 'await store.onChange((key, value) => {\n'
        + '  console.log("Changed: " + key, value);\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3SQL}</h3>
      <p style={para}>{t.sqlDesc}</p>
      <pre style={codeBlock}><code>{'# Install the SQL plugin\n'
        + 'npm run tauri add sql\n'
        + '\n'
        + '// Frontend: using the SQL plugin\n'
        + 'import Database from "@tauri-apps/plugin-sql";\n'
        + '\n'
        + '// Connect to SQLite database\n'
        + 'const db = await Database.load(\n'
        + '  "sqlite:app.db"\n'
        + ');\n'
        + '\n'
        + '// Create table\n'
        + 'await db.execute(\n'
        + '  "CREATE TABLE IF NOT EXISTS notes ("\n'
        + '  + "id INTEGER PRIMARY KEY AUTOINCREMENT, "\n'
        + '  + "title TEXT NOT NULL, "\n'
        + '  + "content TEXT, "\n'
        + '  + "created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"\n'
        + ');\n'
        + '\n'
        + '// Insert data with parameters\n'
        + 'await db.execute(\n'
        + '  "INSERT INTO notes (title, content) VALUES (?, ?)",\n'
        + '  ["My Note", "Hello from Tauri SQL"]\n'
        + ');\n'
        + '\n'
        + '// Query data\n'
        + 'const notes = await db.select(\n'
        + '  "SELECT * FROM notes WHERE title LIKE ?",\n'
        + '  ["%My%"]\n'
        + ');'}</code></pre>

      <h3 style={subTitle}>{t.h3HTTP}</h3>
      <p style={para}>{t.httpDesc}</p>
      <pre style={codeBlock}><code>{'# Install the HTTP plugin\n'
        + 'npm run tauri add http\n'
        + '\n'
        + '// Frontend: making HTTP requests\n'
        + 'import { fetch } from "@tauri-apps/plugin-http";\n'
        + '\n'
        + '// GET request (bypasses CORS)\n'
        + 'const response = await fetch(\n'
        + '  "https://api.example.com/data",\n'
        + '  { method: "GET" }\n'
        + ');\n'
        + 'const data = await response.json();\n'
        + '\n'
        + '// POST request with JSON body\n'
        + 'const result = await fetch(\n'
        + '  "https://api.example.com/submit",\n'
        + '  {\n'
        + '    method: "POST",\n'
        + '    headers: {\n'
        + '      "Content-Type": "application/json"\n'
        + '    },\n'
        + '    body: JSON.stringify({ key: "value" })\n'
        + '  }\n'
        + ');'}</code></pre>

      <h3 style={subTitle}>{t.h3Shell}</h3>
      <p style={para}>{t.shellDesc}</p>
      <pre style={codeBlock}><code>{'# Install the shell plugin\n'
        + 'npm run tauri add shell\n'
        + '\n'
        + '// Frontend: executing shell commands\n'
        + 'import { Command } from "@tauri-apps/plugin-shell";\n'
        + '\n'
        + '// Run a command and get output\n'
        + 'const output = await Command.create(\n'
        + '  "git", ["status", "--short"]\n'
        + ').execute();\n'
        + 'console.log("stdout:", output.stdout);\n'
        + 'console.log("stderr:", output.stderr);\n'
        + '\n'
        + '// Stream output from long-running command\n'
        + 'const cmd = Command.create("ping", ["localhost"]);\n'
        + 'cmd.on("close", (data) => {\n'
        + '  console.log("Exited with code", data.code);\n'
        + '});\n'
        + 'cmd.stdout.on("data", (line) => {\n'
        + '  console.log("Output:", line);\n'
        + '});\n'
        + 'const child = await cmd.spawn();'}</code></pre>

      {/* Security */}
      <h2 style={sectionTitle}>{t.h2Security}</h2>
      <p style={para}>{t.securityDesc}</p>
      <p style={para}>{t.securityDesc2}</p>
      <pre style={codeBlock}><code>{'// src-tauri/capabilities/main.json\n'
        + '// Define what the frontend window can access\n'
        + '{\n'
        + '  "identifier": "main-capability",\n'
        + '  "description": "Main window permissions",\n'
        + '  "windows": ["main"],\n'
        + '  "permissions": [\n'
        + '    "core:default",\n'
        + '    "fs:default",\n'
        + '    "fs:allow-read-text-file",\n'
        + '    "fs:allow-write-text-file",\n'
        + '    {\n'
        + '      "identifier": "fs:scope",\n'
        + '      "allow": [\n'
        + '        { "path": "\\$APPDATA/**" },\n'
        + '        { "path": "\\$DOWNLOAD/**" }\n'
        + '      ]\n'
        + '    },\n'
        + '    "store:default",\n'
        + '    "sql:default",\n'
        + '    "shell:allow-execute",\n'
        + '    {\n'
        + '      "identifier": "shell:allow-spawn",\n'
        + '      "allow": [\n'
        + '        { "cmd": "git", "args": true },\n'
        + '        { "cmd": "node", "args": ["--version"] }\n'
        + '      ]\n'
        + '    },\n'
        + '    "http:default",\n'
        + '    {\n'
        + '      "identifier": "http:scope",\n'
        + '      "allow": [\n'
        + '        { "url": "https://api.example.com/**" }\n'
        + '      ]\n'
        + '    }\n'
        + '  ]\n'
        + '}'}</code></pre>

      {/* Auto-Updater */}
      <h2 style={sectionTitle}>{t.h2Updater}</h2>
      <p style={para}>{t.updaterDesc}</p>
      <pre style={codeBlock}><code>{'// tauri.conf.json - updater configuration\n'
        + '{\n'
        + '  "plugins": {\n'
        + '    "updater": {\n'
        + '      "pubkey": "YOUR_PUBLIC_KEY_HERE",\n'
        + '      "endpoints": [\n'
        + '        "https://releases.example.com/"\n'
        + '          + "{{target}}/{{arch}}/{{current_version}}"\n'
        + '      ],\n'
        + '      "windows": {\n'
        + '        "installMode": "passive"\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Frontend: check for updates\n'
        + 'import { check } from "@tauri-apps/plugin-updater";\n'
        + '\n'
        + 'const update = await check();\n'
        + 'if (update) {\n'
        + '  console.log("Update available: " + update.version);\n'
        + '  // Download and install\n'
        + '  await update.downloadAndInstall();\n'
        + '  // Restart the app to apply\n'
        + '  await import("@tauri-apps/plugin-process")\n'
        + '    .then(p => p.relaunch());\n'
        + '}'}</code></pre>

      {/* Building and Distribution */}
      <h2 style={sectionTitle}>{t.h2Building}</h2>
      <p style={para}>{t.buildingDesc}</p>
      <pre style={codeBlock}><code>{'# Build for the current platform\n'
        + 'npm run tauri build\n'
        + '\n'
        + '# Output locations:\n'
        + '# Windows: src-tauri/target/release/bundle/\n'
        + '#   msi/MyApp_1.0.0_x64.msi\n'
        + '#   nsis/MyApp_1.0.0_x64-setup.exe\n'
        + '#\n'
        + '# macOS: src-tauri/target/release/bundle/\n'
        + '#   dmg/MyApp_1.0.0_aarch64.dmg\n'
        + '#   macos/MyApp.app\n'
        + '#\n'
        + '# Linux: src-tauri/target/release/bundle/\n'
        + '#   appimage/MyApp_1.0.0_amd64.AppImage\n'
        + '#   deb/MyApp_1.0.0_amd64.deb\n'
        + '\n'
        + '# Build with debug info\n'
        + 'npm run tauri build -- --debug\n'
        + '\n'
        + '# Build for a specific target\n'
        + 'npm run tauri build -- --target aarch64-apple-darwin'}</code></pre>

      {/* Mobile Support */}
      <h2 style={sectionTitle}>{t.h2Mobile}</h2>
      <p style={para}>{t.mobileDesc}</p>
      <p style={para}>{t.mobileDesc2}</p>
      <pre style={codeBlock}><code>{'# Initialize mobile targets\n'
        + 'npm run tauri android init\n'
        + 'npm run tauri ios init\n'
        + '\n'
        + '# Development with hot-reload\n'
        + 'npm run tauri android dev\n'
        + 'npm run tauri ios dev\n'
        + '\n'
        + '# Build for mobile\n'
        + 'npm run tauri android build\n'
        + 'npm run tauri ios build\n'
        + '\n'
        + '# Platform-specific plugin (Swift for iOS)\n'
        + '// swift/Sources/ExamplePlugin.swift\n'
        + '// import Tauri\n'
        + '// class ExamplePlugin: Plugin {\n'
        + '//     @objc func getBatteryLevel(\n'
        + '//         _ invoke: Invoke\n'
        + '//     ) {\n'
        + '//         let level = UIDevice.current\n'
        + '//             .batteryLevel\n'
        + '//         invoke.resolve(["level": level])\n'
        + '//     }\n'
        + '// }'}</code></pre>

      {/* Frontend Framework Integration */}
      <h2 style={sectionTitle}>{t.h2Frontend}</h2>
      <p style={para}>{t.frontendDesc}</p>
      <pre style={codeBlock}><code>{'// React + Tauri example\n'
        + 'import { useState } from "react";\n'
        + 'import { invoke } from "@tauri-apps/api/core";\n'
        + '\n'
        + 'function App() {\n'
        + '  const [result, setResult] = useState("");\n'
        + '  const [name, setName] = useState("");\n'
        + '\n'
        + '  async function handleGreet() {\n'
        + '    const msg = await invoke("greet", { name });\n'
        + '    setResult(msg);\n'
        + '  }\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <input\n'
        + '        value={name}\n'
        + '        onChange={(e) => setName(e.target.value)}\n'
        + '        placeholder="Enter a name"\n'
        + '      />\n'
        + '      <button onClick={handleGreet}>Greet</button>\n'
        + '      <p>{result}</p>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'<!-- Vue + Tauri example -->\n'
        + '<script setup lang="ts">\n'
        + 'import { ref } from "vue";\n'
        + 'import { invoke } from "@tauri-apps/api/core";\n'
        + '\n'
        + 'const name = ref("");\n'
        + 'const result = ref("");\n'
        + '\n'
        + 'async function greet() {\n'
        + '  result.value = await invoke("greet", {\n'
        + '    name: name.value\n'
        + '  });\n'
        + '}\n'
        + '</script>\n'
        + '\n'
        + '<template>\n'
        + '  <input v-model="name" placeholder="Enter a name" />\n'
        + '  <button @click="greet">Greet</button>\n'
        + '  <p>{{ result }}</p>\n'
        + '</template>'}</code></pre>

      <pre style={codeBlock}><code>{'<!-- Svelte + Tauri example -->\n'
        + '<script>\n'
        + '  import { invoke } from "@tauri-apps/api/core";\n'
        + '\n'
        + '  let name = "";\n'
        + '  let result = "";\n'
        + '\n'
        + '  async function greet() {\n'
        + '    result = await invoke("greet", { name });\n'
        + '  }\n'
        + '</script>\n'
        + '\n'
        + '<input bind:value={name} placeholder="Enter a name" />\n'
        + '<button on:click={greet}>Greet</button>\n'
        + '<p>{result}</p>'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
      </ul>

      <pre style={codeBlock}><code>{'// Example: offload heavy work to Rust for performance\n'
        + '// Instead of processing in JavaScript:\n'
        + '// const result = heavyComputation(data); // Slow in JS\n'
        + '\n'
        + '// Define a Rust command for the heavy work\n'
        + '// src-tauri/src/lib.rs\n'
        + '#[tauri::command]\n'
        + 'fn process_data(input: Vec<f64>) -> Vec<f64> {\n'
        + '    input.iter()\n'
        + '        .map(|x| x.sqrt() * 2.0 + x.ln())\n'
        + '        .collect()\n'
        + '}\n'
        + '\n'
        + '// Call from frontend - runs at native speed\n'
        + '// const result = await invoke("process_data", {\n'
        + '//   input: largeDataSet\n'
        + '// });'}</code></pre>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
