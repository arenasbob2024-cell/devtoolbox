'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Expo vs Capacitor: Cross-Platform Mobile Framework Comparison',
    intro: 'Expo and Capacitor represent two different approaches to cross-platform mobile development in 2025. Expo offers a managed React Native experience with over-the-air updates, while Capacitor brings web technologies to native mobile apps. This comparison examines performance, developer experience, ecosystem, and real-world use cases to help you choose the right framework.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Expo is ideal for React Native developers wanting a streamlined, managed experience with OTA updates and easy deployment. Capacitor excels for web developers who want to package existing web apps as native mobile apps. For pure React Native development in 2025, Expo is recommended. For leveraging existing web codebases, Capacitor is the better choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Expo is built on React Native with managed workflows and OTA updates',
    takeaway2: 'Capacitor wraps web apps (React, Vue, Angular) as native mobile apps',
    takeaway3: 'Expo offers better native module integration and performance',
    takeaway4: 'Capacitor allows code sharing between web and mobile platforms',
    takeaway5: 'Expo has superior development tooling and debugging experience',
    takeaway6: 'Capacitor is framework-agnostic and works with any web technology',
    
    whatIsExpoTitle: 'What is Expo?',
    whatIsExpoContent: 'Expo is a framework and platform built on top of React Native that provides managed workflows, over-the-air updates, and a rich set of pre-built modules. Created in 2016, Expo simplifies React Native development by handling native code compilation, providing a managed app development experience, and offering services like EAS (Expo Application Services) for building and deploying.',
    
    whatIsCapacitorTitle: 'What is Capacitor?',
    whatIsCapacitorContent: 'Capacitor is a cross-platform native runtime created by the Ionic team in 2019. It enables web developers to build native mobile apps using HTML, CSS, and JavaScript while accessing native device features through a unified API. Capacitor wraps your web app in a native container and provides bridges to native SDKs on iOS, Android, and web platforms.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance characteristics and benchmarks for each framework:',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'How each framework approaches cross-platform development:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Different approaches to building mobile apps:',
    
    expoExampleTitle: 'Expo (React Native)',
    capacitorExampleTitle: 'Capacitor (Web + Native)',
    
    nativeModulesTitle: 'Native Module Access',
    nativeModulesIntro: 'Accessing device features in each framework:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Building and deploying apps with each framework:',
    
    whenToUseTitle: 'When to Use Each Framework',
    expoBestFor: 'Use Expo When:',
    capacitorBestFor: 'Use Capacitor When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between Expo and Capacitor depends on your team and project requirements. Expo is the superior choice for teams committed to React Native who want managed workflows, OTA updates, and excellent developer tooling. Capacitor shines for web-focused teams who want to leverage existing web codebases and share code between web and mobile platforms. For new mobile-first projects, Expo provides a more native experience with better performance.',
    
    faq1q: 'Can I use Capacitor with React Native?',
    faq1a: 'No, Capacitor is designed for web technologies (HTML/CSS/JS) and works with frameworks like React, Vue, or Angular for web. React Native uses its own rendering system. If you want to use React Native, Expo is the recommended approach.',
    
    faq2q: 'Does Expo support all React Native features?',
    faq2a: 'Expo now supports most React Native features through Config Plugins. You can add custom native code, use third-party libraries with native code, and access all native APIs. The old limitations no longer apply with modern Expo.',
    
    faq3q: 'Is Capacitor slower than native apps?',
    faq3a: 'Capacitor apps run in a WebView, which can be slower than native for complex animations or heavy computations. However, for most business apps, the performance difference is negligible. Modern devices handle hybrid apps very well.',
    
    faq4q: 'Can I share code between web and mobile with Expo?',
    faq4a: 'Yes, but it requires more effort than Capacitor. You can share business logic and some components, but UI code differs between React Native and React for web. Tools like Solito help bridge this gap.',
    
    faq5q: 'Which has better debugging tools?',
    faq5a: 'Expo has superior debugging tools including Expo Go for instant testing, Flipper integration, and excellent React DevTools support. Capacitor relies on browser DevTools and native debugging, which can be more complex.',
    
    faq6q: 'How do OTA updates work in Expo?',
    faq6a: 'Expo uses EAS Update to push JavaScript updates to users without going through app store review. You can update your app instantly for bug fixes and minor changes. Major changes still require app store updates.',
    
    faq7q: 'Can I migrate from Capacitor to Expo?',
    faq7a: 'Its possible but requires rewriting your UI layer from web technologies to React Native components. Business logic and API calls can be reused. Its a significant undertaking best suited for major version updates.',
    
    faq8q: 'Which is better for startups?',
    faq8a: 'If your team has web development background, Capacitor offers faster time-to-market by reusing existing skills. For startups building mobile-first products, Expo provides better long-term scalability and native performance.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Expo vs Capacitor：跨平台移动框架对比',
    intro: 'Expo和Capacitor代表了2025年跨平台移动开发的两种不同方法。Expo提供托管的React Native体验和OTA更新，而Capacitor将Web技术带入原生移动应用。本比较考察性能、开发者体验、生态系统和真实用例，帮助你选择合适的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Expo非常适合想要简化托管体验、OTA更新和简单部署的React Native开发者。Capacitor非常适合希望将现有Web应用打包为原生移动应用的Web开发者。对于2025年的纯React Native开发，推荐使用Expo。对于利用现有Web代码库，Capacitor是更好的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Expo基于React Native构建，提供托管工作流和OTA更新',
    takeaway2: 'Capacitor将Web应用（React、Vue、Angular）打包为原生移动应用',
    takeaway3: 'Expo提供更好的原生模块集成和性能',
    takeaway4: 'Capacitor允许在Web和移动平台之间共享代码',
    takeaway5: 'Expo拥有卓越的开发工具和调试体验',
    takeaway6: 'Capacitor与框架无关，可与任何Web技术配合使用',
    
    whatIsExpoTitle: '什么是Expo？',
    whatIsExpoContent: 'Expo是一个基于React Native构建的框架和平台，提供托管工作流、OTA更新和丰富的预构建模块。Expo创建于2016年，通过处理原生代码编译、提供托管应用开发体验以及提供EAS（Expo应用服务）用于构建和部署，简化了React Native开发。',
    
    whatIsCapacitorTitle: '什么是Capacitor？',
    whatIsCapacitorContent: 'Capacitor是Ionic团队于2019年创建的跨平台原生运行时。它使Web开发者能够使用HTML、CSS和JavaScript构建原生移动应用，同时通过统一的API访问原生设备功能。Capacitor将你的Web应用包装在原生容器中，并提供到iOS、Android和Web平台上原生SDK的桥接。',
    
    performanceTitle: '性能对比',
    performanceIntro: '每个框架的性能特征和基准测试：',
    
    architectureTitle: '架构对比',
    architectureIntro: '每个框架如何处理跨平台开发：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '构建移动应用的不同方法：',
    
    expoExampleTitle: 'Expo (React Native)',
    capacitorExampleTitle: 'Capacitor (Web + Native)',
    
    nativeModulesTitle: '原生模块访问',
    nativeModulesIntro: '在每个框架中访问设备功能：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '使用每个框架构建和部署应用：',
    
    whenToUseTitle: '何时使用每个框架',
    expoBestFor: '使用Expo的场景：',
    capacitorBestFor: '使用Capacitor的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Expo和Capacitor之间的选择取决于你的团队和项目需求。Expo是致力于React Native的团队的优越选择，他们想要托管工作流、OTA更新和出色的开发工具。Capacitor对于希望利用现有Web代码库并在Web和移动平台之间共享代码的Web团队表现出色。对于新的移动优先项目，Expo提供更原生的体验和更好的性能。',
    
    faq1q: '我可以在React Native中使用Capacitor吗？',
    faq1a: '不可以，Capacitor是为Web技术（HTML/CSS/JS）设计的，适用于React、Vue或Angular等Web框架。React Native使用自己的渲染系统。如果你想使用React Native，Expo是推荐的方法。',
    
    faq2q: 'Expo支持所有React Native功能吗？',
    faq2a: 'Expo现在通过Config Plugins支持大多数React Native功能。你可以添加自定义原生代码、使用带有原生代码的第三方库，并访问所有原生API。旧的限制在现代Expo中不再适用。',
    
    faq3q: 'Capacitor比原生应用慢吗？',
    faq3a: 'Capacitor应用在WebView中运行，对于复杂动画或大量计算可能比原生慢。然而，对于大多数业务应用，性能差异可以忽略不计。现代设备处理混合应用非常好。',
    
    faq4q: '我可以在Expo中共享Web和移动代码吗？',
    faq4a: '可以，但比Capacitor需要更多努力。你可以共享业务逻辑和一些组件，但React Native和React for Web之间的UI代码不同。像Solito这样的工具可以帮助弥合这一差距。',
    
    faq5q: '哪个有更好的调试工具？',
    faq5a: 'Expo拥有卓越的调试工具，包括Expo Go用于即时测试、Flipper集成和出色的React DevTools支持。Capacitor依赖浏览器DevTools和原生调试，这可能更复杂。',
    
    faq6q: 'Expo中的OTA更新如何工作？',
    faq6a: 'Expo使用EAS Update将JavaScript更新推送给用户，无需经过应用商店审核。你可以即时更新应用以修复错误和进行小改动。重大更改仍需要应用商店更新。',
    
    faq7q: '我可以从Capacitor迁移到Expo吗？',
    faq7a: '可能，但需要将UI层从Web技术重写为React Native组件。业务逻辑和API调用可以重用。这是一个重大工程，最适合主要版本更新。',
    
    faq8q: '哪个对初创公司更好？',
    faq8a: '如果你的团队有Web开发背景，Capacitor通过重用现有技能提供更快的市场时间。对于构建移动优先产品的初创公司，Expo提供更好的长期可扩展性和原生性能。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ExpoVsCapacitor({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsExpoTitle}</h3>
      <p style={pStyle}>{ct.whatIsExpoContent}</p>

      <h3 style={h3Style}>{ct.whatIsCapacitorTitle}</h3>
      <p style={pStyle}>{ct.whatIsCapacitorContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>Capacitor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2016', '2019'],
              [isZh ? '底层技术' : 'Underlying Tech', 'React Native', 'WebView + Native Bridge'],
              [isZh ? 'UI渲染' : 'UI Rendering', 'Native Components', 'HTML/CSS in WebView'],
              [isZh ? '代码共享' : 'Code Sharing', 'React Native + Web (limited)', 'Full web codebase'],
              [isZh ? '框架支持' : 'Framework Support', 'React Native only', 'React, Vue, Angular, Svelte'],
              [isZh ? '原生模块' : 'Native Modules', 'Native bridge + Config Plugins', 'Plugin system'],
              [isZh ? '热更新' : 'OTA Updates', 'EAS Update (built-in)', 'Capacitor Live Updates (paid)'],
            ].map(([feature, expo, capacitor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#a855f7' }}>{expo}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{capacitor}</td>
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
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>Capacitor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间' : 'Startup Time', '~1.5s', '~2.5s'],
              [isZh ? '内存使用' : 'Memory Usage', '~80MB', '~120MB'],
              [isZh ? '动画性能' : 'Animation Performance', '60 FPS (native)', '45-60 FPS'],
              [isZh ? '包大小' : 'App Size', '~25MB', '~15MB'],
              [isZh ? 'JS执行' : 'JS Execution', 'JSC/Hermes', 'WebView JS Engine'],
              [isZh ? '手势响应' : 'Gesture Response', '<16ms', '16-32ms'],
            ].map(([metric, expo, capacitor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{expo}</td>
                <td style={tdStyle}>{capacitor}</td>
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
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>Capacitor</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '相机' : 'Camera', 'expo-camera (built-in)', '@capacitor/camera'],
              [isZh ? '地理位置' : 'Geolocation', 'expo-location (built-in)', '@capacitor/geolocation'],
              [isZh ? '推送通知' : 'Push Notifications', 'expo-notifications (built-in)', '@capacitor/push-notifications'],
              [isZh ? '文件系统' : 'File System', 'expo-file-system (built-in)', '@capacitor/filesystem'],
              [isZh ? '生物识别' : 'Biometrics', 'expo-local-authentication', '@capacitor-community/biometry'],
              [isZh ? '地图' : 'Maps', 'react-native-maps', '@capacitor/google-maps'],
              [isZh ? '深链接' : 'Deep Linking', 'expo-linking (built-in)', '@capacitor/app'],
              [isZh ? 'OTA更新' : 'OTA Updates', 'EAS Update', 'Capacitor Live Updates'],
            ].map(([feature, expo, capacitor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#a855f7' }}>{expo}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{capacitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#a855f7' }}>{ct.expoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Expo - React Native Component
import { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Expo Example
      </Text>
      
      <Button title="Pick Image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 150 }} />
      )}
      
      <Button title="Get Location" onPress={getLocation} />
      {location && (
        <Text>Lat: " + location.coords.latitude.toFixed(4) + ", Lon: " + location.coords.longitude.toFixed(4)</Text>
      )}
    </View>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.capacitorExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Capacitor - Web Component (works in any framework)
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    const result = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    setImage(result.webPath);
  };

  const getLocation = async () => {
    const perm = await Geolocation.requestPermissions();
    if (perm.location !== 'granted') {
      alert('Permission denied');
      return;
    }

    const loc = await Geolocation.getCurrentPosition();
    setLocation(loc);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Capacitor Example</h1>
      
      <button onClick={pickImage}>Pick Image</button>
      {image && <img src={image} style={{ width: 200 }} />}
      
      <button onClick={getLocation}>Get Location</button>
      {location && (
        <p>Lat: " + location.coords.latitude.toFixed(4) + ", Lon: " + location.coords.longitude.toFixed(4)</p>
      )}
    </div>
  );
}`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Expo</th>
              <th style={thStyle}>Capacitor</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['iOS', 'EAS Build / Xcode', 'Xcode'],
              ['Android', 'EAS Build / Android Studio', 'Android Studio'],
              ['Web', 'expo-web (limited)', 'Full support'],
              [isZh ? 'OTA更新' : 'OTA Updates', 'EAS Update (free tier)', 'Live Updates (paid)'],
              [isZh ? 'CI/CD' : 'CI/CD', 'EAS CI/CD', 'Any CI + manual build'],
              [isZh ? '预览' : 'Preview', 'Expo Go app', 'Browser + native preview'],
            ].map(([platform, expo, capacitor], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#a855f7' }}>{expo}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{capacitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #a855f7' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#a855f7' }}>{ct.expoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '移动优先应用' : 'Mobile-first applications'}</li>
            <li>{isZh ? '需要原生性能' : 'Native performance required'}</li>
            <li>{isZh ? 'React Native开发者' : 'React Native developers'}</li>
            <li>{isZh ? '需要OTA更新' : 'OTA updates needed'}</li>
            <li>{isZh ? '复杂动画和手势' : 'Complex animations & gestures'}</li>
            <li>{isZh ? '长期移动战略' : 'Long-term mobile strategy'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.capacitorBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '现有Web应用' : 'Existing web applications'}</li>
            <li>{isZh ? 'Web开发团队' : 'Web development teams'}</li>
            <li>{isZh ? '跨平台代码共享' : 'Cross-platform code sharing'}</li>
            <li>{isZh ? '快速移动版发布' : 'Quick mobile launch'}</li>
            <li>{isZh ? '简单业务应用' : 'Simple business apps'}</li>
            <li>{isZh ? '渐进式Web应用' : 'Progressive Web Apps'}</li>
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
