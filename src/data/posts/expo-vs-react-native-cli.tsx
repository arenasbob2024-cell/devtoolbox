'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Expo vs React Native CLI: Mobile Development Comparison 2025',
    intro: 'Choosing between Expo and React Native CLI is one of the most important decisions when starting a React Native project. This comprehensive comparison covers development speed, native module access, build capabilities, and real-world use cases to help you make the right choice.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Expo is ideal for 90% of React Native projects with its managed workflow, OTA updates, and faster development cycle. React Native CLI offers more control and native module access but requires more setup. For most teams in 2025, start with Expo and eject only if necessary.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Expo reduces development time by 30-50% with pre-configured templates and managed services',
    takeaway2: 'React Native CLI provides full native code access for custom modules',
    takeaway3: 'Expo supports OTA updates without app store review delays',
    takeaway4: 'Both can produce production-ready apps with similar performance',
    takeaway5: 'Expo now supports custom native code via Config Plugins',
    takeaway6: 'Migration from Expo to CLI is possible but requires effort',
    
    whatIsExpoTitle: 'What is Expo?',
    whatIsExpoContent: 'Expo is a framework and platform for universal React applications. Built on top of React Native, it provides a managed development workflow with pre-configured native modules, build services, and over-the-air updates. Think of it as "Create React App" for mobile development.',
    
    whatIsRNCLITitle: 'What is React Native CLI?',
    whatIsRNCLIContent: 'React Native CLI is the official command-line interface for React Native. It gives developers direct access to native iOS and Android code, allowing unlimited customization. You manage native dependencies, build configurations, and app signing manually.',
    
    performanceTitle: 'Development Speed Comparison',
    performanceIntro: 'Time to complete common development tasks:',
    
    setupTitle: 'Project Setup Time',
    setupIntro: 'From zero to running app on device:',
    
    buildTitle: 'Build & Deployment',
    buildIntro: 'Creating production builds for app stores:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and limitations:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Both use the same React Native APIs with different setup:',
    
    expoExampleTitle: 'Expo Project',
    cliExampleTitle: 'React Native CLI Project',
    
    nativeModulesTitle: 'Native Module Access',
    nativeModulesIntro: 'How to add native functionality:',
    
    otaTitle: 'Over-The-Air Updates',
    otaIntro: 'Updating your app without app store review:',
    
    typescriptTitle: 'TypeScript & Developer Experience',
    typescriptIntro: 'Development tooling comparison:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Where and how can you deploy?',
    
    migrationTitle: 'When to Eject from Expo',
    migrationIntro: 'Reasons to consider ejecting:',
    
    whenToUseTitle: 'When to Use Each Option',
    expoBestFor: 'Use Expo When:',
    cliBestFor: 'Use React Native CLI When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Expo has matured enough to handle most production use cases. With Config Plugins supporting custom native code and EAS Build handling complex build requirements, there are fewer reasons to choose bare React Native CLI. Start with Expo unless you have specific native requirements that Config Plugins cannot handle. The development speed advantage is too significant to ignore.',
    
    faq1q: 'Can I use Expo for production apps?',
    faq1a: 'Absolutely. Companies like Brex, Flexport, and countless startups use Expo in production. EAS Build provides reliable cloud builds, and OTA updates enable rapid iteration without app store delays.',
    
    faq2q: 'Is Expo slower than React Native CLI?',
    faq2a: 'No. Both produce apps with identical runtime performance. Expo includes additional libraries that increase bundle size slightly, but this can be optimized with tree shaking and lazy loading.',
    
    faq3q: 'Can I add custom native modules in Expo?',
    faq3a: 'Yes, through Config Plugins and local libraries. Expo now supports adding custom native code while maintaining the managed workflow. You can also use Swift/Objective-C and Kotlin/Java modules.',
    
    faq4q: 'What is EAS Build?',
    faq4a: 'EAS (Expo Application Services) Build is a cloud build service that compiles your app for iOS and Android. It handles signing certificates, provisioning profiles, and build optimizations automatically.',
    
    faq5q: 'Can I migrate from Expo to React Native CLI?',
    faq5a: 'Yes, through "npx expo prebuild" which generates native projects. However, once you eject and modify native code directly, you lose some Expo benefits like automatic updates.',
    
    faq6q: 'Does Expo support push notifications?',
    faq6a: 'Yes, Expo provides Expo Notifications API that works with FCM (Android) and APNs (iOS). You can also use third-party services like OneSignal or Firebase directly.',
    
    faq7q: 'How does OTA updates work in Expo?',
    faq7a: 'Expo Updates allows publishing JavaScript updates instantly via "eas update". Users get the new version on next app launch. This is perfect for bug fixes and minor features.',
    
    faq8q: 'Is Expo free to use?',
    faq8a: 'The Expo SDK and development tools are free and open source. EAS Build has a free tier (30 builds/month) with paid plans for higher volumes and advanced features.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Expo vs React Native CLI：2025移动开发对比',
    intro: '在开始React Native项目时，选择Expo还是React Native CLI是最重要的决定之一。本全面比较涵盖开发速度、原生模块访问、构建能力和真实用例，帮助你做出正确选择。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Expo凭借其托管工作流、OTA更新和更快的开发周期，适合90%的React Native项目。React Native CLI提供更多控制和原生模块访问，但需要更多设置。对于2025年的大多数团队，建议从Expo开始，仅在必要时弹出。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Expo通过预配置模板和托管服务减少30-50%的开发时间',
    takeaway2: 'React Native CLI提供完整的原生代码访问用于自定义模块',
    takeaway3: 'Expo支持OTA更新，无需等待应用商店审核',
    takeaway4: '两者都可以生成性能相似的准生产应用',
    takeaway5: 'Expo现在通过Config Plugins支持自定义原生代码',
    takeaway6: '从Expo迁移到CLI是可能的但需要投入精力',
    
    whatIsExpoTitle: '什么是Expo？',
    whatIsExpoContent: 'Expo是一个通用React应用的框架和平台。构建在React Native之上，它提供托管开发工作流、预配置原生模块、构建服务和OTA更新。可以把它想象成移动开发的"Create React App"。',
    
    whatIsRNCLITitle: '什么是React Native CLI？',
    whatIsRNCLIContent: 'React Native CLI是React Native的官方命令行工具。它让开发者直接访问iOS和Android原生代码，允许无限定制。你需要手动管理原生依赖、构建配置和应用签名。',
    
    performanceTitle: '开发速度对比',
    performanceIntro: '完成常见开发任务所需时间：',
    
    setupTitle: '项目设置时间',
    setupIntro: '从零到在设备上运行应用：',
    
    buildTitle: '构建与部署',
    buildIntro: '为应用商店创建生产构建：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较能力和限制：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两者使用相同的React Native API，只是设置不同：',
    
    expoExampleTitle: 'Expo项目',
    cliExampleTitle: 'React Native CLI项目',
    
    nativeModulesTitle: '原生模块访问',
    nativeModulesIntro: '如何添加原生功能：',
    
    otaTitle: 'OTA更新',
    otaIntro: '无需应用商店审核更新应用：',
    
    typescriptTitle: 'TypeScript与开发者体验',
    typescriptIntro: '开发工具对比：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '可以部署到哪里以及如何部署？',
    
    migrationTitle: '何时从Expo弹出',
    migrationIntro: '考虑弹出的原因：',
    
    whenToUseTitle: '何时使用每个选项',
    expoBestFor: '使用Expo的场景：',
    cliBestFor: '使用React Native CLI的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Expo已经成熟到可以处理大多数生产用例。通过Config Plugins支持自定义原生代码和EAS Build处理复杂构建需求，选择纯React Native CLI的理由越来越少。除非你有Config Plugins无法处理的特定原生需求，否则从Expo开始。开发速度优势太显著，不容忽视。',
    
    faq1q: '我可以在生产应用中使用Expo吗？',
    faq1a: '当然可以。Brex、Flexport等公司和无数初创企业都在生产中使用Expo。EAS Build提供可靠的云构建，OTA更新实现无需应用商店延迟的快速迭代。',
    
    faq2q: 'Expo比React Native CLI慢吗？',
    faq2a: '不会。两者生成的应用具有相同的运行时性能。Expo包含额外的库，会略微增加包大小，但可以通过tree shaking和懒加载进行优化。',
    
    faq3q: '我可以在Expo中添加自定义原生模块吗？',
    faq3a: '可以，通过Config Plugins和本地库。Expo现在支持在保持托管工作流的同时添加自定义原生代码。你也可以使用Swift/Objective-C和Kotlin/Java模块。',
    
    faq4q: '什么是EAS Build？',
    faq4a: 'EAS（Expo Application Services）Build是一个云构建服务，为iOS和Android编译你的应用。它自动处理签名证书、配置文件和构建优化。',
    
    faq5q: '我可以从Expo迁移到React Native CLI吗？',
    faq5a: '可以，通过"npx expo prebuild"生成原生项目。但是，一旦弹出并直接修改原生代码，你将失去一些Expo的优势，如自动更新。',
    
    faq6q: 'Expo支持推送通知吗？',
    faq6a: '支持，Expo提供Expo Notifications API，可与FCM（Android）和APNs（iOS）配合使用。你也可以直接使用OneSignal或Firebase等第三方服务。',
    
    faq7q: 'Expo中的OTA更新如何工作？',
    faq7a: 'Expo Updates允许通过"eas update"即时发布JavaScript更新。用户在下次启动应用时获得新版本。这非常适合修复bug和添加小功能。',
    
    faq8q: 'Expo免费吗？',
    faq8a: 'Expo SDK和开发工具是免费开源的。EAS Build有免费层（每月30次构建），付费计划提供更高配额和高级功能。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ExpoVsReactNativeCLI({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #9333ea', background: 'linear-gradient(135deg, rgba(147,51,234,0.1), rgba(59,130,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#9333ea' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsExpoTitle}</h3>
      <p style={pStyle}>{ct.whatIsExpoContent}</p>

      <h3 style={h3Style}>{ct.whatIsRNCLITitle}</h3>
      <p style={pStyle}>{ct.whatIsRNCLIContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>React Native CLI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '原生代码访问' : 'Native Code Access', isZh ? '通过Config Plugins' : 'Via Config Plugins', isZh ? '完全访问' : 'Full Access'],
              [isZh ? '构建服务' : 'Build Service', 'EAS Build', isZh ? '需自行配置' : 'Manual Setup'],
              [isZh ? 'OTA更新' : 'OTA Updates', isZh ? '内置支持' : 'Built-in', isZh ? '需CodePush等' : 'CodePush Required'],
              [isZh ? '开发服务器' : 'Dev Server', 'Expo Go / Dev Client', 'Metro Bundler'],
              [isZh ? '项目设置' : 'Project Setup', isZh ? '5分钟' : '5 minutes', isZh ? '30-60分钟' : '30-60 minutes'],
              [isZh ? '包大小' : 'Bundle Size', isZh ? '稍大（含Expo库）' : 'Larger (Expo libs)', isZh ? '更小（按需）' : 'Smaller (manual)'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '平缓' : 'Gentle', isZh ? '陡峭' : 'Steep'],
            ].map(([feature, expo, cli], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#9333ea' }}>{expo}</td>
                <td style={tdStyle}>{cli}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.setupTitle}</h3>
      <p style={pStyle}>{ct.setupIntro}</p>

      <pre style={codeStyle}><code>{`// Expo - Quick Start
npx create-expo-app@latest my-app
cd my-app
npx expo start

// That's it! Scan QR code with Expo Go

// React Native CLI - Setup
npx @react-native-community/cli init MyApp
cd MyApp

// iOS setup (macOS only)
cd ios && pod install && cd ..

// Run on iOS
npx react-native run-ios

// Run on Android
npx react-native run-android

// Additional setup for each platform...`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '任务' : 'Task'}</th>
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>React Native CLI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '初始化项目' : 'Project Init', '5 min', '30-60 min'],
              [isZh ? '首次运行' : 'First Run', '2 min', '10-15 min'],
              [isZh ? '添加推送通知' : 'Add Push Notifications', '10 min', '2-4 hours'],
              [isZh ? '配置地图' : 'Configure Maps', '15 min', '1-2 hours'],
              [isZh ? '设置深链接' : 'Deep Linking Setup', '5 min', '30-60 min'],
            ].map(([task, expo, cli], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{task}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{expo}</td>
                <td style={tdStyle}>{cli}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.buildTitle}</h3>
      <p style={pStyle}>{ct.buildIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '构建方式' : 'Build Method'}</th>
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>React Native CLI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '云构建' : 'Cloud Build', 'eas build', isZh ? '需CI/CD配置' : 'CI/CD Required'],
              [isZh ? '本地构建' : 'Local Build', 'eas build --local', 'Xcode / Android Studio'],
              [isZh ? '构建时间' : 'Build Time', '10-20 min', '5-15 min'],
              [isZh ? '签名管理' : 'Signing', isZh ? '自动管理' : 'Automatic', isZh ? '手动管理' : 'Manual'],
              [isZh ? '多环境' : 'Multi-env', 'eas.json', isZh ? '需手动配置' : 'Manual Setup'],
            ].map(([method, expo, cli], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{method}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{expo}</td>
                <td style={tdStyle}>{cli}</td>
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
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>React Native CLI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '相机' : 'Camera', 'expo-camera', 'react-native-camera'],
              [isZh ? '地图' : 'Maps', 'expo-location + react-native-maps', 'react-native-maps'],
              [isZh ? '推送通知' : 'Push Notifications', 'expo-notifications', '@react-native-firebase/messaging'],
              [isZh ? '认证' : 'Authentication', 'expo-local-authentication', 'react-native-biometrics'],
              [isZh ? '文件系统' : 'File System', 'expo-file-system', 'react-native-fs'],
              [isZh ? '图片选择器' : 'Image Picker', 'expo-image-picker', 'react-native-image-picker'],
              [isZh ? 'SQLite' : 'SQLite', 'expo-sqlite', 'react-native-quick-sqlite'],
              [isZh ? 'WebView' : 'WebView', 'react-native-webview', 'react-native-webview'],
              [isZh ? '蓝牙' : 'Bluetooth', 'Limited', 'react-native-ble-plx'],
              [isZh ? '后台任务' : 'Background Tasks', 'expo-task-manager', 'react-native-background-fetch'],
            ].map(([feature, expo, cli], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#9333ea' }}>{expo}</td>
                <td style={tdStyle}>{cli}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#9333ea' }}>{ct.expoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Expo App - app.json
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.company.myapp"
    },
    "android": {
      "package": "com.company.myapp"
    }
  }
}

