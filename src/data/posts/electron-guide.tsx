'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Electron Guide 2026: Build Cross-Platform Desktop Apps with Web Technologies',
    intro: 'Electron is an open-source framework that lets you build cross-platform desktop applications using HTML, CSS, and JavaScript. Created by GitHub and now maintained by the OpenJS Foundation, Electron combines the Chromium rendering engine with the Node.js runtime to give web developers full access to native operating system APIs. Applications like Visual Studio Code, Slack, Discord, Figma, and Notion are all built with Electron, proving that web technologies can deliver production-quality desktop experiences on Windows, macOS, and Linux.',
    tldr: 'Electron enables building cross-platform desktop apps with web technologies (HTML, CSS, JS). It uses a multi-process architecture with a main process for native OS access and renderer processes for UI. Modern Electron enforces context isolation and preload scripts for security. Tools like electron-builder and electron-forge handle packaging and distribution. While Tauri offers smaller binaries, Electron provides mature ecosystem support, proven scalability (VS Code, Slack, Discord), and full Node.js access.',
    keyTakeaway1: 'Electron combines Chromium and Node.js, allowing web developers to build native desktop apps for Windows, macOS, and Linux from a single codebase.',
    keyTakeaway2: 'The multi-process architecture separates the main process (Node.js, native APIs) from renderer processes (web UI), improving security and stability.',
    keyTakeaway3: 'Context isolation and preload scripts are mandatory security patterns that prevent renderer processes from directly accessing Node.js APIs.',
    keyTakeaway4: 'IPC (Inter-Process Communication) via ipcMain and ipcRenderer is the safe way to communicate between main and renderer processes.',
    keyTakeaway5: 'electron-builder and electron-forge handle code signing, auto-updates, and packaging for all platforms with a single configuration.',
    keyTakeaway6: 'Electron apps can integrate React, Vue, or Svelte for the UI layer while having full access to native APIs like file system, notifications, tray, and menus.',

    h2WhatIs: 'What Is Electron and How Does It Work?',
    whatIsDesc: 'Electron is a framework for building desktop applications using web technologies. Under the hood, it bundles a Chromium browser to render your UI and a Node.js runtime to interact with the operating system. When a user launches your Electron app, it starts a main process that creates browser windows, each of which runs in its own renderer process. The main process has full access to Node.js APIs and native OS features, while renderer processes run your web-based UI in a sandboxed Chromium environment.',
    whatIsDesc2: 'This architecture means you can use any web framework (React, Vue, Svelte, Angular) for your UI and any npm package for backend logic. Electron handles the plumbing between your web code and the operating system, providing APIs for file system access, system notifications, native menus, keyboard shortcuts, auto-updates, and more.',

    h2Architecture: 'Electron Architecture: Main, Renderer, and Preload',
    archDesc: 'Electron uses a multi-process architecture inspired by Chromium. Understanding the three types of processes is essential for building secure, performant Electron apps.',
    h3MainProcess: 'Main Process',
    mainProcessDesc: 'The main process is the entry point of your application. It runs Node.js and has full access to the operating system. There is exactly one main process per application. It creates and manages BrowserWindow instances, handles native OS interactions (menus, dialogs, tray icons), and orchestrates the application lifecycle.',
    h3RendererProcess: 'Renderer Process',
    rendererProcessDesc: 'Each BrowserWindow runs in its own renderer process. This is essentially a Chromium browser tab that loads your HTML, CSS, and JavaScript. Renderer processes are sandboxed by default and cannot directly access Node.js APIs or the file system. This isolation is a critical security feature.',
    h3PreloadScripts: 'Preload Scripts',
    preloadDesc: 'Preload scripts bridge the gap between the main process and renderer process. They run in the renderer context but have access to a limited set of Node.js and Electron APIs. Using contextBridge, preload scripts selectively expose safe APIs to the renderer, creating a secure communication channel.',

    h2VsTauri: 'Electron vs Tauri: Detailed Comparison',
    vsTauriDesc: 'Tauri is the most common alternative to Electron. While both frameworks build cross-platform desktop apps with web UIs, they take fundamentally different approaches to the backend runtime and system integration.',
    compFeature: 'Feature',
    compElectron: 'Electron',
    compTauri: 'Tauri',
    compRuntime: 'Backend Runtime',
    compRuntimeE: 'Node.js (full npm ecosystem)',
    compRuntimeT: 'Rust (compiled binary)',
    compRendering: 'Rendering Engine',
    compRenderingE: 'Bundled Chromium',
    compRenderingT: 'System WebView (WRY)',
    compBinary: 'Binary Size',
    compBinaryE: '~150-200 MB',
    compBinaryT: '~3-10 MB',
    compMemory: 'Memory Usage',
    compMemoryE: '~100-300 MB baseline',
    compMemoryT: '~30-80 MB baseline',
    compLanguage: 'Backend Language',
    compLanguageE: 'JavaScript / TypeScript',
    compLanguageT: 'Rust',
    compEcosystem: 'Ecosystem',
    compEcosystemE: 'Mature, huge npm library support',
    compEcosystemT: 'Growing, Rust crate ecosystem',
    compSecurity: 'Security Model',
    compSecurityE: 'Process isolation + context isolation',
    compSecurityT: 'Rust safety + allowlist permissions',
    compApps: 'Notable Apps',
    compAppsE: 'VS Code, Slack, Discord, Figma',
    compAppsT: 'Emerging adoption',

    h2BrowserWindow: 'BrowserWindow API',
    browserWindowDesc: 'The BrowserWindow class is the primary way to create application windows. Each window is a full Chromium browser instance with its own renderer process. You can configure window dimensions, frame style, security settings, and much more through the constructor options.',

    h2IPC: 'IPC Communication: ipcMain and ipcRenderer',
    ipcDesc: 'Inter-Process Communication (IPC) is the mechanism for exchanging data between the main process and renderer processes. Since renderer processes are sandboxed, IPC is the only safe way to trigger native operations from your UI. Electron provides two primary IPC patterns.',
    h3OneWay: 'One-Way Messages (Renderer to Main)',
    oneWayDesc: 'Use ipcRenderer.send() in the preload script and ipcMain.on() in the main process for fire-and-forget messages.',
    h3TwoWay: 'Two-Way Messages (Invoke/Handle)',
    twoWayDesc: 'Use ipcRenderer.invoke() and ipcMain.handle() for request-response patterns. This is the recommended approach for most IPC communication.',

    h2ContextIsolation: 'Preload Scripts and Context Isolation',
    contextIsolationDesc: 'Context isolation is a security feature enabled by default since Electron 12. It ensures that preload scripts and the Electron internal logic run in a separate JavaScript context from the renderer page. This prevents the web page from accessing Electron internals or Node.js APIs directly.',
    contextIsolationDesc2: 'The contextBridge module provides a safe way to expose specific APIs from the preload script to the renderer. Only the functions you explicitly expose through contextBridge.exposeInMainWorld() are available to the renderer page.',

    h2AutoUpdater: 'Auto-Updater',
    autoUpdaterDesc: 'Electron provides built-in auto-update functionality through the autoUpdater module and the popular electron-updater package. Auto-updates allow you to push new versions to users without requiring them to manually download and install updates.',

    h2Packaging: 'Packaging and Distribution',
    packagingDesc: 'Packaging an Electron app involves bundling your application code with the Electron runtime into platform-specific installers. The two main tools for this are electron-builder and electron-forge.',
    h3ElectronBuilder: 'electron-builder',
    electronBuilderDesc: 'electron-builder is the most popular packaging tool. It supports creating installers for Windows (NSIS, MSI), macOS (DMG, PKG), and Linux (AppImage, DEB, RPM). It also handles code signing and notarization.',
    h3ElectronForge: 'electron-forge',
    electronForgeDesc: 'electron-forge is the official Electron packaging tool maintained by the Electron team. It provides a more opinionated workflow with built-in support for webpack, Vite, and TypeScript scaffolding.',

    h2NativeAPIs: 'Native APIs: Dialog, Menu, Tray, and Notifications',
    nativeAPIsDesc: 'Electron provides access to native operating system features that are unavailable in a regular browser. These APIs let your application feel like a first-class citizen on each platform.',
    h3Dialog: 'Dialog (File Picker)',
    dialogDesc: 'The dialog module provides methods for showing native system dialogs including file open, file save, message boxes, and error dialogs.',
    h3Menu: 'Application Menu and Context Menu',
    menuDesc: 'Electron supports both application menus (the menu bar at the top of the window or screen) and context menus (right-click menus). Menus are built from a template of MenuItems with roles, labels, accelerators, and click handlers.',
    h3Tray: 'System Tray',
    trayDesc: 'The Tray module lets you create an icon in the system tray (or menu bar on macOS) with a context menu. This is commonly used for background applications that run without a visible window.',
    h3Notifications: 'Notifications',
    notificationsDesc: 'Electron supports native OS notifications through the Notification class. Notifications can include a title, body, icon, and action buttons.',

    h2Security: 'Security Best Practices',
    securityDesc: 'Security is critical in Electron because your app has access to both the web and the operating system. Following these best practices protects your users from common attack vectors.',
    sec1: 'Always enable context isolation (contextIsolation: true) and sandbox mode (sandbox: true) for all BrowserWindows.',
    sec2: 'Never disable webSecurity. Keeping it enabled prevents cross-origin attacks and ensures CSP headers are respected.',
    sec3: 'Use contextBridge.exposeInMainWorld() to expose only specific, validated functions to the renderer.',
    sec4: 'Validate all IPC message arguments in the main process. Never trust data from the renderer.',
    sec5: 'Disable nodeIntegration in all renderer processes. Use preload scripts instead.',
    sec6: 'Set a strict Content Security Policy (CSP) that restricts script sources and prevents inline scripts.',
    sec7: 'Never load remote content in a BrowserWindow with node integration or without proper CSP.',
    sec8: 'Use session.defaultSession.webRequest to filter and block suspicious network requests.',

    h2Performance: 'Performance Optimization',
    perfDesc: 'Electron apps can consume significant memory and CPU. These techniques help reduce resource usage and improve startup time.',
    perf1: 'Lazy-load heavy modules and defer non-critical initialization to after the window is visible.',
    perf2: 'Use BrowserWindow show: false and show the window only after the ready-to-show event to avoid white flash.',
    perf3: 'Minimize the number of BrowserWindow instances. Each window creates a new Chromium renderer process.',
    perf4: 'Use V8 snapshots (via electron-link or custom snapshots) to reduce startup time by pre-compiling JavaScript.',
    perf5: 'Offload CPU-intensive work to worker threads (worker_threads) or child processes to keep the main process responsive.',
    perf6: 'Profile memory usage with Chrome DevTools and fix memory leaks from detached DOM nodes and uncleaned event listeners.',
    perf7: 'Bundle your renderer code with Vite or webpack and enable tree-shaking to reduce bundle size.',

    h2Frameworks: 'Integrating React, Vue, and Svelte',
    frameworksDesc: 'Electron is framework-agnostic for the renderer process. You can use any web framework for your UI. The most popular choices are React, Vue, and Svelte, each with dedicated Electron scaffolding tools.',
    h3React: 'React with Electron',
    reactDesc: 'Use electron-vite or create-electron-app with the Vite template to scaffold a React-based Electron application. Vite provides fast HMR during development.',
    h3Vue: 'Vue with Electron',
    vueDesc: 'electron-vite also supports Vue out of the box. Alternatively, use Vue CLI with the electron-builder plugin for a more traditional setup.',
    h3Svelte: 'Svelte with Electron',
    svelteDesc: 'Svelte pairs well with Electron because of its compiled output and small bundle size. Use electron-vite with the Svelte template for the fastest setup.',

    h2Testing: 'Testing Electron Applications',
    testingDesc: 'Testing Electron apps requires different strategies for unit tests, integration tests, and end-to-end tests. The most common tools are Playwright (with Electron support), Spectron (legacy), and standard test runners like Vitest for unit testing.',

    h2RealWorldApps: 'Real-World Applications Built with Electron',
    realWorldDesc: 'Electron powers some of the most widely-used desktop applications in the world. These examples demonstrate that Electron can scale to handle complex, performance-sensitive use cases.',
    app1: 'Visual Studio Code - The most popular code editor, used by millions of developers. Demonstrates that Electron can deliver high-performance text editing, extension systems, and integrated terminal functionality.',
    app2: 'Slack - Enterprise messaging platform used by millions of teams. Handles real-time messaging, file sharing, and video calls across Windows, macOS, and Linux.',
    app3: 'Discord - Gaming and community chat platform serving hundreds of millions of users. Features voice chat, video streaming, and rich media embedding.',
    app4: 'Figma Desktop - Professional design tool that uses Electron for its desktop wrapper while running the core rendering engine in WebAssembly for near-native performance.',
    app5: 'Notion - All-in-one workspace for notes, databases, and project management. Demonstrates complex rich-text editing and real-time collaboration in Electron.',
    app6: 'GitHub Desktop - Git client that simplifies version control workflows. A showcase for clean Electron architecture with React.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Electron used for?',
    faq1A: 'Electron is used for building cross-platform desktop applications with web technologies (HTML, CSS, JavaScript). It is ideal for teams that want to reuse web development skills for desktop apps. Common use cases include code editors (VS Code), messaging apps (Slack, Discord), productivity tools (Notion), and developer utilities.',
    faq2Q: 'Is Electron still a good choice in 2026?',
    faq2A: 'Yes. Despite competition from Tauri, Electron remains the most mature and widely-used framework for cross-platform desktop apps. It has the largest ecosystem, extensive documentation, and proven production track record with apps serving hundreds of millions of users. Electron continues to receive active updates improving security, performance, and Chromium compatibility.',
    faq3Q: 'Why are Electron apps so large?',
    faq3A: 'Electron apps bundle a full Chromium browser and Node.js runtime, which adds approximately 150-200 MB to the application size. This ensures consistent rendering across platforms but results in larger downloads compared to native apps. Techniques like ASAR archiving, code splitting, and compression can help reduce the total size.',
    faq4Q: 'How do I reduce Electron app memory usage?',
    faq4A: 'Minimize the number of BrowserWindow instances, lazy-load modules, use web workers for heavy computation, profile with Chrome DevTools to find memory leaks, and consider using the session partition feature to share resources between windows. Upgrading to the latest Electron version also brings Chromium memory optimizations.',
    faq5Q: 'Is Electron secure?',
    faq5A: 'Electron can be very secure when best practices are followed. Enable context isolation and sandbox mode, use preload scripts with contextBridge instead of nodeIntegration, validate all IPC messages, set strict Content Security Policies, and keep Electron updated to get the latest Chromium security patches.',
    faq6Q: 'Can I use TypeScript with Electron?',
    faq6A: 'Yes. Electron has excellent TypeScript support. Tools like electron-vite and electron-forge include TypeScript templates. Electron ships its own type definitions, and ipcMain/ipcRenderer can be fully typed for end-to-end type safety in your IPC communication.',
    faq7Q: 'How does Electron auto-update work?',
    faq7A: 'Electron auto-update uses the autoUpdater module or the electron-updater package. The app checks a remote server for new versions, downloads the update in the background, and prompts the user to restart. On macOS, updates use Squirrel. On Windows, NSIS or Squirrel handles the update process. You can host updates on GitHub Releases, S3, or a custom server.',
    faq8Q: 'Should I choose Electron or Tauri?',
    faq8A: 'Choose Electron if you need full Node.js and npm ecosystem access, have an existing web app to wrap, or need proven stability at scale. Choose Tauri if binary size and memory usage are critical, your team knows Rust, or you are building a lightweight utility. Electron has a larger ecosystem and more production deployments, while Tauri offers smaller binaries and lower resource consumption.',
  },
  zh: {
    title: 'Electron 指南 2026：使用 Web 技术构建跨平台桌面应用',
    intro: 'Electron 是一个开源框架，允许你使用 HTML、CSS 和 JavaScript 构建跨平台桌面应用程序。由 GitHub 创建，现由 OpenJS 基金会维护，Electron 将 Chromium 渲染引擎与 Node.js 运行时结合，为 Web 开发者提供对原生操作系统 API 的完整访问。Visual Studio Code、Slack、Discord、Figma 和 Notion 都是使用 Electron 构建的，证明了 Web 技术可以在 Windows、macOS 和 Linux 上提供生产级桌面体验。',
    tldr: 'Electron 支持使用 Web 技术（HTML、CSS、JS）构建跨平台桌面应用。它使用多进程架构，主进程访问原生 OS，渲染进程负责 UI。现代 Electron 强制使用上下文隔离和预加载脚本以确保安全。electron-builder 和 electron-forge 处理打包和分发。虽然 Tauri 提供更小的二进制文件，但 Electron 拥有成熟的生态系统、经过验证的可扩展性（VS Code、Slack、Discord）和完整的 Node.js 访问。',
    keyTakeaway1: 'Electron 结合 Chromium 和 Node.js，允许 Web 开发者从单一代码库构建 Windows、macOS 和 Linux 原生桌面应用。',
    keyTakeaway2: '多进程架构将主进程（Node.js、原生 API）与渲染进程（Web UI）分离，提高安全性和稳定性。',
    keyTakeaway3: '上下文隔离和预加载脚本是强制性安全模式，防止渲染进程直接访问 Node.js API。',
    keyTakeaway4: 'IPC（进程间通信）通过 ipcMain 和 ipcRenderer 是主进程和渲染进程之间安全通信的方式。',
    keyTakeaway5: 'electron-builder 和 electron-forge 通过单一配置处理代码签名、自动更新和跨平台打包。',
    keyTakeaway6: 'Electron 应用可以集成 React、Vue 或 Svelte 作为 UI 层，同时完全访问文件系统、通知、托盘和菜单等原生 API。',

    h2WhatIs: '什么是 Electron，它是如何工作的？',
    whatIsDesc: 'Electron 是一个使用 Web 技术构建桌面应用的框架。底层捆绑 Chromium 浏览器渲染 UI，Node.js 运行时与操作系统交互。启动 Electron 应用时，会启动一个主进程来创建浏览器窗口，每个窗口在自己的渲染进程中运行。',
    whatIsDesc2: '这种架构意味着你可以使用任何 Web 框架（React、Vue、Svelte、Angular）构建 UI，使用任何 npm 包处理后端逻辑。Electron 负责 Web 代码和操作系统之间的连接。',

    h2Architecture: 'Electron 架构：主进程、渲染进程和预加载',
    archDesc: 'Electron 使用受 Chromium 启发的多进程架构。理解三种进程类型对构建安全、高性能的 Electron 应用至关重要。',
    h3MainProcess: '主进程',
    mainProcessDesc: '主进程是应用的入口点，运行 Node.js 并完全访问操作系统。每个应用只有一个主进程，负责创建和管理 BrowserWindow 实例、处理原生 OS 交互和管理应用生命周期。',
    h3RendererProcess: '渲染进程',
    rendererProcessDesc: '每个 BrowserWindow 在自己的渲染进程中运行，本质上是加载 HTML、CSS 和 JavaScript 的 Chromium 浏览器标签。渲染进程默认沙箱化，不能直接访问 Node.js API。',
    h3PreloadScripts: '预加载脚本',
    preloadDesc: '预加载脚本是主进程和渲染进程之间的桥梁。它们在渲染上下文中运行，但可以访问有限的 Node.js 和 Electron API。通过 contextBridge 选择性地向渲染进程暴露安全 API。',

    h2VsTauri: 'Electron vs Tauri：详细对比',
    vsTauriDesc: 'Tauri 是 Electron 最常见的替代方案。虽然两者都使用 Web UI 构建跨平台桌面应用，但在后端运行时和系统集成方面采取了根本不同的方法。',
    compFeature: '特性',
    compElectron: 'Electron',
    compTauri: 'Tauri',
    compRuntime: '后端运行时',
    compRuntimeE: 'Node.js（完整 npm 生态）',
    compRuntimeT: 'Rust（编译二进制）',
    compRendering: '渲染引擎',
    compRenderingE: '捆绑 Chromium',
    compRenderingT: '系统 WebView (WRY)',
    compBinary: '二进制大小',
    compBinaryE: '~150-200 MB',
    compBinaryT: '~3-10 MB',
    compMemory: '内存使用',
    compMemoryE: '~100-300 MB 基线',
    compMemoryT: '~30-80 MB 基线',
    compLanguage: '后端语言',
    compLanguageE: 'JavaScript / TypeScript',
    compLanguageT: 'Rust',
    compEcosystem: '生态系统',
    compEcosystemE: '成熟，大量 npm 库支持',
    compEcosystemT: '成长中，Rust crate 生态',
    compSecurity: '安全模型',
    compSecurityE: '进程隔离 + 上下文隔离',
    compSecurityT: 'Rust 安全性 + 许可白名单',
    compApps: '知名应用',
    compAppsE: 'VS Code, Slack, Discord, Figma',
    compAppsT: '新兴采用',

    h2BrowserWindow: 'BrowserWindow API',
    browserWindowDesc: 'BrowserWindow 类是创建应用窗口的主要方式。每个窗口是一个完整的 Chromium 浏览器实例，可配置窗口尺寸、框架样式、安全设置等。',

    h2IPC: 'IPC 通信：ipcMain 和 ipcRenderer',
    ipcDesc: '进程间通信（IPC）是主进程和渲染进程之间交换数据的机制。由于渲染进程被沙箱化，IPC 是从 UI 触发原生操作的唯一安全方式。',
    h3OneWay: '单向消息（渲染进程到主进程）',
    oneWayDesc: '在预加载脚本中使用 ipcRenderer.send()，在主进程中使用 ipcMain.on() 发送即发即忘消息。',
    h3TwoWay: '双向消息（Invoke/Handle）',
    twoWayDesc: '使用 ipcRenderer.invoke() 和 ipcMain.handle() 实现请求-响应模式，这是大多数 IPC 通信的推荐方式。',

    h2ContextIsolation: '预加载脚本和上下文隔离',
    contextIsolationDesc: '上下文隔离是自 Electron 12 以来默认启用的安全特性。它确保预加载脚本和 Electron 内部逻辑在与渲染页面独立的 JavaScript 上下文中运行。',
    contextIsolationDesc2: 'contextBridge 模块提供安全的方式将预加载脚本中的特定 API 暴露给渲染进程。只有通过 contextBridge.exposeInMainWorld() 显式暴露的函数才可用。',

    h2AutoUpdater: '自动更新',
    autoUpdaterDesc: 'Electron 通过 autoUpdater 模块和流行的 electron-updater 包提供内置的自动更新功能，无需用户手动下载和安装更新。',

    h2Packaging: '打包和分发',
    packagingDesc: '打包 Electron 应用涉及将应用代码与 Electron 运行时捆绑为特定平台的安装程序。两个主要工具是 electron-builder 和 electron-forge。',
    h3ElectronBuilder: 'electron-builder',
    electronBuilderDesc: 'electron-builder 是最流行的打包工具，支持创建 Windows（NSIS、MSI）、macOS（DMG、PKG）和 Linux（AppImage、DEB、RPM）安装程序，还处理代码签名和公证。',
    h3ElectronForge: 'electron-forge',
    electronForgeDesc: 'electron-forge 是 Electron 团队维护的官方打包工具，提供更有主见的工作流，内置支持 webpack、Vite 和 TypeScript 脚手架。',

    h2NativeAPIs: '原生 API：对话框、菜单、托盘和通知',
    nativeAPIsDesc: 'Electron 提供对普通浏览器中不可用的原生操作系统功能的访问，让你的应用在每个平台上都像原生应用。',
    h3Dialog: '对话框（文件选择器）',
    dialogDesc: 'dialog 模块提供显示原生系统对话框的方法，包括文件打开、文件保存、消息框和错误对话框。',
    h3Menu: '应用菜单和上下文菜单',
    menuDesc: 'Electron 支持应用菜单（窗口或屏幕顶部的菜单栏）和上下文菜单（右键菜单），通过 MenuItem 模板构建。',
    h3Tray: '系统托盘',
    trayDesc: 'Tray 模块允许在系统托盘（macOS 上的菜单栏）中创建图标和上下文菜单，常用于没有可见窗口的后台应用。',
    h3Notifications: '通知',
    notificationsDesc: 'Electron 通过 Notification 类支持原生 OS 通知，可包含标题、正文、图标和操作按钮。',

    h2Security: '安全最佳实践',
    securityDesc: '安全在 Electron 中至关重要，因为应用同时访问 Web 和操作系统。遵循这些最佳实践可以保护用户免受常见攻击。',
    sec1: '始终为所有 BrowserWindow 启用上下文隔离（contextIsolation: true）和沙箱模式（sandbox: true）。',
    sec2: '永远不要禁用 webSecurity，保持启用可防止跨源攻击。',
    sec3: '使用 contextBridge.exposeInMainWorld() 只向渲染进程暴露特定的、经过验证的函数。',
    sec4: '在主进程中验证所有 IPC 消息参数，永远不信任来自渲染进程的数据。',
    sec5: '在所有渲染进程中禁用 nodeIntegration，改用预加载脚本。',
    sec6: '设置严格的内容安全策略（CSP）限制脚本来源并防止内联脚本。',
    sec7: '永远不要在启用 node integration 或没有适当 CSP 的 BrowserWindow 中加载远程内容。',
    sec8: '使用 session.defaultSession.webRequest 过滤和阻止可疑网络请求。',

    h2Performance: '性能优化',
    perfDesc: 'Electron 应用可能消耗大量内存和 CPU。这些技术有助于减少资源使用并改善启动时间。',
    perf1: '延迟加载重型模块，将非关键初始化推迟到窗口可见之后。',
    perf2: '使用 BrowserWindow show: false，仅在 ready-to-show 事件后显示窗口以避免白屏闪烁。',
    perf3: '最小化 BrowserWindow 实例数量，每个窗口创建一个新的 Chromium 渲染进程。',
    perf4: '使用 V8 快照减少启动时间，通过预编译 JavaScript。',
    perf5: '将 CPU 密集型工作卸载到 worker 线程或子进程以保持主进程响应。',
    perf6: '使用 Chrome DevTools 分析内存使用，修复分离的 DOM 节点和未清理的事件监听器导致的内存泄漏。',
    perf7: '使用 Vite 或 webpack 打包渲染进程代码并启用 tree-shaking 以减少包大小。',

    h2Frameworks: '集成 React、Vue 和 Svelte',
    frameworksDesc: 'Electron 的渲染进程与框架无关，你可以使用任何 Web 框架构建 UI。最流行的选择是 React、Vue 和 Svelte。',
    h3React: 'React 与 Electron',
    reactDesc: '使用 electron-vite 或带 Vite 模板的 create-electron-app 脚手架创建基于 React 的 Electron 应用。',
    h3Vue: 'Vue 与 Electron',
    vueDesc: 'electron-vite 也支持 Vue。或者使用 Vue CLI 配合 electron-builder 插件进行更传统的设置。',
    h3Svelte: 'Svelte 与 Electron',
    svelteDesc: 'Svelte 的编译输出和小包大小与 Electron 配合良好。使用带 Svelte 模板的 electron-vite 可快速搭建。',

    h2Testing: '测试 Electron 应用',
    testingDesc: '测试 Electron 应用需要不同的策略来进行单元测试、集成测试和端到端测试。最常用的工具是 Playwright（支持 Electron）和 Vitest 进行单元测试。',

    h2RealWorldApps: '使用 Electron 构建的真实应用',
    realWorldDesc: 'Electron 驱动着世界上最广泛使用的一些桌面应用。这些例子证明 Electron 可以处理复杂的、性能敏感的场景。',
    app1: 'Visual Studio Code - 最流行的代码编辑器，数百万开发者使用。证明 Electron 可以提供高性能文本编辑、扩展系统和集成终端功能。',
    app2: 'Slack - 数百万团队使用的企业消息平台。在 Windows、macOS 和 Linux 上处理实时消息、文件共享和视频通话。',
    app3: 'Discord - 服务数亿用户的游戏和社区聊天平台。支持语音聊天、视频流和富媒体嵌入。',
    app4: 'Figma Desktop - 专业设计工具，使用 Electron 作为桌面封装，核心渲染引擎运行在 WebAssembly 上以获得接近原生的性能。',
    app5: 'Notion - 笔记、数据库和项目管理的一体化工作空间。展示了 Electron 中复杂的富文本编辑和实时协作。',
    app6: 'GitHub Desktop - 简化版本控制工作流的 Git 客户端。使用 React 的干净 Electron 架构典范。',

    h2Faq: '常见问题',
    faq1Q: 'Electron 用来做什么？',
    faq1A: 'Electron 用于使用 Web 技术构建跨平台桌面应用。适合希望复用 Web 开发技能构建桌面应用的团队。常见用例包括代码编辑器（VS Code）、消息应用（Slack、Discord）、生产力工具（Notion）和开发者工具。',
    faq2Q: '2026 年 Electron 还是好的选择吗？',
    faq2A: '是的。尽管有 Tauri 的竞争，Electron 仍然是最成熟、使用最广泛的跨平台桌面应用框架。拥有最大的生态系统、广泛的文档和经过验证的生产记录。',
    faq3Q: '为什么 Electron 应用这么大？',
    faq3A: 'Electron 应用捆绑了完整的 Chromium 浏览器和 Node.js 运行时，大约增加 150-200 MB。这确保跨平台一致渲染，但导致下载体积较大。',
    faq4Q: '如何减少 Electron 应用的内存使用？',
    faq4A: '减少 BrowserWindow 实例数量、延迟加载模块、使用 web worker 处理密集计算、使用 Chrome DevTools 查找内存泄漏、升级到最新 Electron 版本。',
    faq5Q: 'Electron 安全吗？',
    faq5A: '遵循最佳实践时 Electron 可以非常安全。启用上下文隔离和沙箱模式，使用预加载脚本代替 nodeIntegration，验证所有 IPC 消息，设置严格的 CSP，保持 Electron 更新。',
    faq6Q: '可以在 Electron 中使用 TypeScript 吗？',
    faq6A: '可以。Electron 有出色的 TypeScript 支持。electron-vite 和 electron-forge 包含 TypeScript 模板，Electron 自带类型定义，IPC 通信可以完全类型化。',
    faq7Q: 'Electron 自动更新是如何工作的？',
    faq7A: 'Electron 自动更新使用 autoUpdater 模块或 electron-updater 包。应用检查远程服务器的新版本，后台下载更新，提示用户重启。可以使用 GitHub Releases、S3 或自定义服务器托管更新。',
    faq8Q: '应该选择 Electron 还是 Tauri？',
    faq8A: '如果需要完整的 Node.js 和 npm 生态访问、有现有 Web 应用要封装、或需要经过验证的大规模稳定性，选择 Electron。如果二进制大小和内存使用至关重要、团队熟悉 Rust、或构建轻量工具，选择 Tauri。',
  },
};

