'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Mobile Development Guide: React Native, Flutter, Swift, Kotlin & Cross-Platform Strategies',
    intro: 'Building mobile apps in 2026 means choosing between <strong>native development</strong> (Swift/Kotlin) and <strong>cross-platform frameworks</strong> (React Native/Flutter). This comprehensive guide covers everything from fundamentals to production deployment, helping you make the right technology choice and build performant, maintainable mobile applications.',
    tldr: 'React Native and Flutter dominate cross-platform development, each with distinct strengths. React Native leverages JavaScript/TypeScript and native components, while Flutter uses Dart with a custom rendering engine for pixel-perfect consistency. For platform-specific features or maximum performance, native Swift (iOS) and Kotlin (Android) remain the gold standard. Choose based on team skills, performance requirements, and time-to-market constraints.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'React Native is ideal for teams with JavaScript expertise and apps requiring native look-and-feel per platform.',
    kt2: 'Flutter provides the most consistent cross-platform UI with a single codebase and excellent hot reload.',
    kt3: 'Swift/SwiftUI is the best choice for iOS-only apps needing deep Apple ecosystem integration.',
    kt4: 'Kotlin/Jetpack Compose is the modern Android standard with first-class Google support.',
    kt5: 'State management choice (Redux, MobX, Provider, Riverpod) significantly impacts app architecture and maintainability.',
    kt6: 'Mobile CI/CD with Fastlane, App Center, or CodePush reduces release friction and deployment errors.',
    kt7: 'Offline-first architecture and push notifications are essential for modern mobile user experience.',
    kt8: 'App Store Optimization (ASO) is as important as code quality for app success.',

    h2_1: '1. React Native Fundamentals',
    p_1: 'React Native lets you build mobile apps using <strong>JavaScript and React</strong>. It renders native components rather than webviews, providing near-native performance and platform-authentic UI. With the New Architecture (Fabric renderer and TurboModules), React Native closes the performance gap with native development significantly.',
    h3_1_1: 'JSX Components and Hooks',
    p_1_1: 'React Native uses the same component model as React web. Core components like <code>View</code>, <code>Text</code>, <code>ScrollView</code>, and <code>FlatList</code> map to native platform views. Hooks like <code>useState</code>, <code>useEffect</code>, and <code>useMemo</code> manage state and side effects.',
    h3_1_2: 'Navigation with React Navigation',
    p_1_2: 'React Navigation is the de facto routing library for React Native. It supports stack, tab, drawer, and modal navigation patterns with native-feeling transitions and gesture handling.',

    h2_2: '2. Flutter and Dart Basics',
    p_2: 'Flutter uses <strong>Dart</strong> and a custom rendering engine (Skia/Impeller) to draw every pixel on screen, giving you complete control over the UI. This approach ensures pixel-perfect consistency across iOS and Android while achieving 60/120fps performance.',
    h3_2_1: 'Widget Tree and Composition',
    p_2_1: 'Everything in Flutter is a widget. The framework uses a declarative UI model where you compose small, reusable widgets into complex layouts. Stateless widgets are pure functions of their configuration, while Stateful widgets manage mutable state.',
    h3_2_2: 'State Management with Riverpod',
    p_2_2: 'Riverpod is the recommended state management solution for Flutter, offering compile-safe providers, automatic disposal, and excellent testability. It replaces the older Provider package with a more robust API.',

    h2_3: '3. Swift and SwiftUI for iOS',
    p_3: 'Swift with SwiftUI is Apple\'s modern declarative framework for building iOS, macOS, watchOS, and tvOS apps. SwiftUI provides a <strong>reactive data-driven UI</strong> with automatic state management, live previews in Xcode, and deep integration with Apple platform features.',
    h3_3_1: 'SwiftUI Views and Modifiers',
    p_3_1: 'SwiftUI uses a modifier chain pattern where views are built by stacking modifiers. State properties marked with <code>@State</code>, <code>@Binding</code>, <code>@ObservedObject</code>, and <code>@EnvironmentObject</code> automatically trigger UI updates when changed.',
    h3_3_2: 'Combining SwiftUI with UIKit',
    p_3_2: 'You can embed UIKit views in SwiftUI using <code>UIViewRepresentable</code> and SwiftUI views in UIKit with <code>UIHostingController</code>. This enables gradual migration of existing apps.',

    h2_4: '4. Kotlin and Jetpack Compose for Android',
    p_4: 'Kotlin with Jetpack Compose is the <strong>modern Android UI toolkit</strong>, replacing XML layouts with a declarative Kotlin-based approach. Compose integrates seamlessly with the existing Android ecosystem, Kotlin coroutines, and Jetpack libraries.',
    h3_4_1: 'Composable Functions',
    p_4_1: 'In Jetpack Compose, UI elements are defined as composable functions annotated with <code>@Composable</code>. State is managed with <code>remember</code> and <code>mutableStateOf</code>, triggering automatic recomposition when values change.',
    h3_4_2: 'ViewModel and State Hoisting',
    p_4_2: 'Android\'s ViewModel survives configuration changes and pairs with Compose\'s state hoisting pattern. State is lifted to the ViewModel layer while the UI layer remains a pure function of that state.',

    h2_5: '5. Cross-Platform Framework Comparison',
    p_5: 'Choosing between React Native, Flutter, native iOS, and native Android depends on your team\'s skills, project requirements, budget, and timeline. Here is a detailed comparison across key dimensions.',
    compare_language: 'Language',
    compare_rendering: 'Rendering',
    compare_performance: 'Performance',
    compare_ui_consistency: 'UI Consistency',
    compare_hot_reload: 'Hot Reload',
    compare_ecosystem: 'Ecosystem',
    compare_learning_curve: 'Learning Curve',
    compare_code_sharing: 'Code Sharing',

    h2_6: '6. Performance Optimization',
    p_6: 'Mobile performance directly impacts user retention. Apps that take more than 3 seconds to load lose 53% of users. Here are battle-tested optimization techniques for each framework.',
    h3_6_1: 'Lazy Loading and Virtualized Lists',
    p_6_1: 'Never render all items at once. Use <code>FlatList</code> in React Native, <code>ListView.builder</code> in Flutter, <code>LazyVStack</code> in SwiftUI, or <code>LazyColumn</code> in Compose to render only visible items.',
    h3_6_2: 'Image Caching and Optimization',
    p_6_2: 'Images are the largest assets in most mobile apps. Use libraries like <code>react-native-fast-image</code>, <code>cached_network_image</code> (Flutter), Kingfisher (iOS), or Coil (Android) for efficient caching, progressive loading, and format optimization.',
    h3_6_3: 'Memory Management',
    p_6_3: 'Memory leaks are a common cause of mobile app crashes. Monitor memory usage with platform profilers, dispose of controllers and subscriptions properly, and avoid retaining large objects in global state.',

    h2_7: '7. State Management Patterns',
    p_7: 'State management is the most debated topic in mobile development. The right choice depends on app complexity, team experience, and scalability needs.',
    h3_7_1: 'React Native: Redux vs MobX vs Zustand',
    p_7_1: 'Redux offers predictable state with time-travel debugging but requires boilerplate. MobX provides reactive state with decorators. Zustand is a minimal, hook-based alternative that has gained significant popularity for its simplicity.',
    h3_7_2: 'Flutter: Provider vs Riverpod vs BLoC',
    p_7_2: 'Provider is simple but lacks compile-time safety. Riverpod fixes Provider\'s limitations with global providers and auto-dispose. BLoC (Business Logic Component) uses streams for maximum separation of concerns.',

    h2_8: '8. Mobile Testing Strategies',
    p_8: 'A robust testing strategy combines <strong>unit tests, widget/component tests, integration tests, and end-to-end tests</strong>. Each layer catches different categories of bugs and has different speed/reliability tradeoffs.',
    h3_8_1: 'Unit and Component Testing',
    p_8_1: 'Use Jest for React Native, flutter_test for Flutter, XCTest for Swift, and JUnit/MockK for Kotlin. Aim for 80%+ code coverage on business logic and state management layers.',
    h3_8_2: 'E2E Testing with Detox and Maestro',
    p_8_2: 'Detox runs on real devices with gray-box testing for React Native. Maestro offers a YAML-based declarative approach that works across all frameworks. Both are more reliable than Appium for mobile-specific testing.',

    h2_9: '9. CI/CD for Mobile Apps',
    p_9: 'Mobile CI/CD is more complex than web deployment because of code signing, provisioning profiles, app store review processes, and multiple build targets. Automation is essential for sustainable release cadence.',
    h3_9_1: 'Fastlane for Automated Builds',
    p_9_1: 'Fastlane automates screenshots, beta deployment, code signing, and App Store/Play Store submission. It handles the most painful parts of mobile release management with a Ruby-based DSL.',
    h3_9_2: 'Over-the-Air Updates with CodePush',
    p_9_2: 'CodePush (now part of App Center) enables JavaScript bundle updates without going through app store review. This allows you to ship bug fixes and minor features instantly. Note that native code changes still require a full app store release.',

    h2_10: '10. Push Notifications',
    p_10: 'Push notifications drive <strong>3-10x higher engagement</strong> when implemented thoughtfully. Poor implementation leads to uninstalls. The key is relevance, timing, and user control.',
    h3_10_1: 'Platform Setup',
    p_10_1: 'iOS uses APNs (Apple Push Notification service) and Android uses FCM (Firebase Cloud Messaging). Both require server-side infrastructure. Services like Firebase, OneSignal, or AWS SNS abstract the platform differences.',
    h3_10_2: 'Notification Channels and Categories',
    p_10_2: 'Android 8+ requires notification channels for categorization. iOS supports notification categories with custom actions. Both platforms allow users to control which notification types they receive.',

    h2_11: '11. Offline-First Architecture',
    p_11: 'Mobile apps must work reliably on flaky networks. An offline-first approach stores data locally and syncs when connectivity is available, providing a seamless user experience regardless of network conditions.',
    h3_11_1: 'Local Storage Options',
    p_11_1: 'SQLite (via Drift, Room, or Core Data) handles structured relational data. Key-value stores like MMKV, Hive, or UserDefaults are faster for simple preferences. For complex sync scenarios, consider CRDTs or operational transforms.',
    h3_11_2: 'Sync Strategies',
    p_11_2: 'Implement conflict resolution policies (last-write-wins, merge, or manual). Use background sync with exponential backoff. Queue mutations locally and replay them when online. Provide clear UI indicators for sync status.',

    h2_12: '12. Deep Linking and App Store Optimization',
    p_12: 'Deep linking connects web URLs to specific app screens, improving user acquisition and retention. ASO ensures your app is discoverable in crowded app stores.',
    h3_12_1: 'Universal Links and App Links',
    p_12_1: 'iOS Universal Links and Android App Links use HTTPS URLs that open directly in your app. Configure the <code>apple-app-site-association</code> file (iOS) and <code>assetlinks.json</code> (Android) on your domain to enable verified deep linking.',
    h3_12_2: 'App Store Optimization Essentials',
    p_12_2: 'ASO factors include app title (30 chars max), subtitle, keywords, screenshots, preview video, ratings, and download velocity. A/B test your store listing regularly. Localize metadata for each target market.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Should I choose React Native or Flutter for a new project in 2026?',
    faq1_a: 'If your team has JavaScript/React experience, React Native offers a smoother onboarding and access to the massive npm ecosystem. If you prioritize pixel-perfect UI consistency across platforms and are open to learning Dart, Flutter provides better rendering control and a more unified development experience. Both are production-ready for most use cases.',
    faq2_q: 'Is native development still worth it over cross-platform?',
    faq2_a: 'Yes, for apps requiring maximum performance (games, AR/VR, complex animations), deep platform integration (HealthKit, ARKit, Wear OS), or when you have dedicated iOS and Android teams. For business apps, MVPs, and startups with limited resources, cross-platform frameworks provide 90-95% of native performance with significantly faster development.',
    faq3_q: 'How do I handle state management in a large mobile app?',
    faq3_a: 'Use a layered architecture: local UI state stays in components, shared feature state in feature-level stores, and global app state (auth, settings) in a root store. For React Native, Zustand or Redux Toolkit are recommended. For Flutter, Riverpod with code generation provides the best developer experience. Avoid putting all state in a single global store.',
    faq4_q: 'What is the best testing strategy for mobile apps?',
    faq4_a: 'Follow the testing pyramid: many unit tests (fast, cheap), moderate integration tests, and few E2E tests (slow, expensive). Unit test business logic and state management exhaustively. Use component/widget tests for UI logic. Reserve E2E tests (Detox, Maestro) for critical user flows. Aim for 80% unit test coverage and full E2E coverage of revenue-critical paths.',
    faq5_q: 'How do I optimize mobile app startup time?',
    faq5_a: 'Minimize the initial bundle size with code splitting and lazy imports. Defer non-critical initialization. Use splash screens strategically to mask loading. Optimize image assets and reduce network calls during launch. For React Native, enable Hermes engine. For Flutter, use deferred components. Profile startup with platform-specific tools (Xcode Instruments, Android Profiler).',
    faq6_q: 'Should I use CodePush or full app store releases?',
    faq6_a: 'Use CodePush for JavaScript/Dart-level bug fixes and minor UI changes that need immediate deployment. Use full app store releases for native code changes, major features, and version bumps. CodePush updates should not change app behavior significantly, as Apple and Google may reject apps that bypass their review process for substantial changes.',
    faq7_q: 'How do I implement offline-first architecture?',
    faq7_a: 'Start with a local database (SQLite, Realm, or Hive) as the single source of truth. Queue all mutations locally first, then sync in the background. Implement conflict resolution (last-write-wins for simple cases, CRDTs for collaborative data). Show clear sync status indicators. Test extensively with network throttling and airplane mode.',
    faq8_q: 'What are the key metrics for mobile app performance?',
    faq8_a: 'Track app startup time (cold start under 2 seconds), frame rate (maintain 60fps, 120fps on ProMotion devices), memory usage (stay under 200MB for most apps), network efficiency (minimize redundant requests), battery impact, and crash rate (target under 0.1%). Use Firebase Performance, Sentry, or platform profilers to monitor these in production.',

    p_conclusion: 'Mobile development in 2026 offers more choices and better tooling than ever. Whether you choose cross-platform efficiency or native performance, the fundamentals of good architecture, thorough testing, and user-centric design remain the same. Start with the framework that matches your team\'s skills, then optimize based on real-world performance data.',
    link_tool: 'Validate your mobile API responses with our JSON Formatter \u2192',
    link_tool_bottom: 'Try the JSON Formatter \u2192',
    link_tool_bottom2: 'Explore all developer tools \u2192',
  },
  zh: {
    title: '移动开发指南：React Native、Flutter、Swift、Kotlin 与跨平台策略',
    intro: '2026 年构建移动应用意味着在<strong>原生开发</strong>（Swift/Kotlin）和<strong>跨平台框架</strong>（React Native/Flutter）之间做出选择。本指南涵盖从基础到生产部署的方方面面，帮助你做出正确的技术选择并构建高性能、可维护的移动应用。',
    tldr: 'React Native 和 Flutter 主导跨平台开发，各有优势。React Native 利用 JavaScript/TypeScript 和原生组件，Flutter 使用 Dart 和自定义渲染引擎实现像素级一致性。对于平台特定功能或极致性能，原生 Swift（iOS）和 Kotlin（Android）仍是黄金标准。根据团队技能、性能需求和上市时间约束做选择。',
    keyTakeaways: '核心要点',
    kt1: 'React Native 适合有 JavaScript 经验的团队和需要每个平台原生外观的应用。',
    kt2: 'Flutter 提供最一致的跨平台 UI，单一代码库和优秀的热重载。',
    kt3: 'Swift/SwiftUI 是仅 iOS 应用和深度 Apple 生态集成的最佳选择。',
    kt4: 'Kotlin/Jetpack Compose 是现代 Android 标准，拥有一流的 Google 支持。',
    kt5: '状态管理选择（Redux、MobX、Provider、Riverpod）显著影响应用架构和可维护性。',
    kt6: '使用 Fastlane、App Center 或 CodePush 的移动 CI/CD 减少发布摩擦和部署错误。',
    kt7: '离线优先架构和推送通知对现代移动用户体验至关重要。',
    kt8: '应用商店优化（ASO）与代码质量同样重要。',

    h2_1: '1. React Native 基础',
    p_1: 'React Native 让你使用 <strong>JavaScript 和 React</strong> 构建移动应用。它渲染原生组件而非 WebView，提供接近原生的性能和平台真实感的 UI。',
    h3_1_1: 'JSX 组件和 Hooks',
    p_1_1: 'React Native 使用与 React Web 相同的组件模型。核心组件如 <code>View</code>、<code>Text</code>、<code>ScrollView</code> 和 <code>FlatList</code> 映射到原生平台视图。',
    h3_1_2: '使用 React Navigation 导航',
    p_1_2: 'React Navigation 是 React Native 的事实标准路由库，支持栈、标签、抽屉和模态导航模式。',

    h2_2: '2. Flutter 和 Dart 基础',
    p_2: 'Flutter 使用 <strong>Dart</strong> 和自定义渲染引擎在屏幕上绘制每个像素，让你完全控制 UI。',
    h3_2_1: 'Widget 树和组合',
    p_2_1: 'Flutter 中一切皆 Widget。框架使用声明式 UI 模型，将小的可复用 Widget 组合成复杂布局。',
    h3_2_2: '使用 Riverpod 管理状态',
    p_2_2: 'Riverpod 是 Flutter 推荐的状态管理方案，提供编译安全的 Provider、自动销毁和出色的可测试性。',

    h2_3: '3. Swift 和 SwiftUI (iOS)',
    p_3: 'Swift 与 SwiftUI 是 Apple 的现代声明式框架，用于构建 iOS、macOS、watchOS 和 tvOS 应用。',
    h3_3_1: 'SwiftUI 视图和修饰符',
    p_3_1: 'SwiftUI 使用修饰符链模式构建视图。使用 <code>@State</code>、<code>@Binding</code>、<code>@ObservedObject</code> 标记状态属性以自动触发 UI 更新。',
    h3_3_2: 'SwiftUI 与 UIKit 混合使用',
    p_3_2: '可以使用 <code>UIViewRepresentable</code> 在 SwiftUI 中嵌入 UIKit 视图，实现渐进式迁移。',

    h2_4: '4. Kotlin 和 Jetpack Compose (Android)',
    p_4: 'Kotlin 与 Jetpack Compose 是<strong>现代 Android UI 工具包</strong>，用声明式 Kotlin 方式替代 XML 布局。',
    h3_4_1: '可组合函数',
    p_4_1: '在 Jetpack Compose 中，UI 元素定义为带 <code>@Composable</code> 注解的函数。状态使用 <code>remember</code> 和 <code>mutableStateOf</code> 管理。',
    h3_4_2: 'ViewModel 和状态提升',
    p_4_2: 'Android 的 ViewModel 能在配置变更中存活，与 Compose 的状态提升模式配合使用。',

    h2_5: '5. 跨平台框架对比',
    p_5: '选择 React Native、Flutter、原生 iOS 还是原生 Android 取决于团队技能、项目需求、预算和时间线。',
    compare_language: '编程语言',
    compare_rendering: '渲染方式',
    compare_performance: '性能',
    compare_ui_consistency: 'UI 一致性',
    compare_hot_reload: '热重载',
    compare_ecosystem: '生态系统',
    compare_learning_curve: '学习曲线',
    compare_code_sharing: '代码共享',

    h2_6: '6. 性能优化',
    p_6: '移动性能直接影响用户留存。加载超过 3 秒的应用会流失 53% 的用户。以下是经过实战验证的优化技术。',
    h3_6_1: '懒加载和虚拟化列表',
    p_6_1: '永远不要一次渲染所有项目。使用 React Native 的 <code>FlatList</code>、Flutter 的 <code>ListView.builder</code>、SwiftUI 的 <code>LazyVStack</code> 或 Compose 的 <code>LazyColumn</code>。',
    h3_6_2: '图片缓存和优化',
    p_6_2: '图片是大多数移动应用最大的资源。使用 react-native-fast-image、cached_network_image、Kingfisher 或 Coil 进行高效缓存。',
    h3_6_3: '内存管理',
    p_6_3: '内存泄漏是移动应用崩溃的常见原因。使用平台分析器监控内存使用，正确销毁控制器和订阅。',

    h2_7: '7. 状态管理模式',
    p_7: '状态管理是移动开发中讨论最多的话题。正确选择取决于应用复杂度、团队经验和可扩展性需求。',
    h3_7_1: 'React Native: Redux vs MobX vs Zustand',
    p_7_1: 'Redux 提供可预测的状态和时间旅行调试但需要样板代码。MobX 提供响应式状态。Zustand 是极简的 Hook 替代方案。',
    h3_7_2: 'Flutter: Provider vs Riverpod vs BLoC',
    p_7_2: 'Provider 简单但缺乏编译时安全性。Riverpod 修复了 Provider 的限制。BLoC 使用流实现最大的关注点分离。',

    h2_8: '8. 移动测试策略',
    p_8: '健壮的测试策略结合<strong>单元测试、组件测试、集成测试和端到端测试</strong>。每层捕获不同类别的 bug。',
    h3_8_1: '单元测试和组件测试',
    p_8_1: '使用 Jest（React Native）、flutter_test（Flutter）、XCTest（Swift）和 JUnit/MockK（Kotlin）。目标是业务逻辑 80%+ 覆盖率。',
    h3_8_2: '使用 Detox 和 Maestro 进行 E2E 测试',
    p_8_2: 'Detox 在真实设备上运行灰盒测试。Maestro 提供基于 YAML 的声明式方法，跨所有框架工作。',

    h2_9: '9. 移动应用 CI/CD',
    p_9: '移动 CI/CD 比 Web 部署更复杂，涉及代码签名、配置文件、应用商店审核和多构建目标。',
    h3_9_1: '使用 Fastlane 自动化构建',
    p_9_1: 'Fastlane 自动化截图、Beta 部署、代码签名和应用商店提交。',
    h3_9_2: '使用 CodePush 进行 OTA 更新',
    p_9_2: 'CodePush 支持无需通过应用商店审核即可更新 JavaScript 包，实现即时修复 bug。',

    h2_10: '10. 推送通知',
    p_10: '合理实施推送通知可提升 <strong>3-10 倍用户参与度</strong>。关键是相关性、时机和用户控制。',
    h3_10_1: '平台配置',
    p_10_1: 'iOS 使用 APNs，Android 使用 FCM。Firebase、OneSignal 或 AWS SNS 可抽象平台差异。',
    h3_10_2: '通知频道和类别',
    p_10_2: 'Android 8+ 需要通知频道进行分类。iOS 支持带自定义操作的通知类别。',

    h2_11: '11. 离线优先架构',
    p_11: '移动应用必须在不稳定网络下可靠运行。离线优先方式在本地存储数据，在有连接时同步。',
    h3_11_1: '本地存储选项',
    p_11_1: 'SQLite（通过 Drift、Room 或 Core Data）处理结构化数据。MMKV、Hive 或 UserDefaults 处理简单偏好。',
    h3_11_2: '同步策略',
    p_11_2: '实现冲突解决策略（最后写入优先、合并或手动）。使用带指数退避的后台同步。',

    h2_12: '12. 深度链接和应用商店优化',
    p_12: '深度链接将 Web URL 连接到特定应用页面。ASO 确保应用在拥挤的应用商店中可被发现。',
    h3_12_1: 'Universal Links 和 App Links',
    p_12_1: 'iOS Universal Links 和 Android App Links 使用 HTTPS URL 直接在应用中打开。',
    h3_12_2: '应用商店优化要点',
    p_12_2: 'ASO 因素包括应用标题、副标题、关键词、截图、预览视频、评分和下载速度。',

    h2_faq: '常见问题',
    faq1_q: '2026 年新项目应选择 React Native 还是 Flutter？',
    faq1_a: '如果团队有 JavaScript/React 经验，React Native 上手更快且可访问庞大的 npm 生态。如果优先考虑跨平台 UI 一致性且愿意学 Dart，Flutter 提供更好的渲染控制。',
    faq2_q: '原生开发还值得选择吗？',
    faq2_a: '对于需要最大性能（游戏、AR/VR）、深度平台集成或有专门团队的场景，原生仍是最佳选择。对于商业应用和 MVP，跨平台能提供 90-95% 的原生性能。',
    faq3_q: '大型移动应用如何处理状态管理？',
    faq3_a: '使用分层架构：本地 UI 状态在组件中，共享功能状态在功能级 Store，全局状态在根 Store。',
    faq4_q: '移动应用最佳测试策略是什么？',
    faq4_a: '遵循测试金字塔：大量单元测试、适量集成测试、少量 E2E 测试。目标 80% 单元测试覆盖率。',
    faq5_q: '如何优化移动应用启动时间？',
    faq5_a: '通过代码分割和懒加载最小化初始包大小。延迟非关键初始化。React Native 启用 Hermes 引擎，Flutter 使用延迟组件。',
    faq6_q: '应该用 CodePush 还是完整的应用商店发布？',
    faq6_a: 'CodePush 用于 JavaScript 级 bug 修复和小 UI 更改。原生代码更改和主要功能需要完整的应用商店发布。',
    faq7_q: '如何实现离线优先架构？',
    faq7_a: '以本地数据库为单一真相来源。本地排队所有变更，后台同步。实现冲突解决策略。',
    faq8_q: '移动应用性能的关键指标是什么？',
    faq8_a: '跟踪启动时间（冷启动 2 秒内）、帧率（60fps）、内存使用（200MB 内）、崩溃率（0.1% 以下）。',

    p_conclusion: '2026 年的移动开发提供了比以往更多的选择和更好的工具。无论选择跨平台效率还是原生性能，良好架构、全面测试和以用户为中心的设计基本原则保持不变。',
    link_tool: '使用我们的 JSON 格式化工具验证移动 API 响应 \u2192',
    link_tool_bottom: '试试 JSON 格式化工具 \u2192',
    link_tool_bottom2: '探索所有开发者工具 \u2192',
  },
};