// App.tsx
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const token = await Notifications.getExpoPushTokenAsync();
      console.log('Push token:', token.data);
    }
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Button title="Grant Camera Access" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} />
      <StatusBar style="auto" />
    </View>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#61dafb' }}>{ct.cliExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React Native CLI - App.tsx
import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'react-native-camera';
import messaging from '@react-native-firebase/messaging';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function App() {
  useEffect(() => {
    requestPushNotificationPermission();
  }, []);

  async function requestPushNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      const token = await messaging().getToken();
      console.log('FCM token:', token);
    }
  }

  async function requestCameraPermission() {
    const result = await request(
      Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.CAMERA 
        : PERMISSIONS.ANDROID.CAMERA
    );
    return result === 'granted';
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera}
        onBarCodeRead={(data) => console.log(data)}
      />
    </View>
  );
}

// ios/Podfile - Need to add pods
target 'MyApp' do
  pod 'Firebase/Messaging'
  use_native_modules!
end

// Android - Need to modify build.gradle
dependencies {
  implementation 'com.google.firebase:firebase-messaging'
}`}</code></pre>

      <h2 style={h2Style}>{ct.otaTitle}</h2>
      <p style={pStyle}>{ct.otaIntro}</p>

      <pre style={codeStyle}><code>{`// Expo - OTA Updates
