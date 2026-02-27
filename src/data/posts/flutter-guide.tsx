'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Flutter Guide: Complete Tutorial for Cross-Platform App Development (Flutter 3.x)',
    description: 'A comprehensive Flutter guide covering Dart basics, widgets, StatelessWidget, StatefulWidget, state management (Provider, Riverpod, Bloc, GetX), Navigator 2.0, go_router, HTTP and Dio integration, forms, JSON serialization, and deploying to iOS, Android, Web, and Desktop — with real Dart code examples.',
    tldr: 'Flutter is Google\'s open-source UI toolkit for building natively compiled applications for mobile, web, and desktop from a single Dart codebase. Unlike React Native (which bridges to native components), Flutter owns its rendering pipeline using the Skia/Impeller engine, drawing every pixel itself. This gives Flutter exceptional performance and pixel-perfect consistency across platforms. Flutter 3.x supports iOS, Android, Web, macOS, Windows, and Linux from a single codebase. The widget-everything philosophy, hot reload, and a rich ecosystem of pub.dev packages make Flutter one of the fastest ways to ship high-quality multi-platform apps.',
    keyTakeaway1: 'Flutter renders its own UI — it does not wrap native components. The Skia/Impeller engine draws every widget directly, giving pixel-perfect consistency across iOS, Android, Web, and Desktop.',
    keyTakeaway2: 'Everything in Flutter is a widget — StatelessWidget for static UI, StatefulWidget for dynamic UI that changes over time. Build complex UIs by composing small, reusable widgets.',
    keyTakeaway3: 'Hot reload is Flutter\'s killer feature — save a Dart file and see changes reflected in under a second without losing app state, dramatically speeding up the UI development loop.',
    keyTakeaway4: 'For state management, start with setState for local state, Provider or Riverpod for shared state, and Bloc/Cubit when you need strict separation of business logic from UI.',
    keyTakeaway5: 'Navigator 2.0 and go_router provide declarative routing with deep linking, typed parameters, and route guards — go_router is the Google-recommended solution for most apps.',
    keyTakeaway6: 'Flutter 3.x targets six platforms from one codebase: iOS, Android, Web (canvas or HTML renderer), macOS, Windows, and Linux — reduce maintenance overhead while shipping everywhere.',
    intro: 'Flutter is Google\'s cross-platform UI framework, first released in 2017 and reaching its 1.0 stable milestone in December 2018. Since Flutter 2.0 (March 2021), the framework has supported stable builds for iOS, Android, and Web. Flutter 3.0 (May 2022) extended stable support to macOS, Linux, and Windows, making it the first framework with stable multi-platform support out of the box. The Dart language, also from Google, underpins Flutter with strong typing, null safety, async/await, and ahead-of-time compilation. As of Flutter 3.x (2023–2025), adoption has accelerated at companies like Alibaba, BMW, eBay, and Google Pay. This guide covers everything you need to take a Flutter app from zero to production.',
  },
  zh: {
    title: 'Flutter 完全指南：跨平台应用开发教程（Flutter 3.x）',
    description: '全面的 Flutter 指南，涵盖 Dart 基础、Widget、StatelessWidget、StatefulWidget、状态管理（Provider、Riverpod、Bloc、GetX）、Navigator 2.0、go_router、HTTP 与 Dio 集成、表单、JSON 序列化以及部署到 iOS、Android、Web 和桌面端——附真实 Dart 代码示例。',
    tldr: 'Flutter 是 Google 的开源 UI 工具包，用于从单一 Dart 代码库构建原生编译的移动端、Web 和桌面应用。与使用桥接到原生组件的 React Native 不同，Flutter 使用 Skia/Impeller 引擎完全自主渲染，自己绘制每一个像素。这赋予 Flutter 卓越的性能和跨平台像素级一致性。Flutter 3.x 支持从单一代码库运行于 iOS、Android、Web、macOS、Windows 和 Linux。Widget 即一切的理念、热重载以及丰富的 pub.dev 生态，使 Flutter 成为最快速交付高质量多端应用的方案之一。',
    keyTakeaway1: 'Flutter 自渲染 UI——不封装原生组件。Skia/Impeller 引擎直接绘制每个 Widget，在 iOS、Android、Web 和桌面端实现像素级一致性。',
    keyTakeaway2: 'Flutter 中一切皆 Widget——StatelessWidget 用于静态 UI，StatefulWidget 用于随时间变化的动态 UI。通过组合小型、可复用的 Widget 构建复杂 UI。',
    keyTakeaway3: '热重载是 Flutter 的杀手级特性——保存 Dart 文件，不到一秒即可看到变更，同时保留应用状态，极大加速 UI 开发循环。',
    keyTakeaway4: '状态管理方面，局部状态从 setState 开始，共享状态用 Provider 或 Riverpod，业务逻辑与 UI 需要严格分离时用 Bloc/Cubit。',
    keyTakeaway5: 'Navigator 2.0 和 go_router 提供声明式路由，支持深链接、类型化参数和路由守卫——go_router 是大多数应用的 Google 推荐方案。',
    keyTakeaway6: 'Flutter 3.x 从单一代码库支持六个平台：iOS、Android、Web（Canvas 或 HTML 渲染器）、macOS、Windows 和 Linux——降低维护成本，同时覆盖所有端。',
    intro: 'Flutter 是 Google 的跨平台 UI 框架，2017 年首次发布，2018 年 12 月达到 1.0 稳定里程碑。自 Flutter 2.0（2021 年 3 月）起，框架支持 iOS、Android 和 Web 的稳定构建。Flutter 3.0（2022 年 5 月）将稳定支持扩展到 macOS、Linux 和 Windows，成为首个开箱即用支持多平台稳定版的框架。同为 Google 出品的 Dart 语言，以强类型、空安全、async/await 和预编译为 Flutter 提供底层支持。截至 Flutter 3.x（2023–2025），阿里巴巴、宝马、eBay 和 Google Pay 等公司相继加速采用。本指南涵盖从零到生产所需的一切内容。',
  },
};