// ─── Inline Styles ───────────────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  borderLeft: '4px solid #0ea5e9',
  padding: '16px 20px',
  marginBottom: 24,
  borderRadius: 4,
  fontSize: 15,
  lineHeight: 1.7,
};

const keyTakeawaysBoxStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '16px 20px',
  marginBottom: 28,
  borderRadius: 6,
};

const ktItemStyle: React.CSSProperties = {
  marginBottom: 6,
  lineHeight: 1.6,
  fontSize: 14,
};

const preStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '16px 20px',
  borderRadius: 8,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.6,
  marginBottom: 20,
};

const codeInlineStyle: React.CSSProperties = {
  background: '#f1f5f9',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 13,
  fontFamily: 'monospace',
};

const tableWrapStyle: React.CSSProperties = {
  overflowX: 'auto',
  marginBottom: 20,
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  textAlign: 'left',
  borderBottom: '2px solid #334155',
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid #e2e8f0',
};

const faqContainerStyle: React.CSSProperties = {
  marginTop: 32,
  marginBottom: 32,
};

const faqItemStyle: React.CSSProperties = {
  marginBottom: 20,
  padding: '12px 16px',
  background: '#f8fafc',
  borderRadius: 6,
  border: '1px solid #e2e8f0',
};

const faqQuestionStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 15,
  marginBottom: 6,
  color: '#0f172a',
};

const faqAnswerStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  color: '#475569',
};

const linkStyle: React.CSSProperties = {
  color: '#0ea5e9',
  textDecoration: 'underline',
  fontWeight: 500,
};

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 36,
  marginBottom: 12,
  color: '#0f172a',
};

const h3Style: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  marginTop: 24,
  marginBottom: 8,
  color: '#1e293b',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  marginBottom: 14,
  color: '#334155',
};

const conclusionBoxStyle: React.CSSProperties = {
  background: '#f0fdf4',
  borderLeft: '4px solid #22c55e',
  padding: '16px 20px',
  marginTop: 28,
  marginBottom: 20,
  borderRadius: 4,
  fontSize: 15,
  lineHeight: 1.7,
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function MobileDevelopmentGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
      { '@type': 'Question', name: t.faq7_q, acceptedAnswer: { '@type': 'Answer', text: t.faq7_a } },
      { '@type': 'Question', name: t.faq8_q, acceptedAnswer: { '@type': 'Answer', text: t.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ==================== INTRO ==================== */}
      <div style={sectionStyle}>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.intro }} />
        <a href="/en/tools/json-formatter" style={linkStyle}>{t.link_tool}</a>
      </div>

      {/* ==================== TL;DR ==================== */}
      <div style={tldrBoxStyle}>
        <strong>TL;DR: </strong>{t.tldr}
      </div>

      {/* ==================== KEY TAKEAWAYS ==================== */}
      <div style={keyTakeawaysBoxStyle}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>{t.keyTakeaways}</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={ktItemStyle}>{t.kt1}</li>
          <li style={ktItemStyle}>{t.kt2}</li>
          <li style={ktItemStyle}>{t.kt3}</li>
          <li style={ktItemStyle}>{t.kt4}</li>
          <li style={ktItemStyle}>{t.kt5}</li>
          <li style={ktItemStyle}>{t.kt6}</li>
          <li style={ktItemStyle}>{t.kt7}</li>
          <li style={ktItemStyle}>{t.kt8}</li>
        </ul>
      </div>

      {/* ==================== 1. REACT NATIVE FUNDAMENTALS ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_1}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_1 }} />

        <h3 style={h3Style}>{t.h3_1_1}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_1_1 }} />
        <pre style={preStyle}><code>
          {'import React, { useState, useEffect } from \'react\';\n' +
           'import { View, Text, FlatList, TouchableOpacity, StyleSheet } from \'react-native\';\n\n' +
           'interface User {\n' +
           '  id: string;\n' +
           '  name: string;\n' +
           '  email: string;\n' +
           '}\n\n' +
           'export default function UserList() {\n' +
           '  const [users, setUsers] = useState<User[]>([]);\n' +
           '  const [loading, setLoading] = useState(true);\n\n' +
           '  useEffect(() => {\n' +
           '    fetch(\'https://api.example.com/users\')\n' +
           '      .then(res => res.json())\n' +
           '      .then(data => {\n' +
           '        setUsers(data);\n' +
           '        setLoading(false);\n' +
           '      });\n' +
           '  }, []);\n\n' +
           '  const renderItem = ({ item }: { item: User }) => (\n' +
           '    <TouchableOpacity style={styles.card}>\n' +
           '      <Text style={styles.name}>{item.name}</Text>\n' +
           '      <Text style={styles.email}>{item.email}</Text>\n' +
           '    </TouchableOpacity>\n' +
           '  );\n\n' +
           '  return (\n' +
           '    <FlatList\n' +
           '      data={users}\n' +
           '      renderItem={renderItem}\n' +
           '      keyExtractor={item => item.id}\n' +
           '      refreshing={loading}\n' +
           '      onRefresh={() => setLoading(true)}\n' +
           '    />\n' +
           '  );\n' +
           '}'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_1_2}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_1_2 }} />
        <pre style={preStyle}><code>
          {'import { NavigationContainer } from \'@react-navigation/native\';\n' +
           'import { createNativeStackNavigator } from \'@react-navigation/native-stack\';\n' +
           'import { createBottomTabNavigator } from \'@react-navigation/bottom-tabs\';\n\n' +
           'type RootStackParamList = {\n' +
           '  Home: undefined;\n' +
           '  Profile: { userId: string };\n' +
           '  Settings: undefined;\n' +
           '};\n\n' +
           'const Stack = createNativeStackNavigator<RootStackParamList>();\n' +
           'const Tab = createBottomTabNavigator();\n\n' +
           'function HomeTabs() {\n' +
           '  return (\n' +
           '    <Tab.Navigator screenOptions={{ headerShown: false }}>\n' +
           '      <Tab.Screen name="Feed" component={FeedScreen} />\n' +
           '      <Tab.Screen name="Search" component={SearchScreen} />\n' +
           '      <Tab.Screen name="Profile" component={ProfileScreen} />\n' +
           '    </Tab.Navigator>\n' +
           '  );\n' +
           '}\n\n' +
           'export default function App() {\n' +
           '  return (\n' +
           '    <NavigationContainer>\n' +
           '      <Stack.Navigator>\n' +
           '        <Stack.Screen name="Home" component={HomeTabs} />\n' +
           '        <Stack.Screen name="Profile" component={ProfileDetail} />\n' +
           '        <Stack.Screen name="Settings" component={SettingsScreen} />\n' +
           '      </Stack.Navigator>\n' +
           '    </NavigationContainer>\n' +
           '  );\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 2. FLUTTER AND DART ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_2}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_2 }} />

        <h3 style={h3Style}>{t.h3_2_1}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_2_1 }} />
        <pre style={preStyle}><code>
          {'import \'package:flutter/material.dart\';\n\n' +
           'class UserListScreen extends StatefulWidget {\n' +
           '  const UserListScreen({super.key});\n\n' +
           '  @override\n' +
           '  State<UserListScreen> createState() => _UserListScreenState();\n' +
           '}\n\n' +
           'class _UserListScreenState extends State<UserListScreen> {\n' +
           '  List<User> _users = [];\n' +
           '  bool _loading = true;\n\n' +
           '  @override\n' +
           '  void initState() {\n' +
           '    super.initState();\n' +
           '    _fetchUsers();\n' +
           '  }\n\n' +
           '  Future<void> _fetchUsers() async {\n' +
           '    final response = await http.get(\n' +
           '      Uri.parse(\'https://api.example.com/users\'),\n' +
           '    );\n' +
           '    setState(() {\n' +
           '      _users = User.fromJsonList(jsonDecode(response.body));\n' +
           '      _loading = false;\n' +
           '    });\n' +
           '  }\n\n' +
           '  @override\n' +
           '  Widget build(BuildContext context) {\n' +
           '    if (_loading) return const Center(child: CircularProgressIndicator());\n' +
           '    return ListView.builder(\n' +
           '      itemCount: _users.length,\n' +
           '      itemBuilder: (context, index) => UserCard(user: _users[index]),\n' +
           '    );\n' +
           '  }\n' +
           '}'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_2_2}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_2_2 }} />
        <pre style={preStyle}><code>
          {'import \'package:flutter_riverpod/flutter_riverpod.dart\';\n\n' +
           '// Define a provider\n' +
           'final usersProvider = FutureProvider<List<User>>((ref) async {\n' +
           '  final repository = ref.watch(userRepositoryProvider);\n' +
           '  return repository.fetchUsers();\n' +
           '});\n\n' +
           '// Consume in a widget\n' +
           'class UserListScreen extends ConsumerWidget {\n' +
           '  const UserListScreen({super.key});\n\n' +
           '  @override\n' +
           '  Widget build(BuildContext context, WidgetRef ref) {\n' +
           '    final usersAsync = ref.watch(usersProvider);\n\n' +
           '    return usersAsync.when(\n' +
           '      data: (users) => ListView.builder(\n' +
           '        itemCount: users.length,\n' +
           '        itemBuilder: (_, i) => UserCard(user: users[i]),\n' +
           '      ),\n' +
           '      loading: () => const Center(child: CircularProgressIndicator()),\n' +
           '      error: (err, stack) => Center(child: Text(\'Error: \\$err\')),\n' +
           '    );\n' +
           '  }\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 3. SWIFT / SWIFTUI ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_3}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_3 }} />

        <h3 style={h3Style}>{t.h3_3_1}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_3_1 }} />
        <pre style={preStyle}><code>
          {'import SwiftUI\n\n' +
           'struct UserListView: View {\n' +
           '    @StateObject private var viewModel = UserViewModel()\n' +
           '    @State private var searchText = ""\n\n' +
           '    var filteredUsers: [User] {\n' +
           '        if searchText.isEmpty { return viewModel.users }\n' +
           '        return viewModel.users.filter {\n' +
           '            $0.name.localizedCaseInsensitiveContains(searchText)\n' +
           '        }\n' +
           '    }\n\n' +
           '    var body: some View {\n' +
           '        NavigationStack {\n' +
           '            List(filteredUsers) { user in\n' +
           '                NavigationLink(value: user) {\n' +
           '                    UserRow(user: user)\n' +
           '                }\n' +
           '            }\n' +
           '            .navigationTitle("Users")\n' +
           '            .searchable(text: $searchText)\n' +
           '            .refreshable { await viewModel.fetchUsers() }\n' +
           '            .navigationDestination(for: User.self) { user in\n' +
           '                UserDetailView(user: user)\n' +
           '            }\n' +
           '        }\n' +
           '    }\n' +
           '}\n\n' +
           '@Observable\n' +
           'class UserViewModel {\n' +
           '    var users: [User] = []\n' +
           '    var isLoading = false\n\n' +
           '    func fetchUsers() async {\n' +
           '        isLoading = true\n' +
           '        defer { isLoading = false }\n' +
           '        let (data, _) = try await URLSession.shared.data(\n' +
           '            from: URL(string: "https://api.example.com/users")!\n' +
           '        )\n' +
           '        users = try JSONDecoder().decode([User].self, from: data)\n' +
           '    }\n' +
           '}'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_3_2}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_3_2 }} />
        <pre style={preStyle}><code>
          {'// Embedding UIKit in SwiftUI\n' +
           'struct MapView: UIViewRepresentable {\n' +
           '    @Binding var region: MKCoordinateRegion\n\n' +
           '    func makeUIView(context: Context) -> MKMapView {\n' +
           '        let mapView = MKMapView()\n' +
           '        mapView.delegate = context.coordinator\n' +
           '        return mapView\n' +
           '    }\n\n' +
           '    func updateUIView(_ mapView: MKMapView, context: Context) {\n' +
           '        mapView.setRegion(region, animated: true)\n' +
           '    }\n\n' +
           '    func makeCoordinator() -> Coordinator {\n' +
           '        Coordinator(self)\n' +
           '    }\n' +
           '}\n\n' +
           '// Embedding SwiftUI in UIKit\n' +
           'let hostingController = UIHostingController(\n' +
           '    rootView: UserListView()\n' +
           ')\n' +
           'navigationController?.pushViewController(\n' +
           '    hostingController, animated: true\n' +
           ')'}
        </code></pre>
      </div>

      {/* ==================== 4. KOTLIN / JETPACK COMPOSE ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_4}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_4 }} />

        <h3 style={h3Style}>{t.h3_4_1}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_4_1 }} />
        <pre style={preStyle}><code>
          {'@Composable\n' +
           'fun UserListScreen(\n' +
           '    viewModel: UserViewModel = hiltViewModel()\n' +
           ') {\n' +
           '    val uiState by viewModel.uiState.collectAsStateWithLifecycle()\n\n' +
           '    when (val state = uiState) {\n' +
           '        is UiState.Loading -> {\n' +
           '            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {\n' +
           '                CircularProgressIndicator()\n' +
           '            }\n' +
           '        }\n' +
           '        is UiState.Success -> {\n' +
           '            LazyColumn(\n' +
           '                contentPadding = PaddingValues(16.dp),\n' +
           '                verticalArrangement = Arrangement.spacedBy(8.dp)\n' +
           '            ) {\n' +
           '                items(state.users, key = { it.id }) { user ->\n' +
           '                    UserCard(\n' +
           '                        user = user,\n' +
           '                        onClick = { viewModel.onUserClicked(user.id) }\n' +
           '                    )\n' +
           '                }\n' +
           '            }\n' +
           '        }\n' +
           '        is UiState.Error -> {\n' +
           '            ErrorScreen(\n' +
           '                message = state.message,\n' +
           '                onRetry = { viewModel.retry() }\n' +
           '            )\n' +
           '        }\n' +
           '    }\n' +
           '}'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_4_2}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_4_2 }} />
        <pre style={preStyle}><code>
          {'@HiltViewModel\n' +
           'class UserViewModel @Inject constructor(\n' +
           '    private val repository: UserRepository\n' +
           ') : ViewModel() {\n\n' +
           '    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)\n' +
           '    val uiState: StateFlow<UiState> = _uiState.asStateFlow()\n\n' +
           '    init { loadUsers() }\n\n' +
           '    private fun loadUsers() {\n' +
           '        viewModelScope.launch {\n' +
           '            _uiState.value = UiState.Loading\n' +
           '            repository.getUsers()\n' +
           '                .onSuccess { users ->\n' +
           '                    _uiState.value = UiState.Success(users)\n' +
           '                }\n' +
           '                .onFailure { error ->\n' +
           '                    _uiState.value = UiState.Error(error.message ?: "Unknown")\n' +
           '                }\n' +
           '        }\n' +
           '    }\n\n' +
           '    fun retry() = loadUsers()\n' +
           '}\n\n' +
           'sealed interface UiState {\n' +
           '    data object Loading : UiState\n' +
           '    data class Success(val users: List<User>) : UiState\n' +
           '    data class Error(val message: String) : UiState\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 5. CROSS-PLATFORM COMPARISON ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_5}</h2>
        <p style={paragraphStyle}>{t.p_5}</p>

        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Dimension</th>
                <th style={thStyle}>React Native</th>
                <th style={thStyle}>Flutter</th>
                <th style={thStyle}>Swift/SwiftUI</th>
                <th style={thStyle}>Kotlin/Compose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_language}</td>
                <td style={tdStyle}>JavaScript / TypeScript</td>
                <td style={tdStyle}>Dart</td>
                <td style={tdStyle}>Swift</td>
                <td style={tdStyle}>Kotlin</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_rendering}</td>
                <td style={tdStyle}>Native components via bridge</td>
                <td style={tdStyle}>Custom engine (Skia/Impeller)</td>
                <td style={tdStyle}>Native UIKit/SwiftUI</td>
                <td style={tdStyle}>Native Android Views</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_performance}</td>
                <td style={tdStyle}>Near-native (Hermes)</td>
                <td style={tdStyle}>Near-native (AOT compiled)</td>
                <td style={tdStyle}>Best (native)</td>
                <td style={tdStyle}>Best (native)</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_ui_consistency}</td>
                <td style={tdStyle}>Platform-specific look</td>
                <td style={tdStyle}>Pixel-perfect cross-platform</td>
                <td style={tdStyle}>iOS only</td>
                <td style={tdStyle}>Android only</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_hot_reload}</td>
                <td style={tdStyle}>Fast Refresh</td>
                <td style={tdStyle}>Hot Reload (stateful)</td>
                <td style={tdStyle}>Xcode Previews</td>
                <td style={tdStyle}>Live Edit (limited)</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_ecosystem}</td>
                <td style={tdStyle}>npm (massive)</td>
                <td style={tdStyle}>pub.dev (growing fast)</td>
                <td style={tdStyle}>CocoaPods / SPM</td>
                <td style={tdStyle}>Maven / Gradle</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_learning_curve}</td>
                <td style={tdStyle}>Low (if you know React)</td>
                <td style={tdStyle}>Medium (new language)</td>
                <td style={tdStyle}>Medium-High</td>
                <td style={tdStyle}>Medium</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{t.compare_code_sharing}</td>
                <td style={tdStyle}>iOS + Android + Web</td>
                <td style={tdStyle}>iOS + Android + Web + Desktop</td>
                <td style={tdStyle}>Apple platforms only</td>
                <td style={tdStyle}>Android + KMP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== 6. PERFORMANCE OPTIMIZATION ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_6}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_6 }} />

        <h3 style={h3Style}>{t.h3_6_1}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_6_1 }} />
        <pre style={preStyle}><code>
          {'// React Native — Optimized FlatList\n' +
           '<FlatList\n' +
           '  data={items}\n' +
           '  renderItem={renderItem}\n' +
           '  keyExtractor={item => item.id}\n' +
           '  initialNumToRender={10}\n' +
           '  maxToRenderPerBatch={5}\n' +
           '  windowSize={5}\n' +
           '  removeClippedSubviews={true}\n' +
           '  getItemLayout={(data, index) => ({\n' +
           '    length: ITEM_HEIGHT,\n' +
           '    offset: ITEM_HEIGHT * index,\n' +
           '    index,\n' +
           '  })}\n' +
           '/>\n\n' +
           '// Flutter — ListView.builder with const widgets\n' +
           'ListView.builder(\n' +
           '  itemCount: items.length,\n' +
           '  itemExtent: 72.0,  // fixed height for performance\n' +
           '  itemBuilder: (context, index) {\n' +
           '    return ItemCard(key: ValueKey(items[index].id), item: items[index]);\n' +
           '  },\n' +
           ')'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_6_2}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_6_2 }} />
        <pre style={preStyle}><code>
          {'// React Native — FastImage with caching\n' +
           'import FastImage from \'react-native-fast-image\';\n\n' +
           '<FastImage\n' +
           '  source={{\n' +
           '    uri: \'https://example.com/photo.jpg\',\n' +
           '    priority: FastImage.priority.normal,\n' +
           '    cache: FastImage.cacheControl.immutable,\n' +
           '  }}\n' +
           '  resizeMode={FastImage.resizeMode.cover}\n' +
           '  style={{ width: 200, height: 200 }}\n' +
           '/>\n\n' +
           '// Flutter — CachedNetworkImage\n' +
           'CachedNetworkImage(\n' +
           '  imageUrl: "https://example.com/photo.jpg",\n' +
           '  placeholder: (context, url) => const CircularProgressIndicator(),\n' +
           '  errorWidget: (context, url, error) => const Icon(Icons.error),\n' +
           '  memCacheWidth: 400,  // limit memory cache size\n' +
           ')'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_6_3}</h3>
        <p style={paragraphStyle}>{t.p_6_3}</p>
        <pre style={preStyle}><code>
          {'// React Native — Cleanup subscriptions\n' +
           'useEffect(() => {\n' +
           '  const subscription = eventEmitter.addListener(\'update\', handler);\n' +
           '  return () => subscription.remove();  // ALWAYS clean up\n' +
           '}, []);\n\n' +
           '// Flutter — Dispose controllers\n' +
           'class _MyWidgetState extends State<MyWidget> {\n' +
           '  late final ScrollController _scrollController;\n' +
           '  late final StreamSubscription _subscription;\n\n' +
           '  @override\n' +
           '  void initState() {\n' +
           '    super.initState();\n' +
           '    _scrollController = ScrollController();\n' +
           '    _subscription = stream.listen((_) { /* handle */ });\n' +
           '  }\n\n' +
           '  @override\n' +
           '  void dispose() {\n' +
           '    _scrollController.dispose();\n' +
           '    _subscription.cancel();\n' +
           '    super.dispose();  // Always call super.dispose() last\n' +
           '  }\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 7. STATE MANAGEMENT ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_7}</h2>
        <p style={paragraphStyle}>{t.p_7}</p>

        <h3 style={h3Style}>{t.h3_7_1}</h3>
        <p style={paragraphStyle}>{t.p_7_1}</p>
        <pre style={preStyle}><code>
          {'// Zustand — Minimal React Native state management\n' +
           'import { create } from \'zustand\';\n' +
           'import { persist, createJSONStorage } from \'zustand/middleware\';\n' +
           'import AsyncStorage from \'@react-native-async-storage/async-storage\';\n\n' +
           'interface AuthStore {\n' +
           '  user: User | null;\n' +
           '  token: string | null;\n' +
           '  login: (email: string, password: string) => Promise<void>;\n' +
           '  logout: () => void;\n' +
           '}\n\n' +
           'export const useAuthStore = create<AuthStore>()(\n' +
           '  persist(\n' +
           '    (set) => ({\n' +
           '      user: null,\n' +
           '      token: null,\n' +
           '      login: async (email, password) => {\n' +
           '        const response = await api.login(email, password);\n' +
           '        set({ user: response.user, token: response.token });\n' +
           '      },\n' +
           '      logout: () => set({ user: null, token: null }),\n' +
           '    }),\n' +
           '    {\n' +
           '      name: \'auth-storage\',\n' +
           '      storage: createJSONStorage(() => AsyncStorage),\n' +
           '    }\n' +
           '  )\n' +
           ');'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_7_2}</h3>
        <p style={paragraphStyle}>{t.p_7_2}</p>
        <pre style={preStyle}><code>
          {'// BLoC Pattern — Streams for separation of concerns\n' +
           'class UserBloc extends Bloc<UserEvent, UserState> {\n' +
           '  final UserRepository _repository;\n\n' +
           '  UserBloc(this._repository) : super(UserInitial()) {\n' +
           '    on<LoadUsers>(_onLoadUsers);\n' +
           '    on<RefreshUsers>(_onRefreshUsers);\n' +
           '    on<DeleteUser>(_onDeleteUser);\n' +
           '  }\n\n' +
           '  Future<void> _onLoadUsers(\n' +
           '    LoadUsers event, Emitter<UserState> emit\n' +
           '  ) async {\n' +
           '    emit(UserLoading());\n' +
           '    try {\n' +
           '      final users = await _repository.fetchUsers();\n' +
           '      emit(UserLoaded(users));\n' +
           '    } catch (e) {\n' +
           '      emit(UserError(e.toString()));\n' +
           '    }\n' +
           '  }\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 8. MOBILE TESTING ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_8}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_8 }} />

        <h3 style={h3Style}>{t.h3_8_1}</h3>
        <p style={paragraphStyle}>{t.p_8_1}</p>
        <pre style={preStyle}><code>
          {'// Jest — React Native component test\n' +
           'import { render, fireEvent, waitFor } from \'@testing-library/react-native\';\n' +
           'import { UserList } from \'../UserList\';\n\n' +
           'describe(\'UserList\', () => {\n' +
           '  it(\'renders users after loading\', async () => {\n' +
           '    const mockUsers = [\n' +
           '      { id: \'1\', name: \'Alice\', email: \'alice@test.com\' },\n' +
           '      { id: \'2\', name: \'Bob\', email: \'bob@test.com\' },\n' +
           '    ];\n' +
           '    jest.spyOn(api, \'fetchUsers\').mockResolvedValue(mockUsers);\n\n' +
           '    const { getByText, queryByTestId } = render(<UserList />);\n\n' +
           '    // Loading state\n' +
           '    expect(queryByTestId(\'loading-spinner\')).toBeTruthy();\n\n' +
           '    // Loaded state\n' +
           '    await waitFor(() => {\n' +
           '      expect(getByText(\'Alice\')).toBeTruthy();\n' +
           '      expect(getByText(\'Bob\')).toBeTruthy();\n' +
           '    });\n' +
           '  });\n\n' +
           '  it(\'handles pull-to-refresh\', async () => {\n' +
           '    const { getByTestId } = render(<UserList />);\n' +
           '    fireEvent(getByTestId(\'user-list\'), \'refresh\');\n' +
           '    await waitFor(() => {\n' +
           '      expect(api.fetchUsers).toHaveBeenCalledTimes(2);\n' +
           '    });\n' +
           '  });\n' +
           '});'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_8_2}</h3>
        <p style={paragraphStyle}>{t.p_8_2}</p>
        <pre style={preStyle}><code>
          {'# Maestro — Declarative E2E testing (YAML)\n' +
           '# login-flow.yaml\n' +
           'appId: com.myapp.mobile\n' +
           '---\n' +
           '- launchApp\n' +
           '- assertVisible: "Welcome"\n' +
           '- tapOn: "Sign In"\n' +
           '- inputText:\n' +
           '    id: "email-input"\n' +
           '    text: "test@example.com"\n' +
           '- inputText:\n' +
           '    id: "password-input"\n' +
           '    text: "password123"\n' +
           '- tapOn: "Log In"\n' +
           '- assertVisible: "Dashboard"\n' +
           '- scroll\n' +
           '- assertVisible: "Recent Activity"\n' +
           '- takeScreenshot: "dashboard-loaded"'}
        </code></pre>
      </div>

      {/* ==================== 9. CI/CD ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_9}</h2>
        <p style={paragraphStyle}>{t.p_9}</p>

        <h3 style={h3Style}>{t.h3_9_1}</h3>
        <p style={paragraphStyle}>{t.p_9_1}</p>
        <pre style={preStyle}><code>
          {'# Fastfile — Automated iOS and Android builds\n' +
           'default_platform(:ios)\n\n' +
           'platform :ios do\n' +
           '  desc "Push a new beta build to TestFlight"\n' +
           '  lane :beta do\n' +
           '    increment_build_number(xcodeproj: "MyApp.xcodeproj")\n' +
           '    match(type: "appstore")  # code signing\n' +
           '    build_app(\n' +
           '      workspace: "MyApp.xcworkspace",\n' +
           '      scheme: "MyApp",\n' +
           '      export_method: "app-store"\n' +
           '    )\n' +
           '    upload_to_testflight(skip_waiting_for_build_processing: true)\n' +
           '    slack(message: "iOS beta deployed to TestFlight!")\n' +
           '  end\n\n' +
           '  desc "Deploy to App Store"\n' +
           '  lane :release do\n' +
           '    beta  # reuse beta lane\n' +
           '    deliver(\n' +
           '      submit_for_review: true,\n' +
           '      automatic_release: true,\n' +
           '      force: true\n' +
           '    )\n' +
           '  end\n' +
           'end\n\n' +
           'platform :android do\n' +
           '  lane :beta do\n' +
           '    gradle(task: "clean bundleRelease")\n' +
           '    upload_to_play_store(track: "beta")\n' +
           '  end\n' +
           'end'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_9_2}</h3>
        <p style={paragraphStyle}>{t.p_9_2}</p>
        <pre style={preStyle}><code>
          {'// CodePush — Over-the-air JS bundle updates\n' +
           'import codePush from "react-native-code-push";\n\n' +
           'const codePushOptions = {\n' +
           '  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,\n' +
           '  installMode: codePush.InstallMode.ON_NEXT_RESTART,\n' +
           '  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,\n' +
           '};\n\n' +
           'function App() {\n' +
           '  const [updateAvailable, setUpdateAvailable] = useState(false);\n\n' +
           '  useEffect(() => {\n' +
           '    codePush.checkForUpdate().then(update => {\n' +
           '      if (update) setUpdateAvailable(true);\n' +
           '    });\n' +
           '  }, []);\n\n' +
           '  return <MainNavigator />;\n' +
           '}\n\n' +
           'export default codePush(codePushOptions)(App);\n\n' +
           '# CLI: Release a CodePush update\n' +
           '# appcenter codepush release-react -a MyOrg/MyApp-iOS -d Production'}
        </code></pre>
      </div>

      {/* ==================== 10. PUSH NOTIFICATIONS ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_10}</h2>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_10 }} />

        <h3 style={h3Style}>{t.h3_10_1}</h3>
        <p style={paragraphStyle}>{t.p_10_1}</p>
        <pre style={preStyle}><code>
          {'// React Native — Firebase push notifications setup\n' +
           'import messaging from \'@react-native-firebase/messaging\';\n' +
           'import notifee from \'@notifee/react-native\';\n\n' +
           '// Request permission (iOS)\n' +
           'async function requestPermission() {\n' +
           '  const authStatus = await messaging().requestPermission();\n' +
           '  const enabled =\n' +
           '    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||\n' +
           '    authStatus === messaging.AuthorizationStatus.PROVISIONAL;\n' +
           '  if (enabled) {\n' +
           '    const token = await messaging().getToken();\n' +
           '    await api.registerPushToken(token);\n' +
           '  }\n' +
           '}\n\n' +
           '// Handle foreground messages\n' +
           'messaging().onMessage(async remoteMessage => {\n' +
           '  await notifee.displayNotification({\n' +
           '    title: remoteMessage.notification?.title,\n' +
           '    body: remoteMessage.notification?.body,\n' +
           '    android: {\n' +
           '      channelId: \'default\',\n' +
           '      pressAction: { id: \'default\' },\n' +
           '    },\n' +
           '  });\n' +
           '});'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_10_2}</h3>
        <p style={paragraphStyle}>{t.p_10_2}</p>
        <pre style={preStyle}><code>
          {'// Android — Notification channel setup (Kotlin)\n' +
           'private fun createNotificationChannels() {\n' +
           '    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {\n' +
           '        val channels = listOf(\n' +
           '            NotificationChannel(\n' +
           '                "messages", "Messages",\n' +
           '                NotificationManager.IMPORTANCE_HIGH\n' +
           '            ).apply {\n' +
           '                description = "New message notifications"\n' +
           '                enableVibration(true)\n' +
           '            },\n' +
           '            NotificationChannel(\n' +
           '                "updates", "App Updates",\n' +
           '                NotificationManager.IMPORTANCE_LOW\n' +
           '            ).apply {\n' +
           '                description = "App update notifications"\n' +
           '            }\n' +
           '        )\n' +
           '        val manager = getSystemService(NotificationManager::class.java)\n' +
           '        manager.createNotificationChannels(channels)\n' +
           '    }\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 11. OFFLINE-FIRST ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_11}</h2>
        <p style={paragraphStyle}>{t.p_11}</p>

        <h3 style={h3Style}>{t.h3_11_1}</h3>
        <p style={paragraphStyle}>{t.p_11_1}</p>
        <pre style={preStyle}><code>
          {'// React Native — Offline-first with WatermelonDB\n' +
           'import { Database } from \'@nozbe/watermelondb\';\n' +
           'import SQLiteAdapter from \'@nozbe/watermelondb/adapters/sqlite\';\n\n' +
           'const adapter = new SQLiteAdapter({\n' +
           '  schema: appSchema,\n' +
           '  migrations: appMigrations,\n' +
           '  jsi: true,  // enable JSI for 3x faster queries\n' +
           '});\n\n' +
           'const database = new Database({ adapter, modelClasses: [User, Post] });\n\n' +
           '// Sync with remote server\n' +
           'import { synchronize } from \'@nozbe/watermelondb/sync\';\n\n' +
           'async function syncDatabase() {\n' +
           '  await synchronize({\n' +
           '    database,\n' +
           '    pullChanges: async ({ lastPulledAt }) => {\n' +
           '      const response = await api.pullChanges(lastPulledAt);\n' +
           '      return { changes: response.changes, timestamp: response.timestamp };\n' +
           '    },\n' +
           '    pushChanges: async ({ changes }) => {\n' +
           '      await api.pushChanges(changes);\n' +
           '    },\n' +
           '  });\n' +
           '}'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_11_2}</h3>
        <p style={paragraphStyle}>{t.p_11_2}</p>
        <pre style={preStyle}><code>
          {'// Flutter — Offline queue with Drift (SQLite)\n' +
           '@DriftDatabase(tables: [Users, SyncQueue])\n' +
           'class AppDatabase extends _$AppDatabase {\n' +
           '  AppDatabase() : super(_openConnection());\n\n' +
           '  @override\n' +
           '  int get schemaVersion => 2;\n\n' +
           '  // Queue a mutation for background sync\n' +
           '  Future<void> queueMutation(String type, String payload) {\n' +
           '    return into(syncQueue).insert(\n' +
           '      SyncQueueCompanion(\n' +
           '        type: Value(type),\n' +
           '        payload: Value(payload),\n' +
           '        createdAt: Value(DateTime.now()),\n' +
           '        status: const Value(\'pending\'),\n' +
           '      ),\n' +
           '    );\n' +
           '  }\n\n' +
           '  // Process pending mutations\n' +
           '  Future<void> syncPending() async {\n' +
           '    final pending = await (select(syncQueue)\n' +
           '      ..where((t) => t.status.equals(\'pending\'))\n' +
           '      ..orderBy([(t) => OrderingTerm.asc(t.createdAt)]))\n' +
           '      .get();\n' +
           '    for (final item in pending) {\n' +
           '      await _processMutation(item);\n' +
           '    }\n' +
           '  }\n' +
           '}'}
        </code></pre>
      </div>

      {/* ==================== 12. DEEP LINKING & ASO ==================== */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_12}</h2>
        <p style={paragraphStyle}>{t.p_12}</p>

        <h3 style={h3Style}>{t.h3_12_1}</h3>
        <p style={paragraphStyle} dangerouslySetInnerHTML={{ __html: t.p_12_1 }} />
        <pre style={preStyle}><code>
          {'// apple-app-site-association (iOS Universal Links)\n' +
           '{\n' +
           '  "applinks": {\n' +
           '    "apps": [],\n' +
           '    "details": [\n' +
           '      {\n' +
           '        "appID": "TEAM_ID.com.myapp.mobile",\n' +
           '        "paths": [\n' +
           '          "/product/*",\n' +
           '          "/user/*",\n' +
           '          "/share/*"\n' +
           '        ]\n' +
           '      }\n' +
           '    ]\n' +
           '  }\n' +
           '}\n\n' +
           '// assetlinks.json (Android App Links)\n' +
           '[{\n' +
           '  "relation": ["delegate_permission/common.handle_all_urls"],\n' +
           '  "target": {\n' +
           '    "namespace": "android_app",\n' +
           '    "package_name": "com.myapp.mobile",\n' +
           '    "sha256_cert_fingerprints": ["AA:BB:CC:..."]\n' +
           '  }\n' +
           '}]\n\n' +
           '// React Native — Handle deep links\n' +
           'const linking = {\n' +
           '  prefixes: [\'https://myapp.com\', \'myapp://\'],\n' +
           '  config: {\n' +
           '    screens: {\n' +
           '      Product: \'product/:id\',\n' +
           '      User: \'user/:username\',\n' +
           '      Share: \'share/:shareId\',\n' +
           '    },\n' +
           '  },\n' +
           '};\n\n' +
           '<NavigationContainer linking={linking}>\n' +
           '  {/* navigators */}\n' +
           '</NavigationContainer>'}
        </code></pre>

        <h3 style={h3Style}>{t.h3_12_2}</h3>
        <p style={paragraphStyle}>{t.p_12_2}</p>
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ASO Factor</th>
                <th style={thStyle}>iOS App Store</th>
                <th style={thStyle}>Google Play Store</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Title</td>
                <td style={tdStyle}>30 characters max</td>
                <td style={tdStyle}>30 characters max</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Subtitle / Short desc</td>
                <td style={tdStyle}>30 characters</td>
                <td style={tdStyle}>80 characters</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Keywords</td>
                <td style={tdStyle}>100 characters (hidden field)</td>
                <td style={tdStyle}>Indexed from description</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Screenshots</td>
                <td style={tdStyle}>Up to 10 per device</td>
                <td style={tdStyle}>Up to 8</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Preview Video</td>
                <td style={tdStyle}>Up to 3 (30 seconds each)</td>
                <td style={tdStyle}>1 YouTube video</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Description</td>
                <td style={tdStyle}>4000 characters (not indexed)</td>
                <td style={tdStyle}>4000 characters (indexed by algorithm)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== FAQ ==================== */}
      <div style={faqContainerStyle}>
        <h2 style={h2Style}>{t.h2_faq}</h2>

        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq1_q}</div>
          <div style={faqAnswerStyle}>{t.faq1_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq2_q}</div>
          <div style={faqAnswerStyle}>{t.faq2_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq3_q}</div>
          <div style={faqAnswerStyle}>{t.faq3_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq4_q}</div>
          <div style={faqAnswerStyle}>{t.faq4_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq5_q}</div>
          <div style={faqAnswerStyle}>{t.faq5_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq6_q}</div>
          <div style={faqAnswerStyle}>{t.faq6_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq7_q}</div>
          <div style={faqAnswerStyle}>{t.faq7_a}</div>
        </div>
        <div style={faqItemStyle}>
          <div style={faqQuestionStyle}>{t.faq8_q}</div>
          <div style={faqAnswerStyle}>{t.faq8_a}</div>
        </div>
      </div>

      {/* ==================== CONCLUSION ==================== */}
      <div style={conclusionBoxStyle}>
        <p style={{ margin: 0, lineHeight: 1.7 }}>{t.p_conclusion}</p>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a href="/en/tools/json-formatter" style={linkStyle}>{t.link_tool_bottom}</a>
        <a href="/en/tools" style={linkStyle}>{t.link_tool_bottom2}</a>
      </div>
    </>
  );
}
