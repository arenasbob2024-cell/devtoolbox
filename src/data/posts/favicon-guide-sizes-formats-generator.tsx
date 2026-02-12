'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Favicon Guide 2026: All Sizes, Formats, and How to Generate Them',
    intro: 'Favicons are the tiny icons that appear in browser tabs, bookmarks, home screens, and app switchers. Despite their small size, they have an outsized impact on brand recognition and user experience. Yet the favicon ecosystem in 2026 remains confusing — dozens of sizes, multiple formats, and conflicting advice. This <strong>complete favicon guide</strong> cuts through the noise and tells you exactly what you need, why, and how to generate favicons programmatically or from design tools like Figma.',
    h2_minimal: 'The Minimal Favicon Setup: Just 3 Files You Actually Need',
    minimalDesc: 'The internet is full of articles telling you to create 20+ favicon files. The truth is that in 2026, you only need <strong>three files</strong> to cover every modern browser, device, and platform:',
    minimalList: '<ul><li><strong>favicon.ico</strong> — 32x32 ICO file for legacy browsers and browser tabs</li><li><strong>apple-touch-icon.png</strong> — 180x180 PNG for iOS home screen bookmarks</li><li><strong>icon-512.png</strong> — 512x512 PNG referenced in your web app manifest for Android, PWAs, and other modern platforms</li></ul>',
    minimalAfter: 'Optionally, you can add an SVG favicon for infinite scalability and dark mode support. But those three files alone give you complete coverage across Chrome, Firefox, Safari, Edge, iOS, and Android.',
    h2_sizes: 'Complete Favicon Size Reference',
    sizesDesc: 'Here is the definitive reference table for every favicon size, its purpose, and where it is used:',
    sizeNote: 'The most commonly requested sizes are 32x32 (browser tabs), 180x180 (Apple devices), and 512x512 (PWA splash screens). If you only provide these three, you cover over 99% of use cases.',
    h2_formats: 'Format Comparison: ICO vs PNG vs SVG',
    formatsDesc: 'Choosing the right favicon format matters. Each format has distinct advantages and trade-offs:',
    formatsAfter: '<strong>Recommendation:</strong> Use ICO for the <code>/favicon.ico</code> fallback, PNG for Apple Touch Icon and web manifest icons, and optionally SVG for modern browsers that support it. This three-format strategy covers every scenario.',
    h2_creating: 'Step-by-Step: Creating Favicons',
    h3_figma: 'From Figma',
    figmaSteps: '<ol><li>Design your icon at <strong>512x512 pixels</strong> on a dedicated frame. Use a simple, recognizable shape — it must be legible at 16x16.</li><li>Export the frame as <strong>PNG</strong> at 1x scale (512x512).</li><li>Duplicate the frame and resize to <strong>180x180</strong>. Export as PNG for the Apple Touch Icon.</li><li>For the ICO file, export at <strong>32x32</strong> PNG and convert to ICO using one of the programmatic methods below.</li><li>Tip: Turn off background layers if you want a transparent favicon. ICO and PNG support transparency; Apple Touch Icon will get a white or colored background on iOS regardless.</li></ol>',
    h3_programmatic: 'Programmatically with Sharp (Node.js)',
    programmaticDesc: 'You can automate favicon generation from a single high-resolution source image using the <code>sharp</code> library:',
    programmaticIco: 'For generating the ICO file, use the <code>png-to-ico</code> package:',
    h3_script: 'Complete Build Script',
    scriptDesc: 'Here is a complete Node.js script that generates all required favicon files from a single source PNG:',
    h2_markup: 'HTML Markup: Exact Link Tags and Manifest',
    markupDesc: 'Add these tags to the <code>&lt;head&gt;</code> of every page on your site:',
    manifestDesc: 'Create a <code>manifest.webmanifest</code> (or <code>site.webmanifest</code>) in your root directory:',
    manifestNote: 'The manifest file tells Android and PWA environments which icons to use. The <code>"purpose": "any maskable"</code> value ensures the icon works both as a regular icon and within Android\'s adaptive icon mask (the rounded shape that varies by device manufacturer).',
    h2_darkmode: 'Dark Mode Favicons with SVG',
    darkmodeDesc: 'One of the most powerful features of SVG favicons is the ability to adapt to the user\'s color scheme using CSS <code>prefers-color-scheme</code> inside the SVG itself:',
    darkmodeAfter: 'This SVG favicon will automatically switch between dark and light versions based on the user\'s operating system or browser theme preference. No JavaScript required — it is purely declarative. This works in Chrome, Firefox, and Edge. Safari supports SVG favicons but has inconsistent dark mode behavior as of early 2026.',
    h2_testing: 'Testing Your Favicons on Every Platform',
    testingDesc: 'After generating your favicons, test them across all platforms to ensure they render correctly:',
    testingList: '<ul><li><strong>Desktop browsers:</strong> Open your site in Chrome, Firefox, Safari, and Edge. Check the tab icon at different zoom levels. Verify the favicon appears in bookmark lists.</li><li><strong>Mobile iOS:</strong> Open your site in Safari on an iPhone. Tap Share and then "Add to Home Screen." Verify the 180x180 Apple Touch Icon appears correctly on the home screen.</li><li><strong>Mobile Android:</strong> Open in Chrome and tap "Add to Home Screen" or "Install App." Verify the 192x192 and 512x512 icons from your manifest are used.</li><li><strong>PWA:</strong> If your site is a PWA, install it via Chrome and verify the splash screen uses the 512x512 icon.</li><li><strong>Realfavicongenerator.net:</strong> Use the favicon checker tool at realfavicongenerator.net/favicon_checker to run an automated test across all platforms.</li><li><strong>Dark mode:</strong> Toggle your system to dark mode and verify the SVG favicon adapts (Chrome and Firefox).</li></ul>',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the minimum number of favicon files I need?',
    faq1_a: 'You need a minimum of three files: <code>favicon.ico</code> (32x32) for browser tabs and legacy support, <code>apple-touch-icon.png</code> (180x180) for iOS home screen bookmarks, and a 512x512 PNG referenced in your <code>manifest.webmanifest</code> for Android and PWA platforms. These three files cover over 99% of devices and browsers in 2026.',
    faq2_q: 'Should I use SVG or PNG for my favicon?',
    faq2_a: 'Use both. PNG is required for Apple Touch Icons and web manifest icons since iOS and Android do not support SVG in those contexts. SVG is excellent as the primary browser tab favicon because it scales perfectly to any resolution and supports dark mode via CSS <code>prefers-color-scheme</code>. Declare both in your HTML with the SVG as the preferred icon and ICO/PNG as the fallback.',
    faq3_q: 'Does favicon size affect page load speed?',
    faq3_a: 'Favicon files are typically very small (under 15 KB) and are cached aggressively by browsers, so their impact on page load speed is negligible. However, avoid unnecessarily large files — a 512x512 PNG should be well under 50 KB when optimized. Use PNG compression tools or the <code>sharp</code> library with quality settings to keep file sizes minimal.',
    faq4_q: 'How do I make my favicon change in dark mode?',
    faq4_a: 'Use an SVG favicon with an embedded <code>&lt;style&gt;</code> block containing a <code>@media (prefers-color-scheme: dark)</code> query. Inside that query, change the fill colors of your SVG paths. Then reference the SVG in your HTML with <code>&lt;link rel="icon" href="/icon.svg" type="image/svg+xml"&gt;</code>. This works in Chrome, Firefox, and Edge. Safari has limited support as of 2026.',
    faq5_q: 'What is the purpose of maskable icons in the web manifest?',
    faq5_a: 'Maskable icons are designed for Android\'s adaptive icon system, where the OS crops the icon into various shapes (circle, rounded square, squircle) depending on the device manufacturer. A maskable icon includes extra padding — a "safe zone" — so that important parts of the icon are not cut off when masked. Set <code>"purpose": "any maskable"</code> in your manifest if your icon has sufficient padding, or provide separate entries for <code>"any"</code> and <code>"maskable"</code> purposes.',
    faq6_q: 'Do I still need a favicon.ico file in 2026?',
    faq6_a: 'Yes. While modern browsers support PNG and SVG favicons, many tools and services still request <code>/favicon.ico</code> from your root directory automatically. RSS readers, crawlers, enterprise browsers, and some older email clients look specifically for this file. Additionally, if you do not provide explicit favicon link tags, browsers will fall back to requesting <code>/favicon.ico</code>. It costs almost nothing to include and prevents 404 errors in your server logs.',
  },
  zh: {
    title: 'Favicon 完全指南 2026：所有尺寸、格式及生成方法',
    intro: 'Favicon 是出现在浏览器标签页、书签、主屏幕和应用切换器中的小图标。尽管体积很小，但它们对品牌识别和用户体验有着重大影响。然而 2026 年的 favicon 生态系统依然令人困惑——数十种尺寸、多种格式和相互矛盾的建议。本<strong>完整 favicon 指南</strong>将为你理清头绪，告诉你确切需要什么、为什么需要，以及如何通过编程或 Figma 等设计工具生成 favicon。',
    h2_minimal: '最简 Favicon 配置：你实际只需要 3 个文件',
    minimalDesc: '网上充斥着让你创建 20 多个 favicon 文件的文章。事实是在 2026 年，你只需要<strong>三个文件</strong>就能覆盖所有现代浏览器、设备和平台：',
    minimalList: '<ul><li><strong>favicon.ico</strong> — 32x32 ICO 文件，用于旧版浏览器和浏览器标签页</li><li><strong>apple-touch-icon.png</strong> — 180x180 PNG，用于 iOS 主屏幕书签</li><li><strong>icon-512.png</strong> — 512x512 PNG，在 Web 应用清单中引用，适用于 Android、PWA 和其他现代平台</li></ul>',
    minimalAfter: '你还可以选择添加 SVG favicon 以获得无限缩放能力和暗色模式支持。但仅这三个文件就能让你完全覆盖 Chrome、Firefox、Safari、Edge、iOS 和 Android。',
    h2_sizes: '完整 Favicon 尺寸参考',
    sizesDesc: '以下是每种 favicon 尺寸、用途和使用场景的权威参考表：',
    sizeNote: '最常请求的尺寸是 32x32（浏览器标签页）、180x180（Apple 设备）和 512x512（PWA 启动画面）。如果你只提供这三种，就能覆盖超过 99% 的使用场景。',
    h2_formats: '格式对比：ICO vs PNG vs SVG',
    formatsDesc: '选择正确的 favicon 格式很重要。每种格式都有不同的优势和权衡：',
    formatsAfter: '<strong>建议：</strong>使用 ICO 作为 <code>/favicon.ico</code> 回退，PNG 用于 Apple Touch Icon 和 Web 清单图标，可选 SVG 用于支持它的现代浏览器。这种三格式策略覆盖了所有场景。',
    h2_creating: '分步指南：创建 Favicon',
    h3_figma: '从 Figma 导出',
    figmaSteps: '<ol><li>在一个专用画框中以 <strong>512x512 像素</strong>设计你的图标。使用简单、易识别的形状——它必须在 16x16 时仍清晰可辨。</li><li>将画框导出为 <strong>PNG</strong> 1x 比例（512x512）。</li><li>复制画框并调整为 <strong>180x180</strong>。导出为 PNG 用作 Apple Touch Icon。</li><li>对于 ICO 文件，导出 <strong>32x32</strong> PNG 并使用下面的编程方法转换为 ICO。</li><li>提示：如果需要透明 favicon，请关闭背景图层。ICO 和 PNG 支持透明度；Apple Touch Icon 在 iOS 上会自动添加白色或彩色背景。</li></ol>',
    h3_programmatic: '使用 Sharp (Node.js) 编程生成',
    programmaticDesc: '你可以使用 <code>sharp</code> 库从单个高分辨率源图像自动生成 favicon：',
    programmaticIco: '要生成 ICO 文件，使用 <code>png-to-ico</code> 包：',
    h3_script: '完整构建脚本',
    scriptDesc: '以下是一个完整的 Node.js 脚本，可从单个源 PNG 生成所有必需的 favicon 文件：',
    h2_markup: 'HTML 标记：精确的 Link 标签和 Manifest',
    markupDesc: '将这些标签添加到你网站每个页面的 <code>&lt;head&gt;</code> 中：',
    manifestDesc: '在根目录中创建 <code>manifest.webmanifest</code>（或 <code>site.webmanifest</code>）：',
    manifestNote: '清单文件告诉 Android 和 PWA 环境使用哪些图标。<code>"purpose": "any maskable"</code> 值确保图标既可作为常规图标使用，也可在 Android 的自适应图标蒙版（因设备制造商而异的圆角形状）中使用。',
    h2_darkmode: '使用 SVG 实现暗色模式 Favicon',
    darkmodeDesc: 'SVG favicon 最强大的功能之一是能够使用 SVG 内部的 CSS <code>prefers-color-scheme</code> 来适应用户的颜色方案：',
    darkmodeAfter: '这个 SVG favicon 会根据用户的操作系统或浏览器主题偏好自动在暗色和亮色版本之间切换。无需 JavaScript——完全是声明式的。这在 Chrome、Firefox 和 Edge 中有效。Safari 支持 SVG favicon，但截至 2026 年初暗色模式行为不一致。',
    h2_testing: '在所有平台上测试你的 Favicon',
    testingDesc: '生成 favicon 后，在所有平台上测试以确保它们正确渲染：',
    testingList: '<ul><li><strong>桌面浏览器：</strong>在 Chrome、Firefox、Safari 和 Edge 中打开你的网站。检查不同缩放级别下的标签页图标。验证 favicon 出现在书签列表中。</li><li><strong>移动 iOS：</strong>在 iPhone 的 Safari 中打开你的网站。点击分享然后"添加到主屏幕"。验证 180x180 Apple Touch Icon 正确显示在主屏幕上。</li><li><strong>移动 Android：</strong>在 Chrome 中打开并点击"添加到主屏幕"或"安装应用"。验证清单中的 192x192 和 512x512 图标被使用。</li><li><strong>PWA：</strong>如果你的网站是 PWA，通过 Chrome 安装并验证启动画面使用 512x512 图标。</li><li><strong>Realfavicongenerator.net：</strong>使用 realfavicongenerator.net/favicon_checker 的 favicon 检查工具进行跨平台自动测试。</li><li><strong>暗色模式：</strong>将系统切换到暗色模式并验证 SVG favicon 自适应（Chrome 和 Firefox）。</li></ul>',
    h2_faq: '常见问题',
    faq1_q: '我至少需要多少个 favicon 文件？',
    faq1_a: '你至少需要三个文件：<code>favicon.ico</code>（32x32）用于浏览器标签页和旧版支持，<code>apple-touch-icon.png</code>（180x180）用于 iOS 主屏幕书签，以及在 <code>manifest.webmanifest</code> 中引用的 512x512 PNG 用于 Android 和 PWA 平台。这三个文件在 2026 年覆盖了超过 99% 的设备和浏览器。',
    faq2_q: '我应该使用 SVG 还是 PNG 作为 favicon？',
    faq2_a: '两者都用。PNG 是 Apple Touch Icon 和 Web 清单图标所必需的，因为 iOS 和 Android 在这些上下文中不支持 SVG。SVG 作为主要浏览器标签页 favicon 很出色，因为它可以完美缩放到任何分辨率，并通过 CSS <code>prefers-color-scheme</code> 支持暗色模式。',
    faq3_q: 'favicon 大小会影响页面加载速度吗？',
    faq3_a: 'Favicon 文件通常非常小（低于 15 KB），且浏览器会积极缓存，因此对页面加载速度的影响可以忽略不计。但避免不必要的大文件——优化后的 512x512 PNG 应远低于 50 KB。',
    faq4_q: '如何让 favicon 在暗色模式下改变？',
    faq4_a: '使用嵌入了包含 <code>@media (prefers-color-scheme: dark)</code> 查询的 <code>&lt;style&gt;</code> 块的 SVG favicon。在查询内部更改 SVG 路径的填充颜色。然后在 HTML 中使用 <code>&lt;link rel="icon" href="/icon.svg" type="image/svg+xml"&gt;</code> 引用 SVG。这在 Chrome、Firefox 和 Edge 中有效。',
    faq5_q: 'Web 清单中 maskable 图标的用途是什么？',
    faq5_a: 'Maskable 图标专为 Android 的自适应图标系统设计，操作系统会将图标裁剪成各种形状（圆形、圆角方形等）。maskable 图标包含额外的内边距——"安全区域"——这样图标的重要部分在被裁剪时不会被切掉。',
    faq6_q: '2026 年还需要 favicon.ico 文件吗？',
    faq6_a: '需要。虽然现代浏览器支持 PNG 和 SVG favicon，但许多工具和服务仍会自动从根目录请求 <code>/favicon.ico</code>。RSS 阅读器、爬虫、企业浏览器和一些旧版邮件客户端会专门查找此文件。包含它几乎没有成本，还能防止服务器日志中的 404 错误。',
  },
  ja: {
    title: 'Faviconガイド2026：全サイズ・フォーマット・生成方法',
    intro: 'Faviconはブラウザタブ、ブックマーク、ホーム画面、アプリスイッチャーに表示される小さなアイコンです。サイズは小さいですが、ブランド認知とユーザー体験に大きな影響を与えます。この<strong>完全faviconガイド</strong>では、2026年に必要なもの、その理由、FigmaやNode.jsでのプログラム的な生成方法を詳しく説明します。',
    h2_minimal: '最小限のFavicon設定：実際に必要なのは3ファイルだけ',
    minimalDesc: '2026年では、すべてのモダンブラウザ、デバイス、プラットフォームをカバーするのに<strong>3つのファイル</strong>だけで十分です：',
    minimalList: '<ul><li><strong>favicon.ico</strong> — レガシーブラウザとブラウザタブ用の32x32 ICOファイル</li><li><strong>apple-touch-icon.png</strong> — iOSホーム画面ブックマーク用の180x180 PNG</li><li><strong>icon-512.png</strong> — Android、PWA、その他のモダンプラットフォーム用にWebアプリマニフェストで参照される512x512 PNG</li></ul>',
    minimalAfter: 'オプションで、無限のスケーラビリティとダークモードサポートのためにSVG faviconを追加できます。しかし、これら3つのファイルだけでChrome、Firefox、Safari、Edge、iOS、Androidを完全にカバーできます。',
    h2_sizes: '完全なFaviconサイズリファレンス',
    sizesDesc: 'すべてのfaviconサイズ、目的、使用場所の決定版リファレンステーブルです：',
    sizeNote: '最も一般的に要求されるサイズは、32x32（ブラウザタブ）、180x180（Appleデバイス）、512x512（PWAスプラッシュスクリーン）です。この3つだけで99%以上のユースケースをカバーします。',
    h2_formats: 'フォーマット比較：ICO vs PNG vs SVG',
    formatsDesc: '正しいfaviconフォーマットの選択は重要です。各フォーマットには異なる利点とトレードオフがあります：',
    formatsAfter: '<strong>推奨：</strong><code>/favicon.ico</code>フォールバックにはICO、Apple Touch Iconとマニフェストアイコンにはおよび PNG、サポートするモダンブラウザにはオプションでSVGを使用してください。',
    h2_creating: 'ステップバイステップ：Favicon作成',
    h3_figma: 'Figmaから',
    figmaSteps: '<ol><li>専用フレームに<strong>512x512ピクセル</strong>でアイコンをデザインします。シンプルで認識しやすい形状を使用してください。</li><li>フレームを<strong>PNG</strong> 1xスケール（512x512）でエクスポートします。</li><li>フレームを複製して<strong>180x180</strong>にリサイズします。Apple Touch Icon用にPNGでエクスポートします。</li><li>ICOファイルの場合、<strong>32x32</strong> PNGでエクスポートし、以下のプログラム的方法でICOに変換します。</li><li>ヒント：透明なfaviconが必要な場合は背景レイヤーをオフにしてください。</li></ol>',
    h3_programmatic: 'Sharp (Node.js) によるプログラム生成',
    programmaticDesc: '<code>sharp</code>ライブラリを使用して、単一の高解像度ソース画像からfavicon生成を自動化できます：',
    programmaticIco: 'ICOファイルの生成には<code>png-to-ico</code>パッケージを使用します：',
    h3_script: '完全なビルドスクリプト',
    scriptDesc: '単一のソースPNGからすべての必要なfaviconファイルを生成する完全なNode.jsスクリプトです：',
    h2_markup: 'HTMLマークアップ：正確なLinkタグとManifest',
    markupDesc: 'サイトの各ページの<code>&lt;head&gt;</code>にこれらのタグを追加します：',
    manifestDesc: 'ルートディレクトリに<code>manifest.webmanifest</code>を作成します：',
    manifestNote: 'マニフェストファイルはAndroidとPWA環境にどのアイコンを使用するかを伝えます。<code>"purpose": "any maskable"</code>の値により、アイコンが通常のアイコンとしてもAndroidのアダプティブアイコンマスク内でも機能します。',
    h2_darkmode: 'SVGによるダークモードFavicon',
    darkmodeDesc: 'SVG faviconの最も強力な機能の一つは、SVG内部のCSS <code>prefers-color-scheme</code>を使用してユーザーの配色に適応できることです：',
    darkmodeAfter: 'このSVG faviconは、ユーザーのOS・ブラウザテーマに基づいてダーク版とライト版を自動的に切り替えます。JavaScriptは不要で、純粋に宣言的です。Chrome、Firefox、Edgeで動作します。',
    h2_testing: '全プラットフォームでのFaviconテスト',
    testingDesc: 'favicon生成後、すべてのプラットフォームでテストして正しくレンダリングされることを確認します：',
    testingList: '<ul><li><strong>デスクトップブラウザ：</strong>Chrome、Firefox、Safari、Edgeでサイトを開きます。異なるズームレベルでタブアイコンを確認します。</li><li><strong>モバイルiOS：</strong>iPhoneのSafariでサイトを開き、「ホーム画面に追加」をタップします。180x180 Apple Touch Iconが正しく表示されることを確認します。</li><li><strong>モバイルAndroid：</strong>Chromeで開き、「ホーム画面に追加」をタップします。マニフェストの192x192と512x512アイコンが使用されることを確認します。</li><li><strong>PWA：</strong>Chrome経由でインストールし、スプラッシュスクリーンで512x512アイコンが使用されることを確認します。</li><li><strong>ダークモード：</strong>システムをダークモードに切り替え、SVG faviconが適応することを確認します。</li></ul>',
    h2_faq: 'よくある質問',
    faq1_q: '最低限必要なfaviconファイル数は？',
    faq1_a: '最低3ファイル必要です：ブラウザタブとレガシーサポート用の<code>favicon.ico</code>（32x32）、iOSホーム画面ブックマーク用の<code>apple-touch-icon.png</code>（180x180）、AndroidとPWAプラットフォーム用に<code>manifest.webmanifest</code>で参照される512x512 PNG。2026年ではこの3ファイルでデバイスとブラウザの99%以上をカバーします。',
    faq2_q: 'faviconにはSVGとPNGのどちらを使うべき？',
    faq2_a: '両方使います。PNGはApple Touch IconとWebマニフェストアイコンに必須です。SVGはブラウザタブのfaviconとして優れており、完全にスケーリングし、CSS <code>prefers-color-scheme</code>によるダークモードをサポートします。',
    faq3_q: 'faviconサイズはページ読み込み速度に影響する？',
    faq3_a: 'Faviconファイルは通常非常に小さく（15KB未満）、ブラウザによって積極的にキャッシュされるため、ページ読み込み速度への影響は無視できます。',
    faq4_q: 'ダークモードでfaviconを変更するには？',
    faq4_a: '<code>@media (prefers-color-scheme: dark)</code>クエリを含む<code>&lt;style&gt;</code>ブロックが埋め込まれたSVG faviconを使用します。Chrome、Firefox、Edgeで動作します。',
    faq5_q: 'Webマニフェストのmaskableアイコンの目的は？',
    faq5_a: 'MaskableアイコンはAndroidのアダプティブアイコンシステム用に設計されています。OSがアイコンを様々な形状（円形、角丸四角形など）にクロップします。maskableアイコンには余分なパディング（「セーフゾーン」）が含まれ、マスク時に重要な部分が切り取られません。',
    faq6_q: '2026年でもfavicon.icoファイルは必要？',
    faq6_a: 'はい。モダンブラウザはPNGとSVGのfaviconをサポートしていますが、多くのツールやサービスがルートディレクトリから<code>/favicon.ico</code>を自動的にリクエストします。含めるコストはほぼゼロで、サーバーログの404エラーを防ぎます。',
  },
  ko: {
    title: 'Favicon 가이드 2026: 모든 사이즈, 포맷 및 생성 방법',
    intro: 'Favicon은 브라우저 탭, 북마크, 홈 화면, 앱 전환기에 나타나는 작은 아이콘입니다. 크기는 작지만 브랜드 인지도와 사용자 경험에 큰 영향을 미칩니다. 이 <strong>완벽한 favicon 가이드</strong>는 2026년에 정확히 무엇이 필요한지, 그 이유와 Figma 또는 프로그래밍으로 favicon을 생성하는 방법을 알려줍니다.',
    h2_minimal: '최소 Favicon 설정: 실제로 필요한 3개 파일',
    minimalDesc: '2026년에는 모든 최신 브라우저, 기기, 플랫폼을 커버하는 데 <strong>3개의 파일</strong>만 있으면 됩니다:',
    minimalList: '<ul><li><strong>favicon.ico</strong> — 레거시 브라우저와 브라우저 탭용 32x32 ICO 파일</li><li><strong>apple-touch-icon.png</strong> — iOS 홈 화면 북마크용 180x180 PNG</li><li><strong>icon-512.png</strong> — Android, PWA 및 기타 최신 플랫폼용 웹 앱 매니페스트에서 참조하는 512x512 PNG</li></ul>',
    minimalAfter: '선택적으로 무한 확장성과 다크 모드 지원을 위해 SVG favicon을 추가할 수 있습니다. 하지만 이 세 파일만으로 Chrome, Firefox, Safari, Edge, iOS, Android를 완전히 커버합니다.',
    h2_sizes: '완전한 Favicon 사이즈 참조',
    sizesDesc: '모든 favicon 사이즈, 목적, 사용처에 대한 확정적 참조 테이블입니다:',
    sizeNote: '가장 일반적으로 요청되는 사이즈는 32x32(브라우저 탭), 180x180(Apple 기기), 512x512(PWA 스플래시 스크린)입니다. 이 세 가지만 제공하면 99% 이상의 사용 사례를 커버합니다.',
    h2_formats: '포맷 비교: ICO vs PNG vs SVG',
    formatsDesc: '올바른 favicon 포맷 선택이 중요합니다. 각 포맷에는 고유한 장점과 트레이드오프가 있습니다:',
    formatsAfter: '<strong>권장:</strong> <code>/favicon.ico</code> 폴백에는 ICO, Apple Touch Icon과 웹 매니페스트 아이콘에는 PNG, 지원하는 최신 브라우저에는 선택적으로 SVG를 사용하세요.',
    h2_creating: '단계별 가이드: Favicon 만들기',
    h3_figma: 'Figma에서',
    figmaSteps: '<ol><li>전용 프레임에서 <strong>512x512 픽셀</strong>로 아이콘을 디자인합니다. 단순하고 인식하기 쉬운 형태를 사용하세요.</li><li>프레임을 <strong>PNG</strong> 1x 스케일(512x512)로 내보냅니다.</li><li>프레임을 복제하여 <strong>180x180</strong>으로 리사이즈합니다. Apple Touch Icon용 PNG로 내보냅니다.</li><li>ICO 파일의 경우 <strong>32x32</strong> PNG로 내보내고 아래의 프로그래밍 방법으로 ICO로 변환합니다.</li><li>팁: 투명한 favicon이 필요하면 배경 레이어를 끄세요.</li></ol>',
    h3_programmatic: 'Sharp (Node.js)로 프로그래밍 생성',
    programmaticDesc: '<code>sharp</code> 라이브러리를 사용하여 단일 고해상도 소스 이미지에서 favicon 생성을 자동화할 수 있습니다:',
    programmaticIco: 'ICO 파일 생성에는 <code>png-to-ico</code> 패키지를 사용합니다:',
    h3_script: '완전한 빌드 스크립트',
    scriptDesc: '단일 소스 PNG에서 모든 필수 favicon 파일을 생성하는 완전한 Node.js 스크립트입니다:',
    h2_markup: 'HTML 마크업: 정확한 Link 태그와 Manifest',
    markupDesc: '사이트의 모든 페이지 <code>&lt;head&gt;</code>에 이 태그들을 추가합니다:',
    manifestDesc: '루트 디렉토리에 <code>manifest.webmanifest</code>를 생성합니다:',
    manifestNote: '매니페스트 파일은 Android와 PWA 환경에 어떤 아이콘을 사용할지 알려줍니다. <code>"purpose": "any maskable"</code> 값은 아이콘이 일반 아이콘과 Android의 적응형 아이콘 마스크 모두에서 작동하도록 합니다.',
    h2_darkmode: 'SVG로 다크 모드 Favicon 만들기',
    darkmodeDesc: 'SVG favicon의 가장 강력한 기능 중 하나는 SVG 내부의 CSS <code>prefers-color-scheme</code>를 사용하여 사용자의 색상 테마에 적응하는 것입니다:',
    darkmodeAfter: '이 SVG favicon은 사용자의 OS 또는 브라우저 테마 설정에 따라 다크 버전과 라이트 버전 사이를 자동으로 전환합니다. JavaScript가 필요 없으며 순수 선언적입니다. Chrome, Firefox, Edge에서 작동합니다.',
    h2_testing: '모든 플랫폼에서 Favicon 테스트',
    testingDesc: 'favicon 생성 후 모든 플랫폼에서 테스트하여 올바르게 렌더링되는지 확인합니다:',
    testingList: '<ul><li><strong>데스크톱 브라우저:</strong> Chrome, Firefox, Safari, Edge에서 사이트를 엽니다. 다른 줌 레벨에서 탭 아이콘을 확인합니다.</li><li><strong>모바일 iOS:</strong> iPhone의 Safari에서 사이트를 열고 "홈 화면에 추가"를 탭합니다. 180x180 Apple Touch Icon이 올바르게 표시되는지 확인합니다.</li><li><strong>모바일 Android:</strong> Chrome에서 열고 "홈 화면에 추가"를 탭합니다. 매니페스트의 192x192 및 512x512 아이콘이 사용되는지 확인합니다.</li><li><strong>PWA:</strong> Chrome을 통해 설치하고 스플래시 스크린에서 512x512 아이콘이 사용되는지 확인합니다.</li><li><strong>다크 모드:</strong> 시스템을 다크 모드로 전환하고 SVG favicon이 적응하는지 확인합니다.</li></ul>',
    h2_faq: '자주 묻는 질문',
    faq1_q: '최소 몇 개의 favicon 파일이 필요한가요?',
    faq1_a: '최소 3개 파일이 필요합니다: 브라우저 탭과 레거시 지원용 <code>favicon.ico</code>(32x32), iOS 홈 화면 북마크용 <code>apple-touch-icon.png</code>(180x180), Android와 PWA 플랫폼용 <code>manifest.webmanifest</code>에서 참조하는 512x512 PNG. 2026년에 이 3개 파일로 기기와 브라우저의 99% 이상을 커버합니다.',
    faq2_q: 'favicon에 SVG와 PNG 중 어느 것을 사용해야 하나요?',
    faq2_a: '둘 다 사용하세요. PNG는 Apple Touch Icon과 웹 매니페스트 아이콘에 필수입니다. SVG는 브라우저 탭 favicon으로 우수하며, 어떤 해상도로도 완벽하게 스케일링되고 CSS <code>prefers-color-scheme</code>를 통한 다크 모드를 지원합니다.',
    faq3_q: 'favicon 크기가 페이지 로딩 속도에 영향을 미치나요?',
    faq3_a: 'Favicon 파일은 일반적으로 매우 작고(15KB 미만) 브라우저에 의해 적극적으로 캐시되므로 페이지 로딩 속도에 미치는 영향은 무시할 수 있습니다.',
    faq4_q: '다크 모드에서 favicon을 변경하려면?',
    faq4_a: '<code>@media (prefers-color-scheme: dark)</code> 쿼리를 포함하는 <code>&lt;style&gt;</code> 블록이 포함된 SVG favicon을 사용하세요. Chrome, Firefox, Edge에서 작동합니다.',
    faq5_q: '웹 매니페스트에서 maskable 아이콘의 목적은?',
    faq5_a: 'Maskable 아이콘은 Android의 적응형 아이콘 시스템용으로 설계되었습니다. OS가 아이콘을 다양한 형태(원형, 둥근 사각형 등)로 자릅니다. maskable 아이콘에는 추가 패딩("안전 영역")이 포함되어 마스킹 시 중요한 부분이 잘리지 않습니다.',
    faq6_q: '2026년에도 favicon.ico 파일이 필요한가요?',
    faq6_a: '네. 최신 브라우저가 PNG와 SVG favicon을 지원하지만, 많은 도구와 서비스가 루트 디렉토리에서 <code>/favicon.ico</code>를 자동으로 요청합니다. 포함하는 비용은 거의 없으며 서버 로그의 404 오류를 방지합니다.',
  },
  fr: {
    title: 'Guide Favicon 2026 : Toutes les Tailles, Formats et Comment les Generer',
    intro: 'Les favicons sont les petites icones qui apparaissent dans les onglets du navigateur, les signets, les ecrans d\'accueil et les selecteurs d\'applications. Malgre leur petite taille, ils ont un impact important sur la reconnaissance de la marque et l\'experience utilisateur. Ce <strong>guide complet des favicons</strong> vous dit exactement ce dont vous avez besoin en 2026, pourquoi et comment les generer.',
    h2_minimal: 'Configuration Minimale : Seulement 3 Fichiers Necessaires',
    minimalDesc: 'En 2026, vous n\'avez besoin que de <strong>trois fichiers</strong> pour couvrir tous les navigateurs, appareils et plateformes modernes :',
    minimalList: '<ul><li><strong>favicon.ico</strong> — Fichier ICO 32x32 pour les anciens navigateurs et onglets</li><li><strong>apple-touch-icon.png</strong> — PNG 180x180 pour les signets d\'ecran d\'accueil iOS</li><li><strong>icon-512.png</strong> — PNG 512x512 reference dans le manifeste pour Android, PWA et autres plateformes</li></ul>',
    minimalAfter: 'En option, vous pouvez ajouter un favicon SVG pour une mise a l\'echelle infinie et le support du mode sombre. Mais ces trois fichiers seuls offrent une couverture complete.',
    h2_sizes: 'Reference Complete des Tailles de Favicon',
    sizesDesc: 'Voici le tableau de reference definitif pour chaque taille de favicon, son objectif et son utilisation :',
    sizeNote: 'Les tailles les plus demandees sont 32x32 (onglets), 180x180 (appareils Apple) et 512x512 (ecrans de demarrage PWA). Ces trois seules couvrent plus de 99% des cas.',
    h2_formats: 'Comparaison des Formats : ICO vs PNG vs SVG',
    formatsDesc: 'Le choix du bon format de favicon est important. Chaque format a des avantages et des compromis distincts :',
    formatsAfter: '<strong>Recommandation :</strong> Utilisez ICO pour le fallback <code>/favicon.ico</code>, PNG pour l\'Apple Touch Icon et les icones du manifeste, et optionnellement SVG pour les navigateurs modernes.',
    h2_creating: 'Etape par Etape : Creation de Favicons',
    h3_figma: 'Depuis Figma',
    figmaSteps: '<ol><li>Concevez votre icone a <strong>512x512 pixels</strong>. Utilisez une forme simple et reconnaissable.</li><li>Exportez en <strong>PNG</strong> a l\'echelle 1x (512x512).</li><li>Dupliquez et redimensionnez a <strong>180x180</strong>. Exportez en PNG pour l\'Apple Touch Icon.</li><li>Pour le fichier ICO, exportez en <strong>32x32</strong> PNG et convertissez en ICO.</li><li>Astuce : Desactivez les calques d\'arriere-plan pour un favicon transparent.</li></ol>',
    h3_programmatic: 'Programmation avec Sharp (Node.js)',
    programmaticDesc: 'Automatisez la generation de favicons a partir d\'une image source haute resolution avec la bibliotheque <code>sharp</code> :',
    programmaticIco: 'Pour generer le fichier ICO, utilisez le package <code>png-to-ico</code> :',
    h3_script: 'Script de Build Complet',
    scriptDesc: 'Voici un script Node.js complet qui genere tous les fichiers favicon necessaires a partir d\'un seul PNG source :',
    h2_markup: 'Balisage HTML : Balises Link et Manifeste',
    markupDesc: 'Ajoutez ces balises au <code>&lt;head&gt;</code> de chaque page de votre site :',
    manifestDesc: 'Creez un <code>manifest.webmanifest</code> dans votre repertoire racine :',
    manifestNote: 'Le fichier manifeste indique aux environnements Android et PWA quelles icones utiliser. La valeur <code>"purpose": "any maskable"</code> assure que l\'icone fonctionne comme icone standard et dans le masque adaptatif Android.',
    h2_darkmode: 'Favicons Mode Sombre avec SVG',
    darkmodeDesc: 'L\'une des fonctionnalites les plus puissantes des favicons SVG est la capacite de s\'adapter au theme de l\'utilisateur via CSS <code>prefers-color-scheme</code> :',
    darkmodeAfter: 'Ce favicon SVG bascule automatiquement entre les versions sombre et claire selon les preferences du systeme. Aucun JavaScript requis. Fonctionne dans Chrome, Firefox et Edge.',
    h2_testing: 'Tester vos Favicons sur Chaque Plateforme',
    testingDesc: 'Apres avoir genere vos favicons, testez-les sur toutes les plateformes :',
    testingList: '<ul><li><strong>Navigateurs desktop :</strong> Ouvrez votre site dans Chrome, Firefox, Safari et Edge. Verifiez l\'icone d\'onglet.</li><li><strong>Mobile iOS :</strong> Ouvrez dans Safari sur iPhone. Ajoutez a l\'ecran d\'accueil et verifiez l\'Apple Touch Icon 180x180.</li><li><strong>Mobile Android :</strong> Ouvrez dans Chrome et ajoutez a l\'ecran d\'accueil. Verifiez les icones 192x192 et 512x512 du manifeste.</li><li><strong>PWA :</strong> Installez via Chrome et verifiez l\'ecran de demarrage avec l\'icone 512x512.</li><li><strong>Mode sombre :</strong> Activez le mode sombre et verifiez l\'adaptation du favicon SVG.</li></ul>',
    h2_faq: 'Questions Frequentes',
    faq1_q: 'Quel est le nombre minimum de fichiers favicon necessaires ?',
    faq1_a: 'Vous avez besoin d\'un minimum de trois fichiers : <code>favicon.ico</code> (32x32), <code>apple-touch-icon.png</code> (180x180) et un PNG 512x512 reference dans votre <code>manifest.webmanifest</code>. Ces trois fichiers couvrent plus de 99% des appareils en 2026.',
    faq2_q: 'Faut-il utiliser SVG ou PNG pour le favicon ?',
    faq2_a: 'Utilisez les deux. PNG est requis pour l\'Apple Touch Icon et les icones du manifeste. SVG est excellent pour l\'onglet du navigateur car il s\'adapte parfaitement et supporte le mode sombre.',
    faq3_q: 'La taille du favicon affecte-t-elle la vitesse de chargement ?',
    faq3_a: 'Les fichiers favicon sont generalement tres petits (moins de 15 Ko) et sont mis en cache agressivement par les navigateurs. L\'impact sur la vitesse est negligeable.',
    faq4_q: 'Comment faire changer le favicon en mode sombre ?',
    faq4_a: 'Utilisez un favicon SVG avec un bloc <code>&lt;style&gt;</code> contenant une requete <code>@media (prefers-color-scheme: dark)</code>. Fonctionne dans Chrome, Firefox et Edge.',
    faq5_q: 'A quoi servent les icones maskable dans le manifeste ?',
    faq5_a: 'Les icones maskable sont concues pour le systeme d\'icones adaptatives d\'Android, ou l\'OS recadre l\'icone en differentes formes. L\'icone inclut un rembourrage supplementaire pour que les parties importantes ne soient pas coupees.',
    faq6_q: 'A-t-on encore besoin d\'un fichier favicon.ico en 2026 ?',
    faq6_a: 'Oui. Bien que les navigateurs modernes supportent PNG et SVG, de nombreux outils demandent automatiquement <code>/favicon.ico</code>. L\'inclure ne coute presque rien et evite les erreurs 404.',
  },
  de: {
    title: 'Favicon-Leitfaden 2026: Alle Groessen, Formate und Generierung',
    intro: 'Favicons sind die kleinen Symbole, die in Browser-Tabs, Lesezeichen, Startbildschirmen und App-Umschaltern erscheinen. Trotz ihrer geringen Groesse haben sie einen grossen Einfluss auf Markenerkennung und Benutzererfahrung. Dieser <strong>vollstaendige Favicon-Leitfaden</strong> erklaert genau, was Sie 2026 brauchen, warum und wie Sie Favicons generieren.',
    h2_minimal: 'Minimales Favicon-Setup: Nur 3 Dateien benoetigt',
    minimalDesc: 'In 2026 benoetigen Sie nur <strong>drei Dateien</strong>, um alle modernen Browser, Geraete und Plattformen abzudecken:',
    minimalList: '<ul><li><strong>favicon.ico</strong> — 32x32 ICO-Datei fuer aeltere Browser und Browser-Tabs</li><li><strong>apple-touch-icon.png</strong> — 180x180 PNG fuer iOS-Startbildschirm-Lesezeichen</li><li><strong>icon-512.png</strong> — 512x512 PNG, referenziert im Web-App-Manifest fuer Android, PWAs und andere moderne Plattformen</li></ul>',
    minimalAfter: 'Optional koennen Sie ein SVG-Favicon fuer unbegrenzte Skalierbarkeit und Dark-Mode-Unterstuetzung hinzufuegen. Aber diese drei Dateien allein bieten vollstaendige Abdeckung.',
    h2_sizes: 'Vollstaendige Favicon-Groessen-Referenz',
    sizesDesc: 'Hier ist die definitive Referenztabelle fuer jede Favicon-Groesse, ihren Zweck und ihre Verwendung:',
    sizeNote: 'Die am haeufigsten angeforderten Groessen sind 32x32 (Browser-Tabs), 180x180 (Apple-Geraete) und 512x512 (PWA-Startbildschirme). Nur diese drei decken ueber 99% der Anwendungsfaelle ab.',
    h2_formats: 'Formatvergleich: ICO vs PNG vs SVG',
    formatsDesc: 'Die Wahl des richtigen Favicon-Formats ist wichtig. Jedes Format hat unterschiedliche Vorteile und Kompromisse:',
    formatsAfter: '<strong>Empfehlung:</strong> Verwenden Sie ICO fuer den <code>/favicon.ico</code>-Fallback, PNG fuer Apple Touch Icon und Manifest-Icons, und optional SVG fuer moderne Browser.',
    h2_creating: 'Schritt fuer Schritt: Favicons Erstellen',
    h3_figma: 'Aus Figma',
    figmaSteps: '<ol><li>Entwerfen Sie Ihr Icon bei <strong>512x512 Pixeln</strong>. Verwenden Sie eine einfache, erkennbare Form.</li><li>Exportieren Sie als <strong>PNG</strong> im 1x-Massstab (512x512).</li><li>Duplizieren und skalieren Sie auf <strong>180x180</strong>. Exportieren Sie als PNG fuer das Apple Touch Icon.</li><li>Fuer die ICO-Datei exportieren Sie als <strong>32x32</strong> PNG und konvertieren mit den programmatischen Methoden unten.</li><li>Tipp: Deaktivieren Sie Hintergrundebenen fuer ein transparentes Favicon.</li></ol>',
    h3_programmatic: 'Programmatisch mit Sharp (Node.js)',
    programmaticDesc: 'Automatisieren Sie die Favicon-Generierung aus einem hochaufloesenden Quellbild mit der <code>sharp</code>-Bibliothek:',
    programmaticIco: 'Fuer die ICO-Generierung verwenden Sie das <code>png-to-ico</code>-Paket:',
    h3_script: 'Vollstaendiges Build-Skript',
    scriptDesc: 'Hier ist ein vollstaendiges Node.js-Skript, das alle erforderlichen Favicon-Dateien aus einem einzelnen Quell-PNG generiert:',
    h2_markup: 'HTML-Markup: Exakte Link-Tags und Manifest',
    markupDesc: 'Fuegen Sie diese Tags in den <code>&lt;head&gt;</code> jeder Seite Ihrer Website ein:',
    manifestDesc: 'Erstellen Sie eine <code>manifest.webmanifest</code> in Ihrem Stammverzeichnis:',
    manifestNote: 'Die Manifest-Datei teilt Android- und PWA-Umgebungen mit, welche Icons verwendet werden sollen. Der Wert <code>"purpose": "any maskable"</code> stellt sicher, dass das Icon sowohl als regulaeres Icon als auch innerhalb der adaptiven Icon-Maske von Android funktioniert.',
    h2_darkmode: 'Dark-Mode-Favicons mit SVG',
    darkmodeDesc: 'Eine der leistungsfaehigsten Funktionen von SVG-Favicons ist die Faehigkeit, sich ueber CSS <code>prefers-color-scheme</code> innerhalb des SVG an das Farbschema des Benutzers anzupassen:',
    darkmodeAfter: 'Dieses SVG-Favicon wechselt automatisch zwischen dunkler und heller Version basierend auf den Systemeinstellungen. Kein JavaScript erforderlich. Funktioniert in Chrome, Firefox und Edge.',
    h2_testing: 'Favicons auf Allen Plattformen Testen',
    testingDesc: 'Testen Sie nach der Generierung Ihre Favicons auf allen Plattformen:',
    testingList: '<ul><li><strong>Desktop-Browser:</strong> Oeffnen Sie Ihre Website in Chrome, Firefox, Safari und Edge. Pruefen Sie das Tab-Icon.</li><li><strong>Mobil iOS:</strong> Oeffnen Sie in Safari auf dem iPhone. Fuegen Sie zum Startbildschirm hinzu und pruefen Sie das 180x180 Apple Touch Icon.</li><li><strong>Mobil Android:</strong> Oeffnen Sie in Chrome und fuegen Sie zum Startbildschirm hinzu. Pruefen Sie die 192x192 und 512x512 Icons aus dem Manifest.</li><li><strong>PWA:</strong> Installieren Sie ueber Chrome und pruefen Sie den Startbildschirm mit dem 512x512 Icon.</li><li><strong>Dark Mode:</strong> Wechseln Sie in den Dark Mode und pruefen Sie die SVG-Favicon-Anpassung.</li></ul>',
    h2_faq: 'Haeufig Gestellte Fragen',
    faq1_q: 'Wie viele Favicon-Dateien brauche ich mindestens?',
    faq1_a: 'Sie benoetigen mindestens drei Dateien: <code>favicon.ico</code> (32x32), <code>apple-touch-icon.png</code> (180x180) und ein 512x512 PNG in Ihrem <code>manifest.webmanifest</code>. Diese drei Dateien decken 2026 ueber 99% der Geraete ab.',
    faq2_q: 'Soll ich SVG oder PNG fuer mein Favicon verwenden?',
    faq2_a: 'Verwenden Sie beides. PNG ist erforderlich fuer Apple Touch Icons und Manifest-Icons. SVG ist hervorragend fuer Browser-Tabs, da es perfekt skaliert und Dark Mode ueber CSS unterstuetzt.',
    faq3_q: 'Beeinflusst die Favicon-Groesse die Ladegeschwindigkeit?',
    faq3_a: 'Favicon-Dateien sind normalerweise sehr klein (unter 15 KB) und werden aggressiv vom Browser gecacht. Der Einfluss auf die Ladegeschwindigkeit ist vernachlaessigbar.',
    faq4_q: 'Wie aendere ich mein Favicon im Dark Mode?',
    faq4_a: 'Verwenden Sie ein SVG-Favicon mit einem eingebetteten <code>&lt;style&gt;</code>-Block mit <code>@media (prefers-color-scheme: dark)</code>-Abfrage. Funktioniert in Chrome, Firefox und Edge.',
    faq5_q: 'Wozu dienen maskable Icons im Web-Manifest?',
    faq5_a: 'Maskable Icons sind fuer Androids adaptives Icon-System konzipiert, bei dem das OS das Icon in verschiedene Formen zuschneidet. Das maskable Icon enthaelt zusaetzlichen Abstand, damit wichtige Teile nicht abgeschnitten werden.',
    faq6_q: 'Brauche ich 2026 noch eine favicon.ico-Datei?',
    faq6_a: 'Ja. Obwohl moderne Browser PNG und SVG unterstuetzen, fordern viele Tools automatisch <code>/favicon.ico</code> an. Das Einbinden kostet fast nichts und vermeidet 404-Fehler.',
  },
  es: {
    title: 'Guia de Favicon 2026: Todos los Tamanos, Formatos y Como Generarlos',
    intro: 'Los favicons son los pequenos iconos que aparecen en las pestanas del navegador, marcadores, pantallas de inicio y selectores de aplicaciones. A pesar de su tamano reducido, tienen un gran impacto en el reconocimiento de marca y la experiencia del usuario. Esta <strong>guia completa de favicons</strong> te dice exactamente que necesitas en 2026, por que y como generarlos.',
    h2_minimal: 'Configuracion Minima: Solo 3 Archivos Necesarios',
    minimalDesc: 'En 2026, solo necesitas <strong>tres archivos</strong> para cubrir todos los navegadores, dispositivos y plataformas modernos:',
    minimalList: '<ul><li><strong>favicon.ico</strong> — Archivo ICO 32x32 para navegadores antiguos y pestanas</li><li><strong>apple-touch-icon.png</strong> — PNG 180x180 para marcadores de pantalla de inicio iOS</li><li><strong>icon-512.png</strong> — PNG 512x512 referenciado en el manifiesto para Android, PWAs y otras plataformas</li></ul>',
    minimalAfter: 'Opcionalmente, puedes agregar un favicon SVG para escalabilidad infinita y soporte de modo oscuro. Pero estos tres archivos solos proporcionan cobertura completa.',
    h2_sizes: 'Referencia Completa de Tamanos de Favicon',
    sizesDesc: 'Aqui esta la tabla de referencia definitiva para cada tamano de favicon, su proposito y donde se usa:',
    sizeNote: 'Los tamanos mas solicitados son 32x32 (pestanas), 180x180 (dispositivos Apple) y 512x512 (pantallas de inicio PWA). Solo estos tres cubren mas del 99% de los casos.',
    h2_formats: 'Comparacion de Formatos: ICO vs PNG vs SVG',
    formatsDesc: 'Elegir el formato correcto de favicon es importante. Cada formato tiene ventajas y desventajas distintas:',
    formatsAfter: '<strong>Recomendacion:</strong> Usa ICO para el fallback <code>/favicon.ico</code>, PNG para Apple Touch Icon e iconos del manifiesto, y opcionalmente SVG para navegadores modernos.',
    h2_creating: 'Paso a Paso: Creacion de Favicons',
    h3_figma: 'Desde Figma',
    figmaSteps: '<ol><li>Disena tu icono a <strong>512x512 pixeles</strong>. Usa una forma simple y reconocible.</li><li>Exporta como <strong>PNG</strong> a escala 1x (512x512).</li><li>Duplica y redimensiona a <strong>180x180</strong>. Exporta como PNG para el Apple Touch Icon.</li><li>Para el archivo ICO, exporta como <strong>32x32</strong> PNG y convierte a ICO.</li><li>Consejo: Desactiva las capas de fondo para un favicon transparente.</li></ol>',
    h3_programmatic: 'Programaticamente con Sharp (Node.js)',
    programmaticDesc: 'Automatiza la generacion de favicons desde una imagen fuente de alta resolucion con la biblioteca <code>sharp</code>:',
    programmaticIco: 'Para generar el archivo ICO, usa el paquete <code>png-to-ico</code>:',
    h3_script: 'Script de Build Completo',
    scriptDesc: 'Aqui esta un script completo de Node.js que genera todos los archivos favicon necesarios desde un unico PNG fuente:',
    h2_markup: 'Marcado HTML: Etiquetas Link Exactas y Manifiesto',
    markupDesc: 'Agrega estas etiquetas al <code>&lt;head&gt;</code> de cada pagina de tu sitio:',
    manifestDesc: 'Crea un <code>manifest.webmanifest</code> en tu directorio raiz:',
    manifestNote: 'El archivo de manifiesto le dice a los entornos Android y PWA que iconos usar. El valor <code>"purpose": "any maskable"</code> asegura que el icono funcione tanto como icono regular como dentro de la mascara adaptativa de Android.',
    h2_darkmode: 'Favicons en Modo Oscuro con SVG',
    darkmodeDesc: 'Una de las funciones mas poderosas de los favicons SVG es la capacidad de adaptarse al esquema de color del usuario usando CSS <code>prefers-color-scheme</code> dentro del SVG:',
    darkmodeAfter: 'Este favicon SVG cambia automaticamente entre las versiones oscura y clara segun las preferencias del sistema. No requiere JavaScript. Funciona en Chrome, Firefox y Edge.',
    h2_testing: 'Probando Favicons en Cada Plataforma',
    testingDesc: 'Despues de generar tus favicons, pruebalos en todas las plataformas:',
    testingList: '<ul><li><strong>Navegadores de escritorio:</strong> Abre tu sitio en Chrome, Firefox, Safari y Edge. Verifica el icono de pestana.</li><li><strong>Movil iOS:</strong> Abre en Safari en iPhone. Agrega a la pantalla de inicio y verifica el Apple Touch Icon 180x180.</li><li><strong>Movil Android:</strong> Abre en Chrome y agrega a la pantalla de inicio. Verifica los iconos 192x192 y 512x512 del manifiesto.</li><li><strong>PWA:</strong> Instala via Chrome y verifica la pantalla de inicio con el icono 512x512.</li><li><strong>Modo oscuro:</strong> Cambia al modo oscuro y verifica la adaptacion del favicon SVG.</li></ul>',
    h2_faq: 'Preguntas Frecuentes',
    faq1_q: 'Cual es el numero minimo de archivos favicon necesarios?',
    faq1_a: 'Necesitas un minimo de tres archivos: <code>favicon.ico</code> (32x32), <code>apple-touch-icon.png</code> (180x180) y un PNG 512x512 referenciado en tu <code>manifest.webmanifest</code>. Estos tres archivos cubren mas del 99% de dispositivos en 2026.',
    faq2_q: 'Debo usar SVG o PNG para mi favicon?',
    faq2_a: 'Usa ambos. PNG es requerido para Apple Touch Icons e iconos del manifiesto. SVG es excelente para pestanas del navegador ya que escala perfectamente y soporta modo oscuro via CSS.',
    faq3_q: 'El tamano del favicon afecta la velocidad de carga?',
    faq3_a: 'Los archivos favicon son tipicamente muy pequenos (menos de 15 KB) y los navegadores los cachean agresivamente. El impacto en la velocidad es insignificante.',
    faq4_q: 'Como hago que mi favicon cambie en modo oscuro?',
    faq4_a: 'Usa un favicon SVG con un bloque <code>&lt;style&gt;</code> que contenga <code>@media (prefers-color-scheme: dark)</code>. Funciona en Chrome, Firefox y Edge.',
    faq5_q: 'Para que sirven los iconos maskable en el manifiesto?',
    faq5_a: 'Los iconos maskable estan disenados para el sistema de iconos adaptativos de Android, donde el SO recorta el icono en varias formas. El icono incluye relleno adicional para que las partes importantes no se corten.',
    faq6_q: 'Todavia necesito un archivo favicon.ico en 2026?',
    faq6_a: 'Si. Aunque los navegadores modernos soportan PNG y SVG, muchas herramientas solicitan automaticamente <code>/favicon.ico</code>. Incluirlo no cuesta casi nada y evita errores 404.',
  },
};