export default function FlutterGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['en'];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Dart hard to learn for JavaScript developers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dart is one of the easiest languages for JavaScript/TypeScript developers to learn. The syntax is C-style (familiar braces, semicolons, for loops), the type system resembles TypeScript, and async/await works identically. Most developers write productive Flutter code within a week. Key differences: strong null safety enforced by the compiler, explicit typing encouraged (though type inference is powerful), and no prototype-based OOP — Dart uses classical class-based inheritance. The official dart.dev tour takes about 2 hours to complete.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Flutter performance compare to native apps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flutter achieves 60fps (or 120fps on high-refresh devices) on par with native apps for most use cases. Because Flutter owns the rendering pipeline (no bridge to native UI), there is no JavaScript-to-native bridge overhead like React Native. The Impeller rendering engine (default in Flutter 3.10+ on iOS, Flutter 3.13+ on Android) eliminates shader compilation jank. For CPU-intensive tasks, Dart\'s AOT compilation produces fast native code. The main performance caveat is that very complex layouts with hundreds of deeply nested widgets can be slower than optimized native code — use const constructors and avoid rebuilding unnecessarily.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is null safety in Dart and why does it matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Null safety (introduced in Dart 2.12, stable March 2021) means that variables cannot be null unless explicitly declared nullable with a ?. For example, String name cannot be null, but String? name can. This is enforced at compile time, not runtime, eliminating the entire class of null-dereference errors. Sound null safety also enables the compiler to produce faster, smaller code because it can skip null checks. All Flutter packages on pub.dev have migrated to null safety. For nullable variables, use the null-aware operators: ?. (null-safe method call), ?? (null coalescing), and ??= (null-aware assignment).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the main differences between Provider and Riverpod?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Riverpod was created by the same author as Provider (Remi Rousselet) to fix Provider\'s fundamental limitations. Provider requires a BuildContext to read values (problematic outside the widget tree) and can throw ProviderNotFoundException at runtime. Riverpod is compile-time safe — providers are global constants, readable anywhere without context, and impossible to accidentally access the wrong provider. Riverpod 2.0 introduced code generation (riverpod_generator) that reduces boilerplate significantly. For new projects, Riverpod is the recommended choice; Provider is still maintained and works well for simpler use cases.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use go_router or Navigator 2.0 directly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use go_router for almost all applications. Navigator 2.0 (the Router API introduced in Flutter 2.0) is powerful but notoriously complex to implement correctly — handling back button, deep links, and web URL sync requires significant boilerplate. go_router is the officially recommended package from the Flutter team (pub.dev/packages/go_router), built on top of Navigator 2.0. It provides a declarative URL-based routing system, type-safe path parameters, nested routes, route guards (redirect), and deep link handling with minimal configuration. The typed routes extension (go_router_builder) adds compile-time type safety to navigation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Impeller rendering engine in Flutter 3.x?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Impeller is Flutter\'s new rendering engine, replacing the Skia-based engine for Metal (iOS) and Vulkan (Android). Skia used just-in-time (JIT) shader compilation that caused unpredictable jank — stutters on first frame render. Impeller pre-compiles shaders at build time, eliminating jank entirely. It is the default renderer on iOS since Flutter 3.10 and on Android since Flutter 3.13. Impeller also enables better text rendering and new visual effects. If you encounter Impeller-specific rendering bugs, you can opt out with --no-enable-impeller, but the goal is for Impeller to fully replace Skia.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle platform-specific code in Flutter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flutter provides multiple mechanisms for platform-specific code. Platform channels (MethodChannel) allow Dart to call native iOS (Swift/Objective-C) or Android (Kotlin/Java) code and receive results — used for accessing device APIs not exposed by Flutter plugins. The Platform class (dart:io) lets you check the current platform: Platform.isIOS, Platform.isAndroid, Platform.isMacOS etc. For UI differences, use kIsWeb for web detection. Most device APIs (camera, GPS, notifications, Bluetooth) already have battle-tested Flutter plugins on pub.dev, so platform channels are rarely needed directly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What Flutter version should I use in 2024/2025?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the latest stable Flutter 3.x release. Flutter follows a stable channel release roughly every 3 months. As of 2024/2025, Flutter 3.19–3.24 are the relevant stable releases with improvements to Impeller, Material 3 widgets, Dart 3.x with pattern matching and records, and improved Web and Desktop support. Always use flutter upgrade on the stable channel to stay current. Avoid the beta or dev channels for production apps. The Flutter stable changelog at docs.flutter.dev/release/release-notes lists breaking changes and migration guides for each release.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.75' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Title */}
      <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem' }}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, color: '#0369a1', marginBottom: '0.4rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1rem' }}>Key Takeaways</h2>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {[t.keyTakeaway1, t.keyTakeaway2, t.keyTakeaway3, t.keyTakeaway4, t.keyTakeaway5, t.keyTakeaway6].map((item, i) => (
            <li key={i} style={{ color: '#334155', fontSize: '0.97rem' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Intro paragraph */}
      <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: '#334155' }}>{t.intro}</p>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 1 — What is Flutter */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        1. What is Flutter? Dart, Skia/Impeller, and the Cross-Platform Promise
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Flutter is a UI toolkit — not just a framework. It bundles an entire rendering engine (Skia on older versions, Impeller on Flutter 3.10+), the Dart runtime, a rich widget library (Material Design and Cupertino), and platform embedders for each target OS. When you write a Flutter app, you write in Dart; the Flutter engine handles painting pixels on screen using the GPU, entirely bypassing native UI components like UIKit (iOS) or Android View. This is fundamentally different from React Native, Xamarin, or Ionic, which all rely on native components in some form.
      </p>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        <strong>Dart</strong> is a statically typed, garbage-collected language with a syntax familiar to Java and JavaScript developers. It supports AOT (ahead-of-time) compilation for production builds (resulting in fast native code with no JIT overhead) and JIT compilation during development (enabling hot reload). Dart 3.x added records, pattern matching, sealed classes, and class modifiers, making the language significantly more expressive.
      </p>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        <strong>Skia</strong> was the original 2D graphics engine, used in Chrome and Android. It works well but suffered from shader compilation jank — first-frame stutters when new shaders are compiled at runtime. <strong>Impeller</strong> (Flutter 3.10+ on iOS, 3.13+ on Android) solves this by pre-compiling all shaders at build time, delivering consistently smooth 60/120fps animations. Impeller is the future of Flutter rendering.
      </p>
      <p style={{ marginBottom: '1.5rem', color: '#334155' }}>
        <strong>Platform support as of Flutter 3.x:</strong> iOS, Android, Web (CanvasKit and HTML renderers), macOS, Windows, and Linux. A single <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>flutter pub get</code> + <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>flutter build</code> targets any of these platforms.
      </p>

      {/* Install snippet */}
      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        <code>{`# Install Flutter SDK (macOS example via git)
git clone https://github.com/flutter/flutter.git -b stable
export PATH="\$PATH:\`pwd\`/flutter/bin"

# Verify installation
flutter doctor

# Create a new Flutter project
flutter create my_app
cd my_app

# Run on connected device or emulator
flutter run

# Run on Chrome (web)
flutter run -d chrome

# Build release APK for Android
flutter build apk --release

# Build release IPA for iOS
flutter build ipa`}</code>
      </pre>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 2 — Flutter Basics */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        2. Flutter Basics: Widgets, BuildContext, and Hot Reload
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        The defining principle of Flutter is: <em>everything is a widget</em>. A widget is an immutable description of part of the user interface. Widgets form a tree — the <strong>widget tree</strong>. Flutter compares the current tree to the previous tree (reconciliation) and only rebuilds what changed. This is similar to React's virtual DOM model.
      </p>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        There are two fundamental widget types: <strong>StatelessWidget</strong> (immutable, built once, rebuilt only when its parent rebuilds with new parameters) and <strong>StatefulWidget</strong> (paired with a <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>State</code> object that persists across rebuilds and can call <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>setState()</code> to trigger a rebuild).
      </p>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        <strong>BuildContext</strong> is a handle to the location of a widget in the widget tree. It is used to look up inherited widgets (Theme, MediaQuery, Navigator) and to access the widget tree above the current widget. Never store a BuildContext across async gaps — it may become stale. Always check <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>context.mounted</code> (Flutter 3.7+) before using context after an await.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`import 'package:flutter/material.dart';

// Entry point
void main() => runApp(const MyApp());

// Root widget — StatelessWidget
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const CounterPage(),
    );
  }
}

// StatefulWidget — mutable state
class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(
        child: Text(
          'Count: \$_count',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _increment,
        child: const Icon(Icons.add),
      ),
    );
  }
}`}</code>
      </pre>

      <p style={{ marginBottom: '1.5rem', color: '#334155' }}>
        <strong>Hot reload</strong> (press <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>r</code> in the terminal or save in VS Code/Android Studio) injects updated source code into the running Dart VM and triggers a widget rebuild — all within under a second, preserving app state. <strong>Hot restart</strong> (<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>R</code>) restarts the app from scratch, resetting state. Use hot reload for UI tweaks; hot restart for logic changes that require a fresh state.
      </p>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 3 — Layout Widgets */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        3. Layout Widgets: Column, Row, Stack, Expanded, Container, and SizedBox
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Flutter's layout system is built entirely from widgets. There are no separate CSS layout rules — positioning, sizing, and alignment are all expressed as widget properties. Understanding the core layout widgets is essential for building any non-trivial UI.
      </p>
      <ul style={{ color: '#334155', paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li><strong>Column</strong> — arranges children vertically. Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>mainAxisAlignment</code> (vertical) and <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>crossAxisAlignment</code> (horizontal) to control child placement.</li>
        <li><strong>Row</strong> — arranges children horizontally. Same axis properties as Column but mirrored.</li>
        <li><strong>Stack</strong> — overlays children on top of each other (like CSS position: absolute). Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>Positioned</code> children to control exact placement.</li>
        <li><strong>Expanded</strong> — fills available space inside a Row or Column, like CSS flex: 1. Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>flex</code> property for proportional sizing.</li>
        <li><strong>Flexible</strong> — like Expanded but allows the child to be smaller than the available space.</li>
        <li><strong>Container</strong> — a convenience widget combining decoration (color, border, border-radius, shadow), padding, margin, and size constraints. Do not nest Containers unnecessarily — prefer specific widgets for each concern.</li>
        <li><strong>SizedBox</strong> — forces a specific width and height. Also useful as <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>SizedBox.shrink()</code> (zero-size invisible widget) and <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>SizedBox.expand()</code> (fill parent).</li>
        <li><strong>Padding</strong> — adds padding around a single child. Prefer over Container when you only need padding.</li>
        <li><strong>Wrap</strong> — like Row/Column but wraps to the next line when children overflow, similar to CSS flexbox with flex-wrap.</li>
        <li><strong>ListView / GridView</strong> — scrollable lists and grids. Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>ListView.builder</code> for long lists (lazy rendering).</li>
      </ul>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        <code>{`// Typical layout combining Row, Column, Expanded
Widget build(BuildContext context) {
  return Scaffold(
    body: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Dashboard', style: Theme.of(context).textTheme.headlineSmall),
              IconButton(icon: const Icon(Icons.notifications), onPressed: () {}),
            ],
          ),
          const SizedBox(height: 16),

          // Two equal-width cards using Expanded
          Row(
            children: [
              Expanded(child: _StatCard(title: 'Users', value: '1,204')),
              const SizedBox(width: 12),
              Expanded(child: _StatCard(title: 'Revenue', value: '\$8,432')),
            ],
          ),
          const SizedBox(height: 16),

          // Fills remaining vertical space
          Expanded(
            child: ListView.builder(
              itemCount: 20,
              itemBuilder: (context, index) => ListTile(
                leading: CircleAvatar(child: Text('\${index + 1}')),
                title: Text('Item \${index + 1}'),
                subtitle: const Text('Subtitle text'),
                trailing: const Icon(Icons.chevron_right),
              ),
            ),
          ),
        ],
      ),
    ),
  );
}

// Stack example: badge over icon
Stack(
  children: [
    const Icon(Icons.shopping_cart, size: 32),
    Positioned(
      top: 0,
      right: 0,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(
          color: Colors.red,
          shape: BoxShape.circle,
        ),
        child: const Text('3', style: TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
  ],
)`}</code>
      </pre>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 4 — State Management */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        4. State Management: setState, Provider, Riverpod, Bloc/Cubit, GetX
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        State management is the most debated topic in Flutter. The right choice depends on your app's complexity, team size, and testing requirements. Here is a practical breakdown:
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>setState — Local, Simple State</h3>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>setState()</code> is the built-in mechanism for updating state inside a <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>StatefulWidget</code>. It schedules a rebuild of the widget subtree. Use it for purely local UI state (toggle, counter, form field values) that does not need to be shared across widgets. Avoid setState for business logic — keep it in the widget's State class minimal.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Provider — InheritedWidget Made Simple</h3>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Provider (by Remi Rousselet) is a wrapper around Flutter's <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>InheritedWidget</code> that makes sharing state down the widget tree ergonomic. Combine <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>ChangeNotifier</code> + <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>ChangeNotifierProvider</code> + <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Consumer</code> or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>context.watch()</code> for reactive UI updates. It is stable, well-documented, and sufficient for many production apps.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`// pubspec.yaml
// dependencies:
//   provider: ^6.1.0

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// 1. Define a ChangeNotifier model
class CartModel extends ChangeNotifier {
  final List<String> _items = [];

  List<String> get items => List.unmodifiable(_items);
  int get count => _items.length;

  void addItem(String item) {
    _items.add(item);
    notifyListeners(); // Triggers Consumer rebuilds
  }

  void removeItem(String item) {
    _items.remove(item);
    notifyListeners();
  }
}

// 2. Provide at the app level
void main() => runApp(
  ChangeNotifierProvider(
    create: (_) => CartModel(),
    child: const MyApp(),
  ),
);

// 3. Consume in any descendant widget
class CartIcon extends StatelessWidget {
  const CartIcon({super.key});

  @override
  Widget build(BuildContext context) {
    // context.watch triggers rebuild on every change
    final cart = context.watch<CartModel>();
    return Badge(
      label: Text('\${cart.count}'),
      child: const Icon(Icons.shopping_cart),
    );
  }
}

class ProductTile extends StatelessWidget {
  final String product;
  const ProductTile({required this.product, super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(product),
      trailing: ElevatedButton(
        // context.read — one-time action, no rebuild
        onPressed: () => context.read<CartModel>().addItem(product),
        child: const Text('Add to Cart'),
      ),
    );
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Riverpod — Compile-Time Safe, Context-Free State</h3>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Riverpod 2.x with code generation (<code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>riverpod_annotation</code>) is the recommended approach for new projects. Providers are global constants — no <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>BuildContext</code> required to read them, no possibility of accessing the wrong provider, and testable without a Flutter widget tree.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`// pubspec.yaml
// dependencies:
//   flutter_riverpod: ^2.5.0
//   riverpod_annotation: ^2.3.0
// dev_dependencies:
//   riverpod_generator: ^2.4.0
//   build_runner: ^2.4.0

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'counter.g.dart'; // generated file

// Simple state provider (code-gen syntax)
@riverpod
class Counter extends _\$Counter {
  @override
  int build() => 0; // initial state

  void increment() => state++;
  void decrement() => state--;
}

// Async provider — fetches data from API
@riverpod
Future<List<String>> fetchUsers(FetchUsersRef ref) async {
  final response = await http.get(Uri.parse('https://api.example.com/users'));
  // ... parse and return
  return [];
}

// Widget: use ConsumerWidget instead of StatelessWidget
class CounterWidget extends ConsumerWidget {
  const CounterWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);

    return Column(
      children: [
        Text('Count: \$count'),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).increment(),
          child: const Text('Increment'),
        ),
      ],
    );
  }
}

