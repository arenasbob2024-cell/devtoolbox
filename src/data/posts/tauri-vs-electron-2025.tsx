'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tauri vs Electron: Desktop App Framework Comparison 2025',
    intro: 'Electron has been the dominant force in cross-platform desktop development for years, powering apps like VS Code, Slack, and Discord. Tauri emerged as a Rust-based challenger promising smaller bundles and better performance. This comprehensive comparison examines bundle size, performance, security, and developer experience to help you choose the right framework.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Tauri produces apps that are 10-100x smaller than Electron (3-10MB vs 100-200MB) with lower memory usage. It uses the systems webview instead of bundling Chromium. Electron offers better documentation, larger ecosystem, and easier debugging. Choose Tauri for performance-critical apps and Electron for rapid development with complex requirements.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Tauri apps are 10-100x smaller than Electron apps',
    takeaway2: 'Tauri uses system webview; Electron bundles Chromium',
    takeaway3: 'Electron has better documentation and larger ecosystem',
    takeaway4: 'Tauri offers superior security with Rust backend',
    takeaway5: 'Both support React, Vue, Svelte and other frameworks',
    takeaway6: 'Tauri 2.0 adds mobile support (iOS/Android)',
    
    whatIsTauriTitle: 'What is Tauri?',
    whatIsTauriContent: 'Tauri is a framework for building desktop applications using web technologies with a Rust backend. Created in 2019, it uses the operating systems native webview (WebView2 on Windows, WebKit on macOS/Linux) instead of bundling a full browser. This results in dramatically smaller app sizes while maintaining full access to native APIs through Rust.',
    
    whatIsElectronTitle: 'What is Electron?',
    whatIsElectronContent: 'Electron, developed by GitHub (now Microsoft) in 2013, embeds Chromium and Node.js into desktop applications. It powers thousands of applications including VS Code, Slack, Discord, and Figma. The bundled Chromium ensures consistent behavior across platforms but results in larger application sizes.',
    
    performanceTitle: 'Performance & Resource Usage',
    performanceIntro: 'Comparing resource consumption and performance metrics:',
    
    bundleSizeTitle: 'Bundle Size Comparison',
    bundleSizeIntro: 'Application size including all dependencies:',
    
    memoryTitle: 'Memory Usage',
    memoryIntro: 'RAM consumption under typical usage (1000 lines document in editor):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See how IPC and native features work in each:',
    
    tauriExampleTitle: 'Tauri (Rust + TypeScript)',
    electronExampleTitle: 'Electron (Node.js)',
    
    securityTitle: 'Security Comparison',
    securityIntro: 'Security architecture and built-in protections:',
    
    whenToUseTitle: 'When to Use Each Framework',
    tauriBestFor: 'Use Tauri When:',
    electronBestFor: 'Use Electron When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Tauri is the better choice for new desktop projects prioritizing performance and bundle size. Its Rust backend provides superior security and the system webview approach dramatically reduces app size. Electron remains viable for teams with JavaScript expertise or those requiring specific Node.js modules. With Tauri 2.0 adding mobile support, it is becoming the go-to choice for truly cross-platform applications.',
    
    faq1q: 'Can I use existing React/Vue components in Tauri?',
    faq1a: 'Yes, Tauri is frontend-agnostic. You can use React, Vue, Svelte, Solid, or vanilla JavaScript. The frontend communicates with the Rust backend through IPC, similar to Electron main/renderer process communication.',
    
    faq2q: 'Is Tauri production-ready?',
    faq2a: 'Yes, Tauri is production-ready and used by companies like 1Password, Rspack, and others. The 2.0 release brought significant improvements including mobile support and better tooling.',
    
    faq3q: 'Can I access Node.js modules in Tauri?',
    faq3a: 'Not directly in the frontend. Tauri uses Rust for native functionality. However, you can implement equivalent functionality in Rust or use sidecar to run Node.js processes alongside your app.',
    
    faq4q: 'Does Tauri support auto-updates?',
    faq4a: 'Yes, Tauri has built-in updater functionality. You can configure it to check for updates and install them automatically. The updater supports code signing for security.',
    
    faq5q: 'How does debugging compare between Tauri and Electron?',
    faq5a: 'Electron has more mature debugging tools including Chrome DevTools for both main and renderer processes. Tauri supports DevTools for the webview and has Rust debugging, but the experience is less integrated.',
    
    faq6q: 'Can I port my Electron app to Tauri?',
    faq6a: 'The frontend code (React/Vue/etc) ports directly. You will need to rewrite Node.js main process code in Rust. Tauri provides migration guides and the IPC patterns are similar.',
    
    faq7q: 'What about mobile support?',
    faq7a: 'Tauri 2.0 added iOS and Android support, allowing you to target desktop and mobile from a single codebase. Electron is desktop-only (Windows, macOS, Linux).',
    
    faq8q: 'Which has better Windows support?',
    faq8a: 'Both have excellent Windows support. Electron may have a slight edge due to Microsoft ownership. Tauri uses WebView2 which requires Windows 10 1803+ but provides excellent performance.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Tauri vs Electron：2025年桌面应用框架对比',
    intro: 'Electron 多年来一直是跨平台桌面开发的主导力量，支持着 VS Code、Slack 和 Discord 等应用。Tauri 作为基于 Rust 的挑战者出现，承诺更小的包体积和更好的性能。本全面比较考察包大小、性能、安全性和开发者体验，帮助你选择正确的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Tauri 生成的应用比 Electron 小 10-100 倍（3-10MB vs 100-200MB），内存使用更低。它使用系统 webview 而非打包 Chromium。Electron 提供更好的文档、更大的生态系统和更简单的调试。性能关键型应用选择 Tauri，复杂需求快速开发选择 Electron。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Tauri 应用比 Electron 小 10-100 倍',
    takeaway2: 'Tauri 使用系统 webview；Electron 打包 Chromium',
    takeaway3: 'Electron 有更好的文档和更大的生态系统',
    takeaway4: 'Tauri 通过 Rust 后端提供卓越的安全性',
    takeaway5: '两者都支持 React、Vue、Svelte 等框架',
    takeaway6: 'Tauri 2.0 新增移动端支持（iOS/Android）',
    
    whatIsTauriTitle: '什么是 Tauri？',
    whatIsTauriContent: 'Tauri 是一个使用 Web 技术和 Rust 后端构建桌面应用的框架。创建于 2019 年，它使用操作系统的原生 webview（Windows 上是 WebView2，macOS/Linux 上是 WebKit）而非打包完整浏览器。这导致应用大小显著减小，同时通过 Rust 保持对原生 API 的完全访问。',
    
    whatIsElectronTitle: '什么是 Electron？',
    whatIsElectronContent: 'Electron 由 GitHub（现微软）于 2013 年开发，将 Chromium 和 Node.js 嵌入桌面应用。它支持数千款应用，包括 VS Code、Slack、Discord 和 Figma。打包的 Chromium 确保跨平台行为一致，但导致应用体积较大。',
    
    performanceTitle: '性能与资源使用',
    performanceIntro: '比较资源消耗和性能指标：',
    
    bundleSizeTitle: '包大小对比',
    bundleSizeIntro: '包含所有依赖的应用大小：',
    
    memoryTitle: '内存使用',
    memoryIntro: '典型使用下的 RAM 消耗（编辑器中 1000 行文档）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '查看 IPC 和原生功能在各框架中的工作方式：',
    
    tauriExampleTitle: 'Tauri (Rust + TypeScript)',
    electronExampleTitle: 'Electron (Node.js)',
    
    securityTitle: '安全性对比',
    securityIntro: '安全架构和内置保护：',
    
    whenToUseTitle: '何时使用每个框架',
    tauriBestFor: '使用 Tauri 的场景：',
    electronBestFor: '使用 Electron 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，对于优先考虑性能和包大小的新桌面项目，Tauri 是更好的选择。其 Rust 后端提供卓越的安全性，系统 webview 方法显著减少应用大小。对于具有 JavaScript 专业知识或需要特定 Node.js 模块的团队，Electron 仍然可行。随着 Tauri 2.0 增加移动端支持，它正在成为真正跨平台应用的首选。',
    
    faq1q: '我可以在 Tauri 中使用现有的 React/Vue 组件吗？',
    faq1a: '可以，Tauri 与前端无关。你可以使用 React、Vue、Svelte、Solid 或原生 JavaScript。前端通过 IPC 与 Rust 后端通信，类似于 Electron 主进程/渲染进程通信。',
    
    faq2q: 'Tauri 已准备好用于生产吗？',
    faq2a: '是的，Tauri 已准备好用于生产，被 1Password、Rspack 等公司使用。2.0 版本带来了重大改进，包括移动端支持和更好的工具。',
    
    faq3q: '我可以在 Tauri 中访问 Node.js 模块吗？',
    faq3a: '不能直接在前端访问。Tauri 使用 Rust 实现原生功能。但是，你可以在 Rust 中实现等效功能或使用 sidecar 在应用旁边运行 Node.js 进程。',
    
    faq4q: 'Tauri 支持自动更新吗？',
    faq4a: '是的，Tauri 有内置的更新器功能。你可以配置它检查更新并自动安装。更新器支持代码签名以确保安全。',
    
    faq5q: 'Tauri 和 Electron 的调试体验如何比较？',
    faq5a: 'Electron 有更成熟的调试工具，包括主进程和渲染进程的 Chrome DevTools。Tauri 支持 webview 的 DevTools 和 Rust 调试，但体验不够集成。',
    
    faq6q: '我可以将 Electron 应用移植到 Tauri 吗？',
    faq6a: '前端代码（React/Vue 等）可以直接移植。你需要用 Rust 重写 Node.js 主进程代码。Tauri 提供迁移指南，IPC 模式类似。',
    
    faq7q: '移动端支持如何？',
    faq7a: 'Tauri 2.0 增加了 iOS 和 Android 支持，允许你从单个代码库针对桌面和移动端。Electron 仅支持桌面（Windows、macOS、Linux）。',
    
    faq8q: '哪个对 Windows 支持更好？',
    faq8a: '两者都有出色的 Windows 支持。由于微软的所有权，Electron 可能略有优势。Tauri 使用 WebView2，需要 Windows 10 1803+，但提供出色的性能。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TauriVsElectron2025({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>
      
      <h3 style={h3Style}>{ct.whatIsTauriTitle}</h3>
      <p style={pStyle}>{ct.whatIsTauriContent}</p>

      <h3 style={h3Style}>{ct.whatIsElectronTitle}</h3>
      <p style={pStyle}>{ct.whatIsElectronContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Electron</th>
              <th style={thStyle}>Tauri</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2013', '2019'],
              [isZh ? '后端语言' : 'Backend Language', 'Node.js', 'Rust'],
              [isZh ? '渲染引擎' : 'Rendering', 'Bundled Chromium', 'System Webview'],
              [isZh ? '最小包大小' : 'Min Bundle Size', '~100MB', '~3MB'],
              [isZh ? '平台支持' : 'Platforms', 'Win/Mac/Linux', 'Win/Mac/Linux/iOS/Android'],
              [isZh ? '内存占用' : 'Memory Usage', '~150MB base', '~30MB base'],
              [isZh ? '安全模型' : 'Security Model', 'Sandboxing', 'Rust + CSP'],
            ].map(([feature, electron, tauri], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{electron}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{tauri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.bundleSizeTitle}</h3>
      <p style={pStyle}>{ct.bundleSizeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '应用类型' : 'App Type'}</th>
              <th style={thStyle}>Electron</th>
              <th style={thStyle}>Tauri</th>
              <th style={thStyle}>{isZh ? '减少' : 'Reduction'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '空应用' : 'Empty App', '~150MB', '~3MB', '50x'],
              [isZh ? '简单编辑器' : 'Simple Editor', '~180MB', '~8MB', '22x'],
              [isZh ? '全功能应用' : 'Full-featured App', '~250MB', '~15MB', '17x'],
              [isZh ? '大型企业应用' : 'Enterprise App', '~400MB', '~25MB', '16x'],
            ].map(([type, electron, tauri, reduction], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{electron}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tauri}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{reduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.memoryTitle}</h3>
      <p style={pStyle}>{ct.memoryIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Electron</th>
              <th style={thStyle}>Tauri</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时' : 'At Startup', '~150MB', '~35MB'],
              [isZh ? '空闲状态' : 'Idle', '~180MB', '~45MB'],
              [isZh ? '加载文档' : 'With Document', '~250MB', '~80MB'],
              [isZh ? '高负载' : 'Under Load', '~500MB', '~150MB'],
            ].map(([scenario, electron, tauri], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{electron}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tauri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Electron</th>
              <th style={thStyle}>Tauri</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动更新' : 'Auto Updates', 'electron-updater', 'Built-in'],
              [isZh ? '系统托盘' : 'System Tray', 'Built-in', 'Built-in'],
              [isZh ? '原生菜单' : 'Native Menus', 'Built-in', 'Built-in'],
              [isZh ? '文件系统' : 'File System', 'Node.js fs', 'Rust APIs'],
              [isZh ? '进程管理' : 'Process Mgmt', 'child_process', 'Command API'],
              [isZh ? '窗口管理' : 'Window Mgmt', 'BrowserWindow', 'WebviewWindow'],
              [isZh ? '通知' : 'Notifications', 'Notification API', 'Built-in'],
              [isZh ? '剪贴板' : 'Clipboard', 'electron.clipboard', 'Built-in'],
              [isZh ? '深度链接' : 'Deep Links', 'Manual setup', 'Built-in'],
              [isZh ? '插件系统' : 'Plugin System', 'npm packages', 'Rust plugins + npm'],
            ].map(([feature, electron, tauri], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{electron}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{tauri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.tauriExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// src-tauri/src/main.rs - Rust backend
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
async fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path)
        .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// src/App.tsx - Frontend (React)
import { invoke } from '@tauri-apps/api/core';

export default function App() {
  const [result, setResult] = useState('');

  const handleClick = async () => {
    const greeting = await invoke('greet', { name: 'World' });
    setResult(greeting);
  };

  return (
    <div>
      <button onClick={handleClick}>Greet</button>
      <p>{result}</p>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.electronExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// main.js - Main process
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs/promises');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

ipcMain.handle('greet', (event, name) => {
  return 'Hello, ' + name + '!';
});

ipcMain.handle('read-file', async (event, filePath) => {
  return await fs.readFile(filePath, 'utf-8');
});

app.whenReady().then(createWindow);

// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  greet: (name) => ipcRenderer.invoke('greet', name),
  readFile: (path) => ipcRenderer.invoke('read-file', path),
});

// renderer.js - Frontend
document.getElementById('btn').addEventListener('click', async () => {
  const result = await window.api.greet('World');
  document.getElementById('output').textContent = result;
});`}</code></pre>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Electron</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用 Node.js 集成和 contextIsolation 进行进程隔离。需要手动配置 CSP。可通过 nodeIntegration 访问完整的 Node.js API，但存在安全风险。' : 'Process isolation via Node.js integration and contextIsolation. CSP must be configured manually. Full Node.js API access possible via nodeIntegration, but poses security risks.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Tauri</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Rust 后端天然免疫内存安全漏洞。默认启用严格的 CSP。通过 allowlist 限制 API 访问。无直接 Node.js 访问减少了攻击面。' : 'Rust backend is naturally immune to memory safety vulnerabilities. Strict CSP enabled by default. API access restricted via allowlist. No direct Node.js access reduces attack surface.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.tauriBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新桌面项目' : 'New desktop projects'}</li>
            <li>{isZh ? '需要小包体积' : 'Small bundle size needed'}</li>
            <li>{isZh ? '性能关键应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '高安全要求' : 'High security requirements'}</li>
            <li>{isZh ? '跨平台（含移动端）' : 'Cross-platform (including mobile)'}</li>
            <li>{isZh ? '愿意学习 Rust' : 'Willing to learn Rust'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.electronBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '现有 Electron 代码库' : 'Existing Electron codebase'}</li>
            <li>{isZh ? '团队熟悉 Node.js' : 'Team familiar with Node.js'}</li>
            <li>{isZh ? '需要特定 npm 包' : 'Need specific npm packages'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '企业级支持需求' : 'Enterprise support needs'}</li>
            <li>{isZh ? '仅桌面平台' : 'Desktop-only platforms'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
