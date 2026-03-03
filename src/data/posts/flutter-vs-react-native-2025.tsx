'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Flutter vs React Native 2025: Mobile Development Comparison',
    intro: 'Flutter and React Native continue to dominate cross-platform mobile development in 2025. Flutter offers Dart-based native compilation with pixel-perfect UI, while React Native provides JavaScript/TypeScript development with native components. This comprehensive comparison examines performance, developer experience, ecosystem, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Flutter excels at pixel-perfect UIs and complex animations with its Skia rendering engine. React Native offers better integration with native modules and a larger JavaScript ecosystem. For teams with web development background, React Native is ideal. For teams prioritizing consistent UI across platforms, Flutter is the better choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Flutter uses Dart with Skia rendering for pixel-perfect UIs',
    takeaway2: 'React Native uses JavaScript/TypeScript with native components',
    takeaway3: 'Flutter has better performance for complex animations',
    takeaway4: 'React Native has larger ecosystem and more third-party libraries',
    takeaway5: 'Both support hot reload for fast development iteration',
    takeaway6: 'Flutter web support is more mature than React Native web',
    
    whatIsFlutterTitle: 'What is Flutter?',
    whatIsFlutterContent: 'Flutter is an open-source UI framework by Google, first released in 2017. It uses the Dart programming language and renders UI using its own Skia graphics engine, enabling pixel-perfect designs across all platforms. Flutter compiles to native ARM code, providing near-native performance. Major apps using Flutter include Google Pay, BMW, and Alibaba.',
    
    whatIsReactNativeTitle: 'What is React Native?',
    whatIsReactNativeContent: 'React Native, created by Facebook (Meta) in 2015, allows developers to build mobile apps using JavaScript and React. Unlike Flutter, React Native uses native platform components, giving apps a more native look and feel. It bridges JavaScript code to native APIs. Notable apps include Facebook, Instagram, WhatsApp, and Shopify.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks and characteristics of each framework:',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'How each framework handles UI rendering and native communication:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Building a similar component in each framework:',
    
    flutterExampleTitle: 'Flutter (Dart)',
    reactNativeExampleTitle: 'React Native (TypeScript)',
    
    stateManagementTitle: 'State Management',
    stateManagementIntro: 'State management approaches in each framework:',
    
    deploymentTitle: 'Deployment & Tooling',
    deploymentIntro: 'Development and deployment experience:',
    
    whenToUseTitle: 'When to Use Each Framework',
    flutterBestFor: 'Use Flutter When:',
    reactNativeBestFor: 'Use React Native When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Flutter and React Native are mature, production-ready frameworks. Flutter is ideal for teams prioritizing UI consistency, complex animations, and multi-platform deployment (mobile, web, desktop). React Native excels for teams with JavaScript expertise, apps requiring deep native integration, or projects leveraging the massive npm ecosystem. The choice ultimately depends on your team skills and project requirements.',
    
    faq1q: 'Which is easier to learn?',
    faq1a: 'React Native is easier for developers with JavaScript/React experience. Flutter requires learning Dart, but its excellent documentation and hot reload make the learning curve manageable. Most developers become productive in Flutter within 2-4 weeks.',
    
    faq2q: 'Which has better performance?',
    faq2a: 'Flutter generally has better performance for complex animations and custom UIs due to its Skia rendering. React Native performs better for apps that heavily use native components. For most business apps, both frameworks provide adequate performance.',
    
    faq3q: 'Can I use Flutter if I only know JavaScript?',
    faq3a: 'Yes, but you will need to learn Dart. Dart is similar to JavaScript and TypeScript, making the transition relatively smooth. Most JavaScript developers become comfortable with Dart within a few weeks of daily use.',
    
    faq4q: 'Which has better web support?',
    faq4a: 'Flutter has more mature web support with consistent rendering across browsers. React Native web exists but is less mature. For serious web development alongside mobile, Flutter currently has the advantage.',
    
    faq5q: 'Which is better for startups?',
    faq5a: 'If your team has web development experience, React Native offers faster time-to-market. If you prioritize UI consistency and plan to target web and desktop alongside mobile, Flutter provides better long-term value.',
    
    faq6q: 'How do I handle native modules?',
    faq6a: 'React Native has a more mature bridge system and more third-party native modules. Flutter requires platform channels for native communication. Both support writing custom native code when needed.',
    
    faq7q: 'Which is better for large enterprise apps?',
    faq7a: 'Both work well for enterprise apps. React Native is used by Microsoft, Shopify, and Discord. Flutter is used by Google Pay, BMW, and eBay. Choose based on your existing tech stack and team expertise.',
    
    faq8q: 'Will either framework be abandoned?',
    faq8a: 'Both frameworks are actively maintained by major companies (Google and Meta). Flutter has over 150,000 stars on GitHub, React Native has over 115,000. Both are safe long-term choices with strong communities.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Flutter vs React Native 2025：移动开发对比',
    intro: 'Flutter和React Native在2025年继续主导跨平台移动开发。Flutter提供基于Dart的原生编译和像素级完美的UI，而React Native提供JavaScript/TypeScript开发和原生组件。本全面比较考察性能、开发者体验、生态系统和真实用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Flutter凭借其Skia渲染引擎在像素级完美UI和复杂动画方面表现出色。React Native提供更好的原生模块集成和更大的JavaScript生态系统。对于有Web开发背景的团队，React Native是理想选择。对于优先考虑跨平台UI一致性的团队，Flutter是更好的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Flutter使用Dart和Skia渲染实现像素级完美UI',
    takeaway2: 'React Native使用JavaScript/TypeScript和原生组件',
    takeaway3: 'Flutter在复杂动画方面有更好的性能',
    takeaway4: 'React Native拥有更大的生态系统和更多第三方库',
    takeaway5: '两者都支持热重载以实现快速开发迭代',
    takeaway6: 'Flutter的Web支持比React Native Web更成熟',
    
    whatIsFlutterTitle: '什么是Flutter？',
    whatIsFlutterContent: 'Flutter是Google于2017年首次发布的开源UI框架。它使用Dart编程语言，并使用自己的Skia图形引擎渲染UI，在所有平台上实现像素级完美的设计。Flutter编译为原生ARM代码，提供接近原生的性能。使用Flutter的主要应用包括Google Pay、BMW和阿里巴巴。',
    
    whatIsReactNativeTitle: '什么是React Native？',
    whatIsReactNativeContent: 'React Native由Facebook（Meta）于2015年创建，允许开发者使用JavaScript和React构建移动应用。与Flutter不同，React Native使用原生平台组件，使应用具有更原生的外观和感觉。它将JavaScript代码桥接到原生API。知名应用包括Facebook、Instagram、WhatsApp和Shopify。',
    
    performanceTitle: '性能对比',
    performanceIntro: '每个框架的性能基准和特征：',
    
    architectureTitle: '架构对比',
    architectureIntro: '每个框架如何处理UI渲染和原生通信：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '在每个框架中构建类似的组件：',
    
    flutterExampleTitle: 'Flutter (Dart)',
    reactNativeExampleTitle: 'React Native (TypeScript)',
    
    stateManagementTitle: '状态管理',
    stateManagementIntro: '每个框架中的状态管理方法：',
    
    deploymentTitle: '部署与工具',
    deploymentIntro: '开发和部署体验：',
    
    whenToUseTitle: '何时使用每个框架',
    flutterBestFor: '使用Flutter的场景：',
    reactNativeBestFor: '使用React Native的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Flutter和React Native都是成熟、可用于生产的框架。Flutter非常适合优先考虑UI一致性、复杂动画和多平台部署（移动、Web、桌面）的团队。React Native非常适合具有JavaScript专业知识、需要深度原生集成或利用庞大npm生态系统的项目。选择最终取决于你的团队技能和项目需求。',
    
    faq1q: '哪个更容易学习？',
    faq1a: '对于有JavaScript/React经验的开发者，React Native更容易。Flutter需要学习Dart，但其出色的文档和热重载使学习曲线可控。大多数开发者在2-4周内可以在Flutter中高效工作。',
    
    faq2q: '哪个性能更好？',
    faq2a: 'Flutter由于其Skia渲染，在复杂动画和自定义UI方面通常有更好的性能。React Native对于大量使用原生组件的应用性能更好。对于大多数业务应用，两个框架都提供足够的性能。',
    
    faq3q: '如果我只懂JavaScript，可以使用Flutter吗？',
    faq3a: '可以，但你需要学习Dart。Dart类似于JavaScript和TypeScript，使过渡相对平滑。大多数JavaScript开发者在日常使用几周后就会对Dart感到舒适。',
    
    faq4q: '哪个有更好的Web支持？',
    faq4a: 'Flutter有更成熟的Web支持，在浏览器间渲染一致。React Native Web存在但不太成熟。对于在移动端旁边进行认真的Web开发，Flutter目前有优势。',
    
    faq5q: '哪个对初创公司更好？',
    faq5a: '如果你的团队有Web开发经验，React Native提供更快的上市时间。如果你优先考虑UI一致性并计划在移动端旁边针对Web和桌面，Flutter提供更好的长期价值。',
    
    faq6q: '如何处理原生模块？',
    faq6a: 'React Native有更成熟的桥接系统和更多的第三方原生模块。Flutter需要平台通道进行原生通信。两者都支持在需要时编写自定义原生代码。',
    
    faq7q: '哪个更适合大型企业应用？',
    faq7a: '两者都适用于企业应用。React Native被Microsoft、Shopify和Discord使用。Flutter被Google Pay、BMW和eBay使用。根据你现有的技术栈和团队专业知识选择。',
    
    faq8q: '任一框架会被放弃吗？',
    faq8a: '两个框架都由主要公司（Google和Meta）积极维护。Flutter在GitHub上有超过150,000颗星，React Native有超过115,000颗。两者都是具有强大社区的安全长期选择。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function FlutterVsReactNative2025({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>
      
      <h3 style={h3Style}>{ct.whatIsFlutterTitle}</h3>
      <p style={pStyle}>{ct.whatIsFlutterContent}</p>

      <h3 style={h3Style}>{ct.whatIsReactNativeTitle}</h3>
      <p style={pStyle}>{ct.whatIsReactNativeContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Flutter</th>
              <th style={thStyle}>React Native</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2017', '2015'],
              [isZh ? '开发语言' : 'Language', 'Dart', 'JavaScript/TypeScript'],
              [isZh ? 'UI渲染' : 'UI Rendering', 'Skia (custom)', 'Native components'],
              [isZh ? '性能' : 'Performance', 'Native (AOT compiled)', 'Native bridge (JIT/AOT)'],
              [isZh ? '热重载' : 'Hot Reload', 'Stateful Hot Reload', 'Fast Refresh'],
              [isZh ? '平台支持' : 'Platforms', 'iOS, Android, Web, Desktop', 'iOS, Android, Web, VR'],
              [isZh ? '包大小' : 'App Size', 'Larger (~10MB min)', 'Smaller (~5MB min)'],
            ].map(([feature, flutter, rn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#0ea5e9' }}>{flutter}</td>
                <td style={{ ...tdStyle, color: '#06b6d4' }}>{rn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Flutter</th>
              <th style={thStyle}>React Native</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间' : 'Startup Time', '~1.2s', '~1.5s'],
              [isZh ? '内存使用' : 'Memory Usage', '~60MB', '~80MB'],
              [isZh ? '帧率 (复杂UI)' : 'FPS (Complex UI)', '60 FPS stable', '55-60 FPS'],
              [isZh ? '列表滚动' : 'List Scrolling', 'Smooth 60 FPS', 'Variable 50-60 FPS'],
              [isZh ? '动画性能' : 'Animation Performance', '60 FPS (Skia)', '45-60 FPS'],
              [isZh ? 'CPU使用率' : 'CPU Usage', 'Lower', 'Higher (bridge overhead)'],
            ].map(([metric, flutter, rn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{flutter}</td>
                <td style={tdStyle}>{rn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Flutter</th>
              <th style={thStyle}>React Native</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'UI组件' : 'UI Widgets', 'Rich Material/Cupertino', 'Native + Community libs'],
              [isZh ? '导航' : 'Navigation', 'go_router, auto_route', 'React Navigation, Expo Router'],
              [isZh ? '状态管理' : 'State Management', 'Riverpod, Bloc, Provider', 'Redux, Zustand, MobX'],
              [isZh ? '网络请求' : 'HTTP Client', 'dio, http package', 'axios, fetch, react-query'],
              [isZh ? '本地存储' : 'Local Storage', 'Hive, Drift, SharedPreferences', 'AsyncStorage, SQLite, Realm'],
              [isZh ? '国际化' : 'Internationalization', 'intl package', 'react-i18next, i18n-js'],
              [isZh ? '测试' : 'Testing', 'Built-in widget/unit tests', 'Jest, Detox, Appium'],
              [isZh ? '调试工具' : 'Debugging', 'DevTools, Dart Analyzer', 'Flipper, React DevTools'],
            ].map(([feature, flutter, rn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#0ea5e9' }}>{flutter}</td>
                <td style={{ ...tdStyle, color: '#06b6d4' }}>{rn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#0ea5e9' }}>{ct.flutterExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Flutter - Counter App with State
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// State Provider
final counterProvider = StateProvider<int>((ref) => 0);

class CounterApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Counter'),
        backgroundColor: Colors.blue,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Count: ' + count.toString(),
              style: TextStyle(fontSize: 32),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                ref.read(counterProvider.notifier).state++;
              },
              child: Text('Increment'),
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          ref.read(counterProvider.notifier).state = 0;
        },
        child: Icon(Icons.refresh),
      ),
    );
  }
}

void main() {
  runApp(ProviderScope(child: MaterialApp(home: CounterApp())));
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.reactNativeExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React Native - Counter App with State
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { create } from 'zustand';

// State Store
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

export default function CounterApp() {
  const { count, increment, reset } = useCounterStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Counter</Text>
      
      <Text style={styles.count}>
        Count: " + count
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Increment"
          onPress={increment}
          color="#2196F3"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Reset"
          onPress={reset}
          color="#757575"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 32,
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    minWidth: 150,
  },
});`}</code></pre>

      {/* State Management */}
      <h2 style={h2Style}>{ct.stateManagementTitle}</h2>
      <p style={pStyle}>{ct.stateManagementIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #0ea5e9' }}>
          <strong style={{ color: '#0ea5e9' }}>Flutter</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Riverpod（推荐）、Bloc（企业级）、Provider（简单）、GetX（全功能）。Flutter的状态管理生态系统非常丰富，官方文档推荐Riverpod作为首选。' : 'Riverpod (recommended), Bloc (enterprise), Provider (simple), GetX (all-in-one). Flutter has a rich state management ecosystem with Riverpod as the officially recommended choice.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4' }}>
          <strong style={{ color: '#06b6d4' }}>React Native</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Zustand（轻量）、Redux Toolkit（企业级）、Jotai（原子化）、MobX（响应式）。React Native可以使用React生态系统中的任何状态管理库。' : 'Zustand (lightweight), Redux Toolkit (enterprise), Jotai (atomic), MobX (reactive). React Native can use any state management library from the React ecosystem.'}
          </p>
        </div>
      </div>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Flutter</th>
              <th style={thStyle}>React Native</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'CLI工具' : 'CLI Tools', 'flutter CLI', 'expo-cli / react-native-cli'],
              [isZh ? 'iOS构建' : 'iOS Build', 'Xcode + flutter build', 'Xcode + metro'],
              [isZh ? 'Android构建' : 'Android Build', 'Gradle + flutter build', 'Gradle + metro'],
              [isZh ? 'CI/CD' : 'CI/CD', 'Codemagic, Fastlane', 'EAS Build, Fastlane'],
              [isZh ? '热更新' : 'OTA Updates', 'Not supported (codepush limited)', 'EAS Update, CodePush'],
              [isZh ? '调试' : 'Debugging', 'DevTools, Observatory', 'Flipper, React DevTools'],
            ].map(([aspect, flutter, rn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={{ ...tdStyle, color: '#0ea5e9' }}>{flutter}</td>
                <td style={{ ...tdStyle, color: '#06b6d4' }}>{rn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0ea5e9' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0ea5e9' }}>{ct.flutterBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要像素级完美UI' : 'Pixel-perfect UI required'}</li>
            <li>{isZh ? '复杂动画和自定义绘图' : 'Complex animations & custom drawing'}</li>
            <li>{isZh ? '多平台部署(移动+Web+桌面)' : 'Multi-platform (mobile+web+desktop)'}</li>
            <li>{isZh ? 'UI一致性优先' : 'UI consistency priority'}</li>
            <li>{isZh ? '新项目或新团队' : 'New projects or teams'}</li>
            <li>{isZh ? 'Google生态系统集成' : 'Google ecosystem integration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #06b6d4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#06b6d4' }}>{ct.reactNativeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'JavaScript/React团队' : 'JavaScript/React teams'}</li>
            <li>{isZh ? '需要原生外观和感觉' : 'Native look and feel needed'}</li>
            <li>{isZh ? '利用npm生态系统' : 'Leverage npm ecosystem'}</li>
            <li>{isZh ? '需要OTA更新' : 'OTA updates required'}</li>
            <li>{isZh ? '与现有React Web应用集成' : 'Integration with React web apps'}</li>
            <li>{isZh ? '深度原生模块集成' : 'Deep native module integration'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/uuid-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      {/* FAQ */}
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