// Async provider with loading/error states
class UserList extends ConsumerWidget {
  const UserList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final usersAsync = ref.watch(fetchUsersProvider);

    return usersAsync.when(
      data: (users) => ListView(children: users.map(Text.new).toList()),
      loading: () => const CircularProgressIndicator(),
      error: (e, st) => Text('Error: \$e'),
    );
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Bloc / Cubit — Event-Driven, Highly Testable</h3>
      <p style={{ marginBottom: '1.5rem', color: '#334155' }}>
        Bloc (Business Logic Component) enforces strict separation: UI dispatches <em>Events</em>, Bloc processes them and emits <em>States</em>. Cubit is a simplified Bloc that uses method calls instead of events (no event classes needed). Bloc is ideal for large teams and complex flows where auditability and testability are critical. The <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>flutter_bloc</code> package provides <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>BlocBuilder</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>BlocListener</code>, and <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>BlocConsumer</code> for clean widget integration.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        <code>{`// Cubit — simpler Bloc without explicit events
import 'package:flutter_bloc/flutter_bloc.dart';

// State
class CounterState {
  final int count;
  const CounterState(this.count);
}

// Cubit
class CounterCubit extends Cubit<CounterState> {
  CounterCubit() : super(const CounterState(0));

  void increment() => emit(CounterState(state.count + 1));
  void decrement() => emit(CounterState(state.count - 1));
  void reset() => emit(const CounterState(0));
}

// Widget
class CounterView extends StatelessWidget {
  const CounterView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CounterCubit(),
      child: BlocBuilder<CounterCubit, CounterState>(
        builder: (context, state) {
          return Column(
            children: [
              Text('Count: \${state.count}'),
              Row(
                children: [
                  IconButton(
                    onPressed: () => context.read<CounterCubit>().decrement(),
                    icon: const Icon(Icons.remove),
                  ),
                  IconButton(
                    onPressed: () => context.read<CounterCubit>().increment(),
                    icon: const Icon(Icons.add),
                  ),
                ],
              ),
            ],
          );
        },
      ),
    );
  }
}`}</code>
      </pre>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 5 — Navigation */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        5. Navigation: Navigator 2.0, go_router, and Route Guards
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Flutter's original Navigator 1.0 (imperative: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Navigator.push</code> / <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Navigator.pop</code>) is simple but does not handle deep links or web URL synchronization. Navigator 2.0 introduced a declarative API, but it is complex. <strong>go_router</strong> (the officially recommended package from the Flutter team) wraps Navigator 2.0 with a clean, URL-based declarative routing API.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`// pubspec.yaml: go_router: ^14.0.0

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// 1. Define the router
final _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/products',
      builder: (context, state) => const ProductListScreen(),
      routes: [
        // Nested route with path parameter
        GoRoute(
          path: ':id',
          builder: (context, state) {
            final id = state.pathParameters['id']!;
            return ProductDetailScreen(productId: id);
          },
        ),
      ],
    ),
    GoRoute(
      path: '/profile',
      // Route guard: redirect if not authenticated
      redirect: (context, state) {
        final isLoggedIn = AuthService.isLoggedIn;
        return isLoggedIn ? null : '/login';
      },
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
  ],
  // Global error page
  errorBuilder: (context, state) => const NotFoundScreen(),
);