export default function FaviconGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a.replace(/<[^>]*>/g, '') } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a.replace(/<[^>]*>/g, '') } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ── Minimal Setup ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_minimal}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.minimalDesc }} />
      <div dangerouslySetInnerHTML={{ __html: t.minimalList }} />
      <p>{t.minimalAfter}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- The minimal favicon setup for 2026 -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">`}</code></pre>

      {/* ── Size Reference ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_sizes}</h2>
      <p>{t.sizesDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Size</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Format</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Purpose</th>
              <th className="border border-gray-700 px-4 py-2 text-left">Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">16x16</td>
              <td className="border border-gray-700 px-4 py-2">ICO / PNG</td>
              <td className="border border-gray-700 px-4 py-2">Browser tab (classic), bookmarks bar</td>
              <td className="border border-gray-700 px-4 py-2">Optional (embedded in 32x32 ICO)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">32x32</td>
              <td className="border border-gray-700 px-4 py-2">ICO / PNG</td>
              <td className="border border-gray-700 px-4 py-2">Browser tab (standard), Windows taskbar shortcut</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">48x48</td>
              <td className="border border-gray-700 px-4 py-2">ICO / PNG</td>
              <td className="border border-gray-700 px-4 py-2">Windows desktop shortcut, Google search results</td>
              <td className="border border-gray-700 px-4 py-2">Optional (recommended for Google)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">180x180</td>
              <td className="border border-gray-700 px-4 py-2">PNG</td>
              <td className="border border-gray-700 px-4 py-2">Apple Touch Icon (iOS/iPadOS home screen)</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">192x192</td>
              <td className="border border-gray-700 px-4 py-2">PNG</td>
              <td className="border border-gray-700 px-4 py-2">Android home screen icon (via manifest)</td>
              <td className="border border-gray-700 px-4 py-2">Recommended</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">512x512</td>
              <td className="border border-gray-700 px-4 py-2">PNG</td>
              <td className="border border-gray-700 px-4 py-2">PWA splash screen, Android adaptive icon, Chrome install</td>
              <td className="border border-gray-700 px-4 py-2">Yes (for PWA)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Any</td>
              <td className="border border-gray-700 px-4 py-2">SVG</td>
              <td className="border border-gray-700 px-4 py-2">Modern browsers (scalable, dark mode support)</td>
              <td className="border border-gray-700 px-4 py-2">Optional (highly recommended)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4">{t.sizeNote}</p>

      {/* ── Format Comparison ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_formats}</h2>
      <p>{t.formatsDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">Feature</th>
              <th className="border border-gray-700 px-4 py-2 text-left">ICO</th>
              <th className="border border-gray-700 px-4 py-2 text-left">PNG</th>
              <th className="border border-gray-700 px-4 py-2 text-left">SVG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Multiple sizes in one file</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-700 px-4 py-2">N/A (scalable)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Transparency</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
              <td className="border border-gray-700 px-4 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Scalability</td>
              <td className="border border-gray-700 px-4 py-2">Fixed (pixelated)</td>
              <td className="border border-gray-700 px-4 py-2">Fixed (pixelated)</td>
              <td className="border border-gray-700 px-4 py-2">Infinite (vector)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Dark mode support</td>
              <td className="border border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-700 px-4 py-2">Yes (CSS media query)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">File size</td>
              <td className="border border-gray-700 px-4 py-2">Small-Medium (1-15 KB)</td>
              <td className="border border-gray-700 px-4 py-2">Small (1-10 KB per size)</td>
              <td className="border border-gray-700 px-4 py-2">Very small (0.5-3 KB)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Browser support</td>
              <td className="border border-gray-700 px-4 py-2">All browsers</td>
              <td className="border border-gray-700 px-4 py-2">All modern browsers</td>
              <td className="border border-gray-700 px-4 py-2">Chrome, Firefox, Edge (no Safari tab)</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Apple Touch Icon</td>
              <td className="border border-gray-700 px-4 py-2">Not supported</td>
              <td className="border border-gray-700 px-4 py-2">Required format</td>
              <td className="border border-gray-700 px-4 py-2">Not supported</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Web manifest</td>
              <td className="border border-gray-700 px-4 py-2">Not recommended</td>
              <td className="border border-gray-700 px-4 py-2">Required format</td>
              <td className="border border-gray-700 px-4 py-2">Not supported</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2">Animation</td>
              <td className="border border-gray-700 px-4 py-2">No</td>
              <td className="border border-gray-700 px-4 py-2">No (APNG limited)</td>
              <td className="border border-gray-700 px-4 py-2">Yes (CSS/SMIL)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4" dangerouslySetInnerHTML={{ __html: t.formatsAfter }} />

      {/* ── Creating Favicons ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_creating}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_figma}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.figmaSteps }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_programmatic}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.programmaticDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`import sharp from 'sharp';

// Generate multiple sizes from a single source
const sizes = [16, 32, 48, 180, 192, 512];

async function generateFavicons(sourceFile: string) {
  for (const size of sizes) {
    await sharp(sourceFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(\`favicon-\${size}x\${size}.png\`);

    console.log(\`Generated favicon-\${size}x\${size}.png\`);
  }
}

generateFavicons('icon-source.png');`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.programmaticIco }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';

async function generateIco() {
  // Include 16x16, 32x32, and 48x48 in a single ICO file
  const icoBuffer = await pngToIco([
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
  ]);
  writeFileSync('favicon.ico', icoBuffer);
  console.log('Generated favicon.ico');
}

generateIco();`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_script}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.scriptDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`#!/usr/bin/env node
// generate-favicons.mjs
// Usage: node generate-favicons.mjs icon-source.png

import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync, mkdirSync } from 'fs';

const SOURCE = process.argv[2] || 'icon-source.png';
const OUT_DIR = './public';

mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  // 1. Generate PNG sizes
  const pngSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
  ];

  for (const { size, name } of pngSizes) {
    await sharp(SOURCE)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(\`\${OUT_DIR}/\${name}\`);
    console.log(\`  Created \${name}\`);
  }

  // 2. Generate ICO (combines 16, 32, 48)
  const icoBuffer = await pngToIco([
    \`\${OUT_DIR}/favicon-16x16.png\`,
    \`\${OUT_DIR}/favicon-32x32.png\`,
    \`\${OUT_DIR}/favicon-48x48.png\`,
  ]);
  writeFileSync(\`\${OUT_DIR}/favicon.ico\`, icoBuffer);
  console.log('  Created favicon.ico');

  // 3. Generate manifest.webmanifest
  const manifest = {
    name: 'Your App Name',
    short_name: 'App',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  };
  writeFileSync(
    \`\${OUT_DIR}/manifest.webmanifest\`,
    JSON.stringify(manifest, null, 2)
  );
  console.log('  Created manifest.webmanifest');

  console.log('\\nDone! All favicon files generated.');
}

main().catch(console.error);`}</code></pre>

      {/* ── HTML Markup ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_markup}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.markupDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<head>
  <!-- Favicon: ICO fallback for legacy browsers -->
  <link rel="icon" href="/favicon.ico" sizes="32x32">

  <!-- Favicon: SVG for modern browsers (scalable + dark mode) -->
  <link rel="icon" href="/icon.svg" type="image/svg+xml">

  <!-- Apple Touch Icon: iOS home screen -->
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Web App Manifest: Android + PWA -->
  <link rel="manifest" href="/manifest.webmanifest">

  <!-- Optional: theme color for browser chrome -->
  <meta name="theme-color" content="#ffffff"
        media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#1a1a2e"
        media="(prefers-color-scheme: dark)">
</head>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.manifestDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`{
  "name": "Your Application Name",
  "short_name": "AppName",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.manifestNote }} />

      {/* ── Dark Mode ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_darkmode}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.darkmodeDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <style>
    /* Light mode (default) */
    .icon-bg { fill: #1a1a2e; }
    .icon-fg { fill: #ffffff; }

    /* Dark mode override */
    @media (prefers-color-scheme: dark) {
      .icon-bg { fill: #e0e0e0; }
      .icon-fg { fill: #1a1a2e; }
    }
  </style>

  <!-- Background circle -->
  <circle class="icon-bg" cx="64" cy="64" r="60" />

  <!-- Foreground shape (your logo/icon) -->
  <path class="icon-fg"
        d="M44 40 h40 v12 H56 v8 h24 v12 H56 v16 H44 V40z" />
</svg>`}</code></pre>

      <p>{t.darkmodeAfter}</p>

      <p>Reference this SVG in your HTML:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- SVG favicon with automatic dark mode -->
<link rel="icon" href="/icon.svg" type="image/svg+xml">

<!-- ICO fallback for browsers that don't support SVG favicons -->
<link rel="icon" href="/favicon.ico" sizes="32x32">`}</code></pre>

      {/* ── Testing ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_testing}</h2>
      <p>{t.testingDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: t.testingList }} />

      <p className="mt-4">Quick checklist for verifying your favicon setup:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Verify all favicon files exist and are accessible
curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/favicon.ico
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/icon.svg
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/apple-touch-icon.png
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" https://yoursite.com/manifest.webmanifest
# Expected: 200

# Validate manifest JSON
curl -s https://yoursite.com/manifest.webmanifest | python3 -m json.tool
# Should output formatted JSON without errors`}</code></pre>

      {/* ── FAQ ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq6_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq6_a }} />
    </article>
  );
}
