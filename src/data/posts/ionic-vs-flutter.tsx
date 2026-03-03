'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Ionic vs Flutter: Hybrid App Framework Comparison',
    intro: 'Ionic and Flutter represent fundamentally different approaches to cross-platform development. Ionic leverages web technologies with native wrappers, while Flutter uses Dart with its own rendering engine. This comparison examines performance, developer experience, ecosystem, and real-world use cases to help you choose the right framework for your next hybrid app.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Ionic is ideal for web developers who want to build mobile apps using familiar technologies (HTML, CSS, JavaScript) with access to native features via Capacitor. Flutter excels at pixel-perfect UIs and high-performance animations. For teams with web expertise needing quick mobile deployment, choose Ionic. For performance-critical apps with custom UIs, choose Flutter.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Ionic uses web technologies (HTML/CSS/JS) with Angular/React/Vue',
    takeaway2: 'Flutter uses Dart with Skia rendering for native performance',
    takeaway3: 'Ionic has faster initial development for web developers',
    takeaway4: 'Flutter provides better performance and smoother animations',
    takeaway5: 'Ionic allows full code sharing between web and mobile',
    takeaway6: 'Flutter offers more consistent UI across all platforms',
    
    whatIsIonicTitle: 'What is Ionic?',
    whatIsIonicContent: 'Ionic is an open-source framework for building hybrid mobile applications using web technologies. Created in 2013 by Drifty Co., Ionic provides UI components that look and feel native while running in a WebView. It works with Angular, React, Vue, or vanilla JavaScript. Ionic apps are packaged as native apps using Capacitor (or legacy Cordova), providing access to native device features through a JavaScript bridge.',
    
    whatIsFlutterTitle: 'What is Flutter?',
    whatIsFlutterContent: 'Flutter is Google UI toolkit for building natively compiled applications from a single codebase. Released in 2017, Flutter uses the Dart programming language and renders UI using its own Skia graphics engine. Unlike Ionic, Flutter does not use WebViews or native UI components - it draws every pixel on screen, enabling complete UI control and consistent appearance across platforms.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance characteristics and benchmarks for each framework:',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'How each framework approaches hybrid app development:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Building a similar component in each framework:',
    
    ionicExampleTitle: 'Ionic (Angular)',
    flutterExampleTitle: 'Flutter (Dart)',
    
    nativeAccessTitle: 'Native Feature Access',
    nativeAccessIntro: 'Accessing device features in each framework:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Building and deploying apps with each framework:',
    
    whenToUseTitle: 'When to Use Each Framework',
    ionicBestFor: 'Use Ionic When:',
    flutterBestFor: 'Use Flutter When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between Ionic and Flutter depends on your team expertise and project requirements. Ionic is perfect for web-focused teams who want to leverage existing skills and share code between web and mobile platforms. Flutter is ideal for teams prioritizing performance, custom UIs, and consistent cross-platform appearance. For rapid prototyping and web-mobile code sharing, Ionic wins. For performance-critical apps with complex animations, Flutter is the superior choice.',
    
    faq1q: 'Is Ionic slower than Flutter?',
    faq1a: 'Yes, Ionic apps run in a WebView which is generally slower than Flutters native rendering. However, for most business apps, the performance difference is negligible. Modern devices handle WebView apps very well, and Ionic performance has improved significantly.',
    
    faq2q: 'Can I use Ionic with React or Vue?',
    faq2a: 'Yes, Ionic supports Angular, React, Vue, and vanilla JavaScript. You can choose your preferred framework. Ionic provides the same UI components and native features regardless of the framework you choose.',
    
    faq3q: 'Does Flutter support web?',
    faq3a: 'Yes, Flutter has mature web support and can compile to JavaScript for browser deployment. However, Flutter web apps tend to be larger in file size compared to traditional web apps built with Ionic.',
    
    faq4q: 'Which is better for PWA?',
    faq4a: 'Ionic is better suited for Progressive Web Apps since it uses standard web technologies. Flutter web can work as a PWA but is not as optimized for the web platform. If PWA is a priority, Ionic is the clear winner.',
    
    faq5q: 'Can I share code between web and mobile with Flutter?',
    faq5a: 'Yes, but its more complex than Ionic. You can share business logic but UI code differs. Flutter web is a separate compilation target. Ionic allows full code sharing including UI.',
    
    faq6q: 'Which has better native plugins?',
    faq6a: 'Flutter has more native plugins and better documentation for platform-specific features. Capacitor (used with Ionic) has good coverage but the ecosystem is smaller. Both support writing custom native code.',
    
    faq7q: 'Is Ionic good for enterprise apps?',
    faq7a: 'Yes, Ionic is used by many enterprises including NASA, Nationwide, and IBM. Its particularly good for internal business apps and B2B applications where web code sharing is valuable.',
    
    faq8q: 'Which is easier to learn?',
    faq8a: 'If you know web development, Ionic is much easier as you can use familiar technologies. Flutter requires learning Dart and a new paradigm. However, Flutters documentation and tooling are excellent, making the learning curve manageable.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Ionic vs Flutter：混合应用框架对比',
    intro: 'Ionic和Flutter代表了跨平台开发的两种根本不同方法。Ionic利用Web技术和原生包装器，而Flutter使用Dart和自己的渲染引擎。本比较考察性能、开发者体验、生态系统和真实用例，帮助你为下一个混合应用选择合适的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Ionic非常适合想要使用熟悉技术（HTML、CSS、JavaScript）构建移动应用的Web开发者，通过Capacitor访问原生功能。Flutter在像素级完美UI和高性能动画方面表现出色。对于具有Web专业知识需要快速移动部署的团队，选择Ionic。对于需要自定义UI的性能关键应用，选择Flutter。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Ionic使用Web技术（HTML/CSS/JS）配合Angular/React/Vue',
    takeaway2: 'Flutter使用Dart和Skia渲染实现原生性能',
    takeaway3: 'Ionic对Web开发者来说初始开发更快',
    takeaway4: 'Flutter提供更好的性能和更流畅的动画',
    takeaway5: 'Ionic允许在Web和移动之间完全共享代码',
    takeaway6: 'Flutter在所有平台上提供更一致的UI',
    
    whatIsIonicTitle: '什么是Ionic？',
    whatIsIonicContent: 'Ionic是一个使用Web技术构建混合移动应用的开源框架。Ionic由Drifty Co.于2013年创建，提供外观和感觉原生的UI组件，同时在WebView中运行。它与Angular、React、Vue或纯JavaScript配合使用。Ionic应用使用Capacitor（或旧版Cordova）打包为原生应用，通过JavaScript桥接提供对原生设备功能的访问。',
    
    whatIsFlutterTitle: '什么是Flutter？',
    whatIsFlutterContent: 'Flutter是Google的UI工具包，用于从单个代码库构建原生编译应用。Flutter于2017年发布，使用Dart编程语言并使用自己的Skia图形引擎渲染UI。与Ionic不同，Flutter不使用WebView或原生UI组件——它绘制屏幕上的每个像素，实现完全的UI控制和跨平台一致的外观。',
    
    performanceTitle: '性能对比',
    performanceIntro: '每个框架的性能特征和基准测试：',
    
    architectureTitle: '架构对比',
    architectureIntro: '每个框架如何处理混合应用开发：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '在每个框架中构建类似的组件：',
    
    ionicExampleTitle: 'Ionic (Angular)',
    flutterExampleTitle: 'Flutter (Dart)',
    
    nativeAccessTitle: '原生功能访问',
    nativeAccessIntro: '在每个框架中访问设备功能：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '使用每个框架构建和部署应用：',
    
    whenToUseTitle: '何时使用每个框架',
    ionicBestFor: '使用Ionic的场景：',
    flutterBestFor: '使用Flutter的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Ionic和Flutter之间的选择取决于你的团队专业知识和项目需求。Ionic非常适合希望在Web和移动平台之间利用现有技能和共享代码的Web团队。Flutter非常适合优先考虑性能、自定义UI和跨平台一致外观的团队。对于快速原型制作和Web-移动代码共享，Ionic获胜。对于具有复杂动画的性能关键应用，Flutter是更优越的选择。',
    
    faq1q: 'Ionic比Flutter慢吗？',
    faq1a: '是的，Ionic应用在WebView中运行，通常比Flutter的原生渲染慢。然而，对于大多数业务应用，性能差异可以忽略不计。现代设备处理WebView应用非常好，Ionic性能已显著改善。',
    
    faq2q: '我可以在Ionic中使用React或Vue吗？',
    faq2a: '可以，Ionic支持Angular、React、Vue和纯JavaScript。你可以选择你喜欢的框架。无论你选择哪个框架，Ionic都提供相同的UI组件和原生功能。',
    
    faq3q: 'Flutter支持Web吗？',
    faq3a: '是的，Flutter有成熟的Web支持，可以编译为JavaScript用于浏览器部署。然而，与使用Ionic构建的传统Web应用相比，Flutter Web应用往往文件大小更大。',
    
    faq4q: '哪个更适合PWA？',
    faq4a: 'Ionic更适合渐进式Web应用，因为它使用标准Web技术。Flutter Web可以作为PWA工作，但没有针对Web平台进行优化。如果PWA是优先事项，Ionic是明显的赢家。',
    
    faq5q: '我可以在Flutter中共享Web和移动代码吗？',
    faq5a: '可以，但比Ionic更复杂。你可以共享业务逻辑但UI代码不同。Flutter Web是一个单独的编译目标。Ionic允许完全代码共享包括UI。',
    
    faq6q: '哪个有更好的原生插件？',
    faq6a: 'Flutter有更多原生插件和更好的平台特定功能文档。Capacitor（与Ionic一起使用）覆盖面很好但生态系统较小。两者都支持编写自定义原生代码。',
    
    faq7q: 'Ionic适合企业应用吗？',
    faq7a: '是的，Ionic被许多企业使用，包括NASA、Nationwide和IBM。它特别适合内部业务应用和Web代码共享有价值的B2B应用。',
    
    faq8q: '哪个更容易学习？',
    faq8a: '如果你了解Web开发，Ionic要容易得多，因为你可以使用熟悉的技术。Flutter需要学习Dart和一个新范式。然而，Flutter的文档和工具非常出色，使学习曲线可控。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function IonicVsFlutter({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsIonicTitle}</h3>
      <p style={pStyle}>{ct.whatIsIonicContent}</p>

      <h3 style={h3Style}>{ct.whatIsFlutterTitle}</h3>
      <p style={pStyle}>{ct.whatIsFlutterContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Ionic</th>
              <th style={thStyle}>Flutter</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2013', '2017'],
              [isZh ? '开发语言' : 'Language', 'JS/TS + HTML/CSS', 'Dart'],
              [isZh ? 'UI渲染' : 'UI Rendering', 'WebView + Native Shell', 'Skia (custom rendering)'],
              [isZh ? '框架支持' : 'Framework Support', 'Angular, React, Vue', 'Dart only'],
              [isZh ? '原生桥接' : 'Native Bridge', 'Capacitor/Cordova', 'Platform Channels'],
              [isZh ? '性能' : 'Performance', 'WebView performance', 'Near-native (AOT)'],
              [isZh ? '包大小' : 'App Size', 'Smaller (~5MB)', 'Larger (~10MB+ min)'],
            ].map(([feature, ionic, flutter], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#3880ff' }}>{ionic}</td>
                <td style={{ ...tdStyle, color: '#02569b' }}>{flutter}</td>
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
              <th style={thStyle}>Ionic</th>
              <th style={thStyle}>Flutter</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间' : 'Startup Time', '~2.5s', '~1.2s'],
              [isZh ? '内存使用' : 'Memory Usage', '~120MB', '~60MB'],
              [isZh ? '帧率 (复杂UI)' : 'FPS (Complex UI)', '45-55 FPS', '60 FPS stable'],
              [isZh ? '动画性能' : 'Animation Performance', 'CSS/Web Animations', '60 FPS (native)'],
              [isZh ? '列表滚动' : 'List Scrolling', 'Variable 40-55 FPS', 'Smooth 60 FPS'],
              [isZh ? 'CPU使用率' : 'CPU Usage', 'Higher (WebView)', 'Lower (native)'],
            ].map(([metric, ionic, flutter], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{ionic}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{flutter}</td>
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
              <th style={thStyle}>Ionic</th>
              <th style={thStyle}>Flutter</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'UI组件' : 'UI Components', 'Ionic UI (web-based)', 'Material/Cupertino (native)'],
              [isZh ? '导航' : 'Navigation', '@ionic/angular, react-router', 'go_router, Navigator'],
              [isZh ? '状态管理' : 'State Management', 'RxJS, NgRx, Redux', 'Riverpod, Bloc, Provider'],
              [isZh ? '热重载' : 'Hot Reload', 'Browser reload', 'Stateful Hot Reload'],
              [isZh ? '原生插件' : 'Native Plugins', 'Capacitor plugins', 'pub.dev packages'],
              [isZh ? 'PWA支持' : 'PWA Support', 'Excellent', 'Limited'],
              [isZh ? 'Web支持' : 'Web Support', 'Native (same code)', 'Flutter Web (compiled)'],
              [isZh ? '桌面支持' : 'Desktop Support', 'Electron', 'Flutter Desktop'],
            ].map(([feature, ionic, flutter], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#3880ff' }}>{ionic}</td>
                <td style={{ ...tdStyle, color: '#02569b' }}>{flutter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3880ff' }}>{ct.ionicExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Ionic - Angular Component with Native Features
import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Ionic Example</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Native Features Demo</ion-card-title>
        </ion-card-header>
        
        <ion-card-content>
          <ion-button expand="block" (click)="takePhoto()">
            <ion-icon name="camera" slot="start"></ion-icon>
            Take Photo
          </ion-button>
          
          <ion-button expand="block" (click)="getLocation()">
            <ion-icon name="location" slot="start"></ion-icon>
            Get Location
          </ion-button>
          
          <div *ngIf="image">
            <ion-img [src]="image"></ion-img>
          </div>
          
          <p *ngIf="location">
            Lat: " + location?.coords.latitude.toFixed(4) + ", 
            Lon: " + location?.coords.longitude.toFixed(4)
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class HomePage {
  image: string | null = null;
  location: any = null;

  async takePhoto() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.image = photo.webPath;
  }

  async getLocation() {
    const perm = await Geolocation.requestPermissions();
    if (perm.location === 'granted') {
      this.location = await Geolocation.getCurrentPosition();
    }
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#02569b' }}>{ct.flutterExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Flutter - Dart with Native Features
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:io';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Example',
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  File? _image;
  Position? _position;

  Future<void> _takePhoto() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 90,
    );
    
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });
    }
  }

  Future<void> _getLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) return;

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }
    
    if (permission == LocationPermission.whileInUse || 
        permission == LocationPermission.always) {
      Position position = await Geolocator.getCurrentPosition();
      setState(() {
        _position = position;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter Example')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            ElevatedButton.icon(
              icon: Icon(Icons.camera),
              label: Text('Take Photo'),
              onPressed: _takePhoto,
            ),
            ElevatedButton.icon(
              icon: Icon(Icons.location_on),
              label: Text('Get Location'),
              onPressed: _getLocation,
            ),
            if (_image != null) 
              Image.file(_image!, height: 200),
            if (_position != null)
              Text('Lat: ' + _position!.latitude.toStringAsFixed(4) + 
                   ', Lon: ' + _position!.longitude.toStringAsFixed(4)),
          ],
        ),
      ),
    );
  }
}`}</code></pre>

      {/* Native Access */}
      <h2 style={h2Style}>{ct.nativeAccessTitle}</h2>
      <p style={pStyle}>{ct.nativeAccessIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Ionic (Capacitor)</th>
              <th style={thStyle}>Flutter</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '相机' : 'Camera', '@capacitor/camera', 'image_picker'],
              [isZh ? '地理位置' : 'Geolocation', '@capacitor/geolocation', 'geolocator'],
              [isZh ? '推送通知' : 'Push Notifications', '@capacitor/push-notifications', 'firebase_messaging'],
              [isZh ? '文件系统' : 'File System', '@capacitor/filesystem', 'path_provider'],
              [isZh ? '生物识别' : 'Biometrics', '@capacitor-community/biometry', 'local_auth'],
              [isZh ? '蓝牙' : 'Bluetooth', '@capacitor-community/bluetooth-le', 'flutter_blue'],
            ].map(([feature, ionic, flutter], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#3880ff' }}>{ionic}</td>
                <td style={{ ...tdStyle, color: '#02569b' }}>{flutter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Ionic</th>
              <th style={thStyle}>Flutter</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['iOS', 'Xcode + Capacitor', 'flutter build ios'],
              ['Android', 'Android Studio + Capacitor', 'flutter build apk'],
              ['Web', 'npm run build (native)', 'flutter build web'],
              ['PWA', 'Full support', 'Limited support'],
              [isZh ? '桌面' : 'Desktop', 'Electron wrapper', 'flutter build windows/macos/linux'],
              [isZh ? '应用商店' : 'App Stores', 'Standard submission', 'Standard submission'],
            ].map(([platform, ionic, flutter], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#3880ff' }}>{ionic}</td>
                <td style={{ ...tdStyle, color: '#02569b' }}>{flutter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3880ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3880ff' }}>{ct.ionicBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Web开发团队' : 'Web development teams'}</li>
            <li>{isZh ? '需要PWA支持' : 'PWA support needed'}</li>
            <li>{isZh ? 'Web-移动代码共享' : 'Web-mobile code sharing'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '简单业务应用' : 'Simple business apps'}</li>
            <li>{isZh ? '现有Web应用移动化' : 'Existing web apps going mobile'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #02569b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#02569b' }}>{ct.flutterBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '性能关键应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '复杂动画和自定义UI' : 'Complex animations & custom UI'}</li>
            <li>{isZh ? '像素级完美设计' : 'Pixel-perfect designs'}</li>
            <li>{isZh ? '多平台一致性' : 'Multi-platform consistency'}</li>
            <li>{isZh ? '新项目无Web需求' : 'New projects without web needs'}</li>
            <li>{isZh ? '游戏和高度交互应用' : 'Games & highly interactive apps'}</li>
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