// 2. Pass to MaterialApp
void main() => runApp(MaterialApp.router(routerConfig: _router));

// 3. Navigate from anywhere
// Push
context.push('/products/42');

// Replace current route (no back button)
context.go('/login');

// Go with query params
context.go('/products?sort=price');

// Named route
context.goNamed('profile');

// Access path params and query params in the builder:
final id = state.pathParameters['id'];
final sort = state.uri.queryParameters['sort'];`}</code>
      </pre>

      <p style={{ marginBottom: '2rem', color: '#334155' }}>
        For <strong>typed routes</strong> (compile-time safe navigation), use the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>go_router_builder</code> package which generates type-safe route classes from annotations. This eliminates typos in route paths and ensures all required parameters are provided at compile time.
      </p>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 6 — Comparison Table */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        6. Flutter vs React Native vs Ionic vs Kotlin Multiplatform
      </h2>
      <p style={{ marginBottom: '1.25rem', color: '#334155' }}>
        Choosing a cross-platform framework is a significant architectural decision. Here is an honest comparison across the dimensions that matter most for production apps.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '700px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              {['Dimension', 'Flutter', 'React Native', 'Ionic', 'Kotlin Multiplatform'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #cbd5e1', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Language', 'Dart', 'JavaScript / TypeScript', 'JavaScript / TypeScript', 'Kotlin (+ Swift interop)'],
              ['Rendering', 'Own engine (Skia/Impeller) — pixel-perfect, no native widgets', 'Bridge to native components (New Arch: JSI)', 'WebView / Capacitor (HTML/CSS)', 'Native per platform (shared logic only)'],
              ['Performance', 'Near-native, 60/120fps, no bridge', 'Near-native with New Architecture; older bridge has overhead', 'Web-level; slowest for heavy animations', 'True native — best possible'],
              ['UI Consistency', 'Identical across all platforms', 'Platform-native look (different per OS)', 'Web-based, same everywhere', 'Platform-native (intentionally different)'],
              ['Platforms', 'iOS, Android, Web, macOS, Windows, Linux', 'iOS, Android (Web via Expo)', 'iOS, Android, Web, Electron (PWA)', 'iOS, Android, Desktop, Web (Compose Multiplatform)'],
              ['Hot Reload', 'Yes (sub-second, state-preserving)', 'Yes (Fast Refresh)', 'Yes (Capacitor Live Reload)', 'Limited (depends on IDE plugin)'],
              ['Package Ecosystem', 'pub.dev — growing, good quality', 'npm — largest ecosystem', 'npm + Capacitor plugins', 'Maven/CocoaPods — smaller KMP-specific ecosystem'],
              ['Learning Curve', 'Medium — Dart is easy, but widget composition takes time', 'Low for JS devs — React patterns apply directly', 'Very Low — web skills transfer entirely', 'High — requires Kotlin + platform knowledge'],
              ['State Management', 'Riverpod / Bloc / Provider / GetX', 'Redux / Zustand / MobX / Jotai', 'Vue/React state solutions + Pinia/Redux', 'ViewModel + Flow / Compose State'],
              ['Best For', 'High-quality UI, gaming-like animations, pixel-perfect design systems', 'Teams with existing React/JS expertise, native look required', 'Rapid prototyping, web-first teams, PWA + mobile', 'Sharing business logic while keeping native UI per platform'],
              ['Companies Using', 'Google Pay, Alibaba (Xianyu), BMW, eBay', 'Meta, Shopify, Coinbase, Discord', 'SAP, Burger King, EA Sports', 'Netflix, VMware, Touchlab clients'],
              ['Open Source', 'Yes (Google + community)', 'Yes (Meta + community)', 'Yes (Ionic team + community)', 'Yes (JetBrains + Google)'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: j === 0 ? '#0f172a' : '#334155', fontWeight: j === 0 ? 600 : 400, verticalAlign: 'top' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '2rem' }}>
        <p style={{ margin: 0, color: '#713f12', fontSize: '0.95rem' }}>
          <strong>Bottom line:</strong> Choose Flutter when pixel-perfect UI consistency and high animation quality matter. Choose React Native when your team knows React and needs native platform look-and-feel. Choose Ionic for rapid prototyping or progressive web apps. Choose Kotlin Multiplatform when sharing business logic across native apps is the priority while keeping platform-specific UIs.
        </p>
      </div>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 7 — HTTP and API Integration */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        7. HTTP and API Integration: Dio, http Package, and JSON Serialization
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Flutter apps interact with REST APIs using either the built-in <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>http</code> package (simpler, fewer features) or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Dio</code> (interceptors, cancellation tokens, multipart uploads, retry logic). For JSON serialization, use <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>json_serializable</code> + <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>build_runner</code> (code generation) or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>freezed</code> (immutable data classes with union types).
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`// pubspec.yaml
// dependencies:
//   dio: ^5.4.0
//   json_annotation: ^4.9.0
// dev_dependencies:
//   json_serializable: ^6.8.0
//   build_runner: ^2.4.8