export default function ElectronGuide({ lang }: { lang: string }) {
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
  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', lineHeight: '1.5' };
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, background: '#f8fafc' };

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

      {/* What Is Electron */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'// main.js - Electron entry point\n'
        + 'const { app, BrowserWindow } = require("electron");\n'
        + 'const path = require("path");\n'
        + '\n'
        + 'function createWindow() {\n'
        + '  const win = new BrowserWindow({\n'
        + '    width: 1200,\n'
        + '    height: 800,\n'
        + '    webPreferences: {\n'
        + '      preload: path.join(__dirname, "preload.js"),\n'
        + '      contextIsolation: true,\n'
        + '      sandbox: true,\n'
        + '    },\n'
        + '  });\n'
        + '\n'
        + '  win.loadFile("index.html");\n'
        + '}\n'
        + '\n'
        + 'app.whenReady().then(createWindow);\n'
        + '\n'
        + 'app.on("window-all-closed", () => {\n'
        + '  if (process.platform !== "darwin") app.quit();\n'
        + '});\n'
        + '\n'
        + 'app.on("activate", () => {\n'
        + '  if (BrowserWindow.getAllWindows().length === 0) createWindow();\n'
        + '});'}</code></pre>

      {/* Architecture */}
      <h2 style={sectionTitle}>{t.h2Architecture}</h2>
      <p style={para}>{t.archDesc}</p>

      <h3 style={subTitle}>{t.h3MainProcess}</h3>
      <p style={para}>{t.mainProcessDesc}</p>

      <h3 style={subTitle}>{t.h3RendererProcess}</h3>
      <p style={para}>{t.rendererProcessDesc}</p>

      <h3 style={subTitle}>{t.h3PreloadScripts}</h3>
      <p style={para}>{t.preloadDesc}</p>
      <pre style={codeBlock}><code>{'// preload.js - Bridge between main and renderer\n'
        + 'const { contextBridge, ipcRenderer } = require("electron");\n'
        + '\n'
        + 'contextBridge.exposeInMainWorld("electronAPI", {\n'
        + '  // Expose specific functions, not the entire ipcRenderer\n'
        + '  openFile: () => ipcRenderer.invoke("dialog:openFile"),\n'
        + '  saveFile: (content) => ipcRenderer.invoke("dialog:saveFile", content),\n'
        + '  onUpdateAvailable: (callback) => {\n'
        + '    ipcRenderer.on("update-available", (_event, info) => callback(info));\n'
        + '  },\n'
        + '  getAppVersion: () => ipcRenderer.invoke("app:getVersion"),\n'
        + '});\n'
        + '\n'
        + '// renderer.js - Uses the exposed API\n'
        + '// window.electronAPI.openFile();\n'
        + '// window.electronAPI.saveFile("Hello World");'}</code></pre>

      {/* Electron vs Tauri */}
      <h2 style={sectionTitle}>{t.h2VsTauri}</h2>
      <p style={para}>{t.vsTauriDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.compFeature}</th>
              <th style={headerCell}>{t.compElectron}</th>
              <th style={headerCell}>{t.compTauri}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={cellStyle}>{t.compRuntime}</td><td style={cellStyle}>{t.compRuntimeE}</td><td style={cellStyle}>{t.compRuntimeT}</td></tr>
            <tr><td style={cellStyle}>{t.compRendering}</td><td style={cellStyle}>{t.compRenderingE}</td><td style={cellStyle}>{t.compRenderingT}</td></tr>
            <tr><td style={cellStyle}>{t.compBinary}</td><td style={cellStyle}>{t.compBinaryE}</td><td style={cellStyle}>{t.compBinaryT}</td></tr>
            <tr><td style={cellStyle}>{t.compMemory}</td><td style={cellStyle}>{t.compMemoryE}</td><td style={cellStyle}>{t.compMemoryT}</td></tr>
            <tr><td style={cellStyle}>{t.compLanguage}</td><td style={cellStyle}>{t.compLanguageE}</td><td style={cellStyle}>{t.compLanguageT}</td></tr>
            <tr><td style={cellStyle}>{t.compEcosystem}</td><td style={cellStyle}>{t.compEcosystemE}</td><td style={cellStyle}>{t.compEcosystemT}</td></tr>
            <tr><td style={cellStyle}>{t.compSecurity}</td><td style={cellStyle}>{t.compSecurityE}</td><td style={cellStyle}>{t.compSecurityT}</td></tr>
            <tr><td style={cellStyle}>{t.compApps}</td><td style={cellStyle}>{t.compAppsE}</td><td style={cellStyle}>{t.compAppsT}</td></tr>
          </tbody>
        </table>
      </div>

      {/* BrowserWindow API */}
      <h2 style={sectionTitle}>{t.h2BrowserWindow}</h2>
      <p style={para}>{t.browserWindowDesc}</p>
      <pre style={codeBlock}><code>{'const { BrowserWindow, screen } = require("electron");\n'
        + '\n'
        + '// Create a frameless, transparent window\n'
        + 'const overlay = new BrowserWindow({\n'
        + '  width: 400,\n'
        + '  height: 300,\n'
        + '  frame: false,\n'
        + '  transparent: true,\n'
        + '  alwaysOnTop: true,\n'
        + '  webPreferences: {\n'
        + '    preload: path.join(__dirname, "preload.js"),\n'
        + '    contextIsolation: true,\n'
        + '    sandbox: true,\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// Create a window that remembers its position\n'
        + 'const mainWin = new BrowserWindow({\n'
        + '  width: 1200,\n'
        + '  height: 800,\n'
        + '  minWidth: 800,\n'
        + '  minHeight: 600,\n'
        + '  show: false, // Prevent white flash\n'
        + '  backgroundColor: "#1e1e1e",\n'
        + '  titleBarStyle: "hiddenInset", // macOS traffic lights\n'
        + '  webPreferences: {\n'
        + '    preload: path.join(__dirname, "preload.js"),\n'
        + '    contextIsolation: true,\n'
        + '    sandbox: true,\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// Show window when ready to avoid white flash\n'
        + 'mainWin.once("ready-to-show", () => {\n'
        + '  mainWin.show();\n'
        + '});'}</code></pre>

      {/* IPC Communication */}
      <h2 style={sectionTitle}>{t.h2IPC}</h2>
      <p style={para}>{t.ipcDesc}</p>

      <h3 style={subTitle}>{t.h3OneWay}</h3>
      <p style={para}>{t.oneWayDesc}</p>
      <pre style={codeBlock}><code>{'// preload.js - One-way message\n'
        + 'const { contextBridge, ipcRenderer } = require("electron");\n'
        + '\n'
        + 'contextBridge.exposeInMainWorld("electronAPI", {\n'
        + '  sendNotification: (title, body) => {\n'
        + '    ipcRenderer.send("show-notification", { title, body });\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// main.js - Handle one-way message\n'
        + 'const { ipcMain, Notification } = require("electron");\n'
        + '\n'
        + 'ipcMain.on("show-notification", (_event, { title, body }) => {\n'
        + '  new Notification({ title, body }).show();\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3TwoWay}</h3>
      <p style={para}>{t.twoWayDesc}</p>
      <pre style={codeBlock}><code>{'// preload.js - Two-way invoke/handle\n'
        + 'contextBridge.exposeInMainWorld("electronAPI", {\n'
        + '  readFile: (filePath) => ipcRenderer.invoke("fs:readFile", filePath),\n'
        + '  writeFile: (filePath, data) => ipcRenderer.invoke("fs:writeFile", filePath, data),\n'
        + '  listDir: (dirPath) => ipcRenderer.invoke("fs:listDir", dirPath),\n'
        + '});\n'
        + '\n'
        + '// main.js - Handle invoke requests\n'
        + 'const fs = require("fs/promises");\n'
        + '\n'
        + 'ipcMain.handle("fs:readFile", async (_event, filePath) => {\n'
        + '  // Validate the path before reading\n'
        + '  if (!filePath.startsWith(app.getPath("userData"))) {\n'
        + '    throw new Error("Access denied: path outside user data");\n'
        + '  }\n'
        + '  return fs.readFile(filePath, "utf-8");\n'
        + '});\n'
        + '\n'
        + 'ipcMain.handle("fs:writeFile", async (_event, filePath, data) => {\n'
        + '  if (!filePath.startsWith(app.getPath("userData"))) {\n'
        + '    throw new Error("Access denied: path outside user data");\n'
        + '  }\n'
        + '  await fs.writeFile(filePath, data, "utf-8");\n'
        + '  return { success: true };\n'
        + '});\n'
        + '\n'
        + '// renderer.js - Using the API\n'
        + '// const content = await window.electronAPI.readFile("/path/to/file");\n'
        + '// await window.electronAPI.writeFile("/path/to/file", "new content");'}</code></pre>

      {/* Context Isolation */}
      <h2 style={sectionTitle}>{t.h2ContextIsolation}</h2>
      <p style={para}>{t.contextIsolationDesc}</p>
      <p style={para}>{t.contextIsolationDesc2}</p>
      <pre style={codeBlock}><code>{'// preload.js - Secure API exposure with contextBridge\n'
        + 'const { contextBridge, ipcRenderer } = require("electron");\n'
        + '\n'
        + '// GOOD: Expose specific functions with validation\n'
        + 'contextBridge.exposeInMainWorld("api", {\n'
        + '  getSettings: () => ipcRenderer.invoke("get-settings"),\n'
        + '  saveSettings: (settings) => {\n'
        + '    // Validate data before sending to main process\n'
        + '    if (typeof settings !== "object") throw new Error("Invalid settings");\n'
        + '    return ipcRenderer.invoke("save-settings", settings);\n'
        + '  },\n'
        + '  onThemeChange: (callback) => {\n'
        + '    const handler = (_event, theme) => callback(theme);\n'
        + '    ipcRenderer.on("theme-changed", handler);\n'
        + '    // Return cleanup function\n'
        + '    return () => ipcRenderer.removeListener("theme-changed", handler);\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// BAD: Never expose the entire ipcRenderer\n'
        + '// contextBridge.exposeInMainWorld("ipc", ipcRenderer); // DANGEROUS!'}</code></pre>

      {/* Auto-Updater */}
      <h2 style={sectionTitle}>{t.h2AutoUpdater}</h2>
      <p style={para}>{t.autoUpdaterDesc}</p>
      <pre style={codeBlock}><code>{'// main.js - Auto-update with electron-updater\n'
        + 'const { autoUpdater } = require("electron-updater");\n'
        + '\n'
        + 'autoUpdater.autoDownload = false;\n'
        + 'autoUpdater.autoInstallOnAppQuit = true;\n'
        + '\n'
        + 'app.whenReady().then(() => {\n'
        + '  autoUpdater.checkForUpdates();\n'
        + '});\n'
        + '\n'
        + 'autoUpdater.on("update-available", (info) => {\n'
        + '  // Notify renderer about the update\n'
        + '  mainWindow.webContents.send("update-available", info.version);\n'
        + '});\n'
        + '\n'
        + 'autoUpdater.on("download-progress", (progress) => {\n'
        + '  mainWindow.webContents.send("download-progress", progress.percent);\n'
        + '});\n'
        + '\n'
        + 'autoUpdater.on("update-downloaded", () => {\n'
        + '  mainWindow.webContents.send("update-ready");\n'
        + '});\n'
        + '\n'
        + '// IPC handler to trigger download and install\n'
        + 'ipcMain.handle("download-update", () => autoUpdater.downloadUpdate());\n'
        + 'ipcMain.handle("install-update", () => autoUpdater.quitAndInstall());'}</code></pre>

      {/* Packaging */}
      <h2 style={sectionTitle}>{t.h2Packaging}</h2>
      <p style={para}>{t.packagingDesc}</p>

      <h3 style={subTitle}>{t.h3ElectronBuilder}</h3>
      <p style={para}>{t.electronBuilderDesc}</p>
      <pre style={codeBlock}><code>{'// package.json - electron-builder configuration\n'
        + '{\n'
        + '  "name": "my-electron-app",\n'
        + '  "version": "1.0.0",\n'
        + '  "main": "dist/main.js",\n'
        + '  "build": {\n'
        + '    "appId": "com.example.myapp",\n'
        + '    "productName": "My App",\n'
        + '    "directories": { "output": "release" },\n'
        + '    "mac": {\n'
        + '      "category": "public.app-category.developer-tools",\n'
        + '      "target": ["dmg", "zip"],\n'
        + '      "hardenedRuntime": true,\n'
        + '      "notarize": true\n'
        + '    },\n'
        + '    "win": {\n'
        + '      "target": ["nsis"],\n'
        + '      "signingHashAlgorithms": ["sha256"]\n'
        + '    },\n'
        + '    "linux": {\n'
        + '      "target": ["AppImage", "deb"],\n'
        + '      "category": "Development"\n'
        + '    },\n'
        + '    "publish": {\n'
        + '      "provider": "github",\n'
        + '      "owner": "your-username",\n'
        + '      "repo": "your-repo"\n'
        + '    }\n'
        + '  },\n'
        + '  "scripts": {\n'
        + '    "build": "tsc && electron-builder",\n'
        + '    "build:mac": "tsc && electron-builder --mac",\n'
        + '    "build:win": "tsc && electron-builder --win",\n'
        + '    "build:linux": "tsc && electron-builder --linux"\n'
        + '  }\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3ElectronForge}</h3>
      <p style={para}>{t.electronForgeDesc}</p>
      <pre style={codeBlock}><code>{'# Create a new Electron Forge project\n'
        + 'npm init electron-app@latest my-app -- --template=vite-typescript\n'
        + '\n'
        + '# Build and package\n'
        + 'npm run make\n'
        + '\n'
        + '# Publish to GitHub Releases\n'
        + 'npm run publish'}</code></pre>

      {/* Native APIs */}
      <h2 style={sectionTitle}>{t.h2NativeAPIs}</h2>
      <p style={para}>{t.nativeAPIsDesc}</p>

      <h3 style={subTitle}>{t.h3Dialog}</h3>
      <p style={para}>{t.dialogDesc}</p>
      <pre style={codeBlock}><code>{'// main.js - File dialog examples\n'
        + 'const { dialog } = require("electron");\n'
        + '\n'
        + 'ipcMain.handle("dialog:openFile", async () => {\n'
        + '  const result = await dialog.showOpenDialog(mainWindow, {\n'
        + '    properties: ["openFile", "multiSelections"],\n'
        + '    filters: [\n'
        + '      { name: "Documents", extensions: ["txt", "md", "json"] },\n'
        + '      { name: "Images", extensions: ["png", "jpg", "gif"] },\n'
        + '      { name: "All Files", extensions: ["*"] },\n'
        + '    ],\n'
        + '  });\n'
        + '  return result.canceled ? null : result.filePaths;\n'
        + '});\n'
        + '\n'
        + 'ipcMain.handle("dialog:saveFile", async (_event, content) => {\n'
        + '  const result = await dialog.showSaveDialog(mainWindow, {\n'
        + '    defaultPath: "untitled.txt",\n'
        + '    filters: [{ name: "Text", extensions: ["txt"] }],\n'
        + '  });\n'
        + '  if (!result.canceled) {\n'
        + '    await fs.writeFile(result.filePath, content);\n'
        + '    return result.filePath;\n'
        + '  }\n'
        + '  return null;\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3Menu}</h3>
      <p style={para}>{t.menuDesc}</p>
      <pre style={codeBlock}><code>{'const { Menu, MenuItem } = require("electron");\n'
        + '\n'
        + 'const template = [\n'
        + '  {\n'
        + '    label: "File",\n'
        + '    submenu: [\n'
        + '      { label: "New File", accelerator: "CmdOrCtrl+N", click: () => createNewFile() },\n'
        + '      { label: "Open...", accelerator: "CmdOrCtrl+O", click: () => openFile() },\n'
        + '      { label: "Save", accelerator: "CmdOrCtrl+S", click: () => saveFile() },\n'
        + '      { type: "separator" },\n'
        + '      { role: "quit" },\n'
        + '    ],\n'
        + '  },\n'
        + '  {\n'
        + '    label: "Edit",\n'
        + '    submenu: [\n'
        + '      { role: "undo" },\n'
        + '      { role: "redo" },\n'
        + '      { type: "separator" },\n'
        + '      { role: "cut" },\n'
        + '      { role: "copy" },\n'
        + '      { role: "paste" },\n'
        + '      { role: "selectAll" },\n'
        + '    ],\n'
        + '  },\n'
        + '];\n'
        + '\n'
        + 'const menu = Menu.buildFromTemplate(template);\n'
        + 'Menu.setApplicationMenu(menu);'}</code></pre>

      <h3 style={subTitle}>{t.h3Tray}</h3>
      <p style={para}>{t.trayDesc}</p>
      <pre style={codeBlock}><code>{'const { Tray, Menu, nativeImage } = require("electron");\n'
        + '\n'
        + 'let tray = null;\n'
        + '\n'
        + 'app.whenReady().then(() => {\n'
        + '  const icon = nativeImage.createFromPath("assets/tray-icon.png");\n'
        + '  tray = new Tray(icon.resize({ width: 16, height: 16 }));\n'
        + '\n'
        + '  const contextMenu = Menu.buildFromTemplate([\n'
        + '    { label: "Show App", click: () => mainWindow.show() },\n'
        + '    { label: "Status: Running", enabled: false },\n'
        + '    { type: "separator" },\n'
        + '    { label: "Quit", click: () => app.quit() },\n'
        + '  ]);\n'
        + '\n'
        + '  tray.setToolTip("My Electron App");\n'
        + '  tray.setContextMenu(contextMenu);\n'
        + '  tray.on("click", () => mainWindow.show());\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>{t.h3Notifications}</h3>
      <p style={para}>{t.notificationsDesc}</p>
      <pre style={codeBlock}><code>{'const { Notification } = require("electron");\n'
        + '\n'
        + 'function showNotification(title, body) {\n'
        + '  const notification = new Notification({\n'
        + '    title: title,\n'
        + '    body: body,\n'
        + '    icon: "assets/icon.png",\n'
        + '    silent: false,\n'
        + '  });\n'
        + '\n'
        + '  notification.on("click", () => {\n'
        + '    mainWindow.show();\n'
        + '    mainWindow.focus();\n'
        + '  });\n'
        + '\n'
        + '  notification.show();\n'
        + '}'}</code></pre>

      {/* Security */}
      <h2 style={sectionTitle}>{t.h2Security}</h2>
      <p style={para}>{t.securityDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.sec1}</li>
        <li style={listItem}>{t.sec2}</li>
        <li style={listItem}>{t.sec3}</li>
        <li style={listItem}>{t.sec4}</li>
        <li style={listItem}>{t.sec5}</li>
        <li style={listItem}>{t.sec6}</li>
        <li style={listItem}>{t.sec7}</li>
        <li style={listItem}>{t.sec8}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Secure BrowserWindow configuration\n'
        + 'const win = new BrowserWindow({\n'
        + '  webPreferences: {\n'
        + '    contextIsolation: true,    // Required: isolate preload from page\n'
        + '    sandbox: true,             // Required: sandbox renderer process\n'
        + '    nodeIntegration: false,    // Required: no Node in renderer\n'
        + '    webSecurity: true,         // Required: enforce same-origin\n'
        + '    allowRunningInsecureContent: false,\n'
        + '    preload: path.join(__dirname, "preload.js"),\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// Set Content Security Policy\n'
        + 'session.defaultSession.webRequest.onHeadersReceived((details, callback) => {\n'
        + '  callback({\n'
        + '    responseHeaders: {\n'
        + '      ...details.responseHeaders,\n'
        + '      "Content-Security-Policy": [\n'
        + '        "default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'"\n'
        + '      ],\n'
        + '    },\n'
        + '  });\n'
        + '});'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.perf1}</li>
        <li style={listItem}>{t.perf2}</li>
        <li style={listItem}>{t.perf3}</li>
        <li style={listItem}>{t.perf4}</li>
        <li style={listItem}>{t.perf5}</li>
        <li style={listItem}>{t.perf6}</li>
        <li style={listItem}>{t.perf7}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Performance: Lazy-load heavy modules\n'
        + 'app.whenReady().then(async () => {\n'
        + '  // Show window immediately with skeleton UI\n'
        + '  const win = new BrowserWindow({ show: false, /* ... */ });\n'
        + '  win.loadFile("index.html");\n'
        + '  win.once("ready-to-show", () => win.show());\n'
        + '\n'
        + '  // Defer heavy initialization\n'
        + '  setTimeout(async () => {\n'
        + '    const db = await import("./database.js");\n'
        + '    await db.initialize();\n'
        + '    const analytics = await import("./analytics.js");\n'
        + '    analytics.track("app-launched");\n'
        + '  }, 1000);\n'
        + '});\n'
        + '\n'
        + '// Offload CPU-intensive work to a worker thread\n'
        + 'const { Worker } = require("worker_threads");\n'
        + '\n'
        + 'function processLargeFile(filePath) {\n'
        + '  return new Promise((resolve, reject) => {\n'
        + '    const worker = new Worker("./file-processor.js", {\n'
        + '      workerData: { filePath },\n'
        + '    });\n'
        + '    worker.on("message", resolve);\n'
        + '    worker.on("error", reject);\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* Frameworks */}
      <h2 style={sectionTitle}>{t.h2Frameworks}</h2>
      <p style={para}>{t.frameworksDesc}</p>

      <h3 style={subTitle}>{t.h3React}</h3>
      <p style={para}>{t.reactDesc}</p>
      <pre style={codeBlock}><code>{'# Scaffold React + Electron with electron-vite\n'
        + 'npm create electron-vite@latest my-react-app -- --template react-ts\n'
        + 'cd my-react-app\n'
        + 'npm install\n'
        + 'npm run dev\n'
        + '\n'
        + '# Project structure:\n'
        + '# src/\n'
        + '#   main/       - Electron main process\n'
        + '#   preload/    - Preload scripts\n'
        + '#   renderer/   - React app (Vite-powered)\n'
        + '#     App.tsx\n'
        + '#     main.tsx'}</code></pre>

      <h3 style={subTitle}>{t.h3Vue}</h3>
      <p style={para}>{t.vueDesc}</p>
      <pre style={codeBlock}><code>{'# Scaffold Vue + Electron with electron-vite\n'
        + 'npm create electron-vite@latest my-vue-app -- --template vue-ts\n'
        + '\n'
        + '# Or using Vue CLI plugin\n'
        + 'vue create my-vue-app\n'
        + 'cd my-vue-app\n'
        + 'vue add electron-builder'}</code></pre>

      <h3 style={subTitle}>{t.h3Svelte}</h3>
      <p style={para}>{t.svelteDesc}</p>
      <pre style={codeBlock}><code>{'# Scaffold Svelte + Electron with electron-vite\n'
        + 'npm create electron-vite@latest my-svelte-app -- --template svelte-ts\n'
        + 'cd my-svelte-app\n'
        + 'npm install\n'
        + 'npm run dev'}</code></pre>

      {/* Testing */}
      <h2 style={sectionTitle}>{t.h2Testing}</h2>
      <p style={para}>{t.testingDesc}</p>
      <pre style={codeBlock}><code>{'// e2e test with Playwright for Electron\n'
        + 'const { _electron: electron } = require("@playwright/test");\n'
        + 'const { test, expect } = require("@playwright/test");\n'
        + '\n'
        + 'test("app launches and shows title", async () => {\n'
        + '  const app = await electron.launch({ args: ["."] });\n'
        + '  const window = await app.firstWindow();\n'
        + '\n'
        + '  // Wait for the page to load\n'
        + '  await window.waitForLoadState("domcontentloaded");\n'
        + '\n'
        + '  // Check the window title\n'
        + '  const title = await window.title();\n'
        + '  expect(title).toBe("My Electron App");\n'
        + '\n'
        + '  // Interact with the UI\n'
        + '  await window.click("button#open-file");\n'
        + '  await expect(window.locator("#file-content")).toBeVisible();\n'
        + '\n'
        + '  // Check main process evaluations\n'
        + '  const appPath = await app.evaluate(async ({ app }) => {\n'
        + '    return app.getAppPath();\n'
        + '  });\n'
        + '  expect(appPath).toBeTruthy();\n'
        + '\n'
        + '  await app.close();\n'
        + '});'}</code></pre>

      {/* Real-World Apps */}
      <h2 style={sectionTitle}>{t.h2RealWorldApps}</h2>
      <p style={para}>{t.realWorldDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>VS Code</strong>{' - ' + t.app1.split(' - ')[1]}</li>
        <li style={listItem}><strong>Slack</strong>{' - ' + t.app2.split(' - ')[1]}</li>
        <li style={listItem}><strong>Discord</strong>{' - ' + t.app3.split(' - ')[1]}</li>
        <li style={listItem}><strong>Figma Desktop</strong>{' - ' + t.app4.split(' - ')[1]}</li>
        <li style={listItem}><strong>Notion</strong>{' - ' + t.app5.split(' - ')[1]}</li>
        <li style={listItem}><strong>GitHub Desktop</strong>{' - ' + t.app6.split(' - ')[1]}</li>
      </ul>

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