// Configure in app.json
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}

// Publish update
eas update --branch production --message "Fix login bug"

// Check for updates in app
import * as Updates from 'expo-updates';

useEffect(() => {
  async function checkForUpdate() {
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      // Prompt user to restart
      Updates.reloadAsync();
    }
  }
  checkForUpdate();
}, []);

// React Native CLI - CodePush
import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);

// Deploy
appcenter codepush release-react -a YourApp/Android -d Production`}</code></pre>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>React Native CLI</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['iOS App Store', 'EAS Build + Transporter', 'Xcode + Transporter'],
              ['Google Play', 'EAS Build', 'Android Studio / Gradle'],
              ['TestFlight', 'EAS Build', 'Xcode'],
              ['Google Play Internal', 'EAS Build', 'Gradle'],
              ['Expo Go (Dev)', 'Built-in', 'N/A'],
              ['Web', 'expo-web', 'react-native-web'],
            ].map(([platform, expo, cli], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#9333ea' }}>{expo}</td>
                <td style={tdStyle}>{cli}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #9333ea' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#9333ea' }}>{ct.expoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速MVP开发' : 'Fast MVP development'}</li>
            <li>{isZh ? '中小型应用' : 'Small to medium apps'}</li>
            <li>{isZh ? '需要OTA更新' : 'Need OTA updates'}</li>
            <li>{isZh ? '跨平台一致性' : 'Cross-platform consistency'}</li>
            <li>{isZh ? '团队缺乏原生经验' : 'Team without native experience'}</li>
            <li>{isZh ? '频繁更新迭代' : 'Frequent updates'}</li>
            <li>{isZh ? '初创公司' : 'Startups'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #61dafb' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#61dafb' }}>{ct.cliBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂原生模块需求' : 'Complex native modules'}</li>
            <li>{isZh ? '高性能游戏/AR/VR' : 'High-performance games/AR/VR'}</li>
            <li>{isZh ? '需要完全控制原生代码' : 'Need full native code control'}</li>
            <li>{isZh ? '特殊硬件集成' : 'Special hardware integration'}</li>
            <li>{isZh ? '大型企业应用' : 'Large enterprise apps'}</li>
            <li>{isZh ? '已有原生基础设施' : 'Existing native infrastructure'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(147,51,234,0.1), rgba(59,130,246,0.1))', borderRadius: 12, border: '1px solid rgba(147,51,234,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#9333ea', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#9333ea', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#9333ea', textDecoration: 'none' }}>JWT Decoder</a>
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