import 'package:dio/dio.dart';

// ── 1. JSON Model with code generation ──
import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart'; // run: flutter pub run build_runner build

@JsonSerializable()
class User {
  final int id;
  final String name;
  final String email;
  @JsonKey(name: 'created_at')
  final DateTime createdAt;

  const User({
    required this.id,
    required this.name,
    required this.email,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => _\$UserFromJson(json);
  Map<String, dynamic> toJson() => _\$UserToJson(this);
}

// ── 2. API Service using Dio ──
class ApiService {
  late final Dio _dio;
  static const _baseUrl = 'https://api.example.com';

  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: _baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json'},
    ));

    // Auth interceptor
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await SecureStorage.getToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer \$token';
        }
        handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          // Token expired — refresh and retry
          await AuthService.refreshToken();
          handler.next(error); // or retry the request
        } else {
          handler.next(error);
        }
      },
    ));
  }

  // GET with typed response
  Future<List<User>> getUsers({int page = 1}) async {
    try {
      final response = await _dio.get(
        '/users',
        queryParameters: {'page': page, 'per_page': 20},
      );
      final data = response.data as List<dynamic>;
      return data.map((json) => User.fromJson(json as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  // POST with body
  Future<User> createUser(String name, String email) async {
    try {
      final response = await _dio.post(
        '/users',
        data: {'name': name, 'email': email},
      );
      return User.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw _handleDioError(e);
    }
  }

  Exception _handleDioError(DioException e) {
    if (e.type == DioExceptionType.connectionTimeout) {
      return Exception('Connection timed out. Check your internet connection.');
    }
    if (e.response?.statusCode == 404) {
      return Exception('Resource not found.');
    }
    if (e.response?.statusCode == 422) {
      final errors = e.response?.data['errors'];
      return Exception('Validation error: \$errors');
    }
    return Exception('An unexpected error occurred: \${e.message}');
  }
}`}</code>
      </pre>

      <p style={{ marginBottom: '2rem', color: '#334155' }}>
        For complex data models, consider <strong>freezed</strong> — it generates immutable classes with <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>copyWith</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>==</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>hashCode</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>toString</code>, and union types in a single annotation. This is especially valuable when modelling API responses that have multiple states (success, error, loading).
      </p>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 8 — Forms and Validation */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        8. Forms and Validation: TextFormField, GlobalKey&lt;FormState&gt;, Custom Validators
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Flutter's <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>Form</code> widget wraps multiple <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>TextFormField</code> inputs and provides a unified validation mechanism. A <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>GlobalKey&lt;FormState&gt;</code> gives you a handle to the form's state to call <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>validate()</code>, <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>save()</code>, and <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>reset()</code> programmatically.
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  State<RegistrationForm> createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _isSubmitting = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  String? _validateEmail(String? value) {
    if (value == null || value.trim().isEmpty) return 'Email is required';
    final emailRegex = RegExp(r'^[\w.-]+@[\w.-]+\.\w{2,4}\$');
    if (!emailRegex.hasMatch(value)) return 'Enter a valid email address';
    return null; // null = valid
  }

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!value.contains(RegExp(r'[A-Z]'))) return 'Must contain an uppercase letter';
    if (!value.contains(RegExp(r'[0-9]'))) return 'Must contain a number';
    return null;
  }

  Future<void> _submit() async {
    // Validate all fields — shows error messages
    if (!_formKey.currentState!.validate()) return;

    // Save the form (triggers onSaved callbacks)
    _formKey.currentState!.save();

    setState(() => _isSubmitting = true);

    try {
      await ApiService().register(
        email: _emailController.text.trim(),
        password: _passwordController.text,
      );
      if (mounted) context.go('/dashboard');
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Registration failed: \$e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          TextFormField(
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            decoration: const InputDecoration(
              labelText: 'Email',
              prefixIcon: Icon(Icons.email_outlined),
              border: OutlineInputBorder(),
            ),
            validator: _validateEmail,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _passwordController,
            obscureText: _obscurePassword,
            textInputAction: TextInputAction.done,
            onFieldSubmitted: (_) => _submit(),
            decoration: InputDecoration(
              labelText: 'Password',
              prefixIcon: const Icon(Icons.lock_outline),
              border: const OutlineInputBorder(),
              suffixIcon: IconButton(
                icon: Icon(_obscurePassword ? Icons.visibility : Icons.visibility_off),
                onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
              ),
            ),
            validator: _validatePassword,
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: _isSubmitting ? null : _submit,
            style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(16)),
            child: _isSubmitting
                ? const CircularProgressIndicator(color: Colors.white)
                : const Text('Register', style: TextStyle(fontSize: 16)),
          ),
        ],
      ),
    );
  }
}`}</code>
      </pre>

      <p style={{ marginBottom: '2rem', color: '#334155' }}>
        For more complex validation needs, consider the <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>reactive_forms</code> package, which brings an Angular-style reactive form model to Flutter, or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>formz</code> for encapsulating validation logic in dedicated value objects that are easy to unit test independently.
      </p>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 9 — Deployment */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        9. Deployment: iOS App Store, Google Play, Flutter Web, and Desktop Builds
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        One of Flutter's strongest value propositions is unified deployment. A single Flutter codebase produces production artifacts for every supported platform. Here is a practical deployment guide for each target.
      </p>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Android (Google Play)</h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`# 1. Create a signing keystore (one-time)
keytool -genkey -v -keystore ~/release.jks \\
  -alias release -keyalg RSA -keysize 2048 -validity 10000

# 2. Configure android/key.properties
# storePassword=<password>
# keyPassword=<password>
# keyAlias=release
# storeFile=<path-to-release.jks>

# 3. Reference key.properties in android/app/build.gradle

# 4. Build Android App Bundle (recommended for Play Store)
flutter build appbundle --release

# Output: build/app/outputs/bundle/release/app-release.aab

# Alternative: APK for direct distribution
flutter build apk --release --split-per-abi`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>iOS (App Store)</h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`# Requires macOS + Xcode + Apple Developer Account ($99/yr)

# 1. Configure bundle ID in Xcode (ios/Runner.xcworkspace)
#    Set: Runner > Targets > Runner > Bundle Identifier

# 2. Set version in pubspec.yaml
# version: 1.0.0+1  (format: version+buildNumber)

# 3. Build IPA
flutter build ipa --release

# Output: build/ios/ipa/app-name.ipa

# 4. Upload to App Store Connect
xcrun altool --upload-app -f build/ios/ipa/*.ipa \\
  -u "your@email.com" -p "@keychain:AC_PASSWORD"

# Or use: open Transporter.app and drag the .ipa in
# Or: flutter build ipa && open in Xcode → Product → Archive`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Flutter Web</h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        <code>{`# CanvasKit renderer: best performance, larger initial download (~1.5 MB)
flutter build web --release --web-renderer canvaskit

# HTML renderer: smaller download, less GPU-accelerated
flutter build web --release --web-renderer html

# Auto renderer: canvaskit on desktop, html on mobile
flutter build web --release --web-renderer auto

# Output: build/web/ — a static site
# Deploy to Firebase Hosting, Vercel, Netlify, Cloudflare Pages etc.

# Deploy to Firebase
firebase deploy --only hosting

# Configure base href if not served from root
flutter build web --release --base-href /my-app/`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>Desktop (macOS, Windows, Linux)</h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        <code>{`# Enable desktop support (one-time per machine)
flutter config --enable-macos-desktop
flutter config --enable-windows-desktop
flutter config --enable-linux-desktop

# Build macOS .app
flutter build macos --release
# Output: build/macos/Build/Products/Release/MyApp.app

# Build Windows .exe
flutter build windows --release
# Output: build/windows/runner/Release/

# Build Linux binary
flutter build linux --release
# Output: build/linux/x64/release/bundle/

# Distribution:
# macOS: Package as .dmg, notarize with Apple, distribute via Mac App Store or direct download
# Windows: Package with MSIX (flutter_distributor package) for Microsoft Store
# Linux: Package as .deb, .rpm, .AppImage, or Flatpak via flutter_distributor`}</code>
      </pre>

      {/* ─────────────────────────────────────────── */}
      {/* SECTION 10 — Performance Tips */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>
        10. Performance Optimization Tips
      </h2>
      <p style={{ marginBottom: '1rem', color: '#334155' }}>
        Flutter is fast by default, but common mistakes can cause unnecessary rebuilds and janky animations. Follow these guidelines to keep your app smooth.
      </p>
      <ul style={{ color: '#334155', paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li><strong>Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>const</code> constructors everywhere possible</strong> — Flutter skips rebuilding const widgets entirely. Prefix every widget with <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>const</code> that does not depend on runtime data.</li>
        <li><strong>Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>ListView.builder</code> instead of <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>ListView</code></strong> — builder lazily renders only visible items. Never put a Column with 500 children in a ScrollView.</li>
        <li><strong>Minimize setState scope</strong> — call setState on the smallest possible subtree. Extract sub-widgets into their own StatefulWidget to avoid rebuilding the entire screen.</li>
        <li><strong>Use <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>RepaintBoundary</code> for isolated animations</strong> — wrapping an animated widget in RepaintBoundary prevents it from triggering repaints in the rest of the tree.</li>
        <li><strong>Cache images with <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>cached_network_image</code></strong> — avoids re-downloading and re-decoding images on every rebuild.</li>
        <li><strong>Avoid building widgets in <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>initState</code></strong> — use FutureBuilder or Consumer/ref.watch for async data instead of storing futures in state and calling setState.</li>
        <li><strong>Profile with Flutter DevTools</strong> — run <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>flutter run --profile</code> and open DevTools to identify frame drops, excessive rebuilds, and memory leaks with the Widget Inspector, Performance tab, and Memory tab.</li>
        <li><strong>Use isolates for heavy computation</strong> — <code style={{ background: '#f1f5f9', padding: '2px 4px', borderRadius: '3px', fontSize: '0.9em' }}>compute()</code> runs a function in a background isolate, preventing the main UI thread from blocking on CPU-intensive work like JSON parsing of large payloads.</li>
      </ul>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
        <code>{`// ── const widgets ──
// Bad: rebuilds unnecessarily
AppBar(title: Text('Home'));

// Good: Flutter caches this entirely
AppBar(title: const Text('Home'));

// ── Minimal setState scope ──
// Bad: rebuilds entire screen
class MyScreen extends StatefulWidget { ... }
class _MyScreenState extends State<MyScreen> {
  bool _liked = false;
  Widget build(context) => Column(children: [
    HeavyWidget(),  // also rebuilt!
    IconButton(onPressed: () => setState(() => _liked = !_liked), ...),
  ]);
}

// Good: extract the small changing part
class LikeButton extends StatefulWidget { ... }
class _LikeButtonState extends State<LikeButton> {
  bool _liked = false;
  Widget build(context) => IconButton(
    onPressed: () => setState(() => _liked = !_liked),
    icon: Icon(_liked ? Icons.favorite : Icons.favorite_border),
  );
}

// ── compute() for heavy work ──
import 'dart:convert';
import 'package:flutter/foundation.dart';

Future<List<User>> parseUsersInBackground(String jsonString) async {
  return compute(_parseUsers, jsonString);
}

List<User> _parseUsers(String jsonString) {
  final data = jsonDecode(jsonString) as List<dynamic>;
  return data.map((json) => User.fromJson(json as Map<String, dynamic>)).toList();
}`}</code>
      </pre>

      {/* ─────────────────────────────────────────── */}
      {/* FAQ Section */}
      {/* ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem', marginBottom: '1.25rem' }}>
        Frequently Asked Questions
      </h2>

      {[
        {
          q: 'Is Dart hard to learn for JavaScript developers?',
          a: 'Dart is one of the easiest languages for JavaScript/TypeScript developers to learn. The syntax is C-style (familiar braces, semicolons, for loops), the type system resembles TypeScript, and async/await works identically. Most developers write productive Flutter code within a week. Key differences: strong null safety enforced by the compiler, explicit typing encouraged (though type inference is powerful), and no prototype-based OOP — Dart uses classical class-based inheritance. The official dart.dev tour takes about 2 hours to complete.',
        },
        {
          q: 'How does Flutter performance compare to native apps?',
          a: 'Flutter achieves 60fps (or 120fps on high-refresh devices) on par with native apps for most use cases. Because Flutter owns the rendering pipeline (no bridge to native UI), there is no JavaScript-to-native bridge overhead like React Native. The Impeller rendering engine (default in Flutter 3.10+ on iOS, Flutter 3.13+ on Android) eliminates shader compilation jank. For CPU-intensive tasks, Dart\'s AOT compilation produces fast native code. The main performance caveat is that very complex layouts with hundreds of deeply nested widgets can be slower than optimized native code — use const constructors and avoid rebuilding unnecessarily.',
        },
        {
          q: 'What is null safety in Dart and why does it matter?',
          a: 'Null safety (introduced in Dart 2.12, stable March 2021) means that variables cannot be null unless explicitly declared nullable with a ?. For example, String name cannot be null, but String? name can. This is enforced at compile time, not runtime, eliminating the entire class of null-dereference errors. Sound null safety also enables the compiler to produce faster, smaller code because it can skip null checks. All Flutter packages on pub.dev have migrated to null safety. For nullable variables, use the null-aware operators: ?. (null-safe method call), ?? (null coalescing), and ??= (null-aware assignment).',
        },
        {
          q: 'What are the main differences between Provider and Riverpod?',
          a: 'Riverpod was created by the same author as Provider (Remi Rousselet) to fix Provider\'s fundamental limitations. Provider requires a BuildContext to read values (problematic outside the widget tree) and can throw ProviderNotFoundException at runtime. Riverpod is compile-time safe — providers are global constants, readable anywhere without context, and impossible to accidentally access the wrong provider. Riverpod 2.0 introduced code generation (riverpod_generator) that reduces boilerplate significantly. For new projects, Riverpod is the recommended choice; Provider is still maintained and works well for simpler use cases.',
        },
        {
          q: 'Should I use go_router or Navigator 2.0 directly?',
          a: 'Use go_router for almost all applications. Navigator 2.0 (the Router API introduced in Flutter 2.0) is powerful but notoriously complex to implement correctly — handling back button, deep links, and web URL sync requires significant boilerplate. go_router is the officially recommended package from the Flutter team (pub.dev/packages/go_router), built on top of Navigator 2.0. It provides a declarative URL-based routing system, type-safe path parameters, nested routes, route guards (redirect), and deep link handling with minimal configuration.',
        },
        {
          q: 'What is the Impeller rendering engine in Flutter 3.x?',
          a: 'Impeller is Flutter\'s new rendering engine, replacing the Skia-based engine for Metal (iOS) and Vulkan (Android). Skia used just-in-time (JIT) shader compilation that caused unpredictable jank — stutters on first frame render. Impeller pre-compiles shaders at build time, eliminating jank entirely. It is the default renderer on iOS since Flutter 3.10 and on Android since Flutter 3.13. Impeller also enables better text rendering and new visual effects. You can opt out with --no-enable-impeller if needed, but the goal is for Impeller to fully replace Skia.',
        },
        {
          q: 'How do I handle platform-specific code in Flutter?',
          a: 'Flutter provides multiple mechanisms for platform-specific code. Platform channels (MethodChannel) allow Dart to call native iOS (Swift/Objective-C) or Android (Kotlin/Java) code and receive results — used for accessing device APIs not exposed by Flutter plugins. The Platform class (dart:io) lets you check the current platform: Platform.isIOS, Platform.isAndroid, Platform.isMacOS etc. For UI differences, use kIsWeb for web detection. Most device APIs (camera, GPS, notifications, Bluetooth) already have battle-tested Flutter plugins on pub.dev, so platform channels are rarely needed directly.',
        },
        {
          q: 'What Flutter version should I use in 2024/2025?',
          a: 'Use the latest stable Flutter 3.x release. Flutter follows a stable channel release roughly every 3 months. As of 2024/2025, Flutter 3.19–3.24 are the relevant stable releases with improvements to Impeller, Material 3 widgets, Dart 3.x with pattern matching and records, and improved Web and Desktop support. Always use flutter upgrade on the stable channel to stay current. Avoid the beta or dev channels for production apps. The Flutter stable changelog at docs.flutter.dev/release/release-notes lists breaking changes and migration guides for each release.',
        },
      ].map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', marginTop: 0 }}>{item.q}</h3>
          <p style={{ margin: 0, color: '#334155', fontSize: '0.97rem' }}>{item.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#14532d', marginTop: 0, marginBottom: '0.75rem' }}>Ready to Build with Flutter?</h2>
        <p style={{ margin: 0, color: '#166534', fontSize: '0.97rem' }}>
          Flutter is a mature, production-proven framework backed by Google and a thriving open-source community. With Impeller delivering smooth animations, Dart 3.x making the language more expressive, and a single codebase covering six platforms, Flutter is one of the most compelling choices for cross-platform development in 2024 and beyond. Start with <code style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>flutter create</code>, explore pub.dev for packages, and join the community at flutter.dev.
        </p>
      </div>
    </article>
  );
}
